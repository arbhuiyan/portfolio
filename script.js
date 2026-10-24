// ---------- Data ----------
const CATEGORIES = [
  { id: "frontend", label: "Languages & Frameworks", skills: ["TypeScript", "JavaScript", "Node.js", "Express.js", "Next.js", "React", "Vue.js", "React Native", "Expo", "PHP", "Laravel", ".NET", "HTML", "CSS", "Tailwind CSS"] },
  { id: "cloud", label: "Cloud & DevOps", skills: ["AWS Lambda", "AWS ECS", "API Gateway", "SQS", "SNS", "EventBridge", "Cognito", "Terraform", "CloudFormation", "Docker", "Kubernetes", "GitLab CI", "Azure DevOps", "Git", "Linux", "Bash", "Nginx"] },
  { id: "architecture", label: "Architecture & APIs", skills: ["Microservices", "Serverless", "Modular Monolith", "Event-Driven", "Kafka", "DDD", "OOP", "REST", "GraphQL", "WebSockets", "OAuth2", "OIDC", "SSO"] },
  { id: "data", label: "Databases", skills: ["PostgreSQL", "MySQL", "DynamoDB", "NoSQL", "Redis", "Elasticsearch"] },
  { id: "quality", label: "Testing, Security & Monitoring", skills: ["Jest", "Cypress", "Playwright", "OWASP", "SonarQube", "Mend", "Prisma Cloud", "CloudWatch", "New Relic"] },
  { id: "ai", label: "AI", skills: ["Agentic AI", "RAG", "MCP", "LLM Integration", "Prompt Engineering", "Claude", "GitHub Copilot", "Devin"] },
];

const AREAS = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "architecture", label: "Architecture" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "ai", label: "AI" },
  { id: "quality", label: "Quality & Security" },
  { id: "leadership", label: "Leadership" },
];

