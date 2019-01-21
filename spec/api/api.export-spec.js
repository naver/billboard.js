/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";

describe("API export", () => {
	let chart;
	let args = {
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

	it("should invoke a callback when ready", done => {
		function exportCallback(dataUrl) {
			expect(dataUrl).to.not.be.equal("");
			done();
		}

		expect(/^data:image\/svg\+xml;base64,.+/.test(chart.export())).to.be.true;
		chart.export("image/png", exportCallback);
	});

	it("should export chart as image/png", done => {
		function exportCallback(dataUrl) {
			const link = document.createElement("link");

			link.download = `${Date.now}.png`;
			link.href = dataUrl;
			expect(link.getAttribute("href").length).to.be.not.equal(0);

			done();
		}

		chart.export("image/png", exportCallback);
	});

	it("set options", () => {
		args = {
			size: {
			  width: 100,
			  height: 150
			},
			data: {
				columns: [
					["data1", 3]
				]
			},
			point: {
			  pattern: [
				"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10' style='fill:#fff'></rect></g>"
			  ]
			},
			axis: {
				x: {
					show: false
				},
				y: {
					show: false,
					min: 2.5,
					max: 3
				}
			}
		}
	})

	it("shoul exported custom points properly?", done => {
		const expectedDataURL = "data:image/png;base64,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";

		setTimeout(() => {
			chart.export("image/png", data => {
				expect(data).to.be.equal(expectedDataURL);
				done();
			});
		}, 500);
	});
});
