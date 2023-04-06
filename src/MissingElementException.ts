// SPDX-License-Identifier: CC0-1.0

import Exception from "./Exception";

export default class MissingElementException extends Exception {

	constructor(
		message: (string | null) = null,
		cause: (Exception | Error | null) = null,
	) {
		super(message, cause);
	}
}
