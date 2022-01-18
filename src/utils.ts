import { Configuration } from '@yarnpkg/core'
import { execute } from '@yarnpkg/shell'

/**
 * Execute the `afterInstall` hook
 *
 * @param {Configuration} configuration Configuration
 * @param {boolean} printPreamble Whether to print a preamble before execution
 * @returns {number} Exit code
 */
export const executeAfterInstallHook = async (
  configuration: Configuration,
  printPreamble: boolean
): Promise<number> => {
  const afterInstall = configuration.get('afterInstall')
  if (afterInstall) {
    if (printPreamble) {
      // TODO use a LightReport to write this to STDOUT, being careful to check for the `--json` flag from the user
      console.log('Running `afterInstall` hook...')
    }
    return execute(afterInstall, [], {
      cwd: configuration.projectCwd || undefined
    })
  }
  return 0
}
