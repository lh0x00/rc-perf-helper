/* eslint-disable no-underscore-dangle */

import dynamicFn from 'utils/dynamicFn'

const DEFAULT_KEY = '$key'

test('native function', () => {
  const originalFn = key => () => key + new Date()

  const fn1 = originalFn(DEFAULT_KEY)
  const fn2 = originalFn(DEFAULT_KEY)

  expect(fn1 === fn2).toEqual(false)
})

test('prevent create new function', () => {
  const originalFn = key => () => key + new Date()
  const wrappedFn = dynamicFn(originalFn)

  const fn1 = wrappedFn(DEFAULT_KEY)
  const fn2 = wrappedFn(DEFAULT_KEY)
  const fn3 = wrappedFn(DEFAULT_KEY)

  expect(fn1).toEqual(fn2)
  expect(fn1).toEqual(fn3)
  expect(fn2).toEqual(fn3)
})

test('return result', () => {
  const originalFn = key => () => key + new Date()
  const wrappedFn = dynamicFn(originalFn)

  const fn1 = wrappedFn(DEFAULT_KEY)
  const fn2 = wrappedFn(DEFAULT_KEY)

  const o1 = originalFn(DEFAULT_KEY)

  expect(fn1()).toEqual(fn2())
  expect(fn1()).toEqual(o1())
})

test('cached result', () => {
  const originalFn = key => () => key + new Date()
  const wrappedFn = dynamicFn(originalFn)

  for (let i = 1; i <= 3; i += 1) {
    const idOfFn = [DEFAULT_KEY, i].join('#')
    const fnCached = wrappedFn(idOfFn)
    const idOfResult = originalFn.generateId([idOfFn])
    const resultCached = originalFn._fnCached.get(idOfResult)

    expect(originalFn._fnCached.size).toEqual(i)
    expect(resultCached).toEqual(fnCached)
  }
})
