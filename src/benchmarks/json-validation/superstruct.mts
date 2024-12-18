import * as s from "superstruct";

export const superstructSchema = s.object({
  id: s.string(),
  name: s.object({
    first: s.string(),
    last: s.string(),
  }),
  email: s.string(),
  phone: s.string(),
  username: s.string(),
  password: s.string(),
  birthday: s.string(),
  address: s.object({
    street: s.string(),
    city: s.string(),
    state: s.string(),
    country: s.string(),
    zipCode: s.string(),
    location: s.object({
      lat: s.number(),
      lng: s.number(),
    }),
  }),
  company: s.object({
    name: s.string(),
    department: s.string(),
    jobTitle: s.string(),
  }),
  website: s.string(),
  avatar: s.string(),
  bio: s.string(),
  socialMedia: s.object({
    twitter: s.string(),
    linkedin: s.string(),
    facebook: s.string(),
  }),
  employmentStatus: s.enums(["employed", "unemployed"]),
  preferences: s.object({
    newsletter: s.boolean(),
    notifications: s.object({
      email: s.boolean(),
      sms: s.boolean(),
      push: s.boolean(),
    }),
    theme: s.enums(["light", "dark"]),
  }),
  createdAt: s.string(),
  lastLoginAt: s.string(),
  membershipLevel: s.enums(["basic", "premium", "gold"]),
  creditCard: s.object({
    number: s.string(),
    expiresAt: s.string(),
    cvv: s.string(),
  }),
  balance: s.string(),
  transactionHistory: s.array(
    s.object({
      date: s.string(),
      amount: s.string(),
      description: s.string(),
    }),
  ),
});
