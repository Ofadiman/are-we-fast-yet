import * as v from "valibot";

export const valibotSchema = v.object({
  id: v.string(),
  name: v.object({
    first: v.string(),
    last: v.string(),
  }),
  email: v.string(),
  phone: v.string(),
  username: v.string(),
  password: v.string(),
  birthday: v.string(),
  address: v.object({
    street: v.string(),
    city: v.string(),
    state: v.string(),
    country: v.string(),
    zipCode: v.string(),
    location: v.object({
      lat: v.number(),
      lng: v.number(),
    }),
  }),
  company: v.object({
    name: v.string(),
    department: v.string(),
    jobTitle: v.string(),
  }),
  website: v.string(),
  avatar: v.string(),
  bio: v.string(),
  socialMedia: v.object({
    twitter: v.string(),
    linkedin: v.string(),
    facebook: v.string(),
  }),
  employmentStatus: v.picklist(["employed", "unemployed"]),
  preferences: v.object({
    newsletter: v.boolean(),
    notifications: v.object({
      email: v.boolean(),
      sms: v.boolean(),
      push: v.boolean(),
    }),
    theme: v.picklist(["light", "dark"]),
  }),
  createdAt: v.string(),
  lastLoginAt: v.string(),
  membershipLevel: v.picklist(["basic", "premium", "gold"]),
  creditCard: v.object({
    number: v.string(),
    expiresAt: v.string(),
    cvv: v.string(),
  }),
  balance: v.string(),
  transactionHistory: v.array(
    v.object({
      date: v.string(),
      amount: v.string(),
      description: v.string(),
    }),
  ),
});
