// https://github.com/gf3/moment-range
/*
 This is free and unencumbered software released into the public domain.

 Anyone is free to copy, modify, publish, use, compile, sell, or
 distribute this software, either in source code form or as a compiled
 binary, for any purpose, commercial or non-commercial, and by any
 means.

 In jurisdictions that recognize copyright laws, the author or authors
 of this software dedicate any and all copyright interest in the
 software to the public domain. We make this dedication for the benefit
 of the public at large and to the detriment of our heirs and
 successors. We intend this dedication to be an overt act of
 relinquishment in perpetuity of all present and future rights to this
 software under copyright law.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.

 For more information, please refer to <http://unlicense.org/>

 */

/*
 modified to use steal.
 removed 'moment' variable checking for moment being defined, using require to load.
 removed function wrapper.
 removed module export for moment
 added ptype method "format"
 */
steal('moment', function (moment) {
	var DateRange;

	/**
	 * DateRange class to store ranges and query dates.
	 * @typedef {!Object}
	 *
	 */


	DateRange = (function () {
		/**
		 * DateRange instance.
		 * @param {(Moment|Date)} start Start of interval.
		 * @param {(Moment|Date)} end   End of interval.
		 * @constructor
		 *
		 */

		function DateRange(start, end) {
			this.start = start;
			this.end = end;
		}

		/**
		 * Determine if the current interval contains a given moment/date.
		 * @param {(Moment|Date)} moment Date to check.
		 * @return {!boolean}
		 *
		 */


		DateRange.prototype.contains = function (moment) {
			return (this.start <= moment && moment <= this.end);
		};

		DateRange.prototype._by_string = function (interval, hollaback) {
			var current, _results;
			current = moment(this.start);
			_results = [];
			while (this.contains(current)) {
				hollaback.call(this, current.clone());
				_results.push(current.add(interval, 1));
			}
			return _results;
		};

		DateRange.prototype._by_range = function (range_interval, hollaback) {
			var i, l, _i, _results;
			l = Math.round(this / range_interval);
			if (l === Infinity) {
				return this;
			}
			_results = [];
			for (i = _i = 0; 0 <= l ? _i <= l : _i >= l; i = 0 <= l ? ++_i : --_i) {
				_results.push(hollaback.call(this, moment(this.start.valueOf() + range_interval.valueOf() * i)));
			}
			return _results;
		};

		/**
		 * Determine if the current date range overlaps a given date range.
		 * @param {DateRange} range Date range to check.
		 * @return {!boolean}
		 *
		 */


		DateRange.prototype.overlaps = function (range) {
			return this.start < range.end && this.end > range.start;
		};

		/**
		 * Iterate over the date range by a given date range, executing a function
		 * for each sub-range.
		 * @param {!DateRange|String}        range     Date range to be used for iteration or shorthand string (shorthands: http://momentjs.com/docs/#/manipulating/add/)
		 * @param {!function(Moment)} hollaback Function to execute for each sub-range.
		 * @return {!boolean}
		 *
		 */


		DateRange.prototype.by = function (range, hollaback) {
			if (typeof range === 'string') {
				this._by_string(range, hollaback);
			} else {
				this._by_range(range, hollaback);
			}
			return this;
		};

		/**
		 * Date range in milliseconds. Allows basic coercion math of date ranges.
		 * @return {!number}
		 *
		 */


		DateRange.prototype.valueOf = function () {
			return this.end - this.start;
		};

		/**
		 * Date range formatted string output
		 * @param {String} [fmtString="MMM DD, YYYY"] formatting string
		 * @param {String} [separatorString=" - "] string to separate ranges with
		 * @return {String} formatted date string. Default format (no fmtString passed) is start(MMM DD)+end(DD, YYYY) if range is in same month, start(MMM DD)+end(MMM DD, YYYY), if ranges are in different months, or MMM DD, YYYY if ranges are in different years.
		 */
		DateRange.prototype.format = function (fmtString, separatorString) {
			//check if start and end date are in the same month
			var strDate, mStart, mEnd;

			mStart = moment(this.start);
			mEnd = moment(this.end);

			if(typeof separatorString === "undefined"){
				separatorString = " - ";
			}

			if(typeof fmtString === "undefined" || fmtString === null){
				fmtString = "MMM DD, YYYY";

				//default application behavior
				if (mStart.year() === mEnd.year()) {

					if (mStart.month() === mEnd.month()) {
						strDate = mStart.format("MMM DD") + separatorString + mEnd.format("DD, YYYY");
					} else {
						strDate = mStart.format("MMM DD") + separatorString + mEnd.format("MMM DD, YYYY");
					}
				}
			}

			if(typeof strDate === "undefined"){
				strDate = mStart.format(fmtString) + separatorString + mEnd.format(fmtString);
			}

			return strDate;
		}

		return DateRange;

	})();

	/**
	 * Build a date range.
	 * @param {(Moment|Date)} start Start of range.
	 * @param {(Moment|Date)} end   End of range.
	 * @this {Moment}
	 * @return {!DateRange}
	 *
	 */


	moment.fn.range = function (start, end) {
		return new DateRange(start, end);
	};

	/**
	 * Check if the current moment is within a given date range.
	 * @param {!DateRange} range Date range to check.
	 * @this {Moment}
	 * @return {!boolean}
	 *
	 */


	moment.fn.within = function (range) {
		return range.contains(this._d);
	};

});