# TennisWorld-MERN-e-commerce

> eCommerce platform using MERN stack & Redux.

## Website

https://tennisworld.vercel.app

## Features

- Full featured shopping cart and wishlist
- Product reviews and ratings
- Top products carousel
- Product search feature
- Product screen with similar brand & category suggestions in the bottom
- Product add, edit and delete
- User profile with orders and update
- Admin management and stats page
- Checkout process
- PayPal integration
- Mailer to send mails when user register, create order, pay and deliver

## Stack

- **Frontend** — React 18, Create React App, Redux Toolkit, React Router 7,
  React-Bootstrap, `@paypal/react-paypal-js`
- **Backend** — Express 4 on Node 22, Mongoose 8, JWT auth, Joi validation
- **Data** — MongoDB Atlas
- **Images** — Vercel Blob for admin uploads (product photos are hotlinked
  from Tennis Warehouse)
- **Hosting** — Vercel: the CRA build is served statically and the whole
  Express app runs as one serverless function

## Project layout

```
api/index.js        Vercel entrypoint - exports the Express app
backend/app.js      the Express app (routes, middleware) - no listener
backend/server.js   local dev listener only
backend/routes      products, users, orders, upload
backend/controllers business logic
backend/models      Mongoose schemas + Joi validators
frontend/           Create React App client
vercel.json         build config + /api and SPA-fallback rewrites
```

Because the frontend and API share one origin on Vercel, every request in the
client uses a relative `/api/...` path — there is no API base URL to
configure.

## Usage

### Env variables

Copy `.env.example` to `.env` in the root and fill it in:

```
NODE_ENV=development
PORT=8000
MONGO_URI=your mongodb uri
JWT_SECRET=your own string
PAYPAL_CLIENT_ID=your paypal client id
MAILER_API_KEY=your sendgrid api key
MAIL_FROM=your mail
```

`PORT` must stay `8000` locally — it is what the CRA dev proxy in
`frontend/package.json` points at. `MAILER_API_KEY` is optional; leave it
blank and the app logs a warning and skips sending instead of failing.

`BLOB_READ_WRITE_TOKEN` is injected automatically by Vercel once a Blob store
is connected, and is only needed locally to test admin image upload.

### Install and run

```bash
npm install                  # backend deps
npm install --prefix frontend
npm run dev                  # API on :8000 + CRA on :3000
```

### Seed the database

```bash
npm run data:import   # load sample products and users
npm run data:destroy  # wipe them
```

Both commands delete existing data first — do not point them at a database
you care about.

## Deploy

Deployed on Vercel. Pushes to `main` deploy automatically; to ship manually:

```bash
vercel deploy --prod
```

Set `MONGO_URI`, `JWT_SECRET`, `PAYPAL_CLIENT_ID`, `MAILER_API_KEY`,
`MAIL_FROM` and `NODE_ENV=production` in the Vercel project's environment
variables, and connect a Blob store if you want admin image upload to work.

## To Use Admin Screens

email: hackeru@test.com
password: Hack@1234
