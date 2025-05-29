<img width="100%" src="https://github.com/Flagsmith/flagsmith/raw/main/static-files/hero.png"/>

## Flagsmith Express Marketplace Example

This example demonstrates a very small server rendered application using [Express](https://expressjs.com/) and [EJS](https://ejs.co/). It integrates the [Flagsmith](https://flagsmith.com) client but does not yet check any flags.

### Getting Started

```bash
npm install
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).
Set `FLAGSMITH_ENVIRONMENT_ID` before starting the server to configure your environment key.

A simple login form is available at `/login`. The logged in username is stored in memory and used to fetch identity flags.
