const Types = {
    types: [
        "area",
        "area-line-range",
        "area-spline",
        "area-spline-range",
        "area-step",
        "area-step-range",
        "bar",
        "grouped-bar",
        "bubble",
        "line",
        "scatter",
        "spline",
        "step",
        "candlestick",
        "treemap",
        "polar",
        "radar",
        "funnel",
        "gauge",
        "gauge-multi",
        "gauge-stack-data",
        "gauge-arc-length",
        "donut",
        "pie",
        "pie-inner-radius",
        "pie-outer-radius",
        "pie-corner-radius",
        "gauge-needle",
        "donut-needle",
        "range-text-donut",
        "range-text-gauge",
        "normalized",
        "combination",
        "multi-axes"
    ],
    getRandom(min = 100, max = 1000) {
        return Math.random() * (max - min) + min;
    },
    getData(type) {
        const data = [];
        const matrix = [7, 3];
    
        for (let i = 0; i < matrix[1]; i++) {
            const d = [];
    
            for (let j = 0; j < matrix[0]; j++) {
                if (j === 0) {
                    d.push(`data${i}`);
                } else {
                    let data = this.getRandom();

                    if (/range/.test(type)) {
                        data = [data + this.getRandom(100, 150), data, data - this.getRandom(100, 150)]
                    } else if (type === "candlestick") {
                        // [open, high, low, close]
                        data = [
                            data, // open
                            data + this.getRandom(50, 350), // high
                            data - this.getRandom(50, 130), // low
                            data + this.getRandom(50, 200)  // close
                        ]
                    }
                    
                    d.push(data);
                }
            }
    
            data.push(d);
        }
    
        return data;
    },
    getOptions: function() {
        return {
            size: {
                height: 150
            },
            data: {
                columns: []
            },
            axis: {
                x: {
                    type: "category"
                },
                y: {
                    show: false
                }
            },
            interaction: {
                enabled: false
            },
            legend: {
                show: false
            },
            padding: {
                mode: "fit",
                left: 10,
                right: 10,
                top: 35
            },
            point: {
                r: 3.5
            },
            bubble: {
                maxR: 15
            },
            funnel: {
                neck: {
                    width: {
                        ratio: 0.3
                    },
                    height: {
                        ratio: 0.35
                    }
                }
            },
            gauge: {
                title: "100%",
                label: {
                    extents: v => Math.round(v),
                    ratio: 1
                }
            },
            donut: {
                label: {
                    show: false
                }
            },
            pie: {
                innerRadius: {},
                outerRadius: {},
                label: {
                    ratio: 1
                }
            },
            polar: {
                label: {
                    format: function(value, ratio, id) {
                        return `${value}\n(${(ratio * 100).toFixed(0)}%)`;
                    },
                    show: false
                },
                level:{
                    depth: 4,
                    text: {
                        backgroundColor: "yellow"
                    }
                },
                startingAngle: -0.6
            },
            radar: {
                axis: {
                    text: {
                        show: false
                    }
                },
                level: {
                    text: {
                        show: false
                    }
                },
                size: {
                    ratio: 1
                }
            }
        };
    },
    generate: function() {
        // append div
        this.types.forEach((v, i) => {
            const div = document.createElement("div");
            div.id = `chart-${i}`;
 
            document.getElementById("wrapper").appendChild(div);
        });
 
        // generate chart
        this.types.forEach((v, i) => {
            const options = this.getOptions();
            let type = v;

            options.bindto = `#chart-${i}`;
            options.data.columns = this.getData(v);
            
            if (type === "normalized") {
                type = "bar";
                options.data.stack = { normalize: true };
                options.data.groups = [["data0", "data1", "data2"]];

            } else if (type === "grouped-bar") {
                type = "bar";
                options.data.groups = [["data0", "data1"]];

            } else if (type === "funnel") {
                options.data.columns = [
                    ["data0", 100],
                    ["data1", 50],
                    ["data2", 30]
                ];

                options.padding = {
                    top: 30,
                    left: 10,
                    right: 10
                };

            } else if (type === "gauge") {
                options.data.columns = [["data0", 70]];

            } else if (type === "radar") {
                options.padding.top = 5;

            } else if (type === "candlestick") {

            } else if (type === "treemap") {
                options.data.columns = [
                    ["data1", 250],
                    ["data2", 200],
                    ["data3", 300],
                    ["data4", 150],
                    ["data5", 100],
                    ["data6", 70]
                ];

                options.data.labels = {
                    colors: "#fff",
                    centered: true
                };

                options.treemap = {
                    label: {
                    format: function(value, ratio, id) {
                          return `${(ratio * 100).toFixed(1)}%`;
                     }
                  }
                };
            
            } else if (type === "gauge-stack-data") {
                type = "gauge";
                options.gauge.title = "ABC";
                options.data.labels = {
                    colors: "#fff"
                }

            } else if (type === "polar") {
                options.data.columns = [
                    ["data0", 35],
                    ["data1", 110],
                    ["data2", 80]
                ];
                options.data.order = null;

                options.polar.level.max = 120;

            
            } else if (type === "pie-inner-radius") {
                type = "pie";
                options.pie.label.show = false;
                options.pie.innerRadius = {
                    data0: 30,
                    data1: 20,
                    data2: 0
                };

            } else if (type === "pie-outer-radius") {
                type = "pie";
                options.pie.label.show = false;
                options.pie.outerRadius = {
                    data0: 50,
                    data1: 65,
                    data2: 35
                };
            } else if (type === "pie-corner-radius") {
                type = "pie";
                options.arc = {
                    cornerRadius: 70
                };
                options.pie.label.show = false;
                options.data.columns = [
                    ["data1", 30],
                    ["data2", 45],
                    ["data3", 25],
                    ["data4", 35],
                    ["data5", 15],
                    ["data6", 35]
                ];
            } else if (type === "gauge-needle") {
                type = "gauge";

                options.data.columns = [
                    ["a", 20],
                    ["b", 20],
                    ["c", 20],
                    ["d", 20],
                    ["e", 20]
                ];

                options.arc = {
                    needle: {
                        show: true,
                        length: 80,
                        value: 83,
                        top: {
                            // rx and ry are the two radii of the ellipse;
                            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
                            rx: 1,
                            ry: 1,
                            width: 1
                          },
                          bottom: {
                            // rx and ry are the two radii of the ellipse;
                            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
                            rx: 1,
                            ry: 1,
                            width: 10,
                            len: 10
                        }
                    }
                };

                options.gauge = {
                    width: 10,
                    title: "{=NEEDLE_VALUE}%\n",
                    label: {
                      format: function(value, ratio, id) { return id; }
                    }
                };

            } else if (type === "donut-needle") {
                type = "donut";

                options.data.columns = [
                   	["data1", 10],
                    ["data2", 10],
                    ["data3", 10],
                    ["data4", 10],
                    ["data5", 10],
                    ["data6", 10]
                ];

                options.arc = {
                    needle: {
                        show: true,
                        length: 80,
                        value: 35,
                        color: "grey",
                        path: function(length) {
                            const len = length - 20;
                            const width = 3;
                            const path = `M 0 -${len + 20}
                                L -10 -${len}
                                L -${width} -${len}
                                L -${width} 0 
                                A 0 1 0 0 0 ${width} 0
                                L ${width} -${len}
                                L 10 -${len} Z`;

                            return path;
                        }
                    }
                };

            } else if (type === "range-text-donut") {
                type = "donut";

                options.data.columns = [
                    ["data1", 30],
                    ["data2", 20],
                    ["data3", 50]
                ];

                options.arc = {
                    rangeText: {
                        values: [25, 50, 75, 100],
                        unit: "%"
                    }
                };

            } else if (type === "range-text-gauge") {
                type = "gauge";

                options.data.columns = [
                    ["data1", 30],
                    ["data2", 20],
                    ["data3", 50]
                ];

                options.arc = {
                    rangeText: {
                        values: [5, 10, 30, 50, 70, 83, 100],
                    }
                };
                options.gauge = {
                    label: {
                        format: () => "",
                        extents: () => ""
                    }
                };

            } else if (type === "combination") {
                options.data.types = {
                    data0: "bar",
                    data1: "area-spline",
                    data2: "step"
                }
                
            } else if (type === "multi-axes") {
                type = "line";
                options.axis.x.axes = [
                    {
                        tick: {
                          values: [
                            0.5,
                            1.5,
                            2.5,
                            3.5,
                            4.5
                          ]
                        }
                    }
                ];

            } else if (type === "gauge-multi") {
                type = "gauge";

                options.data.columns = [
                    ["data0", 25],
                    ["data1", 50],
                    ["data2", 75]
                ];

                options.gauge = {
                    type: "multi",
                    title: "Multi",
                    label: {
                        show: true
                    }
                };

            } else if (type === "gauge-arc-length") {
                type = "gauge";

                options.size = { height: 170};
                options.padding = {
                    top: 15, bottom: 0, left: 0, right: 0
                };
                
                options.arc = {
                    cornerRadius: 15
                };

                options.data.columns = [
                    ["data", 77]
                ];
                options.data.labels = false;
                options.gauge = {
                    type: "single",
                    fullCircle: true,
                    arcLength: 70,
                    startingAngle: -2.2,
                    width: 20,
                    label: {
                        extents: function() { return ""; }
                      },
                };
            }

            options.data.type = type;
            options.onrendered = function() {
                this.$.chart.insert("div", "svg")
                    .classed("title", true)
                    .text(v);
            }

        // if (type === "gauge") {
        //     debugger;
        // }

            bb.generate(options);
        });
    }
 };
 
Types.generate();