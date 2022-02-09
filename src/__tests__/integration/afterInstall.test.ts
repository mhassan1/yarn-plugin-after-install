import { join } from 'path'
import { executeHelper, matchHelper } from './helpers'

const COMMAND_YARN = 'yarn'
const COMMAND_YARN_DLX_HELP = 'yarn dlx --help'
const COMMAND_YARN_AFTER_INSTALL = 'yarn after-install'

describe.each([
  {
    command: COMMAND_YARN,
    expectations: {
      expectedStdoutToMatch: /Running `afterInstall` hook\.\.\.\nhi there/,
      expectedExitCode: 0
    }
  },
  {
    command: COMMAND_YARN_DLX_HELP,
    expectations: {
      expectedStdoutToMatch: /Run a package in a temporary environment/,
      expectedStdoutNotToMatch: /hi there/,
      expectedExitCode: 0
    }
  },
  {
    command: COMMAND_YARN_AFTER_INSTALL,
    expectations: {
      expectedStdoutToMatch: /^hi there\n$/,
      expectedExitCode: 0
    }
  }
])('%s (success)', ({ command, expectations }) => {
  const cwd = join(__dirname, 'fixtures', 'test-package-success')

  it('should run the `afterInstall` hook with a zero exit code', () => {
    const executionResult = executeHelper(command, cwd)
    matchHelper(executionResult, expectations)
  })

  it('should run the `afterInstall` hook in a sub-directory with a zero exit code', () => {
    const executionResult = executeHelper(command, join(cwd, 'scripts'))
    matchHelper(executionResult, expectations)
  })
})

describe.each([
  {
    command: COMMAND_YARN,
    expectations: {
      expectedStdout: /Running `afterInstall` hook\.\.\.\n.*The `afterInstall` hook failed, see output above/,
      expectedStderr: /^command not found: i-dont-exist\n$/,
      expectedExitCode: 1
    }
  },
  {
    command: COMMAND_YARN_DLX_HELP,
    expectations: {
      expectedStdoutToMatch: /Run a package in a temporary environment/,
      expectedStderrNotToMatch: /i-dont-exist/,
      expectedExitCode: 0
    }
  },
  {
    command: COMMAND_YARN_AFTER_INSTALL,
    expectations: {
      expectedStdout: /^$/,
      expectedStderr: /^command not found: i-dont-exist\n$/,
      expectedExitCode: 127
    }
  }
])('%s (failure)', ({ command, expectations }) => {
  const cwd = join(__dirname, 'fixtures', 'test-package-failure')

  it('should run the `afterInstall` hook with a non-zero exit code', () => {
    const executionResult = executeHelper(command, cwd)
    matchHelper(executionResult, expectations)
  })
})
