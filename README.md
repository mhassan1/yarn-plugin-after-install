# `yarn-plugin-after-install`

This is a Yarn v4 plugin that adds support for an `afterInstall` hook that runs after _every_ `yarn install`,
regardless of whether dependencies have changed.

For Yarn v3 support, install [v0.5.0](https://github.com/mhassan1/yarn-plugin-after-install/tree/v0.5.0) or earlier.

Inspired by https://github.com/GravitywellUK/yarn-plugin-postinstall.

## Install

```
yarn plugin import https://raw.githubusercontent.com/mhassan1/yarn-plugin-after-install/v0.6.0/bundles/@yarnpkg/plugin-after-install.js
```

## Usage

1. Add an `afterInstall` hook in `.yarnrc.yml`:
```yaml
# .yarnrc.yml

afterInstall: do-something-awesome
# Optional, defaults to "always". 
#   Can also be "persist-only" to skip running when on `yarn workspaces focus <workspace-name>` installations
afterInstallMode: always
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
