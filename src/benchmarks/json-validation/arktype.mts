import { type } from "arktype";

export const arktypeSchema = type({
  id: "string",
  name: {
    first: "string",
    last: "string",
  },
  email: "string",
  phone: "string",
  username: "string",
  password: "string",
  birthday: "string",
  address: {
    street: "string",
    city: "string",
    state: "string",
    country: "string",
    zipCode: "string",
    location: {
      lat: "number",
      lng: "number",
    },
  },
  company: {
    name: "string",
    department: "string",
    jobTitle: "string",
  },
  website: "string",
  avatar: "string",
  bio: "string",
  socialMedia: {
    twitter: "string",
    linkedin: "string",
    facebook: "string",
  },
  employmentStatus: "'employed' | 'unemployed'",
  preferences: {
    newsletter: "boolean",
    notifications: {
      email: "boolean",
      sms: "boolean",
      push: "boolean",
    },
    theme: "'light' | 'dark'",
  },
  createdAt: "string",
  lastLoginAt: "string",
  membershipLevel: "'basic' | 'premium' | 'gold'",
  creditCard: {
    number: "string",
    expiresAt: "string",
    cvv: "string",
  },
  balance: "string",
  transactionHistory: type({
    date: "string",
    amount: "string",
    description: "string",
  }).array(),
});
