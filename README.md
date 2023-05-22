# `yarn-plugin-after-install`

This is a Yarn v3 plugin that adds support for an `afterInstall` hook that runs after _every_ `yarn install`,
regardless of whether dependencies have changed.

Inspired by https://github.com/GravitywellUK/yarn-plugin-postinstall.

## Install

```
yarn plugin import https://raw.githubusercontent.com/mhassan1/yarn-plugin-after-install/v0.4.0/bundles/@yarnpkg/plugin-after-install.js
```

## Usage

1. Add an `afterInstall` hook in `.yarnrc.yml`:
```yaml
# .yarnrc.yml

afterInstall: do-something-awesome
```
The script will run relative to the project directory (containing `.yarnrc.yml`).

2. Run `yarn`.

## Testing

`yarn test`

NOTE: Integration tests require `yarn build` first.

## Publishing

`npm version <version>`

## License

MIT