const EXPERIENCE = [
  { area: "fullstack", text: "Deliver features end to end on <b>GCSEPod</b> and the HR/compliance SaaS products <b>Access People for Education</b> and <b>Access SCR</b> — web front ends, APIs, background workers and mobile apps.",
    skills: ["React", "Vue.js", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express.js", "PHP", "Laravel", "React Native", "Expo", "HTML", "CSS", "Tailwind CSS", "REST", "GraphQL", "WebSockets"] },
  { area: "architecture", text: "Led architecture evolution from monolith to <b>microservices</b>, <b>serverless</b> and <b>modular monolith</b>, choosing the right pattern per product to balance scalability, cost and team velocity.",
    skills: ["Microservices", "Serverless", "Modular Monolith", "DDD", "OOP", "AWS Lambda", "API Gateway"] },
  { area: "leadership", text: "Act as an <b>internal technical consultant</b> across the portfolio, defining roadmaps and technology stacks with product, design and engineering teams for new products and modernisation programmes.",
    skills: ["Microservices", "Serverless", "Modular Monolith", "Next.js", "React", "Node.js", ".NET"] },
  { area: "cloud", text: "Moved infrastructure to <b>Infrastructure as Code</b> (Terraform, CloudFormation, Serverless), speeding up provisioning and eliminating configuration drift.",
    skills: ["Terraform", "CloudFormation", "Serverless", "AWS Lambda", "API Gateway", "Cognito", "Bash", "Linux"] },
  { area: "cloud", text: "Migrated staging from <b>Kubernetes to AWS ECS</b> with Terraform, significantly reducing cost by eliminating idle capacity.",
    skills: ["Kubernetes", "AWS ECS", "Terraform", "Docker", "Nginx", "Linux"] },
  { area: "cloud", text: "Built <b>CI/CD pipelines</b> in GitLab and Azure DevOps, moving teams to frequent, automated releases.",
    skills: ["GitLab CI", "Azure DevOps", "Git", "Docker", "Bash"] },
  { area: "architecture", text: "Implemented <b>event-driven workflows</b>, third-party integrations and database/performance optimisation across relational and NoSQL stores.",
    skills: ["Event-Driven", "Kafka", "SQS", "SNS", "EventBridge", "PostgreSQL", "MySQL", "DynamoDB", "NoSQL", "Redis", "Elasticsearch"] },
  { area: "architecture", text: "Delivered <b>authentication and identity</b> with OAuth2, OIDC and SSO.",
    skills: ["OAuth2", "OIDC", "SSO", "Cognito"] },
  { area: "quality", text: "Own <b>security scanning, automated testing, observability</b> and incident response for production services.",
    skills: ["Jest", "Cypress", "Playwright", "OWASP", "SonarQube", "Mend", "Prisma Cloud", "CloudWatch", "New Relic"] },
  { area: "ai", text: "Built an <b>AI marking agent</b> that auto-marks student work and highlights key areas for teacher review — widely adopted by teachers.",
    skills: ["Agentic AI", "LLM Integration", "Prompt Engineering", "Claude", "AWS Lambda", "Node.js"] },
  { area: "ai", text: "Designed <b>RAG and MCP-based search</b> over curated educational content, enabling teachers to build high-quality, topic-specific assignments.",
    skills: ["RAG", "MCP", "LLM Integration", "Elasticsearch", "Prompt Engineering", "Claude"] },
  { area: "leadership", text: "Mentor engineers, improve onboarding, set standards for <b>AI-assisted development</b> and conduct technical interviews.",
    skills: ["GitHub Copilot", "Devin", "Claude", "Prompt Engineering"] },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Theme ----------
const root = document.documentElement;
const isDark = () => root.dataset.theme === "dark";
const themeListeners = [];

function setTheme(theme) {
  root.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch (e) {}
  themeListeners.forEach((fn) => fn(theme));
}

$("#theme-toggle").addEventListener("click", () => {
  setTheme(isDark() ? "light" : "dark");
  if (!isDark()) { spawnBugs(5); showToast("Light mode again? The bugs thank you. 🐛"); }
});

// ---------- Critical "light attracts bugs" alert ----------
const alertEl = $("#bug-alert");

function hideAlert() {
  if (alertEl.hidden) return;
  alertEl.classList.add("out");
  setTimeout(() => { alertEl.hidden = true; alertEl.classList.remove("out"); }, 300);
}

let toastTimer;
function showToast(msg) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.remove(), 3200);
}

// Bugs crawl towards the light (the theme toggle) and vanish into it
function spawnBugs(count) {
  if (reduceMotion) return;
  const target = $("#theme-toggle").getBoundingClientRect();
  const tx = target.left + target.width / 2, ty = target.top + target.height / 2;
  for (let i = 0; i < count; i++) {
    const bug = document.createElement("span");
    bug.className = "bug";
    bug.textContent = ["🐛", "🪲", "🐞", "🦟"][i % 4];
    document.body.appendChild(bug);
    const edge = Math.random();
    let x = edge < 0.5 ? (Math.random() < 0.5 ? -30 : innerWidth + 30) : Math.random() * innerWidth;
    let y = edge < 0.5 ? Math.random() * innerHeight : innerHeight + 30;
    const speed = 1.6 + Math.random() * 1.6;
    let wobble = Math.random() * 10;
    const step = () => {
      const dx = tx - x, dy = ty - y, dist = Math.hypot(dx, dy);
      if (dist < 14) { bug.style.opacity = "0"; setTimeout(() => bug.remove(), 400); return; }
      wobble += 0.25;
      const ang = Math.atan2(dy, dx) + Math.sin(wobble) * 0.5;
      x += Math.cos(ang) * speed; y += Math.sin(ang) * speed;
      bug.style.transform = `translate(${x - 11}px, ${y - 11}px) rotate(${ang + Math.PI / 2}rad)`;
      requestAnimationFrame(step);
    };
    setTimeout(step, i * 220);
  }
}

$("#alert-dark").addEventListener("click", () => {
  setTheme("dark");
  hideAlert();
  showToast("Threat neutralised. Welcome to the dark side. 🌙");
});
$("#alert-bugs").addEventListener("click", () => {
  hideAlert();
  spawnBugs(8);
  showToast("Don't say we didn't warn you. 🐛");
});
themeListeners.push((t) => { if (t === "dark") hideAlert(); });

if (!isDark()) setTimeout(() => { if (!isDark()) alertEl.hidden = false; }, 1800);

// ---------- Typed tagline ----------
(() => {
  const words = ["full-stack products.", "cloud platforms.", "AI-powered features.", "scalable architectures.", "CI/CD pipelines.", "web & mobile apps."];
  const el = $("#typed");
  if (reduceMotion) { el.textContent = words[0]; return; }
  let w = 0, i = 0, deleting = false;
  const tick = () => {
    const word = words[w];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    let delay = deleting ? 35 : 70;
    if (!deleting && i === word.length) { deleting = true; delay = 1600; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  };
  tick();
})();

// ---------- Terminal ----------
(() => {
  const lines = [
    ['k', 'const'], [' ', ' '], ['v', 'abdur'], [' ', ' = {\n'],
    [' ', '  role: '], ['s', '"Senior Full-Stack Engineer"'], [' ', ',\n'],
    [' ', '  focus: ['], ['s', '"Cloud"'], [' ', ', '], ['s', '"DevOps"'], [' ', ', '], ['s', '"AI"'], [' ', '],\n'],
    [' ', '  stack: ['], ['s', '"TypeScript"'], [' ', ', '], ['s', '"React"'], [' ', ', '], ['s', '"AWS"'], [' ', '],\n'],
    [' ', '  status: '], ['s', '"ongoing"'], [' ', ',\n'],
    [' ', '};\n\n'],
    ['c', '// click a skill below to explore ↓'],
  ];
  const pre = $("#term-code");
  const render = (n) => {
    let left = n, html = "";
    for (const [cls, txt] of lines) {
      if (left <= 0) break;
      const part = txt.slice(0, left);
      left -= txt.length;
      const safe = part.replace(/</g, "&lt;");
      html += cls === " " ? safe : `<span class="t-${cls}">${safe}</span>`;
    }
    pre.innerHTML = html + '<span class="caret">▋</span>';
  };
  const total = lines.reduce((a, [, t]) => a + t.length, 0);
  if (reduceMotion) return render(total);
  let n = 0;
  const step = () => { render(n); if (n++ < total) setTimeout(step, 18); };
  setTimeout(step, 400);
})();

// ---------- Skills explorer ----------
const tabsEl = $("#skill-tabs");
const chipsEl = $("#skill-chips");
const usageEl = $("#skill-usage");
let activeCat = CATEGORIES[0].id;
let activeSkill = null;

const usageCount = (skill) => EXPERIENCE.filter((e) => e.skills.includes(skill)).length;

function renderTabs() {
  tabsEl.innerHTML = CATEGORIES.map((c) =>
    `<button role="tab" class="tab ${c.id === activeCat ? "active" : ""}" data-cat="${c.id}" aria-selected="${c.id === activeCat}">${c.label}</button>`
  ).join("");
}

function renderChips() {
  const cat = CATEGORIES.find((c) => c.id === activeCat);
  chipsEl.innerHTML = cat.skills.map((s, idx) => {
    const n = usageCount(s);
    return `<button class="chip ${s === activeSkill ? "active" : ""}" data-skill="${s}" style="--d:${idx * 30}ms">
      ${s}${n ? `<span class="chip-n">${n}</span>` : ""}
    </button>`;
  }).join("");
}

function renderUsage() {
  if (!activeSkill) {
    usageEl.innerHTML = `<p class="usage-empty">Select a skill above ↑</p>`;
    return;
  }
  const items = EXPERIENCE.filter((e) => e.skills.includes(activeSkill));
  const label = AREAS.find.bind(AREAS);
  usageEl.innerHTML = `
    <div class="usage-head">
      <h5>Where I use <span>${activeSkill}</span></h5>
      <button class="link-btn" id="usage-jump">See in experience →</button>
    </div>
    ${items.length
      ? `<ul>${items.map((e) => `<li><span class="area-tag">${label((a) => a.id === e.area).label}</span><p>${e.text}</p></li>`).join("")}</ul>`
      : `<p class="usage-empty">Part of my everyday toolkit across the products I work on.</p>`}
  `;
  const jump = $("#usage-jump");
  jump.hidden = !items.length;
  jump.addEventListener("click", () => {
    highlightSkill(activeSkill);
    $("#experience").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
}

tabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  activeCat = btn.dataset.cat;
  renderTabs();
  renderChips();
});

chipsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  activeSkill = activeSkill === btn.dataset.skill ? null : btn.dataset.skill;
  $$(".chip", chipsEl).forEach((c) => c.classList.toggle("active", c.dataset.skill === activeSkill));
  renderUsage();
});

