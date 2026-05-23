<svelte:options customElement="nav-bar" />

<script>
  const links = [
    {
      href: "https://brandonxiang.top/keynote",
      label: "Keynote home",
      paths: [
        '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />',
        '<path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />'
      ]
    },
    {
      href: "https://x.com/xwpisme",
      label: "X profile",
      paths: [
        '<circle cx="12" cy="12" r="4" />',
        '<path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />'
      ]
    },
    {
      href: "https://github.com/brandonxiang",
      label: "GitHub profile",
      paths: [
        '<path d="m18 16 4-4-4-4" />',
        '<path d="m6 8-4 4 4 4" />',
        '<path d="m14.5 4-5 16" />'
      ]
    }
  ];
</script>

<div class="corner">
  {#each links as { href, label, paths }}
    <a {href} aria-label={label} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {@html paths.join("")}
      </svg>
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
    border-radius: 6px;
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    background-color: #eef2f7;
  }
  a:focus-visible {
    outline: 2px solid #d0dce9;
    outline-offset: 2px;
  }
  svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: #1b365d;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  @media (max-width: 720px) {
    .corner {
      display: none;
    }
  }
</style>
