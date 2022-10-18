/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {namespaces as d3Namespaces} from "d3-selection";
import {document, window} from "../../module/browser";
import {isFunction, toArray, getCssRules, mergeObj} from "../../module/util";

type TExportOption = TSize & {
	preserveAspectRatio: boolean;
	preserveFontStyle: boolean;
	mimeType: string;
};

type TSize = {
	x?: number;
	y?: number;
	width: number;
	height: number;
};

type TTextGlyph = {
	[key: string]: TSize & {
		fill: string;
		fontFamily: string;
		fontSize: string;
		textAnchor: string;
		transform: string;
	}
};

/**
 * Encode to base64
 * @param {string} str string to be encoded
 * @returns {string}
 * @private
 * @see https://developer.mozilla.org/ko/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */
const b64EncodeUnicode = (str: string): string => window.btoa?.(
	encodeURIComponent(str)
		.replace(/%([0-9A-F]{2})/g, (match, p: number | string): string => String.fromCharCode(Number(`0x${p}`)))
);

/**
 * Convert svg node to data url
 * @param {HTMLElement} node target node
 * @param {object} option object containing {width, height, preserveAspectRatio}
 * @param {object} orgSize object containing {width, height}
 * @returns {string}
 * @private
 */
function nodeToSvgDataUrl(node, option: TExportOption, orgSize: TSize) {
	const {width, height} = option || orgSize;
	const serializer = new XMLSerializer();
	const clone = node.cloneNode(true);
	const cssText = getCssRules(toArray(document.styleSheets))
		.filter((r: CSSStyleRule) => r.cssText)
		.map((r: CSSStyleRule) => r.cssText);

	clone.setAttribute("xmlns", d3Namespaces.xhtml);

	// remove padding & margin
	clone.style.margin = "0";
	clone.style.padding = "0";

	// remove text nodes
	if (option.preserveFontStyle) {
		clone.querySelectorAll("text").forEach(t => {
			t.innerHTML = "";
		});
	}

	const nodeXml = serializer.serializeToString(clone);

	// escape css for XML
	const style = document.createElement("style");

	style.appendChild(document.createTextNode(cssText.join("\n")));

	const styleXml = serializer.serializeToString(style);

	// foreignObject not supported in IE11 and below
	// https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx
	const dataStr = `<svg xmlns="${d3Namespaces.svg}" width="${width}" height="${height}" 
		viewBox="0 0 ${orgSize.width} ${orgSize.height}" 
		preserveAspectRatio="${option?.preserveAspectRatio === false ? "none" : "xMinYMid meet"}">
			<foreignObject width="100%" height="100%">
				${styleXml}
				${nodeXml.replace(/(url\()[^#]+/g, "$1")}
			</foreignObject></svg>`
		.replace("/\n/g", "%0A");

	return `data:image/svg+xml;base64,${b64EncodeUnicode(dataStr)}`;
}

/**
 * Get coordinate of the element
 * @param {SVGElement} elem Target element
 * @param {object} svgOffset SVG offset
 * @returns {object}
 * @private
 */
function getCoords(elem, svgOffset): TSize {
	const {top, left} = svgOffset;
	const {x, y} = elem.getBBox();
	const {a, b, c, d, e, f} = elem.getScreenCTM();
	const {width, height} = elem.getBoundingClientRect();

	return {
		x: (a * x) + (c * y) + e - left,
		y: (b * x) + (d * y) + f - top + (height - Math.round(height / 4)),
		width,
		height
	};
}

/**
 * Get text glyph
 * @param {SVGTextElement} svg Target svg node
 * @returns {Array}
 * @private
 */
function getGlyph(svg: SVGElement): TTextGlyph[] {
	const {left, top} = svg.getBoundingClientRect();
	const filterFn = t => t.textContent || t.childElementCount;
	const glyph: TTextGlyph[] = [];

	toArray(svg.querySelectorAll("text"))
		.filter(filterFn)
		.forEach((t: SVGTextElement) => { // eslint-disable-line
			const getStyleFn = (ts: SVGTextElement): TTextGlyph => {
				const {fill, fontFamily, fontSize, textAnchor, transform} = window.getComputedStyle(ts);
				const {x, y, width, height} = getCoords(ts, {left, top});

				return {
					[ts.textContent as string]: {
						x, y, width, height, fill, fontFamily, fontSize, textAnchor, transform
					}
				};
			};

			if (t.childElementCount > 1) {
				const text: TTextGlyph[] = [];

				toArray(t.querySelectorAll("tspan"))
					.filter(filterFn)
					.forEach((ts: SVGTSpanElement) => {
						glyph.push(getStyleFn(ts));
					});

				return text;
			} else {
				glyph.push(getStyleFn(t));
			}
		});

	return glyph;
}

