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

## Running the example

```bash
npm run dev
```

