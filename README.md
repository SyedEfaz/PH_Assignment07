# বাজার দর (Bazar Dor)

বাংলাদেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, দাম পরিবর্তনের হার, এবং বাজারভিত্তিক মূল্য এক জায়গায় দেখুন। The interface follows the provided grocery-store Figma direction and adapts to mobile, tablet, and desktop screens.

## Technologies

- Next.js App Router and React
- Tailwind CSS 4 with responsive project styles
- Better Auth for email/password and optional Google/GitHub sign-in
- MongoDB for Better Auth user, session, and account data
- Programming Hero Bazar Dor API

## Features

- Live product and category data from the Bazar Dor API
- Bengali prices, price-change indicators, and scrolling price ticker
- Home sections for the top six price increases and decreases
- Responsive product cards, search, category filters, and numeric price sorting
- Protected product details with min/average/max summaries and market prices
- Sign up, sign in, sign out, Google/GitHub OAuth, and profile updates
- Skeleton/loading states, error notifications, and a friendly 404 page

## Run locally

```bash
npm install
Copy-Item .env.example .env.local
```

Set `BETTER_AUTH_SECRET` in `.env.local` to a random secret (at least 32 characters), then start the app:

```bash
npm run dev
```

Set `MONGODB_URI` to your MongoDB connection string, including a database name such as `bazador`. For a local MongoDB server, use `mongodb://127.0.0.1:27017/bazador`; for MongoDB Atlas, use the connection string provided by your cluster. The app creates its Better Auth collections on first use. Google and GitHub sign-in are enabled when their corresponding client ID and secret are configured.

## Production setup

Configure `MONGODB_URI`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in the deployment environment. Add OAuth provider credentials and the deployed callback URL when enabling Google or GitHub sign-in.

```bash
npm run build
npm start
```
