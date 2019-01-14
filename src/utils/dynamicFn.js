/* @flow */
/* eslint-disable no-param-reassign, no-underscore-dangle */

import hashObject from 'utils/hashObject'

const DEFAULT_KEY = '_fnCached'

const dynamicFn = (fn: void, key?: string): void => {
  const keyOfStore = key || DEFAULT_KEY

  fn[keyOfStore] = new Map()

  const has = (id: string): boolean => fn[keyOfStore].has(id)
  const get = (id: string): any => fn[keyOfStore].get(id)
  const set = (id: string, data: void): any => fn[keyOfStore].set(id, data)

  return function handler(...args) {
    const id = hashObject(args).substr(1, 8)
    if (!has(id)) {
      set(id, fn.apply(this, args))
    }
    return get(id)
  }
}

export default dynamicFn
