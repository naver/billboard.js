/* eslint-disable */
const billboardDemo = {
	/**
	 * Initializer
	 */
	init: function() {
		this.$wrapper = document.getElementById("wrapper");
		this.$chartArea = document.querySelector(".chart_area");
		this.$list = document.querySelector(".sidebar-nav");
		this.$title = document.getElementById("title");
		this.$codeArea = document.querySelector(".code");
		this.$code = document.querySelector("code");

		this.WIDTH = 768;
		this.selectedClass = "selected";

		this._bindEvents();
		this._createList();

		location.href.indexOf("#") > -1 && this.clickHandler(location.href);
	},

	_bindEvents: function() {
		const $list = this.$list;
		const $wrapper = this.$wrapper;
		const WIDTH = this.WIDTH;

		const clickHandler = (function(e) {
			e.target.tagName === "A" && this.clickHandler(e.target.href);
		}).bind(this);

		// bind click event to menu list
		$list.addEventListener("click", clickHandler, false);
		document.querySelector(".chart_area ul").addEventListener("click", clickHandler, false);

		document.getElementById("menu-toggle").addEventListener("click", e => {
			$wrapper.className = $wrapper.className ? "" : "toggled";
			e.preventDefault();
		}, false);

		window.addEventListener("resize", () => {
			if (window.innerWidth > WIDTH) {
				$wrapper && ($wrapper.className = "");
			}
		});
	},

	/**
	 * Create left menu list
	 * @private
	 */
	_createList: function() {
		const html = [];

		Object.keys(demos).forEach(key => {
			html.push(`<li><h4>${key}</h4>`);

			Object.keys(demos[key]).forEach((v, i) => {
				i === 0 && html.push("<ul>");
				html.push(`<li><a href='#${[key, v].join(".")}'>${v}</a></li>`);
			});

			html.push("</ul></li>");
		});


		this.$list.innerHTML = html.join("");
	},

	/**
	 * Click handler
	 * @param {String} type
	 */
	clickHandler: function(type) {
		// remove legend
		const $legend = document.querySelector(".legend");

		$legend && $legend.parentNode.removeChild($legend);

		if (window.innerWidth <= this.WIDTH) {
			this.$wrapper.className = "";
		}

		type = type.replace(/.*#/, "").split(".");

		if (type.length < 2) {
			return;
		}

		this.generate(type[0], type[1]);

		this.$title.innerHTML = type[1]
			.replace(/([A-Z][a-z])/g, " $1")
			.replace(/([A-Z]+)/g, " $1");

		this.$codeArea.style.display = "block";

		// remove selected class
		let $selected = this.$list.querySelector(`[class=${this.selectedClass}]`);

		$selected && ($selected.className = $selected.className.replace(this.selectedClass, ""));

		// add selected class
		$selected = this.$list.querySelector(`[href='#${type.join(".")}']`);
		$selected.className += this.selectedClass;

		window.scrollTo(0, 0);
	},

	/**
	 * Generate chart demo
	 * @param {String} type
	 * @param {String} key
	 * @returns {boolean}
	 */
	generate: function(type, key) {
		const inst = bb.instance;
		const typeData = demos[type][key];
		const isArray = typeData && typeData.constructor === Array;
		const self = this;

		inst.length && inst.forEach(c => {
			const timer = c.timer;
			const el = c.element;

			try {
				timer && timer.forEach(v => {
					clearTimeout(v);
				});
			} finally {
				el.parentNode && el.parentNode.removeChild(el);
				c.destroy();
			}
		});

		const code = {
			markup: [],
			data: []
		};

		// generate chart
		isArray ? typeData.forEach((t, i) => {
			self._addChartInstance(t, key, i + 1, code);
		}) : this._addChartInstance(typeData, key, undefined, code);

		this.$code.innerHTML = "";

		code.markup.forEach(t => { self.$code.innerHTML += t; });
		code.data.forEach(t => { self.$code.innerHTML += t; });

		this.$code.scrollTop = 0;

		hljs.highlightBlock(this.$code);

		return false;
	},

	_addChartInstance: function(type, key, index, code) {
		if (index) {
			key += `_${index}`;
		}

		let $el = document.getElementById(key);
		let legend;

		if (!$el) {
			$el = document.createElement("div");
			$el.id = key;

			if ((index && index === 1) || !index) {
				this.$chartArea.innerHTML = "";
			}

			this.$chartArea.appendChild($el);

			if (key.indexOf("LegendTemplate") > -1) {
				legend = document.createElement("div");
				legend.id = "legend";
				legend.style.textAlign = "center";

				this.$chartArea.appendChild(legend);
				legend = "&lt;div id=\"legend\">&lt;/div>";
			}
		}

		const func = type.func;
		const style = type.style;
		const options = type.options;

		options.bindto = `#${key}`;

		const inst = bb.generate(options);

		inst.timer = [];

		const codeStr = `var chart${index > 1 ? index : ""} = bb.generate(${
			JSON.stringify(options, (k, v) => {
				if (typeof v === "function") {
					return v.toString().replace(/\t+}$/, `${Array(/(format|data)/.test(k) ? 8 : 4).join(" ")}}`);
				} else if (/(columns|rows|json)/.test(k)) {
					const str = JSON.stringify(v)
						.replace(/\[\[/g, "[\r\n\t[")
						.replace(/\]\]/g, "]\r\n    ]")
						.replace(/(],)/g, "$1\r\n\t")
						.replace(/(\"|\d),/g, "$1, ");

					return k === "json" ?
						str.replace(/{/, "{\r\n\t").replace(/}/, "\r\n    }") : str;
				}

				return v;
			}, 2)
				.replace(/\"?(function|})\"?/g, "$1")
				.replace(/\\"/g, "\"")
				.replace(/</g, "&lt;")
				.replace(/\\t/g, "\t")
				.replace(/\t{5}/g, "")
				.replace(/\\r/g, "\r")
				.replace(/"(\w+)":/g, "$1:")
				.replace(/\\n(?!T)/g, "\n")});`;

		// markup
		if ((index && index === 1) || !index) {
			code.markup.push(`&lt;!-- Markup -->\r\n&lt;div id="${key}">&lt;/div>\r\n${legend ? `${legend}\r\n` : ""}\r\n`);
		} else if (index && index > 1) {
			code.markup.push(`&lt;div id="${key}">&lt;/div>\r\n${legend ? `${legend}\r\n` : ""}\r\n`);
		}

		if (index && index > 1) {
			code.data.push("\r\n\r\n");
		}

		// script this.$code.innerHTML
		code.data.push(`// Script\r\n${codeStr.replace(/"(\[|{)/, "$1").replace(/(\]|})"/, "$1")}`);

		try {
			if (func) {
				code.data.push(`\r\n\r\n${func.toString()
					.replace(/[\t\s]*function\s*\(chart\) \{[\r\n\t\s]*/, "")
					.replace(/}$/, "")
					.replace(/chart.timer = \[[\r\n\t\s]*/, "")
					.replace(/\t{5}/g, "")
					.replace(/[\r\n\t\s]*\];?[\r\n\t\s]*$/, "")
					.replace(/(\d)\),?/g, "$1);")}`);

				func(inst);
			}
		} catch (e) {}

		// style
		if (style) {
			code.data.push(`\r\n\r\n/* Style */\r\n${style.join("\r\n")}`);
		}
	}
};
