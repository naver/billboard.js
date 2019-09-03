/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
var demos = {
	Chart: {
		AreaChart: {
			options: {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					types: {
						data1: "area",
						data2: 'area-spline'
					}
				}
			}
		},
		AreaRangeChart: {
			options: {
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

			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["data3", [220, 215, 205], [240, 225, 215], [260, 235, 225], [280, 245, 235], [270, 255, 225], [240, 225, 215]],
							],
							types: {
								data3: "area-spline-range"
							}
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data4",
									{high: 155, low: 145, mid: 150},
									{high: 200, mid: 190, low: 150},
									{high: 230, mid: 215, low: 200},
									{high: 210, mid: 200, low: 180},
									{high: 220, mid: 210, low: 190},
									{high: 200, mid: 180, low: 160}
								]
							],
							types: {
								data4: "area-spline-range"
							}
						});
					}, 1500)
				];
			}
		},
		BarChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				},
				bar: {
					width: {
						ratio: 0.5 // this makes bar width 50% of length between ticks
					}
					// or
					//width: 100 // this makes bar width 100px
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["data3", 130, -150, 200, 300, -200, 100]
							]
						});
					}, 1000)
				];
			}
		},
		BubbleChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 350, 200, 380, 150, 250, 50, 80, 55, 220],
						["data2", 130, 100, 10, 200, 80, 50, 200, 123, 185, 98],
						["data3", 230, 153, 85, 300, 250, 120, 5, 84, 99, 289]
					],
					type: "bubble",
					labels: true
				},
				bubble: {
					maxR: 50
				},
				axis: {
					x: {
						type: "category"
					},
					y: {
						max: 450
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["data1", 100, 50, 150, 200, 100, 350, 58, 210, 80, 126]
							]
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data2", 305, 350, 55, 25, 335, 29, 258, 310, 180, 226]
							]
						});
					}, 2000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data3", 223, 121, 259, 247, 53, 159, 95, 111, 307, 337]
							]
						});
					}, 3000)
				];
			}
		},
		BubbleDimensionChart: {
			options: {
				data: {
					columns: [
						["data1", 20, 30, 50, 80, 100],
						["data2", [350, 350], 230, [200, 100], [250, 150], [200, 200]],
						["data3", {y: 80, z: 70}, {y: 350, z: 50}, {y: 350, z: 70}, {y: 150, z: 150}, [310, 100]],
						["data4", [270, 150], [100, 200], [300, 100], [450, 150], [400, 60]],
						["data5", [170, 110], [430, 80], [100, 50], [350, 150], [480, 30]],
					],
					type: "bubble",
					labels: true
				},
				bubble: {
					maxR: 50
				},
				axis: {
					x: {
						type: "category"
					},
					y: {
						max: 450
					}
				}
			}
		},
		CombinationChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 20, 50, 40, 60, 50],
						["data2", 200, 130, 90, 240, 130, 220],
						["data3", 300, 200, 160, 400, 250, 250],
						["data4", 200, 130, 90, 240, 130, 220],
						["data5", 130, 120, 150, 140, 160, 150],
						["data6", 90, 70, 20, 50, 60, 120],
						["data7", 283, 170, 275, 143, 220, 255]
					],
					type: "bar",
					types: {
						data3: "spline",
						data4: "line",
						data6: "area",
						data7: "step"
					},
					groups: [
						["data1", "data2"]
					]
				}
			}
		},
		DonutChart: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 120],
					],
					type: "donut",
					onclick: function(d, i) {
						console.log("onclick", d, i);
					},
					onover: function(d, i) {
						console.log("onover", d, i);
					},
					onout: function(d, i) {
						console.log("onout", d, i);
					}
				},
				donut: {
					title: "Iris Petal Width"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
								["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
								["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
							]
						});
					}, 1500),

					setTimeout(function() {
						chart.unload({
							ids: "data1"
						});
						chart.unload({
							ids: "data2"
						});
					}, 2500)
				];
			}
		},
		GaugeChart: {
			options: {
				data: {
					columns: [
						["data", 91.4]
					],
					type: "gauge",
					onclick: function(d, i) {
						console.log("onclick", d, i);
					},
					onover: function(d, i) {
						console.log("onover", d, i);
					},
					onout: function(d, i) {
						console.log("onout", d, i);
					}
				},
				gauge: {
					//        label: {
					//            format: function(value, ratio) {
					//                return value;
					//            },
					//            show: false // to turn off the min/max labels.
					//        },
					//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
					//    max: 100, // 100 is default
					//    units: ' %',
					//    width: 39 // for adjusting arc thickness
				},
				color: {
					pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
					threshold: {
						// unit: "value", // percentage is default
						// max: 200, // 100 is default
						values: [30, 60, 90, 100]
					}
				},
				size: {
					height: 180
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [["data", 10]]
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [["data", 50]]
						});
					}, 2000),

					setTimeout(function() {
						chart.load({
							columns: [["data", 70]]
						});
					}, 3000),

					setTimeout(function() {
						chart.load({
							columns: [["data", 0]]
						});
					}, 4000),

					setTimeout(function() {
						chart.load({
							columns: [["data", 100]]
						});
					}, 5000)
				];
			}
		},
		LineChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["data1", 230, 190, 300, 500, 300, 400]
							]
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data3", 130, 150, 200, 300, 200, 100]
							]
						});
					}, 1500),

					setTimeout(function() {
						chart.unload({
							ids: "data1"
						});
					}, 2000)
				];
			}
		},
		LineChartWithRegions: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					regions: {
						data1: [
							{start: 1, end: 2, style: {dasharray: "6 2"}},
							{start: 3, style: {dasharray: "2 3"}}
						], // currently "dashed" style only
						data2: [{end: 3}]
					}
				}
			}
		},
		MultipleXYLineChart: {
			options: {
				data: {
					xs: {
						"data1": "x1",
						"data2": "x2",
					},
					columns: [
						["x1", 10, 30, 45, 50, 70, 100],
						["x2", 30, 50, 75, 100, 120],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 20, 180, 240, 100, 190]
					]
				}
			}
		},
		PieChart: {
			options: {
				data: {
					// iris data from R
					columns: [
						["data1", 30],
						["data2", 120],
					],
					type: "pie",
					onclick: function(d, i) {
						console.log("onclick", d, i);
					},
					onover: function(d, i) {
						console.log("onover", d, i);
					},
					onout: function(d, i) {
						console.log("onout", d, i);
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
								["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
								["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
							]
						});
					}, 1500),

					setTimeout(function() {
						chart.unload({ ids: "data1" });
						chart.unload({ ids: "data2" });
					}, 2500)
				]
			}
		},
		RadarChart: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
						["data1", 330, 350, 200, 380, 150],
						["data2", 130, 100, 30, 200, 80],
						["data3", 230, 153, 85, 300, 250]
					],
					type: "radar",
					labels: true
				},
				radar: {
					axis: {
						max: 400
					},
					level: {
						depth: 4
					},
					direction: {
						clockwise: true
					}
				}
			}
		},
		ScatterPlot: {
			options: {
				data: {
					xs: {
						setosa: "setosa_x",
						versicolor: "versicolor_x",
					},
					// iris data from R
					columns: [
						["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
						["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
						["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
						["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
					],
					type: "scatter"
				},
				axis: {
					x: {
						label: "Sepal.Width",
						tick: {
							fit: false
						}
					},
					y: {
						label: "Petal.Width"
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							xs: {
								virginica: "virginica_x"
							},
							columns: [
								["virginica_x", 3.3, 2.7, 3.0, 2.9, 3.0, 3.0, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3.0, 2.5, 2.8, 3.2, 3.0, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3.0, 2.8, 3.0, 2.8, 3.8, 2.8, 2.8, 2.6, 3.0, 3.4, 3.1, 3.0, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3.0, 2.5, 3.0, 3.4, 3.0],
								["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
							]
						});
					}, 1000),

					setTimeout(function() {
						chart.unload({
							ids: "setosa"
						});
					}, 2000),

					setTimeout(function() {
						chart.load({
							columns: [
								["virginica", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
							]
						});
					}, 3000)
				];
			}
		},
		SimpleXYLineChart: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", 30, 50, 100, 230, 300, 310],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 300, 200, 300, 250, 450]
					]
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["data1", 100, 250, 150, 200, 100, 350]
							]
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data3", 80, 150, 100, 180, 80, 150]
							]
						});
					}, 1500),

					setTimeout(function() {
						chart.unload({
							ids: "data2"
						});
					}, 2000)
				];
			}
		},
		SplineChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "spline"
				}
			}
		},
		StackedAreaChart: {
			options: {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 120],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					types: {
						data1: 'area-spline',
						data2: 'area-spline'
						// "line", "spline", "step", "area", 'area-step' are also available to stack
					},
					groups: [
						["data1", "data2"]
					]
				}
			}
		},
		StackedBarChart: {
			options: {
				data: {
					columns: [
						["data1", -30, 200, 200, 400, -150, 250],
						["data2", 130, 100, -100, 200, -150, 50],
						["data3", -230, 200, 200, -300, 250, 250]
					],
					type: "bar",
					groups: [
						["data1", "data2"]
					]
				},
				grid: {
					y: {
						lines: [{value: 0}]
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.groups([["data1", "data2", "data3"]])
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [["data4", 100, -50, 150, 200, -300, -100]]
						});
					}, 1500),

					setTimeout(function() {
						chart.groups([["data1", "data2", "data3", "data4"]])
					}, 2000)
				];
			}
		},
		StepChart: {
			options: {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 100],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					types: {
						data1: "step",
						data2: 'area-step'
					}
				}
			}
		},
		TimeseriesChart: {
			options: {
				data: {
					x: "x",
					//  xFormat: "%Y%m%d", // "xFormat" can be used as custom format of "x"
					columns: [
						["x", '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
						// ["x", "20130101", "20130102", "20130103", "20130104", "20130105", "20130106"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 340, 200, 500, 250, 350]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: '%Y-%m-%d'
						}
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["data3", 400, 500, 450, 700, 600, 500]
							]
						});
					}, 1000)
				];
			}
		}
	},
	Axis: {
		AdditionalYAxis: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					y2: {
						show: true
					}
				}
			}
		},
		AxisLabel: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250],
						["sample2", 130, 300, 200, 500, 250, 350]
					],
					axes: {
						sample2: "y2"
					}
				},
				axis: {
					x: {
						label: 'X Label'
					},
					y: {
						label: 'Y Label'
					},
					y2: {
						show: true,
						label: 'Y2 Label'
					}
				}
			}
		},
		AxisLabelPosition: {
			options: {
				data: {
					columns: [
						["sample1", 30, 200, 100, 400, 150, 250],
						["sample2", 430, 300, 500, 400, 650, 250]
					],
					axes: {
						sample1: "y",
						sample2: "y2"
					}
				},
				axis: {
					x: {
						label: {
							text: 'X Label',
							position: 'outer-center'
							// inner-right : default
							// inner-center
							// inner-left
							// outer-right
							// outer-center
							// outer-left
						}
					},
					y: {
						label: {
							text: 'Y Label',
							position: 'outer-middle'
							// inner-top : default
							// inner-middle
							// inner-bottom
							// outer-top
							// outer-middle
							// outer-bottom
						}
					},
					y2: {
						show: true,
						label: {
							text: 'Y2 Label',
							position: 'outer-middle'
							// inner-top : default
							// inner-middle
							// inner-bottom
							// outer-top
							// outer-middle
							// outer-bottom
						}
					}
				}
			}
		},
		CategoryAxis: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250, 50, 100, 250]
					]
				},
				axis: {
					x: {
						type: "category",
						categories: ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7", "cat8", "cat9"]
					}
				}
			}
		},
		HideTickLineText: {
			options: {
				data: {
					columns: [
						["data1", 90, 100, 140, 200, 100, 400, 90, 100, 140, 200, 100, 400],
						["data2", 130, 40, 200, 310, 230, 325, 163, 230, 222, 240, 160, 310]
					],
					types: {
						data1: "bar",
						data2: "area-spline"
					}
				},
				axis: {
					x: {
						tick: {
							show: false,
							text: {
								show: false
							}
						}
					},
					y: {
						tick: {
							show: false,
							text: {
								show: false
							}
						}
					},
					y2: {
						show: true,
						tick: {
							show: false,
							text: {
								show: false
							}
						}
					}
				}
			}
		},
		IndexedAxis: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", 495, 940, 1500, 3000, 4500, 6000, 7500, 9000, 10500, 12000, 13500, 15000],
						["data", 47.911, 47.915, 48.437, 49.117, 49.583, 50.28, 51.712, 53.103, 54.456, 55.955, 56.752, 56.851]
					]
				},
				axis: {
					x: {
						tick: {
							culling: false
						}
					}
				}
			}
		},
		MultiAxes: [
			{
				options: {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150],
							["data2", 50, 20, 10, 40, 15]
						]
					},
					axis: {
						//rotated: true,
						x: {
							axes: [
								{
									tick: {
										outer: false,
										count: 9
									}
								},
								{
									tick: {
										values: [0.3, 1.4, 2.6, 3.1, 3.9]
									}
								}
							]
						},
						y: {
							axes: [
								{
									tick: {
										format: function(x) { return x +"%"; },
										count: 2
									}
								}
							]
						}
					}
				}
			},
			{
				options: {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150],
							["data2", 50, 20, 10, 40, 15]
						],
						type: "bar",
						axes: {
							data1: "y2",
							data2: "y2",
						}
					},
					axis: {
						rotated: true,
						y: {
							show: false
						},
						y2: {
							show: true,
							axes: [
								{
									tick: {
										outer: false,
										format: function(x) { return x +"%"; },
										count: 2
									}
								}
							]
						}
					}
				}
			},
		],
		PaddingForYAxis: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					y: {
						padding: {top: 200, bottom: 0}
					},
					y2: {
						padding: {top: 100, bottom: 100},
						show: true
					}
				}
			}
		},
		RangeForYAxis: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					y: {
						max: 400,
						min: -400
						// Range includes padding, set 0 if no padding needed
						// padding: {top:0, bottom:0}
					}
				}
			}
		},
		RotatedAxis: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					types: {
						data1: "bar",
					}
				},
				axis: {
					rotated: true
				}
			}
		},
		RotatedAxisGroupedBar: {
			options: {
				data: {
					columns: [
						["Male", -83, -143, -100, -120, -150, -85],
						["Female", 130, 100, 140, 175, 150, 50]
					],
					type: "bar",
					groups: [["Male", "Female"]],
					labels: {
						format: function(v, id) {
							return Math.abs(v);
						}
					}
				},
				axis: {
					rotated: true,
					x: {
						show: false
					},
					y: {
						tick: {
							format: function(v) {
								return Math.abs(v);
							}
						}
					}
				},
				grid: {
					y: {
						show: true,
						lines: [
							{
								value: 0,
								class: "base-line"
							},
						]
					}
				},
				tooltip: {
					format: {
						value: function(v) {
							return Math.abs(v);
						}
					}
				}
			},
			style: [
				"#rotatedAxisGroupedBar .base-line line { stroke-width: 3px; stroke: #000; }"
			]
		},
		RotateXAxisTickText: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", "www.somesitename1.com", "www.somesitename2.com", "www.somesitename3.com", "www.somesitename4.com", "www.somesitename5.com", "www.somesitename6.com", "www.somesitename7.com", "www.somesitename8.com", "www.somesitename9.com", "www.somesitename10.com", "www.somesitename11.com", "www.somesitename12.com"],
						["pv", 90, 100, 140, 200, 100, 400, 90, 100, 140, 200, 100, 400]
					],
					type: "bar"
				},
				axis: {
					x: {
						type: "category",
						tick: {
							rotate: 75,
							multiline: false,
							tooltip: true
						},
						height: 130
					}
				}
			}
		},
		XAxisTickCount: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06', '2013-01-07', '2013-01-08', '2013-01-09', '2013-01-10', '2013-01-11', '2013-01-12'],
						["sample", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							count: 4,
							format: '%Y-%m-%d'
						}
					}
				}
			}
		},
		XAxisTickCulling: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					x: {
						type: "category",
						tick: {
							culling: {
								max: 4 // the number of tick texts will be adjusted to less than this value
							}
							// for normal axis, default on
							// for category axis, default off
						}
					}
				}
			}
		},
		XAxisTickFitting: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", '2013-10-31', '2013-12-31', '2014-01-31', '2014-02-28'],
						["sample", 30, 100, 400, 150]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							fit: true,
							format: "%e %b %y"
						}
					}
				}
			}
		},
		XAxisTickFormat: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", '2010-01-01', '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01'],
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: function(x) {
							// format string is also available for timeseries data
							// format: "%Y"
							return x.getFullYear();
							}
						}
					}
				}
			}
		},
		XAxisTickMultiline: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", "First Q\n2018", "Second\nQ 2018", "3Q\nYear\n2018", "Forth\nQuarter\n2018"],
						["data", 30, 100, 400, 150]
					]
				},
				axis: {
					x: {
						type: "category"
					}
				}
			}
		},
		XAxisTickPosition: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", "John", "Aron", "David", "Chris", "Tyler", "Mike"],
						["data1", 130, 200, 320, 400, 530, 750],
						["data2", 130, 10, 130, 200, 150, 250],
						["data3", 130, 50, 10, 200, 250, 150]
					],
					type: "bar",
					groups: [["data1", "data2", "data3"]]
				},
				axis: {
					rotated: true,
					x: {
						type: "category",
						clipPath: false,
						inner: false,
						tick: {
							text: {
								position: {
									x: 35,
									y: -23
								}
							}
						}
					},
					y: {
						show: false
					}
				}
			},
			style: [
				"#xAxisTickPosition .bb-axis-x line, #xAxisTickPosition .bb-axis-x path { visibility: hidden; }"
			]
		},
		XAxisTickTimeseries: {
			description: "Drag over chart area and checkout the x Axis tick text label",
			options: {
				data: {
					x: "x",
					json: {
						"Temperature": [
						"29.39",
							"29.7",
							"29.37",
							"28.87",
							"28.62",
							"27.72",
							"27.61",
							"27.82",
							"27.48",
							"26.78",
							"26.62",
							"26.64",
							"26.29",
							"26.01",
							"25.84",
							"25.07",
							"24.85",
							"24.01",
							"23.83",
							"22.8",
							"23",
							"22.64",
							"22.77",
							"22.64",
							"22.64",
							"22.62",
							"22.51",
							"21.42",
							"21.18",
							"20.93",
							"20.66",
							"20.48",
							"20.7",
							"21.24",
							"22.14",
							"22.78",
							"23.43",
							"23.16",
							"27.48",
							"26.78",
							"26.62",
							"26.64",
							"26.29",
							"26.01",
							"25.84",
							"25.07",
							"24.85",
							"24.01"
						],
						"x": [
					"01-01-2015 00:00",
					"02-01-2015 00:00",
					"03-01-2015 00:00",
					"04-01-2015 00:00",
					"05-01-2015 00:00",
					"06-01-2015 00:00",
					"07-01-2015 00:00",
					"08-01-2015 00:00",
					"09-01-2015 00:00",
					"10-01-2015 00:00",
					"11-01-2015 00:00",
					"12-01-2015 00:00",
					"01-01-2016 00:00",
					"02-01-2016 00:00",
					"03-01-2016 00:00",
					"04-01-2016 00:00",
					"05-01-2016 00:00",
					"06-01-2016 00:00",
					"07-01-2016 00:00",
					"08-01-2016 00:00",
					"09-01-2016 00:00",
					"10-01-2016 00:00",
					"11-01-2016 00:00",
					"12-01-2016 00:00",
					"01-01-2017 00:00",
					"02-01-2017 00:00",
					"03-01-2017 00:00",
					"04-01-2017 00:00",
					"05-01-2017 00:00",
					"06-01-2017 00:00",
					"07-01-2017 00:00",
					"08-01-2017 00:00",
					"09-01-2017 00:00",
					"10-01-2017 00:00",
					"11-01-2017 00:00",
					"12-01-2017 00:00",
					"01-01-2018 00:00",
					"02-01-2018 00:00",
					"03-01-2018 00:00",
					"04-01-2018 00:00",
					"05-01-2018 00:00",
					"06-01-2018 00:00",
					"07-01-2018 00:00",
					"08-01-2018 00:00",
					"09-01-2018 00:00",
					"10-01-2018 00:00",
					"11-01-2018 00:00",
					"12-01-2018 00:00"
						]
					},
					type: "area",
					xFormat: "%m-%d-%Y %H:%M",
				},
				axis: {
					x: {
						tick: {
							fit: false,
							count: 5,
						},
						type: "timeseries"
					}
				},
				zoom: {
					enabled: {
						type: "drag"
					}
				},
				tooltip: {
					format: {
						title: function(x) {
							return d3.timeFormat("%Y-%m-%d")(x);
						}
					}
				},
				point: {
					r: 0,
					focus: {
						expand: {
							r: 5
						}
					}
				}
			}
		},
		XAxisTickValues: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06', '2013-01-07', '2013-01-08', '2013-01-09', '2013-01-10', '2013-01-11', '2013-01-12'],
						["sample", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							// this also works for non timeseries data
							values: ['2013-01-05', '2013-01-10']
						}
					}
				}
			}
		},
		XAxisTimezone: {
			options: {
				data: {
					x: "x",
					xFormat: "%Y",
					columns: [
						["x", "2010", "2011", "2012", "2013", "2014", "2015"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 340, 200, 500, 250, 350]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						// if true, treat x value as localtime (Default)
						// if false, convert to UTC internally
						localtime: false,
						tick: {
							format: "%Y-%m-%d %H:%M:%S"
						}
					}
				}
			}
		},
		YAxisTickCulling: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 250, 250, 150, 230, 300, 200, 300, 250, 150, 330, 100, 200, 100, 350, 50, 100, 200, 300, 250, 150]
					],
					axes: {
						data2: "y2"
					},
					types: {
						data1: "bar"
					}
				},
				axis: {
					y: {
						tick: {
							culling: {
								max: 3
							}
						}
					},
					y2: {
						show: true,
						tick: {
							culling: true
						}
					}
				}
			}
		},
		YAxisTickFormat: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 2500]
					]
				},
				axis: {
					y: {
						tick: {
							format: function(x) { return d3.format("$,")(x); }
						}
					}
				}
			}
		},

	},
	Data: {
		ColumnOrientedData: {
			options: {
				data: {
					columns: [
						["data1", 30, 20, 50, 40, 60, 50],
						["data2", 200, 130, 90, 240, 130, 220],
						["data3", 300, 200, 160, 400, 250, 250]
					]
				}
			}
		},
		RowOrientedData: {
			options: {
				data: {
					rows: [
						["data1", "data2", "data3"],
						[90, 120, 300],
						[40, 160, 240],
						[50, 200, 290],
						[120, 160, 230],
						[80, 130, 300],
						[90, 220, 320]
					]
				}
			}
		},
		JSONData: {
			options: {
				data: {
					json: {
						data1: [30, 20, 50, 40, 60, 50],
						data2: [200, 130, 90, 240, 130, 220],
						data3: [300, 200, 160, 400, 250, 250]
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart = bb.generate({
							bindto: "#JSONData",
							data: {
								json: [
									{name: "www.site1.com", upload: 200, download: 200, total: 400},
									{name: "www.site2.com", upload: 100, download: 300, total: 400},
									{name: "www.site3.com", upload: 300, download: 200, total: 500},
									{name: "www.site4.com", upload: 400, download: 100, total: 500}
								],
								keys: {
									// x: "name", // it's possible to specify "x" when category axis
									value: ["upload", "download"],
								}
							},
							axis: {
								x: {
									// type: "category"
								}
							}
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							json: [
								{name: "www.site1.com", upload: 800, download: 500, total: 400},
								{name: "www.site2.com", upload: 600, download: 600, total: 400},
								{name: "www.site3.com", upload: 400, download: 800, total: 500},
								{name: "www.site4.com", upload: 400, download: 700, total: 500}
							],
							keys: {
								value: ["upload", "download"]
							}
						});
					}, 2000)
				];
			}
		},
		"DataFromURL":
		{
			options: {
				data: {
					url: "./data/test.csv"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							url: "./data/test.json",
							mimeType: "json",
							type: "bar"
						});
					}, 1000)
				];
			}
		},
		CategoryData: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", "www.site1.com", "www.site2.com", "www.site3.com", "www.site4.com"],
						["download", 30, 200, 100, 400],
						["loading", 90, 100, 140, 200]
					],
					groups: [
						["download", "loading"]
					],
					type: "bar"
				},
				axis: {
					x: {
						type: "category" // this needed to load string x value
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["x", "www.siteA.com", "www.siteB.com", "www.siteC.com", "www.siteD.com"],
								["download", 130, 200, 150, 350],
								["loading", 190, 180, 190, 140]
							],
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [
								["x", "www.siteE.com", "www.siteF.com", "www.siteG.com"],
								["download", 30, 300, 200],
								["loading", 90, 130, 240]
							],
						});
					}, 2000),

					setTimeout(function() {
						chart.load({
							columns: [
								["x", "www.site1.com", "www.site2.com", "www.site3.com", "www.site4.com"],
								["download", 130, 300, 200, 470],
								["loading", 190, 130, 240, 340]
							],
						});
					}, 3000),

					setTimeout(function() {
						chart.load({
							columns: [
								["download", 30, 30, 20, 170],
								["loading", 90, 30, 40, 40]
							],
						});
					}, 4000),

					setTimeout(function() {
						chart.load({
							url: './data/string_x.csv'
						});
					}, 5000)
				];
			}
		},
		LoadData: {
			options: {
				data: {
					url: './data/test.csv',
					type: "line"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							url: './data/test2.csv'
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data1", 130, 120, 150, 140, 160, 150],
								["data4", 30, 20, 50, 40, 60, 50]
							],
							unload: ["data2", "data3"]
						});
					}, 2000),

					setTimeout(function() {
						chart.load({
							rows: [
								["data2", "data3"],
								[120, 300],
								[160, 240],
								[200, 290],
								[160, 230],
								[130, 300],
								[220, 320]
							],
							unload: "data4"
						});
					}, 3000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data4", 30, 20, 50, 40, 60, 50, 100, 200]
							],
							type: "bar"
						});
					}, 4000),

					setTimeout(function() {
						chart.unload({
							ids: "data4"
						});
					}, 5000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data2", null, 30, 20, 50, 40, 60, 50]
							]
						});
					}, 6000),

					setTimeout(function() {
						chart.unload();
					}, 7000),

					setTimeout(function() {
						chart.load({
							rows: [
								["data4", "data2", "data3"],
								[90, 120, 300],
								[40, 160, 240],
								[50, 200, 290],
								[120, 160, 230],
								[80, 130, 300],
								[90, 220, 320]
							],
							type: "bar"
						});
					}, 8000),

					setTimeout(function() {
						chart.load({
							rows: [
								["data5", "data6"],
								[190, 420],
								[140, 460],
								[150, 500],
								[220, 460],
								[180, 430],
								[190, 520]
							],
							type: "line"
						});
					}, 9000),

					setTimeout(function() {
						chart.unload({
							ids: ["data2", "data3"]
						});
					}, 10000)
				];
			}
		},
		DataName: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					names: {
						data1: 'Name 1',
						data2: 'Name 2'
					}
				}
			}
		},
		DataColor: {
			options: {
				data: {
					columns: [
						["data1", 30, 20, 50, 40, 60, 50],
						["data2", 200, 130, 90, 240, 130, 220],
						["data3", 300, 200, 160, 400, 250, 250]
					],
					type: "bar",
					colors: {
						data1: "#ff0000",
						data2: "#00ff00",
						data3: "#0000ff"
					},
					color: function(color, d) {
						// d will be "id" when called for legends
						return (d.id && d.id === "data3") ?
							d3.rgb(color).darker(d.value / 150).toString() : color;
					}
				}
			}
		},
		DataOrder: {
			options: {
				data: {
					columns: [
						["data1", 130, 200, 320, 400, 530, 750],
						["data2", -130, 10, 130, 200, 150, 250],
						["data3", -130, -50, -10, -200, -250, -150]
					],
					type: "bar",
					groups: [
						["data1", "data2", "data3"]
					],
					order: "desc" // stack order by sum of values descendantly. this is default.
					// order: "asc"  // stack order by sum of values ascendantly.
					// order: null   // stack order by data definition.
				},
				grid: {
					y: {
						lines: [{value: 0}]
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["data4", 1200, 1300, 1450, 1600, 1520, 1820]
							]
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							columns: [
								["data5", 200, 300, 450, 600, 520, 820]
							]
						});
					}, 2000),

					setTimeout(function() {
						chart.groups([
							["data1", "data2", "data3", "data4", "data5"]
						]);
					}, 3000)
				];
			}
		},
		DataLabel: [
			{
				options: {
					data: {
						columns: [
							["data1", 30, -200, -100, 400, 150, 250],
							["data2", -50, 150, -150, 150, -50, -150],
							["data3", -100, 100, -40, 100, -150, -50]
						],
						groups: [
							["data1", "data2"]
						],
						type: "bar",
						labels: true
					},
					grid: {
						y: {
							lines: [{value: 0}]
						}
					}
				}
			},
			{
				options: {
					data: {
						columns: [
							["data1", 230, -200, 400],
							["data2", -250, 350, -170],
							["data3", -123, 100, -240]
						],
						groups: [
							["data1", "data2"]
						],
						type: "bar",
						labels: {
							colors: "white",
							centered: true
						}
					},
					grid: {
						y: {
							lines: [{value: 0}]
						}
					}
				}
			}
		],
		DataLabelColors: [
			{
				options: {
					data: {
						columns: [
							["data1", 30, -200, -100, 400, 150, 250],
							["data2", -50, 150, -150, 150, -50, -150],
						],
						type: "bar",
						labels: {
							colors: "red"
						}
					}
				}
			},
			{
				options: {
					data: {
						columns: [
							["data1", 30, -200, -100, 400, 150, 250],
							["data2", -50, 150, -150, 150, -50, -150],
						],
						labels: {
							colors: {
								data1: "fuchsia",
								data2: "blue"
							}
						}
					}
				}
			}
		],
		DataLabelFormat: {
			options: {
				data: {
					columns: [
						["data1", 30, -200, -100, 400, 150, 250],
						["data2", -50, 150, -150, 150, -50, -150],
						["data3", -100, 100, -40, 100, -150, -50]
					],
					groups: [
						["data1", "data2"]
					],
					type: "bar",
					labels: {
						// format: function(v, id, i, j) { return "Default Format"; },
						format: {
							data1: function(x) {
						     return d3.format('$')(x);
							}
							// data1: function(v, id, i, j) { return "Format for data1"; },
						}
					}
				},
				grid: {
					y: {
						lines: [{value: 0}]
					}
				}
			}
		},
		DataLabelPosition: {
			options: {
				data: {
					columns: [
						["data1", 30, -200, -100, 400, 150, 250]
					],
					labels: {
						position: {
							x: -25,
							y: 5
						}
					}
				},
				axis: {
					x: {
						type: "category"
					}
				}
			}
		},
		DataSelection: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 230, 280, 320, 218, 250, 150]
					],
					selection: {
						enabled: true,
						draggable: true
					}
				}
			},
			description: "For selection, click data point or drag over data points"
		},
		DataStackNormalized: [
			{
				options: {
					data: {
						columns: [
							["data1", 30, 280, 951, 400, 150, 546, 4528],
							["data2", 130, 357, 751, 400, 150, 250, 3957],
							["data3", 30, 280, 320, 218, 150, 150, 5000]
						],
						type: "area",
						groups: [
							["data1", "data2", "data3"]
						],
						stack: {
							normalize: true
						}
					},
					clipPath: false
				}
			},
			{
				options: {
					data: {
						x: "x",
						columns: [
							["x", "Item1", "Item2", "Item3", "Item4", "Item5", "Item6", "Item7"],
							["data1", 30, 280, 951, 400, 150, 546, 4528],
							["data2", 130, 357, 751, 400, 150, 250, 3957],
							["data3", 30, 280, 320, 218, 150, 150, 5000]
						],
						type: "bar",
						groups: [
							["data1", "data2", "data3"]
						],
						stack: {
							normalize: true
						}
					},
					axis: {
						x: {
							type: "category"
						}
					}
				}
			}
		],
		OnMinMaxCallback: {
			options: {
				data: {
					columns: [
						["data1", 30, -200, 100, 200, 190, 280],
						["data2", 30, 200, 120, 400, 150, 150]
					],
					onmin: function(data) {
						data.forEach(function(v) {
							// select data points
							d3.select(".bb-shapes-" + v.id + " .bb-circle-" + v.index)
								.style("fill", "red")
								.attr("r", "8");
						});
					},
					onmax: function(data) {
						data.forEach(function(v) {
							// select data points
							d3.select(".bb-shapes-" + v.id + " .bb-circle-" + v.index)
								.style("fill", "green")
								.attr("r", "8");
						});
					}
				}
			}
		}
	},

	Grid: {
		GridLines: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 120, 200]
					]
				},
				grid: {
					x: {
						show: true
					},
					y: {
						show: true
					}
				}
			}
		},
		OptionalXGridLines: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				grid: {
					x: {
						lines: [
							{value: 1, text: 'Label 1'},
							{value: 3, text: 'Label 3', position: "middle"},
							{value: 4.5, text: 'Label 4.5', position: "start"}
						]
					}
				}
			}
		},
		OptionalYGridLines: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250],
						["sample2", 1300, 1200, 1100, 1400, 1500, 1250]
					],
					axes: {
						sample2: "y2"
					}
				},
				axis: {
					y2: {
						show: true
					}
				},
				grid: {
					y: {
						lines: [
							{value: 50, text: 'Label 50 for y'},
							{value: 1300, text: 'Label 1300 for y2', axis: "y2", position: "start"},
							{value: 350, text: 'Label 350 for y', position: "middle"}
						]
					}
				}
			}
		}
	},

	Interaction: {
		PreventScrollOnTouch: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "bar"
				},
				axis: {
					rotated: true
				},
				interaction: {
					inputType: {
						touch: {
							preventDefault: true
						}
					}
				}
			}
		},
		SubChart: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				subchart: {
					show: true
				}
			},
			description: "Drag over subchart area to zoom main chart.<br>When is zoomed, try dragging zoom selection element or expand it dragging each edge(left/right)"
		},
		Zoom: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
					]
				},
				zoom: {
					enabled: true
				}
			},
			description: "For zoom, move mouse wheel(desktop) or pinch(mobile) over chart area.<br>When is zoomed, navigate with dragging it."
		},
		DragZoom: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
					]
				},
				zoom: {
					enabled: {
						type: "drag"
					}
				}
			},
			description: "Drag over chart area"
		}
	},

	Legend: {
		HideLegend: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				legend: {
					show: false
				}
			}
		},
		LegendPosition: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				legend: {
					position: "right"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							columns: [
								["data3", 130, 150, 200, 300, 200, 100]
							]
						});
					}, 1000),

					setTimeout(function() {
						chart.unload({
							ids: "data1"
						});
					}, 2000),

					setTimeout(function() {
						chart.transform("pie");
					}, 3000),

					setTimeout(function() {
						chart.transform("line");
					}, 4000)
				];
			}
		},
		LegendTemplate1: {
			options: {
				data: {
					columns: [
						["data1", 100],
						["data2", 300],
						["data3", 200]
					],
					type: "pie"
				},
				legend: {
					contents: {
						"bindto": "#legend",
						"template": "<span style='color:#fff;padding:10px;background-color:{=COLOR}'>{=TITLE}</span>"
					}
				}
			}
		},
		LegendTemplate2: {
			options: {
				data: {
					columns: [
						["data1", 100],
						["data2", 300],
						["data3", 200]
					],
					type: "pie"
				},
				legend: {
					contents: {
						"bindto": "#legend",
						"template": function(title, color) {
							// omit "data2" to be shown
							return title !== "data2" ?
								"<span style='background-color:" + color + ";padding:10px'>" + title + "</span>" : "";
						}
					}
				}
			}
		},
		CustomLegend: {
			options: {
				data: {
					columns: [
						["data1", 100],
						["data2", 300],
						["data3", 200]
					],
					type: "pie"
				},
				legend: {
					show: false
				}
			},
			func: function(chart) {
				function toggle(id) { chart.toggle(id); }

d3.select(".chart_area")
	.insert("div", ".chart")
	.attr("class", "legend")
	.selectAll("span")
	.data(["data1", "data2", "data3"])
	.enter()
	.append("span")
	.attr('data-id', function(id) {
		return id;
	})
	.html(function(id) {
		return id;
	})
	.each(function(id) {
		d3.select(this)
			.style('background-color', chart.color(id));
	})
	.on("mouseover", function(id) {
		chart.focus(id);
	})
	.on("mouseout", function(id) {
		chart.revert();
	})
	.on("click", function(id) {
		chart.toggle(id);
	});
			}
		},
		usePoint: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150],
						["data3", 60, 190, 320, 520, 20, 300],
						["data4", 80, 20, 250, 320, 180, 50]
					]
				},
				point: {
					pattern: [
						"circle",
						"rectangle",
						"<polygon points='2.5 0 0 5 5 5'></polygon>",
						"<polygon points='2.5 0 0 2.5 2.5 5 5 2.5 2.5 0'></polygon>"
					]
				},
				legend: {
					usePoint: true
				}
			}
		}
	},

	Plugins: {
		StanfordDiagram: {
			description: "Must load or import plugin before the use.",
			options: {
				data: {
					x: "HPE",
					columns: [
						["HPE", 2.5, 2.5, 3.5, 3.5, 4, 4, 4.5, 5],
						["HPL", 24.5, 24, 67.5, 56.5, 26.5, 26, 30, 28]
					],
					type: "scatter"
				},
				_plugins: [{
					stanford: {
						epochs: [1, 12, 32, 103, 200, 124, 234, 300],
						scale: {
							min: 1,
							max: 10000,
							format: "pow10"
						},
						padding: {
							top: 15,
							right: 0,
							bottom: 0,
							left: 0
						},
						regions: [
							{
								points: [
									{x: 0,y: 0},
									{x: 40,y: 40},
									{x: 0,y: 40}
								],
								text: function (value, percentage) {
								return "Normal Operations: "+ value +" "+ percentage +"%";
							},
								opacity: 0.2,
								class: "test-polygon1"
							},
							{
								points: [
									{x: 0,y: 0},
									{x: 40,y: 0},
									{x: 40,y: 40}
								],
							text: function (value, percentage) {
								return "MI: "+ value +" "+ percentage +"%";
							},
								opacity: 0.2,
								class: "test-polygon2"
							},
							{
								points: [
									{x: 40,y: 0},
									{x: 65,y: 0},
									{x: 65,y: 40},
									{x: 40,y: 40}
								],
							text: function (value, percentage) {
								return "HMI: "+ value +" "+ percentage +"%";
							},
								opacity: 0.2,
								class: "test-polygon3"
							},
							{
								points: [
									{x: 0,y: 40},
									{x: 40,y: 40},
									{x: 65,y: 65},
									{x: 0,y: 65}
								],
							text: function (value, percentage) {
								return "Unavailable Epochs: "+ value +" "+ percentage +"%";
							},
								opacity: 0.2,
								class: "test-polygon4"
							},
							{
								points: [
									{x: 40,y: 40},
									{x: 65,y: 40},
									{x: 65,y: 65}
								],
							text: function (value, percentage) {
								return "MI: "+ value +" "+ percentage +"%";
							},
								opacity: 0.2,
								class: "test-polygon5"
							}
						],
						lines: [
							{x1: 0, y1: 0, x2: 65, y2: 65, class: "line"},
							{x1: 0, x2: 65, y1: 40, y2: 40, class: "line"},
							{x1: 40, x2: 40, y1: 0, y2: 40, class: "line"}
						]
					}
				}],
				legend: {
					show: false
				},
				axis: {
					x: {
						label: {
							text: "HPE",
							position: "outer-center"
						},
						min: 0,
						max: 60,
						padding: {
							left: 0
						},
						tick: {
							values: [0, 10, 20, 30, 40, 50, 60]
						}
					},
					y: {
						label: {
							text: "HPL",
							position: "outer-middle"
						},
						min: 0,
						max: 60,
						tick: {
							values: [0, 10, 20, 30, 40, 50, 60]
						},
						padding: {
							top: 5,
							bottom: 0
						}
					}
				},
				point: {
					r: 1.5,
					type: "rectangle"
				}
			},
			style: [
				"#stanfordDiagram .test-polygon1 { fill: white; }",
				"#stanfordDiagram .test-polygon1 text { fill: black; }",
				"#stanfordDiagram .test-polygon2 { fill: orange; }",
				"#stanfordDiagram .test-polygon2 text { fill: black; }",
				"#stanfordDiagram .test-polygon3 { fill: red; }",
				"#stanfordDiagram .test-polygon3 text { fill: black; }",
				"#stanfordDiagram .test-polygon4 { fill: gray; }",
				"#stanfordDiagram .test-polygon4 text { fill: black; }",
				"#stanfordDiagram .test-polygon5 { fill: orange; }",
				"#stanfordDiagram .test-polygon5 text { fill: black; }"
			]
		},
		TextOverlap: {
			description: "Prevents data label texts overlap using <a href='https://en.wikipedia.org/wiki/Voronoi_diagram' target='_new'>Voronoi layout</a>.<br>Must load or import plugin before the use.",
			options: {
				data: {
					columns: [
						["data1", 3, 3.8, 2, 3.8, 15, 2.5, 5.4, 6, 5.5, 2.4],
						["data2", 1.7, 1.0, 10, 20, 8.4, 5, 2.5, 12.3, 8.5, 9.8],
						["data3", 2.3, 15.3, 8.5, 30, 25, 12.0, 5, 8.4, 9.9, 28],
						["data4", 30, 35, 20, 38, 19, 28, 5.6, 8, 5.5, 22],
						["data5", 13, 10, 10, 20, 8, 5, 20, 13, 18.5, 9.8]
					],
					labels:{
						overlap: {
							extent: 8,
							area : 3
						}
					}
				},
				_plugins: [{
					textoverlap: {
						selector: ".bb-texts text",
						extent: 8,
						area : 3
					}
				}]
			}
		}
	},

	Point: {
		RectanglePoints: {
			options: {
				data: {
					columns: [
						["data1", 100, 200, 1000, 900, 500],
						["data2", 20, 40, 500, 300, 200]
					]
				},
				point: {
					type: "rectangle"
				}
			}
		},
		CustomPointsTriangle: {
			options: {
				data: {
					columns: [
						["data1", 100, 200, 1000, 900, 500],
						["data2", 20, 40, 500, 300, 200]
					]
				},
				point: {
					pattern: [
						"<polygon points='2.5 0 0 5 5 5'></polygon>"
					]
				}
			}
		},
		CustomPointsDiamonds: {
			options: {
				data: {
					columns: [
						["data1", 100, 400, 1000, 900, 500],
						["data2", 20, 40, 500, 300, 200]
					]
				},
				point: {
					pattern: [
						"<polygon points='2.5 0 0 2.5 2.5 5 5 2.5 2.5 0'></polygon>"
					]
				}
			}
		},
		CustomPointsHearts: {
			options: {
				data: {
					columns: [
						["data1", 100, 400, 1000, 900, 500],
						["data2", 20, 40, 500, 300, 200]
					]
				},
				point: {
					pattern: [
						"<path d='m3.937502,2.348755c1.314192,-3.618047 6.463238,0 0,4.651779c-6.463238,-4.651779 -1.314192,-8.269826 0,-4.651779z' />"
					]
				}
			}
		},
		CustomPointsGrouped: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				point: {
					pattern: [
						"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10' style='fill:#fff'></rect></g>"
					]
				}
			}
		},
		CustomPointsFontIcon: {
			options: {
				data: {
					columns: [
						["data1", 100, 400, 1000, 900, 500],
						["data2", 20, 40, 500, 300, 200]
					]
				},
				point: {
					pattern: [
						"<g><text x='-5' y='40' style='font-family:FontAwesome;font-size:40px'></text></g>"
					]
				},
				onrendered: function() {
								 // or set unicode value as
								 // this.defs.selectAll("text").text(() => "\uf21c");
				}
			}
		},
		CombinationPoints: {
			options: {
				data: {
					columns: [
						["data1", 100, 400, 1000, 900, 500],
						["data2", 20, 40, 500, 300, 200],
						["data3", 80, 350, 800, 450, 500],
						["data4", 150, 240, 300, 700, 300],
						["data5", 280, 720, 160, 210, 115]
					]
				},
				point: {
					pattern: [
						"circle",
						"rectangle",
						"<polygon points='2.5 0 0 2.5 2.5 5 5 2.5 2.5 0'></polygon>",
						"<polygon points='2.5 0 0 5 5 5'></polygon>",
						"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10' style='fill:#fff'></rect></g>"
					]
				}
			}
		}
	},

	Region: {
		Region: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250, 400],
						["data2", 830, 1200, 1100, 1400, 1150, 1250, 1500]
					],
					axes: {
						data2: "y2"
					}
				},
				axis: {
					y2: {
						show: true
					}
				},
				regions: [
					{axis: "x", end: 1, class: "regionX"},
					{axis: "x", start: 2, end: 4, class: "regionX"},
					{axis: "x", start: 5, class: "regionX"},
					{axis: "y", end: 50, class: "regionY"},
					{axis: "y", start: 80, end: 140, class: "regionY"},
					{axis: "y", start: 400, class: "regionY"},
					{axis: "y2", end: 900, class: "regionY2"},
					{axis: "y2", start: 1150, end: 1250, class: "regionY2"},
					{axis: "y2", start: 1300, class: "regionY2"}
				]
			}
		},
		RegionWithTimeseries: {
			options: {
				data: {
					x: "date",
					columns: [
						["date", '2014-01-01', '2014-01-10', '2014-01-20', '2014-01-30', '2014-02-01'],
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					x: {
						type: "timeseries"
					}
				},
				regions: [
					{start: '2014-01-05', end: '2014-01-10'},
					{start: new Date('2014/01/15'), end: new Date('20 Jan 2014')},
					{start: 1390575600000, end: 1391007600000} // start => 2014-01-25 00:00:00, end => 2014-01-30 00:00:00
				]
			}
		}
	},

	Title: {
		MultilinedTitle: {
			options: {
				title: {
					text: "Temperature History by Region, 2017-2018\nSource: community weather center"
				},
				data: {
					x: "x",
					json: {
						Temperature: [
							"29.39",
							"29.7",
							"29.37",
							"28.87",
							"28.62",
							"27.72",
							"27.61",
							"27.82",
							"27.48",
							"26.78"
						],
						x: [
							"01-10-2019 00:00",
							"01-10-2019 00:30",
							"01-10-2019 01:00",
							"01-10-2019 01:30",
							"01-10-2019 02:00",
							"01-10-2019 02:30",
							"01-10-2019 03:00",
							"01-10-2019 03:30",
							"01-10-2019 04:00",
							"01-10-2019 04:30"
						]
					},
					type: "area",
					xFormat: "%m-%d-%Y %H:%M"
				},
				axis: {
					x: {
						type: "timeseries"
					}
				},
				point: {
					show: false
				}
			},
			style: [
				"#multilinedTitle .bb-title tspan:first-child { font-size: 17px; font-weight: bold; }"
			]
		}
	},

	Tooltip: {
		HideTooltip: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				tooltip: {
					show: false
				}
			}
		},
		TooltipGrouping: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 500, 320, 210, 340, 215, 125]
					]
				},
				tooltip: {
					grouped: false // Default true
				}
			}
		},
		TooltipFormat: {
			options: {
				data: {
					columns: [
						["data1", 30000, 20000, 10000, 40000, 15000, 250000],
						["data2", 100, 200, 100, 40, 150, 250]
					],
					axes: {
						data2: "y2"
					}
				},
				axis: {
					y: {
						tick: {
							format: function(x) {
							return d3.format("s")(x);
							}
						}
					},
					y2: {
						show: true,
						tick: {
							format: function(x) {
							return d3.format("$")(x);
							}
						}
					}
				},
				tooltip: {
					format: {
						title: function(d) {
							return 'Data ' + d;
								},
						value: function(value, ratio, id) {
							var format = id === "data1" ? d3.format(',') : d3.format('$');

							return format(value);
								}
						// value: d3.format(',') // apply this format to both y and y2
					}
				}
			}
		},
		TooltipOrder: {
			options: {
				data: {
					type: "bar",
					columns: [
						["data1", 120, 200, 300, 100, 150, 250],
						["data2", 50, 29, 17, 40, 15, 25],
						["data3", 100, 320, 210, 340, 215, 125]
					],
					groups: [
						["data1", "data2", "data3"]
					],
					order: "asc"
				},
				tooltip: {
					order: "desc"
				}
			}
		},
		TooltipTemplate: {
			options: {
				data: {
					columns: [
						["data1", 120, 200, 300, 100, 150, 250],
						["data2", 250, 129, 217, 240, 315, 225],
						["data3", 100, 320, 210, 340, 215, 125]
					]
				},
				tooltip: {
					init: {
						show: true
					},
					doNotHide: true,
					contents: {
						bindto: "#tooltip",
						text: {
							VAR: ["A", "B", "TextA"]
						},
						template: "<ul><li>Index<br>{=TITLE}</li>" +
								"{{<li class={=CLASS_TOOLTIP_NAME}>" +
								"<span>{=VALUE}:{=VAR}</span><br>" +
								"<span style=color:{=COLOR}>{=NAME}</span></li>}}</ul>"
					}
				}
			},
			style: [
				"#tooltip { font-size: 13px;padding: 0;margin-bottom: 80px; }",
				"#tooltip li { list-style: none;float: left; padding: 0 10px; }",
				"#tooltip li span:first-child { font-size: 16px; }"
			]
		},
		LinkedTooltips: [
			{
				options: {
					data: {
						x: "x",
						columns: [
							["x", '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
							["data", 20, 30, 10, 10, 30, 40],
						],
					},
					axis: {
						x: {
							type: "timeseries",
							tick: {
								format: '%Y-%m-%d'
							}
						}
					},
					tooltip: {
						linked: true
					}
				}
			},
			{
				options: {
					data: {
						x: "x",
						columns: [
							["x", '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
							["data", 10, 50, 100, 50, 50, 50],
						],
					},
					axis: {
						x: {
							type: "timeseries",
							tick: {
								format: '%Y-%m-%d'
							}
						}
					},
					tooltip: {
						linked: true
					}
				}
			}
		]
	},
	AreaChartOptions: {
		Above: {
			options: {
				data: {
					columns: [
						["data1", 230, 280, 251, 400, 150, 546, 158],
						["data2", 130, 357, 151, 400, 250, 250, 395]
					],
					type: "area",
					groups: [["data1", "data2"]]
				},
				area: {
					above: true
				}
			}
		},
		LinearGradient: [
			{
				options: {
					data: {
						columns: [
							["data1", 230, 280, 251, 400, 150, 546, 158],
							["data2", 130, 357, 151, 400, 250, 250, 395],
							["data3", 330, 280, 320, 218, 450, 150, 500]
						],
						type: "area-spline",
						groups: [["data1", "data2", "data3"]]
					},
					area: {
						linearGradient: true
					}
				}
			},
			{
				options: {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
						],
						type: "area"
					},
					area: {
						linearGradient: {
							x: [1, 0],
							y: [0, 1],
							stops: [
								[0, function(id) {
						 return id == "data1" ? "red" : "yellow";
										}, 1],
								[0.3, "orange", 0.5],
								[0.6, "green", 0.7],
								[0.8, "purple", 0.7],
								[1, null, 1],
							]
						}
					},
					point: {
						r: 0,
						focus: {
							expand: {
								r: 5
							}
						}
					}
				}
			}
		]
	},
	BarChartOptions: {
		BarPadding: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 250, 140, 200, 150, 50],
						["data3", 100, 200, 340, 300, 250, 250],
						["data4", 80, 230, 240, 100, 350, 150]
					],
					type: "bar"
				},
				bar: {
					padding: 3
				}
			}
		},
		BarRadius: {
			options: {
				data: {
					columns: [
						["data1", 80, 250, -200, 200, 250, 150],
						["data2", 170, -350, 240, 200, -250, 150],
						["data3", -120, 100, 240, -300, 350, 350],
						["data4", 180, 130, 340, 200, 250, -250]
					],
					type: "bar"
				},
				bar: {
					radius: {
						ratio: 0.5
					}
				}
			}
		},
		BarWidth: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50],
						["data3", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				},
				bar: {
					width: {
						ratio: 0.9,
						max: 30
					}
				}
			}
		},
		BarWidthVariant: {
			options: {
				data: {
					columns: [
						["data1", 378, 200, 175],
						["data2", 130, 100, 140],
						["data3", 190, 220, 340]
					],
					type: "bar"
				},
				bar: {
					width: {
						data1: 10,
						data2: {
							ratio: 1,
							max: 20
						},
						data3: 30
					}
				}
			}
		}
	},
	ChartOptions: {
		ChartSize: {
			options: {
				size: {
					height: 240,
					width: 480
				},
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				}
			}
		},
		LazyRender: [
			{
				options: {
					data: {
						columns: [
							["data1", 300, 350, 300, 0, 0, 0],
							["data2", 130, 100, 140, 200, 150, 50]
						]
					}
				},
				style: [
					"#lazyRender_1 { display: none; }"
				],
				func: function(chart) {
					setTimeout(function() {
					    document.getElementById("lazyRender_1").style.display = "block";
					}, 1000)
				}
			},
			{
				options: {
					data: {
						columns: [
							["data1", 300],
							["data2", 130]
						],
						type: "pie"
					},
					render: {
						lazy: true,
						observe: false
					}
				},
				func: function(chart) {
					setTimeout(function() { chart.flush(); }, 1000)
				}
			}
		],
		Padding: {
			options: {
				padding: {
					top: 40,
					right: 100,
					bottom: 40,
					left: 100,
				},
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250000000000]
					]
				}
			}
		},
		ColorOnover: [
			{
				options: {
					data: {
						columns: [
							["data1", 230, 200, 100, 400, 150, 250],
							["data2", 150, 320, 210, 240, 115, 125],
							["data3", 130, 220, 140, 200, 250, 450]
						],
						groups: [
							["data1", "data2", "data3"]
						],
						type: "bar"
					},
					color: {
						onover: {
							data1: "#868484",
							data2: "black",
							data3: "rgb(202, 202, 202)"
						}
					}
				}
			},
			{
				options: {
						data: {
							columns: [
								["data1", 241, 737, 78],
								["data2", 245, 164, 628],
								["data3", 990, 496, 638]
							],
							types: {
								data1: "spline",
								data2: "area",
								data3: "bar"
							}
						},
						color: {
							onover: function(d) {
						var pttr = ["red", "yellow", "cyan"];

						return pttr[(Math.floor(Math.random() * pttr.length))];
					 	}
						}
				}
			}
		],
		ColorPattern: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 130, 220, 140, 200, 250, 450],
						["data4", 250, 320, 210, 240, 215, 225],
						["data5", 430, 500, 400, 280, 290, 350],
						["data6", 100, 120, 310, 340, 415, 225]
					]
				},
				color: {
					pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
				}
			}
		},
		ColorTiles1: {
			options: {
				data: {
					columns: [
						["data1", 10],
						["data2", 15],
						["data3", 30],
						["data4", 45],
					],
					type: "pie"
				},
				color: {
					tiles: function() {
						function circlePattern(fillColor, opacity, radiusMin, radiusMax) {
							var pattern = d3.select(document.createElementNS(d3.namespaces.svg, "pattern"))
								.attr("patternUnits", "userSpaceOnUse")
								.attr("width", "32")
								.attr("height", "32");

							var g = pattern
								.append("g")
								.style("fill", fillColor || "#000")
								.style("opactiy", opacity || "0.2");

							g
								.append("circle")
								.attr("cx", "3")
								.attr("cy", "3")
								.attr("r", radiusMin || "3");

							g
								.append("circle")
								.attr("cx", "13")
								.attr("cy", "13")
								.attr("r", radiusMax || "9");

							return pattern.node();
						}

						// Should return an array of SVGPatternElement
						return [
							circlePattern("#FFF", "0.2", "3", "10"),
							circlePattern("yellow", "0.3", "3", "3")
						];
					}
				}
			}
		},
		ColorTiles2: {
			options: {
				data: {
					columns: [
						["data1", 50, 25, 45, 19, 50],
						["data2", 15, 23, 8, 17, 45],
						["data3", 30, 35, 45, 40, 20]
					],
					types: {
						data1: "area-spline",
						data2: "bar",
						data3: "bubble"
					}
				},
				color: {
					pattern: ["red", "blue", "cyan"],
					tiles: function() {
						var pattern = d3.select(document.createElementNS(d3.namespaces.svg, "pattern"))
							.attr("patternUnits", "userSpaceOnUse")
							.attr("width", "6")
							.attr("height", "6");

						var g = pattern
							.append("g")
							.attr("fill-rule", "evenodd")
							.attr("stroke-width", 1)
							.append("g")
							.attr("fill", "rgb(255, 127, 14)");

						g.append("polygon").attr("points", "5 0 6 0 0 6 0 5");
						g.append("polygon").attr("points", "6 5 6 6 5 6");

						// Should return an array of SVGPatternElement
						return [
							pattern.node()
						];
					}
				}
			}
		},
		ColorTiles3: {
			options: {
				data: {
					columns: [
						["data1", 0, 0, -35, 100, -50, -150]
					],
					type: "area"
				},
				color: {
					pattern: ["red", "blue", "cyan"],
					tiles: function() {
						/* will add below <linearGradient> definition to be used for 'fill' attribute
						<linearGradient patternUnits="userSpaceOnUse" x2="0" y2="80%">
							<stop offset="49%" stop-color="blue"></stop>
							<stop offset="50%" stop-color="grey"></stop>
							<stop offset="51%" stop-color="red"></stop>
						</linearGradient>
						 */
						var gradient = d3.select(document.createElementNS(d3.namespaces.svg, "linearGradient"))
							.attr("patternUnits", "userSpaceOnUse")
							.attr("x2", "0")
							.attr("y2", "80%");

						gradient
							.append("stop")
							.attr("offset", "49%")
							.attr("stop-color", "blue");

						gradient
							.append("stop")
							.attr("offset", "50%")
							.attr("stop-color", "grey");

						gradient
							.append("stop")
							.attr("offset", "51%")
							.attr("stop-color", "red");

						// Should return an array of SVGPatternElement
						return [
							gradient.node()
						];
					}
				},
				onrendered: function() {
	// set all data circles color to blue
	d3.selectAll(".bb-circles-data1 circle").style("fill", "blue");
				}
			}
		},
		DurationOfTransition: {
			options: {
				data: {
					url: './data/test.csv'
				},
				transition: {
					duration: 100
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.load({
							url: './data/test2.csv'
						});
					}, 500),

					setTimeout(function() {
						chart.load({
							columns: [
								["data1", 30, 20, 50, 40, 60, 50],
								["data2", 200, 130, 90, 240, 130, 220],
								["data3", 300, 200, 160, 400, 250, 250]
							]
						});
					}, 1000),

					setTimeout(function() {
						chart.load({
							rows: [
								["data1", "data2", "data3"],
								[90, 120, 300],
								[40, 160, 240],
								[50, 200, 290],
								[120, 160, 230],
								[80, 130, 300],
								[90, 220, 320]
							]
						});
					}, 1500),

					setTimeout(function() {
						chart.load({
							columns: [
								["data1", null, 30, 20, 50, 40, 60, 50, 100, 200]
							]
						});
					}, 2000)
				];
			}
		},
		clipPath: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 0, 400, 0, 250]
					]
				},
				axis: {
					y: {
						padding: {
							bottom: 0
						}
					}
				},
				point: {
					r: 5
				},
				clipPath: false
			}
		}
	},
	DonutChartOptions: {
		LabelRatio: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25]
					],
					type: "donut"
				},
				donut: {
					title: "Title Text",
					label: {
						ratio: 1.5
					}
				},
				legend: {
					show: false
				}
			},
			style: [
				"#labelRatio .bb-chart-arc text {fill: #f00;font-size: 15px;font-weight: bold;}"
			]
		},
		MultilineLabel: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 50],
						["data3", 45]
					],
					type: "donut"
				},
				donut: {
					label: {
						format: function(value, ratio, id) {
							return value +"\nHours";
								}
					}
				}
			}
		},
		MultilineTitle: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25]
					],
					type: "donut"
				},
				donut: {
					title: "Title 1\nTitle 2\nTitle 3"
				}
			}
		},
		padAngle: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25]
					],
					type: "donut"
				},
				donut: {
					title: "Title Text",
					padAngle: 0.1
				}
			}
		}
	},
	GaugeChartOptions: {
		GaugeFullCircle: {
			options: {
				data: {
					columns: [
						["data", 60]
					],
					type: "gauge"
				},
				gauge: {
					fullCircle: true
				}
			}
		},
		GaugeLabelMultiline: {
			options: {
				data: {
					columns: [
						["data", 60]
					],
					type: "gauge"
				},
				gauge: {
					label: {
						format: function (value, ratio) { return value + "\nhours"; },
						extents: function (value, isMax) { return (isMax ? "Max:" : "Min:") + value; }
					}
				}
			}
		},
		GaugeStackData: [
			{
				options: {
					data: {
						columns: [
							["data1", 30, 10],
							["data2", 190],
							["data3", 70],
							["data4", 150],
							["data5", 50]
						],
						type: "gauge",
						order: "asc"
					},
					gauge: {
						title: "Title A"
					}
				}
			},
			{
				options: {
					data: {
						columns: [
							["data1", 100],
							["data2", 150]
						],
						type: "gauge",
						order: null
					},
					gauge: {
						max: 500,
						title: "Title B",
						label: {
							format: function(value, ratio) {
								return value;
							}
						},
						width: 80
					}
				}
			}
		]
	},
	LineChartOptions: {
		HidePoints: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				point: {
					show: false
				}
			}
		},
		LinePoint: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 170, 250, 210, 190, 175, 225],
						["data4", 283, 170, 275, 143, 220, 255]
					],
					types: {
						data2: "scatter"
					}
				},
				line: {
					point: ["data1", "data3"]
				}
			}
		}
	},
	PieChartOptions: {
		LabelRatio: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25]
					],
					type: "pie"
				},
				pie: {
					label: {
						ratio: 2.4
					}
				},
				legend: {
					show: false
				}
			},
			style: [
				"#labelRatio .bb-chart-arc text {fill: #f00;font-size: 15px;font-weight: bold;}"
			]
		},
		LabelFormat: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 50]
					],
					type: "pie"
				},
				pie: {
					label: {
						format: function(value, ratio, id) {
							return d3.format('$')(value);
								}
					}
				}
			}
		},
		MultilineLabel: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 50],
						["data3", 45]
					],
					type: "pie"
				},
				pie: {
					label: {
						format: function(value, ratio, id) {
							return value +"\nHours";
								}
					}
				}
			}
		},
		InnerRadius: [
			{
				options: {
					data: {
						columns: [
							["data1", 30],
							["data2", 50],
							["data3", 20]
						],
						type: "pie"
					},
					pie: {
						innerRadius: 20
					}
				}
			},
			{
				options: {
					data: {
						columns: [
							["data1", 30],
							["data2", 50],
							["data3", 20]
						],
						type: "pie"
					},
					pie: {
						innerRadius: {
							data1: 50,
							data2: 80,
							data3: 0
						}
					}
				}
			},
		],
		PadAngle: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 50]
					],
					type: "pie"
				},
				pie: {
					padAngle: 0.1
				}
			}
		},
		Padding: {
			options: {
				data: {
					columns: [
						["data1", 30],
						["data2", 50],
						["data3", 20]
					],
					type: "pie"
				},
				pie: {
					padding: 3
				}
			}
		}
	},
	RadarChartOptions: {
		RadarAxis: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", "Data A", "Data B", "Data C", "Data D", "Data E", "Data F", "Data G"],
						["data1", 330, 350, 200, 380, 150, 100, 230],
						["data2", 130, 100, 30, 200, 80, 200, 130]
					],
					type: "radar",
					labels: true
				},
				radar: {
					axis: {
						max: 330,
						line: {
							show: false
						},
						text: {
							show: false
						}
					},
					level: {
						text: {
							show: false
						}
					}
				}
			},
			style: [
				"#radarAxis .bb-levels polygon { stroke-dasharray: 1 3; stroke-width: 1px; }"
			]
		},
		RadarAxisMultiline: {
			options: {
				padding: {
					top: 25
				},
				data: {
					x: "x",
					columns: [
						["x", "1st\nPrize", "2nd\nPrize", "3rd\nPrize"],
						["data1", 230, 250, 100],
						["data2", 150, 150, 230]
					],
					type: "radar",
					labels: true
				},
				radar: {
					axis: {
						max: 300
					}
				}
			}
		},
		RadarLevel: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", "Data A", "Data B", "Data C", "Data D", "Data E", "Data F", "Data G", "Data H", "Data I"],
						["data1", 330, 350, 200, 400, 150, 100, 230, 30, 95],
						["data2", 130, 100, 30, 200, 80, 200, 130, 210, 195]
					],
					type: "radar"
				},
				radar: {
					level: {
						depth: 4,
						show: false,
						text: {
							format: function(x) { return x + "%"; }
						}
					},
					axis: {
						text: {
							position: {x: -15, y: -5}
						}
					}
				}
			}
		},
		RadarSize: {
			options: {
				data: {
					columns: [
						["data1", 330, 350, 220, 400, 150, 330, 230, 390, 95, 195, 220]
					],
					type: "radar"
				},
				radar: {
					size: {
						ratio: 0.75
					}
				}
			}
		}
	},
	API: {
		AxisLabel: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					y: {
						label: 'Y Axis Label'
					},
					y2: {
						show: true,
						label: 'Y2 Axis Label'
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.axis.labels({y2: 'New Y2 Axis Label'});
					}, 1000),

					setTimeout(function() {
						chart.axis.labels({y: 'New Y Axis Label', y2: 'New Y2 Axis Label Again'});
					}, 2000)
				];
			}
		},
		AxisRange: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					y2: {
						show: true,
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.axis.max(500)
					}, 1000),

					setTimeout(function() {
						chart.axis.min(-500)
					}, 2000),

					setTimeout(function() {
						chart.axis.max({y: 600, y2: 100});
					}, 3000),

					setTimeout(function() {
						chart.axis.min({y: -600, y2: -100});
					}, 4000),

					setTimeout(function() {
						chart.axis.range({max: 1000, min: -1000});
					}, 5000),

					setTimeout(function() {
						chart.axis.range({max: {y: 600, y2: 100}, min: {y: -100, y2: 0}});
					}, 6000),

					setTimeout(function() {
						chart.axis.max({x: 10});
					}, 7000),

					setTimeout(function() {
						chart.axis.min({x: -10});
					}, 8000),

					setTimeout(function() {
						chart.axis.range({max: {x: 5}, min: {x: 0}});
					}, 9000)
				];
			}
		},
		DataColor: {
			options: {
				data: {
					columns: [
						["data1", 30, 20, 50, 40, 60, 50],
						["data2", 200, 130, 90, 240, 130, 220],
						["data3", 300, 200, 160, 400, 250, 250]
					],
					type: "bar",
					colors: {
						data1: "#ff0000",
						data2: "#00ff00",
						data3: "#0000ff"
					},
					labels: true
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.data.colors({
							data1: d3.rgb("#ff0000").darker(1),
							data2: d3.rgb("#00ff00").darker(1),
							data3: d3.rgb("#0000ff").darker(1)
						});
					}, 1000),

					setTimeout(function() {
						chart.data.colors({
							data1: d3.rgb("#ff0000").darker(2),
							data2: d3.rgb("#00ff00").darker(2),
							data3: d3.rgb("#0000ff").darker(2)
						});
					}, 2000)
				];
			}
		},
		DataName: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					names: {
						data1: 'Name 1',
						data2: 'Name 2'
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.data.names({data1: 'New name for data1', data2: 'New name for data2'});
					}, 1000),

					setTimeout(function() {
						chart.data.names({data1: 'New name for data1 again'});
					}, 2000)
				];
			}
		},
		Export: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						// crate a div element
						var exported = document.createElement("div");

						document.getElementById("export")
							.insertAdjacentElement("afterend", exported);

						// Call after the chart finished rendering
						chart.export("image/png", function(dataUrl) {
							// append an image element
							var img = document.createElement("img");

							img.src = dataUrl;
							exported.appendChild(img);
						});
					}, 500)
				]
			}
		},
		Flow: {
			options: {
				data: {
					x: "x",
					columns: [
						["x", '2012-12-29', '2012-12-30', '2012-12-31'],
						["data1", 230, 300, 330],
						["data2", 190, 230, 200],
						["data3", 90, 130, 180]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: '%m/%d',
						}
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.flow({
							columns: [
								["x", '2013-01-11', '2013-01-21'],
								["data1", 500, 200],
								["data2", 100, 300],
								["data3", 200, 120]
							],
							duration: 1500,
							done: function() {
								chart.flow({
									columns: [
																				["x", '2013-02-11', '2013-02-12', '2013-02-13', '2013-02-14'],
																				["data1", 200, 300, 100, 250],
																				["data2", 100, 90, 40, 120],
																				["data3", 100, 100, 300, 500]
									],
									length: 0,
									duration: 1500,
									done: function() {
																				chart.flow({
																						columns: [
																								["x", '2013-03-01', '2013-03-02'],
																								["data1", 200, 300],
																								["data2", 150, 250],
																								["data3", 100, 100]
																						],
																						length: 2,
																						duration: 1500,
																						done: function() {
																								chart.flow({
																										columns: [
																												["x", '2013-03-21', '2013-04-01'],
																												["data1", 500, 200],
																												["data2", 100, 150],
																												["data3", 200, 400]
																										],
																										to: '2013-03-01',
																										duration: 1500
																								});
																						}
																				});
	 									}
								});
							},
						});
					}, 1000)
				];
			}
		},
		Regions: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				regions: [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "fill_green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "fill_green",
					}
				]
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.regions([
							{
								axis: "y",
								start: 250,
								end: 350,
								class: "fill_red"
							},
							{
								axis: "y",
								start: 25,
								end: 75,
								class: "fill_red"
							}
						])
					}, 1000)
				];
			},
			style: [
				"#regions .fill_green { fill: green; }",
				"#regions .fill_red { fill: red; }"
			]
		},
		Resize: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.resize({height: 100, width: 300})
					}, 1000),

					setTimeout(function() {
						chart.resize({height: 200})
					}, 2000),

					setTimeout(function() {
						chart.resize();
					}, 3000)
				];
			}
		},
		UpdateConfig: {
			options: {
				data: {
					columns: [
						["data", 91.4]
					],
					type: "gauge"
				},
				gauge: {
					max: 1000
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						// update gauge.max to 100, and redraw with changed option
						chart.config("gauge.max", 100, true);
					}, 1000)
				];
			}
		},
		XGrid: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.xgrids([{value: 1, text: 'Label 1'}, {value: 4, text: 'Label 4'}]);
					}, 1000),

					setTimeout(function() {
						chart.xgrids([{value: 2, text: 'Label 2'}]);
					}, 2000),

					setTimeout(function() {
						chart.xgrids.add([{value: 3, text: 'Label 3', class: "hoge"}]);
					}, 3000),

					setTimeout(function() {
						chart.xgrids.remove({value: 2});
					}, 4000),

					setTimeout(function() {
						chart.xgrids.remove({class: "hoge"});
					}, 5000),

					setTimeout(function() {
						chart.xgrids([{value: 1, text: 'Label 1'}, {value: 4, text: 'Label 4'}]);
					}, 6000),

					setTimeout(function() {
						chart.xgrids.remove();
					}, 7000)
				];
			}
		}
	},

	Style: {
		StyleForRegion: {
			options: {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				regions: [
					{start: 0, end: 1},
					{start: 2, end: 4, class: "foo"}
				]
			},
			style: [
				"#styleForRegion .bb-region-0 {fill:red;}",
				"#styleForRegion .bb-region.foo {fill:green;}"
			]
		},
		StyleForGrid: {
			options: {
				data: {
					columns: [
						["data1", 100, 200, 1000, 900, 500]
					]
				},
				grid: {
					x: {
						lines: [{value: 2}, {value: 4, class: "grid4", text: 'LABEL 4'}]
					},
					y: {
						lines: [{value: 500}, {value: 800, class: "grid800", text: 'LABEL 800'}]
					}
				}
			},
			style: [
				"#styleForGrid .bb-xgrid-line line {stroke: blue;}",
				"#styleForGrid .bb-xgrid-line.grid4 line {stroke: pink;}",
				"#styleForGrid .bb-xgrid-line.grid4 text {fill: pink;}",
				"#styleForGrid .bb-ygrid-line line {stroke: red;}",
				"#styleForGrid .bb-ygrid-line.grid800 line {stroke: green;}",
				"#styleForGrid .bb-ygrid-line.grid800 text {fill: green;}"
			]
		},
		StyleForLines: {
			options: {
				data: {
					columns: [
						["data1", 100, 200, 1000, 900, 500],
						["data2", 20, 40, 500, 300, 200]
					]
				},
				line: {
					classes: [
						'line-class-data1',
						'line-class-data2'
					]
				}
			},
			style: [
				"#styleForLines .line-class-data1 { stroke-dasharray: 3 4; stroke-width: 3px; }",
				"#styleForLines .line-class-data2 { stroke-dasharray: 2 4; stroke-width: 2px; }"
			]
		}
	},

	Transform: {
		ToLineChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				},
				point: {
					type: "rectangle"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.transform("line", "data1");
					}, 1000),

					setTimeout(function() {
						chart.transform("line", "data2");
					}, 2000),

					setTimeout(function() {
						chart.transform("bar");
					}, 3000),

					setTimeout(function() {
						chart.transform("line");
					}, 4000)
				];
			}
		},
		ToSplineChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.transform("spline", "data1");
					}, 1000),

					setTimeout(function() {
						chart.transform("spline", "data2");
					}, 2000),

					setTimeout(function() {
						chart.transform("bar");
					}, 3000),

					setTimeout(function() {
						chart.transform("spline");
					}, 4000)
				];
			}
		},
		ToBarChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "line"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.transform("bar", "data1");
					}, 1000),

					setTimeout(function() {
						chart.transform("bar", "data2");
					}, 2000),

					setTimeout(function() {
						chart.transform("line");
					}, 3000),

					setTimeout(function() {
						chart.transform("bar");
					}, 4000)
				];
			}
		},
		ToAreaChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.transform("area", "data1");
					}, 1000),

					setTimeout(function() {
						chart.transform("area", "data2");
					}, 2000),

					setTimeout(function() {
						chart.transform("bar");
					}, 3000),

					setTimeout(function() {
						chart.transform("area");
					}, 4000)
				];
			}
		},
		ToAreaSplineChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.transform('area-spline', "data1");
					}, 1000),

					setTimeout(function() {
						chart.transform('area-spline', "data2");
					}, 2000),

					setTimeout(function() {
						chart.transform("bar");
					}, 3000),

					setTimeout(function() {
						chart.transform('area-spline');
					}, 4000)
				];
			}
		},
		ToScatterPlot: {
			options: {
				data: {
					xs: {
						setosa: "setosa_x",
						versicolor: "versicolor_x",
					},
					// iris data from R
					columns: [
						[
							"setosa_x",
							3.5, 3.0, 3.2, 3.1, 3.6,
							3.9, 3.4, 3.4, 2.9, 3.1,
							3.7, 3.4, 3.0, 3.0, 4.0,
							4.4, 3.9, 3.5, 3.8, 3.8,
							3.4, 3.7, 3.6, 3.3, 3.4,
							3.0, 3.4, 3.5, 3.4, 3.2,
							3.1, 3.4, 4.1, 4.2, 3.1,
							3.2, 3.5, 3.6, 3.0, 3.4,
							3.5, 2.3, 3.2, 3.5, 3.8,
							3.0, 3.8, 3.2, 3.7, 3.3
						],
						[
							"versicolor_x",
							3.2, 3.2, 3.1, 2.3, 2.8,
							2.8, 3.3, 2.4, 2.9, 2.7,
							2.0, 3.0, 2.2, 2.9, 2.9,
							3.1, 3.0, 2.7, 2.2, 2.5,
							3.2, 2.8, 2.5, 2.8, 2.9,
							3.0, 2.8, 3.0, 2.9, 2.6,
							2.4, 2.4, 2.7, 2.7, 3.0,
							3.4, 3.1, 2.3, 3.0, 2.5,
							2.6, 3.0, 2.6, 2.3, 2.7,
							3.0, 2.9, 2.9, 2.5, 2.8
						],
						[
							"setosa",
							0.2, 0.2, 0.2, 0.2, 0.2,
							0.4, 0.3, 0.2, 0.2, 0.1,
							0.2, 0.2, 0.1, 0.1, 0.2,
							0.4, 0.4, 0.3, 0.3, 0.3,
							0.2, 0.4, 0.2, 0.5, 0.2,
							0.2, 0.4, 0.2, 0.2, 0.2,
							0.2, 0.4, 0.1, 0.2, 0.2,
							0.2, 0.2, 0.1, 0.2, 0.2,
							0.3, 0.3, 0.2, 0.6, 0.4,
							0.3, 0.2, 0.2, 0.2, 0.2
						],
						[
							"versicolor",
							1.4, 1.5, 1.5, 1.3, 1.5,
							1.3, 1.6, 1.0, 1.3, 1.4,
							1.0, 1.5, 1.0, 1.4, 1.3,
							1.4, 1.5, 1.0, 1.5, 1.1,
							1.8, 1.3, 1.5, 1.2, 1.3,
							1.4, 1.4, 1.7, 1.5, 1.0,
							1.1, 1.0, 1.2, 1.6, 1.5,
							1.6, 1.5, 1.3, 1.3, 1.3,
							1.2, 1.4, 1.2, 1.0, 1.3,
							1.2, 1.3, 1.3, 1.1, 1.3
						],
					],
					type: "pie"
				},
				axis: {
					x: {
						label: "Sepal.Width",
						tick: {
							fit: false
						}
					},
					y: {
						label: "Petal.Width"
					}
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.transform("scatter");
					}, 1000),

					setTimeout(function() {
						chart.transform("pie");
					}, 2000),

					setTimeout(function() {
						chart.transform("scatter");
					}, 3000)
				]
			}
		},
		ToPieChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					]
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.transform("pie");
					}, 1000),

					setTimeout(function() {
						chart.transform("line");
					}, 2000),

					setTimeout(function() {
						chart.transform("pie");
					}, 3000)
				];
			}
		},
		ToDonutChart: {
			options: {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					]
				}
			},
			func: function(chart) {
				chart.timer = [
					setTimeout(function() {
						chart.transform("donut");
					}, 1000),

					setTimeout(function() {
						chart.transform("line");
					}, 2000),

					setTimeout(function() {
						chart.transform("pie");
					}, 3000),

					setTimeout(function() {
						chart.transform("donut");
					}, 4000)
				];
			}
		}
	}
};
