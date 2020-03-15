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

	toString(): string {
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
		exc.stack = err.stack;
		return exc;
	}
}
