import { Configuration } from '@yarnpkg/core'
import { execute } from '@yarnpkg/shell'

/**
 * Execute the `afterInstall` hook
 * @param {Configuration} configuration Configuration
 * @param {boolean} printPreamble Whether to print a preamble before execution
 * @returns {number} Exit code
 */
export const executeAfterInstallHook = async (
  configuration: Configuration,
  printPreamble: boolean
): Promise<number> => {
  const afterInstall = configuration.get('afterInstall')
  // https://github.com/yarnpkg/berry/blob/4f88b35c90695fb83c296b57f64cbf8dd2f88a9a/packages/plugin-dlx/sources/commands/dlx.ts#L47
  const isDlx = !!configuration.projectCwd?.endsWith(`dlx-${process.pid}`)
  if (afterInstall && !isDlx) {
    if (printPreamble) {
      // TODO use a LightReport to write this to STDOUT, being careful to check for the `--json` flag from the user
      console.log('Running `afterInstall` hook...')
    }
    return execute(afterInstall, [], {
      cwd: configuration.projectCwd || undefined,
      env: {
        ...process.env,
        _YARN_PLUGIN_AFTER_INSTALL_COMMAND_ARGV: JSON.stringify(process.argv.slice(2))
      }
    })
  }
  return 0
}
