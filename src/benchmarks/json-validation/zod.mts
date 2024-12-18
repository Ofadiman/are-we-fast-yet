import { z } from "zod";

export const zodSchema = z.object({
  id: z.string(),
  name: z.object({
    first: z.string(),
    last: z.string(),
  }),
  email: z.string(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthday: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  company: z.object({
    name: z.string(),
    department: z.string(),
    jobTitle: z.string(),
  }),
  website: z.string(),
  avatar: z.string(),
  bio: z.string(),
  socialMedia: z.object({
    twitter: z.string(),
    linkedin: z.string(),
    facebook: z.string(),
  }),
  employmentStatus: z.enum(["employed", "unemployed"]),
  preferences: z.object({
    newsletter: z.boolean(),
    notifications: z.object({
      email: z.boolean(),
      sms: z.boolean(),
      push: z.boolean(),
    }),
    theme: z.enum(["light", "dark"]),
  }),
  createdAt: z.string(),
  lastLoginAt: z.string(),
  membershipLevel: z.enum(["basic", "premium", "gold"]),
  creditCard: z.object({
    number: z.string(),
    expiresAt: z.string(),
    cvv: z.string(),
  }),
  balance: z.string(),
  transactionHistory: z.array(
    z.object({
      date: z.string(),
      amount: z.string(),
      description: z.string(),
    }),
  ),
});
