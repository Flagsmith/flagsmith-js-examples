<img width="100%" src="https://raw.githubusercontent.com/Flagsmith/flagsmith/main/static-files/hero.png"/>

## Flagsmith with Remix

- 📖 [Flagsmith docs](https://docs.flagsmith.com)
- 📖 [Remix docs](https://remix.run/docs)

## Prerequsities

- Rename `.env.test` file to `.env`
- Update `FLAGSMITH_ENVIRONMENT_ID` variable with your environment ID
- Check the `routes/_index.tsx` file to see the usage

**Note:** The example is using `test_feature` feature flag with a value. If you want to test the repository as it is, then please make sure that you have created a feature flag with the same name through your Flagsmith Dashboard for the environment you are testing for.

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```


