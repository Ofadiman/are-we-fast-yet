import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

enum EmploymentStatus {
  EMPLOYED = "employed",
  UNEMPLOYED = "unemployed",
}

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

enum MembershipLevel {
  BASIC = "basic",
  PREMIUM = "premium",
  GOLD = "gold",
}

export const typeboxSchema = TypeCompiler.Compile(
  Type.Object({
    id: Type.String(),
    name: Type.Object({
      first: Type.String(),
      last: Type.String(),
    }),
    email: Type.String(),
    phone: Type.String(),
    username: Type.String(),
    password: Type.String(),
    birthday: Type.String(),
    address: Type.Object({
      street: Type.String(),
      city: Type.String(),
      state: Type.String(),
      country: Type.String(),
      zipCode: Type.String(),
      location: Type.Object({
        lat: Type.Number(),
        lng: Type.Number(),
      }),
    }),
    company: Type.Object({
      name: Type.String(),
      department: Type.String(),
      jobTitle: Type.String(),
    }),
    website: Type.String(),
    avatar: Type.String(),
    bio: Type.String(),
    preferences: Type.Object({
      newsletter: Type.Boolean(),
      notifications: Type.Object({
        email: Type.Boolean(),
        sms: Type.Boolean(),
        push: Type.Boolean(),
      }),
      theme: Type.Enum(Theme),
    }),
    employmentStatus: Type.Enum(EmploymentStatus),
    createdAt: Type.String(),
    lastLoginAt: Type.String(),
    membershipLevel: Type.Enum(MembershipLevel),
    creditCard: Type.Object({
      number: Type.String(),
      expiresAt: Type.String(),
      cvv: Type.String(),
    }),
    balance: Type.String(),
    transactionHistory: Type.Array(
      Type.Object({
        date: Type.String(),
        amount: Type.String(),
        description: Type.String(),
      }),
    ),
  }),
);
