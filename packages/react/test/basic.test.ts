/* eslint-disable */
import {afterAll, beforeAll, describe, test} from "vitest";
import {preview} from "vite";
import type {PreviewServer} from "vite";
import {chromium} from "playwright";
import type {Browser, Page} from "playwright";
import {expect} from "@playwright/test";

describe("basic", async () => {
	let server: PreviewServer;
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		server = await preview({
			preview: {
				port: 3000,
				open: false
			}
		});

		browser = await chromium.launch();
		page = await browser.newPage();
		
		await page.goto("http://localhost:3000");
	});

	afterAll(async () => {
		await browser.close();
		await new Promise<void>((resolve, reject) => {
			server.httpServer
				.close(error => error ? reject(error) : resolve());
		});
	});

	test("should generate chart correctly.", async () => {
		const elements = await page.evaluate(() => document.querySelectorAll(".bb").length);

		// @ts-ignore
		const instances = await page.evaluate(() => window.charts);

		expect(elements).toEqual(2);
		expect(instances.length).toEqual(2);

		const legendText = await page.locator(".bb .bb-legend-item-data4 text");

		await expect(legendText).toHaveText("data4");
	});

	test("should charts lengend be interactable.", async () => {
		await page.locator('text=data1data4 >> rect').first().click();

		// Click text=data1data4 >> rect >> nth=1
		await page.locator('text=data1data4 >> rect').nth(1).click();
		// Click text=data1data2 >> rect >> nth=0
		await page.locator('text=data1data2 >> rect').first().click();
		// Click text=data1data2 >> rect >> nth=1
		await page.locator('text=data1data2 >> rect').nth(1).click();
	});
});
