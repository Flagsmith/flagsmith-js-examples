import * as React from "react";
import {
    PlasmicComponent,
    extractPlasmicQueryData,
    ComponentRenderData,
    PlasmicRootProvider,
} from "@plasmicapp/loader-nextjs";
import type {GetStaticPaths, GetStaticProps} from "next";

import Error from "next/error";
import {useRouter} from "next/router";
import {PLASMIC} from "@/plasmic-init";
import {createFlagsmithInstance} from "flagsmith/isomorphic";
import {FlagsmithProvider} from 'flagsmith/react'
const flagsmithSSR = createFlagsmithInstance();
const environmentID = "QjgYur4LQTwe5HpvbvhpzK";
export default function PlasmicLoaderPage(props: {
    plasmicData?: ComponentRenderData;
    queryCache?: Record<string, any>;
}) {
    const {plasmicData, queryCache} = props;
    const router = useRouter();
    if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
        return <Error statusCode={404}/>;
    }
    const pageMeta = plasmicData.entryCompMetas[0];
    return (
        <PlasmicRootProvider
            loader={PLASMIC}
            prefetchedData={plasmicData}
            prefetchedQueryData={queryCache}
            pageParams={pageMeta.params}
            pageQuery={router.query}
        >
            <PlasmicComponent component={pageMeta.displayName}/>
        </PlasmicRootProvider>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    await flagsmithSSR.init({
        environmentID,
    });
    const {catchall} = context.params ?? {};
    const plasmicPath = typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';

    // Check if there's a remote config for that page, if so, render that page instead of the provided route.
    const flagsmithPath = flagsmithSSR.getValue(`plasmic_${plasmicPath}`);
    if(flagsmithPath) {
        console.log("Found page for feature feature", `plasmic_${plasmicPath}`, flagsmithPath)
    }
    const plasmicData = await PLASMIC.maybeFetchComponentData( `${flagsmithPath || plasmicPath}`);

    if (!plasmicData) {
        // non-Plasmic catch-all
        return {props: {}};
    }
    const pageMeta = plasmicData.entryCompMetas[0];
    // Cache the necessary data fetched for the page
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
    // Use revalidate if you want incremental static regeneration
    return {props: {plasmicData, queryCache}, revalidate: 60};
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pageModules = await PLASMIC.fetchPages();
    return {
        paths: pageModules.map((mod) => ({
            params: {
                catchall: mod.path.substring(1).split("/"),
            },
        })),
        fallback: "blocking",
    };
}
