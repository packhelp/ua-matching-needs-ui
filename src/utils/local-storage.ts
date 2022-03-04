export const isJsonString = (str: any): str is string => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
