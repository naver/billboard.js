/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import {parseDate} from "../../src/module/util";
import util from "../assets/util";
import {$AXIS, $EVENT} from "../../src/config/classes";

describe("API zoom", function() {
	let chart;

	describe("zoom line chart #1", () => {
		const spy = sinon.spy();

		beforeAll(() => {
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

		it("should be zoomed properly", () => new Promise(done => {
			const target = [3, 5];

			chart.zoom(target);

			expect(chart.zoom()).to.deep.equal(target);

			setTimeout(() => {
				const domain = chart.internal.scale.zoom.domain().map(Math.round);

				expect(domain[0]).to.be.equal(target[0]);
				expect(domain[1]).to.be.equal(target[1]);

				// onzoom callback has been called?
				expect(spy.called).to.be.true;
				expect(spy.args[0][0].map(Math.round)).to.be.deep.equal(target);

				done(1);
			}, 350);
		}));

		it("should be zoomed properly again", () => new Promise(done => {
			const target = [1, 4];

			chart.zoom(target);

			setTimeout(() => {
				const domain = chart.internal.scale.zoom.domain().map(Math.round);

				expect(domain[0]).to.be.equal(target[0]);
				expect(domain[1]).to.be.equal(target[1]);

				done(1);
			}, 350);
		}));

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
		beforeAll(() => {
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

		it("should be zoomed properly (new Date)", () => new Promise(done => {
			const target = [new Date(2014, 7, 1), new Date(2014, 8, 1)];

			chart.zoom(target);

			expect(chart.zoom()).to.deep.equal(target);			

			setTimeout(() => {
				const domain = chart.internal.scale.zoom.domain();

				expect(domain[0].getFullYear()).to.be.equal(target[0].getFullYear());
				expect(domain[0].getMonth()).to.be.equal(target[0].getMonth());
				expect(domain[0].getDate()).to.be.equal(target[0].getDate());
				expect(domain[1].getFullYear()).to.be.equal(target[1].getFullYear());
				expect(domain[1].getMonth()).to.be.equal(target[1].getMonth());
				expect(domain[1].getDate()).to.be.equal(target[1].getDate());

				done(1);
			}, 300);
		}));

		it("should be zoomed properly (string)", () => new Promise(done => {
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

				done(1);
			}, 500)
		}));
	});

	describe("zoom category type", () => {
		beforeAll(() => {
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

		it("should be zoomed properly", () => new Promise(done => {
			const target = [1,2];

			chart.zoom(target);

			expect(chart.zoom()).to.deep.equal(target);

			setTimeout(() => {
				const {internal} = chart;
				const {state, zoom} = internal;

				const rectlist = state.eventReceiver.coords
					.filter((v, i) => target.indexOf(i) !== -1);

				const rectSize = rectlist[0].w;
				const domain = internal.zoom.getDomain().map(Math.floor);

				expect(domain).to.deep.equal(target);

				rectlist.forEach(function(v, i) {
					const {x} = v;

					expect(x * i).to.be.closeTo(rectSize * i, 5);
				});

				done(1);
			}, 350);
		}));
	});

	describe("zoom bar chart", () => {
		beforeAll(() => {
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

		it("should be zoomed properly", () => new Promise(done => {
			const rectlist = chart.$.main.selectAll(`.${$EVENT.eventRect}`).nodes();
			const rect: number[] = [];

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

				done(1);
			}, 500)
		}));
	});

	describe("unzoom", () => {
		beforeAll(() => {
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

		it("should be unzoomed properly", () => new Promise(done => {
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

				done(1);
			}, 350);
		}));
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
			const tickTransform: string[] = [];

			main.selectAll(`.${$AXIS.axisX} .tick`).each(function() {
				tickTransform.push(this.getAttribute("transform"));
			});

			// check the returned domain value
			expect(chart.zoom(domain)).to.be.undefined;

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

		it("should be updated the minimum zoom range", () => new Promise(done => {
			const range = chart.zoom.min(-1);
			const zoomRange = chart.zoom([-1, 1]);

			expect(Math.round(zoomRange[0])).to.be.equal(range);

			setTimeout(() => {
				expect(+chart.$.main.select(`.${$AXIS.axisX} .tick`).attr("transform").match(/\d+/)[0]).to.be.above(250);
				done(1);
			}, 300);
		}));

		it("should be updated the maximum zoom range", () => new Promise(done => {
			const range = chart.zoom.max(6);
			const zoomRange = chart.zoom([4, 6]);

			expect(Math.round(zoomRange[1])).to.be.equal(range);

			setTimeout(() => {
				const tick = chart.$.main.selectAll(`.${$AXIS.axisX} .tick`);

				expect(+tick.filter(`:nth-child(${tick.size() + 1})`).attr("transform").match(/\d+/)[0]).to.be.below(500);
				done(1);
			}, 300);
		}));

		it("should be updated zoom range", () => new Promise(done => {
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
				done(1);
			}, 300);
		}));
	});

	describe("bar's width based on ratio", () => {
		beforeAll(() => {
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

		it("check bar's width for zoom in/out API call", () => new Promise(done => {
			const len: number[] = [];

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

					done(1);
				}, 300);
			});
		}));
	});

	describe("zoom for timeseries axis type", () => {
		beforeAll(() => {
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

		it("should zoomed", () => new Promise(done => {
			const range = ["2021-01-01", "2021-01-02"];

			// when
			const domain = chart.zoom(range);

			setTimeout(() => {
				domain.forEach((v, i) => {
					expect(v).to.be.deep.equal(parseDate.call(chart.internal, range[i]));
				});

				done(1);
			}, 300);
		}));
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

	describe("zoom for timeseries axis type", () => {
		beforeAll(() => {
			chart = util.generate({
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
					],
					type: "line"
				},
				legend: {
					show: true
				},
				zoom: {
					enabled: true, 
					type: "drag",
				},
				transition: {
					duration: 0
				}
			});
		});

		it("unzoom after adding xgrid dynamically.", () => {
			const {internal: $$} = chart;

			// zoom
			chart.zoom([30, 40]);

			const {$el: {eventRect}, scale: {x, zoom}} = $$;
			const xDomain = x.domain().reduce((prev, curr) => prev + curr);
			const zoomDomain = zoom.domain().reduce((prev, curr) => prev + curr);

			// when
			chart.xgrids([{value: 33, text: "123"}]);

			expect(zoomDomain).to.be.above(xDomain);

			// unzoom
			chart.unzoom();

			expect($$.scale.x.domain()).to.be.deep.equal(x.domain());
			expect($$.scale.zoom).to.be.null;
		});

		it("unzoom after adding regions dynamically.", () => {
			const {internal: $$} = chart;

			// zoom
			chart.zoom([30, 40]);

			const {$el: {eventRect}, scale: {x, zoom}} = $$;
			const xDomain = x.domain().reduce((prev, curr) => prev + curr);
			const zoomDomain = zoom.domain().reduce((prev, curr) => prev + curr);

			// when
			chart.regions([{axis: "x", start: 30, end: 35}]);

			expect(zoomDomain).to.be.above(xDomain);

			// unzoom
			chart.unzoom();

			expect($$.scale.x.domain()).to.be.deep.equal(x.domain());
			expect($$.scale.zoom).to.be.null;		  	
		});
	});

	describe("zoom extent", () => {
		beforeAll(() => {
			chart = util.generate({
				data: {
					json: [
						{"date":"2023-09-30 00:00:00","ek_house":0},
						{"date":"2023-10-14 00:00:00","ek_house":0},
						{"date":"2023-10-21 00:00:00","ek_house":0},
						{"date":"2023-10-28 00:00:00","ek_house":0},
						{"date":"2023-11-04 00:00:00","ek_house":0},
					],
					keys: {
						x: "date",
						value: ["ek_house"],
					},
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						},
					},
					y: {
						show: false
					}
				},
				zoom: {
					enabled: true
				}
			});
		});

		it("shouldn't throw error for timeseries x axis, when is given out of range.", () => new Promise(done => {
			chart.zoom([1697701666380, 1697702008724]);
			
			setTimeout(() => {
				chart.$.circles.each(function() {
					expect(this.getAttribute("cx") !== "NaN").to.be.true;
				});

				done(1);
			}, 300);
		}));

		it("shouldn't throw error for indexed x axis, when is given out of range.", () => new Promise(done => {
			chart = util.generate({
				data: {
					columns: [
						["data2", 130, 100, 140, 200, 150, 50, 120, 100, 80, 90]
					],
				},
				zoom: {
					enabled: true
				},
				axis: {
					y: {
						show: false
					}
				}
			});

			chart.zoom([
				4.908784864317814,
				4.908812566017803
			]);

			setTimeout(() => {
				chart.$.circles.each(function() {
					expect(this.getAttribute("cx") !== "NaN").to.be.true;
				});

				done(1);
			}, 300);
		}));
	});
});
