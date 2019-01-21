/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {namespaces as d3Namespaces} from "d3-selection";
import Chart from "../internals/Chart";
import {extend, isFunction, toArray, getCssRules} from "../internals/util";

/**
 * Encode to base64
 * @param {String} str
 * @return {String}
 * @private
 * @see https://developer.mozilla.org/ko/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */
const b64EncodeUnicode = str => btoa(
	encodeURIComponent(str)
		.replace(/%([0-9A-F]{2})/g, (match, p) => String.fromCharCode(`0x${p}`))
);

/**
 * Convert svg node to data url
 * @param {HTMLElement} node
 * @return {String}
 * @private
 */
const nodeToSvgDataUrl = (node, size) => {
	const clone = node.cloneNode(true);
	const styleSheets = toArray(document.styleSheets);
	const cssRules = getCssRules(styleSheets);
	const cssText = cssRules.filter(r => r.cssText).map(r => r.cssText);

	clone.setAttribute("xmlns", d3Namespaces.xhtml);

	const nodeXml = new XMLSerializer().serializeToString(clone);

	// foreignObject not supported in IE11 and below
	// https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx
	const dataStr = `<svg xmlns="${d3Namespaces.svg}" width="${size.width}" height="${size.height}">
			<foreignObject width="100%" height="100%">
				<style>${cssText.join("\n")}</style>
				${nodeXml.replace(/(url\()[^#]+/g, "$1")}
			</foreignObject></svg>`
		.replace("/\n/g", "%0A");

	return `data:image/svg+xml;base64,${b64EncodeUnicode(dataStr)}`;
};

extend(Chart.prototype, {
	/**
	 * Export chart as an image.
	 * - **NOTE:**
	 *   - IE11 and below not work properly due to the lack of the feature(<a href="https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx">foreignObject</a>) support
	 *   - The basic CSS file(ex. billboard.css) should be at same domain as API call context to get correct styled export image.
	 * @method export
	 * @instance
	 * @memberof Chart
	 * @param {String} [mimeType=image/png] The desired output image format. (ex. 'image/png' for png, 'image/jpeg' for jpeg format)
	 * @param {Function} [callback] The callback to be invoked when export is ready.
	 * @return {String} dataURI
	 * @example
	 *  chart.export();
	 *  // --> "data:image/svg+xml;base64,PHN..."
	 *
	 *  // Initialize the download automatically
	 *  chart.export("image/png", dataUrl => {
	 *     const link = document.createElement("a");
	 *
	 *     link.download = `${Date.now()}.png`;
	 *     link.href = dataUrl;
	 *     link.innerHTML = "Download chart as image";
	 *
	 *     document.body.appendChild(link);
	 *  });
	 */
	export(mimeType, callback) {
		const $$ = this.internal;
		const size = {width: $$.currentWidth, height: $$.currentHeight};
		const svgDataUrl = nodeToSvgDataUrl(this.element, size);

		if (isFunction(callback)) {
			const img = new Image();

			img.crosssOrigin = "Anonymous";
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				canvas.width = size.width;
				canvas.height = size.height;
				ctx.drawImage(img, 0, 0);

				callback(canvas.toDataURL(mimeType));
			};

			img.src = svgDataUrl;
		}

		return svgDataUrl;
	}
});
