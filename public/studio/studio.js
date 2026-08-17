/* ============================================================================
   Studio — deep-space aurora
   Vanilla JS, no dependencies. Everything is namespaced to this page.
   ========================================================================= */
(() => {
  "use strict";

  /* ==========================================================================
     CONFIG — edit this block only
     ========================================================================
     To publish a product: paste its URL and flip status to "live". Nothing else
     needs changing; the card becomes a real link on the next load.

       title      shown on the card
       tagline    one line, keep it under ~70 characters
       tags       small chips, 2-4 reads best
       thumbnail  path or URL; null renders a monogram instead
       url        null until the product has a home
       status     "live" | "coming-soon"
     ====================================================================== */
  const PRODUCTS = [
    {
      title: "Competition",
      tagline: "Streetwear storefront — CCC. Denim, tees and caps, built to compete.",
      tags: ["Brand", "E-commerce", "WebGL"],
      thumbnail: null,
      url: "/competition/",
      status: "live",
    },
    {
      title: "SyncSpace",
      tagline: "Real-time collaboration platform — shared canvas, live presence.",
      tags: ["Product Design", "Realtime", "Full-stack"],
      thumbnail: null,
      url: null,
      status: "coming-soon",
    },
    {
      title: "OpsCanvas",
      tagline: "Workflow engine that surfaces what needs attention, and why.",
      tags: ["Dashboard", "Systems", "Data Viz"],
      thumbnail: null,
      url: null,
      status: "coming-soon",
    },
    {
      title: "PulseIQ",
      tagline: "KPI monitoring and forecasting for teams that hate dashboards.",
      tags: ["Analytics", "Forecasting", "Product"],
      thumbnail: null,
      url: null,
      status: "coming-soon",
    },
    {
      title: "Husky AI",
      tagline: "University support platform answering students in plain language.",
      tags: ["AI", "EdTech", "Conversational"],
      thumbnail: null,
      url: null,
      status: "coming-soon",
    },
    {
      title: "InsightFlow",
      tagline: "Turns raw operational data into explainable, decision-ready insight.",
      tags: ["Data", "Full-stack", "Narrative UI"],
      thumbnail: null,
      url: null,
      status: "coming-soon",
    },
  ];

  const APPROACH = [
    {
      title: "Understand before drawing",
      body: "Talk to the people who will use it, map the real workflow, and find the one problem worth solving first.",
    },
    {
      title: "Prototype in the real medium",
      body: "Working code beats a static mockup. Interfaces reveal their flaws only once you can actually click them.",
    },
    {
      title: "Ship, measure, refine",
      body: "Design does not end at handoff. I stay with a product through release and let usage decide what changes next.",
    },
  ];

  const CAPABILITIES = [
    { title: "Product Design", body: "End-to-end flows, interface design, interaction detail." },
    { title: "Design Systems", body: "Tokens, components and the documentation that keeps them honest." },
    { title: "Prototyping", body: "High-fidelity, interactive, built to be tested rather than admired." },
    { title: "Front-end Engineering", body: "React, TypeScript and the CSS that makes it feel considered." },
  ];

  /* Shader palette — keep roughly in step with the CSS custom properties.
     Values are linear RGB triples in 0..1. */
  const PALETTE = {
    magenta: [1.0, 0.3, 0.62],
    violet: [0.55, 0.36, 0.96],
    cyan: [0.13, 0.83, 0.93],
    amber: [1.0, 0.7, 0.28],
  };

  /* Shader tuning. Safe to fiddle with; each is commented where it is used. */
  const SHADER = {
    speed: 0.05, // overall morph rate. Lower is calmer.
    // Noise zoom. This is the dial between "aurora" and "marbled paper": above
    // ~1.4 the ribbons break into busy filaments and stop reading as sky.
    scale: 0.85,
    parallax: 0.07, // how far the field leans toward the pointer (0 disables).
    // Ribbon contrast. Higher gives thinner, brighter bands with more dark sky
    // between them, which is what keeps the type legible.
    ribbonSharpness: 3.2,
    brightness: 0.85, // overall gain on the aurora
    centreFalloff: 0.22, // how dark the middle stays, so hero type has a bed
    maxDpr: 1.75, // device pixel ratio cap — the single biggest perf lever.
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ======================================================================== */
  /* Aurora background                                                        */
  /* ======================================================================== */

  const VERT = `
    attribute vec2 aPos;
    void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  /* Fragment shader. Builds layered fractal noise, folds it into flowing
     ribbons, then tints those ribbons by mixing four palette colours across the
     field so no two areas of the screen read the same. */
  const FRAG = `
    precision highp float;

    uniform vec2  uRes;
    uniform float uTime;
    uniform vec2  uPointer;      // -1..1, eased toward the cursor
    uniform vec3  uMagenta;
    uniform vec3  uViolet;
    uniform vec3  uCyan;
    uniform vec3  uAmber;
    uniform float uScale;
    uniform float uSharp;
    uniform float uBright;
    uniform float uCentre;

    // -- simplex noise (Ashima Arts, public domain) -------------------------
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865, 0.366025404, -0.577350269, 0.024390244);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m; m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // Fractal Brownian motion: stacked octaves at halving amplitude. Four is
    // enough for a soft field and cheap enough for integrated GPUs.
    float fbm(vec2 p) {
      float total = 0.0, amp = 0.5;
      for (int i = 0; i < 4; i++) {
        total += snoise(p) * amp;
        p *= 2.02;   // slightly off 2.0 to avoid visible axis-aligned repeats
        amp *= 0.5;
      }
      return total;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uRes.xy;
      // Correct for aspect so the ribbons do not stretch on wide monitors.
      vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
      p += uPointer;                    // parallax lean
      p *= uScale;

      float t = uTime;

      // Domain warp: displace the sample point by another noise field. This is
      // what turns smooth blobs into curling, aurora-like filaments.
      vec2 warp = vec2(fbm(p + vec2(0.0, t * 0.7)), fbm(p + vec2(3.7, -t * 0.5)));
      float field = fbm(p + warp * 1.35 + vec2(t * 0.25, t * 0.1));

      // Fold the field into bands, then sharpen. A high exponent leaves thin
      // luminous ribbons separated by wide stretches of near-black sky.
      float ribbon = pow(abs(sin(field * 1.7 + t * 0.35)), uSharp);

      // Colour by position and field value so the palette travels across the
      // screen instead of sitting in fixed zones.
      float mixA = smoothstep(-0.6, 0.9, field + uv.x * 0.8);
      float mixB = smoothstep(-0.8, 1.0, warp.x + uv.y * 0.7);
      vec3 col = mix(uViolet, uMagenta, mixA);
      col = mix(col, uCyan, mixB * 0.75);
      col = mix(col, uAmber, smoothstep(0.6, 1.0, ribbon) * 0.4);

      // The ribbons are the only light source; everything else falls to sky.
      col *= pow(ribbon, 1.5) * uBright;

      // Fade the centre hardest. The hero sits there, and legible type matters
      // more than an even wash of colour.
      float d = length((uv - 0.5) * vec2(uRes.x / uRes.y, 1.0));
      float centre = smoothstep(0.1, 0.9, d);
      col *= uCentre + centre * (1.0 - uCentre);

      // Deep indigo sky rather than pure black, so the field never reads flat.
      col += vec3(0.022, 0.014, 0.055);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function initAurora() {
    const canvas = document.getElementById("aurora");
    if (!canvas) return;

    // Reduced motion: leave the CSS gradient in place and never start a loop.
    if (prefersReducedMotion) return;

    let gl;
    try {
      gl =
        canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" }) ||
        canvas.getContext("experimental-webgl");
    } catch {
      gl = null;
    }
    if (!gl) return; // CSS gradient stands in

    const compile = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("[studio] shader compile failed:", gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[studio] program link failed:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // One full-screen triangle pair.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name) => gl.getUniformLocation(program, name);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uPointer = u("uPointer");
    const uScale = u("uScale");
    const uSharp = u("uSharp");

    gl.uniform3fv(u("uMagenta"), PALETTE.magenta);
    gl.uniform3fv(u("uViolet"), PALETTE.violet);
    gl.uniform3fv(u("uCyan"), PALETTE.cyan);
    gl.uniform3fv(u("uAmber"), PALETTE.amber);
    gl.uniform1f(uScale, SHADER.scale);
    gl.uniform1f(uSharp, SHADER.ribbonSharpness);
    gl.uniform1f(u("uBright"), SHADER.brightness);
    gl.uniform1f(u("uCentre"), SHADER.centreFalloff);

    function resize() {
      // Capping DPR is the single biggest performance lever: a 3x retina phone
      // would otherwise shade nine times the pixels for no visible gain.
      const dpr = Math.min(window.devicePixelRatio || 1, SHADER.maxDpr);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener(
      "pointermove",
      (e) => {
        pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );

    let running = true;
    let raf = 0;
    let elapsed = 0;
    let last = performance.now();

    function frame(now) {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05); // clamp after a tab stall
      last = now;
      elapsed += dt * (SHADER.speed * 10);

      // Ease the pointer so the field glides rather than snapping.
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      resize();
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uPointer, pointer.x * SHADER.parallax, pointer.y * SHADER.parallax);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // Do not shade a canvas nobody is looking at.
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    // Or one that has been scrolled past.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 }
      ).observe(canvas);
    }

    window.addEventListener("resize", resize, { passive: true });

    resize();
    raf = requestAnimationFrame(frame);
    canvas.classList.add("ready");
  }

  /* ======================================================================== */
  /* Rendering                                                                */
  /* ======================================================================== */

  const escape = (value) =>
    String(value).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const monogram = (title) =>
    title
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  function renderProducts() {
    const list = document.getElementById("cards");
    if (!list) return;

    list.innerHTML = PRODUCTS.map((product) => {
      const live = product.status === "live" && product.url;
      // Live cards are anchors; coming-soon cards are inert <div>s, so they are
      // not focusable or announced as links.
      const tag = live ? "a" : "div";
      const attrs = live
        ? ` href="${escape(product.url)}" target="_blank" rel="noopener noreferrer" data-cursor="link"`
        : ' aria-disabled="true"';

      const thumb = product.thumbnail
        ? `<img src="${escape(product.thumbnail)}" alt="${escape(product.title)}" loading="lazy" decoding="async" />`
        : `<div class="card__mono" aria-hidden="true">${escape(monogram(product.title))}</div>`;

      const badge = live ? "" : '<span class="badge">Coming soon</span>';

      const arrow = live
        ? '<svg class="card__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>'
        : "";

      return `
        <li>
          <${tag} class="card card--${live ? "live" : "soon"}"${attrs}>
            ${badge}
            <div class="card__thumb">${thumb}</div>
            <div class="card__body">
              <div class="card__title-row">
                <h3 class="card__title">${escape(product.title)}</h3>
                ${arrow}
              </div>
              <p class="card__tagline">${escape(product.tagline)}</p>
              <div class="card__tags">
                ${product.tags.map((t) => `<span class="tag">${escape(t)}</span>`).join("")}
              </div>
            </div>
          </${tag}>
        </li>`;
    }).join("");
  }

  function renderApproach() {
    const list = document.getElementById("approach-list");
    if (!list) return;
    list.innerHTML = APPROACH.map(
      (step) => `
        <li class="approach__item">
          <h3>${escape(step.title)}</h3>
          <p>${escape(step.body)}</p>
        </li>`
    ).join("");
  }

  function renderCapabilities() {
    const list = document.getElementById("cap-grid");
    if (!list) return;
    list.innerHTML = CAPABILITIES.map(
      (cap) => `
        <li class="cap">
          <h3>${escape(cap.title)}</h3>
          <p>${escape(cap.body)}</p>
        </li>`
    ).join("");
  }

  /* ======================================================================== */
  /* Interactions                                                             */
  /* ======================================================================== */

  function initReveal() {
    const targets = document.querySelectorAll(".reveal, .card, .approach__item, .cap");

    // Opt in to the hidden starting state only now that we know we can undo it.
    // Until this class lands, the CSS leaves everything visible.
    document.documentElement.classList.add("js-reveal");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          // Stagger within a batch so grids cascade rather than popping at once.
          setTimeout(() => entry.target.classList.add("in"), index * 70);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
  }

  function initCursor() {
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;
    // Coarse pointers and reduced-motion users keep the native cursor.
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const lens = cursor.querySelector(".cursor__lens");
    const dot = cursor.querySelector(".cursor__dot");
    document.body.classList.add("has-custom-cursor");

    let x = 0, y = 0, lensX = 0, lensY = 0;

    window.addEventListener(
      "pointermove",
      (e) => {
        x = e.clientX;
        y = e.clientY;
        cursor.classList.add("is-visible");
        dot.style.transform = `translate(${x}px, ${y}px)`;
      },
      { passive: true }
    );

    document.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));

    // The lens trails the dot slightly — the lag is what makes it feel physical.
    (function follow() {
      lensX += (x - lensX) * 0.16;
      lensY += (y - lensY) * 0.16;
      lens.style.transform = `translate(${lensX}px, ${lensY}px)`;
      requestAnimationFrame(follow);
    })();

    const interactive = 'a, button, [data-cursor="link"]';
    document.addEventListener("pointerover", (e) => {
      if (e.target.closest(interactive)) cursor.classList.add("is-hover");
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest(interactive)) cursor.classList.remove("is-hover");
    });
  }

  function initReturnPath() {
    // Esc mirrors the "back to dev" control, matching the gesture on the other side.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") window.location.href = "/";
    });
  }

  function init() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    renderApproach();
    renderProducts();
    renderCapabilities();
    initReveal();
    initCursor();
    initReturnPath();
    initAurora();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
