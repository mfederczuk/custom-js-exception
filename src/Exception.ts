/*
 * Copyright (c) 2020 Michael Federczuk
 * SPDX-License-Identifier: MPL-2.0 AND Apache-2.0
 */

/**
 * A exception class that can hold another exception as a cause.
 */
export default class Exception extends Error {
	private cause: (Exception | null);

	/**
	 * Constructs a new `Exception` instance.
	 *
	 * @param message
	 *        The detail message of the exception.
	 *
	 * @param cause
	 *        The cause of this exception.
	 */
	constructor(message: (string | null) = null,
		        cause: (Exception | Error | null) = null) {
		super(typeof(message) === "string" ? message : "");
		this.name = new.target.name;
		this.message = (typeof(message) === "string" ? message : "");

		Object.setPrototypeOf(this, new.target.prototype);

		if(cause instanceof Exception) {
			this.cause = cause;
		} else if(cause instanceof Error) {
			this.cause = Exception.fromError(cause);
		} else {
			this.cause = null;
		}

		Object.defineProperties(this, {
			"name": {
				enumerable: false,
				value: this.name
			},
			"cause": {
				enumerable: true,
				value: this.cause
			}
		});
	}

	getCause(): (Exception | null) {
		return this.cause;
	}

	/**
	 * Sets the cause of this exception only if it hasn't already been set.
	 *
	 * @param cause
	 *        The cause to set.
	 */
	initCause(cause: (Exception | Error)): void {
		if(this.cause !== null) {
			return;
		}

		if(cause instanceof Exception) {
			this.cause = cause;
		} else if(cause instanceof Error) {
			this.cause = Exception.fromError(cause);
		}
	}

	override toString(): string {
		if(this.message === "") return this.name;
		return `${this.name}: ${this.message}`;
	}
	toJSON(): object {
		const obj = {} as {
			[prop: string]: unknown;
		};

		Object.keys(this).forEach((key) => {
			obj[key] = this[key as keyof Exception];
		});

		["name", "message", "stack", "cause"].forEach((prop) => {
			delete obj[prop];
		});

		return {
			name: this.name,
			...obj,
			message: this.message,
			stack: this.stack,
			cause: this.cause
		};
	}

	/**
	 * Constructs a new `Exception` from an `Error` object.\
	 * The message, name and stack from the `Error` object will be copied over
	 * to the `Exception` instance.
	 *
	 * @param err
	 *        The `Error` instance to make to an `Exception` instance.
	 *
	 * @returns A new `Exception` instance.
	 */
	static fromError(err: Error): Exception {
		if(!(err instanceof Error)) {
			return new Exception();
		}

		const exc = new Exception(err.message);
		exc.name = err.name;

		if("stack" in err) {
			exc.stack = err.stack;
		} else {
			delete exc.stack;
		}

		return exc;
	}
}
