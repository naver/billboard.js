/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import {format as d3Format} from "d3-format";
import {$AREA, $AXIS, $COMMON, $CIRCLE, $EVENT, $LEGEND, $LINE} from "../../src/config/classes";
import util from "../assets/util";

describe("API load", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("XHR data loading", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: []
				}
			};
		});

		it("should be load data via 'url'", () => new Promise(done => {
			chart.load({
				url: "/test/assets/data/test.json",
				mimeType: "json",
				headers: {
					"Content-Type": "text/xml"
				},
				done() {
					expect(chart.data().length).to.be.equal(3);
					done(1);
				}
			});
		}));
	});

	describe("check for load options", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 10, 20, 30, 40, 50],
						["data2", 130, 100, 140, 35, 110]
					]
				},
				axis: {
					x: {
						type: "category"
					},
					y2: {
						show: true,
						max: 1000
					}
				}
			}
		});

		it("options has been updated properly?", () => new Promise(done => {
			const className = "abcd";
			const color = "red";
			const categories = ["cat1", "cat2", "cat3", "cat4", "cat5"];

			setTimeout(() => {
				chart.load({
					columns: [
						["data1", 130, 120, 150, 140, 160],
						["data4", 30, 20, 50, 40, 60]
					],
					unload: ["data1"],
					type: "bar",
					classes: {
						"data1": className
					},
					colors: {
						"data2": color
					},
					categories,
					axes: {
						data2: "y2"
					},
					done: function() {
						const main = chart.$.main;

						// updated classname?
						expect(main.select(`.${$COMMON.target}-data1.${$COMMON.target}-${className}`).empty()).to.be.false;

						// updated category?
						expect(chart.categories()).to.deep.equal(categories);

						// updated color?
						expect(chart.color("data2")).to.be.equal(color);

						// updated type?
						expect(chart.config("data.types")).deep.equal({data1: "bar", data4: "bar"});

						// updated axes?
						expect(+main.selectAll(".bb-axis-y2 .tick tspan").nodes().pop().textContent).to.be.equal(1000);

						done(1);
					}
				});
			}, 300);
		}));
	});

	describe("indexed data as column", () => {
		it("should load additional data", () => new Promise(done => {
			const main = chart.$.main;
			const legend = chart.$.legend;

			chart.load({
				columns: [
					["data3", 800, 500, 900, 500, 1000, 700]
				],
				done() {
					const target = main.select(`.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data3`);
					const legendItem = legend.select(`.${$LEGEND.legendItem}.${$LEGEND.legendItem}-data3`);
					const circles = main.selectAll(`.${$CIRCLE.circles}.${$CIRCLE.circles}-data3 circle`);

					expect(target.size()).to.be.equal(1);
					expect(legendItem.size()).to.be.equal(1);
					expect(circles.size()).to.be.equal(6);

					done(1);
				}
			});
		}));
	});

	describe("timeseries data as column", () => {
		let date = ["2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"];

		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x"].concat(date),
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 5000, 2000, 1000, 4000, 1500, 2500]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				},
			};
		});

		it("should load additional data", () => new Promise(done => {
			const main = chart.$.main;
			const legend = chart.$.legend;

			chart.load({
				columns: [
					["x"].concat(date.concat().splice(1, 3)),
					["data3", 400, 500, 450]
				],
				done() {
					const target = main.select(`.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data3`);
					const legendItem = legend.select(`.${$LEGEND.legendItem}.${$LEGEND.legendItem}-data3`);
					const circles = main.selectAll(`.${$CIRCLE.circles}.${$CIRCLE.circles}-data3 circle`);
					const tickTexts = main.selectAll(`.${$AXIS.axisX} g.tick text`);

					expect(target.size()).to.be.equal(1);
					expect(legendItem.size()).to.be.equal(1);
					expect(circles.size()).to.be.equal(3);

					tickTexts.each(function(d, i) {
						const text = d3Select(this).select("tspan").text();

						expect(text).to.be.equal(date[i]);
					});

					done(1);
				}
			});
		}));
	});

	describe("category data", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "cat1", "cat2", "cat3", "cat4", "cat5", "cat6"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 5000, 2000, 1000, 4000, 1500, 2500]
					]
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		describe("as column", () => {
			it("should load additional data #1", () => new Promise(done => {
				const main = chart.$.main;
				const legend = chart.$.legend;

				chart.load({
					columns: [
						["x", "cat2", "cat3", "cat4"],
						["data3", 800, 500, 900]
					],
					done() {
						const target = main.select(`.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data3`);
						const legendItem = legend.select(`.${$LEGEND.legendItem}.${$LEGEND.legendItem}-data3`);
						const tickTexts = main.selectAll(`.${$AXIS.axisX} g.tick text`);
						const expected = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"];

						expect(target.size()).to.be.equal(1);
						expect(chart.$.circles.filter(d => d.id === "data3").size()).to.be.equal(3);
						expect(legendItem.size()).to.be.equal(1);

						tickTexts.each(function(d, i) {
							const text = d3Select(this).select("tspan").text();

							expect(text).to.be.equal(expected[i]);
						});

						done(1);
					}
				});
			}));

			it("should load additional data #2", () => new Promise(done => {
				const main = chart.$.main;
				const legend = chart.$.legend;

				chart.load({
					columns: [
						["x", "new1", "new2", "new3", "new4", "new5", "new6"],
						["data3", 800, 500, 900, 500, 1000, 700]
					],
					done() {
						const target = main.select(`.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data3`);
						const legendItem = legend.select(`.${$LEGEND.legendItem}.${$LEGEND.legendItem}-data3`);
						const tickTexts = main.selectAll(`.${$AXIS.axisX} g.tick text`);
						const expected = ["new1", "new2", "new3", "new4", "new5", "new6"];

						expect(target.size()).to.be.equal(1);
						expect(legendItem.size()).to.be.equal(1);

						tickTexts.each(function(d, i) {
							const text = d3Select(this).select("tspan").text();

							expect(text).to.be.equal(expected[i]);
						});

						done(1);
					}
				});
			}));
		});
	});

	describe("JSON data", () => {
		beforeAll(() => {
			args.data = {
				json: [
					{name: "www.site1.com", upload: 200, download: 200},
					{name: "www.site2.com", upload: 100, download: 300},
					{name: "www.site3.com", upload: 300, download: 200},
					{name: "www.site4.com", upload: 400, download: 100}
				],
				keys: {
					x: "name",
					value: ["upload", "download"]
				}
			};
		});

		it("should load json data", () => new Promise(done => {
			const json = [
				{name: "www.site5.com", upload: 300, download: 100},
				{name: "www.site6.com", upload: 400, download: 200},
				{name: "www.site7.com", upload: 200, download: 400},
				{name: "www.site8.com", upload: 100, download: 500}
			];

			chart.load({
				json,
				done() {
					const categories = chart.categories();
					const upload = chart.data.values("upload");
					const download = chart.data.values("download");

					json.forEach((v, i) => {
						expect(v.name).to.be.equal(categories[i]);
						expect(v.upload).to.be.equal(upload[i]);
						expect(v.download).to.be.equal(download[i]);
					});

					done(1);
				}
			});
		}));
	});

	describe("data point circle display", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 130, 100, 140, 200, 150],
						["data2", 230, 200, 240, 300, 250]
					  ]
				}
			};
		});

		it("when 'bar' type is loaded, circles should be removed", () => new Promise(done => {
			const circleSize = chart.$.circles.size();

			// when
			chart.load({
				columns: [
					["data1", 200, 140, 240, 250, 250]
				],
				type: "bar",
				done: function() {
					expect(chart.$.circles.size()).to.be.equal(circleSize / 2);
					done(1);
				}
			});
		}));
	});

	describe("y Axis Label", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						['data1', 30, 200, 100, 400, 150],
						['data2', 45, 423, 356, 478, 166]
					],
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					y: {
						label: {
							text: "Y Label",
								position: "outer-middle"
						},
						tick: {
							count: 5,
							format: d3Format("$,")
						}
					},
					y2:{
						show: true,
						label: {
							text: "Y2 Label",
							position: "outer-middle"
						}
					}
				}
			}
		});

		it("should be updated the axis label position ", () => new Promise(done => {
			const axisLabel = chart.$.main.select(`.${$AXIS.axisYLabel}`);
			const dy = +axisLabel.attr("dy");

			chart.load({
				columns: [
					["data5", 2300000, 1900000, 3000000, 5000000, 3000000]
				],
				unload: ["data1"],
				done() {
					setTimeout(() => {
						expect(+axisLabel.attr("dy")).to.be.below(dy);
						done(1);
					}, 300);
				}
			});
		}));

		it("check for .unload()", () => {
			const target = "data2";

			// when
			chart.unload({
				ids: target,
				done() {
					expect(chart.data(target).length).to.be.equal(0);
					expect(chart.internal.cache.get(target)).to.be.null;
				}
			});
		});
	});

	describe("check for event rect", () => {
		const cols = [
			["x",0, 10, 15, 20, 25, 30, 35, 40, 45, 50],
			["English",12,15,6,23,13,28,71,16,21,10],
			["Russian",0,0,1,2,0,0,5,0,1,1],
			["Spanish",0,3,0,2,0,0,1,0,1,2],
			["Portuguese",1,0,0,0,0,0,0,1,1,0],
			["German",0,0,0,0,0,1,0,0,0,1],
			["Dutch",0,0,0,0,0,0,0,0,0,0],
			["French",0,1,0,0,0,0,0,0,0,1],
			["Chinese",0,0,0,0,0,0,0,0,5,0],
		];
		const cols2 = [
			["x",0, 5, 7, 12, 20, 22, 23, 24, 30, 35],
			["English",12,9,31,26,17,6,11,23,20,12],
			["Russian",0,1,1,1,0,0,4,2,0,0],
			["Spanish",0,0,7,2,2,1,1,2,3,0],
			["Portuguese",1,1,4,0,0,0,0,0,0,0],
			["German",0,0,0,11,0,12,1,0,0,0],
			["Dutch",0,0,0,0,0,1,0,0,0,0],
			["French",0,0,2,2,0,0,0,0,2,0],
			["Chinese",0,0,0,0,0,0,0,0,0,0],
		];

		beforeAll(() => {
			args = {
				data: {
					x: "x",
					type: "area-spline",
					columns: cols
				}
			};
		});

		it("should be correctly updating eventRect elements", () => new Promise(done => {
			chart.load({
				columns: cols2,
				done() {
					let lastX = 0;

					chart.internal.state.eventReceiver.data.forEach(function(v, i) {
						const {x} = v;

						i > 0 && expect(x).to.be.above(lastX);
						lastX = x;
					});

					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {
				axis: {
					x: {
					  categories: [
						"xxxx PREFIX: column1",
						"xxxxxx PREFIX: column2",
						"x PREFIX: column3",
						"xx PREFIX: column4",
						"PREFIX: column5"
					  ],
					  tick: {
						rotate: 15,
						autorotate: true,
						multiline: false,
						culling: false,
						fit: true
					  },
					  clipPath: false,
					  type: "category"
					},
					y2: {
					  show: true
					}
				},
				data: {
					columns: [
						["series", 33200000, 24000000, 4280000, 16000, -155000]
					],
					type: "line"
				}
			}	
		});

		it("event rect size should update after .load() is called", () => new Promise(done => {
			// when
			chart.load({
				columns: [
					["data1", 130, 120, 150, 140, 160, 150],
					["data4", 30, 20, 50, 40, 60, 50]
				],
				unload: true,
				done: function() {
					const {internal: {$el, state}} = this;

					expect(+$el.eventRect.attr("width")).to.be.equal(state.width);
					expect(+$el.eventRect.attr("height")).to.be.equal(state.height);

					done(1);
				}
			});
		}));

		it("set options: initialize with empty data", () => {
			args = {
				data: {
					columns: [],
					type: "area"
				},
				background: {
					color: "red"
				}
			};
		});

		it("check for correct event binding", () => new Promise(done => {
			chart.load({
				xs: {
					data: 'dataX'
				},
				columns: [
					["data", 300, 350, 300, 200, 50, 300],
					["dataX", 1, 2, 3, 4, 5, 6],
				],
				done: function() {
					expect(this.internal.$el.eventRect.classed($EVENT.eventRect)).to.be.true;						

					this.tooltip.show({
						data: {
							x: 3,
							id: "data",
							value: 300
						}
					});

					const {tooltip} = this.$;
					
					expect(tooltip.select(".name").text()).to.be.equal("data");
					expect(+tooltip.select(".value").text()).to.be.equal(300);

					done(1);
				}
			});
		}));
	});

	describe("different type loading", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
					]
				}
			};
		});

		it("check 'line' -> 'area' type loading", () => new Promise(done => {
			const {areas} = chart.$.line;

			expect(areas).to.be.null;

			setTimeout(() => {
				chart.load({
					columns: [
						["data1", 100, 200, 300]
					],
					type: "area",
					done: function() {
						const {areas} = this.$.line;

						expect(areas && !areas.empty()).to.be.true;
						done(1);
					}
				});
			}, 300);
		}));

		it("set options data.type='area'", () => {
			args.data.type = "area";
		});

		it("check 'area' -> 'area-spline' type loading", () => new Promise(done => {
			const {areas} = chart.$.line;

			expect(areas && !areas.empty()).to.be.true;

			setTimeout(() => {
				chart.load({
					columns: [
						["data1", 100, 200, 300]
					],
					type: "area-spline",
					done: function() {
						const {areas} = this.$.line;

						expect(areas && !areas.empty()).to.be.true;

						// check for duplicated node appends
						expect(chart.$.main.selectAll(`.${$AREA.areas}`).size()).to.be.equal(1);
						done(1);
					}
				});
			}, 300);
		}));
	});

	describe("area-line-range type loading", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
						["data1",
							[150, 140, 110],
							[155, 130, 115],
							[160, 135, 120],
							[135, 120, 110],
							[180, 150, 130],
							[199, 160, 125]
						],
						["data2", 130, 340, 200, 500, 250, 350]
					],
					types: {
					  data1: "area-line-range"
					}
				},
				axis: {
					x: {
					  type: "timeseries",
					  tick: {
						format: "%Y-%m-%d"
					  }
					}
				}
			}
		});

		it("should render range area for newly loaded data", () => new Promise(done => {
			chart.load({
				columns: [
					["data3", [220, 215, 205], [240, 225, 215], [260, 235, 225], [280, 245, 235], [270, 255, 225], [240, 225, 215]],
				],
				types: {
					data3: "area-spline-range"
				},
				done: function() {
					expect(this.$.line.areas.filter(`.${$AREA.area}-data3`).size()).to.be.equal(1);

					done(1);
				}
			});
		}));
	});

	describe("should handle correct event rect lengths", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 130, 100, 140, 200, 150]
					]
				}
			};
		});

		it("should updating correct event rect length when loaded new data are lesser", () => new Promise(done => {
			chart.load({
				columns: [["data1", 100, 200]],
				unload: true,
				done: function() {
					expect(this.internal.state.eventReceiver.coords.length).to.be.equal(2);
					done(1);
				}
			});
		}));
	});

	describe("Append data loading", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["x", '2021-01-03T03:00:00', '2021-01-04T12:00:00', '2021-01-05T21:00:00'],
						["data1", 36, 30, 24]
					],
					x: "x",
					xFormat: "%Y-%m-%dT%H:%M:%S",
					type: "line"
				},
				axis: {
					x: {
						type: "timeseries"
					}
				}
			};
		});


		it("timeseries: check if data has been appended", () => new Promise(done => {
			const value = 37;

			chart.load({
				columns: [
					["x", "2021-02-01T08:00:00"],
					["data1", value]
				],
				append: true,
				done: function() {
					const oldData = args.data.columns[1].slice(1);
					const newData = this.data.values("data1");

					expect(newData.length).to.be.equal(oldData.length + 1);
					expect(newData).to.deep.equal(oldData.concat(value));
					done(1);
				}
			});
		}));

		it("set options", () => {
			args.data.columns[0] = ["x", "a", "b", "c"];
			args.axis.x.type = "category";
		});

		it("category: check if data has been appended", () => new Promise(done => {
			const category = "dd";
			const value = 37;

			chart.load({
				columns: [
					["x", category],
					["data1", value]
				],
				append: true,
				done: function() {
					const oldData = args.data.columns[1].slice(1);
					const newData = this.data.values("data1");

					expect(this.categories()).to.deep.equal(args.data.columns[0].slice(1).concat(category));
					expect(newData.length).to.be.equal(oldData.length + 1);
					expect(newData).to.deep.equal(oldData.concat(value));
					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 36, 30, 24]
					],
					type: "line"
				}
			};
		});

		it("indexed: check if data has been appended", () => new Promise(done => {
			const value = 37;

			chart.load({
				columns: [
					["data1", value]
				],
				append: true,
				done: function() {
					const oldData = args.data.columns[0].slice(1);
					const newData = this.data.values("data1");

					expect(newData.length).to.be.equal(oldData.length + 1);
					expect(newData).to.deep.equal(oldData.concat(value));
					expect(
						this.internal.$el.axis.x.selectAll(".tick text").nodes().map(v => +v.textContent)
					).to.deep.equal([0,1,2,3]);

					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {
				data: {
					rows: [
						["data1"],
						[90],
						[40],
					],
					type: "line"
				}
			}
		});

		it("row data: check if data has been appended", () => new Promise(done => {
			const value = 37;
			const oldData = chart.data.values("data1");

			chart.load({
				rows: [
					["data1"],
					[value]
				],
				append: true,
				done: function() {
					const newData = this.data.values("data1");

				 	expect(newData.length).to.be.equal(oldData.length + 1);
					expect(newData).to.deep.equal(oldData.concat(value));

					done(1);
				}
			});
		}));
	});

	describe("Append data loading with zoom-in state", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150],
					],
					type: "line"
				},
				zoom: {
					enabled: true
				},
				transition: {
					duration: 0
				}
			};
		});

		it("indexed axis type", () => new Promise(done => {
			const {$el, scale} = chart.internal;
			const zoomDomain = [1, 2];
			const orgDomain = scale.x.orgDomain().map(Math.abs);

			// when
			chart.zoom(zoomDomain);

			chart.load({
				columns: [['sample', 130, 150]],
				append: true,
				done() {
					// zoom state shoud persist
					expect(this.zoom()).to.deep.equal(zoomDomain);
					
					// zoom domain range should be increased
					expect(
						scale.x.orgDomain()
							.map(Math.abs)
							.every((v, i) => v > orgDomain[i])
					).to.be.true;

					// when
					chart.unzoom();
					
					const values = chart.data.values("sample");
					const ticks = $el.axis.x.selectAll(".tick:first-of-type, .tick:last-of-type")
						.nodes().map(v => +v.textContent);

					expect(ticks).to.be.deep.equal([0, values.length - 1]);

					done(1);
				}
			});
		}));
		
		it("set options: axis.x.type='category", () => {
			args.axis = {
				x: {
					type: "category"
				}
			};
		});

		it("category axis type", () => new Promise(done => {
			const {$el, scale} = chart.internal;
			const zoomDomain = [1, 2];
			const orgDomain = scale.x.orgDomain().map(Math.abs);

			// when
			chart.zoom(zoomDomain);

			chart.load({
				columns: [['sample', 130, 150]],
				append: true,
				done() {
					// zoom state shoud persist
					expect(this.zoom()).to.deep.equal(zoomDomain);

					// zoom domain range should be increased
					expect(
						scale.x.orgDomain()
							.map(Math.abs)
							.some((v, i) => v > orgDomain[i])
					).to.be.true;

					// when
					chart.unzoom();
					
					const values = chart.data.values("sample");
					const ticks = $el.axis.x.selectAll(".tick:first-of-type, .tick:last-of-type")
						.nodes().map(v => +v.textContent);

					expect(ticks).to.be.deep.equal([0, values.length - 1]);

					done(1);
				}
			});
		}));

		it("set options: axis.x.type='timeseries", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2023-10-01", "2023-10-02", "2023-10-03", "2023-10-04", "2023-10-05"],
						['sample', 30, 200, 100, 400, 150],
					],
					type: "line",
				},
				zoom: {
					enabled: true,
				},
				transition: {
					duration: 0,
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				}
			};
		});

		it("timeseires axis type", () => new Promise(done => {
			const {$el, scale} = chart.internal;
			const orgDomain = scale.x.orgDomain().map(Number);
			let zoomDomain = ["2023-10-2", "2023-10-3"];

			// when
			chart.zoom(zoomDomain);

			zoomDomain = scale.zoom.domain().map(Number);

			chart.load({
				columns: [
					["x", "2023-10-06", "2023-10-07"],
					['sample', 130, 150]
				],
				append: true,
				done() {
					// zoom state shoud persist
					expect(scale.zoom.domain().map(Number)).to.deep.equal(zoomDomain);

					// zoom domain range should be increased
					expect(
						scale.x.orgDomain()
							.map(Number)
							.some((v, i) => v > orgDomain[i])
					).to.be.true;

					// when
					chart.unzoom();
					
					const values = chart.data.values("sample");
					const ticks = $el.axis.x.selectAll(".tick:first-of-type, .tick:last-of-type")
						.nodes().map(v => +new Date(v.textContent));

					expect(ticks).to.be.deep.equal(["2023-10-01", "2023-10-07"].map(v => +new Date(v)));
					done(1);
				}
			});
		}));
	});

	describe("Multiple consecutive load call", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
					  ["data1", 30, 200, 100, 400, 150, 250],
					  ["data2", 50, 20, 10, 40, 15, 25]
					],
					type: "line"
				},
				transition: {
					duration: 0
				}
			};
		});

		it("should be rendered properly", () => new Promise(done => {
			new Promise((resolve, reject) => {
				chart.load({
					columns: [["data1", 230, 190, 300, 500, 300, 400]],
					unload: true,
					done: resolve
				});
			}).then(() => {
				return new Promise((resolve, reject) => {
					chart.load({
						columns: [["data3", 130, 150, 200, 300, 200, 100]],
						unload: true,
						done: resolve
					});
				});
			}).then(() => {
				chart.load({
					columns: [["data4", 100, 110, 120, 130, 140, 150]],
					unload: true,
					done: function() {
						const {axis} = this.internal.$el;
						const {lines} = this.$.line;
		
						expect(lines.size()).to.be.equal(1);
						expect(+axis.y.selectAll(".tick:last-of-type text").text()).to.be.equal(155);
						// expect(lines.attr("d")).to.be.equal("M6,390.125L124,319.375L241,248.625L359,177.875L476,107.125L594,36.375");

						done(1);
					}
				});
			});
		}));
	});

	describe("Check 'resizeAfter' option", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150]
					],
					type: "line"
				}
			};
		});

		it("should resize correctly after the load", () => new Promise(done => {
			const {height} = chart.internal.state;

			// when
			chart.load({
				columns: [
				   ["www-abcd-abcd", 100, 200, 150, 300],
				   ["www2-abcd-abcd", 200, 200, 150, 300],
				   ["www3-abcd-abcd", 300, 200, 150, 300],
				   ["www4-abcd-abcd", 400, 200, 150, 300],
				   ["www5-abcd-abcd", 500, 200, 150, 300],
				   ["www6-abcd-abcd", 600, 200, 150, 300],
				   ["www7-abcd-abcd", 700, 200, 150, 300]
				],
				resizeAfter: true,
				done: function() {
					const lastLegend = this.$.legend.select("g:last-child").node();
					const chartNode = this.$.chart.node();

					setTimeout(() => {
						expect(this.internal.state.height).to.be.below(height);
						expect(lastLegend.getBoundingClientRect().bottom).to.be.below(chartNode.getBoundingClientRect().bottom);
						
						done(1);
					}, 300);
				}
			});
		}));

		it("shouldn't resize after the load", () => new Promise(done => {
			const {height} = chart.internal.state;

			// when
			chart.load({
				columns: [
				   ["www-abcd-abcd", 100, 200, 150, 300],
				   ["www2-abcd-abcd", 200, 200, 150, 300],
				   ["www3-abcd-abcd", 300, 200, 150, 300],
				   ["www4-abcd-abcd", 400, 200, 150, 300],
				   ["www5-abcd-abcd", 500, 200, 150, 300],
				   ["www6-abcd-abcd", 600, 200, 150, 300],
				   ["www7-abcd-abcd", 700, 200, 150, 300]
				],
				done: function() {
					const lastLegend = this.$.legend.select("g:last-child").node();
					const chartNode = this.$.chart.node();

					setTimeout(() => {
						expect(this.internal.state.height).to.be.equal(height);
						expect(lastLegend.getBoundingClientRect().bottom).to.be.above(chartNode.getBoundingClientRect().bottom);
						
						done(1);
					}, 300);
				}
			});
		}));

		it("should resize correctly after the unload", () => new Promise(done => {
			// when
			chart.load({
				columns: [
				   ["www-abcd-abcd", 100, 200, 150, 300],
				   ["www2-abcd-abcd", 200, 200, 150, 300],
				   ["www3-abcd-abcd", 300, 200, 150, 300],
				   ["www4-abcd-abcd", 400, 200, 150, 300],
				   ["www5-abcd-abcd", 500, 200, 150, 300],
				   ["www6-abcd-abcd", 600, 200, 150, 300],
				   ["www7-abcd-abcd", 700, 200, 150, 300],
				],
				done: function() {
					this.unload({
                        ids: ["www-abcd-abcd", "www2-abcd-abcd", "www3-abcd-abcd"],
						resizeAfter: true,
						done: function() {
							const lastLegend = this.$.legend.select("g:last-child").node();
							const chartNode = this.$.chart.node();

							setTimeout(() => {
								const legendBottom = lastLegend.getBoundingClientRect().bottom;
								const chartBottom = chartNode.getBoundingClientRect().bottom;

								expect(legendBottom).to.be.closeTo(chartBottom, 10);
								expect(legendBottom < chartBottom).to.be.true;
								
								done(1);
							}, 300);
						}
                    })
				}
			});
		}));

		it("shouldn't resize after the unload", () => new Promise(done => {
			// when
			chart.load({
				columns: [
				   ["www-abcd-abcd", 100, 200, 150, 300],
				   ["www2-abcd-abcd", 200, 200, 150, 300],
				   ["www3-abcd-abcd", 300, 200, 150, 300],
				   ["www4-abcd-abcd", 400, 200, 150, 300],
				   ["www5-abcd-abcd", 500, 200, 150, 300],
				   ["www6-abcd-abcd", 600, 200, 150, 300],
				   ["www7-abcd-abcd", 700, 200, 150, 300],
				],
				done: function() {
					this.unload({
                        ids: ["www-abcd-abcd", "www2-abcd-abcd", "www3-abcd-abcd"],
						resizeAfter: false,
						done: function() {
							const lastLegend = this.$.legend.select("g:last-child").node();
							const chartNode = this.$.chart.node();

							setTimeout(() => {
								const legendBottom = lastLegend.getBoundingClientRect().bottom;
								const chartBottom = chartNode.getBoundingClientRect().bottom;

								expect(legendBottom).to.not.be.closeTo(chartBottom, 10);
								expect(chartBottom - legendBottom > 25).to.be.true;
								
								done(1);
							}, 300);
						}
                    })
				}
			});
		}));
	});

	describe("Check different type loading", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 20, 50, 40, 60, 50],
						["data2"]
					],
					type: "line", 
					types: {
						data2: "scatter"
					}
				}
			};
		});

		it("should generate 'scatter' when line type is used at generation.", () => new Promise(done => {
			chart.load({
				columns: [
					["data2", 200, 130, 90, 240, 130, 220],
				],
				done() {
					const pointer = this.$.circles.filter(({id}) => id === "data2");
					const target = {
						data: {
							x: 3,
							id: "data2",
							value: 240
						}
					}

					expect(pointer.size()).to.be.equal(this.data.values("data2").length);

					// when
					this.tooltip.show(target);

					expect(+this.$.tooltip.select(".value").text()).to.be.equal(target.data.value);

					// when unload
					this.unload({
						ids: ["data2"],
						done() {
							this.tooltip.show({x: 3});
							expect(+this.$.tooltip.select(".value").text()).to.be.equal(40);
	
							done(1);
						}
					});
				}
			});
		}));

		it("set options: data.types={data2: 'bubble'}", () => {
			args.data.types.data2 = "bubble";
		});

		it("should generate 'bubble' when line type is used at generation.", () => new Promise(done => {
			chart.load({
				columns: [
					["data2", 200, 130, 90, 240, 130, 220],
				],
				done() {
					const pointer = this.$.circles.filter(({id}) => id === "data2");
					const target = {
						data: {
							x: 3,
							id: "data2",
							value: 240
						}
					}

					expect(pointer.size()).to.be.equal(this.data.values("data2").length);

					// when
					this.tooltip.show(target);

					expect(+this.$.tooltip.select(".value").text()).to.be.equal(target.data.value);

					// when unload
					this.unload({
						ids: ["data2"],
						done() {
							this.tooltip.show({x: 3});
							expect(+this.$.tooltip.select(".value").text()).to.be.equal(40);
	
							done(1);
						}
					});
				}
			});
		}));
	});
});
