/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("SUBCHART", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	// do mouse drag selection
	const doDrag = (from = {clientX: 100, clientY: 100}, to = {clientX: 200, clientY: 200}) => {
		const overlay = chart.$.svg.select(".overlay").node();

		util.fireEvent(overlay, "mousedown", from, chart);
		util.fireEvent(overlay, "mousemove", to, chart);
		util.fireEvent(overlay, "mouseup", from, chart);
	};

	describe("generate subchart", () => {
		before(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "www.somesitename1.com", "www.somesitename2.com", "www.somesitename3.com"],
						["data1", 90, 100, 140],
						["data2", 130, 40, 200]
					],
					types: {
						data1: "bar",
						data2: "area-spline"
					}
				},
				axis: {
					x: {
					  type: "category"
					}
				},
				subchart: {
					show: true,
					axis: {
						x: {
							show: true,
							tick: {
								show: true,
								text: {
									show: true
								}
							}
						}
					}
				}
			};
		});

		it("should subchart elements generated", () => {
			const subchart = chart.$.svg.selectAll("[clip-path]").filter(function() {
				return /subchart/.test(this.getAttribute("clip-path"))
			}).node().parentNode;
			const children = subchart.children;

			expect(children.length).to.be.equal(3);

			expect(children[0].querySelectorAll(`.${CLASS.chartBars}, .${CLASS.chartLines}`).length).to.be.equal(2);
			expect(children[1].classList.contains(CLASS.brush)).to.be.true;
			expect(children[2].classList.contains(CLASS.axisX)).to.be.true;
		});

		it("set options subchart.size={height:80}", () => {
			args.subchart.size = {height: 80};
		});

		it("should be applied height value", () => {
			const height = +chart.$.svg.select(".overlay").attr("height");

			expect(height).to.be.equal(args.subchart.size.height);
		});

		it("should generate tick nodes", () => {
			const axis = chart.$.svg.selectAll(`.${CLASS.axisX}`).nodes()[1];

			expect(axis.querySelectorAll(".tick").length).to.be.equal(3);
			expect(axis.querySelectorAll(".tick line").length).to.be.equal(3);
			expect(axis.querySelectorAll(".tick text").length).to.be.equal(3);
		});

		it("set options subchart.axis.x.tick=false", () => {
			args.subchart.axis.x.tick.show = false;
		});

		it("shouldn't be generating tick lines", () => {
			const axis = chart.$.svg.selectAll(`.${CLASS.axisX}`).nodes()[1];

			expect(axis.querySelectorAll(".tick line").length).to.be.equal(0);
		});

		it("set options subchart.axis.x.tick.text=false", () => {
			args.subchart.axis.x.tick.show = true;
			args.subchart.axis.x.tick.text.show = false;
		});

		it("shouldn't be generating tick text", () => {
			const axis = chart.$.svg.selectAll(`.${CLASS.axisX}`).nodes()[1];

			expect(axis.querySelectorAll(".tick line").length).to.be.equal(3);
			expect(axis.querySelectorAll(".tick text").length).to.be.equal(0);
		});

		it("set options subchart.axis.x.show=false", () => {
			args.subchart.axis.x.show = false;
		});
		
		it("shouldn't be generating tick nodes", () => {
			const subchart = chart.$.svg.selectAll("[clip-path]").filter(function() {
				return /subchart/.test(this.getAttribute("clip-path"))
			}).node().parentNode;
			const axis = subchart.querySelector(`.${CLASS.axisX}`).children;

			expect(axis.length).to.be.equal(1);
			expect(axis[0].classList.contains("domain")).to.be.true;
		});

		it("set options subchart.show=false", () => {
			args.subchart.show = false;
		});

		it("shouldn't be generating subchart's nodes", () => {
			const subchart = chart.$.svg.selectAll("[clip-path]").filter(function() {
				return /subchart/.test(this.getAttribute("clip-path"))
			});

			expect(subchart.empty()).to.be.true;
			expect(chart.internal.clipSubchart).to.be.undefined;
		})
	});

	describe("subchart selection", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				subchart: {
					show: true
				}
			};
		});

		const checkSelection = done => {
			const selection = chart.$.svg.select(".selection");
			const baseWidth = 100;

			// mouse drag selection on subchart
			doDrag();

			expect(+selection.attr("width")).to.be.equal(baseWidth);

			// when
			chart.resize({width:400});

			// should be maintain zoom area after resize
			setTimeout(() => {
				expect(+selection.attr("width")).to.be.below(baseWidth);
				expect(chart.internal.scale.x.domain()).to.not.deep.equal(chart.internal.orgXDomain);
				done();
			}, 300);
		};

		it("should be select subchart area", checkSelection);

		it("set options axis.x.type='category'", () => {
			args.axis = {
				x: {
					type: "category",
					categories: ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"]
				}
			};
		});

		it("should be select subchart area for category type x axis", checkSelection);
	});

	describe("the extent", () => {
		before(() => {
			args = {
				data: {
					x: "x",
					columns: [
						['x', '2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04', '2019-01-05'],
						["data1", 10, 5, 3, 8, 7]
					]
				},
				subchart: {
					show: true
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						},
						extent: [0, 100]
					}
				}
			};
		});

		it("should be limiting selection area", () => {
			const selection = chart.$.svg.select(".selection");

			// mouse drag selection on subchart
			doDrag( {clientX: 0, clientY: 0}, {clientX: 300, clientY: 300});

			// selection shouldn't over pass
			expect(Math.floor(selection.attr("width"))).to.be.equal(args.axis.x.extent[1]);
		});

		it("set options axis.x.extent=datetime", () => {
			args.axis.x.extent = ["2019-01-01", "2019-01-02"];
		});

		it("should be limiting selection area for datetime extent", () => {
			const selection = chart.$.svg.select(".selection");			
			const range = args.axis.x.extent
				.map(v => chart.internal.scale.subX(new Date(v)))
				.reduce((a, c) => Math.abs(a - c));

			// mouse drag selection on subchart
			doDrag( {clientX: 0, clientY: 0}, {clientX: 300, clientY: 300});

			// selection shouldn't over pass
			expect(+selection.attr("width")).to.be.closeTo(range, 10);
		});

		it("set options axis.x.extent=[0, 100]", () => {
			args.axis.x.extent = (domain, scale) => [0, 100];
		});

		it("should be limiting selection area", () => {
			const selection = chart.$.svg.select(".selection");

			// mouse drag selection on subchart
			doDrag( {clientX: 0, clientY: 0}, {clientX: 300, clientY: 300});

			// selection shouldn't over pass
			expect(Math.floor(selection.attr("width"))).to.be.equal(args.axis.x.extent()[1]);
		});
	});

	describe("subchart rendering", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data 1", 59, 79, 99],
						["data 2", 118, 158, 198],
						["data 3", 177, 237, 297],
						["data 4", 236, 316, 396]
					],
					type : "area-spline",
					groups: [
						["data 1"],
						["data 2", "data 3", "data 4"]
					]
				},
				subchart: {
					show: true
				}
			};
		});

		const checkPath = (selector, expected) => {
			chart.$.svg.select(`.${CLASS.subchart}`)
				.selectAll(selector).each(function(d, i) {
					expect(this.getAttribute("d")).to.be.equal(expected[i]);
				});
		};

		it("check for area-spline", () => {
			checkPath(`.${CLASS.lines} path`, [
				'M6,56.448321599836746C6,56.448321599836746,201.16666666666669,55.645682413359175,299,55.244362820120394C396.8333333333333,54.84304322688161,593,54.04040404040404,593,54.04040404040404',
				'M6,52.896643199673505C6,52.896643199673505,201.16666666666669,51.291364826718365,299,50.488725640240794C396.8333333333333,49.686086453763224,593,48.08080808080808,593,48.08080808080808',
				'M6,42.241607999183756C6,42.241607999183756,201.16666666666669,38.2284120667959,299,36.221814100601975C396.8333333333333,34.21521613440805,593,30.202020202020208,593,30.202020202020208',
				'M6,28.03489439853076C6,28.03489439853076,201.16666666666669,20.81114172023262,299,17.199265381083556C396.8333333333333,13.587389041934493,593,6.363636363636374,593,6.363636363636374'
			]);

			checkPath(`.${CLASS.areas} path`, [
				'M6,56.448321599836746C6,56.448321599836746,201.16666666666669,55.645682413359175,299,55.244362820120394C396.8333333333333,54.84304322688161,593,54.04040404040404,593,54.04040404040404L593,60C593,60,396.8333333333333,60,299,60C201.16666666666669,60,6,60,6,60Z',
				'M6,52.896643199673505C6,52.896643199673505,201.16666666666669,51.291364826718365,299,50.488725640240794C396.8333333333333,49.686086453763224,593,48.08080808080808,593,48.08080808080808L593,60C593,60,396.8333333333333,60,299,60C201.16666666666669,60,6,60,6,60Z',
				'M6,42.241607999183756C6,42.241607999183756,201.16666666666669,38.2284120667959,299,36.221814100601975C396.8333333333333,34.21521613440805,593,30.202020202020208,593,30.202020202020208L593,48.08080808080808C593,48.08080808080808,396.8333333333333,49.686086453763224,299,50.488725640240794C201.16666666666669,51.291364826718365,6,52.896643199673505,6,52.896643199673505Z',
				'M6,28.03489439853076C6,28.03489439853076,201.16666666666669,20.81114172023262,299,17.199265381083556C396.8333333333333,13.587389041934493,593,6.363636363636374,593,6.363636363636374L593,30.202020202020208C593,30.202020202020208,396.8333333333333,34.21521613440805,299,36.221814100601975C201.16666666666669,38.2284120667959,6,42.241607999183756,6,42.241607999183756Z'
			]);
		});

		it("set options data.type='area-step'", () => {
			args.data.type = "area-step";
		});

		it("check for area-step type", () => {
			checkPath(`.${CLASS.lines} path`, [
				'M6,56.448321599836746L152.5,56.448321599836746L152.5,55.244362820120394L446,55.244362820120394L446,54.04040404040404L593,54.04040404040404',
				'M6,52.896643199673505L152.5,52.896643199673505L152.5,50.488725640240794L446,50.488725640240794L446,48.08080808080808L593,48.08080808080808',
				'M6,42.241607999183756L152.5,42.241607999183756L152.5,36.221814100601975L446,36.221814100601975L446,30.202020202020208L593,30.202020202020208',
				'M6,28.03489439853076L152.5,28.03489439853076L152.5,17.199265381083556L446,17.199265381083556L446,6.363636363636374L593,6.363636363636374'
			]);

			checkPath(`.${CLASS.areas} path`, [
				'M6,56.448321599836746L152.5,56.448321599836746L152.5,55.244362820120394L446,55.244362820120394L446,54.04040404040404L593,54.04040404040404L593,60L446,60L446,60L152.5,60L152.5,60L6,60Z',
				'M6,52.896643199673505L152.5,52.896643199673505L152.5,50.488725640240794L446,50.488725640240794L446,48.08080808080808L593,48.08080808080808L593,60L446,60L446,60L152.5,60L152.5,60L6,60Z',
				'M6,42.241607999183756L152.5,42.241607999183756L152.5,36.221814100601975L446,36.221814100601975L446,30.202020202020208L593,30.202020202020208L593,48.08080808080808L446,48.08080808080808L446,50.488725640240794L152.5,50.488725640240794L152.5,52.896643199673505L6,52.896643199673505Z',
				'M6,28.03489439853076L152.5,28.03489439853076L152.5,17.199265381083556L446,17.199265381083556L446,6.363636363636374L593,6.363636363636374L593,30.202020202020208L446,30.202020202020208L446,36.221814100601975L152.5,36.221814100601975L152.5,42.241607999183756L6,42.241607999183756Z'
			]);
		});
		
		it("set options data.type='bar'", () => {
			args.data.type = "bar";
		});

		it("check for bar type", () => {
			checkPath(`.${CLASS.bars} path`, [
				'M40.2,60V56.448321599836746 H100 V60z',
				'M239.2,60V55.244362820120394 H299 V60z',
				'M439.2,60V54.04040404040404 H499 V60z',
				'M100,60V52.896643199673505 H159.8 V60z',
				'M299,60V50.488725640240794 H358.8 V60z',
				'M499,60V48.08080808080808 H558.8 V60z',
				'M100,52.896643199673505V42.241607999183756 H159.8 V52.896643199673505z',
				'M299,50.488725640240794V36.221814100601975 H358.8 V50.488725640240794z',
				'M499,48.08080808080808V30.202020202020208 H558.8 V48.08080808080808z',
				'M100,42.241607999183756V28.03489439853076 H159.8 V42.241607999183756z',
				'M299,36.221814100601975V17.199265381083556 H358.8 V36.221814100601975z',
				'M499,30.202020202020208V6.363636363636374 H558.8 V30.202020202020208z'
			]);
		});

		it("set options data.type='line'", () => {
			args.data.type = "line";
			delete args.data.groups;
		});

		it("check for non-grouped line type", () => {
			checkPath(`.${CLASS.lines} path`, [
				'M6,55.083333333333336L299,52.16543026706231L593,49.24752720079129',
				'M6,46.47551928783382L299,40.63971315529179L593,34.80390702274976',
				'M6,37.867705242334324L299,29.11399604352127L593,20.36028684470821',
				'M6,29.259891196834815L299,17.588278931750743L593,5.9166666666666625'
			]);
		});

		it("set options", () => {
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
				},
				subchart: {
					show: true
				}
			};
		});

		it("check for area-line-range type", () => {
			checkPath(`.${CLASS.lines} path`, [
				'M6,44.981818181818184L124,46.054545454545455L241,45.518181818181816L358,47.12727272727273L475,43.909090909090914L593,42.836363636363636',
				'M6,46.054545454545455L124,23.527272727272727L241,38.54545454545455L358,6.363636363636366L475,33.18181818181818L593,22.454545454545457'
			]);

			checkPath(`.${CLASS.areas} path`, [
				'M6,48.2L124,47.663636363636364L241,47.12727272727273L358,48.2L475,46.054545454545455L593,46.590909090909086L593,38.65272727272727L475,40.690909090909095L358,45.518181818181816L241,42.836363636363636L124,43.372727272727275L6,43.909090909090914Z',
				'M 6 256.81818181818187'
			]);
		});
	});
});
