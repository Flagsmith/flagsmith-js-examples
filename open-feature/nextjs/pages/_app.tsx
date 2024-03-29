import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {IState} from 'flagsmith/types';
import {AppContextType} from "next/dist/shared/lib/utils";
import {createFlagsmithInstance} from "flagsmith/isomorphic";
import {useRef} from "react";
import {OpenFeature} from "@openfeature/web-sdk";
import {OpenFeatureProvider} from "@openfeature/react-sdk";
import {FlagsmithProvider} from "@openfeature/flagsmith";

const isClient = typeof window !== 'undefined';
const environmentID = 'QjgYur4LQTwe5HpvbvhpzK';
function MyApp({ Component, identity, pageProps, flagsmithState }: AppProps & {flagsmithState: IState, identity:string|undefined}) {
    const flagsmithRef = useRef(createFlagsmithInstance())
    const renderRef = useRef(true);
    if(renderRef.current) {
        OpenFeature.setProvider(new FlagsmithProvider({
            environmentID,
            preventFetch: isClient, // optionally prevent clientside fetching of flags
            state: flagsmithState,
            flagsmithInstance: flagsmithRef.current,
        }))
        renderRef.current = false
    }
    return (
        <OpenFeatureProvider>
            <Component {...pageProps} />
        </OpenFeatureProvider>
    );
}


MyApp.getInitialProps = async ({ctx}:AppContextType) => {
    // Replace with your approach to detecting logged in users
    const identity = ctx.query?.identity ? `${ctx.query.identity}` : undefined
    const flagsmithInstance = createFlagsmithInstance()
    OpenFeature.setContext(identity?{targetingKey: identity, traits:{example_trait:1}}:{})
    await OpenFeature.setProviderAndWait(
        new FlagsmithProvider({
            flagsmithInstance: flagsmithInstance,
            environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
        }),
    )

    return {
      flagsmithState: flagsmithInstance.getState(),
      identity
    }
}

export default MyApp;
