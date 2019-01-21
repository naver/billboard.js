/**
 * Copyright (c) 2017 NAVER Corp.
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
			  width: 100,
			  height: 150
			},
			data: {
				columns: [
					["data1", 3]
				]
			},
			point: {
			  pattern: [
				"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10' style='fill:#fff'></rect></g>"
			  ]
			},
			axis: {
				y: {
				  min: 2.5,
				  max: 3
				}
			}
		}
	})

	it("shoul exported custom points properly?", done => {
		const expectedDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACWCAYAAAAouC1GAAALQklEQVR4Xu1dTYhlRxX+6nUmnYSgImRGA9M9OgsxKhqiu4BoFILTHcRFgjgbF3EjGiWZ7iEoiegi3Z0QFAQlCw0kKLgYsHvEv1HBhRhMBpII2WRId5tkkrgQRjvDpN+rcHpu4enKvbdO1a3785LzNtPz3qmqU99Xp/6+W3UN9DMoBMygvFFnkErIDwF8s8DvIIDXPCyvA/Bq8d2PANxV/M3T8e+VigKBFEJuAXAjgAcBfBTAnQxwBywB/wiAZwHcA+AsgDMALJDcCN4RpKUQwoEhQm4tyOHfbwBYKL5wNo+yqKGfPleQ1CvQc3efuukSZj8wGmFmxkxeH2P8+mg0emMymRzAzJVXY9dePTEYz9rxuc21xafadrYJIa77+VgRCc5X6q5+VkIIRcltRTS5Ls0vnyKo7NPEz9IMr19en7vC4p/GmGslIF8ObXth187c8OLqF/4lSZNik6OiFA1f9caRsgihLo5/iNAflIw/fj2yd3NExgFr/g6D98WAVrSW82M7+lRbpKQQ8pWiEo8X/5YBVjaGuMpTOj+K6nDJTsj88vp5wByiQm3EkGb2hkDA2snLW6u3XR9DptQ2hRDKm8+W3FhAg/dvi+5LMsvyu7oqn7MSMndy/RFYHDcwV7kCr7lyJojXzqUxt7loYX66tXLsW8GEkQaphEQW08g8GyFzy+s3w4weM9bOc49eeOBY0MEjJ0/vs7HWbo8nuOPFBxf/FkwcYdA1IaH1S5nr2QiZX964xwJrfqVTCAFwcTIx926vHXs4Au+gaZeESNYvrRJyeOn0qZGxX/QLSSPEYDKZnNpeW/xSEOUIgy4J4W5VrV9aJWR+eX0TMHN5CNmbEWxtri7s6/4isC817YOQqvXL5UlP+SeDn9bML50+B2OO+MWkRgisfWFz9dgHAVPldzQ/GSoaXaZLULZ+aTVC5pbWnzPGfChXhFjY57ZWFj+cjEBJwi4JkaxfWiXk8NL6L0dmdEeeCNnL5edbKwu0KM726ZIQcrps/RKqTMZZ1vrXAfMQgFleaFqXZS9NLO7aXl38SagCMb93TUiMb842GyEHT/zm6KyZ/GlksG9gf/K7nw/6ddP3/7DPhtYhuwY3v7SyuBVMHGGQSgj1/241VbZrS7OoZwo/TrDd4BQ9JBsh5M/c0sayMbgXwLvo/zMjgytGYRh2JxbjSTF2W3thAvO97dUFirasn7Anby1OMhYQYScz6SFZCaHqzC9vnLXAJ1IqT+kt8OTWysInszJRZJbqE/eF7+y673PqIdkJOXL/n6+yO/971hpz1G0YysA1sNY+v3XNzg24//ZLsjRxVk0JoS7o1yVCE5/SUkS9v1ANB6OH4Gv/ODD/3vN/tRP7EYkmYq39rzXmqe1zO5/Fr27ft9MYB3m9dSohbje3aseWjyGknT8BwG3XO49600M4JHMnNr5hDO62sO+GMe+h3wiUy9vylvba/2OBC7BY2V5b/HFO8MvySiGkSu3zuzEnWrlt+Y8XBr3rIT4Qh+773cHZnTc+DWNvBMwtxmAWBhdhccZae3Z3fO1fXnroM/9umwzXGGLLIYDXvERELNdDJLOsXvSQ2Mp2bZ8SIV37mH1Q77oCMeXlJIS21/9YFE5qjnvqhPvTqx4SA0xftjkJ4S3ZX6tQ/YgwPsviT6bU1V8jJEPrIPDpoQY+syKSzrMp8iBmWRnqmjWLnBHiHKMB/YGSLosrhmRLLd9/DLVFPSQrbq1llpsQmmkdLnm0lK893DPB0md7tctKpJ/IeLlkAeiy4xFCa5nv1BDHXVBCEgjhz2G55McLcvi+ls6yAuDm7rISuAwm0QgJQgRMrR4iqFuvJikRItFD+LO9/O+U1p6SpldQmxSeQohfXpkeUkbIK4nnQ5SQCIar9BDKwnVrTuL1V+p05M1vELoOiQCfm4b0EL7oq5oO60q9BPyULkuih5Tta7niB6eHJDbKVpKlECLRQ6p2fvk6RPWQTBHSSsuoyVQH9UTEVQ9JBI4nS+myqooN6SH8THvV+fayvDVCMhBdpocoIQJgc0aIK65KD6HfXbdWJfHqOkRAWoxJnR7iHpij8+qSqbMrV7usGAaYbUgPkeyB6RiSCL6fTKqHhHaJlZBMhLSZjXZZAnRDLd0fnN0Zkd7Phwjq1qtJyiwrdizgm4gprT0lTa+gNik8hRC/vDI9xNnQNJc+dHmZP85I78tSQiIYrtNDKBtOluohAmBTIySkh7hFoP/0IndJ9ZASglIIkS7qfMD52NPrfVmChtqbSQohEj3E765cBVUPCVCdQkjXrUcH9UTEQ3oIdVmPeXmX3fnrF6+EJBIS0kN4tr1cz5RYr06TtdVllekh/gzL3XYdqrBGSAihwO91eggl9Q/u8OxUD2kIvp88dD6kavZV54ZGSCJJIT2Eso0ZO5wbSkgCIVI9JDS2lBWthCQQ0mYSJUSAbkgPkdxsrWcMM+1lSfQQvsvb9P0hGiGCCOEmvh7iDnQeLW6dc4/8qB4iALbpwrBMD3HAu20RN/uiSwOGc1+WAJw+TFIJqdND/CPPVVNd1UMyjSESPYTfKOfGkMG8P6SPli8tMyVCJHqIZJal50MyRYiU7Fx2OstKRDKkh1C2PLo0QlqOkJAewrdNVFOvaPUpY4gkgMr2rCg66OPua9TnslqOEJd9lR7iCKk7jqB6iKS5R9jU6SH81lLKUtchLUdISA/x78vSOxdbJESqh+gsK9DdtDWoR/RyQVNdhwQhirsvi7Jzaw49H9JChEj0kLJ7e8mVlNaekkbQpoZpkqPLKjsfwscK1UMiuG9KSN37Q/gbdui2UtVDBMSkEiI5H8IXirey91C573UdkmnaK9FDeL+veoggMpxJSoRI9BD/DTvuOV49H9LCLCuC7yymOstKhFGih+g6pMMICekhug4RtPSUMUSQ7d41TP4JXH0uS4BcG4TUvT9En8vqsMuioiTnQ3QdUkNKzggJ6SF6Tr3DLkuqh+g6pKUuK3QcwRXL7zeh73Ta2wIhku13KtZFDT8HkrLIS0kj6ByGaZJjDKm6nsm9U/3O4l1TOu0VtIGmhFRtv7sNxafZy7+aXM8kqMrbwsSkEhLafq+64o+jNuTt9z66yb0yUwiRbL874PlZkWma9k4VIZLt9zJC/FnWkB+2nipCuu6sewOn44omd1kd+5n0pEpTH3trBCljSNPKxqbvDZxYRxvaT02ENKzndCWfhgiZLkQbequENAQwd3Il5K2I8o3TzvHpvMDcLSpzfnzxys+zZC6mOjslZD82/nZO3b32rZCkhOyHld9AQb8oIa00O3mmGiFyrDqx1DGkE5jjCtFZVhxeb29rHdQHxq8SooQMDIGBuaMRooQMDIGBuaMRooQMDIGBuaMRooQMDIGBuaMRooQMDIGBudNJhMwvb1TdpbgPjs2VhU78GRgH+9zpBICWCCHt4gkAj9cA7G6UiKmnJN/WOI1xNNmJKSLEnfA6HiA6GYtQwmkjxAFGd3A9zyLEPwx0AsCjAF4tAKi6s4vs6Npa+lC3SkR8GcAvlBAAgTGE1DwCa4Edl3MtmUSlhwGcKd4E9wwAen/JIQD0t2t4VXavsZZLNkoIARIgxO/bq/p6/kIZnxDeY/gvnnG/KSEOiQAhPlD8XDy/+MZlVxYhVXYaIWWDW4MIof7fHQCqi5AqOyUkgRDXumk8cKDTGPL7YvB2hLgTXn6E+OciuZ0SkkAIJeHH6WiGRJdr0jqEf09vXfg2G+TdopSIrLN754whobm3/v5/BDpZhyjgcgSUEDlWnVgqIZ3ALC9ECZFj1YmlEtIJzPJClBA5Vp1YKiGdwCwvRAmRY9WJpRLSCczyQpQQOVadWL4JQPC8xLbzUzgAAAAASUVORK5CYII=";

		setTimeout(() => {
			chart.export("image/png", data => {
				expect(data).to.be.equal(expectedDataURL);
				done();
			});
		}, 500);
	});
});
