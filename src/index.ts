import { evalNode } from './eval';
import type { ComputationResult, DslNode, DslProgram } from './types';

export type { DslProgram, ComputationResult, DslNode, DslErrorCode } from './types';
export { DslError } from './types';

/**
 * Evaluates a DSL program against source data.
 * @throws {DslError} on invalid path or unknown node type
 */
export function dslInterpreter(
  source: Record<string, unknown>,
  instructions: DslProgram
): ComputationResult[] {
  return instructions.computations.map((computation) => {
    const { id, ...node } = computation;
    const value = evalNode(node as DslNode, source);
    return { id, value };
  });
}
