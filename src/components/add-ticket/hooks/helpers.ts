/**
 * Boolean("false") // true
 * Boolean("0") // true
 *
 * Hence this manual check
 */
export function toBool(t: any): boolean {
  if (typeof t === "boolean") return t
  if (t === 0) return false
  if (t === "0") return false
  if (t === "false") return false
  if (t === 1) return true
  if (t === "1") return true
  if (t === "true") return true
  return Boolean(t)
}

export function fmtString(s: any): string | undefined {
  if (s === "") return undefined
  if (typeof s !== "string") return undefined
  return s
}
