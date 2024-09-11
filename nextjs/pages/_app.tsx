import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {FlagsmithProvider} from 'flagsmith-es/react';
import {IState} from 'flagsmith-es/types';
import {AppContextType} from "next/dist/shared/lib/utils";
import {createFlagsmithInstance} from "flagsmith-es/isomorphic";
import {useRef} from "react";

const isClient = typeof window !== 'undefined';
const environmentID = 'QjgYur4LQTwe5HpvbvhpzK';
function MyApp({ Component, identity, pageProps, flagsmithState }: AppProps & {flagsmithState: IState, identity:string|undefined}) {
    const flagsmithRef = useRef(createFlagsmithInstance())
    return (
        <FlagsmithProvider flagsmith={flagsmithRef.current} options={{
            environmentID,
            enableAnalytics: true,
            preventFetch: isClient, // optionally prevent clientside fetching of flags
            state: flagsmithState
        }} key={identity}
                           serverState={flagsmithState as IState}
>
            <Component {...pageProps} />
        </FlagsmithProvider>
    );
}


MyApp.getInitialProps = async ({ctx}:AppContextType) => {
    // Replace with your approach to detecting logged in users
    const identity = ctx.query?.identity ? `${ctx.query.identity}` : undefined
    const flagsmithInstance = createFlagsmithInstance()
    await flagsmithInstance.init({
        environmentID,
        identity,
    })

    return {
      flagsmithState: flagsmithInstance.getState(),
      identity
    }
}

export default MyApp;
