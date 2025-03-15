import fastJson from "fast-json-stringify";
import parse from "secure-json-parse";

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

export const fastJsonCloneDeep = <T extends object>(obj: T) => {
  return parse(stringify(obj));
};
