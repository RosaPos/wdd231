/**
 * join.js – Join Page
 */

// ── 1. Navigation toggle ──────────────────────────────────────────
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");

  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.textContent = isOpen ? "✕" : "☰";
});

// ── 2. Footer: copyright year & last modified ─────────────────────
document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent =
  `Last modified: ${document.lastModified}`;

// ── 3. Hidden timestamp field ── This records when the form loaded in the browser.

const timestampField = document.getElementById("timestamp");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// ── 4. Membership benefit dialogs ─────────────────────────────────
const levelButtons = document.querySelectorAll(".level-info-btn");

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.dataset.dialog;
    const dialog = document.querySelector(`#${dialogId}`);

    if (dialog) {
      dialog.showModal();
    }
  });
});

const closeButtons = document.querySelectorAll(".close-dialog");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.dataset.close;
    const dialog = document.querySelector(`#${dialogId}`);

    if (dialog) {
      dialog.close();
    }
  });
});

// Close dialog when clicking outside the dialog content
const dialogs = document.querySelectorAll(".membership-dialog");

dialogs.forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

// ── 5. Form client-side validation ───────────────────────────────
const form = document.getElementById("joinForm");

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    form.reportValidity();
  }
});