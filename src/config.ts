import { ConfigurationDefinitionMap, SettingsType } from '@yarnpkg/core'

// extend `.yarnrc.yml` to allow `afterInstall` key
declare module '@yarnpkg/core' {
  interface ConfigurationValueMap {
    afterInstall: string
    afterInstallMode: string
  }
}

// define `afterInstall` config as string
export const configuration: Partial<ConfigurationDefinitionMap> = {
  afterInstall: {
    description: 'Hook that will always run after install',
    type: SettingsType.STRING,
    default: ''
  },
  afterInstallMode: {
    description: 'Mode for the afterInstall hook. Can be "always" or "persist-only"',
    type: SettingsType.STRING,
    default: "always"
  }
}
