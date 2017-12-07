/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend, isFunction, asArray, getCssRules} from "../internals/util";

const nodeToSvgDataUrl = node => {
	const bounds = node.getBoundingClientRect();
	const clone = node.cloneNode(true);
	const styleSheets = asArray(document.styleSheets);
	const cssRules = getCssRules(styleSheets);
	const cssText = cssRules.filter(r => r.cssText).map(r => r.cssText);

	clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

	const nodeXml = new XMLSerializer().serializeToString(clone);

	const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${bounds.width}" height="${bounds.height}">
	<foreignObject width="100%" height="100%">
		<style>${cssText.join("\n")}</style>
		${nodeXml}
	</foreignObject></svg>`;

	const dataStr = data.replace(/#/g, "%23").replace("/\n/g", "%0A");

	return `data:image/svg+xml;charset=utf-8,${dataStr}`;
};

extend(Chart.prototype, {
	/**
	 * Export chart as an image.
	 * @method export
	 * @instance
	 * @memberOf Chart
	 * @param {String} mimeType The desired output image format.
	 * @param {Function} callback The callback to be invoked when export is ready.
	 * @example
	 *  chart.export("image/png", dataUrl => {
	 *    const link = document.createElement("a");
	 *
	 *    link.download = `${Date.now()}.png`;
	 *    link.href = dataUrl;
	 *    link.innerHTML = "Download chart as image";
	 *    document.body.appendChild(link);
	 *  });
	 */
	export(mimeType, callback) {
		const type = mimeType === "image/png" ?
			mimeType : mimeType === "image/jpeg" ? mimeType : "image/png";

		const svgDataUrl = nodeToSvgDataUrl(this.element);
		const img = new Image();

		img.crosssOrigin = "Anonymous";
		img.onload = _ => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			canvas.toBlob(blob => {
				const dataUrl = window.URL.createObjectURL(blob);

				if (isFunction(callback)) {
					callback.apply(null, [dataUrl]);
				}
			}, type);
		};
		img.src = svgDataUrl;
	}
});
