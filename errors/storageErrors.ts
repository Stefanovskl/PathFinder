export function handleStorageError(error: unknown, action: string): void {
  console.error(`Storage failed during: ${action}`, error);
}