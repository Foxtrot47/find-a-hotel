<script lang="ts">
	export let src: string | null | undefined = null;
	</script>
<svelte>
	<img alt="Avatar" class="rounded-full" height="30" width="30" src={src || "/placeholder.jpg"} />
</svelte>
