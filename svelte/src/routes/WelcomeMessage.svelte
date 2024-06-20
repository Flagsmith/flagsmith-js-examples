<script lang="ts">
	import {flagsStore} from "$lib/store/flags-store";
	import flagsmith from "flagsmith-es/isomorphic";
	let font_size;
	flagsStore.subscribe(()=>{
		font_size = flagsmith.getValue("font_size")
	})
</script>

<div class='border border-1 rounded border-secondary p-2'>
	<code>font_size: {font_size}</code>
</div>
