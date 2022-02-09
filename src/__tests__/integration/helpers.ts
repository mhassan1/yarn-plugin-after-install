import { execSync } from 'child_process'

type Expectations = {
  expectedStdoutToMatch?: RegExp
  expectedStdoutNotToMatch?: RegExp
  expectedStderrToMatch?: RegExp
  expectedStderrNotToMatch?: RegExp
  expectedExitCode: number
}

type ExecutionResult = {
  stdout: string
  stderr: string
  exitCode: number
}

export const matchHelper = (
  { stdout, stderr, exitCode }: ExecutionResult,
  {
    expectedStdoutToMatch,
    expectedStdoutNotToMatch,
    expectedStderrToMatch,
    expectedStderrNotToMatch,
    expectedExitCode
  }: Expectations
): void => {
  expect(exitCode).toBe(expectedExitCode)
  expectedStdoutToMatch && expect(stdout).toMatch(expectedStdoutToMatch)
  expectedStdoutNotToMatch && expect(stdout).not.toMatch(expectedStdoutNotToMatch)
  expectedStderrToMatch && expect(stderr).toMatch(expectedStderrToMatch)
  expectedStderrNotToMatch && expect(stderr).not.toMatch(expectedStderrNotToMatch)
}

export const executeHelper = (command: string, cwd: string): ExecutionResult => {
  let stdout: string, stderr: string, exitCode: number
  try {
    stdout = execSync(command, { cwd }).toString()
    stderr = ''
    exitCode = 0
  } catch (err) {
    stdout = (err as { stdout: Buffer }).stdout.toString()
    stderr = (err as { stderr: Buffer }).stderr.toString()
    exitCode = (err as { status: number }).status
  }
  return { stdout, stderr, exitCode }
}
