import { execSync } from 'child_process'
import { join } from 'path'

describe.each(['yarn', 'yarn after-install'])('%s (success)', (command) => {
  const cwd = join(__dirname, 'fixtures', 'test-package-success')

  it('should run the `afterInstall` hook with a zero exit code', () => {
    const stdout = execSync(command, { cwd }).toString()
    if (command === 'yarn') {
      expect(stdout).toMatch(/Running `afterInstall` hook\.\.\.\nhi/)
    } else {
      expect(stdout).toBe('hi\n')
    }
  })

  it('should run the `afterInstall` hook in a sub-directory with a zero exit code', () => {
    const stdout = execSync(command, { cwd: join(cwd, 'scripts') }).toString()
    if (command === 'yarn') {
      expect(stdout).toMatch(/Running `afterInstall` hook\.\.\.\nhi/)
    } else {
      expect(stdout).toBe('hi\n')
    }
  })
})

describe.each(['yarn', 'yarn after-install'])('%s (failure)', (command) => {
  const cwd = join(__dirname, 'fixtures', 'test-package-failure')

  it('should run the `afterInstall` hook with a non-zero exit code', () => {
    let stdout: string
    let stderr: string
    try {
      execSync(command, { cwd })
      throw new Error('should not get here')
    } catch (err) {
      stdout = (err as { stdout: Buffer }).stdout.toString()
      stderr = (err as { stderr: Buffer }).stderr.toString()
    }

    if (command === 'yarn') {
      expect(stdout).toMatch(/Running `afterInstall` hook\.\.\.\n.*The `afterInstall` hook failed, see output above/)
      expect(stderr).toBe('command not found: i-dont-exist\n')
    } else {
      expect(stdout).toBe('')
      expect(stderr).toBe('command not found: i-dont-exist\n')
    }
  })
})
