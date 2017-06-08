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
		}

		var type = demos[type][key];
		var func = type.func;
		var style = type.style;

		var options = type.options;
		options.bindto = "#" + key;

		var inst = bb.generate(options);
		inst.timer = [];
		this.chartInst.push(inst);

		this.$code.innerHTML = "var chart = bb.generate("+
			JSON.stringify(options, function(key, value) {
				if (typeof value === "function") {
					return value.toString();
				}

				return value;
			},2)
			.replace(/(\"function)/g, "function")
			.replace(/(}\")/g, "}")
			.replace(/\\"/g, "\"")
			.replace(/\\t/g, "\t")
			.replace(/\t{5}/g,"")
			.replace(/\\r/g, "\r")
			.replace(/\\n/g, "\n") +");";

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

		if (style) {
			this.$code.innerHTML += "\r\n\r\n/* Style */\r\n"+ style.join("\r\n");
		}

		hljs.highlightBlock(this.$code);

		return false;
	}
};
