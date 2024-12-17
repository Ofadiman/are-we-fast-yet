// This function was suggested by claude after prompting "Create typescript function that will deeply clone an object".
export function claude<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => claude(item)) as T;
  }

  if (obj instanceof Map) {
    const newMap = new Map();
    for (const [key, value] of obj) {
      newMap.set(claude(key), claude(value));
    }
    return newMap as T;
  }

  if (obj instanceof Set) {
    const newSet = new Set();
    for (const value of obj) {
      newSet.add(claude(value));
    }
    return newSet as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj) as T;
  }

  if (obj.constructor === Object) {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = claude(obj[key]);
      }
    }
    return newObj as T;
  }

  if (typeof obj === "object") {
    try {
      const newObj = Object.create(Object.getPrototypeOf(obj));
      Object.getOwnPropertyNames(obj).forEach((prop) => {
        const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        if (descriptor) {
          Object.defineProperty(newObj, prop, {
            ...descriptor,
            value: claude(descriptor.value),
          });
        }
      });
      return newObj;
    } catch {
      return obj;
    }
  }

  return obj;
}
