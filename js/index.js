(function () {
    var $ = function (id) { return document.getElementById(id); };
    var root = document.documentElement;
    var C1 = "#1f77b4", C2 = "#f87070", C3 = "#2acefd";

    /* ---------- version labels ---------- */
    var ver = (typeof bb !== "undefined" && bb.version) || "";
    if (ver) {
        $("badgeVersion").textContent = "v" + ver;
        $("version").textContent = ver;
    }

    /* ---------- GitHub star count ---------- */
    fetch("https://api.github.com/repos/naver/billboard.js")
        .then(function (r) { return r.json(); })
        .then(function (d) {
            var n = d && d.stargazers_count;
            if (n) $("ghStar").textContent = "GitHub " + (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : n);
        })
        .catch(function () {});

    /* ---------- nav: mobile toggle, sticky height, back to top ---------- */
    var nav = $("nav"), navToggle = $("navToggle"), navlinks = $("navlinks"), toTop = $("toTop");
    navToggle.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", navlinks.classList.toggle("open"));
    });
    navlinks.addEventListener("click", function (e) {
        if (e.target.tagName === "A") { navlinks.classList.remove("open"); navToggle.setAttribute("aria-expanded", "false"); }
    });
    function setStick() { root.style.setProperty("--stick-h", nav.offsetHeight + "px"); }
    setStick();
    window.addEventListener("resize", setStick);
    window.addEventListener("scroll", function () {
        toTop.classList.toggle("show", window.scrollY > 400);
    }, {passive: true});
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    toTop.addEventListener("click", function () {
        window.scrollTo({top: 0, behavior: reduced.matches ? "auto" : "smooth"});
    });

    /* ---------- copy buttons ----------
       header and section buttons copy an address; buttons inside a code box copy the code */
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
        return new Promise(function (resolve, reject) {
            var ta = document.createElement("textarea");
            ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
            document.body.appendChild(ta); ta.select();
            var ok = document.execCommand("copy");
            ta.remove();
            ok ? resolve() : reject();
        });
    }
    function flash(btn, cls, msg) {
        btn.classList.add(cls);
        $("live").textContent = msg;
        setTimeout(function () { btn.classList.remove(cls); }, 1600);
    }
    document.querySelectorAll(".code").forEach(function (box) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "copy"; b.dataset.copyCode = "";
        b.title = "Copy code"; b.setAttribute("aria-label", "Copy code");
        box.appendChild(b);
    });
    document.addEventListener("click", function (e) {
        var btn = e.target.closest && e.target.closest(".copy");
        if (!btn) return;
        var page = location.origin + location.pathname, text;
        if ("copyCode" in btn.dataset) text = btn.parentNode.querySelector("pre:not(.hide)").textContent;
        else text = btn.dataset.copyAnchor ? page + "#" + btn.dataset.copyAnchor : page;
        copyText(text).then(
            function () { flash(btn, "done", "Copied"); },
            function () { flash(btn, "fail", "Copy failed"); }
        );
    });

    /* open at the section named in the address once the page has its final layout */
    window.addEventListener("load", function () {
        var target = location.hash && document.getElementById(location.hash.slice(1));
        if (target) setTimeout(function () { target.scrollIntoView(); }, 200);
    });

    /* ---------- shared chart helpers ---------- */
    function css(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
    // canvas mode has no DOM nodes for CSS to style, so the page colours are passed as options
    function canvasTheme() {
        return {theme: {selectors: {
            ".bb-axis .tick text": {fill: css("--mut"), font: "11px 'IBM Plex Sans', sans-serif"},
            ".bb-axis path.domain": {stroke: css("--rule")},
            ".bb-axis .tick line": {stroke: css("--rule")},
            ".bb-grid line": {stroke: css("--grid")}
        }}};
    }
    function gauss() {
        var u = 1 - Math.random(), v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    var fmt = function (n) { return Math.round(n).toLocaleString("en-US"); };

    /* ---------- benchmark ---------- */
    var STEPS = [1e3, 2.5e3, 5e3, 1e4, 2.5e4, 5e4, 1e5, 2.5e5, 5e5, 1e6];
    // SVG keeps every point in the DOM, and past this the tab stalls for seconds.
    // Bars get their own limit: past it the first draw takes seconds even on canvas.
    var SVG_CAP = 5e4, BAR_CAP = 1e4;
    var state = {mode: "canvas", type: "scatter", n: 1e5};
    var benchChart = null, runs = [], drawing = false;
    var holder = $("benchChart"), note = $("benchNote"), range = $("ptRange");

    function capFor(mode, type) {
        return type === "bar" ? BAR_CAP : mode === "svg" ? SVG_CAP : STEPS[STEPS.length - 1];
    }
    // a cap can sit between two steps, so the step above it stands for the cap
    function stepIndex(n) {
        for (var i = 0; i < STEPS.length - 1 && STEPS[i] < n; i++);
        return i;
    }
    function stepValue(i) {
        return Math.min(STEPS[i], capFor(state.mode, state.type));
    }
    function benchData(type, n) {
        var half = Math.round(n / 2), i, cols;
        if (type === "scatter") {
            var xa = ["xa"], xb = ["xb"], ya = ["series a"], yb = ["series b"], a, b;
            for (i = 0; i < half; i++) {
                a = Math.random() * 8; b = Math.random() * 8;
                xa.push(a); ya.push(a * 0.7 + gauss() * (0.3 + a * 0.35));
                xb.push(b); yb.push(4 + Math.sin(b * 0.7) * 2 + gauss() * (0.25 + Math.abs(b - 4) * 0.3));
            }
            return {xs: {"series a": "xa", "series b": "xb"}, columns: [xa, xb, ya, yb]};
        }
        cols = [["series a"], ["series b"]];
        var v0 = 60, v1 = 40;
        for (i = 0; i < half; i++) {
            v0 += gauss() * 1.2; v1 += gauss() * 1.2;
            if (type === "bar") { cols[0].push(Math.abs(v0) + 5); cols[1].push(Math.abs(v1) + 5); }
            else { cols[0].push(v0); cols[1].push(v1); }
        }
        return {columns: cols};
    }
    function syncControls() {
        document.querySelectorAll("#modeSeg button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.v === state.mode); });
        document.querySelectorAll("#typeSeg button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.v === state.type); });
        range.value = stepIndex(state.n);
        $("ptOut").textContent = fmt(state.n);
    }
    function renderRuns() {
        var body = $("runRows"), max = 1;
        body.textContent = "";
        runs.forEach(function (r) { if (r.ms > max) max = r.ms; });
        runs.forEach(function (r) {
            var tr = document.createElement("tr");
            tr.dataset.mode = r.mode;
            function td(text, cls) { var c = document.createElement("td"); if (cls) c.className = cls; c.textContent = text; tr.appendChild(c); return c; }
            var tag = document.createElement("span");
            tag.className = "tag"; tag.textContent = r.mode === "svg" ? "SVG" : "Canvas";
            td("").appendChild(tag);
            td(r.type);
            td(fmt(r.n), "num");
            td(fmt(r.ms) + " ms", "num");
            var bar = document.createElement("span");
            bar.className = "bar"; bar.style.width = (r.ms / max * 100) + "%";
            td("", "barcol").appendChild(bar);
            body.appendChild(tr);
        });
        $("runTable").hidden = !runs.length;
        $("runsEmpty").hidden = !!runs.length;
    }
    function draw(log) {
        if (drawing) return;
        drawing = true;
        var cap = capFor(state.mode, state.type), capped = state.n > cap;
        if (capped) state.n = cap;
        syncControls();
        note.textContent = "Drawing " + fmt(state.n) + " points";
        // let the note paint before the main thread is taken by the chart
        requestAnimationFrame(function () { setTimeout(function () {
            var mode = state.mode, type = state.type, n = state.n;
            var data = benchData(type, n), focusOnly = type === "line" || type === "area";
            data.type = type;
            data.colors = {"series a": C1, "series b": C2};
            var opt = {
                bindto: holder,
                render: {mode: mode},
                data: data,
                // line and area draw a point only for the focused x, large enough to find on a dense line
                point: {show: type !== "bar", focus: focusOnly ? {only: true, expand: {r: 5}} : {}, r: n > 2e4 ? 1.2 : 2},
                bar: {width: {ratio: 0.8}},
                transition: {duration: 0},
                legend: {show: false},
                axis: {
                    x: {tick: {count: 8, fit: false, format: function (x) { return type === "scatter" ? (+x).toFixed(1) : fmt(x); }}},
                    y: {tick: {count: 6, format: function (y) { return (+y).toFixed(0); }}}
                },
                size: {height: holder.clientHeight},
                padding: {top: 6, right: 14}
            };
            if (mode === "canvas") opt.canvas = canvasTheme();
            if (benchChart) benchChart.destroy();
            var t0 = performance.now();
            benchChart = bb.generate(opt);
            // the frame after generate() is the first one that shows the chart
            requestAnimationFrame(function () {
                var ch = new MessageChannel();
                ch.port1.onmessage = function () {
                    var ms = performance.now() - t0;
                    $("rPts").textContent = fmt(n);
                    $("rTime").textContent = fmt(ms);
                    $("rNodes").textContent = fmt(holder.querySelectorAll("*").length);
                    note.textContent = !capped ? ""
                        : type === "bar" ? "Bars stop at " + fmt(cap) + " here. Past that the first draw takes seconds."
                        : "SVG keeps every point in the DOM, so this bench stops it at " + fmt(cap) + ". Canvas goes to 1,000,000.";
                    if (log !== false) {
                        runs.unshift({mode: mode, type: type, n: n, ms: ms});
                        runs.length = Math.min(runs.length, 8);
                        renderRuns();
                    }
                    drawing = false;
                };
                ch.port2.postMessage(0);
            });
        }, 0); });
    }
    function bindSeg(id, key) {
        $(id).addEventListener("click", function (e) {
            var b = e.target.closest("button");
            if (!b || state[key] === b.dataset.v) return;
            state[key] = b.dataset.v;
            draw();
        });
    }
    bindSeg("modeSeg", "mode");
    bindSeg("typeSeg", "type");
    // the thumb stops at the cap of the current mode and type, so a drag never lands above it
    range.addEventListener("input", function () {
        var max = stepIndex(capFor(state.mode, state.type));
        if (+range.value > max) range.value = max;
        $("ptOut").textContent = fmt(stepValue(+range.value));
    });
    range.addEventListener("change", function () { state.n = stepValue(+range.value); draw(); });
    $("redraw").addEventListener("click", function () { draw(); });
    $("clearRuns").addEventListener("click", function () { runs = []; renderRuns(); });

    // frame-rate meter: frames the browser delivered in the last half second
    (function fps() {
        var frames = 0, last = performance.now(), out = $("rFps");
        (function tick(now) {
            frames++;
            if (now - last >= 500) {
                out.textContent = Math.round(frames * 1000 / (now - last));
                frames = 0; last = now;
            }
            requestAnimationFrame(tick);
        })(last);
    })();

    /* ---------- same options, two renderers ---------- */
    var pair = [];
    function drawPair() {
        pair.forEach(function (c) { c.destroy(); });
        pair = ["svg", "canvas"].map(function (mode) {
            var el = $(mode === "svg" ? "pairSvg" : "pairCanvas");
            var opt = {
                bindto: el,
                render: {mode: mode},
                data: {
                    columns: [
                        ["orders", 30, 200, 100, 400, 150, 250, 320, 210, 280, 190, 340, 260],
                        ["returns", 130, 100, 140, 200, 150, 50, 180, 90, 120, 160, 110, 140],
                        ["visits", 90, 70, 180, 120, 260, 140, 90, 230, 170, 300, 220, 310]
                    ],
                    types: {orders: "bar", returns: "area-spline", visits: "line"},
                    colors: {orders: C1, returns: C2, visits: C3}
                },
                transition: {duration: 0},
                legend: {show: false},
                size: {height: el.clientHeight},
                padding: {top: 6, right: 14}
            };
            if (mode === "canvas") opt.canvas = canvasTheme();
            var chart = bb.generate(opt);
            $(mode === "svg" ? "pairSvgNodes" : "pairCanvasNodes").textContent = fmt(el.querySelectorAll("*").length) + " DOM nodes";
            return chart;
        });
    }

    /* ---------- interactions ---------- */
    // live data: a new value every FLOW_STEP ms, sliding in over FLOW_ANIM ms
    var FLOW_STEP = 500, FLOW_ANIM = 350;
    var lab = null, labMode = "subchart", labRender = "svg", labVisible = false, flowTimer = 0, flowUntil = 0, flowPaused = reduced.matches;
    var labHolder = $("labChart"), flowToggle = $("flowToggle");
    var LAB = {
        subchart: {
            hint: "Drag across the strip below to pick a range, then drag the range to move it.",
            code: [
                "bb.generate({",
                "  bindto: \"#chart\",",
                "  data: {",
                "    x: \"x\",",
                "    type: \"area-spline\",",
                "    columns: [",
                "      [\"x\", /* 365 dates */],",
                "      [\"visits\", /* 365 values */]",
                "    ]",
                "  },",
                "  axis: {x: {type: \"timeseries\"}},",
                "  subchart: {show: true}",
                "});"
            ],
            options: function () {
                var x = ["x"], v = ["visits"], val = 320;
                for (var i = 0; i < 365; i++) {
                    val = Math.max(60, val + gauss() * 16 + Math.sin(i / 8) * 7);
                    x.push(new Date(2026, 0, 1 + i));
                    v.push(Math.round(val));
                }
                return {
                    data: {x: "x", type: "area-spline", columns: [x, v], colors: {visits: C1}},
                    axis: {x: {type: "timeseries", tick: {format: "%b %d", count: 6, fit: false}}},
                    point: {focus: {only: true}},
                    subchart: {show: true, size: {height: 44}},
                    legend: {show: false}
                };
            }
        },
        flow: {
            hint: "A new value arrives twice a second and the chart slides to the left.",
            code: [
                "const chart = bb.generate({",
                "  bindto: \"#chart\",",
                "  data: {",
                "    x: \"x\",",
                "    types: {cpu: \"line\", memory: \"area-spline\"},",
                "    columns: [",
                "      [\"x\", /* timestamps, 500ms apart */],",
                "      [\"cpu\", /* ... */],",
                "      [\"memory\", /* ... */]",
                "    ]",
                "  },",
                "  axis: {x: {type: \"timeseries\"}}",
                "});",
                "",
                "// every 500ms",
                "chart.flow({",
                "  columns: [",
                "    [\"x\", Date.now()],",
                "    [\"cpu\", 42],",
                "    [\"memory\", 61]",
                "  ],",
                "  duration: 350",
                "});"
            ],
            options: function () {
                // flow() keeps sliding evenly only on a timeseries x axis; an indexed x drifts left on each call
                var x = ["x"], a = ["cpu"], b = ["memory"], now = Math.floor(Date.now() / FLOW_STEP) * FLOW_STEP;
                for (var i = 0; i < 40; i++) {
                    x.push(now - (40 - i) * FLOW_STEP);
                    a.push(nextLoad(a[a.length - 1], 45));
                    b.push(nextLoad(b[b.length - 1], 62));
                }
                return {
                    data: {x: "x", types: {cpu: "line", memory: "area-spline"}, columns: [x, a, b], colors: {cpu: C2, memory: C1}},
                    axis: {
                        x: {type: "timeseries",
                            // without the default domain padding, the values sliding in and out
                            // do not fill and reopen an empty strip at both ends on each flow
                            padding: 0,
                            tick: {
                            format: "%H:%M:%S",
                            // ticks on whole 5 seconds keep the same labels while they slide;
                            // culling picks ticks by position, so on canvas its labels change mid-flow
                            values: function () {
                                var v = this.data()[0].values, ticks = [];
                                for (var t = Math.ceil(v[0].x / 5000) * 5000; t <= +v[v.length - 1].x; t += 5000) ticks.push(t);
                                return ticks;
                            },
                            culling: false
                        }},
                        y: {min: 0, max: 100, padding: 0, tick: {format: function (y) { return y + "%"; }}}
                    },
                    point: {focus: {only: true}},
                    tooltip: {format: {value: function (y) { return y + "%"; }}}
                };
            }
        },
        zoom: {
            hint: "Drag across the chart to zoom in on a range. Reset zoom brings back the whole chart.",
            code: [
                "bb.generate({",
                "  bindto: \"#chart\",",
                "  data: {",
                "    columns: [",
                "      [\"sensor a\", /* 300 values */],",
                "      [\"sensor b\", /* 300 values */]",
                "    ]",
                "  },",
                "  zoom: {",
                "    enabled: true,",
                "    // pick the range by dragging instead of the mouse wheel",
                "    type: \"drag\"",
                "  }",
                "});"
            ],
            options: function () {
                var a = ["sensor a"], b = ["sensor b"];
                for (var i = 0; i < 300; i++) {
                    a.push(Math.round(50 + Math.sin(i / 14) * 22 + gauss() * 4));
                    b.push(Math.round(42 + Math.cos(i / 23) * 16 + gauss() * 4));
                }
                return {
                    data: {columns: [a, b], colors: {"sensor a": C1, "sensor b": C2}},
                    axis: {x: {tick: {count: 7, fit: false, format: function (x) { return Math.round(x); }}}},
                    point: {focus: {only: true}},
                    zoom: {enabled: true, type: "drag"}
                };
            }
        }
    };
    function nextLoad(prev, base) {
        var v = typeof prev === "number" ? prev : base;
        return Math.round(Math.min(96, Math.max(4, v + (base - v) * 0.15 + gauss() * 6)));
    }
    function setCode(el, lines) {
        el.textContent = lines.join("\n");
        delete el.dataset.highlighted;
        if (window.hljs) hljs.highlightElement(el);
    }
    function syncFlowToggle() {
        flowToggle.hidden = labMode !== "flow";
        // media player symbols: the button shows what a press will do
        var label = flowPaused ? "Resume" : "Pause";
        flowToggle.innerHTML = flowPaused ?
            '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M6 4.5v11l9-5.5z" fill="currentColor"/></svg>' :
            '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><rect x="5" y="4.5" width="3.5" height="11" rx="1" fill="currentColor"/><rect x="11.5" y="4.5" width="3.5" height="11" rx="1" fill="currentColor"/></svg>';
        flowToggle.setAttribute("aria-label", label);
        flowToggle.title = label;
    }
    function drawLab() {
        clearInterval(flowTimer);
        // the controls answer at once even when the redraw has to wait for a flow
        document.querySelectorAll("#labSeg button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.v === labMode); });
        syncFlowToggle();
        // destroying an SVG chart mid-flow lets the flow end callback run on the destroyed chart.
        // flow() skips done when it does not run, so the wait also ends on time
        if (Date.now() < flowUntil) { setTimeout(drawLab, 50); return; }
        var spec = LAB[labMode], opt = spec.options();
        if (lab) lab.destroy();
        opt.bindto = labHolder;
        opt.size = {height: labHolder.clientHeight};
        opt.padding = {right: 24};
        // flow() animates the slide itself and a chart transition on top of it bends the area path.
        // It stays at 1ms, not 0: with 0 the SVG x axis skips the flow transition and its labels jump.
        opt.transition = {duration: reduced.matches ? 0 : labMode === "flow" ? 1 : 350};
        opt.render = {mode: labRender};
        if (labRender === "canvas") opt.canvas = canvasTheme();
        lab = bb.generate(opt);
        $("labHint").textContent = spec.hint;
        setCode($("labCode"), withRender(spec.code));
        if (labMode === "flow") {
            flowTimer = setInterval(function () {
                // nothing moves while the chart is off screen, the tab is hidden or the user paused it
                if (flowPaused || Date.now() < flowUntil || !labVisible || document.hidden) return;
                // set before the call: a flow without animation calls done right away
                flowUntil = Date.now() + FLOW_ANIM + 150;
                var d = lab.data();
                var last = function (id) { var v = d.filter(function (t) { return t.id === id; })[0].values; return v[v.length - 1]; };
                lab.flow({
                    columns: [
                        ["x", +last("cpu").x + FLOW_STEP],
                        ["cpu", nextLoad(last("cpu").value, 45)],
                        ["memory", nextLoad(last("memory").value, 62)]
                    ],
                    duration: reduced.matches ? 0 : FLOW_ANIM,
                    done: function () { flowUntil = 0; }
                });
            }, FLOW_STEP);
        }
    }
    // the options shown carry the render mode line only when it is not the default
    function withRender(lines) {
        if (labRender !== "canvas") return lines;
        var at = lines.findIndex(function (l) { return l.indexOf("bindto:") > -1; }) + 1;
        return lines.slice(0, at).concat("  render: {mode: \"canvas\"},", lines.slice(at));
    }
    document.querySelectorAll("input[name=labRender]").forEach(function (r) {
        r.addEventListener("change", function () {
            labRender = r.value;
            drawLab();
        });
    });
    $("labSeg").addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b || b.dataset.v === labMode) return;
        labMode = b.dataset.v;
        drawLab();
    });
    flowToggle.addEventListener("click", function () {
        flowPaused = !flowPaused;
        syncFlowToggle();
    });

    /* ---------- chart type gallery ---------- */
    var A = ["a", 30, 200, 100, 400, 150, 250], B = ["b", 130, 100, 140, 200, 150, 50];
    var RA = ["a", [150, 140, 110], [155, 130, 115], [160, 135, 120], [135, 120, 110], [180, 150, 130], [199, 160, 125]];
    var RB = ["b", [220, 215, 205], [240, 225, 215], [260, 235, 225], [280, 245, 235], [270, 255, 225], [240, 225, 215]];
    var parts = [["a", 40], ["b", 25], ["c", 20], ["d", 15]];
    var TYPES = [
        ["line", "LineChart", [A, B]],
        ["spline", "SplineChart", [A, B]],
        ["step", "StepChart", [A, B]],
        ["area", "AreaChart", [A, B]],
        ["area-spline", "AreaChart", [A, B]],
        ["area-step", "AreaChart", [A, B]],
        ["area-line-range", "AreaRangeChart", [RA, RB]],
        ["area-spline-range", "AreaRangeChart", [RA, RB]],
        ["area-step-range", "AreaRangeChart", [RA, RB]],
        ["bar", "BarChart", [A, B]],
        ["scatter", "ScatterPlot", [["a", 30, 200, 100, 400, 150, 250, 120, 310, 60, 220], ["b", 130, 100, 140, 200, 150, 50, 260, 80, 190, 330]]],
        ["bubble", "BubbleChart", [["a", 30, 350, 200, 380, 150, 250], ["b", 130, 100, 30, 200, 80, 50]]],
        ["candlestick", "CandlestickChart", [["a", [1327, 1369, 1289, 1348], [1348, 1371, 1314, 1320], [1320, 1412, 1314, 1394], [1394, 1458, 1380, 1445], [1445, 1479, 1391, 1403], [1403, 1432, 1355, 1380], [1380, 1470, 1372, 1452]]]],
        ["pie", "PieChart", parts],
        ["donut", "DonutChart", parts],
        ["gauge", "GaugeChart", [["a", 68]]],
        ["polar", "PolarChart", parts],
        ["radar", "RadarChart", [["x", "A", "B", "C", "D", "E"], ["a", 330, 350, 200, 380, 150], ["b", 130, 100, 300, 200, 250]]],
        ["funnel", "FunnelChart", parts],
        ["treemap", "TreemapChart", [["a", 1300], ["b", 500], ["c", 400], ["d", 300], ["e", 200]]]
    ];
    var PALETTE = {a: C1, b: C2, c: C3, d: "#9aa7b4", e: "#f5b851", x: C1};
    function drawGallery() {
        var gallery = $("gallery");
        TYPES.forEach(function (t) {
            var a = document.createElement("a"), g = document.createElement("div"), s = document.createElement("span");
            a.href = "./demo/#Chart." + t[1]; a.target = "bb";
            g.className = "g"; s.textContent = t[0];
            a.appendChild(g); a.appendChild(s); gallery.appendChild(a);
            // a plain click opens the chart here; a modified click still opens the examples page
            a.addEventListener("click", function (e) {
                if (!viewer.showModal || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                openViewer(t);
            });
            var data = {type: t[0], columns: t[2], colors: PALETTE, labels: false};
            if (t[0] === "radar") data.x = "x";
            bb.generate({
                bindto: g,
                data: data,
                size: {height: 132},
                padding: {top: 4, right: 10, bottom: 4, left: 10},
                legend: {show: false},
                tooltip: {show: false},
                interaction: {enabled: false},
                transition: {duration: 0},
                axis: {x: {show: false}, y: {show: false}},
                point: {r: 2.5},
                pie: {label: {show: false}}, donut: {label: {show: false}, width: 16}, polar: {label: {show: false}, level: {text: {show: false}}},
                gauge: {label: {show: false}, width: 16},
                radar: {axis: {text: {show: false}}, level: {text: {show: false}}},
                funnel: {label: {show: false}}, treemap: {label: {show: false}}
            });
        });
    }

    /* ---------- chart viewer ---------- */
    var viewer = $("viewer"), viewerChart = null;
    function optionCode(t) {
        var mod = t[0].replace(/-(\w)/g, function (m, c) { return c.toUpperCase(); });
        var cols = t[2].map(function (c) { return "      " + JSON.stringify(c).replace(/,/g, ", "); });
        return [
            "// ESM: import bb, {" + mod + "} from \"billboard.js\";",
            "// then use type: " + mod + "()",
            "bb.generate({",
            "  bindto: \"#chart\",",
            "  data: {"
        ].concat(t[0] === "radar" ? ["    x: \"x\","] : [], [
            "    type: \"" + t[0] + "\",",
            "    columns: [",
            cols.join(",\n"),
            "    ]",
            "  }",
            "});"
        ]);
    }
    function openViewer(t) {
        $("viewerTitle").textContent = t[0];
        $("viewerDemo").href = "./demo/#Chart." + t[1];
        setCode($("viewerCode"), optionCode(t));
        viewer.showModal();
        var holder = $("viewerChart"), data = {type: t[0], columns: t[2], colors: PALETTE};
        if (t[0] === "radar") data.x = "x";
        viewerChart = bb.generate({
            bindto: holder,
            data: data,
            size: {height: holder.clientHeight},
            padding: {right: 20},
            point: {r: 3.5},
            transition: {duration: reduced.matches ? 0 : 350}
        });
    }
    $("viewerClose").addEventListener("click", function () { viewer.close(); });
    // a click on the backdrop lands on the dialog element itself
    viewer.addEventListener("click", function (e) { if (e.target === viewer) viewer.close(); });
    viewer.addEventListener("close", function () {
        if (viewerChart) { viewerChart.destroy(); viewerChart = null; }
    });
    // the gallery and the pair sit below the fold, so they are built when they come near the viewport
    function whenNear(el, fn) {
        if (!("IntersectionObserver" in window)) return fn();
        var io = new IntersectionObserver(function (entries) {
            if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); fn(); }
        }, {rootMargin: "400px"});
        io.observe(el);
    }

    /* ---------- Get started code tabs ---------- */
    $("startTabs").addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        document.querySelectorAll("#startTabs button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        document.querySelectorAll("#startPanels pre").forEach(function (p) { p.classList.toggle("hide", p.dataset.panel !== b.dataset.tab); });
    });

    if (window.hljs) hljs.highlightAll();

    /* ---------- start ---------- */
    if (typeof bb === "undefined") {
        note.textContent = "The chart library did not load. Reload the page to try again.";
        return;
    }
    renderRuns();
    draw();
    var pairDrawn = false;
    whenNear($("renderers"), function () { pairDrawn = true; drawPair(); });
    whenNear($("interact"), drawLab);
    whenNear($("types"), drawGallery);
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) { labVisible = entries[0].isIntersecting; }).observe(labHolder);
    } else labVisible = true;
    // canvas charts take their colours from options, so they are redrawn when the colour scheme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        draw(false);
        if (pairDrawn) drawPair();
        if (lab && labRender === "canvas") drawLab();
    });
})();
