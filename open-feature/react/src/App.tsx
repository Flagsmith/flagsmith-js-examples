import React from 'react';
import {useNumberFlagValue} from "@openfeature/react-sdk";
import {OpenFeature} from "@openfeature/web-sdk";

function App() {
    const font_size = useNumberFlagValue('font_size', 12)
    const context = OpenFeature.getContext();
    const identify = () => {
        const userData = {id:"flagsmith_sample_user", example_trait: 1}
        OpenFeature.setContext({targetingKey: userData.id, traits:{example_trait:userData.example_trait}});
        localStorage.setItem("userData", JSON.stringify(userData))
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
