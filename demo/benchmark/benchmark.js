window.bench = {
    chart: null,
    timer: null,
    billboard: null,
    $el: {
        type: document.getElementById("type"),
        matrix1: document.getElementById("matrix1"),
        matrix2: document.getElementById("matrix2"),
        transition: document.getElementById("transition")
    },
    getRandom(min = 100, max = 1000) {
        return Math.random() * (max - min) + min;
    },
    getData() {
        const data = [];
        const matrix = [this.$el.matrix1.value, this.$el.matrix2.value];
    
        for (let i = 0; i < matrix[1]; i++) {
            const d = [];
    
            for (let j = 0; j < matrix[0]; j++) {
                if (j === 0) {
                    d.push(`data${i}`);
                } else {
                    d.push(this.getRandom());
                }
            }
    
            data.push(d);
        }
    
        return data;
    },
    loadBillboard: function() {
        const version = document.getElementById("version").value;

        this.billboard && document.head.removeChild(this.billboard);
		this.billboard = document.createElement("script");
		
		this.billboard.src = version === "local-latest" ? 
			"../../dist/billboard.js":
			`https://cdn.jsdelivr.net/npm/billboard.js@${version}/dist/billboard.js`;

        document.head.appendChild(this.billboard);
    },
    generate: function(type) {
        this.chart = bb.generate({
            data: {
                columns: this.getData(),
                type: this.$el.type.value
            },
            transition: {
                duration: +this.$el.transition.value
            },
            legend: {
              show: false
            }
        });

        this[type]();
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
