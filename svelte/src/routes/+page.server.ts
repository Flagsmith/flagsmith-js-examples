import type {Actions} from "@sveltejs/kit";

/** @type {import('../../.svelte-kit/types/src/routes').Actions} */
export const actions:Actions = {
    login: async ({cookies, request}) => {
        const data = await request.formData();
        const email = `${data.get('email')}`;
        //Mock a user id by formatting the email address
        const id = email.split('@').join('_').replace(/\./, '_')
        // Create a mock user object and store it in cookie
        const userJSON = {
            id,
            email: email,
        }
        cookies.set("user", JSON.stringify(userJSON), {path:"/"})
        return userJSON
    }
}
