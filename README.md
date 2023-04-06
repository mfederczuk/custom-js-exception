<!--
  Copyright (c) 2023 Michael Federczuk
  SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Custom JavaScript Exception #

[version_shield]: https://img.shields.io/badge/version-1.4.0-informational.svg
[release_page]: https://github.com/mfederczuk/custom-js-exception/releases/tag/v1.4.0 "Release v1.4.0"
[![version: 1.4.0][version_shield]][release_page]
[![Changelog](https://img.shields.io/badge/-Changelog-informational.svg)](CHANGELOG.md "Changelog")

## About ##

A custom **JavaScript** exception class.

## Usage ##

Just extend the [`Exception`](src/Exception.ts#L9) class and call the super constructor from yours.  
It's a good idea to have an optional `cause` parameter that you pass to the super constructor call as well.

```ts
import Exception from "@mfederczuk/custom-exception";

class CustomException extends Exception {
	constructor(readonly n: number, cause: (Exception | Error | null) = null) {
		super(`custom message ${n}`, cause);
	}
}

throw new CustomException(12);
```

## Installation ##

Using **npm**:

```sh
npm i @mfederczuk/custom-js-exception
```

Using **Yarn**:

```sh
yarn add @mfederczuk/custom-js-exception
```

## Contributing ##

Read through the [Contribution Guidelines](CONTRIBUTING.md) if you want to contribute to this project.

## License ##

**Custom JavaScript Exception** is licensed under both the [**Mozilla Public License 2.0**](LICENSES/MPL-2.0.txt) AND
the [**Apache License 2.0**](LICENSES/Apache-2.0.txt).  
For more information about copying and licensing, see the [`COPYING.txt`](COPYING.txt) file.
