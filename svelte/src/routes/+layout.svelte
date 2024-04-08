
<script>
	import { user } from "$lib/store/user-store";
	import Nav from "./Nav.svelte";
	import FlagProvider from "./FlagProvider.svelte";

	/** @type {import('../../.svelte-kit/types/src/routes').PageData} */
	export let data;
	user.set(data.user ? JSON.parse(data.user):null)
</script>

<div class="app">
	<FlagProvider state={data.flagsmithState}>
		<Nav />
		<slot />
	</FlagProvider>
</div>
