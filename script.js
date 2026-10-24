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
$("#theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

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

// ---------- Cursor spotlight ----------
if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  const spot = $("#spotlight");
  window.addEventListener("pointermove", (e) => {
    spot.style.setProperty("--x", `${e.clientX}px`);
    spot.style.setProperty("--y", `${e.clientY}px`);
  }, { passive: true });
}
