require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const uuid = require("uuid/v4")

export const StripePayment = async (token:any) => {
    const idempontencyKey = uuid()

    const result = await stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(() => {
        stripe.charges.create({},{idempontencyKey});
    });

    console.log(result);



}