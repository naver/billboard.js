/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {describe, expect, it} from "vitest";
import {sanitize} from "../assets/module/util";

describe("UTIL: sanitize", () => {
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

	it("should escape script tags", () => {
		expect(sanitize("<script>alert(1)</script>")).to.not.include("<script");
		expect(sanitize("<SCRIPT>alert(1)</SCRIPT>")).to.not.include("<script");
		expect(sanitize("before<script>alert(1)</script>after")).to.include("before");
		expect(sanitize("before<script>alert(1)</script>after")).to.include("after");
		expect(sanitize("<script src='evil.js'></script>")).to.not.include("<script");
		expect(sanitize("<script/>")).to.not.include("<script");
	});

	it("should escape iframe tags", () => {
		expect(sanitize("<iframe src='evil.com'></iframe>")).to.not.include("<iframe");
		expect(sanitize("<iframe/>")).to.not.include("<iframe");
	});

	it("should escape dangerous tags", () => {
		expect(sanitize("<object data='evil'></object>")).to.not.include("<object");
		expect(sanitize("<embed src='evil'/>")).to.not.include("<embed");
		expect(sanitize("<form action='evil'></form>")).to.not.include("<form");
		expect(sanitize("<input type='text'/>")).to.not.include("<input");
		expect(sanitize("<button>click</button>")).to.not.include("<button");
		expect(sanitize("<textarea>text</textarea>")).to.not.include("<textarea");
		expect(sanitize("<select><option>opt</option></select>")).to.not.include("<select");
		expect(sanitize("<style>.evil{}</style>")).to.not.include("<style");
		expect(sanitize("<link rel='stylesheet'/>")).to.not.include("<link");
		expect(sanitize("<meta charset='utf-8'/>")).to.not.include("<meta");
		expect(sanitize("<base href='evil'/>")).to.not.include("<base");
		// SVG is allowed but event handlers are removed
		expect(sanitize("<svg onload='alert(1)'></svg>")).to.be.equal("<svg></svg>");
		expect(sanitize("<math><mi>x</mi></math>")).to.not.include("<math");
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

	it("should block HTML entity bypass attacks in URLs", () => {
		// Named entity bypass: &colon; for ":"
		expect(sanitize("<a href='javascript&colon;alert(1)'>click</a>")).to.not.include("href");

		// Named entity bypass: &NewLine; for newline character
		expect(sanitize("<a href='java&NewLine;script:alert(1)'>click</a>")).to.not.include("href");

		// Named entity bypass: &Tab; for tab character
		expect(sanitize("<a href='java&Tab;script:alert(1)'>click</a>")).to.not.include("href");

		// Numeric entity bypass: &#58; for ":"
		expect(sanitize("<a href='javascript&#58;alert(1)'>click</a>")).to.not.include("href");

		// Hex entity bypass: &#x3a; for ":"
		expect(sanitize("<a href='javascript&#x3a;alert(1)'>click</a>")).to.not.include("href");

		// Mixed case entity bypass
		expect(sanitize("<a href='javascript&COLON;alert(1)'>click</a>")).to.not.include("href");
	});

	it("should handle mixed dangerous content", () => {
		const input = "<div onclick='alert(1)'><script>evil()</script>safe content</div>";
		const result = sanitize(input);

		expect(result).to.not.include("<script");
		expect(result).to.not.include("onclick");
		expect(result).to.include("safe content");
	});

	it("should preserve safe HTML", () => {
		expect(sanitize("<div>hello</div>")).to.be.equal("<div>hello</div>");
		expect(sanitize("<span class='test'>text</span>")).to.be.equal("<span class='test'>text</span>");
		expect(sanitize("<p>paragraph</p>")).to.be.equal("<p>paragraph</p>");
		expect(sanitize("<a href='https://safe.com'>link</a>")).to.be.equal("<a href='https://safe.com'>link</a>");
	});

	it("should allow inline text formatting tags", () => {
		expect(sanitize("<b>bold</b>")).to.be.equal("<b>bold</b>");
		expect(sanitize("<i>italic</i>")).to.be.equal("<i>italic</i>");
		expect(sanitize("<em>emphasis</em>")).to.be.equal("<em>emphasis</em>");
		expect(sanitize("<small>fine print</small>")).to.be.equal("<small>fine print</small>");
		expect(sanitize("<strong>strong</strong>")).to.be.equal("<strong>strong</strong>");
		expect(sanitize("<u>underline</u>")).to.be.equal("<u>underline</u>");
		expect(sanitize("<s>strikethrough</s>")).to.be.equal("<s>strikethrough</s>");
		expect(sanitize("<sub>subscript</sub>")).to.be.equal("<sub>subscript</sub>");
		expect(sanitize("<sup>superscript</sup>")).to.be.equal("<sup>superscript</sup>");
	});

	it("should allow heading tags h1-h6", () => {
		expect(sanitize("<h1>Title</h1>")).to.be.equal("<h1>Title</h1>");
		expect(sanitize("<h2>Subtitle</h2>")).to.be.equal("<h2>Subtitle</h2>");
		expect(sanitize("<h3>Section</h3>")).to.be.equal("<h3>Section</h3>");
		expect(sanitize("<h4>Subsection</h4>")).to.be.equal("<h4>Subsection</h4>");
		expect(sanitize("<h5>Minor</h5>")).to.be.equal("<h5>Minor</h5>");
		expect(sanitize("<h6>Smallest</h6>")).to.be.equal("<h6>Smallest</h6>");
		expect(sanitize("<h2 class='tooltip-title'>Data</h2>")).to.be.equal("<h2 class='tooltip-title'>Data</h2>");
	});

	it("should allow list tags", () => {
		expect(sanitize("<ul><li>item</li></ul>")).to.be.equal("<ul><li>item</li></ul>");
		expect(sanitize("<ol><li>item</li></ol>")).to.be.equal("<ol><li>item</li></ol>");
		expect(sanitize("<dl><dt>term</dt><dd>definition</dd></dl>"))
			.to.be.equal("<dl><dt>term</dt><dd>definition</dd></dl>");
	});

	it("should allow table tags", () => {
		expect(sanitize("<table><thead><tr><th>Header</th></tr></thead></table>"))
			.to.be.equal("<table><thead><tr><th>Header</th></tr></thead></table>");
		expect(sanitize("<table><tbody><tr><td>Cell</td></tr></tbody></table>"))
			.to.be.equal("<table><tbody><tr><td>Cell</td></tr></tbody></table>");
		expect(sanitize("<table><tfoot><tr><td>Footer</td></tr></tfoot></table>"))
			.to.be.equal("<table><tfoot><tr><td>Footer</td></tr></tfoot></table>");
		expect(sanitize("<table><caption>Title</caption></table>"))
			.to.be.equal("<table><caption>Title</caption></table>");
		expect(sanitize("<table><colgroup><col/></colgroup></table>"))
			.to.be.equal("<table><colgroup><col/></colgroup></table>");
		expect(sanitize("<th colspan='2' rowspan='2'>Cell</th>"))
			.to.be.equal("<th colspan='2' rowspan='2'>Cell</th>");
	});

	it("should allow block-level tags", () => {
		expect(sanitize("<br/>")).to.be.equal("<br/>");
		expect(sanitize("<hr/>")).to.be.equal("<hr/>");
		expect(sanitize("<pre>preformatted</pre>")).to.be.equal("<pre>preformatted</pre>");
		expect(sanitize("<code>inline code</code>")).to.be.equal("<code>inline code</code>");
		expect(sanitize("<blockquote>quote</blockquote>")).to.be.equal("<blockquote>quote</blockquote>");
	});

	it("should allow img tag with safe attributes", () => {
		expect(sanitize("<img src='chart.png' alt='chart'/>"))
			.to.be.equal("<img src='chart.png' alt='chart'/>");
		expect(sanitize("<img src='https://example.com/img.png' width='100' height='50'/>"))
			.to.be.equal("<img src='https://example.com/img.png' width='100' height='50'/>");
	});

	it("should allow figure and figcaption tags", () => {
		expect(sanitize("<figure><img src='chart.png' alt='chart'/><figcaption>Figure 1</figcaption></figure>"))
			.to.be.equal("<figure><img src='chart.png' alt='chart'/><figcaption>Figure 1</figcaption></figure>");
		expect(sanitize("<figure class='chart-figure'><figcaption>Caption</figcaption></figure>"))
			.to.be.equal("<figure class='chart-figure'><figcaption>Caption</figcaption></figure>");
	});

	it("should allow SVG tags", () => {
		expect(sanitize("<svg><circle cx='50' cy='50' r='40'/></svg>"))
			.to.be.equal("<svg><circle cx='50' cy='50' r='40'/></svg>");
		expect(sanitize("<svg><rect x='10' y='10' width='80' height='80'/></svg>"))
			.to.be.equal("<svg><rect x='10' y='10' width='80' height='80'/></svg>");
		expect(sanitize("<svg><ellipse cx='50' cy='50' rx='40' ry='20'/></svg>"))
			.to.be.equal("<svg><ellipse cx='50' cy='50' rx='40' ry='20'/></svg>");
		expect(sanitize("<svg><line x1='0' y1='0' x2='100' y2='100'/></svg>"))
			.to.be.equal("<svg><line x1='0' y1='0' x2='100' y2='100'/></svg>");
		expect(sanitize("<svg><polyline points='0,0 50,50 100,0'/></svg>"))
			.to.be.equal("<svg><polyline points='0,0 50,50 100,0'/></svg>");
		expect(sanitize("<svg><polygon points='0,0 50,50 100,0'/></svg>"))
			.to.be.equal("<svg><polygon points='0,0 50,50 100,0'/></svg>");
		expect(sanitize("<svg><path d='M0 0 L100 100'/></svg>"))
			.to.be.equal("<svg><path d='M0 0 L100 100'/></svg>");
		expect(sanitize("<svg><g transform='translate(10,10)'><rect x='0' y='0' width='10' height='10'/></g></svg>"))
			.to.be.equal("<svg><g transform='translate(10,10)'><rect x='0' y='0' width='10' height='10'/></g></svg>");
	});

	it("should allow SVG text and referencing tags", () => {
		expect(sanitize("<svg><text x='10' y='20'>Label</text></svg>"))
			.to.be.equal("<svg><text x='10' y='20'>Label</text></svg>");
		expect(sanitize("<svg><text><tspan dx='5'>offset</tspan></text></svg>"))
			.to.be.equal("<svg><text><tspan dx='5'>offset</tspan></text></svg>");
		expect(sanitize("<svg><defs><symbol id='icon'></symbol></defs><use xlink:href='#icon'/></svg>"))
			.to.be.equal("<svg><defs><symbol id='icon'></symbol></defs><use xlink:href='#icon'/></svg>");
		expect(sanitize("<svg><title>Chart</title><desc>Description</desc></svg>"))
			.to.be.equal("<svg><title>Chart</title><desc>Description</desc></svg>");
	});

	it("should allow SVG pattern, stop, and mask tags", () => {
		expect(sanitize("<svg><defs><pattern id='p1'></pattern></defs></svg>"))
			.to.be.equal("<svg><defs><pattern id='p1'></pattern></defs></svg>");
		expect(sanitize("<svg><defs><stop offset='0%' stop-color='red'/></defs></svg>"))
			.to.be.equal("<svg><defs><stop offset='0%' stop-color='red'/></defs></svg>");
		expect(sanitize("<svg><defs><mask id='m1'><rect x='0' y='0' width='100' height='100'/></mask></defs></svg>"))
			.to.be.equal("<svg><defs><mask id='m1'><rect x='0' y='0' width='100' height='100'/></mask></defs></svg>");
		expect(sanitize("<svg><defs><marker id='arrow'></marker></defs></svg>"))
			.to.be.equal("<svg><defs><marker id='arrow'></marker></defs></svg>");
	});

	it("should allow camelCase SVG tags with canonical casing", () => {
		expect(sanitize("<linearGradient id='g1'></linearGradient>"))
			.to.be.equal("<linearGradient id='g1'></linearGradient>");
		expect(sanitize("<radialGradient id='g2'></radialGradient>"))
			.to.be.equal("<radialGradient id='g2'></radialGradient>");
		expect(sanitize("<clipPath id='c1'></clipPath>"))
			.to.be.equal("<clipPath id='c1'></clipPath>");
		expect(sanitize("<textPath xlink:href='#p'></textPath>"))
			.to.be.equal("<textPath xlink:href='#p'></textPath>");
	});

	it("should allow camelCase SVG attributes with canonical casing", () => {
		expect(sanitize("<svg viewBox='0 0 100 100'></svg>"))
			.to.be.equal("<svg viewBox='0 0 100 100'></svg>");
		expect(sanitize("<svg preserveAspectRatio='xMidYMid meet'></svg>"))
			.to.be.equal("<svg preserveAspectRatio='xMidYMid meet'></svg>");
		expect(sanitize("<linearGradient gradientUnits='userSpaceOnUse'></linearGradient>"))
			.to.be.equal("<linearGradient gradientUnits='userSpaceOnUse'></linearGradient>");
	});

	it("should normalize HTML tags to lowercase regardless of input casing", () => {
		expect(sanitize("<DIV>text</DIV>")).to.be.equal("<div>text</div>");
		expect(sanitize("<SPAN class='x'>text</SPAN>")).to.be.equal("<span class='x'>text</span>");
		expect(sanitize("<Div>text</Div>")).to.be.equal("<div>text</div>");
	});

	it("should prevent nested tag bypass attacks", () => {
		// Escape approach prevents nested attacks by escaping '<'
		// After sanitization, no executable <script> tags remain
		expect(sanitize("<scri<script></script>pt>alert(1)</script>")).to.not.include("<script");
		expect(sanitize("<scr<script>x</script>ipt>alert(2)</script>")).to.not.include("<script");

		// Nested iframe bypass
		expect(sanitize("<ifr<script></script>ame src='evil.com'></iframe>")).to.not.include("<iframe");
		expect(sanitize("<if<iframe></iframe>rame src='x'></iframe>")).to.not.include("<iframe");

		// Multiple levels of nesting
		expect(sanitize("<scr<scr<script></script>ipt></script>ipt>alert(3)</script>")).to.not.include("<script");
	});

	it("should prevent attribute injection via unquoted values with special characters", () => {
		// Unquoted attribute value with double quote - should encode the quote
		// This prevents the browser from interpreting onerror as a separate attribute
		const result1 = sanitize('<img src=x"onerror=alert(1);>');
		expect(result1).to.include("&quot;");
		// The output should NOT have onerror as a separate attribute (outside quotes)
		expect(result1).to.not.match(/\sonerror\s*=/);

		// Unquoted attribute value with single quote injection
		const result2 = sanitize("<img src=x'onerror=alert(1);>");
		expect(result2).to.include("&#39;");
		expect(result2).to.not.match(/\sonerror\s*=/);

		// Unquoted attribute value with backtick injection
		const result3 = sanitize("<img src=x`onerror=alert(1);>");
		expect(result3).to.include("&#96;");
		expect(result3).to.not.match(/\sonerror\s*=/);

		// Multiple special characters in unquoted value
		const result4 = sanitize('<a href=x"onclick=alert(1)">link</a>');
		expect(result4).to.include("&quot;");
		expect(result4).to.not.match(/\sonclick\s*=/);

		// Simple unquoted value with trailing quote - should encode
		const result5 = sanitize('<img src=x">');
		expect(result5).to.include("&quot;");
		expect(result5).to.be.equal('<img src="x&quot;">');

		// Properly quoted values should not be affected
		const result6 = sanitize('<img src="x" alt="test">');
		expect(result6).to.be.equal('<img src="x" alt="test">');

		const result7 = sanitize("<img src='x' alt='test'>");
		expect(result7).to.be.equal("<img src='x' alt='test'>");
	});
});
