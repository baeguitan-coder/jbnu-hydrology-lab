const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const progress = document.querySelector(".progress span");
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-nav a")];

function updateScrollState() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 36);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  let current = "home";
  for (const section of sections) {
    if (section.offsetTop <= y + 160) current = section.id;
  }
  navLinks.forEach(link => link.classList.toggle("active", link.hash === `#${current}`));
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
  mobileNav.classList.toggle("open", !open);
});

mobileNav.addEventListener("click", event => {
  if (!event.target.closest("a")) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
  mobileNav.classList.remove("open");
});

document.querySelector("[data-show-papers]").addEventListener("click", event => {
  const button = event.currentTarget;
  const open = button.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("papers-open", !open);
  button.setAttribute("aria-expanded", String(!open));
  button.firstChild.textContent = open ? "논문 더 보기 " : "논문 접기 ";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(item => observer.observe(item));

document.querySelector("[data-year]").textContent = new Date().getFullYear();
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();
