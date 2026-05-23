<svelte:options customElement="nav-bar" />

<script>
  import AtSign from "@lucide/svelte/icons/at-sign";
  import Code2 from "@lucide/svelte/icons/code-2";
  import House from "@lucide/svelte/icons/house";

  const links = [
    {
      href: "https://brandonxiang.top/keynote",
      label: "Keynote home",
      Icon: House
    },
    {
      href: "https://x.com/xwpisme",
      label: "X profile",
      Icon: AtSign
    },
    {
      href: "https://github.com/brandonxiang",
      label: "GitHub profile",
      Icon: Code2
    }
  ];
</script>

<div class="corner">
  {#each links as { href, label, Icon }}
    <a {href} aria-label={label} target="_blank" rel="noopener noreferrer">
      <Icon color="rgb(88, 110, 117)" size={22} aria-hidden="true" />
    </a>
  {/each}
</div>

<style>
  .corner {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 5px;
  }
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 5px;
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    background-color: #eae8e8db;
  }
  a:focus-visible {
    outline: 2px solid rgba(88, 110, 117, 0.5);
    outline-offset: 2px;
  }
</style>
