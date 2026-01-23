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
