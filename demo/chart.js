/* eslint-disable */
var billboardDemo = {
	replacer: {
		plugin: "__PLUGIN__"
	},
	/**
	 * Initializer
	 */
	init: function() {
		this.$wrapper = document.getElementById("wrapper");
		this.$chartArea = document.querySelector(".chart_area");
		this.$list = document.querySelector(".sidebar-nav");
		this.$title = document.getElementById("title");
		this.$description = document.getElementById("description");
		this.$codeArea = document.querySelector(".code");
		this.$code = document.querySelector("code");

		this.WIDTH = 768;
		this.selectedClass = "selected";

		this._bindEvents();
		this._createList();

		location.hash && this.showDemo(location.hash);
	},

	_bindEvents: function() {
		var $wrapper = this.$wrapper;
		var WIDTH = this.WIDTH;

		document.getElementById("menu-toggle").addEventListener("click", function(e) {
			$wrapper.className = $wrapper.className ? "" : "toggled";
			e.preventDefault();
		}, false);

		window.addEventListener("resize", function() {
			if (window.innerWidth > WIDTH) {
				$wrapper && ($wrapper.className = "");
			}
		});

		window.addEventListener("hashchange", (function() {
			this.showDemo(location.hash);
		}).bind(this));
	},

	/**
	 * Create left menu list
	 * @private
	 */
	_createList: function() {
		var html = [];

		Object.keys(demos).forEach(function(key) {
			html.push("<li><h4>" + key + "</h4>");

			Object.keys(demos[key]).sort().forEach(function (v, i) {
				i === 0 && html.push("<ul>");
				html.push("<li><a href='#"+ [key, v].join(".") + "'>" + v + "</a></li>");
			});

			html.push("</ul></li>");
		});

		this.$chartArea.querySelector(".item_count").innerHTML = (html.length - 2);
		this.$list.innerHTML = html.join("");
	},

	/**
	 * Click handler
	 * @param {String} type
	 */
	showDemo: function(type) {
		if (!type) {
			return;
		}

		// remove legend
		var $legend = document.querySelector(".legend");
		$legend && $legend.parentNode.removeChild($legend);

		if (window.innerWidth <= this.WIDTH) {
			this.$wrapper.className = "";
		}

		type = type.replace("#", "").split(".");

		this.generate(type[0], type[1]);

		this.$title.innerHTML = type[1]
			.replace(/([A-Z][a-z])/g, " $1")
			.replace(/([A-Z]+)/g, " $1");

		// set description
		this.$description.innerHTML = demos[type[0]][type[1]].description || "";
		this.$codeArea.style.display = "block";

		// remove selected class
		var $selected = this.$list.querySelector("[class="+ this.selectedClass +"]");
		$selected && ($selected.className = $selected.className.replace(this.selectedClass,""));

		// add selected class
		$selected = this.$list.querySelector("[href='#"+ type.join(".") +"']");
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
		var inst = bb.instance;
		var typeData = demos[type][key];
		var isArray = typeData && typeData.constructor === Array;
		var self = this;

		inst.length && inst.forEach(function (c) {
			var timer = c.timer;
			var el = c.element;

			try {
				timer && timer.forEach(function (v) {
					clearTimeout(v);
				});
			} finally {
				el.parentNode && el.parentNode.removeChild(el);
				c.destroy();
			}
		});

		var code = {
			markup: [],
			data: []
		};

		key = type +"."+ key;

		// generate chart
		isArray ? typeData.forEach(function(t, i) {
			self._addChartInstance(t, key, i + 1, code);
		}) : this._addChartInstance(typeData, key, undefined, code);

		this.$code.innerHTML = "";

		code.markup.forEach(function(t) { self.$code.innerHTML += t; });
		code.data.forEach(function(t) { self.$code.innerHTML += t; });

		this.$code.scrollTop = 0;

		hljs.highlightBlock(this.$code);

		return false;
	},

	getLowerFirstCase: function(str) {
		return /^(JSON)/.test(str) ?
			str : str.charAt(0).toLowerCase() + str.slice(1);
	},

	getReplaced: function(str) {
		return str.replace(/\"?(function|})\"?/g, "$1")
			.replace(/\\"/g, "\"")
			.replace(/</g, "&lt;")
			.replace(/\\t/g, "\t")
			.replace(/\t{5}/g, "")
			.replace(/\\r/g, "\r")
			.replace(/"(\w+)":/g, "$1:");
	},

	getPluginsCodeStr: function(val) {
		var key = this.replacer.plugin;
		var plugins = key;

		val.forEach(function(p) {
			Object.keys(p).forEach(function(key) {
				plugins += "new bb.plugin."+ key +"(";
				plugins += JSON.stringify(p[key], function(k, v) {
					return typeof v === "function" ? v.toString() : v;
				}, 5).replace(/\\n/g, "\n").replace(/}$/, "    }");
				plugins += "),";
			})
		});

		
		return this.getReplaced(plugins) + key;
	},

	getCodeStr: function(options, key, index) {
		var self = this;

		var codeStr = "var chart"+ (index > 1 ? index : "") +" = bb.generate(" +
			this.getReplaced(JSON.stringify(options, function(k, v) {
				if (typeof v === "function") {
					return v.toString().replace(/\t+}$/, Array(/(format|data)/.test(k) ? 8 : 4).join(" ") + "}");
				} else if (/(columns|rows|json)/.test(k)) {
					var str = JSON.stringify(v)
						.replace(/\[\[/g, "[\r\n\t[")
						.replace(/\]\]/g, "]\r\n    ]")
						.replace(/(],)/g, "$1\r\n\t")
						.replace(/(\"|\d),/g, "$1, ");

					return k === "json" ?
						str.replace(/{/, "{\r\n\t").replace(/}/, "\r\n    }") : str;
				} else if (k === "_plugins") {
					return [self.getPluginsCodeStr(v)];
				}

				return v;
			}, 2))
			.replace("_plugins", "plugins")
			.replace(new RegExp('"?'+ this.replacer.plugin +'"?', "g"), "");

			if (/multiline/i.test(options.bindto)) {
				codeStr = codeStr.replace(/\\n(?=(\t|\s+))/g, "")
					.replace(/\\\\n(?=[a-zA-Z0-9])/g, "\\n");
			} else {
				codeStr = codeStr.replace(/\\n(?!T)/g, "\n")
					.replace(/\\(u)/g, "\$1");
			}

			codeStr += ");";

		return codeStr;
	},

	_addChartInstance: function(type, typeKey, index, code) {
		typeKey = typeKey.split(".");

		var key = this.getLowerFirstCase(typeKey[1]);

		if (index) {
			key += "_"+ index;
		}

		var $el = document.getElementById(key);
		var template;
		var plugins;

		if (!$el) {
			$el = document.createElement("div");
			$el.id = key;

			if ((index && index === 1) || !index) {
				this.$chartArea.innerHTML = "";
			}

			this.$chartArea.appendChild($el);

			if (/^(legend|tooltip)Template/.test(key)) {
				template = document.createElement("div");
				template.id = this.getLowerFirstCase(RegExp.$1);
				template.style.textAlign = "center";

				this.$chartArea.appendChild(template);
				template = "&lt;div id=\""+ template.id +"\">&lt;/div>";
			} else if (typeKey[0] === "Plugins") {
				type.options._plugins.forEach(function(v) {
					plugins = Object.keys(v).map(function(p) {
						return new bb.plugin[p](v[p]);
					});
				});
			}
		}

		var func = type.func;
		var style = type.style;
		var options = type.options;

		options.bindto = "#" + key;

		if (plugins) {
			options.plugins = plugins;
		}

		var inst = bb.generate(options, key, index);

		delete options.plugins;
		inst.timer = [];

		var codeStr = this.getCodeStr(options);

		// markup
		if ((index && index === 1) || !index) {
			code.markup.push("&lt;!-- Markup -->\r\n&lt;div id=\"" + key + "\">&lt;/div>\r\n" + (template ? template + "\r\n" : "") + "\r\n");
		} else if (index && index > 1) {
			code.markup.push("&lt;div id=\"" + key + "\">&lt;/div>\r\n" + (template ? template + "\r\n" : "") + "\r\n");
		}

		if (index && index > 1) {
			code.data.push("\r\n\r\n");
		}

		// script this.$code.innerHTML
		code.data.push("// Script\r\n" + codeStr.replace(/"(\[|{)/, "$1").replace(/(\]|})"/, "$1"));

		try {
			if (func) {
				code.data.push("\r\n\r\n" + func.toString()
					.replace(/[\t\s]*function\s*\(chart\) \{[\r\n\t\s]*/, "")
					.replace(/}$/, "")
					.replace(/chart.timer = \[[\r\n\t\s]*/, "")
					.replace(/\t{5}/g, "")
					.replace(/[\r\n\t\s]*\];?[\r\n\t\s]*$/, "")
					.replace(/(\d)\),?/g, "$1);"));

				func(inst);
			}
		} catch(e) {}

		// style
		if (style) {
			code.data.push("\r\n\r\n/* Style */\r\n" + style.join("\r\n"));
		}
	}
};
