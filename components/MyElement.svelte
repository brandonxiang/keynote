<svelte:options tag="my-element" />

<script>
	export let name = 'world';
</script>

<h1>Hello6 {name}!</h1>
<slot></slot>

<style>
	h1 {
		font-size: larger;
	}
</style>