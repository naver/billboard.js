/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	min as d3Min,
	max as d3Max,
	extent as d3Extent
} from "d3"; // selection
import ChartInternal from "./ChartInternal";
import {extend, isDefined, notEmpty, isValue, diffDomain} from "./util";


extend(ChartInternal.prototype, {
	getYDomainMin(targets) {
		const $$ = this;
		const config = $$.config;
		const ids = $$.mapToIds(targets);
		const ys = $$.getValuesAsIdKeyed(targets);
		let j;
		let k;
		let baseId;
		let idsInGroup;
		let id;
		let hasNegativeValue;

		if (config.data_groups.length > 0) {
			hasNegativeValue = $$.hasNegativeValueInTargets(targets);

			for (j = 0; j < config.data_groups.length; j++) {
				// Determine baseId
				idsInGroup = config.data_groups[j].filter(v => (ids.indexOf(v) >= 0));

				if (idsInGroup.length === 0) {
					continue;
				}

				baseId = idsInGroup[0];

				// Consider negative values
				if (hasNegativeValue && ys[baseId]) {
					ys[baseId].forEach((v, i) => {
						ys[baseId][i] = v < 0 ? v : 0;
					});
				}

				// Compute min
				for (k = 1; k < idsInGroup.length; k++) {
					id = idsInGroup[k];

					if (!ys[id]) {
						continue;
					}

					ys[id].forEach((v, i) => {
						if ($$.axis.getId(id) === $$.axis.getId(baseId) &&
							ys[baseId] && !(hasNegativeValue && +v > 0)) {
							ys[baseId][i] += +v;
						}
					});
				}
			}
		}
		return d3Min(Object.keys(ys).map(key => d3Min(ys[key])));
	},
	getYDomainMax(targets) {
		const $$ = this;
		const config = $$.config;
		const ids = $$.mapToIds(targets);
		const ys = $$.getValuesAsIdKeyed(targets);
		let j;
		let k;
		let baseId;
		let idsInGroup;
		let id;
		let hasPositiveValue;

		if (config.data_groups.length > 0) {
			hasPositiveValue = $$.hasPositiveValueInTargets(targets);
			for (j = 0; j < config.data_groups.length; j++) {
				// Determine baseId
				idsInGroup = config.data_groups[j].filter(v => (ids.indexOf(v) >= 0));

				if (idsInGroup.length === 0) {
					continue;
				}

				baseId = idsInGroup[0];

				// Consider positive values
				if (hasPositiveValue && ys[baseId]) {
					ys[baseId].forEach((v, i) => {
						ys[baseId][i] = v > 0 ? v : 0;
					});
				}
				// Compute max
				for (k = 1; k < idsInGroup.length; k++) {
					id = idsInGroup[k];

					if (!ys[id]) {
						continue;
					}

					ys[id].forEach((v, i) => {
						if ($$.axis.getId(id) === $$.axis.getId(baseId) &&
							ys[baseId] && !(hasPositiveValue && +v < 0)) {
							ys[baseId][i] += +v;
						}
					});
				}
			}
		}
		return d3Max(Object.keys(ys).map(key => d3Max(ys[key])));
	},
	getYDomain(targets, axisId, xDomain) {
		const $$ = this;
		const config = $$.config;
		const targetsByAxisId = targets.filter(t => $$.axis.getId(t.id) === axisId);
		const yTargets = xDomain ? $$.filterByXDomain(targetsByAxisId, xDomain) : targetsByAxisId;
		const yMin = axisId === "y2" ? config.axis_y2_min : config.axis_y_min;
		const yMax = axisId === "y2" ? config.axis_y2_max : config.axis_y_max;
		let yDomainMin = $$.getYDomainMin(yTargets);
		let yDomainMax = $$.getYDomainMax(yTargets);
		const center = axisId === "y2" ? config.axis_y2_center : config.axis_y_center;
		let isZeroBased = ($$.hasType("bar", yTargets) && config.bar_zerobased) || ($$.hasType("area", yTargets) && config.area_zerobased);
		const isInverted = axisId === "y2" ? config.axis_y2_inverted : config.axis_y_inverted;
		const showHorizontalDataLabel = $$.hasDataLabel() && config.axis_rotated;
		const showVerticalDataLabel = $$.hasDataLabel() && !config.axis_rotated;
		let lengths;

		// MEMO: avoid inverting domain unexpectedly
		yDomainMin = isValue(yMin) ? yMin :
			(isValue(yMax) ? (yDomainMin < yMax ? yDomainMin : yMax - 10) : yDomainMin);
		yDomainMax = isValue(yMax) ? yMax :
			(isValue(yMin) ? (yMin < yDomainMax ? yDomainMax : yMin + 10) : yDomainMax);

		if (yTargets.length === 0) { // use current domain if target of axisId is none
			return axisId === "y2" ? $$.y2.domain() : $$.y.domain();
		}

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
			if (isAllPositive) { yDomainMin = 0; }
			if (isAllNegative) { yDomainMax = 0; }
		}

		const domainLength = Math.abs(yDomainMax - yDomainMin);
		let paddingTop = domainLength * 0.1;
		let paddingBottom = domainLength * 0.1;

		if (typeof center !== "undefined") {
			const yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));

			yDomainMax = center + yDomainAbs;
			yDomainMin = center - yDomainAbs;
		}

		// add padding for data label
		if (showHorizontalDataLabel) {
			lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, "width");
			const diff = diffDomain($$.y.range());
			const ratio = [lengths[0] / diff, lengths[1] / diff];

			paddingTop += domainLength * (ratio[1] / (1 - ratio[0] - ratio[1]));
			paddingBottom += domainLength * (ratio[0] / (1 - ratio[0] - ratio[1]));
		} else if (showVerticalDataLabel) {
			lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, "height");
			paddingTop += $$.axis.convertPixelsToAxisPadding(lengths[1], domainLength);
			paddingBottom += $$.axis.convertPixelsToAxisPadding(lengths[0], domainLength);
		}

		if (axisId === "y" && notEmpty(config.axis_y_padding)) {
			paddingTop = $$.axis.getPadding(config.axis_y_padding, "top", paddingTop, domainLength);
			paddingBottom = $$.axis.getPadding(config.axis_y_padding, "bottom", paddingBottom, domainLength);
		}

		if (axisId === "y2" && notEmpty(config.axis_y2_padding)) {
			paddingTop = $$.axis.getPadding(config.axis_y2_padding, "top", paddingTop, domainLength);
			paddingBottom = $$.axis.getPadding(config.axis_y2_padding, "bottom", paddingBottom, domainLength);
		}

		// Bar/Area chart should be 0-based if all positive|negative
		if (isZeroBased) {
			if (isAllPositive) {
				paddingBottom = yDomainMin;
			}
			if (isAllNegative) {
				paddingTop = -yDomainMax;
			}
		}

		const domain = [yDomainMin - paddingBottom, yDomainMax + paddingTop];

		return isInverted ? domain.reverse() : domain;
	},

	getXDomainMin(targets) {
		const $$ = this;
		const config = $$.config;

		return isDefined(config.axis_x_min) ?
			($$.isTimeSeries() ? this.parseDate(config.axis_x_min) : config.axis_x_min) :
		d3Min(targets, t => d3Min(t.values, v => v.x));
	},

	getXDomainMax(targets) {
		const $$ = this;
		const config = $$.config;

		return isDefined(config.axis_x_max) ?
			($$.isTimeSeries() ? this.parseDate(config.axis_x_max) : config.axis_x_max) :
		d3Max(targets, t => d3Max(t.values, v => v.x));
	},

	getXDomainPadding(domain) {
		const $$ = this;
		const config = $$.config;
		const diff = domain[1] - domain[0];
		let maxDataCount;
		let padding;
		let paddingLeft;
		let paddingRight;

		if ($$.isCategorized()) {
			padding = 0;
		} else if ($$.hasType("bar")) {
			maxDataCount = $$.getMaxDataCount();
			padding = maxDataCount > 1 ? (diff / (maxDataCount - 1)) / 2 : 0.5;
		} else {
			padding = diff * 0.01;
		}

		if (typeof config.axis_x_padding === "object" && notEmpty(config.axis_x_padding)) {
			paddingLeft = isValue(config.axis_x_padding.left) ? config.axis_x_padding.left : padding;
			paddingRight = isValue(config.axis_x_padding.right) ? config.axis_x_padding.right : padding;
		} else if (typeof config.axis_x_padding === "number") {
			paddingLeft = config.axis_x_padding;
			paddingRight = config.axis_x_padding;
		} else {
			paddingLeft = padding;
			paddingRight = padding;
		}
		return {left: paddingLeft, right: paddingRight};
	},

	getXDomain(targets) {
		const $$ = this;
		const xDomain = [$$.getXDomainMin(targets), $$.getXDomainMax(targets)];
		let firstX = xDomain[0];
		let lastX = xDomain[1];
		const padding = $$.getXDomainPadding(xDomain);
		let min = 0;
		let max = 0;
		// show center of x domain if min and max are the same

		if ((firstX - lastX) === 0 && !$$.isCategorized()) {
			if ($$.isTimeSeries()) {
				firstX = new Date(firstX.getTime() * 0.5);
				lastX = new Date(lastX.getTime() * 1.5);
			} else {
				firstX = firstX === 0 ? 1 : (firstX * 0.5);
				lastX = lastX === 0 ? -1 : (lastX * 1.5);
			}
		}

		if (firstX || firstX === 0) {
			min = $$.isTimeSeries() ? new Date(firstX.getTime() - padding.left) : firstX - padding.left;
		}

		if (lastX || lastX === 0) {
			max = $$.isTimeSeries() ? new Date(lastX.getTime() + padding.right) : lastX + padding.right;
		}

		return [min, max];
	},

	updateXDomain(targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
		const $$ = this;
		const config = $$.config;

		if (withUpdateOrgXDomain) {
			$$.x.domain(domain || d3Extent($$.getXDomain(targets)));
			$$.orgXDomain = $$.x.domain();

			config.zoom_enabled &&
				$$.zoom.updateScaleExtent();

			$$.subX.domain($$.x.domain());

			$$.brush && $$.brush.scale($$.subX);
		}

		if (withUpdateXDomain) {
			const domainValue = domain || (!$$.brush || $$.brushEmpty()) ?
					$$.orgXDomain : $$.getBrushSelection().map(v => $$.subX.invert(v));

			$$.x.domain(domainValue);

			config.zoom_enabled &&
				$$.zoom.updateScaleExtent();
		}

		// Trim domain when too big by zoom mousemove event
		if (withTrim) { $$.x.domain($$.trimXDomain($$.x.orgDomain())); }

		return $$.x.domain();
	},

	trimXDomain(domain) {
		const zoomDomain = this.getZoomDomain();
		const min = zoomDomain[0];
		const max = zoomDomain[1];

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
});
