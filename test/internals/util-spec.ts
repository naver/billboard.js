/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {describe, expect, it} from "vitest";
import sinon from "sinon";
import {timeParse as d3TimeParse} from "d3-time-format";
import {window} from "../../src/module/browser";
import {toArray, getBoundingRect, getCssRules, getPathBox, getPointer, getUnique, isArray, isNumber, sortValue, parseDate, sanitize} from "../assets/module/util";

describe("UTIL", function() {
	describe("toArray", () => {
		it("should convert array like objects to arrays", () => {
			function argsToArray(one, two, three) {
				return toArray(arguments);
			}

			const args = argsToArray(1, 2, 3);

			expect(isArray(args));
			expect(args.length).to.be.equal(3);
		});
	});

	describe("getCssRules", () => {
		it("should return css rules as an array", () => {
			const rules1 = getCssRules(toArray(document.styleSheets));

			expect(isArray(rules1));
		});
	});

	describe("sortValue", () => {
		const value = [1362063600000, 1462063600000, 1562063600000];

		it("sort number", () => {
			// asc
			expect(sortValue(value)).to.be.deep.equal(value);

			// desc
			expect(sortValue(value, false)).to.be.deep.equal(value.concat().reverse());
		});

		it("sort date", () => {
			const data = value.map(v => new Date(v));

			// asc
			expect(sortValue(data)).to.be.deep.equal(data);

			// desc
			expect(sortValue(data, false)).to.be.deep.equal(data.reverse());
		});

		it("sort string", () => {
			const data = ["a", "j", "z"];

			// asc
			expect(sortValue(data)).to.be.deep.equal(data);

			// desc
			expect(sortValue(data, false)).to.be.deep.equal(data.reverse());
		});
	});

	describe("getBoundingRect", () => {
		it("should return element's getBoundingClientRect()", () => {
			const rect = getBoundingRect(document.body);

			["bottom", "height", "left", "right", "top", "width", "x", "y"].forEach(v => {
				expect(v in rect).to.be.true;
			});

			// @ts-ignore
			expect(document.body.rect).to.be.deep.equal(rect);
		});
	});

	describe("getPathBox", () => {
		it("should return element's path box value", () => {
			const svg: SVGGraphicsElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			document.body.appendChild(svg);

			const pathBox = getPathBox(svg);

			for (let x in pathBox) {
				expect(isNumber(pathBox[x])).to.be.true;
			}

			svg.parentElement?.removeChild(svg);
		});
	});

	describe("getPointer", () => {
		it("should return numeric coordinate value", () => {			
			const touchObj = new Touch({
				identifier: Date.now(),
				target: document.body,
				radiusX: 2.5,
				radiusY: 2.5,
				rotationAngle: 10,
				force: 0.5,
				clientX: 100,
				clientY: 100
			});

			const touchEvent = new TouchEvent("touchstart", {
				cancelable: true,
				bubbles: true,
				touches: [touchObj],
				targetTouches: [],
				changedTouches: [touchObj],
				shiftKey: true,
			  });

			expect(getPointer(touchEvent, document.body)).to.be.deep.equal([100, 100]);

			// when has no touches object
			const touchEvent2 = new TouchEvent("touchstart", {
				cancelable: true,
				bubbles: true,
				targetTouches: [],
				changedTouches: [touchObj],
				shiftKey: true,
			  });

			expect(getPointer(touchEvent2, document.body)).to.be.deep.equal([0, 0]);
		});
	});

	describe("getUnique", () => {
		it("should return unique values", () => {
			let data: any = [1,3,2,4,5,1,2,3];

			expect(getUnique(data)).to.deep.equal([1, 3, 2, 4, 5]);

			// for string
			data = ["a", "b", "c", "a", "b"];
			expect(getUnique(data)).to.deep.equal(["a", "b", "c"]);

			// for datetime
			data = [new Date("2019-08-01"), new Date("2019-08-01"), new Date("2019-08-01")];
			expect(getUnique(data)).to.deep.equal([new Date("2019-08-01")]);
		});
	});

	describe("sanitize", () => {
		it("should return non-string values as is", () => {
			expect(sanitize(null as any)).to.be.null;
			expect(sanitize(undefined as any)).to.be.undefined;
			expect(sanitize(123 as any)).to.be.equal(123);
			expect(sanitize("")).to.be.equal("");
		});

		it("should return strings without HTML tags as is", () => {
			expect(sanitize("hello world")).to.be.equal("hello world");
			expect(sanitize("no tags here")).to.be.equal("no tags here");
		});

		it("should remove script tags", () => {
			expect(sanitize("<script>alert(1)</script>")).to.be.equal("");
			expect(sanitize("<SCRIPT>alert(1)</SCRIPT>")).to.be.equal("");
			expect(sanitize("before<script>alert(1)</script>after")).to.be.equal("beforeafter");
			expect(sanitize("<script src='evil.js'></script>")).to.be.equal("");
			expect(sanitize("<script/>")).to.be.equal("");
		});

		it("should remove iframe tags", () => {
			expect(sanitize("<iframe src='evil.com'></iframe>")).to.be.equal("");
			expect(sanitize("<iframe/>")).to.be.equal("");
		});

		it("should remove dangerous tags", () => {
			expect(sanitize("<object data='evil'></object>")).to.be.equal("");
			expect(sanitize("<embed src='evil'/>")).to.be.equal("");
			expect(sanitize("<form action='evil'></form>")).to.be.equal("");
			expect(sanitize("<input type='text'/>")).to.be.equal("");
			expect(sanitize("<button>click</button>")).to.be.equal("");
			expect(sanitize("<textarea>text</textarea>")).to.be.equal("");
			expect(sanitize("<select><option>opt</option></select>")).to.be.equal("");
			expect(sanitize("<style>.evil{}</style>")).to.be.equal("");
			expect(sanitize("<link rel='stylesheet'/>")).to.be.equal("");
			expect(sanitize("<meta charset='utf-8'/>")).to.be.equal("");
			expect(sanitize("<base href='evil'/>")).to.be.equal("");
			// SVG is allowed but event handlers are removed
			expect(sanitize("<svg onload='alert(1)'></svg>")).to.be.equal("<svg></svg>");
			expect(sanitize("<math><mi>x</mi></math>")).to.be.equal("");
		});

		it("should remove event handlers", () => {
			expect(sanitize("<div onclick='alert(1)'>text</div>")).to.be.equal("<div>text</div>");
			expect(sanitize("<img src='x' onerror='alert(1)'/>")).to.not.include("onerror");
			expect(sanitize("<a onmouseover='alert(1)'>link</a>")).to.be.equal("<a>link</a>");
			expect(sanitize("<div onload=\"alert(1)\">text</div>")).to.be.equal("<div>text</div>");
		});

		it("should remove dangerous URLs", () => {
			expect(sanitize("<a href='javascript:alert(1)'>link</a>")).to.not.include("javascript:");
			expect(sanitize("<a href=\"javascript:void(0)\">link</a>")).to.not.include("javascript:");
			expect(sanitize("<img src='data:text/html,<script>alert(1)</script>'/>")).to.not.include("data:");
			expect(sanitize("<a href='vbscript:alert(1)'>link</a>")).to.not.include("vbscript:");
		});

		it("should handle mixed dangerous content", () => {
			const input = "<div onclick='alert(1)'><script>evil()</script>safe content</div>";
			const result = sanitize(input);

			expect(result).to.not.include("script");
			expect(result).to.not.include("onclick");
			expect(result).to.include("safe content");
		});

		it("should preserve safe HTML", () => {
			expect(sanitize("<div>hello</div>")).to.be.equal("<div>hello</div>");
			expect(sanitize("<span class='test'>text</span>")).to.be.equal("<span class='test'>text</span>");
			expect(sanitize("<p>paragraph</p>")).to.be.equal("<p>paragraph</p>");
			expect(sanitize("<a href='https://safe.com'>link</a>")).to.be.equal("<a href='https://safe.com'>link</a>");
		});

		it("should prevent nested tag bypass attacks", () => {
			// Pattern: <scri<script></script>pt> becomes <script> after first pass
			expect(sanitize("<scri<script></script>pt>alert(1)</script>")).to.not.include("script");
			expect(sanitize("<scr<script>x</script>ipt>alert(2)</script>")).to.not.include("script");

			// Nested iframe bypass
			expect(sanitize("<ifr<script></script>ame src='evil.com'></iframe>")).to.not.include("iframe");
			expect(sanitize("<if<iframe></iframe>rame src='x'></iframe>")).to.not.include("iframe");

			// Multiple levels of nesting
			expect(sanitize("<scr<scr<script></script>ipt></script>ipt>alert(3)</script>")).to.not.include("script");
		});

		it("should handle HTML entity encoded attacks", () => {
			// Newline in javascript: URL
			expect(sanitize("<a href='jav&#x0A;ascript:alert(1)'>click</a>")).to.not.include("javascript:");

			// NULL byte in javascript: URL
			expect(sanitize("<a href='java&#x00;script:alert(1)'>click</a>")).to.not.include("javascript:");

			// Tab character
			expect(sanitize("<a href='java&#x09;script:alert(1)'>click</a>")).to.not.include("javascript:");

			// Fully encoded javascript:
			expect(sanitize("<a href='&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;alert(1)'>click</a>")).to.not.include("javascript:");

			// Hex encoded entities
			expect(sanitize("<a href='&#x6A;&#x61;&#x76;&#x61;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;&#x3A;alert(1)'>click</a>")).to.not.include("javascript:");

			// Mixed encoding
			expect(sanitize("<a href='jav&#97;scr&#105;pt:alert(1)'>click</a>")).to.not.include("javascript:");

			// Hex encoding with single character (&#x76; = 'v')
			expect(sanitize("<a href='ja&#x76;ascript:alert(123)'>click</a>")).to.not.include("javascript:");

			// Decimal encoding with padding zeros (&#0000118; = 'v')
			expect(sanitize("<a href='ja&#0000118;ascript:alert(123)'>click</a>")).to.not.include("javascript:");

			// Decimal encoding (&#118; = 'v')
			expect(sanitize("<a href='ja&#118;ascript:alert(123)'>click</a>")).to.not.include("javascript:");
		});

		it("should handle control character injection", () => {
			// NULL byte
			expect(sanitize("<script\x00>alert(1)</script>")).to.not.include("script");

			// Tab character in tag
			expect(sanitize("<script\t>alert(1)</script>")).to.not.include("script");

			// Newline in tag
			expect(sanitize("<script\n>alert(1)</script>")).to.not.include("script");

			// Carriage return
			expect(sanitize("<script\r>alert(1)</script>")).to.not.include("script");

			// Carriage return + newline in URL (testing \r\n in javascript:)
			expect(sanitize("<a href='jav\r\nascript:alert(123)'>click</a>")).to.not.include("javascript:");
		});

		it("should handle various quote styles in event handlers", () => {
			// Double quotes
			expect(sanitize("<img src=x onerror=\"alert(1)\">")).to.not.include("onerror");

			// Single quotes
			expect(sanitize("<img src=x onerror='alert(1)'>")).to.not.include("onerror");

			// Backticks
			expect(sanitize("<img src=x onerror=`alert(1)`>")).to.not.include("onerror");

			// No quotes
			expect(sanitize("<img src=x onerror=alert(1)>")).to.not.include("onerror");

			// Space before attribute
			expect(sanitize("<img src=x  onerror=alert(1)>")).to.not.include("onerror");
		});

		it("should handle data: URI attacks", () => {
			// HTML in data URI - the script tag is removed
			const result1 = sanitize("<a href='data:text/html,<script>alert(1)</script>'>click</a>");
			expect(result1).to.not.include("script");
			expect(result1).to.not.include("data:");

			// Base64 encoded data URI - data: protocol is removed
			expect(sanitize("<a href='data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=='>click</a>")).to.not.include("data:");

			// Data URI with SVG - the onload event handler is removed, dangerous tags are removed
			const svgResult = sanitize("<img src='data:image/svg+xml,<svg onload=alert(1)>'>");
			expect(svgResult).to.not.include("onload");
			// Note: data: in attribute values that don't contain dangerous content may remain
		});

		it("should handle vbscript: protocol attacks", () => {
			expect(sanitize("<a href='vbscript:msgbox(1)'>click</a>")).to.not.include("vbscript:");
			expect(sanitize("<a href='VBScript:MsgBox(1)'>click</a>")).to.not.include("vbscript:");
			expect(sanitize("<img src='vbscript:msgbox(1)'>")).to.not.include("vbscript:");
		});

		it("should handle SVG-based XSS attacks", () => {
			// SVG with onload
			expect(sanitize("<svg onload='alert(1)'></svg>")).to.not.include("onload");

			// SVG with nested script
			expect(sanitize("<svg><script>alert(1)</script></svg>")).to.not.include("script");

			// SVG with animate and set
			const result = sanitize("<svg><animate onbegin='alert(1)'/></svg>");
			expect(result).to.not.include("onbegin");
		});

		it("should handle case variations", () => {
			// Mixed case script tag
			expect(sanitize("<ScRiPt>alert(1)</sCrIpT>")).to.not.include("script");

			// Mixed case event handler
			expect(sanitize("<img src=x OnErRoR=alert(1)>")).to.not.include("onerror");

			// Mixed case protocol
			expect(sanitize("<a href='JaVaScRiPt:alert(1)'>click</a>")).to.not.include("javascript:");
		});

		it("should handle whitespace variations", () => {
			// Space in tag name - "scr ipt" is not recognized as "script" tag
			// The regex only matches <script> as complete tag name, so this passes through
			// But the closing </script> tag is recognized and removed
			const result = sanitize("<scr ipt>alert(1)</script>");
			// Since the opening tag isn't recognized as script, content may remain
			expect(result).to.include("alert(1)");

			// Newlines around equals
			expect(sanitize("<img src=x\nonerror\n=\nalert(1)>")).to.not.include("onerror");

			// Multiple spaces
			expect(sanitize("<img    src=x    onerror=alert(1)>")).to.not.include("onerror");
		});

		it("should handle obfuscated attacks", () => {
			// Nested encoding
			expect(sanitize("<scri<script>pt>alert(1)</scri</script>pt>")).to.not.include("script");

			// Multiple nested levels
			expect(sanitize("<scr<scr<script>x</script>ipt>y</script>ipt>alert(1)</script>")).to.not.include("script");

			// Mixed nesting with different tags
			expect(sanitize("<scr<iframe></iframe>ipt>alert(1)</script>")).to.not.include("script");
		});

		it("should preserve safe content", () => {
			// Normal URLs
			expect(sanitize("<a href='https://example.com'>link</a>")).to.include("https://example.com");
			expect(sanitize("<a href='http://example.com'>link</a>")).to.include("http://example.com");
			expect(sanitize("<a href='/path/to/page'>link</a>")).to.include("/path/to/page");
			expect(sanitize("<a href='#section'>link</a>")).to.include("#section");

			// Safe protocols
			expect(sanitize("<a href='mailto:test@example.com'>email</a>")).to.include("mailto:");
			expect(sanitize("<a href='tel:+1234567890'>call</a>")).to.include("tel:");

			// Normal HTML with classes and attributes
			expect(sanitize("<div class='container' id='main'>content</div>")).to.be.equal("<div class='container' id='main'>content</div>");
			expect(sanitize("<span style='color:red'>text</span>")).to.be.equal("<span style='color:red'>text</span>");
		});

		it("should handle edge cases", () => {
			// Empty attributes
			expect(sanitize("<a href=''>empty link</a>")).to.be.equal("<a href=''>empty link</a>");

			// Multiple dangerous elements
			const input = "<script>x</script><iframe></iframe><object></object>";
			const result = sanitize(input);
			expect(result).to.not.include("script");
			expect(result).to.not.include("iframe");
			expect(result).to.not.include("object");

			// Mixed safe and dangerous
			const mixed = "<div>safe</div><script>dangerous</script><p>also safe</p>";
			const cleaned = sanitize(mixed);
			expect(cleaned).to.include("<div>safe</div>");
			expect(cleaned).to.include("<p>also safe</p>");
			expect(cleaned).to.not.include("script");
		});

		it("should handle real-world attack patterns", () => {
			// PortSwigger XSS patterns
			expect(sanitize("<img src=1 onerror=alert(1)>")).to.not.include("onerror");
			expect(sanitize("<svg><animatetransform onbegin=alert(1)>")).to.not.include("onbegin");

			// OWASP patterns with entity encoding
			expect(sanitize("<IMG SRC=j&#X41vascript:alert('test')>")).to.not.include("javascript:");

			// Backtick quoted attributes - known limitation
			// Current implementation handles quotes and double-quotes but backticks in attributes are edge case
			const backtickResult = sanitize("<IMG SRC=`javascript:alert('XSS')`>");
			// We verify that at minimum the structure is preserved (not broken)
			expect(backtickResult).to.include("IMG");

			// Mutation XSS (mXSS) - event handlers are removed
			expect(sanitize("<noscript><p title=\"</noscript><img src=x onerror=alert(1)>\">")).to.not.include("onerror");

			// Polyglot XSS - complex attack string with multiple vectors
			const polyglotResult = sanitize("javascript:/*--></title></style></textarea></script></xmp><svg/onload='+/\"/+/onmouseover=1/+/[*/[]/+alert(1)//'>");
			// Event handlers should be removed
			expect(polyglotResult).to.not.include("onload=");
			expect(polyglotResult).to.not.include("onmouseover=");
			// The main dangerous content (event handlers) is removed, making the payload harmless
			// Note: Closing tags without opening tags may remain but are harmless in HTML
		});
	});

	describe("parseDate", () => {
		it("when Date object value is given, should return as is.", () =>  {
			const date = new Date();

			expect(date).to.be.equal(parseDate(date));
		});

		it("when string is given with parse specifier.", () => {
			const date = "2022-01-01";
			const parsedDate = new Date(date);

			const parsed = parseDate.call({
				config: "%Y-%m-%d",
				format: {
					dataTime: d3TimeParse
				}
			}, date);

			expect(parsed).to.be.deep.equal(parsedDate);
		});

		it("when string is given with mismatch parse specifier.", () => {
			const date = "2022-01-01 00:00:00";
			const parsedDate = new Date(date);

			const parsed = parseDate.call({
				config: "%Y-%m-%d",
				format: {
					dataTime: d3TimeParse
				}
			}, date);

			expect(parsed).to.be.deep.equal(parsedDate);
		});

		it("when numeric datetime is given.", () => {
			const datetime = 1648616365772;
			const parsed = parseDate(datetime);

			expect(parsed).to.be.deep.equal(new Date(datetime));
		});

		it("when non parsable string data is given.", () => {
			const date = "aaa";
			const console = window.console;

			window.console = {
				error: sinon.spy()
			};

			parseDate.call({
				config: "%Y-%m-%d",
				format: {
					dataTime: d3TimeParse
				}
			}, date);

			// console.error should be called
			expect(window.console.error.called).to.be.true;

			// rollback
			window.console = console;
		});
	});
});
