/*
 * Custom JavaScript Exception class.
 * Copyright (C) 2020 Michael Federczuk
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Exception from "./Exception";
import NoImplementationException from "./NoImplementationException";

export default class OutOfRangeException extends Exception {
	readonly index: (number | null);
	readonly rangeStart: (number | null);
	readonly rangeEnd: (number | null);

	constructor(message?: (string | null),
	            cause?: (Exception | Error | null));
	constructor(message: (string | null | undefined),
	            index: number,
	            rangeStart: number,
	            rangeEnd: number,
	            cause?: (Exception | Error | null));
	constructor(message?: (string | null | undefined),
	            causeOrIndex?: ((Exception | Error | null) | (number)),
	            rangeStart?: number,
	            rangeEnd?: number,
	            cause?: (Exception | Error | null)) {
		super(message, ((typeof(causeOrIndex) === "undefined" ||
		                 causeOrIndex instanceof Exception ||
		                 causeOrIndex instanceof Error ||
		                 causeOrIndex === null) ? causeOrIndex : cause));

		if((typeof(message) === "undefined" ||
		    typeof(message) === "string" ||
		    message === null) &&
		   (typeof(causeOrIndex) === "undefined" ||
		    causeOrIndex instanceof Exception ||
		    causeOrIndex instanceof Error ||
		    causeOrIndex === null) &&
		   typeof(rangeStart) === "undefined" &&
		   typeof(rangeEnd) === "undefined" &&
		   (typeof(cause) === "undefined" ||
		    cause instanceof Exception ||
		    cause instanceof Error ||
		    cause === null)) {

			this.index = null;
			this.rangeStart = null;
			this.rangeEnd = null;
		} else if((typeof(message) === "string" ||
		           message === null ||
		           typeof(message) === "undefined") &&
		          typeof(causeOrIndex) === "number" &&
		          typeof(rangeStart) === "number" &&
		          typeof(rangeEnd) === "number" &&
		          (typeof(cause) === "undefined" ||
		           cause instanceof Exception ||
		           cause instanceof Error ||
		           cause === null)) {

			this.index = causeOrIndex;
			this.rangeStart = rangeStart;
			this.rangeEnd = rangeEnd;
		} else {
			throw new NoImplementationException();
		}
	}
}
