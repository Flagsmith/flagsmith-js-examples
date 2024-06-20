import {createFlagsmithInstance} from "flagsmith-es/isomorphic";
import type {Action} from "@sveltejs/kit";
import getTraits from "$lib/utils/getTraits";
import type {User} from "$lib/types";
import environmentID from "$lib/utils/environmentID";
/** @type {import('../../.svelte-kit/types/src/routes').PageLoad} */
export const load:Action = async ({ cookies }) => {
    const user = cookies.get("user")
    let userData:User|undefined;
    if(user) {
        try {
            userData = JSON.parse(user)
        } catch (e){}
    }

    const flagsmith = createFlagsmithInstance()

    await flagsmith.init({
        environmentID: environmentID,
        identity: userData?.id,
        traits: userData? getTraits(userData):undefined,
    })

    return {
        user: cookies.get("user"),
        flagsmithState: flagsmith.getState()
    };
};
