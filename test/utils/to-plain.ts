export function toPlain<T>(entity: T): Record<string, any> {
  return JSON.parse(JSON.stringify(entity));
}
