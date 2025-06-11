import { Configuration } from '@yarnpkg/core'
import { executeAfterInstallHook } from '../../utils'

const makeConfiguration = (afterInstall: string): Configuration =>
  ({
    get(key: string) {
      if (!this.values.has(key)) throw new Error(`Invalid configuration key "${key}"`)
      return this.values.get(key)
    },
    values: new Map([['afterInstall', afterInstall]])
  }) as Configuration

describe('executeAfterInstallHook', () => {
  it('should execute an `afterInstall` hook with a zero exit code', async () => {
    expect(await executeAfterInstallHook(makeConfiguration('exit 0'), true)).toBe(0)
  })

  it('should execute an `afterInstall` hook with a non-zero exit code', async () => {
    expect(await executeAfterInstallHook(makeConfiguration('exit 1'), false)).toBe(1)
  })

  it('should not execute without an `afterInstall` hook', async () => {
    expect(await executeAfterInstallHook(makeConfiguration(''), false)).toBe(0)
  })
})
