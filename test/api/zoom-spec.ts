/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import sinon from "sinon";
import {parseDate} from "../../src/module/util";
import util from "../assets/util";
import {$AXIS, $EVENT} from "../../src/config/classes";

describe("API zoom", function() {
	let chart;

	describe("zoom line chart #1", () => {
		const spy = sinon.spy();

		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				},
				zoom: {
					enabled: true,
					onzoom: spy
				},
				transition: {
					duration: 0
				}
			});
		});

		it("should be zoomed properly", done => {
			const target = [3, 5];

			chart.zoom(target);

			setTimeout(() => {
				const domain = chart.internal.scale.zoom.domain().map(Math.round);

				expect(domain[0]).to.be.equal(target[0]);
				expect(domain[1]).to.be.equal(target[1]);

				// onzoom callback has been called?
				expect(spy.called).to.be.true;
				expect(spy.args[0][0].map(Math.round)).to.be.deep.equal(target);

				done();
			}, 350);
		});

		it("should be zoomed properly again", done => {
			const target = [1, 4];

			chart.zoom(target);

			setTimeout(() => {
				const domain = chart.internal.scale.zoom.domain().map(Math.round);

				expect(domain[0]).to.be.equal(target[0]);
				expect(domain[1]).to.be.equal(target[1]);

				done();
			}, 350);
		});

		it("should be zoomed and showing focus grid properly when target contained minus value", () => {
			const target = [-2, 3]; // zoom in cotaining minus value

			chart.zoom(target);

			const zoomScale = chart.internal.scale.zoom;

			// If target contained minus value should not be null
			expect(zoomScale).to.not.be.null;

			const domain = chart.internal.scale.zoom.domain().map(Math.round);

			// domain value must be above than target
			expect(domain[0]).to.be.above(target[0]);
			expect(domain[1]).to.be.above(target[1]);
		});
	});

	describe("zoom line chart #2", () => {
		before(() => {
			chart = util.generate({
				data: {
					x: "date",
					columns: [
						["date", "2014-01-01", "2014-01-02", "2014-08-01", "2014-10-19"],
						["data1", 30, 200, 100, 400]
					]
				},
				axis: {
					x: {
						type: "timeseries"
					}
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("should be zoomed properly (new Date)", done => {
			const target = [new Date(2014, 7, 1), new Date(2014, 8, 1)];

			chart.zoom(target);

			setTimeout(() => {
				const domain = chart.internal.scale.zoom.domain();

				expect(domain[0].getFullYear()).to.be.equal(target[0].getFullYear());
				expect(domain[0].getMonth()).to.be.equal(target[0].getMonth());
				expect(domain[0].getDate()).to.be.equal(target[0].getDate());
				expect(domain[1].getFullYear()).to.be.equal(target[1].getFullYear());
				expect(domain[1].getMonth()).to.be.equal(target[1].getMonth());
				expect(domain[1].getDate()).to.be.equal(target[1].getDate());

				done();
			}, 500);
		});

		it("should be zoomed properly (string)", done => {
			const target = ["2014-08-01", "2014-09-01"];

			chart.zoom(target);

			setTimeout(() => {
				const {internal} = chart;
				const domain = chart.internal.scale.zoom.domain();
				const targetDate = [parseDate.call(internal, target[0]), parseDate.call(internal, target[1])];

				expect(domain[0].getFullYear()).to.be.equal(targetDate[0].getFullYear());
				expect(domain[0].getMonth()).to.be.equal(targetDate[0].getMonth());
				expect(domain[0].getDate()).to.be.equal(targetDate[0].getDate());
				expect(domain[1].getFullYear()).to.be.equal(targetDate[1].getFullYear());
				expect(domain[1].getMonth()).to.be.equal(targetDate[1].getMonth());
				expect(domain[1].getDate()).to.be.equal(targetDate[1].getDate());

				done();
			}, 500)
		});
	});

	describe("zoom category type", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					x: {
						type: "category"
					}
				},
				zoom: {
					enabled: true
				},
				transition: {
					duration: 0
				}
			});
		});

		it("should be zoomed properly", done => {
			const target = [1,2];

			chart.zoom(target);

			setTimeout(() => {
				const {internal} = chart;
				const {state, zoom} = internal;

				const rectlist = state.eventReceiver.coords
					.filter((v, i) => target.indexOf(i) !== -1);

				const rectSize = rectlist[0].w;
				const domain = internal.zoom.getDomain();

				expect(domain).to.deep.equal(target);

				rectlist.forEach(function(v, i) {
					const {x} = v;

					expect(x * i).to.be.closeTo(rectSize * i, 5);
				});

				done();
			}, 350);
		});
	});

	describe("zoom bar chart", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					],
					type: "bar"
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("should be zoomed properly", done => {
			const rectlist = chart.$.main.selectAll(`.${$EVENT.eventRect}`).nodes();
			const rect = [];

			// when
			chart.zoom([3, 5]);

			setTimeout(() => {
				rectlist.forEach(function(el, i) {
					const x = +el.getAttribute("x");
					const width = +el.getAttribute("width");

					if (i > 0) {
						expect(rect[i - 1]).to.be.equal(x);
					}

					rect.push(x + width);
				});

				done();
			}, 500)
		});
	});

	describe("unzoom", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				zoom: {
					enabled: true
				},
				transition: {
					duration: 0
				}
			});
		});

		it("should be unzoomed properly", done => {
			const internal = chart.internal;
			const target = [1, 4];
			const original = internal.scale.x.domain();
			let domain;

			chart.zoom(target);

			domain = internal.scale.zoom.domain().map(Math.round);

			expect(domain[0]).to.be.equal(target[0]);
			expect(domain[1]).to.be.equal(target[1]);

			chart.unzoom();

			setTimeout(() => {
				domain = chart.internal.scale.x.domain();

				expect(domain[0]).to.be.equal(original[0]);
				expect(domain[1]).to.be.equal(original[1]);

				done();
			}, 350);
		});
	});

	describe("zoom.enable()", () => {
		chart = util.generate({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				]
			},
			zoom: {
				enabled: true
			},
			transition: {
				duration: 0
			}
		});

		it("should be disabled & enabled zoom", () => {
			const {main} = chart.$;
			const {eventReceiver: {coords}} = chart.internal.state;
			const domain = [1, 2];

			// when disable zoom
			chart.zoom.enable(false);

			//const selector = `.${$EVENT.eventRect}-1`;
			const xValue = coords[1].x;
			const tickTransform = [];

			main.selectAll(`.${$AXIS.axisX} .tick`).each(function() {
				tickTransform.push(this.getAttribute("transform"));
			});

			// check the returned domain value
			chart.zoom(domain).map(Math.round).forEach((v, i) => {
				expect(v).to.not.equal(domain[i]);
			});

			expect(coords[1].x).to.be.equal(xValue);

			// check x Axis to not be zoomed
			main.selectAll(`.${$AXIS.axisX} .tick`).each(function(i) {
				expect(this.getAttribute("transform")).to.be.equal(tickTransform[i]);
			});

			// when enable zoom
			chart.zoom.enable(true);

			chart.zoom(domain).map(Math.round).forEach((v, i) => {
				expect(v).to.equal(domain[i]);
			});

			expect(coords[1].x).to.below(xValue);
		});
	});

	describe("zoom.min/max/range()", () => {
		chart = util.generate({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250]
				]
			},
			zoom: {
				enabled: true
			}
		});

		it("should be updated the minimum zoom range", done => {
			const range = chart.zoom.min(-1);
			const zoomRange = chart.zoom([-1, 1]);

			expect(Math.round(zoomRange[0])).to.be.equal(range);

			setTimeout(() => {
				expect(+chart.$.main.select(`.${$AXIS.axisX} .tick`).attr("transform").match(/\d+/)[0]).to.be.above(250);
				done();
			}, 300);
		});

		it("should be updated the maximum zoom range", done => {
			const range = chart.zoom.max(6);
			const zoomRange = chart.zoom([4, 6]);

			expect(Math.round(zoomRange[1])).to.be.equal(range);

			setTimeout(() => {
				const tick = chart.$.main.selectAll(`.${$AXIS.axisX} .tick`);

				expect(+tick.filter(`:nth-child(${tick.size() + 1})`).attr("transform").match(/\d+/)[0]).to.be.below(500);
				done();
			}, 300);
		});

		it("should be updated zoom range", done => {
			const main = chart.$.main;
			const range = chart.zoom.range({
				min: -2,
				max: 7
			});

			// check the min range
			let zoomRange = chart.zoom([-2, 1]);

			expect(Math.round(zoomRange[0])).to.be.equal(range.min);
			expect(+main.select(`.${$AXIS.axisX} .tick`).attr("transform").match(/\d+/)[0]).to.be.above(350);

			// check the max range
			zoomRange = chart.zoom([5, 7]);

			expect(Math.round(zoomRange[1])).to.be.equal(range.max);

			setTimeout(() => {
				const tick = main.selectAll(`.${$AXIS.axisX} .tick`);

				expect(+tick.filter(`:nth-child(${tick.size() + 1})`).attr("transform").match(/\d+/)[0]).to.be.below(5);
				done();
			}, 300);
		});
	});

	describe("bar's width based on ratio", () => {
		before(() => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "bar"
				},
				bar: {
					width: {
						ratio: 0.8
					}
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("check bar's width for zoom in/out API call", done => {
			const len = [];

			chart.$.bar.bars.each(function() {
				len.push(this.getTotalLength());
			});

			// when
			chart.zoom([1, 2]);

			new Promise((resolve, reject) => {
				setTimeout(() => {
					chart.$.bar.bars.each(function(d, i) {
						expect(this.getTotalLength()).to.be.greaterThan(len[i]);
					});

					resolve(undefined);
				}, 350);
			}).then(() => {
				// when
				chart.unzoom();
				
			}).then(() => {
				setTimeout(() => {
					chart.$.bar.bars.each(function(d, i) {
						expect(this.getTotalLength()).to.be.closeTo(len[i], 2.5);
					});

					done();
				}, 500);
			});
		});
	});

	describe("zoom for timeseries axis type", () => {
		before(() => {
			chart = util.generate({
				data: {
					rows: [
						["x", "A"],
						["2021-01-01", 1],
						["2021-01-02", 2],
						["2021-01-03", 4]
					],
					x: "x",
					xFormat: "%Y-%m-%d",
					type: "line"
				},
				axis: {
					x: {
						type: "timeseries"
					}
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("should zoomed", done => {
			const range = ["2021-01-01", "2021-01-02"];

			// when
			const domain = chart.zoom(range);

			setTimeout(() => {
				domain.forEach((v, i) => {
					expect(v).to.be.deep.equal(parseDate.call(chart.internal, range[i]));
				});

				done();
			}, 500);
		});
	});

	describe("zoom events", () => {
		const onzoomstartSpy = sinon.spy();
		const onzoomSpy = sinon.spy();
		const onzoomendSpy = sinon.spy();
		let args = {
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250],
					["data2", 50, 20, 10, 40, 15, 25],
					["data3", 150, 120, 110, 140, 115, 125]
				]
			},
			transition: {
				duration: 0
			},
			zoom: {
				enabled: true,
				type: "whee",
				onstart: onzoomstartSpy,
				onzoom: onzoomSpy,
				onzoomend: onzoomendSpy
			}
		}

		beforeEach(() => {
			chart = util.generate(args);

			onzoomstartSpy.resetHistory();
			onzoomSpy.resetHistory();
			onzoomendSpy.resetHistory();
		});

		// check zoom event triggers
		function chkZoomEvents() {
			// when
			chart.zoom([1, 2]);

			// only 'onzoom' event should be called.
			expect(onzoomstartSpy.called).to.be.false;
			expect(onzoomSpy.calledOnce).to.be.true;
			expect(onzoomendSpy.called).to.be.false;
			
			onzoomstartSpy.resetHistory();
			onzoomSpy.resetHistory();
			onzoomendSpy.resetHistory();

			// when
			chart.unzoom();

			// on unzoom, no event should be called.
			expect([onzoomstartSpy.called, onzoomSpy.called, onzoomendSpy.called].every(v => v === false)).to.be.true;
		}

		it("wheel type: check for zoom events trigger", ()=> {
			chkZoomEvents();
		});

		it("set options: zoom.type='drag'", () => {
			args.zoom.type = "drag";
		});

		it("drag type: check for zoom events trigger", ()=> {
			chkZoomEvents();
		});
	});
});
