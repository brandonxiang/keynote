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
    position: fixed;
    z-index: 30;
    top: 18px;
    right: 22px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 52px;
    padding: 8px;
    border-radius: 12px;
    background: #faf9f5;
    box-shadow: 0 0 0 1px #e8e6dc, 0 10px 28px rgba(20, 20, 19, 0.05);
  }
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    color: inherit;
    text-decoration: none;
    transition: background-color 160ms cubic-bezier(0.16, 1, 0.3, 1), transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  a:hover {
    background-color: #eef2f7;
  }
  a:active {
    transform: scale(0.94);
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
