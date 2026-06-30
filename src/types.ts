export type DslNode =
  | ReadNode
  | ReduceNode
  | SumNode
  | MulNode;

export type ReadNode = {
  type: 'read';
  path: (string | number)[];
};

export type ReduceNode = {
  type: 'reduce';
  collection: DslNode;
  aggregator: DslNode;
};

export type SumNode = {
  type: 'sum';
  op1: DslNode;
  op2: DslNode;
};

export type MulNode = {
  type: 'mul';
  op1: DslNode;
  op2: DslNode;
};

export type Computation = DslNode & { id: string };

export type DslProgram = {
  version: string;
  computations: Computation[];
};

export type ComputationResult = {
  id: string;
  value: unknown;
};

export type DslErrorCode = 'PATH_NOT_FOUND' | 'UNKNOWN_NODE' | 'INVALID_OPERAND';

export class DslError extends Error {
  readonly code: DslErrorCode;

  constructor(code: DslErrorCode, message: string) {
    super(message);
    this.name = 'DslError';
    this.code = code;
  }
}
