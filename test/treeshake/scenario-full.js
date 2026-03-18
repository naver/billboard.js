import bb, {
	area, areaLineRange, areaSpline, areaSplineRange, areaStep, areaStepRange,
	bar, bubble, candlestick, donut, funnel, gauge, line, pie, polar, radar,
	scatter, spline, step, treemap, selection, subchart, zoom
} from "../../dist-esm/billboard.js";

// Call all loaders to ensure they are included
area(); areaLineRange(); areaSpline(); areaSplineRange(); areaStep(); areaStepRange();
bar(); bubble(); candlestick(); donut(); funnel(); gauge(); line(); pie(); polar(); radar();
scatter(); spline(); step(); treemap(); selection(); subchart(); zoom();

bb.generate({data: {columns: [["data1", 1, 2, 3]], type: bar()}});
