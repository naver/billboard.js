/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";

describe("API export", () => {
	let chart;
	let args: any = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 5000, 2000, 1000, 4000, 1500, 2500]
			],
			types: {
				data1: "bar",
				data2: "area"
			}
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("Basic export functionalities", () => {
		it("should invoke a callback when ready", () => new Promise(done => {
			function exportCallback(dataUrl) {
				expect(dataUrl).to.not.be.equal("");
				done(1);
			}

			expect(/^data:image\/svg\+xml;base64,.+/.test(chart.export())).to.be.true;
			chart.export(null, exportCallback);
		}));

		it("should export chart as image/png", () => new Promise(done => {
			function exportCallback(dataUrl) {
				const link: any = document.createElement("link");

				link.download = `${Date.now}.png`;
				link.href = dataUrl;
				expect(link.getAttribute("href").length).to.be.not.equal(0);

				done(1);
			}

			chart.export({mimeType: "image/png"}, exportCallback);
		}));

		it("should export in different size", () => new Promise(done => {
			const expectedDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAJYCAYAAA";

			setTimeout(() => {
				chart.export({
					width: 1000, height: 600
				}, data => {
					expect(data.indexOf(expectedDataURL) >= 0).to.be.true;
					
					done(1);
				});
			}, 300);
		}));

		it("should export in different aspectRatio", () => new Promise(done => {
			const expectedDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEsCAYAAACG+vy+AAA";

			setTimeout(() => {
				chart.export({
					width: 200, height: 300, preserveAspectRatio: false
				}, data => {
					expect(data.indexOf(expectedDataURL) > -1).to.be.true;

					done(1);
				});
			}, 300);
		}));

		it("set options", () => {
			args = {
				size: {
					width: 35,
					height: 35
				},
				data: {
					columns: [
						["data1", 2]
					]
				},
				point: {
					pattern: [
						"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10' style='fill:#fff'></rect></g>"
					]
				},
				axis: {
					x: {
						show: false,
						padding: {
							left: 0,
							right: 0
						}
					},
					y: {
						show: false,
						min: 1,
						max: 3,
						padding: {
							top: 0,
							bottom: 0
						}
					}
				},
				legend: {
					show: false
				}
			};
		});

		it("should export custom points properly", () => new Promise(done => {
			const expectedDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAA";

			setTimeout(() => {
				chart.export(null, data => {
					expect(data.indexOf(expectedDataURL) > -1).to.be.true;
					done(1);
				});
			}, 300);
		}));
	
		it("should export valid svg even with weird css", () => {
			document.body.innerHTML += `<style>@font-face{src:url("#&<>'\0");}</style>`;

			const dataURL = chart.export();

			// test generated svg
			const svg = atob(dataURL.split("base64,")[1]);
			const oParser = new DOMParser();
			const doc = oParser.parseFromString(svg, "image/svg+xml");

			// check that it does not start with error message
			expect(doc.documentElement.nodeName === "svg").to.be.true;
		});
	});

	describe("Additional functionalities", () => {
		beforeAll(() => { 
			args = {
				svg: {
					classname: "export-preserve-font-style"
				},
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 5000, 2000, 1000, 4000, 1500, 2500]
					],
					types: {
						data1: "bar",
						data2: "area"
					},
					labels: {
						format: function(v, id, i, texts) {
							return v > 4000 ? `${v}\nValue` : v;
						}
					}
				},
				grid: {
					x: {
						lines: [
							{
								value: 1,
								text: "Label 1",
								position: "middle"
							},
							{
								value: 3,
								text: "Label 3"
							}
						]
					},
					y: {
						lines: [
							{
								value: 4000,
								text: "Y Label 1"
							}
						]
					}
				}
			};
		});

		const expected = [
			// pattern for local: preserveFontStyle=false
			[
				"C4chWSMAlAu00wVlR2E7+uDROYmcLJ7zYhZwOr4MA7",
				"uVxYOhqMiQRIoMkEKACbDLjW5ttSANpvP4",
				"xX4lffYd6UXitkmIX8Q5U4XMz+YN69v91Z"
			],

			// pattern for local: preserveFontStyle=true
			[
				"UwUQECoIlWYZu6qgABsKvys3LDFCAAGmYQNocKRKQAATAiIVlMehQgAKbHluxJ",
				"bAOgeAH1QlUcTZOjJOFPV7zN3zDlq/tQUvMb1kYAjNcQLZROAGxBtNTf0oIXkACY",
				"CZAACZAACZAABSCfARIgARIgARIgARLIMQIUgDkWcHaXBEiABEiABEiABCgA"
			],
			
			// pattern for webdriverio
			[
				"nSetJ0vvOG1XcoZ8BQEeD3w9CCB6BGIkmCiAIze",
				"5Ku10DhdnT36vaRow3ZSgXoFLMsSYJMwL9XnRanBgYGBojufZVlvBCChjpwQMZJcsj",
				"ANwDC7nf6iqhRcXno2cQP2wnXM4qpFnSLACzpHlfYysmAV1jezaWxGgmFrai6bp9Y6Ryp2AaM"
			],

			// pattern for playwright
			[
				"31YqlQ4kAUzcNOyQCCSKAAlgonCzs7QgQAKYFktRzrAIDA8PnyciH2vz3va",
				"VSxTBFAVCvG9EcqwrJwaBEx59kIYM9JQYJFFMGbYFyyozdCPQ4p7",
				"2vI8zkABqEdwKQD1iANHAPWIAwWgHnHgCGDV4qCTYBoXGfC6I05zJgMYW4lmeko"
			],

			// pattern for CI: preserveFontStyle=false
			[
				"CZJgASaSGA5AGcAWG3wNiJg5ybawqZJgARsIEABaAPUclXqU3rWhk",
				"k76U3gZTLl3oYCNrBM1drxPe9Mxm87lWuAzt4mGiaxwj87rttu",
				"0mABEiABEiABEggNQIUgKnx49skQAIkQAIkQAIkYDkCFICWcxkNJgESI"
			],

			// pattern for CI: preserveFontStyle=true
			[
				"MMcesnMiKAsgzhwTak0AtArgzgC+WwHEfALtR6FRltwPYGMDxAHYHYAA8B",
				"2HTkHLCWAg4nrEehzQNDS997GQgCNORiBbCPDmWN4MpEACVRGoFYBrKz35t",
				"gFcBOMOf8rUAftrP9AcCOMkvvxfA8hxSvQJglx51zgZwRQUAMMg5PQTg21nm"
			]
		];

		it("check when 'preserveFontStyle=false'", () => new Promise(done => {
			chart.export({
				preserveFontStyle: false
			}, function(dataUrl) {
				expect(
					expected.some(pttr => pttr.every(v => dataUrl.indexOf(v) == -1))
				).to.be.true;

				done(1);
			});
		}));

		it("check when 'preserveFontStyle=true'", () => new Promise(done => {
			const font = new FontFace("Alfa Slab One", "url(https://fonts.gstatic.com/s/alfaslabone/v17/6NUQ8FmMKwSEKjnm5-4v-4Jh2dJhe_escmA.woff2)", {
				style: "normal",
				weight: "400"
			});
			
			document.fonts.add(font);
			font.load();

			document.fonts.ready.then(() => {
				chart.$.chart
					.style("margin-left", "100px")
					.style("padding-top", "50px");

				chart.$.svg
					.style("font-family", "Alfa Slab One");

				chart.export({
					preserveFontStyle: true
				}, function(dataUrl) {
					expect(
						expected.some(pttr => pttr.every(v => dataUrl.indexOf(v) >= 0))
					).to.be.true;

					chart.$.chart
						.style("margin-left", null)
						.style("padding-top", null);

					done(1);
				});
			});
		}));
	});
});
