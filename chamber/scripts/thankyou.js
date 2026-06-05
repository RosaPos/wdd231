/**
 * thankyou.js – Thank-You Page
 */

// ── 1. Navigation toggle ──────────────────────────────────────────
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

// ── 2. Footer: copyright year & last modified ─────────────────────
const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last modified: ${document.lastModified}`;
}

// ── 3. Read & display form data from URL params ───────────────────

const FIELD_LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  orgTitle: "Organizational Title",
  email: "Email Address",
  phone: "Phone",
  businessName: "Business / Organization",
  membershipLevel: "Membership Level",
  description: "Business Description",
  timestamp: "Application Date & Time",
};

const LEVEL_NAMES = {
  np: "Non-Profit (Free)",
  bronze: "Bronze – $200/yr",
  silver: "Silver – $500/yr",
  gold: "Gold – $1,200/yr",
};

function formatTimestamp(iso) {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  return date.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

function createSummaryRow(label, value) {
  const row = document.createElement("tr");

  const labelCell = document.createElement("td");
  labelCell.textContent = label;

  const valueCell = document.createElement("td");
  valueCell.textContent = value;

  row.appendChild(labelCell);
  row.appendChild(valueCell);

  return row;
}

function displaySummary() {
  const params = new URLSearchParams(window.location.search);
  const tbody = document.getElementById("summaryBody");

  if (!tbody) {
    return;
  }

  const fieldsToShow = [
    "firstName",
    "lastName",
    "orgTitle",
    "email",
    "phone",
    "businessName",
    "membershipLevel",
    "description",
    "timestamp",
  ];

  let hasData = false;

  fieldsToShow.forEach((key) => {
    const raw = params.get(key);

    if (!raw || raw.trim() === "") {
      return;
    }

    hasData = true;

    let value = raw.trim();

    if (key === "membershipLevel") {
      value = LEVEL_NAMES[value] ?? value;
    }

    if (key === "timestamp") {
      value = formatTimestamp(value);
    }

    const label = FIELD_LABELS[key] ?? key;
    const row = createSummaryRow(label, value);

    tbody.appendChild(row);
  });

  if (!hasData) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 2;
    cell.classList.add("empty-summary-message");

    const message = document.createElement("span");
    message.textContent = "No application data found. Please ";

    const link = document.createElement("a");
    link.href = "join.html";
    link.textContent = "submit the form";

    const period = document.createElement("span");
    period.textContent = ".";

    cell.appendChild(message);
    cell.appendChild(link);
    cell.appendChild(period);
    row.appendChild(cell);
    tbody.appendChild(row);
  }
}

displaySummary();