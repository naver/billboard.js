/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {transition as d3Transition} from "d3-transition";
import {$COMMON, $SELECT, $TEXT} from "../../config/classes";
import {generateWait} from "../../module/generator";
import {callFn, capitalize, getOption, isTabVisible, notEmpty} from "../../module/util";

export default {
	redraw(options: any = {}): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const {main, treemap} = $el;

		state.redrawing = true;

		const targetsToShow = $$.filterTargetsToShow($$.data.targets);
		const {flow, initializing} = options;
		const wth = $$.getWithOption(options);
		const duration = wth.Transition ? config.transition_duration : 0;
		const durationForExit = wth.TransitionForExit ? duration : 0;
		const durationForAxis = wth.TransitionForAxis ? duration : 0;
		const transitions = $$.axis?.generateTransitions(durationForAxis);

		$$.updateSizes(initializing);

		// update legend and transform each g
		if (wth.Legend && config.legend_show) {
			options.withTransition = !!duration;
			!treemap && $$.updateLegend($$.mapToIds($$.data.targets), options, transitions);
		} else if (wth.Dimension) {
			// need to update dimension (e.g. axis.y.tick.values) because y tick values should change
			// no need to update axis in it because they will be updated in redraw()
			$$.updateDimension(true);
		}

		// update circleY based on updated parameters
		if (!treemap && (!$$.hasArcType() || state.hasRadar)) {
			$$.updateCircleY && ($$.circleY = $$.updateCircleY());
		}

		// Data empty label positioning and text.
		config.data_empty_label_text && main.select(`text.${$TEXT.text}.${$COMMON.empty}`)
			.attr("x", state.width / 2)
			.attr("y", state.height / 2)
			.text(config.data_empty_label_text)
			.style("display", targetsToShow.length ? "none" : null);

		// update axis
		if (state.hasAxis) {
			// @TODO: Make 'init' state to be accessible everywhere not passing as argument.
			$$.axis.redrawAxis(targetsToShow, wth, transitions, flow, initializing);

			// grid
			$$.hasGrid() && $$.updateGrid();

			// rect for regions
			config.regions.length && $$.updateRegion();

			["bar", "candlestick", "line", "area"].forEach(v => {
				const name = capitalize(v);

				if ((/^(line|area)$/.test(v) && $$.hasTypeOf(name)) || $$.hasType(v)) {
					$$[`update${name}`](wth.TransitionForExit);
				}
			});

			// circles for select
			$el.text && main.selectAll(`.${$SELECT.selectedCircles}`)
				.filter($$.isBarType.bind($$))
				.selectAll("circle")
				.remove();

			// event rects will redrawn when flow called
			if (config.interaction_enabled && !flow && wth.EventRect) {
				$$.redrawEventRect();
				$$.bindZoomEvent?.();
			}
		} else {
			// arc
			$el.arcs && $$.redrawArc(duration, durationForExit, wth.Transform);

			// radar
			$el.radar && $$.redrawRadar();

			// polar
			$el.polar && $$.redrawPolar();

			// treemap
			treemap && $$.updateTreemap(durationForExit);
		}

		// @TODO: Axis & Radar type
		if (!state.resizing && !treemap && ($$.hasPointType() || state.hasRadar)) {
			$$.updateCircle();
		}

		// text
		$$.hasDataLabel() && !$$.hasArcType(null, ["radar"]) && $$.updateText();

		// title
		$$.redrawTitle?.();

		initializing && $$.updateTypesElements();

		$$.generateRedrawList(targetsToShow, flow, duration, wth.Subchart);
		$$.callPluginHook("$redraw", options, duration);
	},

	/**
	 * Generate redraw list
	 * @param {object} targets targets data to be shown
	 * @param {object} flow flow object
	 * @param {number} duration duration value
	 * @param {boolean} withSubchart whether or not to show subchart
	 * @private
	 */
	generateRedrawList(targets, flow: any, duration: number, withSubchart: boolean): void {
		const $$ = this;
		const {config, state} = $$;
		const shape = $$.getDrawShape();

		if (state.hasAxis) {
			// subchart
			config.subchart_show && $$.redrawSubchart(withSubchart, duration, shape);
		}

		// generate flow
		const flowFn = flow && $$.generateFlow({
			targets,
			flow,
			duration: flow.duration,
			shape,
			xv: $$.xv.bind($$)
		});
		const withTransition = (duration || flowFn) && isTabVisible();

		// redraw list
		const redrawList = $$.getRedrawList(shape, flow, flowFn, withTransition);

		// callback function after redraw ends
		const afterRedraw = () => {
			flowFn && flowFn();

			state.redrawing = false;
			callFn(config.onrendered, $$.api);
		};

		if (afterRedraw) {
			// Only use transition when current tab is visible.
			if (withTransition && redrawList.length) {
				// Wait for end of transitions for callback
				const waitForDraw = generateWait();

				// transition should be derived from one transition
				d3Transition().duration(duration)
					.each(() => {
						redrawList
							.reduce((acc, t1) => acc.concat(t1), [])
							.forEach(t => waitForDraw.add(t));
					})
					.call(waitForDraw, afterRedraw);
			} else if (!state.transiting) {
				afterRedraw();
			}
		}

		// update fadein condition
		$$.mapToIds($$.data.targets).forEach(id => {
			state.withoutFadeIn[id] = true;
		});
	},

	getRedrawList(shape, flow, flowFn, withTransition: boolean): Function[] {
		const $$ = <any> this;
		const {config, state: {hasAxis, hasRadar, hasTreemap}, $el: {grid}} = $$;
		const {cx, cy, xForText, yForText} = shape.pos;
		const list: Function[] = [];

		if (hasAxis) {
			if (config.grid_x_lines.length || config.grid_y_lines.length) {
				list.push($$.redrawGrid(withTransition));
			}

			if (config.regions.length) {
				list.push($$.redrawRegion(withTransition));
			}

			Object.keys(shape.type).forEach(v => {
				const name = capitalize(v);
				const drawFn = shape.type[v];

				if ((/^(area|line)$/.test(v) && $$.hasTypeOf(name)) || $$.hasType(v)) {
					list.push($$[`redraw${name}`](drawFn, withTransition));
				}
			});

			!flow && grid.main && list.push($$.updateGridFocus());
		}

		if (!$$.hasArcType() || hasRadar) {
			notEmpty(config.data_labels) && config.data_labels !== false &&
				list.push($$.redrawText(xForText, yForText, flow, withTransition));
		}

		if (($$.hasPointType() || hasRadar) && !config.point_focus_only) {
			$$.redrawCircle && list.push($$.redrawCircle(cx, cy, withTransition, flowFn));
		}

		if (hasTreemap) {
			list.push($$.redrawTreemap(withTransition));
		}

		return list;
	},

	updateAndRedraw(options: any = {}): void {
		const $$ = this;
		const {config, state} = $$;
		let transitions;

		// same with redraw
		options.withTransition = getOption(options, "withTransition", true);
		options.withTransform = getOption(options, "withTransform", false);
		options.withLegend = getOption(options, "withLegend", false);

		// NOT same with redraw
		options.withUpdateXDomain = true;
		options.withUpdateOrgXDomain = true;
		options.withTransitionForExit = false;
		options.withTransitionForTransform = getOption(options, "withTransitionForTransform", options.withTransition);

		// MEMO: called in updateLegend in redraw if withLegend
		if (!(options.withLegend && config.legend_show)) {
			if (state.hasAxis) {
				transitions = $$.axis.generateTransitions(
					options.withTransitionForAxis ? config.transition_duration : 0
				);
			}

			// Update scales
			$$.updateScales();
			$$.updateSvgSize();

			// Update g positions
			$$.transformAll(options.withTransitionForTransform, transitions);
		}

		// Draw with new sizes & scales
		$$.redraw(options, transitions);
	}
};