$$(".focus").forEach((b) => b.addEventListener("click", () => {
  activeCat = b.dataset.goto;
  activeSkill = null;
  renderTabs(); renderChips(); renderUsage();
  $("#skills").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}));

renderTabs();
renderChips();

// ---------- Experience ----------
const filtersEl = $("#exp-filters");
const listEl = $("#exp-list");
let activeArea = "all";
let highlighted = null;

function renderFilters() {
  filtersEl.innerHTML = AREAS.map((a) =>
    `<button class="filter ${a.id === activeArea ? "active" : ""}" data-area="${a.id}">${a.label}</button>`
  ).join("") + (highlighted ? `<button class="filter clear" data-clear>✕ ${highlighted}</button>` : "");
}

function renderExperience() {
  listEl.innerHTML = EXPERIENCE.map((e, idx) => {
    const visible = activeArea === "all" || e.area === activeArea;
    const match = highlighted && e.skills.includes(highlighted);
    const dim = highlighted && !match;
    return `<li class="point ${visible ? "" : "hidden"} ${match ? "match" : ""} ${dim ? "dim" : ""}" data-idx="${idx}">
      <button class="point-head" aria-expanded="false">
        <p>${e.text}</p><span class="plus" aria-hidden="true">+</span>
      </button>
      <div class="point-skills">${e.skills.map((s) => `<span class="${s === highlighted ? "hit" : ""}">${s}</span>`).join("")}</div>
    </li>`;
  }).join("");
}

