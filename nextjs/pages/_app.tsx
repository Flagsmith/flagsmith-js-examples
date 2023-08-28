import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {FlagsmithProvider} from 'flagsmith-es/react';
import flagsmith from 'flagsmith-es/isomorphic';
import {IState} from 'flagsmith-es/types';
import {AppContextType} from "next/dist/shared/lib/utils";

function MyApp({ Component, identity, pageProps, flagsmithState }: AppProps & {flagsmithState: IState, identity:string|undefined}) {
    return (
        <FlagsmithProvider flagsmith={flagsmith}
                           key={identity}
                           serverState={flagsmithState as IState}
>
            <Component {...pageProps} />
        </FlagsmithProvider>
    );
}


MyApp.getInitialProps = async ({ctx}:AppContextType) => {
    const identity = ctx.query?.identity ? `${ctx.query.identity}` : undefined
    if(!flagsmith.initialised) {
        // Ensures flagsmith is only initialised once
        await flagsmith.init({
            environmentID: "QjgYur4LQTwe5HpvbvhpzK",
            identity,
        });
    }
    if(flagsmith.identity!== identity) {
        // If the identity has changed, identify or logout.
        // Note: this would be called on the client upon routing.
        await identity? flagsmith.identify(`${identity}`): flagsmith.logout()
    }
  return {
      identity: identity,
      flagsmithState: flagsmith.getState(),
    }
}

export default MyApp;
