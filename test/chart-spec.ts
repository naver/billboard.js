/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {expect} from "chai";
import {extend} from "../src/module/util";

import Chart from "../src/Chart/Chart";

describe("Chart", () => {
	it("should bind correctly with nullish properties", () => {
		const options = {
			data: {
				columns: [["data1", 0]]
			}
		};

		class Extended extends Chart {
			nullProperty;
			voidProperty;
		}

		extend(Chart.prototype, {
			nullProperty: null,
			voidProperty: undefined
		});

		const extendedInstance = new Chart(options);

		expect((extendedInstance as Extended).nullProperty).to.be.a("null");

		expect((extendedInstance as Extended).voidProperty).to.be.an("undefined");
	});
});
