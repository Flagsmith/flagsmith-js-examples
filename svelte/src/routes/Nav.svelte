<script>
    import { user } from "$lib/store/user-store";
    import Cookies from "js-cookie";
    import flagsmith from "flagsmith-es/isomorphic";
    let userValue;
    function logout() {
        Cookies.remove("user", {path:"/"})
        user.set(null)
        flagsmith.logout()
    }
    user.subscribe((value) => {
        userValue= value;
    })
</script>

<header>
    <div class='d-flex p-4 flex-row justify-content-end'>
        {#if userValue}
            <button on:click={logout} class='btn btn-link'>
                Logout
            </button>
        {:else}
            <form method="POST" action="?/login" class='d-flex flex-row gap-4'>
                <input
                        type='email'
                        class='form-control'
                        id='email'
                        name='email'
                        value="flagsmith_sample_user@example.com"
                        placeholder='Username'
                        required
                />
                <input
                        placeholder='Password'
                        type='password'
                        class='form-control'
                        id='password'
                        name='password'
                        value="Password"
                        required
                />
                <button
                        type='submit'
                        class='btn btn-primary'
                >
                    Login
                </button>
            </form>
        {/if}
    </div>
</header>
