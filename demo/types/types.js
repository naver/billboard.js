const Types = {
    types: [
        "area",
        "area-line-range",
        "area-spline",
        "area-spline-range",
        "area-step",
        "bar",
        "bubble",
        "donut",
        "gauge",
        "line",
        "pie",
        "radar",
        "scatter",
        "spline",
        "step",

        "normalized",
        "gauge-stack-data",
        "grouped-bar",
        "pie-inner-radius",
        "combination",
        "multi-axes",
        "gauge-multi"
    ],
    getRandom(min = 100, max = 1000) {
        return Math.random() * (max - min) + min;
    },
    getData(isRange) {
        const data = [];
        const matrix = [7, 3];
    
        for (let i = 0; i < matrix[1]; i++) {
            const d = [];
    
            for (let j = 0; j < matrix[0]; j++) {
                if (j === 0) {
                    d.push(`data${i}`);
                } else {
                    const val = this.getRandom();
                    
                    d.push(
                        isRange ? [val + this.getRandom(100, 150), val, val - this.getRandom(100, 150)] : val
                    );
                }
            }
    
            data.push(d);
        }
    
        return data;
    },
    getOptions: function() {
        return {
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
                top: 30,
                right: 10,
                bottom: 5,
                left: 10
            },
            point: {
                r: 3.5
            },
            bubble: {
                maxR: 15
            },
            gauge: {
                title: "100%",
                label: {
                    extents: v => Math.round(v)
                }
            },
            donut: {
                label: {
                    show: false
                }
            },
            pie: {
                innerRadius: {},
                label: {}
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
            options.data.columns = this.getData(/range/.test(v));
            
            if (type === "normalized") {
                type = "bar";
                options.data.stack = { normalize: true };
                options.data.groups = [["data0", "data1", "data2"]];

            } else if (type === "grouped-bar") {
                type = "bar";
                options.data.groups = [["data0", "data1"]];

            } else if (type === "gauge") {
                options.data.columns = [["data0", 70]];

            } else if (type === "radar") {
                options.padding.top = 5;
            
            } else if (type === "gauge-stack-data") {
                type = "gauge";
                options.gauge.title = "ABC";
                options.data.labels = {
                    colors: "#fff"
                }
            
            } else if (type === "pie-inner-radius") {
                type = "pie";
                options.pie.label.show = false;
                options.pie.innerRadius = {
                    data0: 30,
                    data1: 20,
                    data2: 0
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

                options.gauge.type = "multi";
                options.gauge.title = "Multi";
                options.data.columns = [
                    ["data0", 25],
                    ["data1", 50],
                    ["data2", 75]
                ];
                options.gauge.label.show = true;
            }

            options.data.type = type;
            options.onrendered = function() {
                this.$.chart.insert("div", "svg")
                    .classed("title", true)
                    .text(v);
            }

            bb.generate(options);
        });
    }
 };
 
Types.generate();