/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {TYPE, TYPE_BY_CATEGORY} from "../../config/const";
import {brushEmpty, getBrushSelection, getMinMax, isDefined, notEmpty, isValue, isObject, isNumber, diffDomain, parseDate, sortValue} from "../../module/util";

export default {
	getYDomainMinMax(targets, type: "min" | "max"): number | Date | undefined {
		const $$ = this;
		const {axis, config} = $$;
		const isMin = type === "min";

		const dataGroups = config.data_groups;
		const ids = $$.mapToIds(targets);
		const ys = $$.getValuesAsIdKeyed(targets);

		if (dataGroups.length > 0) {
			const hasValue = $$[`has${isMin ? "Negative" : "Positive"}ValueInTargets`](targets);

			for (let j = 0, idsInGroup; (idsInGroup = dataGroups[j]); j++) {
				// Determine baseId
				idsInGroup = idsInGroup.filter(v => ids.indexOf(v) >= 0);

				if (idsInGroup.length === 0) {
					continue;
				}

				const baseId = idsInGroup[0];
				const baseAxisId = axis.getId(baseId);

				// Initialize base value. Set to 0 if not match with the condition
				if (hasValue && ys[baseId]) {
					ys[baseId] = ys[baseId].map(v => (
						(isMin ? v < 0 : v > 0) ? v : 0
					));
				}

				for (let k = 1, id; (id = idsInGroup[k]); k++) {
					if (!ys[id]) {
						continue;
					}

					const axisId = axis.getId(id);

					ys[id].forEach((v, i) => {
						const val = +v;
						const meetCondition = isMin ? val > 0 : val < 0;

						if (axisId === baseAxisId && !(hasValue && meetCondition)) {
							ys[baseId][i] += val;
						}
					});
				}
			}
		}

		return getMinMax(type, Object.keys(ys).map(key => getMinMax(type, ys[key])));
	},

	getYDomainMin(targets): number {
		return this.getYDomainMinMax(targets, "min");
	},

	getYDomainMax(targets): number {
		return this.getYDomainMinMax(targets, "max");
	},

	/**
	 * Check if hidden targets bound to the given axis id
	 * @param {string} id ID to be checked
	 * @returns {boolean}
	 * @private
	 */
	isHiddenTargetWithYDomain(id): boolean {
		const $$ = this;

		return $$.state.hiddenTargetIds
			.some(v => $$.axis.getId(v) === id);
	},

	getYDomain(targets, axisId: string, xDomain) {
		const $$ = this;
		const {axis, config, scale} = $$;
		const pfx = `axis_${axisId}`;

		if ($$.isStackNormalized()) {
			return [0, 100];
		}

		const isLog = scale && scale[axisId] && scale[axisId].type === "log";
		const targetsByAxisId = targets.filter(t => axis.getId(t.id) === axisId);
		const yTargets = xDomain ? $$.filterByXDomain(targetsByAxisId, xDomain) : targetsByAxisId;

		if (yTargets.length === 0) { // use domain of the other axis if target of axisId is none
			if ($$.isHiddenTargetWithYDomain(axisId)) {
				return scale[axisId].domain();
			} else {
				return axisId === "y2" ?
					scale.y.domain() :
					// When all data bounds to y2, y Axis domain is called prior y2.
					// So, it needs to call to get y2 domain here
					$$.getYDomain(targets, "y2", xDomain);
			}
		}

		const yMin = config[`${pfx}_min`];
		const yMax = config[`${pfx}_max`];
		let yDomainMin = $$.getYDomainMin(yTargets);
		let yDomainMax = $$.getYDomainMax(yTargets);
		const center = config[`${pfx}_center`];
		let isZeroBased = [TYPE.BAR, TYPE.BUBBLE, TYPE.SCATTER, ...TYPE_BY_CATEGORY.Line]
			.some(v => {
				const type = v.indexOf("area") > -1 ? "area" : v;

				return $$.hasType(v, yTargets) && config[`${type}_zerobased`];
			});

		const isInverted = config[`${pfx}_inverted`];
		const showHorizontalDataLabel = $$.hasDataLabel() && config.axis_rotated;
		const showVerticalDataLabel = $$.hasDataLabel() && !config.axis_rotated;

		// MEMO: avoid inverting domain unexpectedly
		yDomainMin = isValue(yMin) ? yMin :
			(isValue(yMax) ? (yDomainMin < yMax ? yDomainMin : yMax - 10) : yDomainMin);
		yDomainMax = isValue(yMax) ? yMax :
			(isValue(yMin) ? (yMin < yDomainMax ? yDomainMax : yMin + 10) : yDomainMax);

		if (isNaN(yDomainMin)) { // set minimum to zero when not number
			yDomainMin = 0;
		}

		if (isNaN(yDomainMax)) { // set maximum to have same value as yDomainMin
			yDomainMax = yDomainMin;
		}

		if (yDomainMin === yDomainMax) {
			yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0;
		}


		const isAllPositive = yDomainMin >= 0 && yDomainMax >= 0;
		const isAllNegative = yDomainMin <= 0 && yDomainMax <= 0;

		// Cancel zerobased if axis_*_min / axis_*_max specified
		if ((isValue(yMin) && isAllPositive) || (isValue(yMax) && isAllNegative)) {
			isZeroBased = false;
		}

		// Bar/Area chart should be 0-based if all positive|negative
		if (isZeroBased) {
			isAllPositive && (yDomainMin = 0);
			isAllNegative && (yDomainMax = 0);
		}

		const domainLength = Math.abs(yDomainMax - yDomainMin);
		const padding = {top: domainLength * 0.1, bottom: domainLength * 0.1};

		if (isDefined(center)) {
			const yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));

			yDomainMax = center + yDomainAbs;
			yDomainMin = center - yDomainAbs;
		}

		// add padding for data label
		if (showHorizontalDataLabel) {
			const diff = diffDomain(scale.y.range());
			const ratio = $$.getDataLabelLength(yDomainMin, yDomainMax, "width")
				.map(v => v / diff);

			["bottom", "top"].forEach((v, i) => {
				padding[v] += domainLength * (ratio[i] / (1 - ratio[0] - ratio[1]));
			});
		} else if (showVerticalDataLabel) {
			const lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, "height");

			["bottom", "top"].forEach((v, i) => {
				padding[v] += axis.convertPixelsToAxisPadding(lengths[i], domainLength);
			});
		}

		// if padding is set, the domain will be updated relative the current domain value
		// ex) $$.height=300, padding.top=150, domainLength=4  --> domain=6
		const p = config[`${pfx}_padding`];

		if (notEmpty(p)) {
			["bottom", "top"].forEach(v => {
				padding[v] = axis.getPadding(p, v, padding[v], domainLength);
			});
		}

		// Bar/Area chart should be 0-based if all positive|negative
		if (isZeroBased) {
			isAllPositive && (padding.bottom = yDomainMin);
			isAllNegative && (padding.top = -yDomainMax);
		}

		const domain = isLog ? [yDomainMin, yDomainMax].map(v => (v < 0 ? 0 : v)) :
			[yDomainMin - padding.bottom, yDomainMax + padding.top];

		return isInverted ? domain.reverse() : domain;
	},

	getXDomainMinMax(targets, type) {
		const $$ = this;
		const configValue = $$.config[`axis_x_${type}`];
		const dataValue = getMinMax(type, targets.map(t => getMinMax(type, t.values.map(v => v.x))));
		let value = isObject(configValue) ? configValue.value : configValue;

		value = isDefined(value) && $$.axis.isTimeSeries() ? parseDate.bind(this)(value) : value;

		if (isObject(configValue) && configValue.fit && (
			(type === "min" && value < dataValue) || (type === "max" && value > dataValue)
		)) {
			value = undefined;
		}

		return isDefined(value) ? value : dataValue;
	},

	getXDomainMin(targets) {
		return this.getXDomainMinMax(targets, "min");
	},

	getXDomainMax(targets) {
		return this.getXDomainMinMax(targets, "max");
	},

	getXDomainPadding(domain) {
		const $$ = this;
		const {axis, config} = $$;
		const diff = domain[1] - domain[0];
		const xPadding = config.axis_x_padding;
		let maxDataCount;
		let padding;

		if (axis.isCategorized()) {
			padding = 0;
		} else if ($$.hasType("bar")) {
			maxDataCount = $$.getMaxDataCount();
			padding = maxDataCount > 1 ? (diff / (maxDataCount - 1)) / 2 : 0.5;
		} else {
			padding = diff * 0.01;
		}

		let left = padding;
		let right = padding;

		if (isObject(xPadding) && notEmpty(xPadding)) {
			left = isValue(xPadding.left) ? xPadding.left : padding;
			right = isValue(xPadding.right) ? xPadding.right : padding;
		} else if (isNumber(config.axis_x_padding)) {
			left = xPadding;
			right = xPadding;
		}

		return {left, right};
	},

	getXDomain(targets) {
		const $$ = this;
		const isLog = $$.scale.x.type === "log";
		const xDomain = [$$.getXDomainMin(targets), $$.getXDomainMax(targets)];
		let min: Date | number = 0;
		let max: Date | number = 0;

		if (isLog) {
			min = xDomain[0];
			max = xDomain[1];
		} else {
			const isCategorized = $$.axis.isCategorized();
			const isTimeSeries = $$.axis.isTimeSeries();
			const padding = $$.getXDomainPadding(xDomain);
			let [firstX, lastX] = xDomain;

			// show center of x domain if min and max are the same
			if ((firstX - lastX) === 0 && !isCategorized) {
				if (isTimeSeries) {
					firstX = new Date(firstX.getTime() * 0.5);
					lastX = new Date(lastX.getTime() * 1.5);
				} else {
					firstX = firstX === 0 ? 1 : (firstX * 0.5);
					lastX = lastX === 0 ? -1 : (lastX * 1.5);
				}
			}

			if (firstX || firstX === 0) {
				min = isTimeSeries ? new Date(firstX.getTime() - padding.left) : firstX - padding.left;
			}

			if (lastX || lastX === 0) {
				max = isTimeSeries ? new Date(lastX.getTime() + padding.right) : lastX + padding.right;
			}
		}

		return [min, max];
	},

	updateXDomain(targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
		const $$ = this;
		const {config, org, scale: {x, subX}} = $$;
		const zoomEnabled = config.zoom_enabled;

		if (withUpdateOrgXDomain) {
			x.domain(domain || sortValue($$.getXDomain(targets)));
			org.xDomain = x.domain();

			zoomEnabled && $$.zoom.updateScaleExtent();

			subX.domain(x.domain());
			$$.brush && $$.brush.scale(subX);
		}

		if (withUpdateXDomain) {
			const domainValue = domain || (!$$.brush || brushEmpty($$)) ?
				org.xDomain : getBrushSelection($$).map(subX.invert);

			x.domain(domainValue);
			zoomEnabled && $$.zoom.updateScaleExtent();
		}

		// Trim domain when too big by zoom mousemove event
		withTrim && x.domain($$.trimXDomain(x.orgDomain()));

		return x.domain();
	},

	trimXDomain(domain) {
		const zoomDomain = this.getZoomDomain();
		const [min, max] = zoomDomain;

		if (domain[0] <= min) {
			domain[1] = +domain[1] + (min - domain[0]);
			domain[0] = min;
		}

		if (max <= domain[1]) {
			domain[0] = +domain[0] - (domain[1] - max);
			domain[1] = max;
		}

		return domain;
	},

	/**
	 * Get zoom domain
	 * @returns {Array} zoom domain
	 * @private
	 */
	getZoomDomain(): [number|Date, number|Date] {
		const $$ = this;
		const {config, org} = $$;
		let [min, max] = org.xDomain;

		if (isDefined(config.zoom_x_min)) {
			min = getMinMax("min", [min, config.zoom_x_min]);
		}

		if (isDefined(config.zoom_x_max)) {
			max = getMinMax("max", [max, config.zoom_x_max]);
		}

		return [min, max];
	}
};
