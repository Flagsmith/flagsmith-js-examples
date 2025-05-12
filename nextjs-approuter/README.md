[![Feature Flag, Remote Config and A/B Testing platform, Flagsmith](https://github.com/Flagsmith/flagsmith/raw/main/static-files/hero.png)](https://www.flagsmith.com/)

## Next.js and Flagsmith Tutorial

The repository was originally for the [live stream tutorial](https://www.youtube.com/watch?v=u9TjbtZX4Zg) with [@eddiejaoude](https://twitter.com/eddiejaoude), and has since been updated with the latest dependencies.

## Getting started

### Setup Flagsmith

First, set up Flagsmith and add two feature flags. These flags are documented in `app/lib/flags.ts`.

### Setup `.env`

Copy `.env.example` to `.env` and use your Flagsmith server-only key.

### Install Dependencies

```
npm i
```

### Run the App

```
npm run dev
```

### (Optional) Build and Run

```
npm run build && npm run start
```
