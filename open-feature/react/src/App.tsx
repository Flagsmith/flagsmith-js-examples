import React from 'react';
import {useNumberFlagValue} from "@openfeature/react-sdk";
import {OpenFeature} from "@openfeature/web-sdk";

function App() {
    const font_size = useNumberFlagValue('font_size', 12)
    const context = OpenFeature.getContext();
    const identify = () => {
        OpenFeature.setContext({targetingKey: 'flagsmith_sample_user'})
    };
    const logout = () => {
        OpenFeature.setContext({})
    };
    return (
        <div className='App'>
            font_size: {font_size}
            {
                context.targetingKey ? (
                    <button onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <button onClick={identify}>
                        Identify
                    </button>
                )
            }
        </div>
    );
}

export default App;
