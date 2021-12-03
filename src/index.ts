import { Plugin, Project } from '@yarnpkg/core'
import { configuration } from './config'
import { AfterInstallCommand } from './commands/afterInstall'
import { executeAfterInstallHook } from './utils'

const plugin: Plugin = {
  configuration,
  commands: [AfterInstallCommand],
  hooks: {
    afterAllInstalled: async (project: Project): Promise<void> => {
      const exitCode = await executeAfterInstallHook(project.configuration, true)
      if (exitCode) {
        throw new Error('The `afterInstall` hook failed, see output above.')
      }
    }
  }
}

export default plugin
