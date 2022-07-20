window.bench = {
    chart: null,
    timer: null,
    billboard: null,
    target: ["1.12.11", "2.0.0", "3.0.0", "latest"],
    $el: {
        version: document.getElementById("version"),
        type: document.getElementById("type"),
        dataSeries: document.getElementById("data-series"),
        dataSize: document.getElementById("data-size"),
        transition: document.getElementById("transition")
    },
    init() {
        if (/^(127\.|localhost)/.test(location.host)) {
            this.target.unshift("local");
        }

       // append targeted version list
       this.target.forEach(v => {
         this.$el.version.add(new Option(v, v));
       });
    },  
    getRandom(min = 100, max = 1000) {
        return Math.random() * (max - min) + min;
    },
    getData() {
        const data = [];
        const matrix = [this.$el.dataSeries.value, this.$el.dataSize.value];
    
        for (let i = 0; i < matrix[0]; i++) {
            const d = [];
    
            for (let j = 0; j < matrix[1]; j++) {
                if (j === 0) {
                    d.push(`data${i}`);
                } else {
                    d.push(this.getRandom());
                }
            }
    
            data.push(d);
        }
        
        //console.log(JSON.stringify(data));
        return data;
    },
    loadBillboard: function() {
        const version = document.getElementById("version").value;

        this.billboard && document.head.removeChild(this.billboard);
        this.billboard = document.createElement("script");
        this.billboard.src = version === "local" ? "../../dist/billboard.pkgd.min.js" :
            `https://cdn.jsdelivr.net/npm/billboard.js${version === "latest" ? "" : `@${version}`}/dist/billboard.pkgd.min.js`;

        this.billboard.onload = () => {
            const {options} = this.$el.version;
            const lastOption = options[options.length - 1];
            const {version} = bb;

            if (lastOption.value === "latest" && ![].slice.call(options).some(v => v.value === version)) {
                lastOption.value = version;
                lastOption.text = version;
            }
        }
      
        document.head.appendChild(this.billboard);
    },
    generate: function(type) {
        if (!window.bb) {
            alert("Select the desired version fisrt.");
            this.$el.version.focus();

            return;
        }

        const chartType = this.$el.type.value;

        this.chart = bb.generate({
            boost: {
                useCssRule: document.getElementById("useCssRule").checked,
                useWorker: document.getElementById("useWorker").checked
            },
            data: {
                columns: this.getData(),
                type: chartType
            },
            transition: {
                duration: +this.$el.transition.value
            },
            legend: {
              show: false
            },
            point: chartType !== "scatter" ? {
                focus: {
                    only: true
                },
            } : {},
            axis: {
                x: {
                    tick: {
                        show: false
                    }
                }
            }
        });

        type && this[type]();
    },
    load: function() {
        const ctx = this;

        this.stop();

        this.chart.load({
            columns: this.getData(),
            done: function() {
                ctx.timer = setTimeout(bench.load.bind(bench), 500);
            }
        });
    },
    resize: function() {
        const ctx = this;

        this.stop();
        this.timer = setInterval(function() {
            bench.chart.resize({
                width: ctx.getRandom(200, 600),
                height: ctx.getRandom(200, 480)
            });
        }, 500);
    },
    stop: function() {
        this.play = false;
        clearInterval(this.timer);
    }  
};

window.bench.init();
