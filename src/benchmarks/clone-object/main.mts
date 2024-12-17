import fastJson from "fast-json-stringify";
import lodash from "lodash";
import parse from "secure-json-parse";
import * as ramda from "ramda";
import { benchmark } from "../../utils/benchmark.mjs";
import { userFactory } from "../../utils/userFactory.mjs";

const user = userFactory();

const stringify = fastJson({
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: {
      type: "object",
      properties: {
        first: { type: "string" },
        last: { type: "string" },
      },
      required: ["first", "last"],
    },
    email: { type: "string", format: "email" },
    phone: { type: "string" },
    username: { type: "string" },
    password: { type: "string" },
    birthday: { type: "string", format: "date-time" },
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        country: { type: "string" },
        zipCode: { type: "string" },
        location: {
          type: "object",
          properties: {
            lat: { type: "number" },
            lng: { type: "number" },
          },
          required: ["lat", "lng"],
        },
      },
      required: ["street", "city", "state", "country", "zipCode", "location"],
    },
    company: {
      type: "object",
      properties: {
        name: { type: "string" },
        department: { type: "string" },
        jobTitle: { type: "string" },
      },
      required: ["name", "department", "jobTitle"],
    },
    website: { type: "string", format: "uri" },
    avatar: { type: "string", format: "uri" },
    bio: { type: "string" },
    socialMedia: {
      type: "object",
      properties: {
        twitter: { type: "string" },
        linkedin: { type: "string" },
        facebook: { type: "string" },
      },
      required: ["twitter", "linkedin", "facebook"],
    },
    employmentStatus: { type: "string" },
    preferences: {
      type: "object",
      properties: {
        newsletter: { type: "boolean" },
        notifications: {
          type: "object",
          properties: {
            email: { type: "boolean" },
            sms: { type: "boolean" },
            push: { type: "boolean" },
          },
          required: ["email", "sms", "push"],
        },
        theme: { type: "string" },
      },
      required: ["newsletter", "notifications", "theme"],
    },
    createdAt: { type: "string", format: "date-time" },
    lastLoginAt: { type: "string", format: "date-time" },
    membershipLevel: { type: "string" },
    creditCard: {
      type: "object",
      properties: {
        number: { type: "string" },
        expiresAt: { type: "string", format: "date-time" },
        cvv: { type: "string" },
      },
      required: ["number", "expiresAt", "cvv"],
    },
    balance: { type: "string" },
    transactionHistory: {
      type: "array",
      items: {
        type: "object",
        properties: {
          date: { type: "string", format: "date-time" },
          amount: { type: "string" },
          description: { type: "string" },
        },
        required: ["date", "amount", "description"],
      },
    },
  },
  required: [
    "id",
    "name",
    "email",
    "phone",
    "username",
    "password",
    "birthday",
    "address",
    "company",
    "website",
    "avatar",
    "bio",
    "socialMedia",
    "employmentStatus",
    "preferences",
    "createdAt",
    "lastLoginAt",
    "membershipLevel",
    "creditCard",
    "balance",
    "transactionHistory",
  ],
});

// This function was suggested by chatgpt after prompting "Create typescript function that will deeply clone an object".
function chatgpt<T>(obj: T): T {
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

// This function was suggested by claude after prompting "Create typescript function that will deeply clone an object".
function claude<T>(obj: T): T {
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

benchmark({
  setup: (bench) => {
    bench
      .add(`JSON.stringify + JSON.parse`, () => {
        const clone = JSON.parse(JSON.stringify(user));
      })
      .add(`structuredClone`, () => {
        const clone = structuredClone(user);
      })
      .add(`fast-json-stringify + secure-json-parse (from fastify)`, () => {
        const clone = parse(stringify(user));
      })
      .add(`lodash.cloneDeep`, () => {
        const clone = lodash.cloneDeep(user);
      })
      .add(`ramda.clone`, () => {
        const clone = ramda.clone(user);
      })
      .add(`chatgpt`, () => {
        const clone = chatgpt(user);
      })
      .add(`claude`, () => {
        const clone = claude(user);
      });
  },
  filename: import.meta.filename,
  description:
    "The purpose of this benchmark is to investigate which method of copying objects in Node.js is the fastest.",
  conclusion: [
    "ChatGPT has created the fastest deep clone function. It is over 40% faster than the version proposed by Claude.",
    "The fastest, widely-used method of cloning an object is `cloneDeep` function from `lodash` library. It is over 3.5 times slower than the version proposed by ChatGPT.",
  ],
});
