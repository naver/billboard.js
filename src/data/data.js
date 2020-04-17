/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import CLASS from "../config/classes";
import ChartInternal from "../internals/ChartInternal";
import {
	extend,
	getUnique,
	hasValue,
	isArray,
	isBoolean,
	isDefined,
	isFunction,
	isNumber,
	isObject,
	isObjectType,
	isString,
	isUndefined,
	isValue,
	notEmpty,
	mergeArray,
	sortValue
} from "../internals/util";

extend(ChartInternal.prototype, {
	isX(key) {
		const $$ = this;
		const config = $$.config;
		const dataKey = config.data_x && key === config.data_x;
		const existValue = notEmpty(config.data_xs) && hasValue(config.data_xs, key);

		return dataKey || existValue;
	},

	isNotX(key) {
		return !this.isX(key);
	},

	isStackNormalized() {
		const config = this.config;

		return config.data_stack_normalize && config.data_groups.length;
	},

	isGrouped(id) {
		return this.config.data_groups
			.map(v => v.indexOf(id) >= 0)[0];
	},

	getXKey(id) {
		const $$ = this;
		const config = $$.config;

		return config.data_x ?
			config.data_x : (notEmpty(config.data_xs) ? config.data_xs[id] : null);
	},

	getXValuesOfXKey(key, targets) {
		const $$ = this;
		const ids = targets && notEmpty(targets) ? $$.mapToIds(targets) : [];
		let xValues;

		ids.forEach(id => {
			if ($$.getXKey(id) === key) {
				xValues = $$.data.xs[id];
			}
		});

		return xValues;
	},

	/**
	 * Get index number based on given x Axis value
	 * @param {Date|Number|String} x x Axis to be compared
	 * @param {Array} basedX x Axis list to be based on
	 * @return {Number} index number
	 * @private
	 */
	getIndexByX(x, basedX) {
		const $$ = this;

		return basedX ?
			basedX.indexOf(isString(x) ? x : +x) :
			($$.filterByX($$.data.targets, x)[0] || {index: null}).index;
	},

	getXValue(id, i) {
		const $$ = this;

		return id in $$.data.xs &&
			$$.data.xs[id] &&
			isValue($$.data.xs[id][i]) ? $$.data.xs[id][i] : i;
	},

	getOtherTargetXs() {
		const $$ = this;
		const idsForX = Object.keys($$.data.xs);

		return idsForX.length ? $$.data.xs[idsForX[0]] : null;
	},

	getOtherTargetX(index) {
		const xs = this.getOtherTargetXs();

		return xs && index < xs.length ? xs[index] : null;
	},

	addXs(xs) {
		const $$ = this;

		Object.keys(xs).forEach(id => {
			$$.config.data_xs[id] = xs[id];
		});
	},

	isMultipleX() {
		return notEmpty(this.config.data_xs) ||
			!this.config.data_xSort ||
			this.hasType("bubble") ||
			this.hasType("scatter");
	},

	addName(data) {
		const $$ = this;
		let name;

		if (data) {
			name = $$.config.data_names[data.id];
			data.name = name !== undefined ? name : data.id;
		}

		return data;
	},

	getAllValuesOnIndex(index) {
		const $$ = this;

		return $$.filterTargetsToShow($$.data.targets)
			.map(t => $$.addName($$.getValueOnIndex(t.values, index)));
	},

	getValueOnIndex(values, index) {
		const valueOnIndex = values.filter(v => v.index === index);

		return valueOnIndex.length ? valueOnIndex[0] : null;
	},

	updateTargetX(targets, x) {
		const $$ = this;

		targets.forEach(t => {
			t.values.forEach((v, i) => {
				v.x = $$.generateTargetX(x[i], t.id, i);
			});

			$$.data.xs[t.id] = x;
		});
	},

	updateTargetXs(targets, xs) {
		const $$ = this;

		targets.forEach(t => {
			xs[t.id] && $$.updateTargetX([t], xs[t.id]);
		});
	},

	generateTargetX(rawX, id, index) {
		const $$ = this;
		let x = $$.isCategorized() ? index : (rawX || index);

		if ($$.isTimeSeries()) {
			x = rawX ? $$.parseDate(rawX) : $$.parseDate($$.getXValue(id, index));
		} else if ($$.isCustomX() && !$$.isCategorized()) {
			x = isValue(rawX) ? +rawX : $$.getXValue(id, index);
		}

		return x;
	},

	cloneTarget(target) {
		return {
			id: target.id,
			id_org: target.id_org,
			values: target.values.map(d => ({x: d.x, value: d.value, id: d.id}))
		};
	},

	updateXs(values) {
		if (values.length) {
			this.xs = values.map(v => v.x);
		}
	},

	getPrevX(i) {
		const x = this.xs[i - 1];

		return isDefined(x) ? x : null;
	},

	getNextX(i) {
		const x = this.xs[i + 1];

		return isDefined(x) ? x : null;
	},

	/**
	 * Get base value isAreaRangeType
	 * @param data Data object
	 * @return {Number}
	 * @private
	 */
	getBaseValue(data) {
		const $$ = this;
		let value = data.value;

		// In case of area-range, data is given as: [low, mid, high] or {low, mid, high}
		// will take the 'mid' as the base value
		if (value) {
			if ($$.isAreaRangeType(data)) {
				value = $$.getAreaRangeData(data, "mid");
			} else if ($$.isBubbleZType(data)) {
				value = $$.getBubbleZData(value, "y");
			}
		}
		return value;
	},

	/**
	 * Get min/max value from the data
	 * @private
	 * @param {Array} data array data to be evaluated
	 * @return {{min: {Number}, max: {Number}}}
	 */
	getMinMaxValue(data) {
		const getBaseValue = this.getBaseValue.bind(this);
		let min;
		let max;

		(data || this.data.targets.map(t => t.values))
			.forEach((v, i) => {
				const value = v.map(getBaseValue).filter(isNumber);

				min = Math.min(i ? min : Infinity, ...value);
				max = Math.max(i ? max : -Infinity, ...value);
			});

		return {min, max};
	},

	/**
	 * Get the min/max data
	 * @private
	 * @return {{min: Array, max: Array}}
	 */
	getMinMaxData() {
		const $$ = this;
		const cacheKey = "$minMaxData";
		let minMaxData = $$.getCache(cacheKey);

		if (!minMaxData) {
			const data = $$.data.targets.map(t => t.values);
			const minMax = $$.getMinMaxValue(data);

			let min = [];
			let max = [];

			data.forEach(v => {
				const minData = $$.getFilteredDataByValue(v, minMax.min);
				const maxData = $$.getFilteredDataByValue(v, minMax.max);

				if (minData.length) {
					min = min.concat(minData);
				}

				if (maxData.length) {
					max = max.concat(maxData);
				}
			});

			// update the cached data
			$$.addCache(cacheKey, minMaxData = {min, max});
		}

		return minMaxData;
	},

	/**
	 * Get sum of data per index
	 * @private
	 * @return {Array}
	 */
	getTotalPerIndex() {
		const $$ = this;
		const cacheKey = "$totalPerIndex";
		let sum = $$.getCache(cacheKey);

		if ($$.isStackNormalized() && !sum) {
			sum = [];

			$$.data.targets.forEach(row => {
				row.values.forEach((v, i) => {
					if (!sum[i]) {
						sum[i] = 0;
					}

					sum[i] += isNumber(v.value) ? v.value : 0;
				});
			});
		}

		return sum;
	},

	/**
	 * Get total data sum
	 * @return {Number}
 	 * @private
	 */
	getTotalDataSum() {
		const $$ = this;
		const cacheKey = "$totalDataSum";
		let totalDataSum = $$.getCache(cacheKey);

		if (!totalDataSum) {
			const total = mergeArray($$.data.targets.map(t => t.values))
				.map(v => v.value)
				.reduce((p, c) => p + c);

			$$.addCache(cacheKey, totalDataSum = total);
		}

		return totalDataSum;
	},

	/**
	 * Get filtered data by value
	 * @param {Object} data
	 * @param {Number} value
	 * @return {Array} filtered array data
	 * @private
	 */
	getFilteredDataByValue(data, value) {
		return data.filter(t => this.getBaseValue(t) === value);
	},

	/**
	 * Return the max length of the data
	 * @return {Number} max data length
	 * @private
	 */
	getMaxDataCount() {
		return Math.max(...this.data.targets.map(t => t.values.length));
	},

	getMaxDataCountTarget() {
		let target = this.filterTargetsToShow() || [];
		const length = target.length;

		if (length > 1) {
			target = target.map(t => t.values)
				.reduce((a, b) => a.concat(b))
				.map(v => v.x);

			target = sortValue(getUnique(target))
				.map((x, index) => ({x, index}));
		} else if (length) {
			target = target[0].values;
		}

		return target;
	},

	mapToIds(targets) {
		return targets.map(d => d.id);
	},

	mapToTargetIds(ids) {
		const $$ = this;

		return ids ? (isArray(ids) ? ids.concat() : [ids]) : $$.mapToIds($$.data.targets);
	},

	hasTarget(targets, id) {
		const ids = this.mapToIds(targets);

		for (let i = 0, val; (val = ids[i]); i++) {
			if (val === id) {
				return true;
			}
		}

		return false;
	},

	isTargetToShow(targetId) {
		return this.hiddenTargetIds.indexOf(targetId) < 0;
	},

	isLegendToShow(targetId) {
		return this.hiddenLegendIds.indexOf(targetId) < 0;
	},

	filterTargetsToShow(targets) {
		const $$ = this;

		return (targets || $$.data.targets).filter(t => $$.isTargetToShow(t.id));
	},

	mapTargetsToUniqueXs(targets) {
		const $$ = this;
		let xs = [];

		if (targets && targets.length) {
			xs = getUnique(
				mergeArray(targets.map(t => t.values.map(v => +v.x)))
			);

			xs = $$.isTimeSeries() ? xs.map(x => new Date(+x)) : xs.map(x => +x);
		}

		return sortValue(xs);
	},

	addHiddenTargetIds(targetIds) {
		this.hiddenTargetIds = this.hiddenTargetIds.concat(targetIds);
	},

	removeHiddenTargetIds(targetIds) {
		this.hiddenTargetIds = this.hiddenTargetIds.filter(id => targetIds.indexOf(id) < 0);
	},

	addHiddenLegendIds(targetIds) {
		this.hiddenLegendIds = this.hiddenLegendIds.concat(targetIds);
	},

	removeHiddenLegendIds(targetIds) {
		this.hiddenLegendIds = this.hiddenLegendIds.filter(id => targetIds.indexOf(id) < 0);
	},

	getValuesAsIdKeyed(targets) {
		const $$ = this;
		const ys = {};
		const isMultipleX = $$.isMultipleX();
		const xs = isMultipleX ? $$.mapTargetsToUniqueXs(targets)
			.map(v => (isString(v) ? v : +v)) : null;

		targets.forEach(t => {
			const data = [];

			t.values.forEach(v => {
				const value = v.value;

				if (isArray(value)) {
					data.push(...value);
				} else if (isObject(value) && "high" in value) {
					data.push(...Object.values(value));
				} else if ($$.isBubbleZType(v)) {
					data.push($$.getBubbleZData(value, "y"));
				} else {
					if (isMultipleX) {
						data[$$.getIndexByX(v.x, xs)] = value;
					} else {
						data.push(value);
					}
				}
			});

			ys[t.id] = data;
		});

		return ys;
	},

	checkValueInTargets(targets, checker) {
		const ids = Object.keys(targets);
		let values;

		for (let i = 0; i < ids.length; i++) {
			values = targets[ids[i]].values;

			for (let j = 0; j < values.length; j++) {
				if (checker(values[j].value)) {
					return true;
				}
			}
		}

		return false;
	},

	hasMultiTargets() {
		return this.filterTargetsToShow().length > 1;
	},

	hasNegativeValueInTargets(targets) {
		return this.checkValueInTargets(targets, v => v < 0);
	},

	hasPositiveValueInTargets(targets) {
		return this.checkValueInTargets(targets, v => v > 0);
	},

	_checkOrder(type) {
		const config = this.config;
		const order = config.data_order;

		return isString(order) && order.toLowerCase() === type;
	},

	isOrderDesc() {
		return this._checkOrder("desc");
	},

	isOrderAsc() {
		return this._checkOrder("asc");
	},

	/**
	 * Sort targets data
	 * @param {Array} targetsValue
	 * @return {Array}
	 * @private
	 */
	orderTargets(targetsValue) {
		const $$ = this;
		const config = $$.config;
		const targets = [...targetsValue];
		const orderAsc = $$.isOrderAsc();
		const orderDesc = $$.isOrderDesc();

		if (orderAsc || orderDesc) {
			targets.sort((t1, t2) => {
				const reducer = (p, c) => p + Math.abs(c.value);
				const t1Sum = t1.values.reduce(reducer, 0);
				const t2Sum = t2.values.reduce(reducer, 0);

				return orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum;
			});
		} else if (isFunction(config.data_order)) {
			targets.sort(config.data_order);
		} // TODO: accept name array for order

		return targets;
	},

	filterByX(targets, x) {
		return mergeArray(targets.map(t => t.values)).filter(v => v.x - x === 0);
	},

	filterRemoveNull(data) {
		return data.filter(d => isValue(this.getBaseValue(d)));
	},

	filterByXDomain(targets, xDomain) {
		return targets.map(t => ({
			id: t.id,
			id_org: t.id_org,
			values: t.values.filter(v => xDomain[0] <= v.x && v.x <= xDomain[1])
		}));
	},

	hasDataLabel() {
		const dataLabels = this.config.data_labels;

		return (isBoolean(dataLabels) && dataLabels) ||
			(isObjectType(dataLabels) && notEmpty(dataLabels));
	},

	getDataLabelLength(min, max, key) {
		const $$ = this;
		const lengths = [0, 0];
		const paddingCoef = 1.3;

		$$.selectChart.select("svg").selectAll(".dummy")
			.data([min, max])
			.enter()
			.append("text")
			.text(d => $$.dataLabelFormat(d.id)(d))
			.each(function(d, i) {
				lengths[i] = this.getBoundingClientRect()[key] * paddingCoef;
			})
			.remove();

		return lengths;
	},

	isNoneArc(d) {
		return this.hasTarget(this.data.targets, d.id);
	},

	isArc(d) {
		return "data" in d && this.hasTarget(this.data.targets, d.data.id);
	},

	findSameXOfValues(values, index) {
		const targetX = values[index].x;
		const sames = [];
		let i;

		for (i = index - 1; i >= 0; i--) {
			if (targetX !== values[i].x) {
				break;
			}

			sames.push(values[i]);
		}

		for (i = index; i < values.length; i++) {
			if (targetX !== values[i].x) {
				break;
			}

			sames.push(values[i]);
		}

		return sames;
	},

	findClosestFromTargets(targets, pos) {
		const $$ = this;
		const candidates = targets.map(target => $$.findClosest(target.values, pos)); // map to array of closest points of each target

		// decide closest point and return
		return $$.findClosest(candidates, pos);
	},

	findClosest(values, pos) {
		const $$ = this;
		const data = values.filter(v => v && isValue(v.value));
		let minDist = $$.config.point_sensitivity;
		let closest;

		// find mouseovering bar
		data
			.filter(v => $$.isBarType(v.id))
			.forEach(v => {
				const shape = $$.main.select(`.${CLASS.bars}${$$.getTargetSelectorSuffix(v.id)} .${CLASS.bar}-${v.index}`).node();

				if (!closest && $$.isWithinBar(shape)) {
					closest = v;
				}
			});

		// find closest point from non-bar
		data
			.filter(v => !$$.isBarType(v.id))
			.forEach(v => {
				const d = $$.dist(v, pos);

				if (d < minDist) {
					minDist = d;
					closest = v;
				}
			});

		return closest;
	},

	dist(data, pos) {
		const $$ = this;
		const isRotated = $$.config.axis_rotated;

		const xIndex = isRotated ? 1 : 0;
		const yIndex = isRotated ? 0 : 1;
		const y = $$.circleY(data, data.index);
		const x = ($$.zoomScale || $$.x)(data.x);

		return Math.sqrt(Math.pow(x - pos[xIndex], 2) + Math.pow(y - pos[yIndex], 2));
	},

	/**
	 * Convert data for step type
	 * @param {Array} values Object data values
	 * @return {Array}
	 * @private
	 */
	convertValuesToStep(values) {
		const $$ = this;
		const config = $$.config;

		const isRotated = config.axis_rotated;
		const stepType = config.line_step_type;
		const isCategorized = $$.isCategorized();

		const converted = isArray(values) ? values.concat() : [values];

		if (!isRotated && !isCategorized) {
			return values;
		}

		// insert & append cloning first/last value to be fully rendered covering on each gap sides
		const id = converted[0].id;

		// insert
		let x = converted[0].x - 1;
		let value = converted[0].value;

		isCategorized && converted.unshift({x, value, id});

		stepType === "step-after" &&
			converted.unshift({x: x - 1, value, id});

		// append
		x = converted.length - 1;
		value = converted[x].value;

		isCategorized && converted.push({x, value, id});

		stepType === "step-before" &&
			converted.push({x: x + 1, value, id});

		return converted;
	},

	convertValuesToRange(values) {
		const converted = isArray(values) ? values.concat() : [values];
		const ranges = [];

		converted.forEach(range => {
			const {x, id} = range;

			ranges.push({
				x,
				id,
				value: range.value[0]
			});

			ranges.push({
				x,
				id,
				value: range.value[2]
			});
		});

		return ranges;
	},

	updateDataAttributes(name, attrs) {
		const $$ = this;
		const config = $$.config;
		const current = config[`data_${name}`];

		if (isUndefined(attrs)) {
			return current;
		}

		Object.keys(attrs).forEach(id => {
			current[id] = attrs[id];
		});

		$$.redraw({withLegend: true});

		return current;
	},

	getAreaRangeData(d, type) {
		const value = d.value;

		if (isArray(value)) {
			const index = ["high", "mid", "low"].indexOf(type);

			return index === -1 ? null : value[index];
		}

		return value[type];
	},

	/**
	 * Get ratio value
	 * @param {String} type Ratio for given type
	 * @param {Object} d Data value object
	 * @param {Boolean} asPercent Convert the return as percent or not
	 * @return {Number} Ratio value
	 * @private
	 */
	getRatio(type, d, asPercent) {
		const $$ = this;
		const config = $$.config;
		const api = $$.api;
		let ratio = 0;

		if (d && api.data.shown.call(api).length) {
			const dataValues = api.data.values.bind(api);

			ratio = d.ratio || d.value;

			if (type === "arc") {
				// if has padAngle set, calculate rate based on value
				if ($$.pie.padAngle()()) {
					let total = $$.getTotalDataSum();

					if ($$.hiddenTargetIds.length) {
						total -= dataValues($$.hiddenTargetIds).reduce((p, c) => p + c);
					}

					ratio = d.value / total;

					// otherwise, based on the rendered angle value
				} else {
					ratio = (d.endAngle - d.startAngle) / (
						Math.PI * ($$.hasType("gauge") && !config.gauge_fullCircle ? 1 : 2)
					);
				}
			} else if (type === "index") {
				let total = this.getTotalPerIndex();

				if ($$.hiddenTargetIds.length) {
					let hiddenSum = dataValues($$.hiddenTargetIds, false);

					if (hiddenSum.length) {
						hiddenSum = hiddenSum
							.reduce((acc, curr) => acc.map((v, i) => (isNumber(v) ? v : 0) + curr[i]));

						total = total.map((v, i) => v - hiddenSum[i]);
					}
				}

				d.ratio = isNumber(d.value) && total && total[d.index] > 0 ?
					d.value / total[d.index] : 0;

				ratio = d.ratio;
			} else if (type === "radar") {
				ratio = (parseFloat(Math.max(d.value, 0)) / $$.maxValue) * config.radar_size_ratio;
			}
		}

		return asPercent && ratio ? ratio * 100 : ratio;
	},

	/**
	 * Sort data index to be aligned with x axis.
	 * @param {Array} tickValues Tick array values
	 * @private
	 */
	updateDataIndexByX(tickValues) {
		const $$ = this;

		const tickValueMap = tickValues.reduce((out, tick, index) => {
			out[Number(tick.x)] = index;
			return out;
		}, {});

		$$.data.targets.forEach(t => {
			t.values.forEach((value, valueIndex) => {
				let index = tickValueMap[Number(value.x)];

				if (index === undefined) {
					index = valueIndex;
				}
				value.index = index;
			});
		});
	}
});
