const WM = (f) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(f) + "?width=900";

const ALL_CARS = [
  { title: "2019 Toyota Camry SE", price: "₦28,500,000", mileage: "74,000 km", trans: "Automatic", body: "Sedan", condition: "Foreign used", img: WM("Toyota Camry (XV70) SE (2), United States.jpg") },
  { title: "2018 Lexus RX 350", price: "₦42,000,000", mileage: "88,000 km", trans: "Automatic", body: "SUV", condition: "Foreign used", img: WM("Lexus RX350 (AL10) Washington DC Metro Area, USA (2).jpg") },
  { title: "2016 Toyota Corolla LE", price: "₦21,500,000", mileage: "96,000 km", trans: "Automatic", body: "Sedan", condition: "Foreign used", img: WM("2016 Toyota Corolla LE (ZRE172L).jpg") },
  { title: "2016 Toyota Highlander XLE", price: "₦38,000,000", mileage: "102,000 km", trans: "Automatic", body: "SUV", condition: "Foreign used", img: WM("2016 Toyota Highlander XLE AWD in Ooh La La Rouge Mica, Front Left, 06-29-2023.jpg") },
  { title: "2024 Toyota Hiace Bus", price: "₦58,000,000", mileage: "0 km", trans: "Manual", body: "Bus", condition: "Brand new", img: WM("2019 Toyota HiAce (front).jpg") },
  { title: "2020 Mercedes-Benz GLE 350", price: "₦75,000,000", mileage: "52,000 km", trans: "Automatic", body: "SUV", condition: "Foreign used", img: WM("2020 Mercedes-Benz GLE 350 4Matic front 6.16.19.jpg") }
];

const FAQ = [
  { q: "Are your cars Nigerian used or Tokunbo?", a: "Mostly foreign used (Tokunbo), plus brand new units we import on request. Every listing states its condition clearly." },
  { q: "Can I bring my own mechanic?", a: "Yes. Bring anyone you trust to inspect the car at our Anthony lot before you pay a kobo." },
  { q: "Do you offer payment plans?", a: "On selected cars, yes. We take an initial payment and agree a spread that suits you. Talk to us on WhatsApp for the current terms." },
  { q: "How long does delivery outside Lagos take?", a: "Usually two to four days depending on the state. You get a video walkaround before the car leaves the lot and tracking on the way." },
  { q: "Do you help with registration and papers?", a: "We handle the transfer and can arrange registration and customs documentation for imported units." }
];

const FILTER_LABELS = ["All", "Sedans", "SUVs", "Buses", "Brand new"];

let activeFilter = "All";
let openFaq = 0;

function matchesFilter(car, filter) {
  return filter === "All"
    || (filter === "Sedans" && car.body === "Sedan")
    || (filter === "SUVs" && car.body === "SUV")
    || (filter === "Buses" && car.body === "Bus")
    || (filter === "Brand new" && car.condition === "Brand new");
}

function renderFilters() {
  const el = document.getElementById("filters");
  el.innerHTML = "";
  FILTER_LABELS.forEach((label) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (activeFilter === label ? " active" : "");
    btn.type = "button";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      activeFilter = label;
      renderFilters();
      renderCars();
    });
    el.appendChild(btn);
  });
}

function renderCars() {
  const el = document.getElementById("cars-grid");
  el.innerHTML = "";
  ALL_CARS.filter((c) => matchesFilter(c, activeFilter)).forEach((car) => {
    const article = document.createElement("article");
    article.className = "car-card";
    article.innerHTML = `
      <div class="car-media">
        <img src="${car.img}" alt="${car.title}" loading="lazy">
        <span class="car-condition">${car.condition}</span>
      </div>
      <div class="car-body">
        <h3>${car.title}</h3>
        <div class="car-meta"><span>${car.mileage}</span><span>${car.trans}</span><span>${car.body}</span></div>
        <div class="car-foot">
          <span class="car-price">${car.price}</span>
          <a class="car-enquire" href="https://wa.me/2348022288837">Enquire</a>
        </div>
      </div>
    `;
    el.appendChild(article);
  });
}

function renderFaq() {
  const el = document.getElementById("faq-list");
  el.innerHTML = "";
  FAQ.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "faq-item" + (openFaq === i ? " open" : "");
    row.innerHTML = `
      <button class="faq-q" type="button">
        ${item.q}
        <span class="faq-icon">+</span>
      </button>
      <p class="faq-a">${item.a}</p>
    `;
    row.querySelector(".faq-q").addEventListener("click", () => {
      openFaq = openFaq === i ? -1 : i;
      renderFaq();
    });
    el.appendChild(row);
  });
}

renderFilters();
renderCars();
renderFaq();

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");
navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("sell-form").addEventListener("submit", (e) => {
  e.preventDefault();
});

const heroPlay = document.getElementById("hero-play");
const heroFull = document.getElementById("hero-full");
const heroLoop = document.querySelector(".hero-fleet");
const heroBadge = document.querySelector(".hero-badge");

if (heroPlay && heroFull) {
  heroPlay.addEventListener("click", () => {
    heroLoop.pause();
    heroLoop.hidden = true;
    heroPlay.hidden = true;
    // The badge sits bottom-left, where the native controls appear.
    heroBadge.hidden = true;
    heroFull.hidden = false;
    heroFull.play();
    heroFull.focus();
  });
}
