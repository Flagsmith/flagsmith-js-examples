<script>
    import { flagsStore } from "$lib/store/flags-store";
    import environmentID from "$lib/utils/environmentID";
    import flagsmith from "flagsmith-es/isomorphic";
    export let state;
    flagsmith.init({
        environmentID: environmentID,
        preventFetch: true, //no need to fetch since we are providing SSR state
        state,
        onChange:()=>{
            flagsStore.set(flagsmith.getState())
        }
    })
</script>
<slot/>
