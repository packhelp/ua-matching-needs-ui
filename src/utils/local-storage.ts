export const isJsonString = (str: any): str is string => {
  try {
    const value = JSON.parse(str)
    if (!value) {
      return false
    }
  } catch (e) {
    return false
  }
  return true
}
