/* eslint-disable */
var billboardDemo = {
	replacer: {
		plugin: "__PLUGIN__"
	},
	timer: {
		code: null,
		btn: null
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

		this.$html = document.querySelector("code.html");
		this.$code = document.querySelector("code.javascript");
		this.$button = this.$codeArea.querySelector("button");

		this.WIDTH = 768;
		this.selectedClass = "selected";

		this._bindEvents();
		this._createList();

		location.hash && this.showDemo(location.hash);
	},

	_bindEvents: function() {
		var $wrapper = this.$wrapper;
		var WIDTH = this.WIDTH;
		var ctx = this;

		document.getElementById("menu-toggle").addEventListener("click", function(e) {
			$wrapper.className = $wrapper.className ? "" : "toggled";
			e.preventDefault();
		}, false);

		this.$button.addEventListener("click", function(e) {
			var pos = document.documentElement.scrollTop;

			ctx.copyToClipboard();
			document.documentElement.scrollTop = pos;
		});

		window.addEventListener("resize", function() {
			if (window.innerWidth > WIDTH) {
				$wrapper && ($wrapper.className = "");
			}
		});

		window.addEventListener("hashchange", function() {
			ctx.showDemo(location.hash);
		});

		this.$code.addEventListener("keydown", function(e) {
			if (/^(9|13|3[27-9]|40)$/.test(e.keyCode)) {
				if (e.keyCode === 9) {
					document.execCommand("insertHTML", false, "&#009");
					e.preventDefault();
				}

				return;
			}

			ctx.timer.code && clearTimeout(ctx.timer.code);
			ctx.timer.code = setTimeout(function() {
				try {
					eval(e.target.textContent);
				} catch(e) {}
			}, 700);
		}, false);

		this.$code.addEventListener("focus", function(e) {
			e.target.classList.add("focus");
		});

		this.$code.addEventListener("blur", function(e) {
			e.target.classList.remove("focus");
		});
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

		this.$html.innerHTML = "";
		this.$code.innerHTML = "";

		code.markup.forEach(function(t) { self.$html.innerHTML += t; });
		code.data.forEach(function(t) { self.$code.innerHTML += t; });

		this.$code.scrollTop = 0;

		hljs.highlightBlock(this.$html);
		hljs.highlightBlock(this.$code);

		return false;
	},
	copyToClipboard: function() {
		var text = this.$code.textContent;
		var errMsg = false;
		var ctx = this;

		if (navigator.clipboard) {
			navigator.clipboard.writeText(text)
				.then(function() {
					ctx.showCopyMsg();
				}, function(e) {
					console.error("An error occured:", errMsg);
				});
		} else {
			var textArea = document.createElement("textarea");

			textArea.value = text;
			textArea.style.cssText = "width:0;height:0";
			document.body.appendChild(textArea);

			textArea.focus();

			if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
				var editable = textArea.contentEditable;
				var readOnly = textArea.readOnly;

				textArea.contentEditable = true;
				textArea.readOnly = true;

				var range = document.createRange();
				range.selectNodeContents(textArea);

				var selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				textArea.setSelectionRange(0, 999999);

				textArea.contentEditable = editable;
				textArea.readOnly = readOnly;
			} else {
				textArea.select();
			}

			try {
				document.execCommand("copy");
				ctx.showCopyMsg();
			} catch (e) {
				console.error("An error occured:", errMsg);
			}

			document.body.removeChild(textArea);
		}
	},
	showCopyMsg: function() {
		if (this.timer.btn) {
			return;
		}

		var btn = this.$button;
		var ctx = this;
		var origText = btn.innerHTML;

		btn.innerHTML = "Copied!";

		this.timer.btn = setTimeout(function() {
			btn.innerHTML = origText;
			ctx.timer.btn = null;
		}, 1000);
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

	getCodeStr: function(options, index) {
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

		var inst = bb.generate(options);

		delete options.plugins;
		inst.timer = [];

		var codeStr = this.getCodeStr(options, index);

		// markup
		if ((index && index === 1) || !index) {
			code.markup.push("&lt;!-- Markup -->\r\n&lt;div id=\"" + key + "\">&lt;/div>\r\n" + (template ? template + "\r\n" : ""));
		} else if (index && index > 1) {
			code.markup.push("&lt;div id=\"" + key + "\">&lt;/div>\r\n" + (template ? template + "\r\n" : ""));
		}

		if (index && index > 1) {
			code.data.push("\r\n\r\n");
		}

		// script this.$code.innerHTML
		code.data.push(codeStr.replace(/"(\[|{)/, "$1").replace(/(\]|})"/, "$1"));

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
			code.markup.unshift("&lt;style>\r\n"+ style.join("\r\n") +"\r\n&lt;/style>\r\n\r\n");
		}
	}
};
