/*
 * Copyright (c) 2020 Michael Federczuk
 * SPDX-License-Identifier: MPL-2.0 AND Apache-2.0
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
