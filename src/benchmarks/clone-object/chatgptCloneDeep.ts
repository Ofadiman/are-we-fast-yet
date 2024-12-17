// This function was suggested by chatgpt after prompting "Create typescript function that will deeply clone an object".
export function chatgpt<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => chatgpt(item)) as unknown as T;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Map) {
    return new Map(
      Array.from(obj.entries()).map(([key, value]) => [
        chatgpt(key),
        chatgpt(value),
      ]),
    ) as unknown as T;
  }

  if (obj instanceof Set) {
    return new Set(
      Array.from(obj.values()).map((value) => chatgpt(value)),
    ) as unknown as T;
  }

  if (typeof obj === "object") {
    const clonedObj: Record<string, unknown> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = chatgpt((obj as Record<string, unknown>)[key]);
      }
    }
    return clonedObj as T;
  }

  throw new Error("Unsupported object type");
}
