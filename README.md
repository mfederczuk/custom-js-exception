# Custom JavaScript Exception #

[version_shield]: https://img.shields.io/badge/version-N%2FA-blue.svg
[latest_release]: https://github.com/mfederczuk/custom-js-exception/releases/latest "Latest Release"
[![version: N/A][version_shield]][latest_release]
[![Changelog](https://img.shields.io/badge/-Changelog-blue)](./CHANGELOG.md "Changelog")

## About ##

A custom **JavaScript** exception class.

## Download ##

Using **npm**:

```sh
npm i @mfederczuk/custom-js-exception
```

Using **Yarn**:

```sh
yarn add @mfederczuk/custom-js-exception
```

## Usage ##

Just extend the [`Exception`](src/index.ts#L22) class and call the super
 constructor from yours.  
It's a good idea to have an optional `cause` parameter that you pass to the
 super constructor call as well.

```ts
import Exception from "@mfederczuk/custom-exception";

class CustomException extends Exception {
	constructor(readonly n: number, cause: (Exception | Error | null) = null) {
		super(`custom message ${n}`, cause);
	}
}

throw new CustomException(12);
```

## Contributing ##

Read through the [Custom JavaScript Exception Contribution Guidelines](./CONTRIBUTING.md)
 if you want to contribute to this project.

## License ##

[GNU GPLv3+](./LICENSE)
