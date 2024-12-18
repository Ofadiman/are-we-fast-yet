import { Type } from "class-transformer";
import {
  IsString,
  IsUUID,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsNumber,
} from "class-validator";

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
  @Type(() => Location)
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
  @Type(() => Notifications)
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

export class User {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => Name)
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
  @Type(() => Address)
  address: Address;

  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsString()
  website: string;

  @IsString()
  avatar: string;

  @IsString()
  bio: string;

  @ValidateNested()
  @Type(() => Preferences)
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
  @Type(() => CreditCard)
  creditCard: CreditCard;

  @IsString()
  balance: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Transaction)
  transactionHistory: Transaction[];
}
