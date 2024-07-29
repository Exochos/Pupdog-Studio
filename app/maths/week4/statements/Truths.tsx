/**
 * Truths.tsx
 * Truths Functions
 *
 * @module Truths
 */

const Truth = {
  AND: (a: boolean, b: boolean) => a && b,
  OR: (a: boolean, b: boolean) => a || b,
  NOT: (a: boolean) => !a,
  XOR: (a: boolean, b: boolean) => a !== b,
  NAND: (a: boolean, b: boolean) => !(a && b),
  NOR: (a: boolean, b: boolean) => !(a || b),
  XNOR: (a: boolean, b: boolean) => a === b,
  IF: (a: boolean, b: boolean) => !a || b,
}

export default Truth
