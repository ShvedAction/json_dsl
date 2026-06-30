import type { ComputationResult, DslProgram } from './types.js';

export type { DslProgram, ComputationResult, DslNode, DslErrorCode } from './types.js';
export { DslError } from './types.js';

/**
 * Evaluates a DSL program against source data.
 * @throws {DslError} on invalid path or unknown node type
 */
export function dslInterpreter(
  _source: Record<string, unknown>,
  _instructions: DslProgram
): ComputationResult[] {
  throw new Error('Not implemented — see specs/001-core-interpreter/tasks.md');
}
