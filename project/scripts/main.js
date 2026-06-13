/* ----------------------------- */
/* Mobile Navigation Menu */
/* ----------------------------- */

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

/* ----------------------------- */
/* LocalStorage Visit Message */
/* ----------------------------- */

const visitMessage = document.getElementById("visitMessage");

if (visitMessage) {
    const lastVisit = localStorage.getItem("levelUpLastVisit");
    const today = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome to Level Up! We are happy to help you start your English journey.";
    } else {
        const daysDifference = Math.floor((today - Number(lastVisit)) / 86400000);

        if (daysDifference < 1) {
            visitMessage.textContent = "Welcome back! You visited Level Up earlier today.";
        } else if (daysDifference === 1) {
            visitMessage.textContent = "Welcome back! Your last visit was 1 day ago.";
        } else {
            visitMessage.textContent = `Welcome back! Your last visit was ${daysDifference} days ago.`;
        }
    }

    localStorage.setItem("levelUpLastVisit", today);
}

/* ----------------------------- */
/* Dynamic Footer Information */
/* ----------------------------- */

const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last modified: ${document.lastModified}`;
}