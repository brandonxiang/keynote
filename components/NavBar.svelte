<svelte:options customElement="nav-bar" />

<script>
  import { onMount, tick } from "svelte";
  import { toBlob } from "html-to-image";
  import JSZip from "jszip";

  let exporting = false;
  let exportStatus = "";
  let exportTotal = 0;

  const waitForPaint = () =>
    new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });

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

  const exportIconPaths = [
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',
    '<path d="M7 10l5 5 5-5" />',
    '<path d="M12 15V3" />'
  ];

  onMount(() => {
    const style = document.createElement("style");
    style.textContent = `
      .plog-capture-viewport {
        position: fixed;
        left: 0;
        top: 0;
        width: 1280px;
        height: 720px;
        overflow: hidden;
        background: #f5f4ed;
        pointer-events: none;
        z-index: 2147483645;
      }
      .plog-capture-viewport .reveal {
        width: 1280px;
        height: 720px;
      }
      .plog-capture-viewport .reveal .slides {
        position: relative;
        inset: auto;
        width: 1280px;
        height: 720px;
        transform: none !important;
      }
      .plog-capture-viewport .reveal .slides section {
        display: block !important;
        position: absolute !important;
        inset: 0 !important;
        width: 1280px !important;
        height: 720px !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => style.remove();
  });

  function slugify(value) {
    return value
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "keynote";
  }

  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function toSquareImage(sourceBlob) {
    const sourceUrl = URL.createObjectURL(sourceBlob);
    const source = new Image();
    source.decoding = "async";
    source.src = sourceUrl;
    await new Promise((resolve, reject) => {
      source.onload = resolve;
      source.onerror = reject;
    });

    const size = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    context.fillStyle = "#f5f4ed";
    context.fillRect(0, 0, size, size);

    const scale = Math.min(size / source.width, size / source.height);
    const width = Math.round(source.width * scale);
    const height = Math.round(source.height * scale);
    const x = Math.round((size - width) / 2);
    const y = Math.round((size - height) / 2);

    context.drawImage(source, x, y, width, height);
    URL.revokeObjectURL(sourceUrl);

    return new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png", 0.92);
    });
  }

  function createCaptureStage(slide) {
    const viewport = document.createElement("div");
    const reveal = document.createElement("div");
    const slides = document.createElement("div");
    const clone = slide.cloneNode(true);

    viewport.className = "plog-capture-viewport";
    reveal.className = "reveal";
    slides.className = "slides";
    clone.classList.add("present");
    clone.classList.remove("past", "future");
    clone.removeAttribute("hidden");

    viewport.appendChild(reveal);
    reveal.appendChild(slides);
    slides.appendChild(clone);
    document.body.appendChild(viewport);

    return viewport;
  }

  async function captureSlide(slide) {
    const stage = createCaptureStage(slide);

    const sourceBlob = await toBlob(stage, {
      backgroundColor: "#f5f4ed",
      height: 720,
      pixelRatio: 1,
      skipAutoScale: true,
      width: 1280
    });

    stage.remove();

    return toSquareImage(sourceBlob);
  }

  async function exportPlogImages() {
    const reveal = window.Reveal;

    if (!reveal?.getSlides || exporting) {
      return;
    }

    exporting = true;
    exportStatus = "Preparing";

    const slides = reveal.getSlides().filter((slide) => !slide.classList.contains("stack"));
    const zip = new JSZip();
    const title = slugify(document.title.replace(/\/.*/, ""));
    exportTotal = slides.length;

    try {
      await tick();
      await waitForPaint();
      await document.fonts?.ready;

      for (let index = 0; index < slides.length; index += 1) {
        const slide = slides[index];
        exportStatus = `${index + 1}/${slides.length}`;

        const imageBlob = await captureSlide(slide);
        zip.file(`${String(index + 1).padStart(2, "0")}-${title}.png`, imageBlob);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      exportStatus = "Ready";
      downloadBlob(blob, `${title}-plog.zip`);
    } finally {
      document.querySelectorAll(".plog-capture-viewport").forEach((stage) => stage.remove());
      exportStatus = "";
      exportTotal = 0;
      exporting = false;
    }
  }
</script>

<div class="corner">
  {#each links as { href, label, paths }}
    <a {href} aria-label={label} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {@html paths.join("")}
      </svg>
    </a>
  {/each}
  <button
    aria-label={exporting ? `Exporting plog images ${exportStatus}` : "Export plog images"}
    class:working={exporting}
    disabled={exporting}
    on:click={exportPlogImages}
    title="Export plog images"
    type="button"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {@html exportIconPaths.join("")}
    </svg>
  </button>
  <span aria-live="polite" class="sr-only">{exportStatus}</span>
</div>

{#if exporting}
  <div aria-label="Exporting plog images" aria-modal="true" class="export-overlay" role="dialog">
    <div class="export-dialog">
      <span class="export-kicker">Plog export</span>
      <h2>正在生成 1:1 图片</h2>
      <p>请保持当前页面打开，完成后会自动下载 zip。</p>
      <div class="export-progress" aria-hidden="true">
        <span style={`width: ${exportTotal && exportStatus.includes("/") ? (Number(exportStatus.split("/")[0]) / exportTotal) * 100 : 6}%`}></span>
      </div>
      <strong>{exportStatus}</strong>
    </div>
  </div>
{/if}

<style>
  :host {
    position: fixed;
    inset: 0;
    z-index: 2147483646;
    pointer-events: none;
  }

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
    pointer-events: auto;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a,
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: background-color 160ms cubic-bezier(0.16, 1, 0.3, 1), transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  a:hover,
  button:hover {
    background-color: #eef2f7;
  }
  a:active,
  button:active {
    transform: scale(0.94);
  }
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid #d0dce9;
    outline-offset: 2px;
  }
  button:disabled {
    cursor: wait;
    opacity: 0.68;
  }
  button.working svg {
    animation: pulse 900ms ease-in-out infinite alternate;
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
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .export-overlay {
    position: fixed;
    inset: 0;
    z-index: 40;
    display: grid;
    place-items: center;
    background: rgba(245, 244, 237, 0.82);
    backdrop-filter: blur(3px);
    pointer-events: auto;
  }
  .export-dialog {
    width: min(360px, calc(100vw - 40px));
    padding: 24px 26px;
    border: 1px solid #e8e6dc;
    border-radius: 12px;
    background: #faf9f5;
    box-shadow: 0 22px 52px rgba(20, 20, 19, 0.12);
    color: #141413;
    font-family: "Source Han Serif SC", "Noto Serif CJK SC", "Noto Serif SC", "Songti SC", STSong, Georgia, serif;
  }
  .export-kicker {
    display: block;
    margin-bottom: 10px;
    color: #1b365d;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.8pt;
    text-transform: uppercase;
  }
  .export-dialog h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.25;
  }
  .export-dialog p {
    margin: 12px 0 18px;
    color: #504e49;
    font-size: 14px;
    line-height: 1.5;
  }
  .export-progress {
    height: 7px;
    overflow: hidden;
    border-radius: 999px;
    background: #e8e6dc;
  }
  .export-progress span {
    display: block;
    height: 100%;
    min-width: 16px;
    border-radius: inherit;
    background: #1b365d;
    transition: width 180ms ease;
  }
  .export-dialog strong {
    display: block;
    margin-top: 12px;
    color: #1b365d;
    font-size: 13px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  @keyframes pulse {
    from {
      opacity: 0.5;
      transform: translateY(1px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 720px) {
    .corner {
      display: none;
    }
  }
</style>
