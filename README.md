# `yarn-plugin-after-install`

This is a Yarn v4 plugin that adds support for an `afterInstall` hook that runs after _every_ `yarn install`,
regardless of whether dependencies have changed.

For Yarn v3 support, install [v0.5.0](https://github.com/mhassan1/yarn-plugin-after-install/tree/v0.5.0) or earlier.

Inspired by https://github.com/GravitywellUK/yarn-plugin-postinstall.

## Install

```
yarn plugin import https://raw.githubusercontent.com/mhassan1/yarn-plugin-after-install/v0.7.0/bundles/@yarnpkg/plugin-after-install.js
```

## Usage

1. Add an `afterInstall` hook in `.yarnrc.yml`:
```yaml
# .yarnrc.yml

afterInstall: do-something-awesome
```
The script will run relative to the project directory (containing `.yarnrc.yml`).

The script will be passed an environment variable (`_YARN_PLUGIN_AFTER_INSTALL_COMMAND_ARGV`) that contains a JSON array of arguments passed to `yarn` in the original command (for example, if the user runs `yarn install`, the script will be passed `_YARN_PLUGIN_AFTER_INSTALL_COMMAND_ARGV=["install"]`).

2. Run `yarn`.

## Testing

`yarn test`

NOTE: Integration tests require `yarn build` first.

## Publishing

`npm version <version>`

## License

MIT
