<img width="100%" src="https://raw.githubusercontent.com/Flagsmith/flagsmith/main/static-files/hero.png"/>

# Flagsmith with Plasmic

## How it works

Here we combine Flagsmith Feature flags with Plasmic pages.

When Plasmic compiles pages we check whether we have a remote config for that url, if we do we render that page instead.

Based on the following, we render /homev2 when visiting /:
![img_1.png](img_1.png)

![img.png](img.png)

## The code that does this

The example works almost identically to the create-plasmic-app one with 2 modifications

```
    const plasmicPath = typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';
    // Check if there's a remote config for that page, if so, render that page instead of the provided route.
    const flagsmithPath = flagsmithSSR.getValue(`plasmic_${plasmicPath}`);
    if(flagsmithPath) {
        console.log("Found page for feature feature", `plasmic_${plasmicPath}`, flagsmithPath)
    }
    const plasmicData = await PLASMIC.maybeFetchComponentData( `${flagsmithPath || plasmicPath}`);

```

and 

```
 const queryCache = await extractPlasmicQueryData(
        <FlagsmithProvider flagsmith={flagsmithSSR}
                           serverState={flagsmithSSR.getState()}
        >
            <PlasmicRootProvider
                loader={PLASMIC}
                prefetchedData={plasmicData}
                pageParams={pageMeta.params}
            >
                <PlasmicComponent component={pageMeta.displayName}/>
            </PlasmicRootProvider>
        </FlagsmithProvider>
    );
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open your browser to see the result.

You can start editing your project in Plasmic Studio. The page auto-updates as you edit the project.

## Learn More

With Plasmic, you can enable non-developers on your team to publish pages and content into your website or app.

To learn more about Plasmic, take a look at the following resources:

- [Plasmic Website](https://www.plasmic.app/)
- [Plasmic Documentation](https://docs.plasmic.app/learn/)
- [Plasmic Slack Community](https://www.plasmic.app/slack)

You can check out [the Plasmic GitHub repository](https://github.com/plasmicapp/plasmic) - your feedback and contributions are welcome!
