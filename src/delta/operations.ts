import { TextAttributesMap, BlockAttributesMap as GenericAttributesMap } from './attributes'

interface OpBase {
  delete?: number
  retain?: number
}

export interface GenericOp extends OpBase {
  insert?: string|object
  attributes?: GenericAttributesMap
}

export interface TextOp<T extends string> extends OpBase {
  insert?: string
  attributes?: TextAttributesMap<T>
}

export interface BlockOp<T extends object> extends OpBase {
  insert?: T
  attributes?: GenericAttributesMap
}

export function isTextOp<T extends string>(op: GenericOp): op is TextOp<T> {
  return typeof op.insert === 'string'
}

export function getOperationLength(op: GenericOp): number {
  if (op.retain) {
    return op.retain
  }
  if (op.insert) {
    if (typeof op.insert === 'string') {
      return op.insert.length
    }
    return 1
  }
  if (op.delete) {
    return -1 * op.delete
  }
  return 0
}