/**
 * Render text glyph
 * - NOTE: Called when the 'preserveFontStyle' option is true
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {Array} glyph Text glyph array
 * @private
 */
function renderText(ctx, glyph): void {
	glyph.forEach(g => {
		Object.keys(g).forEach(key => {
			const {x, y, width, height, fill, fontFamily, fontSize, transform} = g[key];

			ctx.save();

			ctx.font = `${fontSize} ${fontFamily}`;
			ctx.fillStyle = fill;

			if (transform === "none") {
				ctx.fillText(key, x, y);
			} else {
				const args = transform
					.replace(/(matrix|\(|\))/g, "")
					.split(",");

				if (args.splice(4).every(v => +v === 0)) {
					args.push(x + width - (width / 4));
					args.push(y - height + (height / 3));
				} else {
					args.push(x);
					args.push(y);
				}

				ctx.transform(...args);
				ctx.fillText(key, 0, 0);
			}

			ctx.restore();
		});
	});
}

export default {
	/**
	 * Export chart as an image.
	 * - **NOTE:**
	 *   - IE11 and below not work properly due to the lack of the feature(<a href="https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx">foreignObject</a>) support
	 *   - Every style applied to the chart & the basic CSS file(ex. billboard.css) should be at same domain as API call context to get correct styled export image.
	 * @function export
	 * @instance
	 * @memberof Chart
	 * @param {object} option Export option
	 * @param {string} [option.mimeType="image/png"] The desired output image format. (ex. 'image/png' for png, 'image/jpeg' for jpeg format)
	 * @param {number} [option.width={currentWidth}] width
	 * @param {number} [option.height={currentHeigth}] height
	 * @param {boolean} [option.preserveAspectRatio=true] Preserve aspect ratio on given size
	 * @param {boolean} [option.preserveFontStyle=false] Preserve font style(font-family).<br>
	 * **NOTE:**
	 *   - This option is useful when outlink web font style's `font-family` are applied to chart's text element.
	 *   - Text element's position(especially "transformed") can't be preserved correctly according the page's layout condition.
	 *   - If need to preserve accurate text position, embed the web font data within to the page and set `preserveFontStyle=false`.
	 *     - Checkout the embed example: <a href="https://stackblitz.com/edit/zfbya9-8nf9nn?file=index.html">https://stackblitz.com/edit/zfbya9-8nf9nn?file=index.html</a>
	 * @param {Function} [callback] The callback to be invoked when export is ready.
	 * @returns {string} dataURI
	 * @example
	 *  chart.export();
	 *  // --> "data:image/svg+xml;base64,PHN..."
	 *
	 *  // Initialize the download automatically
	 *  chart.export({mimeType: "image/png"}, dataUrl => {
	 *     const link = document.createElement("a");
	 *
	 *     link.download = `${Date.now()}.png`;
	 *     link.href = dataUrl;
	 *     link.innerHTML = "Download chart as image";
	 *
	 *     document.body.appendChild(link);
	 *  });
	 *
	 *  // Resize the exported image
	 *  chart.export(
	 *    {
	 *      width: 800,
	 *      height: 600,
	 *      preserveAspectRatio: false,
	 *      preserveFontStyle: false,
	 *      mimeType: "image/png"
	 *    },
	 *    dataUrl => { ... }
	 *  );
	 */
	export(option?: TExportOption, callback?: (dataUrl: string) => void): string {
		const $$ = this.internal;
		const {state, $el: {chart, svg}} = $$;
		const {width, height} = state.current;
		const opt = mergeObj({
			width,
			height,
			preserveAspectRatio: true,
			preserveFontStyle: false,
			mimeType: "image/png"
		}, option) as TExportOption;

		const svgDataUrl = nodeToSvgDataUrl(chart.node(), opt, {width, height});
		const glyph = opt.preserveFontStyle ? getGlyph(svg.node()) : [];

		if (callback && isFunction(callback)) {
			const img = new Image();

			img.crossOrigin = "Anonymous";
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				canvas.width = opt.width || width;
				canvas.height = opt.height || height;
				ctx.drawImage(img, 0, 0);

				if (glyph.length) {
					renderText(ctx, glyph);

					// release glyph array
					glyph.length = 0;
				}

				callback.bind(this)(canvas.toDataURL(opt.mimeType));
			};

			img.src = svgDataUrl;
		}

		return svgDataUrl;
	}
};
