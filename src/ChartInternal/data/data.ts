/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$BAR, $CANDLESTICK, $COMMON} from "../../config/classes";
import {KEY} from "../../module/Cache";
import type {IData, IDataRow} from "./IData";
import {
	findIndex,
	getUnique,
	hasValue,
	isArray,
	isboolean,
	isDefined,
	isFunction,
	isNumber,
	isObject,
	isObjectType,
	isString,
	isUndefined,
	isValue,
	mergeArray,
	notEmpty,
	parseDate,
	sortValue
} from "../../module/util";

export default {
	isX(key) {
		const $$ = this;
		const {config} = $$;
		const dataKey = config.data_x && key === config.data_x;
		const existValue = notEmpty(config.data_xs) && hasValue(config.data_xs, key);

		return dataKey || existValue;
	},

	isNotX(key): boolean {
		return !this.isX(key);
	},

	isStackNormalized(): boolean {
		const {config} = this;

		return !!(config.data_stack_normalize && config.data_groups.length);
	},

	isGrouped(id) {
		const groups = this.config.data_groups;

		return id ?
			groups.some(v => v.indexOf(id) >= 0 && v.length > 1) :
			groups.length > 0;
	},

	getXKey(id) {
		const $$ = this;
		const {config} = $$;

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
	 * @param {Date|number|string} x x Axis to be compared
	 * @param {Array} basedX x Axis list to be based on
	 * @returns {number} index number
	 * @private
	 */
	getIndexByX(x: Date|number|string, basedX: (Date|number|string)[]): number {
		const $$ = this;

		return basedX ?
			basedX.indexOf(isString(x) ? x : +x) :
			($$.filterByX($$.data.targets, x)[0] || {index: null}).index;
	},

	getXValue(id: string, i: number): number {
		const $$ = this;

		return id in $$.data.xs &&
			$$.data.xs[id] &&
			isValue($$.data.xs[id][i]) ? $$.data.xs[id][i] : i;
	},

	getOtherTargetXs(): string | null {
		const $$ = this;
		const idsForX = Object.keys($$.data.xs);

		return idsForX.length ? $$.data.xs[idsForX[0]] : null;
	},

	getOtherTargetX(index: number): string | null {
		const xs = this.getOtherTargetXs();

		return xs && index < xs.length ? xs[index] : null;
	},

	addXs(xs): void {
		const $$ = this;
		const {config} = $$;

		Object.keys(xs).forEach(id => {
			config.data_xs[id] = xs[id];
		});
	},

	isMultipleX(): boolean {
		return notEmpty(this.config.data_xs) ||
			this.hasType("bubble") ||
			this.hasType("scatter");
	},

	addName(data) {
		const $$ = this;
		const {config} = $$;
		let name;

		if (data) {
			name = config.data_names[data.id];
			data.name = name !== undefined ? name : data.id;
		}

		return data;
	},

	/**
	 * Get all values on given index
	 * @param {number} index Index
	 * @param {boolean} filterNull Filter nullish value
	 * @returns {Array}
	 * @private
	 */
	getAllValuesOnIndex(index: number, filterNull = false) {
		const $$ = this;

		let value = $$.filterTargetsToShow($$.data.targets)
			.map(t => $$.addName($$.getValueOnIndex(t.values, index)));

		if (filterNull) {
			value = value.filter(v => v && "value" in v && isValue(v.value));
		}

		return value;
	},

	getValueOnIndex(values, index: number) {
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

	generateTargetX(rawX, id: string, index: number) {
		const $$ = this;
		const {axis} = $$;
		let x = axis?.isCategorized() ? index : (rawX || index);

		if (axis?.isTimeSeries()) {
			const fn = parseDate.bind($$);

			x = rawX ? fn(rawX) : fn($$.getXValue(id, index));
		} else if (axis?.isCustomX() && !axis?.isCategorized()) {
			x = isValue(rawX) ? +rawX : $$.getXValue(id, index);
		}

		return x;
	},

	updateXs(values): void {
		if (values.length) {
			this.axis.xs = values.map(v => v.x);
		}
	},

	getPrevX(i: number): number[] | null {
		const x = this.axis.xs[i - 1];

		return isDefined(x) ? x : null;
	},

	getNextX(i: number): number[] | null {
		const x = this.axis.xs[i + 1];

		return isDefined(x) ? x : null;
	},

	/**
	 * Get base value isAreaRangeType
	 * @param {object} data Data object
	 * @returns {number}
	 * @private
	 */
	getBaseValue(data): number {
		const $$ = this;
		const {hasAxis} = $$.state;
		let {value} = data;

		// In case of area-range, data is given as: [low, mid, high] or {low, mid, high}
		// will take the 'mid' as the base value
		if (value && hasAxis) {
			if ($$.isAreaRangeType(data)) {
				value = $$.getRangedData(data, "mid");
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
	 * @returns {{min: {number}, max: {number}}}
	 */
	getMinMaxValue(data): {min: number, max: number} {
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
	 * @returns {{min: Array, max: Array}}
	 */
	getMinMaxData(): {min: IDataRow[], max: IDataRow[]} {
		const $$ = this;
		const cacheKey = KEY.dataMinMax;
		let minMaxData = $$.cache.get(cacheKey);

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
			$$.cache.add(cacheKey, minMaxData = {min, max});
		}

		return minMaxData;
	},

	/**
	 * Get sum of data per index
	 * @private
	 * @returns {Array}
	 */
	getTotalPerIndex() {
		const $$ = this;
		const cacheKey = KEY.dataTotalPerIndex;
		let sum = $$.cache.get(cacheKey);

		if (($$.config.data_groups.length || $$.isStackNormalized()) && !sum) {
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
	 * @param {boolean} subtractHidden Subtract hidden data from total
	 * @returns {number}
	 * @private
	 */
	getTotalDataSum(subtractHidden) {
		const $$ = this;
		const cacheKey = KEY.dataTotalSum;
		let total = $$.cache.get(cacheKey);

		if (!isNumber(total)) {
			const sum = mergeArray($$.data.targets.map(t => t.values))
				.map(v => v.value);

			total = sum.length ? sum.reduce((p, c) => p + c) : 0;

			$$.cache.add(cacheKey, total);
		}

		if (subtractHidden) {
			total -= $$.getHiddenTotalDataSum();
		}

		return total;
	},

	/**
	 * Get total hidden data sum
	 * @returns {number}
	 * @private
	 */
	getHiddenTotalDataSum() {
		const $$ = this;
		const {api, state: {hiddenTargetIds}} = $$;
		let total = 0;

		if (hiddenTargetIds.length) {
			total = api.data.values.bind(api)(hiddenTargetIds)
				.reduce((p, c) => p + c);
		}

		return total;
	},

	/**
	 * Get filtered data by value
	 * @param {object} data Data
	 * @param {number} value Value to be filtered
	 * @returns {Array} filtered array data
	 * @private
	 */
	getFilteredDataByValue(data, value) {
		return data.filter(t => this.getBaseValue(t) === value);
	},

	/**
	 * Return the max length of the data
	 * @returns {number} max data length
	 * @private
	 */
	getMaxDataCount(): number {
		return Math.max(...this.data.targets.map(t => t.values.length));
	},

	getMaxDataCountTarget() {
		let target = this.filterTargetsToShow() || [];
		const length = target.length;
		const isInverted = this.config.axis_x_inverted;

		if (length > 1) {
			target = target.map(t => t.values)
				.reduce((a, b) => a.concat(b))
				.map(v => v.x);

			target = sortValue(getUnique(target))
				.map((x, index, array) => ({x, index: isInverted ? array.length - index - 1 : index}));
		} else if (length) {
			target = target[0].values.concat();
		}

		return target;
	},

	mapToIds(targets): string[] {
		return targets.map(d => d.id);
	},

	mapToTargetIds(ids) {
		const $$ = this;

		return ids ? (isArray(ids) ? ids.concat() : [ids]) : $$.mapToIds($$.data.targets);
	},

	hasTarget(targets, id): boolean {
		const ids = this.mapToIds(targets);

		for (let i = 0, val; (val = ids[i]); i++) {
			if (val === id) {
				return true;
			}
		}

		return false;
	},

	isTargetToShow(targetId): boolean {
		return this.state.hiddenTargetIds.indexOf(targetId) < 0;
	},

	isLegendToShow(targetId): boolean {
		return this.state.hiddenLegendIds.indexOf(targetId) < 0;
	},

	filterTargetsToShow(targets) {
		const $$ = this;

		return (targets || $$.data.targets).filter(t => $$.isTargetToShow(t.id));
	},

	mapTargetsToUniqueXs(targets) {
		const $$ = this;
		const {axis} = $$;
		let xs: any[] = [];

		if (targets?.length) {
			xs = getUnique(
				mergeArray(targets.map(t => t.values.map(v => +v.x)))
			);

			xs = axis?.isTimeSeries() ? xs.map(x => new Date(+x)) : xs.map(Number);
		}

		return sortValue(xs);
	},

	/**
	 * Add to the state target Ids
	 * @param {string} type State's prop name
	 * @param {Array|string} targetIds Target ids array
	 * @private
	 */
	addTargetIds(type: string, targetIds: string[] | string): void {
		const {state} = this;
		const ids = (isArray(targetIds) ? targetIds : [targetIds]) as [];

		ids.forEach(v => {
			state[type].indexOf(v) < 0 &&
				state[type].push(v);
		});
	},

	/**
	 * Remove from the state target Ids
	 * @param {string} type State's prop name
	 * @param {Array|string} targetIds Target ids array
	 * @private
	 */
	removeTargetIds(type: string, targetIds: string[] | string): void {
		const {state} = this;
		const ids = (isArray(targetIds) ? targetIds : [targetIds]) as [];

		ids.forEach(v => {
			const index = state[type].indexOf(v);

			index >= 0 && state[type].splice(index, 1);
		});
	},

	addHiddenTargetIds(targetIds: string[]): void {
		this.addTargetIds("hiddenTargetIds", targetIds);
	},

	removeHiddenTargetIds(targetIds: string[]): void {
		this.removeTargetIds("hiddenTargetIds", targetIds);
	},

	addHiddenLegendIds(targetIds: string[]): void {
		this.addTargetIds("hiddenLegendIds", targetIds);
	},

	removeHiddenLegendIds(targetIds: string[]): void {
		this.removeTargetIds("hiddenLegendIds", targetIds);
	},

	getValuesAsIdKeyed(targets) {
		const $$ = this;
		const {hasAxis} = $$.state;
		const ys = {};
		const isMultipleX = $$.isMultipleX();
		const xs = isMultipleX ? $$.mapTargetsToUniqueXs(targets)
			.map(v => (isString(v) ? v : +v)) : null;

		targets.forEach(t => {
			const data: any[] = [];

			t.values
				.filter(({value}) => isValue(value) || value === null)
				.forEach(v => {
					let {value} = v;

					// exclude 'volume' value to correct mis domain calculation
					if (value !== null && $$.isCandlestickType(v)) {
						value = isArray(value) ? value.slice(0, 4) : [value.open, value.high, value.low, value.close];
					}

					if (isArray(value)) {
						data.push(...value);
					} else if (isObject(value) && "high" in value) {
						data.push(...Object.values(value));
					} else if ($$.isBubbleZType(v)) {
						data.push(hasAxis && $$.getBubbleZData(value, "y"));
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

	checkValueInTargets(targets, checker: Function): boolean {
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

	hasMultiTargets(): boolean {
		return this.filterTargetsToShow().length > 1;
	},

	hasNegativeValueInTargets(targets): boolean {
		return this.checkValueInTargets(targets, v => v < 0);
	},

	hasPositiveValueInTargets(targets): boolean {
		return this.checkValueInTargets(targets, v => v > 0);
	},

	/**
	 * Sort targets data
	 * Note: For stacked bar, will sort from the total sum of data series, not for each stacked bar
	 * @param {Array} targetsValue Target value
	 * @returns {Array}
	 * @private
	 */
	orderTargets(targetsValue: IData[]): IData[] {
		const $$ = this;
		const targets = [...targetsValue];
		const fn = $$.getSortCompareFn();

		fn && targets.sort(fn);

		return targets;
	},

	/**
	 * Get data.order compare function
	 * @param {boolean} isReversed for Arc & Treemap type sort order needs to be reversed
	 * @returns {Function} compare function
	 * @private
	 */
	getSortCompareFn(isReversed = false): Function | null {
		const $$ = this;
		const {config} = $$;
		const order = config.data_order;
		const orderAsc = /asc/i.test(order);
		const orderDesc = /desc/i.test(order);
		let fn;

		if (orderAsc || orderDesc) {
			const reducer = (p, c) => p + Math.abs(c.value);

			fn = (t1: IData | IDataRow, t2: IData | IDataRow) => {
				const t1Sum = "values" in t1 ? t1.values.reduce(reducer, 0) : t1.value;
				const t2Sum = "values" in t2 ? t2.values.reduce(reducer, 0) : t2.value;

				return isReversed ?
					(orderAsc ? t1Sum - t2Sum : t2Sum - t1Sum) :
					(orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum);
			};
		} else if (isFunction(order)) {
			fn = order.bind($$.api);
		}

		return fn || null;
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

		return (isboolean(dataLabels) && dataLabels) ||
			(isObjectType(dataLabels) && notEmpty(dataLabels));
	},

	/**
	 * Get data index from the event coodinates
	 * @param {Event} event Event object
	 * @returns {number}
	 */
	getDataIndexFromEvent(event): number {
		const $$ = this;
		const {config, state: {inputType, eventReceiver: {coords, rect}}} = $$;
		const isRotated = config.axis_rotated;

		// get data based on the mouse coords
		const e = inputType === "touch" && event.changedTouches ? event.changedTouches[0] : event;
		const index = findIndex(
			coords,
			isRotated ? e.clientY - rect.top : e.clientX - rect.left,
			0,
			coords.length - 1,
			isRotated
		);

		return index;
	},

	getDataLabelLength(min, max, key) {
		const $$ = this;
		const lengths = [0, 0];
		const paddingCoef = 1.3;

		$$.$el.chart.select("svg").selectAll(".dummy")
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
		const sames: any[] = [];
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

	findClosestFromTargets(targets, pos): IDataRow | undefined {
		const $$ = this;
		const candidates = targets.map(target => $$.findClosest(target.values, pos)); // map to array of closest points of each target

		// decide closest point and return
		return $$.findClosest(candidates, pos);
	},

	findClosest(values, pos): IDataRow | undefined {
		const $$ = this;
		const {config, $el: {main}} = $$;
		const data = values.filter(v => v && isValue(v.value));
		let minDist = config.point_sensitivity;
		let closest;

		// find mouseovering bar/candlestick
		// https://github.com/naver/billboard.js/issues/2434
		data
			.filter(v => $$.isBarType(v.id) || $$.isCandlestickType(v.id))
			.forEach(v => {
				const selector = $$.isBarType(v.id) ?
					`.${$BAR.chartBar}.${$COMMON.target}${$$.getTargetSelectorSuffix(v.id)} .${$BAR.bar}-${v.index}` :
					`.${$CANDLESTICK.chartCandlestick}.${$COMMON.target}${$$.getTargetSelectorSuffix(v.id)} .${$CANDLESTICK.candlestick}-${v.index} path`;

				if (!closest && $$.isWithinBar(main.select(selector).node())) {
					closest = v;
				}
			});

		// find closest point from non-bar/candlestick
		data
			.filter(v => !$$.isBarType(v.id) && !$$.isCandlestickType(v.id))
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
		const {config: {axis_rotated: isRotated}, scale} = $$;
		const xIndex = isRotated ? 1 : 0;
		const yIndex = isRotated ? 0 : 1;
		const y = $$.circleY(data, data.index);
		const x = (scale.zoom || scale.x)(data.x);

		return Math.sqrt(Math.pow(x - pos[xIndex], 2) + Math.pow(y - pos[yIndex], 2));
	},

	/**
	 * Convert data for step type
	 * @param {Array} values Object data values
	 * @returns {Array}
	 * @private
	 */
	convertValuesToStep(values) {
		const $$ = this;
		const {axis, config} = $$;
		const stepType = config.line_step_type;
		const isCategorized = axis ? axis.isCategorized() : false;
		const converted = isArray(values) ? values.concat() : [values];

		if (!(isCategorized || /step\-(after|before)/.test(stepType))) {
			return values;
		}

		// when all datas are null, return empty array
		// https://github.com/naver/billboard.js/issues/3124
		if (converted.length) {
			// insert & append cloning first/last value to be fully rendered covering on each gap sides
			const head = converted[0];
			const tail = converted[converted.length - 1];
			const {id} = head;
			let {x} = head;

			// insert head
			converted.unshift({x: --x, value: head.value, id});

			isCategorized && stepType === "step-after" &&
				converted.unshift({x: --x, value: head.value, id});

			// append tail
			x = tail.x;
			converted.push({x: ++x, value: tail.value, id});

			isCategorized && stepType === "step-before" &&
				converted.push({x: ++x, value: tail.value, id});
		}

		return converted;
	},

	convertValuesToRange(values) {
		const converted = isArray(values) ? values.concat() : [values];
		const ranges: {x: string | number, id: string, value: number}[] = [];

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
		const {config} = $$;
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

	getRangedData(d, key = "", type = "areaRange"): number | undefined {
		const value = d?.value;

		if (isArray(value)) {
			// @ts-ignore
			const index = {
				areaRange: ["high", "mid", "low"],
				candlestick: ["open", "high", "low", "close", "volume"]
			}[type].indexOf(key);

			return index >= 0 && value ? value[index] : undefined;
		} else if (value) {
			return value[key];
		}

		return value;
	},

	/**
	 * Set ratio for grouped data
	 * @param {Array} data Data array
	 * @private
	 */
	setRatioForGroupedData(data: (IDataRow | IData)[]): void {
		const $$ = this;
		const {config} = $$;

		// calculate ratio if grouped data exists
		if (config.data_groups.length && data.some(d => $$.isGrouped(d.id))) {
			const setter = (d: IDataRow) => $$.getRatio("index", d, true);

			data.forEach(v => {
				"values" in v ? v.values.forEach(setter) : setter(v);
			});
		}
	},

	/**
	 * Get ratio value
	 * @param {string} type Ratio for given type
	 * @param {object} d Data value object
	 * @param {boolean} asPercent Convert the return as percent or not
	 * @returns {number} Ratio value
	 * @private
	 */
	getRatio(type: string, d, asPercent = false): number {
		const $$ = this;
		const {config, state} = $$;
		const api = $$.api;
		let ratio = 0;

		if (d && api.data.shown().length) {
			ratio = d.ratio || d.value;

			if (type === "arc") {
				// if has padAngle set, calculate rate based on value
				if ($$.pie.padAngle()()) {
					ratio = d.value / $$.getTotalDataSum(true);

					// otherwise, based on the rendered angle value
				} else {
					const gaugeArcLength = config.gauge_fullCircle ? $$.getArcLength() : $$.getStartAngle() * -2;
					const arcLength = $$.hasType("gauge") ? gaugeArcLength : Math.PI * 2;

					ratio = (d.endAngle - d.startAngle) / arcLength;
				}
			} else if (type === "index") {
				const dataValues = api.data.values.bind(api);
				let total = this.getTotalPerIndex();

				if (state.hiddenTargetIds.length) {
					let hiddenSum = dataValues(state.hiddenTargetIds, false);

					if (hiddenSum.length) {
						hiddenSum = hiddenSum
							.reduce((acc, curr) => acc.map((v, i) => (isNumber(v) ? v : 0) + curr[i]));

						total = total.map((v, i) => v - hiddenSum[i]);
					}
				}

				const divisor = total[d.index];

				d.ratio = isNumber(d.value) && total && divisor ?
					d.value / divisor : 0;

				ratio = d.ratio;
			} else if (type === "radar") {
				ratio = (
					parseFloat(String(Math.max(d.value, 0))) / state.current.dataMax
				) * config.radar_size_ratio;
			} else if (type === "bar") {
				const yScale = $$.getYScaleById.bind($$)(d.id);
				const max = yScale.domain().reduce((a, c) => c - a);

				// when all data are 0, return 0
				ratio = max === 0 ? 0 : Math.abs(d.value) / max;
			} else if (type === "treemap") {
				ratio /= $$.getTotalDataSum(true);
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
	},

	/**
	 * Determine if bubble has dimension data
	 * @param {object|Array} d data value
	 * @returns {boolean}
	 * @private
	 */
	isBubbleZType(d): boolean {
		const $$ = this;

		return $$.isBubbleType(d) && (
			(isObject(d.value) && ("z" in d.value || "y" in d.value)) ||
			(isArray(d.value) && d.value.length >= 2)
		);
	},

	/**
	 * Determine if bar has ranged data
	 * @param {Array} d data value
	 * @returns {boolean}
	 * @private
	 */
	isBarRangeType(d): boolean {
		const $$ = this;
		const {value} = d;

		return $$.isBarType(d) && isArray(value) && value.length >= 2 && value.every(v => isNumber(v));
	},

	/**
	 * Get data object by id
	 * @param {string} id data id
	 * @returns {object}
	 * @private
	 */
	getDataById(id: string) {
		const d = this.cache.get(id) || this.api.data(id);

		return d?.[0] ?? d;
	}
};
