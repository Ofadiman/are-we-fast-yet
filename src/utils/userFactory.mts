import { Faker, en } from "@faker-js/faker";

const faker = new Faker({ locale: [en] });
faker.seed(1);

export const userFactory = () => {
  return {
    id: faker.string.uuid(),
    name: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    },
    email: faker.internet.email(),
    phone: faker.phone.number(),
    username: faker.internet.username(),
    password: faker.internet.password(),
    birthDate: faker.date.past({
      years: 40,
    }),
    address: {
      streetAddress: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
      geoLocation: {
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
    employmentStatus: faker.datatype.boolean() ? "employed" : "unemployed",
    preferences: {
      newsletter: faker.datatype.boolean(),
      notifications: {
        email: faker.datatype.boolean(),
        sms: faker.datatype.boolean(),
        push: faker.datatype.boolean(),
      },
      theme: faker.helpers.arrayElement(["light", "dark"]),
    },
    accountCreationDate: faker.date.past({ years: 2 }),
    lastLoginDate: faker.date.recent(),
    membershipLevel: faker.helpers.arrayElement(["basic", "premium", "gold"]),
    creditCard: {
      cardNumber: faker.finance.creditCardNumber(),
      expirationDate: faker.date.future(),
      cvv: faker.finance.creditCardCVV(),
    },
    balance: faker.finance.amount({ min: 0, max: 50000, dec: 2 }),
    transactionHistory: Array.from({ length: 3 }, () => ({
      date: faker.date.recent(),
      amount: faker.finance.amount(),
      description: faker.commerce.productDescription(),
    })),
  };
};

export type User = ReturnType<typeof userFactory>;
