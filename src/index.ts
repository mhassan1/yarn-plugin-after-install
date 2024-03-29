import { Plugin, Project, InstallMode } from '@yarnpkg/core'
import type { InstallOptions } from '@yarnpkg/core/lib/Project'
import { configuration } from './config'
import { AfterInstallCommand } from './commands/afterInstall'
import { executeAfterInstallHook } from './utils'

const plugin: Plugin = {
  configuration,
  commands: [AfterInstallCommand],
  hooks: {
    afterAllInstalled: async (project: Project, options?: InstallOptions): Promise<void> => {
      if (options?.mode === InstallMode.UpdateLockfile) {
        return
      }

      const exitCode = await executeAfterInstallHook(project.configuration, true)
      if (exitCode) {
        throw new Error('The `afterInstall` hook failed, see output above.')
      }
    }
  }
}

export default plugin
