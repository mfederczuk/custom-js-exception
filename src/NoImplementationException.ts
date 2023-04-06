// SPDX-License-Identifier: CC0-1.0

import Exception from "./Exception";

export default class NoImplementationException extends Exception {

	constructor() {
		super("No implementation");
	}
}
