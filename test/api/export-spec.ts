/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
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
		it("should invoke a callback when ready", done => {
			function exportCallback(dataUrl) {
				expect(dataUrl).to.not.be.equal("");
				done();
			}

			expect(/^data:image\/svg\+xml;base64,.+/.test(chart.export())).to.be.true;
			chart.export(null, exportCallback);
		});

		it("should export chart as image/png", done => {
			function exportCallback(dataUrl) {
				const link: any = document.createElement("link");

				link.download = `${Date.now}.png`;
				link.href = dataUrl;
				expect(link.getAttribute("href").length).to.be.not.equal(0);

				done();
			}

			chart.export({mimeType: "image/png"}, exportCallback);
		});

		it("should export in different size", done => {
			const expectedDataURL = [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAJYCAYAAADxHswlAAA",

				// tails
				"AAAAASUVORK5CYII=",
				"XRLKx5vmwDQAAAABJRU5ErkJggg==",

				// for window test
				"AAAAAElFTkSuQmCC"
			];

			setTimeout(() => {
				chart.export({
					width: 1000, height: 600
				}, data => {
					expect(
						expectedDataURL.map(v => data.indexOf(v) >= 0).filter(Boolean).length
					).to.be.equal(2);

					done();
				});
			}, 500);
		});

		it("should export in different aspectRatio", done => {
			const expectedDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEsCAYAAACG+vy+AAA";

			setTimeout(() => {
				chart.export({
					width: 200, height: 300, preserveAspectRatio: false
				}, data => {
					expect(data.indexOf(expectedDataURL) > -1).to.be.true;

					done();
				});
			}, 500);
		});

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

		it("should export custom points properly", done => {
			const expectedDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAA";

			setTimeout(() => {
				chart.export(null, data => {
					expect(data.indexOf(expectedDataURL) > -1).to.be.true;
					done();
				});
			}, 500);
		});
	
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
		before(() => { 
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
					labels: true
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
			// pattern for local
			[
				"P9CArwf2B9IIJoEKAAdimvjBKA5GoLnJZFJOuSu",
				"oANQ+oASUgBJQAkpACSiBEiOgArDEHK7NVQJKQA",
				"SWgBJTA/wPqQjRHnDx9rAAAAABJRU5ErkJggg=="
			],
			// pattern for CI
			[
				"SR0IArs4c6QAAIABJREFUeF7snXmcXEXV/p9TdwI",
				"ALxJBBVAaiTpCOq8cRzdkU0qkwmo8lkknMpovmj2",
				"AAmQAAnESOD/AxjGOWWrWLsNAAAAAElFTkSuQmCC"
			]
		];

		it("check when 'preserveFontStyle=false'", done => {
			chart.export({
				preserveFontStyle: false
			}, function(dataUrl) {
				expect(
					expected.some(pttr => pttr.every(v => dataUrl.indexOf(v) == -1))
				).to.be.true;

				done();
			});
		});

		it("check when 'preserveFontStyle=true'", done => {
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

					done();
				});
			});			
		});
	});
});
