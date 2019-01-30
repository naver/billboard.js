/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";

describe("API export", () => {
	let chart;
	let args = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 5000, 2000, 1000, 4000, 1500, 2500]
			],
			types: {
				data1: "bar",
				data2: "area"
			}
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	it("should invoke a callback when ready", done => {
		function exportCallback(dataUrl) {
			expect(dataUrl).to.not.be.equal("");
			done();
		}

		expect(/^data:image\/svg\+xml;base64,.+/.test(chart.export())).to.be.true;
		chart.export("image/png", exportCallback);
	});

	it("should export chart as image/png", done => {
		function exportCallback(dataUrl) {
			const link = document.createElement("link");

			link.download = `${Date.now}.png`;
			link.href = dataUrl;
			expect(link.getAttribute("href").length).to.be.not.equal(0);

			done();
		}

		chart.export("image/png", exportCallback);
	});

	it("set options", () => {
		args = {
			size: {
				width: 35,
				height: 35
			},
			data: {
				columns: [
					["data1", 2]
				]
			},
			point: {
				pattern: [
				"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10' style='fill:#fff'></rect></g>"
				]
			},
			axis: {
				x: {
					show: false,
					padding: {
						left: 0,
						right: 0
					}
				},
				y: {
					show: false,
					min: 1,
					max: 3,
					padding: {
						top: 0,
						bottom: 0
					}
				}
			},
			legend: {
				show: false
			}
		};
	})

	it("should export custom points properly", done => {
		const expectedDataURL = [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAACkUlEQVRYR+2WzWsTURTFz5mxtu4EF1prk1TFlV/QLhUUXDVTRBR1499ghTSJC0UqaDJ2IdS9G1dWFNtkJ7rQnXUjRQRpm5kWxY2IFJpUM1dmkmobmrzJSwtdZLbz3rm/d+899z1iG33cRixow9SrRjszm5qZnpH8SZNyBuQpotwPmICICPEBkHde2XuzOHb+Y7PmaLpMkXT+HjzvKsH9QnT6AX0RCSITFK8k4DeST5xs/FYzQKFhem6+2rOjXHwvRDeBLmUQQVEgX42VP/2Fhxd+KtdXD6Vc54OY5eUZkPtC01dVRbBorPw+FgYolHY0mZsToi/U4g2OJoJZ17YOq06t1A96RORGqNLUj1b0iAcLGet2I6CGMBXXeM9J9q0VKWTiqkMils6vWyMijni0FsasGS1rR5K5YQIZVF2zKqIHgxKIETdrjevBpPLPALlYmz4tGJ9AMOHa1mUtmGhqcl5gxDYLhoJ5x7YO6sEkcwUQ0drNOpkJNASOY1sxXZgNLa0HE8zpOSdrHdKCiaRyEwAvsTrsW2rgynXx1M3Gr2jCTF0nkAUY3EEtwQhKhCQce+iRFsyBxMvjBs1JGuv7RqdMInBgdg2698990oLxN0VT+buAJBDmcqwTRQQlQDKuPXRHewKvbowkp2ZJ1rVkowDB00LwxbWtI6qxrbybfIHY8IvdXmfHZwJ7VYJr/1dBCkvLxokf44O/VHtDwfwD2tkxTbIHEOV7plIauEvLxkAYkMBrKtra/73p3KghuCZAN/D/pedLiT8CBCWBfCfwWNUjtdpNw/gCvYncUZo4C8FpAgMADBBlAacp3lsxd71u5BptNzWbuVbWa2WmlYAtW3urgm9Kz2wVXLtMbTc121t/Af8A8yST4Uv6AAAAAElFTkSuQmCC",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAACkElEQVRYR+2WzWsTURTFz5mxtu4EF1pjk1TFlV/QLhUUXDVTRBR1499ghTSJC0UqaBK7EOrejSsrim2yE13ozrqRIoK0zUyL4kZECkmqmSszSbUNTd7kpYUuMtt579zfu/ee+x6xjT5uIxZ0YBpVo5OZTc1MaDR/0qScAXmKqAwAJiAiQnwA5J1bcd8sjZ//2Ko5Wi5TOJW/B9e9SnC/EN1eQE9E/MgExS0L+I3kEzsTu9UKUGCY0M1Xe3ZUSu+F6CXQowwiKAnkq7HyZ6Dw8MJP5fraoZTrPBCzUpwFuS8wfU1VBEvGyu9jQYACaUcSuXkh+gMt3uBoIphzstZh1amV+n6PiNwIVJrG0Uou8WAxbd1uBtQUpuoa9znJ/rUihXRMdUhEU/l1a0TEFpfW4rg1q2XtcCI3QiCNmmtWRfRgUAYx6mSsCT2YZP4ZIBfr06cFUyWYdDLWZS2YSHJqQWBENwuGggU7ax3Ug0nkCiAi9Zt1MuNrCGw7a0V1YTa0tB6MP6fn7Yx1SAsmnMxNArzE2rBvq4Gr18VTJxO7ogkzfZ1ABqB/B7UFIygTErezw4+0YA7EXx43aE7RWN83OmUSgQ2zZ8i5f+6TFoy3KZLM3wUkjiCXY4MoIigDknayw3e0J/DqxnBieo5kQ0s2C+A/LQRfnKx1RDW2lXeTJxAdebHb7e76TGCvSnDt/xpIYblonPgxMfRLtTcQzD+gnV0zJEOAKN8z1dLAWS4ag0FAfK+paOv/96VyY4bgmgC9wP+Xnicl3ggQlAXyncBjVY/Ua7cM4wn0xXNHaeIsgNMUDAIwQFQEnKG4b8Xc9bqZa7Td1Grm2lmvlZl2ArZt7a0Kvik9s1VwnTJ13NRqb/0F12PyJPLKnfQAAAAASUVORK5CYII="
		];

		setTimeout(() => {
			chart.export("image/png", data => {
				expect(expectedDataURL.indexOf(data) >= 0).to.be.true;
				done();
			});
		}, 500);
	});
});
