/**
 * Copyright (c) 2017 NAVER Corp.
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
const nodeToSvgDataUrl = node => {
	const bounds = node.getBoundingClientRect();
	const clone = node.cloneNode(true);
	const styleSheets = toArray(document.styleSheets);
	const cssRules = getCssRules(styleSheets);
	const cssText = cssRules.filter(r => r.cssText).map(r => r.cssText);

	clone.setAttribute("xmlns", d3Namespaces.xhtml);

	const nodeXml = new XMLSerializer().serializeToString(clone);

	// foreignObject not supported in IE11 and below
	// https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx
	const dataStr = `<svg xmlns="${d3Namespaces.svg}" width="${bounds.width}" height="${bounds.height}">
			<foreignObject width="100%" height="100%">
				<style>${cssText.join("\n")}</style>
				${nodeXml}
			</foreignObject></svg>`
		.replace(/#/g, "%23")
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
	 * @memberOf Chart
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
	export(mimeType = "image/png", callback) {
		const svgDataUrl = nodeToSvgDataUrl(this.element);

		if (isFunction(callback)) {
			const img = new Image();

			img.crosssOrigin = "Anonymous";
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);

				canvas.toBlob(blob => {
					callback(window.URL.createObjectURL(blob));
				}, mimeType);
			};

			img.src = svgDataUrl;
		}

		return svgDataUrl;
	}
});
