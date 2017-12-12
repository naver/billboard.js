/* eslint-disable */
var billboardDemo = {
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
		this.chartInst = [];

		this.WIDTH = 768;
		this.selectedClass = "selected";

		this._bindEvents();
		this._createList();

		location.href.indexOf("#") > -1 && this.clickHandler(location.href);
	},

	_bindEvents: function() {
		var $list = this.$list;
		var $wrapper = this.$wrapper;
		var WIDTH = this.WIDTH;

		// bind click event to menu list
		$list.addEventListener("click", (function(e) {
			e.target.tagName === "A" && this.clickHandler(e.target.href)
		}).bind(this));

		document.getElementById("menu-toggle").addEventListener("click", function(e) {
			$wrapper.className = $wrapper.className ? "" : "toggled";
			e.preventDefault();
		});

		window.addEventListener("resize", function() {
			if (window.innerWidth > WIDTH) {
				$wrapper && ($wrapper.className = "");
			}

		})
	},

	/**
	 * Create left menu list
	 * @private
	 */
	_createList: function() {
		var html = [];

		Object.keys(demos).forEach(function (key) {
			html.push("<li><h4>" + key + "</h4>");

			Object.keys(demos[key]).forEach(function (v, i) {
				i === 0 && html.push("<ul>");
				html.push("<li><a href='#"+ [key, v].join(".") + "'>" + v + "</a></li>");
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
		var $legend = document.querySelector(".legend");
		$legend && $legend.parentNode.removeChild($legend);

		if (window.innerWidth <= this.WIDTH) {
			this.$wrapper.className = "";
		}

		type = type.replace(/.*#/,"").split(".");

		if (type.length < 2) {
			return;
		}

		this.generate(type[0], type[1]);

		this.$title.innerHTML = type[1]
			.replace(/([A-Z][a-z])/g, " $1")
			.replace(/([A-Z]+)/g, " $1");

		this.$codeArea.style.display = "block";

		// remove selected class
		var $selected = this.$list.querySelector("[class="+ this.selectedClass +"]");
		$selected && ($selected.className = $selected.className.replace(this.selectedClass,""));

		// add selected class
		$selected = this.$list.querySelector("[href='#"+ type.join(".") +"']");
		$selected.className += this.selectedClass;

		window.scrollTo(0,0);
	},

	/**
	 * Generate chart demo
	 * @param {String} type
	 * @param {String} key
	 * @returns {boolean}
	 */
	generate: function(type, key) {
		var chartInst = this.chartInst;

		chartInst.length &&
			chartInst.forEach(function(c, i, array) {
				c.timer && c.timer.forEach(function(v) {
					clearTimeout(v);
				});

				c.element.parentNode.removeChild(c.element);

				//c.destroy();
				array.shift();
			});

		// generate chart
		var $el = document.getElementById(key);

		if (!$el) {
			$el = document.createElement("div");
			$el.id = key;

			this.$chartArea.innerHTML = "";
			this.$chartArea.appendChild($el);

			if (key.indexOf("LegendTemplate") > -1) {
				var legend = document.createElement("div");
				legend.id = "legend";
				legend.style.textAlign = "center";

				this.$chartArea.appendChild(legend);
				legend = "&lt;div id=\"legend\">&lt;/div>";
			}
		}

		var type = demos[type][key];
		var func = type.func;
		var style = type.style;

		var options = type.options;
		options.bindto = "#" + key;

		var inst = bb.generate(options);
		inst.timer = [];
		this.chartInst.push(inst);

		var codeStr = "var chart = bb.generate("+
			JSON.stringify(options, function(key, value) {
				if (typeof value === "function") {
					return value.toString();
				} else if (/(columns|rows|json)/.test(key)) {
					var str = JSON.stringify(value)
						.replace(/\[\[/g, "[\r\n\t[")
						.replace(/\]\]/g, "]\r\n    ]")
						.replace(/(],)/g, "$1\r\n\t")
						.replace(/(\"|\d),/g, "$1, ")
						.replace(/"([^(")"]+)":/g,"$1:");
						
					return key === "json" ?
						str.replace(/{/, "{\r\n\t").replace(/}/, "\r\n    }") : str;
				}

				return value;
			}, 2)
			.replace(/(\"function)/g, "function")
			.replace(/(}\")/g, "}")
			.replace(/\\"/g, "\"")
			.replace(/</g, "&lt;")
			.replace(/\\t/g, "\t")
			.replace(/\t{5}/g,"")
			.replace(/\\r/g, "\r")
			.replace(/\\n(?!T)/g, "\n") +");";

		// markup
		this.$code.innerHTML = "&lt;!-- Markup -->\r\n&lt;div id=\""+ key +"\">&lt;/div>\r\n"+ (legend ? legend + "\r\n" : "") +"\r\n";

		// script
		this.$code.innerHTML += "// Script\r\n"+ codeStr.replace(/"(\[|{)/, "$1").replace(/(\]|})"/, "$1");
		this.$code.scrollTop = 0;

		try {
			if (func) {
				this.$code.innerHTML += "\r\n\r\n" + func.toString()
					.replace(/[\t\s]*function \(chart\) \{[\r\n\t\s]*/,"")
					.replace(/}$/,"")
					.replace(/chart.timer = \[[\r\n\t\s]*/,"")
					.replace(/\t{5}/g,"")
					.replace(/[\r\n\t\s]*\];?[\r\n\t\s]*$/,"")
					.replace(/(\d)\),?/g, "$1);");

				func(inst);
			}
		} catch(e) {}

		// style
		if (style) {
			this.$code.innerHTML += "\r\n\r\n/* Style */\r\n"+ style.join("\r\n");
		}

		hljs.highlightBlock(this.$code);

		return false;
	}
};
