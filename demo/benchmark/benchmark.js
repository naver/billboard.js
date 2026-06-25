window.bench = {
    chart: null,
    timer: null,
    performance: {},
    billboard: null,
    target: ["latest", "4.0.0", "3.5.0", "2.0.0", "1.12.11"],
    $el: {
        version: document.getElementById("version"),
        type: document.getElementById("type"),
        dataSeries: document.getElementById("data-series"),
        dataSize: document.getElementById("data-size"),
        transition: document.getElementById("transition"),
        renderModes: document.querySelectorAll("[name=render-mode]"),
        boostOptions: [document.getElementById("useCssRule"), document.getElementById("useWorker")]
    },
    init() {
        if (/^(127\.|localhost)/.test(location.host)) {
            // place "local" right after "latest"
            this.target.splice(1, 0, "local");
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
    getRenderMode() {
        return [].slice.call(this.$el.renderModes).find(v => v.checked)?.value || "svg";
    },
    // compare a selected version against a minimum (e.g. "3.5.0").
    // "local"/"latest" are always treated as the newest.
    isVersionAtLeast: function(version, min) {
        if (version === "local" || version === "latest") {
            return true;
        }

        const parse = v => v.split(".").map(n => parseInt(n, 10) || 0);
        const cur = parse(version);
        const target = parse(min);

        for (let i = 0; i < target.length; i++) {
            if ((cur[i] || 0) !== target[i]) {
                return (cur[i] || 0) > target[i];
            }
        }

        return true;
    },
    // canvas render mode is only supported from 4.0+
    toggleCanvasMode: function(version) {
        const canvas = [].slice.call(this.$el.renderModes).find(v => v.value === "canvas");

        if (!canvas) {
            return;
        }

        const supported = this.isVersionAtLeast(version, "4.0.0");

        canvas.disabled = !supported;
        canvas.parentNode.style.opacity = supported ? "" : "0.4";

        // fall back to svg when canvas gets disabled while selected
        if (!supported && canvas.checked) {
            canvas.checked = false;
            [].slice.call(this.$el.renderModes).find(v => v.value === "svg").checked = true;
        }
    },
    // boost options are only supported from 3.5.0+
    toggleBoostOptions: function(version) {
        const supported = this.isVersionAtLeast(version, "3.5.0");

        this.$el.boostOptions.forEach(option => {
            if (!option) {
                return;
            }

            option.disabled = !supported;
            option.parentNode.style.opacity = supported ? "" : "0.4";

            // uncheck when boost gets disabled
            if (!supported) {
                option.checked = false;
            }
        });
    },
    loadBillboard: function() {
        const version = document.getElementById("version").value;

        this.toggleCanvasMode(version);
        this.toggleBoostOptions(version);

        this.billboard && document.head.removeChild(this.billboard);
        this.billboard = document.createElement("script");
        this.billboard.src = version === "local" ? "../../dist/billboard.pkgd.min.js" :
            `https://cdn.jsdelivr.net/npm/billboard.js${version === "latest" ? "" : `@${version}`}/dist/billboard.pkgd.min.js`;

        this.billboard.onload = () => {
            // only resolve the "latest" label when "latest" was actually selected
            if (version !== "latest") {
                return;
            }

            const {options} = this.$el.version;
            const latestOption = [].slice.call(options).find(v => v.value === "latest");
            const {version: loadedVersion} = bb;

            if (latestOption && ![].slice.call(options).some(v => v.value === loadedVersion)) {
                latestOption.value = loadedVersion;
                latestOption.text = loadedVersion;
            }
        }
      
        document.head.appendChild(this.billboard);
    },
    perf: function(isEnd = false, taskName) {
        const perf = this.performance[taskName] || (this.performance[taskName] = {start: 0, end: 0});

        perf[isEnd ? "end" : "start"] = performance.now();
        isEnd && console.info(`⚡️${taskName} took: %c${perf.end - perf.start}%c ms.`, "background-color:red;color:#fff", "background-color:inherit;color:inherit");
    },
    generate: function(type) {
        if (!window.bb) {
            alert("Select the desired version first.");
            this.$el.version.focus();

            return;
        }

        // Destroy existing chart instance to prevent memory leak
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }

        const chartType = this.$el.type.value;
        const renderMode = this.getRenderMode();

        this.perf(false, "Generate");

        this.chart = bb.generate({
            render: {
                mode: renderMode
            },
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
            },
            onrendered: () => {
                !type && this.perf(true, "Generate");             
            }
        });

        type && this[type]();
    },
    load: function() {
        const ctx = this;

        this.stop();
        this.perf(false, "Load");

        this.chart.load({
            columns: this.getData(),
            done: function() {
                ctx.perf(true, "Load");
                ctx.timer = setTimeout(bench.load.bind(bench), 500);
            }
        });
    },
    resize: function() {
        this.stop();
        const duration = +this.$el.transition.value;

        this.timer = setInterval(() => {
            this.perf(false, "Resize");

            bench.chart.resize({
                width: this.getRandom(200, 600),
                height: this.getRandom(200, 480)
            });

            if (duration > 0) {
                // Wait for transition to complete before measuring
                setTimeout(() => this.perf(true, "Resize"), duration + 50);
            } else {
                this.perf(true, "Resize");
            }
        }, Math.max(500, duration + 100));
    },
    stop: function() {
        this.play = false;
        clearInterval(this.timer);
    }
};

window.bench.init();
