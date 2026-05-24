const membersUrl = "data/members.json";
const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

async function getMembers() {
  try {
    const response = await fetch(membersUrl);
    const data = await response.json();

    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h2>${member.name}</h2>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Membership:</strong> ${member.membership}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");
});

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  if (navigation.classList.contains("open")) {
    menuButton.textContent = "✕";
  } else {
    menuButton.textContent = "☰";
  }
});

const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

getMembers();