# JamCommerce

A full stack app to provide mini ecommerce system to sell service or products, collect donations. Inspirations are from Eventbrite, Gumroad, GoFundMe, OpenCollective, LaunchGood and so fourth.

- Frontend:
  - Next.js and [SWR](https://github.com/vercel/swr)
  - [react-stripe-js](https://github.com/stripe/react-stripe-js) for [Checkout](https://stripe.com/checkout) and [Elements](https://stripe.com/elements)
  - [Chakra UI](https://chakra-ui.com/)
  - [Use-Shopping-Cart](https://useshoppingcart.com/docs/)
- Backend
  - Next.js [API routes](https://nextjs.org/docs/api-routes/introduction)
  - [stripe-node with TypeScript](https://github.com/stripe/stripe-node#usage-with-typescript)
  - [Supabase](https://supabase.com/docs/reference/javascript)
  - [CurrencyAPI](https://currencyapi.com)

## Features
- 🛍 Stripe Checkout
- ฿ Multi-currency
- 💸 Donation give levels
- 🤑 Donation tips
- 🛒 Fundamental Shopping Cart logic
- ⚛️ State management
- 🗃 Local Storage Support
- ☁︎ Serverless Utilities (Product Validation)
- 🧾 Easy-To-Access Cart Info
- ✅ Fully Tested
- 🎸 Jamstack friendly
- and more to come 🔥


## Setup

##### Prequisites: 
You will need to sign your account to the following services. Please make sure they're available in your country.
- Stripe account
- Supabase account
- Currencyapi account

##### Clone the repo

``` 
git clone https://github.com/rome2o/jamcommerce
cd jamcommerce
```

##### Create your environment variables
Please fetch all your API keys and chuck it inside the following
```
cp .env.local.example .env.local
```

Also, create `.env` file
```
nano .env
```
```
# Supabase database URL
DATABASE_URL=postgres://postgres:[YOUR-PASSWORD]@db.abc.supabase.co:[PORT]/postgres
```

##### Push the database schema

``` 
npx prisma db push
```

#### Populate your currency table
Hit the currency API to populate your currencies. Make sure your you've `CURRENCY_API_ENDPOINT` and `CURRENCY_API_KEY`
```
curl --request POST \                                    
     --url 'http://localhost:3000/api/currency' \
     --header 'Authorization: Bearer <YOUR_API_TOKEN>'
```


## Add campaign information
Some parameters are required to be set in the `config/index.ts`
```
export const CURRENCY = 'AUD'
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0
export const MAX_AMOUNT = 5000.0
export const AMOUNT_STEP = 5.0
export const DEALING_CURRENCIES =  ['AUD','EUR','USD','CAD','IDR']
export const BASE_CURRENCY = 'AUD'
export const RAISING_AMOUNT = 10000
```
## Demo

- Live demo: To be added
- CodeSandbox: To be added
- Tutorial: To be added

The demo is running in test mode -- use `4242424242424242` as a test card number with any CVC + future expiration date.

Use the `4000000000003220` test card number to trigger a 3D Secure challenge flow.

Read more about testing on Stripe at https://stripe.com/docs/testing.

<details open><summary>Shopping Cart Checkout Demo</summary>
<img src="./public/shopping_cart_demo.gif" alt="A gif of the Shopping Cart Checkout payment page." align="center">
</details>

<details><summary>Checkout Donations Demo</summary>
<img src="./public/checkout_demo.gif" alt="A gif of the Checkout payment page." align="center">
</details>

<details><summary>Elements Donations Demo</summary>
<img src="./public/elements_demo.gif" alt="A gif of the custom Elements checkout page." align="center">
</details>

## Deploy your own

Once you have access to [the environment variables you'll need](#required-configuration) from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys), deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/rome2o/jamcommerce&project-name=jamcommerce-name=with-stripe-typescript&env=NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY&envDescription=Enter%20your%20Stripe%20Keys&envLink=https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript%23required-configuration)

## Included functionality

- [Global CSS styles](https://nextjs.org/blog/next-9-2#built-in-css-support-for-global-stylesheets)
- Implementation of a Layout component that loads and sets up Stripe.js and Elements for usage with SSR via `loadStripe` helper: [components/Layout.tsx](components/Layout.tsx).
- Stripe Checkout
  - Custom Amount Donation with redirect to Stripe Checkout:
    - Frontend: [pages/donate-with-checkout.tsx](pages/donate-with-checkout.tsx)
    - Backend: [pages/api/checkout_sessions/](pages/api/checkout_sessions/)
    - Checkout payment result page that uses [SWR](https://github.com/vercel/swr) hooks to fetch the CheckoutSession status from the API route: [pages/thank-you.tsx](pages/thank-you.tsx).
- Stripe Elements
  - Custom Amount Donation with Stripe Elements & PaymentIntents (no redirect):
    - Frontend: [pages/donate-with-elements.tsx](pages/donate-with-elements.tsx)
    - Backend: [pages/api/payment_intents/](pages/api/payment_intents/)
- Webhook handling for [post-payment events](https://stripe.com/docs/payments/accept-a-payment#web-fulfillment)
  - By default Next.js API routes are same-origin only. To allow Stripe webhook event requests to reach our API route, we need to add `micro-cors` and [verify the webhook signature](https://stripe.com/docs/webhooks/signatures) of the event. All of this happens in [pages/api/webhooks/index.ts](pages/api/webhooks/index.ts).
- Helpers
  - [utils/api-helpers.ts](utils/api-helpers.ts)
    - helpers for GET and POST requests.
  - [utils/stripe-helpers.ts](utils/stripe-helpers.ts)
    - Format amount strings properly using `Intl.NumberFormat`.
    - Format amount for usage with Stripe, including zero decimal currency detection.
- TODO: Write more information about the features here


### Stripe information

Copy the `.env.local.example` file into a file named `.env.local` in the root directory of this project:

```bash
cp .env.local.example .env.local
```

You will need a Stripe account ([register](https://dashboard.stripe.com/register)) to run this sample. Go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys and replace them in the `.env.local` file.

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

### Forward webhooks to your local dev server

First [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#link-account).

Next, start the webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/webhooks
```

The CLI will print a webhook secret key to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.

### Setting up a live webhook endpoint

After deploying, copy the deployment URL with the webhook path (`https://your-url.vercel.app/api/webhooks`) and create a live webhook endpoint [in your Stripe dashboard](https://stripe.com/docs/webhooks/setup#configure-webhook-settings).

Once created, you can click to reveal your webhook's signing secret. Copy the webhook secret (`whsec_***`) and add it as a new environment variable in your [Vercel Dashboard](https://vercel.com/dashboard):

- Select your newly created project.
- Navigate to the Settings tab.
- In the general settings scroll to the "Environment Variables" section.

After adding an environment variable you will need to rebuild your project for it to become within your code. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy".

### Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

# Forked from 
This project is a fork a [Next.js example](https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript). You can read related [documentation here](https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe)
## Authors
- [@rome2o](https://github.com/rome2o)
- [@ahmedgadit](https://github.com/ahmedgadit)
- [@thorsten-stripe](https://twitter.com/thorwebdev)
- [@lfades](https://twitter.com/luis_fades)
