/* @flow */

export const hasOwn = (list: object, key: string): boolean => Object.prototype.hasOwnProperty.call(list, key)

export const randomString = (length: number): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const lengthOfCharset = charset.length
  const getCharAt = (n: number): string => charset.charAt(n)

  let text = ''

  for (let i = 0; i < length; i += 1) {
    text += getCharAt(Math.floor(Math.random() * lengthOfCharset))
  }

  return text
}

export default {}
