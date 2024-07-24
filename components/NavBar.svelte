<svelte:options customElement="nav-bar" />

<script>
  import { House, Twitter, Github } from "lucide-svelte";
</script>

<div class="corner">
  <button on:click={() => { window.open('https://brandonxiang.top/keynote') }}>
    <House color="rgb(88, 110, 117)" />
  </button>
  <button on:click={() => { window.open('https://x.com/xwpisme') }}>
    <Twitter color="rgb(88, 110, 117)" />
  </button>
	<button on:click={() => { window.open('https://github.com/brandonxiang') }}>
    <Github color="rgb(88, 110, 117)" />
  </button>
</div>

<style>
  .corner {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 5px;
  }
	button {
		border: 0;
		background-color: transparent;
		padding: 5px;
		cursor: pointer;
	}
	button:hover {
		background-color: #eae8e8db;
		border-radius: 5px;
	}
</style>
