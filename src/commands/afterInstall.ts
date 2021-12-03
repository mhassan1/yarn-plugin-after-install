import { Command } from 'clipanion'
import { Configuration, CommandContext } from '@yarnpkg/core'
import { executeAfterInstallHook } from '../utils'

/**
 * Command to run the `afterInstall` hook
 */
export class AfterInstallCommand extends Command<CommandContext> {
  static paths = [['after-install']]

  async execute(): Promise<number> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins)
    return executeAfterInstallHook(configuration, false)
  }
}
