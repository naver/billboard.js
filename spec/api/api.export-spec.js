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
			},
			legend: {
				show: false
			}
		}
	})

	it("shoul exported custom points properly?", done => {
		const expectedDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACWCAYAAAAouC1GAAAFk0lEQVR4Xu2ZS2hcZRiGv+9MK8UatWK9lFxcuXJhrF2487ZKJgoFC7pxI4pQEC+dRChaKkhmEkQISjfuiwUhnYmgLsSNK2MQ3biyM+MFxWgwpKbQnE+SoCYRORl9yDkH3lmG73/+/3+eOZkMcdOrUAa8UKfRYUxBCvYmUBAFKZiBgh1HT4iCgAbOfLxvYHV52NNk2NK43Sr2fUSy0P1mZcEunFgDd9ozVCmfkMGJ1qFYi/Pu/pC7rViEm3ufWSybeYTFdRH+0crvyYlfZkZ+2zObwEalCzJUa5409ykzO5B5/7ArqdkL3Ub17czZggyUKshArTWTuD1pZn09+FuOSN7pNEae72FNbqOlCTI03nojwp5138WTsUNnmK1axEynMVbLzfQuNy5FkIGJi8c89Q/c/dD6vSqJ274k++hX07C1NDZVRCxZUnmwPTmysEs3uYxl3yqXY23fdGi8tWRmN2z96dlH78o82SuzX22bCYvFTn3s5syFOQ4UPkj/S3NPVJL03OZfUX+/Lk2OZmq7Y2LuH0HC/GS3Xj2fuTingcIHGaq1ps3txZ1+/kuQzd9cMVXkz5LCBxmsNefd/R4siNl8p169N6cHIHPbwgcZqjV/NPdbqCAW8VO7MXZrppmcBgofZLDWWnS3m6ggYbbYqVcL+8FegiDNT939PiqIhX/Sbozen9MDkLlt4YMMjDdfS8xPU0HC7GynXn0100xOA4UP0l+bPV7xyjkzO/y//+yN+DnS5Knu9OhsTr4zty18kPUbDNZaX7rbtm+Cjx3tz7zchflvd8580a5X785cmONAKYLc9vL7h69J00tudu3Gd4kehG254Gq4HelMVn/tYfmej5YiyMZTcqr5nLm97u4bUXp5Rdhlj6i1p8be6mVdHrOlCbIuZ+DU3ONJEuufJ9fvWlbEUqTxTGf6kXd3vSbHwVIF2YgycfFYkvqHYb7f3Q7+m7uwuGzmVzyNh9tTY5/n6LinrUsX5M/bDY7PvWmRHjezI+6+EhGpuycRdtDdvkvD3us2qqX4p9TWYqUN8tclnv5sf/+NPwwn7neGp193D/Qt2JkHrvb0tizQcPmDFEgmcRQFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCDAUBZRIoBSEsggwFAWUSKAUhLIIMBQFlEigFISyCjD8ArsX8lwrNQzkAAAAASUVORK5CYII=";

		setTimeout(() => {
			chart.export("image/png", data => {
				expect(data).to.be.equal(expectedDataURL);
				done();
			});
		}, 500);
	});
});
