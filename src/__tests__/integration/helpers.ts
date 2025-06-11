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
  if (expectedStdoutToMatch) expect(stdout).toMatch(expectedStdoutToMatch)
  if (expectedStdoutNotToMatch) expect(stdout).not.toMatch(expectedStdoutNotToMatch)
  if (expectedStderrToMatch) expect(stderr).toMatch(expectedStderrToMatch)
  if (expectedStderrNotToMatch) expect(stderr).not.toMatch(expectedStderrNotToMatch)
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
