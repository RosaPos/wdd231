// 1. Importamos los datos
import { places } from '../data/places.mjs';

// 2. Buscamos el contenedor en el HTML
const container = document.getElementById('places-container');

// 3. Por cada lugar, creamos una tarjeta
places.forEach(place => {
    // Creamos un div vacío
    const card = document.createElement('div');
    // Le agregamos una clase para darle estilo después
    card.className = 'card';

    // Le inyectamos el HTML usando backticks
    card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button>Learn More</button>
  `;

    // 4. Metemos la tarjeta terminada al contenedor principal
    container.appendChild(card);
});

// =========================================
// LOCALSTORAGE: VISITOR MESSAGE LOGIC
// =========================================

const visitorMessage = document.getElementById('visitor-message');

if (visitorMessage) {
    const lastVisit = localStorage.getItem('last-visit');
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000; // Milisegundos en un día (86,400,000)

    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - Number(lastVisit)) / msPerDay);

        if (daysSinceLastVisit < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            visitorMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitorMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }

    localStorage.setItem('last-visit', now);
}

// =========================================
// NAVIGATION MENU
// =========================================

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

// =========================================
// FOOTER DATE
// =========================================

const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last modified: ${document.lastModified}`;
}