import { Faker, en } from "@faker-js/faker";

const faker = new Faker({ locale: [en] });
faker.seed(1);

export const userFactory = () => {
  return {
    id: faker.string.uuid(),
    name: {
      first: faker.person.firstName(),
      last: faker.person.lastName(),
    },
    email: faker.internet.email(),
    phone: faker.phone.number(),
    username: faker.internet.username(),
    password: faker.internet.password(),
    birthday: faker.date
      .past({
        years: 40,
      })
      .toISOString(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
      location: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
    },
    company: {
      name: faker.company.name(),
      department: faker.commerce.department(),
      jobTitle: faker.person.jobTitle(),
    },
    website: faker.internet.url(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.paragraph(),
    socialMedia: {
      twitter: faker.internet.username() + "@twitter.com",
      linkedin: faker.internet.username() + "@linkedin.com",
      facebook: faker.internet.username() + "@facebook.com",
    },
    employmentStatus: faker.helpers.arrayElement(["employed", "unemployed"]),
    preferences: {
      newsletter: faker.datatype.boolean(),
      notifications: {
        email: faker.datatype.boolean(),
        sms: faker.datatype.boolean(),
        push: faker.datatype.boolean(),
      },
      theme: faker.helpers.arrayElement(["light", "dark"]),
    },
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    lastLoginAt: faker.date.recent().toISOString(),
    membershipLevel: faker.helpers.arrayElement(["basic", "premium", "gold"]),
    creditCard: {
      number: faker.finance.creditCardNumber(),
      expiresAt: faker.date.future().toISOString(),
      cvv: faker.finance.creditCardCVV(),
    },
    balance: faker.finance.amount({ min: 0, max: 50000, dec: 2 }),
    transactionHistory: Array.from({ length: 3 }, () => ({
      date: faker.date.recent().toISOString(),
      amount: faker.finance.amount(),
      description: faker.commerce.productDescription(),
    })),
  };
};

export type User = ReturnType<typeof userFactory>;
