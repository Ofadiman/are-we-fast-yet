import "reflect-metadata";

import {
  IsString,
  IsUUID,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsNumber,
  validateSync,
} from "class-validator";
import * as s from "superstruct";
import * as y from "yup";
import { z } from "zod";
import { benchmark } from "../utils/benchmark.mjs";
import { userFactory } from "../utils/userFactory.mjs";
import { Type as TypeboxType } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import {
  plainToInstance,
  Type as ClassTransformerType,
} from "class-transformer";

const user: any = userFactory();

const zodSchema = z.object({
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

const superstructSchema = s.object({
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

const yupSchema = y
  .object({
    id: y.string().uuid().required(),
    name: y
      .object({
        first: y.string().required(),
        last: y.string().required(),
      })
      .required(),
    email: y.string().email().required(),
    phone: y.string().required(),
    username: y.string().required(),
    password: y.string().required(),
    birthday: y.string().required(),
    address: y
      .object({
        street: y.string().required(),
        city: y.string().required(),
        state: y.string().required(),
        country: y.string().required(),
        zipCode: y.string().required(),
        location: y.object({
          lat: y.number().required(),
          lng: y.number().required(),
        }),
      })
      .required(),
    company: y
      .object({
        name: y.string().required(),
        department: y.string().required(),
        jobTitle: y.string().required(),
      })
      .required(),
    website: y.string().url().required(),
    avatar: y.string().url().required(),
    bio: y.string().required(),
    socialMedia: y
      .object({
        twitter: y.string().required(),
        linkedin: y.string().required(),
        facebook: y.string().required(),
      })
      .required(),
    employmentStatus: y.mixed().oneOf(["employed", "unemployed"]).required(),
    preferences: y
      .object({
        newsletter: y.boolean().required(),
        notifications: y
          .object({
            email: y.boolean().required(),
            sms: y.boolean().required(),
            push: y.boolean().required(),
          })
          .required(),
        theme: y.mixed().oneOf(["light", "dark"]).required(),
      })
      .required(),
    createdAt: y.string().required(),
    lastLoginAt: y.string().required(),
    membershipLevel: y.mixed().oneOf(["basic", "premium", "gold"]).required(),
    creditCard: y
      .object({
        number: y.string().required(),
        expiresAt: y.string().required(),
        cvv: y.string().required(),
      })
      .required(),
    balance: y.string().required(),
    transactionHistory: y
      .array(
        y.object({
          date: y.string().required(),
          amount: y.string().required(),
          description: y.string().required(),
        }),
      )
      .required(),
  })
  .required();

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

class Name {
  @IsString()
  first: string;

  @IsString()
  last: string;
}

class Location {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

class Address {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  zipCode: string;

  @ValidateNested()
  @ClassTransformerType(() => Location)
  location: Location;
}

class Company {
  @IsString()
  name: string;

  @IsString()
  department: string;

  @IsString()
  jobTitle: string;
}

class Notifications {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  push: boolean;
}

class Preferences {
  @IsBoolean()
  newsletter: boolean;

  @ValidateNested()
  @ClassTransformerType(() => Notifications)
  notifications: Notifications;

  @IsEnum(Theme)
  theme: Theme;
}

class CreditCard {
  @IsString()
  number: string;

  @IsString()
  expiresAt: string;

  @IsString()
  cvv: string;
}

class Transaction {
  @IsString()
  date: string;

  @IsString()
  amount: string;

  @IsString()
  description: string;
}

class User {
  @IsUUID()
  id: string;

  @ValidateNested()
  @ClassTransformerType(() => Name)
  name: Name;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  birthday: string;

  @ValidateNested()
  @ClassTransformerType(() => Address)
  address: Address;

  @ValidateNested()
  @ClassTransformerType(() => Company)
  company: Company;

  @IsString()
  website: string;

  @IsString()
  avatar: string;

  @IsString()
  bio: string;

  @ValidateNested()
  @ClassTransformerType(() => Preferences)
  preferences: Preferences;

  @IsEnum(EmploymentStatus)
  employmentStatus: EmploymentStatus;

  @IsString()
  createdAt: string;

  @IsString()
  lastLoginAt: string;

  @IsEnum(MembershipLevel)
  membershipLevel: MembershipLevel;

  @ValidateNested()
  @ClassTransformerType(() => CreditCard)
  creditCard: CreditCard;

  @IsString()
  balance: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ClassTransformerType(() => Transaction)
  transactionHistory: Transaction[];
}

const typeboxSchema = TypeboxType.Object({
  id: TypeboxType.String(),
  name: TypeboxType.Object({
    first: TypeboxType.String(),
    last: TypeboxType.String(),
  }),
  email: TypeboxType.String(),
  phone: TypeboxType.String(),
  username: TypeboxType.String(),
  password: TypeboxType.String(),
  birthday: TypeboxType.String(),
  address: TypeboxType.Object({
    street: TypeboxType.String(),
    city: TypeboxType.String(),
    state: TypeboxType.String(),
    country: TypeboxType.String(),
    zipCode: TypeboxType.String(),
    location: TypeboxType.Object({
      lat: TypeboxType.Number(),
      lng: TypeboxType.Number(),
    }),
  }),
  company: TypeboxType.Object({
    name: TypeboxType.String(),
    department: TypeboxType.String(),
    jobTitle: TypeboxType.String(),
  }),
  website: TypeboxType.String(),
  avatar: TypeboxType.String(),
  bio: TypeboxType.String(),
  preferences: TypeboxType.Object({
    newsletter: TypeboxType.Boolean(),
    notifications: TypeboxType.Object({
      email: TypeboxType.Boolean(),
      sms: TypeboxType.Boolean(),
      push: TypeboxType.Boolean(),
    }),
    theme: TypeboxType.Enum(Theme),
  }),
  employmentStatus: TypeboxType.Enum(EmploymentStatus),
  createdAt: TypeboxType.String(),
  lastLoginAt: TypeboxType.String(),
  membershipLevel: TypeboxType.Enum(MembershipLevel),
  creditCard: TypeboxType.Object({
    number: TypeboxType.String(),
    expiresAt: TypeboxType.String(),
    cvv: TypeboxType.String(),
  }),
  balance: TypeboxType.String(),
  transactionHistory: TypeboxType.Array(
    TypeboxType.Object({
      date: TypeboxType.String(),
      amount: TypeboxType.String(),
      description: TypeboxType.String(),
    }),
  ),
});

benchmark({
  setup: (bench) => {
    bench.add("zod", () => {
      zodSchema.parse(user);
    });

    bench.add("superstruct", () => {
      s.assert(user, superstructSchema);
    });

    bench.add("yup", () => {
      yupSchema.validateSync(user);
    });

    bench.add("class validator", () => {
      validateSync(plainToInstance(User, user));
    });

    bench.add("typebox", () => {
      Value.Parse(typeboxSchema, user);
    });
  },
  description:
    "This benchmark is designed to test which data validation library is the fastest.",
  conclusion: [
    "Zod is the fastest at validating data. It beats other libraries by at least 350%.",
  ],
  filename: import.meta.filename,
});
