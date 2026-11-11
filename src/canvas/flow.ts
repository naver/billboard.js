/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {window} from "../module/browser";

const CANVAS_FLOW_ANIMATION_MAX_VALUES = 100000;

/**
 * Get current animation timestamp.
 * @returns {number} Timestamp
 * @private
 */
function getCanvasAnimationTime(): number {
	return window.performance?.now?.() ?? Date.now();
}

/**
 * Check whether a domain can be interpolated for canvas flow.
 * @param {Array} domain Domain values
 * @param {boolean} isLog Whether the domain is in log scale
 * @returns {boolean} Whether domain is numeric/date-like
 * @private
 */
function isCanvasFlowDomain(domain, isLog = false): boolean {
	return Array.isArray(domain) &&
		domain.length >= 2 &&
		domain.every(v => Number.isFinite(+v) && (!isLog || +v > 0));
}

/**
 * Interpolate numeric/date domain values.
 * @param {Array} start Start domain
 * @param {Array} end End domain
 * @param {number} ratio Interpolation ratio
 * @param {boolean} isLog Whether to interpolate in log space
 * @returns {Array} Interpolated domain
 * @private
 */
function interpolateCanvasFlowDomain(start, end, ratio: number, isLog = false): any[] {
	return start.slice(0, 2).map((value, index) => {
		const next = isLog ?
			Math.exp(Math.log(+value) + ((Math.log(+end[index]) - Math.log(+value)) * ratio)) :
			+value + ((+end[index] - +value) * ratio);

		return value instanceof Date || end[index] instanceof Date ? new Date(next) : next;
	});
}

/**
 * Count current canvas flow values.
 * @param {object} $$ ChartInternal instance
 * @returns {number} Total values
 * @private
 */
function getCanvasFlowValueCount($$): number {
	return $$.data.targets.reduce((sum, target) => sum + target.values.length, 0);
}

/**
 * Sync y/y2 domains for canvas flow frames after data has been appended.
 * @param {object} $$ ChartInternal instance
 * @private
 */
function syncCanvasFlowYDomains($$): void {
	const {scale} = $$;
	const targetsToShow = $$.filterTargetsToShow($$.data.targets);

	(["y", "y2"] as const).forEach(key => {
		scale[key]?.domain($$.getYDomain(targetsToShow, key));
	});

	$$.withSubchartTypeContext(() => {
		scale.subY?.domain($$.getYDomain(targetsToShow, "y"));
		scale.subY2?.domain($$.getYDomain(targetsToShow, "y2"));
	});
}

/**
 * Canvas drawing of chart.flow(): animates the x domain, then commits the final data window.
 * Added to the chart by flow(): bundles without the module do not carry it.
 * @private
 */
export default {
	/**
	 * Finish a pending canvas flow animation before accepting another flow mutation.
	 * @private
	 */
	flushCanvasFlow(): void {
		const {state} = this;

		if (!state.canvasFlowFinish) {
			return;
		}

		state.canvasFlowFrame !== null &&
			window.cancelAnimationFrame?.(state.canvasFlowFrame);
		state.canvasFlowFrame = null;
		state.canvasFlowFinish();
	},

	/**
	 * Animate canvas flow by interpolating the x domain, then commit the final data window.
	 * @param {object} flow Flow metadata
	 * @returns {boolean} Whether animation was started
	 * @private
	 */
	animateCanvasFlow(flow): boolean {
		const $$ = this;
		const {axis, data, org, scale, state} = $$;
		const {done = () => {}, duration, length, orgDataCount} = flow;
		const requestFrame = window.requestAnimationFrame?.bind(window);
		const isLog = !!axis.isLog?.("x");

		if (
			!requestFrame ||
			!duration ||
			!length ||
			!orgDataCount ||
			getCanvasFlowValueCount($$) > CANVAS_FLOW_ANIMATION_MAX_VALUES
		) {
			return false;
		}

		const startDomain = scale.x.domain().slice(0, 2);
		const startOrgDomain = org.xDomain?.slice?.();
		const startSubXDomain = scale.subX?.domain?.().slice?.();

		if (!isCanvasFlowDomain(startDomain, isLog)) {
			return false;
		}

		const removed = data.targets.map(target => target.values.splice(0, length));

		$$.updateXDomain($$.filterTargetsToShow(data.targets), true, true);

		const endDomain = scale.x.domain().slice(0, 2);
		const endOrgDomain = org.xDomain?.slice?.();

		data.targets.forEach((target, index) => {
			target.values.unshift(...removed[index]);
		});

		if (!isCanvasFlowDomain(endDomain, isLog)) {
			startOrgDomain && (org.xDomain = startOrgDomain);
			scale.x.domain(startDomain);
			startSubXDomain && scale.subX.domain(startSubXDomain);
			axis.x.scale(scale.x);

			return false;
		}

		syncCanvasFlowYDomains($$);

		let finished = false;
		const started = getCanvasAnimationTime();
		const finish = () => {
			if (finished) {
				return;
			}

			finished = true;
			data.targets.forEach(target => {
				target.values.splice(0, length);
			});

			endOrgDomain && (org.xDomain = endOrgDomain);
			scale.x.domain(endDomain);
			scale.subX?.domain?.(endOrgDomain ?? endDomain);
			axis.x.scale(scale.x);
			state.dirty.data = true;
			state._eventRectFingerprint = null;
			state.canvasShape = null;
			state._cachedDrawShape = null;

			$$.redraw({
				withLegend: true,
				withTransition: false,
				withTrimXDomain: false,
				withUpdateOrgXDomain: true,
				withUpdateXAxis: true,
				withUpdateXDomain: true
			});
			$$.updateTypesElements();
			state.canvasFlowFrame = null;
			state.canvasFlowFinish = null;
			state.flowing = false;
			done.call($$.api);
		};
		const render = (timestamp: number) => {
			const ratio = Math.min(1, Math.max(0, (timestamp - started) / duration));
			const domain = interpolateCanvasFlowDomain(startDomain, endDomain, ratio, isLog);

			scale.x.domain(domain);
			axis.x.scale(scale.x);
			state.canvasShape = null;
			state._cachedDrawShape = null;
			state._canvasVisibleRangeCache = null;
			state._canvasXTickValuesCache = null;
			$$.renderCanvasFrame(undefined, null, false);

			if (ratio < 1) {
				state.canvasFlowFrame = requestFrame(render);
			} else {
				finish();
			}
		};

		startOrgDomain && (org.xDomain = startOrgDomain);
		scale.x.domain(startDomain);
		startSubXDomain && scale.subX.domain(startSubXDomain);
		axis.x.scale(scale.x);
		state.flowing = true;
		state.cancelClick = true;
		$$.hideTooltip?.();
		state.canvasFlowFinish = finish;
		state.canvasFlowFrame = requestFrame(render);

		return true;
	}
};
