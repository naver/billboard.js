/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {namespaces as d3Namespaces} from "d3-selection";
import {document} from "../../module/browser";
import {isFunction, toArray, getCssRules, mergeObj} from "../../module/util";

type Size = {
	width: number;
	height: number;
};

type ExportOption = Size & {
	mimeType: string;
	preserveAspectRatio: boolean;
}

/**
 * Encode to base64
 * @param {string} str string to be encoded
 * @returns {string}
 * @private
 * @see https://developer.mozilla.org/ko/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */
const b64EncodeUnicode = (str: string): string => btoa(
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
function nodeToSvgDataUrl(node, option: ExportOption, orgSize: Size) {
	const {width, height} = option || orgSize;
	const serializer = new XMLSerializer();
	const clone = node.cloneNode(true);
	const cssText = getCssRules(toArray(document.styleSheets))
		.filter((r: any) => r.cssText)
		.map((r: any) => r.cssText);

	clone.setAttribute("xmlns", d3Namespaces.xhtml);

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

export default {
	/**
	 * Export chart as an image.
	 * - **NOTE:**
	 *   - IE11 and below not work properly due to the lack of the feature(<a href="https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx">foreignObject</a>) support
	 *   - The basic CSS file(ex. billboard.css) should be at same domain as API call context to get correct styled export image.
	 * @function export
	 * @instance
	 * @memberof Chart
	 * @param {object} option Export option
	 * @param {string} [option.mimeType="image/png"] The desired output image format. (ex. 'image/png' for png, 'image/jpeg' for jpeg format)
	 * @param {number} [option.width={currentWidth}] width
	 * @param {number} [option.height={currentHeigth}] height
	 * @param {boolean} [option.preserveAspectRatio=true] Preserve aspect ratio on given size
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
	 *      mimeType: "image/png"
	 *    },
	 *    dataUrl => { ... }
	 *  );
	 */
	export(option?: ExportOption, callback?: (dataUrl: string) => void): string {
		const $$ = this.internal;
		const {state, $el: {chart}} = $$;
		const {width, height} = state.current;
		const opt = mergeObj({
			width,
			height,
			preserveAspectRatio: true,
			mimeType: "image/png"
		}, option) as ExportOption;

		const svgDataUrl = nodeToSvgDataUrl(chart.node(), opt, {width, height});

		if (callback && isFunction(callback)) {
			const img = new Image();

			img.crossOrigin = "Anonymous";
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				canvas.width = opt.width || width;
				canvas.height = opt.height || height;
				ctx.drawImage(img, 0, 0);

				callback.bind(this)(canvas.toDataURL(opt.mimeType));
			};

			img.src = svgDataUrl;
		}

		return svgDataUrl;
	}
};
