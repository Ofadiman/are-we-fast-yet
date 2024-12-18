import * as y from "yup";

export const yupSchema = y
  .object({
    id: y.string().required(),
    name: y
      .object({
        first: y.string().required(),
        last: y.string().required(),
      })
      .required(),
    email: y.string().required(),
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
    website: y.string().required(),
    avatar: y.string().required(),
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