function highlightSkill(skill) {
  highlighted = skill;
  activeArea = "all";
  renderFilters();
  renderExperience();
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  if (btn.hasAttribute("data-clear")) highlighted = null;
  else activeArea = btn.dataset.area;
  renderFilters();
  renderExperience();
});

listEl.addEventListener("click", (e) => {
  const head = e.target.closest(".point-head");
  if (!head) return;
  const li = head.parentElement;
  const open = li.classList.toggle("open");
  head.setAttribute("aria-expanded", open);
});

renderFilters();
renderExperience();

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach((el, i) => { el.style.setProperty("--d", `${(i % 4) * 80}ms`); io.observe(el); });

// ---------- Active nav + progress ----------
const sections = $$("main section[id]");
const navLinks = $$("#nav-links a");
const progress = $("#progress");
const onScroll = () => {
  const h = document.documentElement;
  progress.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
  let current = "";
  for (const s of sections) if (s.getBoundingClientRect().top < 140) current = s.id;
  navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Cursor spotlight + glowing card borders ----------
const pointer = { x: -9999, y: -9999 };
if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  const spot = $("#spotlight");
  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX; pointer.y = e.clientY;
    spot.style.setProperty("--x", `${e.clientX}px`);
    spot.style.setProperty("--y", `${e.clientY}px`);
    const card = e.target.closest && e.target.closest(".glow");
    if (card) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
  }, { passive: true });
  document.addEventListener("pointerleave", () => { pointer.x = pointer.y = -9999; });
}

// ---------- Futuristic background: particle network that lights up on scroll & hover ----------
(() => {
  const canvas = $("#bg-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, dpr, nodes = [], colors;
  let energy = 0, lastScroll = scrollY;

  const readColors = () => {
    const cs = getComputedStyle(root);
    colors = { a: cs.getPropertyValue("--accent").trim(), b: cs.getPropertyValue("--accent-2").trim(), dark: isDark() };
  };
  const hexA = (hex, a) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
  };

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(110, (w * h) / 14000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: 1 + Math.random() * 1.6, c: Math.random() < 0.5 ? "a" : "b", depth: 0.3 + Math.random() * 0.7,
    }));
  }

  // Light pulses that travel along connections
  const pulses = [];

  function frame() {
    const dy = scrollY - lastScroll;
    lastScroll = scrollY;
    energy = Math.min(1, energy * 0.94 + Math.abs(dy) * 0.004);
    root.style.setProperty("--energy", energy.toFixed(3));
    root.style.setProperty("--grid-y", `${(-scrollY * 0.6) % 64}px`);

    ctx.clearRect(0, 0, w, h);
    const base = colors.dark ? 0.18 : 0.12;
    const linkDist = 140;

    for (const n of nodes) {
      const boost = 1 + energy * 4;
      n.x += n.vx * boost;
      n.y += n.vy * boost - dy * 0.15 * n.depth;
      if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
    }

    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      const pm = Math.hypot(p.x - pointer.x, p.y - pointer.y);
      for (let j = i + 1; j < nodes.length; j++) {
        const q = nodes[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d > linkDist) continue;
        const near = Math.max(0, 1 - Math.min(pm, Math.hypot(q.x - pointer.x, q.y - pointer.y)) / 220);
        const alpha = (1 - d / linkDist) * (base + energy * 0.45 + near * 0.7);
        ctx.strokeStyle = hexA(colors[p.c], Math.min(alpha, 0.9));
        ctx.lineWidth = near > 0.2 ? 1.2 : 0.7;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        if (pulses.length < 14 && Math.random() < 0.0004 + energy * 0.004 + near * 0.004) pulses.push({ p, q, t: 0 });
      }
    }

    for (const n of nodes) {
      const near = Math.max(0, 1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / 200);
      ctx.fillStyle = hexA(colors[n.c], Math.min(1, 0.35 + near + energy * 0.5));
      ctx.shadowColor = colors[n.c];
      ctx.shadowBlur = near * 18 + energy * 10;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r + near * 2, 0, Math.PI * 2); ctx.fill();
    }

    for (let i = pulses.length - 1; i >= 0; i--) {
      const s = pulses[i];
      s.t += 0.025;
      if (s.t >= 1) { pulses.splice(i, 1); continue; }
      const x = s.p.x + (s.q.x - s.p.x) * s.t, y = s.p.y + (s.q.y - s.p.y) * s.t;
      ctx.fillStyle = hexA(colors.a, 0.95);
      ctx.shadowColor = colors.a; ctx.shadowBlur = 16;
      ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.shadowBlur = 0;

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  readColors();
  resize();
  themeListeners.push(() => requestAnimationFrame(readColors));
  addEventListener("resize", resize);
  requestAnimationFrame(frame);
})();
