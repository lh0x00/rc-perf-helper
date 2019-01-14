import hasher from 'object-hash'

const hashObject = (
  content: any,
  options?: object,
): string => hasher(content, options)

export default hashObject
