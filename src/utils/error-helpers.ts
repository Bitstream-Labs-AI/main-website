export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  // Handles strings like: throw "Something went wrong"
  if (typeof error === 'string') {
    return error
  }
  // Fallback for objects/unknowns
  return String(error)
}
