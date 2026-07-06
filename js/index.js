(function () {
    /* ---------- version labels ---------- */
    var ver = (typeof bb !== "undefined" && bb.version) ? bb.version : "4.0.2";
    var badge = document.getElementById("badgeVersion");
    if (badge) badge.textContent = "Latest version: v" + ver;
    var v = document.getElementById("version"); if (v) v.textContent = ver;
    var sv = document.getElementById("statVer"); if (sv) sv.textContent = "v" + ver;

    /* ---------- live GitHub star count ---------- */
    var ghStar = document.getElementById("ghStar");
    if (ghStar) {
        fetch("https://api.github.com/repos/naver/billboard.js")
            .then(function (r) { return r.json(); })
            .then(function (d) {
                var n = d && d.stargazers_count;
                if (!n) return;
                var label = n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
                ghStar.textContent = "★ GitHub " + label;
            })
            .catch(function () {});
    }

    /* ---------- mobile nav ---------- */
    var navToggle = document.getElementById("navToggle");
    var navlinks = document.getElementById("navlinks");
    navToggle && navToggle.addEventListener("click", function () {
        navlinks.classList.toggle("open");
    });

    /* ---------- hero chart ---------- */
    var columns = [
        ["data1", 30, 200, 100, 400, 150, 250, 320],
        ["data2", 130, 100, 140, 200, 150, 50, 180],
        ["data3", 90, 70, 180, 120, 260, 140, 90]
    ];
    var heroColors = {data1: "#2acefd", data2: "#f87070", data3: "#a06bff"};
    var comboTypes = {data1: "bar", data2: "area-spline", data3: "line"};
    var hero = null;
    function genHero(t) {
        var cfg = {
            bindto: "#chart",
            data: {columns: columns, colors: heroColors},
            bar: {width: {ratio: .55}},
            legend: {show: true},
            axis: {x: {tick: {show: false}}},
            size: {height: 340},
            padding: {top: 10}
        };
        // "combination" assigns a type per series; everything else is a single type.
        if (t === "combination") { cfg.data.types = comboTypes; }
        else { cfg.data.type = t; }
        if (hero) { hero.destroy(); }
        hero = bb.generate(cfg);
    }
    genHero("bar");
    document.querySelectorAll("#heroSeg button").forEach(function (b) {
        b.addEventListener("click", function () {
            document.querySelectorAll("#heroSeg button").forEach(function (x) { x.classList.remove("on"); });
            b.classList.add("on");
            genHero(b.dataset.t);
        });
    });

    /* ---------- SVG vs Canvas showcase ---------- */
    /* SVG builds one DOM node per point; beyond a few thousand it freezes the
       browser, so SVG mode is capped and larger sets are Canvas-only. */
    var SVG_MAX = 2500;
    var curMode = "canvas", curN = 5000, chart2 = null;
    var canvasTheme = {theme: {selectors: {
        ".bb-axis .tick text": {fill: "#8b93a7", font: "11px sans-serif"},
        ".bb-axis path.domain": {stroke: "#333a47"},
        ".bb-axis .tick line": {stroke: "#333a47"},
        ".bb-grid line": {stroke: "rgba(255,255,255,.10)"}
    }}};
    // standard-normal noise (Box–Muller)
    function gauss() {
        var u = 1 - Math.random(), v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    function gen(n) {
        var xa = ["x_a"], xb = ["x_b"], ya = ["setosa"], yb = ["versicolor"];
        for (var i = 0; i < n; i++) {
            var a = Math.random() * 8, b = Math.random() * 8;
            // spread widens with x → the y distribution differs by value (fan shape)
            xa.push(+a.toFixed(3));
            ya.push(+(a * 0.7 + gauss() * (0.3 + a * 0.35)).toFixed(3));
            // wavy band whose spread tightens then widens across x
            xb.push(+b.toFixed(3));
            yb.push(+(4 + Math.sin(b * 0.7) * 2 + gauss() * (0.25 + Math.abs(b - 4) * 0.3)).toFixed(3));
        }
        return [xa, xb, ya, yb];
    }
    function render() {
        var opt = {
            bindto: "#chart2",
            render: {mode: curMode},
            data: {
                xs: {setosa: "x_a", versicolor: "x_b"},
                type: "scatter",
                columns: gen(curN),
                colors: {setosa: "#2acefd", versicolor: "#f87070"}
            },
            point: {r: curMode === "canvas" ? 1.6 : 2},
            legend: {show: true},
            axis: {x: {tick: {count: 6, format: function (x) { return x.toFixed(1); }}}, y: {tick: {count: 6, format: function (y) { return y.toFixed(2); }}}},
            size: {height: 360},
            padding: {top: 8, right: 16}
        };
        if (curMode === "canvas") opt.canvas = canvasTheme;
        // SVG animates one DOM node per point on init; disable the transition so
        // large SVG sets render immediately (and the measured time stays fair).
        else opt.transition = {duration: 0};
        if (chart2) chart2.destroy();
        var t0 = performance.now();
        chart2 = bb.generate(opt);
        var t1 = performance.now();
        document.getElementById("mPts").textContent = curN.toLocaleString();
        document.getElementById("mTime").textContent = Math.round(t1 - t0) + " ms";
        document.getElementById("mMode").textContent = curMode.toUpperCase();
        document.getElementById("modeTag").textContent = 'render.mode: "' + curMode + '"';
    }
    function syncPts() {
        document.querySelectorAll("#ptSeg button").forEach(function (b) {
            var blocked = curMode === "svg" && +b.dataset.n > SVG_MAX;
            b.disabled = blocked;
            b.classList.toggle("disabled", blocked);
            b.title = blocked ? "Too many nodes for SVG — switch to Canvas" : "";
        });
        var hint = document.getElementById("rhint");
        if (hint) hint.textContent = curMode === "svg"
            ? "SVG builds one DOM node per point — best under ~2,500."
            : "Canvas draws to a single bitmap — scales to tens of thousands.";
    }
    function setActivePt() {
        document.querySelectorAll("#ptSeg button").forEach(function (x) {
            x.classList.toggle("on", +x.dataset.n === curN);
        });
    }
    document.querySelectorAll("#modeSeg button").forEach(function (b) {
        b.addEventListener("click", function () {
            document.querySelectorAll("#modeSeg button").forEach(function (x) { x.classList.remove("on"); });
            b.classList.add("on");
            curMode = b.dataset.m;
            if (curMode === "svg" && curN > SVG_MAX) { curN = SVG_MAX; setActivePt(); }
            syncPts();
            render();
        });
    });
    document.querySelectorAll("#ptSeg button").forEach(function (b) {
        b.addEventListener("click", function () {
            if (b.disabled) return;
            document.querySelectorAll("#ptSeg button").forEach(function (x) { x.classList.remove("on"); });
            b.classList.add("on"); curN = +b.dataset.n; render();
        });
    });
    syncPts();
    render();

    /* ---------- Get Started code tabs ---------- */
    var startTabs = document.getElementById("startTabs");
    var startPanels = document.getElementById("startPanels");
    if (startTabs && startPanels) {
        startTabs.querySelectorAll("button").forEach(function (b) {
            b.addEventListener("click", function () {
                startTabs.querySelectorAll("button").forEach(function (x) { x.classList.remove("on"); });
                b.classList.add("on");
                startPanels.querySelectorAll("pre").forEach(function (p) {
                    p.classList.toggle("hide", p.dataset.panel !== b.dataset.tab);
                });
            });
        });
    }

    /* ---------- code highlight ---------- */
    if (window.hljs) hljs.highlightAll();
})();
