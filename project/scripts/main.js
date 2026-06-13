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

/* ----------------------------- */
/* Thank You Page - URLSearchParams */
/* ----------------------------- */

const submittedInfo = document.getElementById("submittedInfo");

if (submittedInfo) {
    const params = new URLSearchParams(window.location.search);

    const studentName = params.get("studentName");
    const studentAge = params.get("studentAge");
    const englishLevel = params.get("englishLevel");
    const parentName = params.get("parentName");
    const email = params.get("email");
    const phone = params.get("phone");
    const programInterest = params.get("programInterest");
    const message = params.get("message");

    const levelLabels = {
        "not-sure": "Not sure",
        "a1": "A1",
        "a2": "A2",
        "b1": "B1",
        "b2": "B2"
    };

    const programLabels = {
        "children": "Children English",
        "teens": "Teens English",
        "university": "University English",
        "adults": "Adults English",
        "conversation": "Conversation Club",
        "beginner": "Beginner English",
        "trial": "Free Trial Class"
    };

    const formattedLevel = levelLabels[englishLevel] || englishLevel || "Not provided";
    const formattedProgram = programLabels[programInterest] || programInterest || "Not provided";

    submittedInfo.innerHTML = `
        <h2>Your request details</h2>
        <p><strong>Student name:</strong> ${studentName || "Not provided"}</p>
        <p><strong>Student age:</strong> ${studentAge || "Not provided"}</p>
        <p><strong>English level:</strong> ${formattedLevel}</p>
        <p><strong>Contact name:</strong> ${parentName || "Not provided"}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>WhatsApp number:</strong> ${phone || "Not provided"}</p>
        <p><strong>Program interest:</strong> ${formattedProgram}</p>
        <p><strong>Message:</strong> ${message || "Not provided"}</p>
    `;
}