import { Bench } from "tinybench";
import { faker } from "@faker-js/faker";

faker.seed(1);

const factory = () => {
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

type User = ReturnType<typeof factory>;

const array: User[] = [];
const record: Record<string, User> = {};
const map: Map<string, User> = new Map();

const COUNT = 100;

for (let i = 0; i < COUNT; i++) {
  const user = factory();
  record[user.id] = user;
  array.push(user);
  map.set(user.id, user);
}

const firstElementId = array[0]!.id;
const lastElementId = array[COUNT - 1]!.id;

const bench = new Bench();

bench
  .add(`find first element using array.find()`, () => {
    const element = array.find((element) => element.id === firstElementId);
  })
  .add(`find last element using array.find()`, () => {
    const element = array.find((element) => element.id === lastElementId);
  })
  .add(`find first element using for loop`, () => {
    let element;
    for (let i = 0; i < COUNT; i++) {
      if (firstElementId === array[i]!.id) {
        if (element) {
          break;
        }
        element = array[i];
      }
    }
  })
  .add(`find last element using for loop`, () => {
    let element;
    for (let i = 0; i < COUNT; i++) {
      if (lastElementId === array[i]!.id) {
        if (element) {
          break;
        }
        element = array[i];
      }
    }
  })
  .add(`find first element using record`, () => {
    const element = record[firstElementId];
  })
  .add(`find last element using record`, () => {
    const element = record[lastElementId];
  })
  .add(`find first element using Map`, () => {
    const element = map.get(firstElementId);
  })
  .add(`find last element using Map`, () => {
    const element = map.get(lastElementId);
  });

await bench.run();

const table = bench.table();
table.sort((firstResult, secondResult) => {
  if (!firstResult || !secondResult) {
    throw new Error("left and right must be defined");
  }

  const firstThroughput = parseInt(
    (firstResult["Throughput average (ops/s)"] as string).split(
      " ± ",
    )[0] as string,
  );
  const secondThroughput = parseInt(
    (secondResult["Throughput average (ops/s)"] as string).split(
      " ± ",
    )[0] as string,
  );

  return secondThroughput - firstThroughput;
});

console.table(table);
