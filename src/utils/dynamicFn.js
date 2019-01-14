/* @flow */
/* eslint-disable no-param-reassign, no-underscore-dangle */

import hashObject from 'utils/hashObject'

const defaultKey = '_fnCached'

const defaultGenerateId = (args: any) => hashObject(args).substr(1, 8)

const dynamicFn = (fn: void, key?: string, generateId?: void): void => {
  const keyOfStore = key || defaultKey

  fn[keyOfStore] = new Map()

  const has = (id: string): boolean => fn[keyOfStore].has(id)
  const get = (id: string): any => fn[keyOfStore].get(id)
  const set = (id: string, data: void): any => fn[keyOfStore].set(id, data)

  fn.generateId = generateId || defaultGenerateId

  return function handler(...args) {
    const id = fn.generateId(args)
    if (!has(id)) {
      set(id, fn.apply(this, args))
    }
    return get(id)
  }
}

export default dynamicFn
