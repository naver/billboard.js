/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {act, createElement, createRef} from "react";
import {createRoot, type Root} from "react-dom/client";
import {afterEach, describe, expect, it, vi} from "vitest";
import canvasBb, {canvas as canvasModule, line as canvasLine} from "../../src/index.canvas";
import Chart, {Chart as NamedChart, type IChart, type IProp} from "../../src/react";

type GeneratedOptions = IProp["options"] & {
	bindto?: Element | null;
};

type MountedChart = {
	container: HTMLDivElement;
	host: HTMLDivElement;
	root: Root;
	unmount: () => Promise<void>;
};

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const mountedCharts = new Set<MountedChart>();

function createBillboardMock() {
	const chart = {
		destroy: vi.fn()
	};
	const bb = {
		generate: vi.fn((options: GeneratedOptions) => {
			return chart;
		})
	};

	return {bb, chart};
}

async function mountChart(props: IProp): Promise<MountedChart> {
	const host = document.createElement("div");
	const root = createRoot(host);

	document.body.appendChild(host);

	await act(async () => {
		root.render(createElement(Chart, props));
	});

	const mounted = {
		container: host.firstElementChild as HTMLDivElement,
		host,
		root,
		async unmount() {
			await act(async () => {
				root.unmount();
			});
			host.remove();
			mountedCharts.delete(mounted);
		}
	};

	mountedCharts.add(mounted);

	return mounted;
}

afterEach(async () => {
	for (const mounted of [...mountedCharts]) {
		await mounted.unmount();
	}
	vi.restoreAllMocks();
});

describe("React wrapper", () => {
	it("exports the named and default component", () => {
		expect(NamedChart).to.equal(Chart);
	});

	it("generates a chart with resolved type and registered modules", async () => {
		const {bb, chart} = createBillboardMock();
		const registerModule = vi.fn(() => true);
		const options = {
			data: {
				columns: [["data1", 30, 120]],
				type: "line"
			}
		} as IProp["options"];
		const ref = createRef<IChart>();

		const mounted = await mountChart({
			bb: bb as unknown as IProp["bb"],
			className: "react-chart",
			modules: [registerModule],
			options,
			ref,
			style: {height: "120px"},
			type: () => "bar"
		} as IProp & {ref: typeof ref});
		const generatedOptions = bb.generate.mock.calls[0][0];

		expect(registerModule).toHaveBeenCalledTimes(1);
		expect(registerModule.mock.invocationCallOrder[0]).to.be.lessThan(
			bb.generate.mock.invocationCallOrder[0]
		);
		expect(bb.generate).toHaveBeenCalledTimes(1);
		expect(generatedOptions).not.to.equal(options);
		expect(generatedOptions.data).not.to.equal(options.data);
		expect(generatedOptions.data?.type).to.equal("bar");
		expect(generatedOptions.bindto).to.equal(mounted.container);
		expect(mounted.container.className).to.equal("react-chart");
		expect(mounted.container.style.height).to.equal("120px");
		expect(ref.current?.instance).to.equal(chart);

		await mounted.unmount();

		expect(chart.destroy).toHaveBeenCalledTimes(1);
	});

	it("keeps the configured chart type when the type prop is omitted", async () => {
		const {bb} = createBillboardMock();
		const options = {
			data: {
				columns: [["data1", 30, 120]],
				type: "area"
			}
		} as IProp["options"];

		await mountChart({
			bb: bb as unknown as IProp["bb"],
			options
		});

		expect(bb.generate.mock.calls[0][0].data?.type).to.equal("area");
	});

	it("renders a canvas chart when the canvas module is registered", async () => {
		const ref = createRef<IChart>();

		const mounted = await mountChart({
			bb: canvasBb as unknown as IProp["bb"],
			modules: [canvasModule as NonNullable<IProp["modules"]>[number]],
			options: {
				render: {
					mode: "canvas"
				},
				size: {
					width: 320,
					height: 180
				},
				transition: {
					duration: 0
				},
				data: {
					columns: [["data1", 30, 120, 80]]
				}
			},
			ref,
			style: {
				width: "320px",
				height: "180px"
			},
			type: canvasLine as IProp["type"]
		} as IProp & {ref: typeof ref});
		const canvas = mounted.container.querySelector("canvas");

		expect(canvas).not.to.be.null;
		expect(mounted.container.querySelector("svg")).to.be.null;
		expect(canvas?.style.width).to.equal("320px");
		expect(canvas?.style.height).not.to.equal("");
		expect(canvas?.width).to.be.greaterThan(0);
		expect(canvas?.height).to.be.greaterThan(0);
		expect(ref.current?.instance).not.to.be.undefined;
	});

	it("warns and skips generation when required props are missing", async () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const {bb} = createBillboardMock();

		await mountChart({
			bb: undefined,
			options: undefined
		} as unknown as IProp);

		expect(warn).toHaveBeenCalledWith("Required props('bb' or 'options') are not defined.");
		expect(bb.generate).not.toHaveBeenCalled();
	});
});
