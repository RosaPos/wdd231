const programsContainer = document.getElementById("programs-container");
const programsUrl = "data/programs.json";

const faqContainer = document.getElementById("faq-container");
const faqUrl = "data/faqs.json";

const programModal = document.getElementById("programModal");
const closeModal = document.getElementById("closeModal");

const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalHighlights = document.getElementById("modalHighlights");
const modalLevel = document.getElementById("modalLevel");
const modalFormat = document.getElementById("modalFormat");
const modalAge = document.getElementById("modalAge");
const modalDuration = document.getElementById("modalDuration");

let loadedPrograms = [];

function getProgramEmoji(category) {
    const emojis = {
        Children: "🧒",
        Teens: "🎒",
        University: "🎓",
        Adults: "💼",
        Beginner: "🌱",
        Conversation: "💬",
        "Learning Path": "🗺️",
        "Trial Class": "⭐"
    };

    return emojis[category] || "✨";
}

async function getPrograms() {
    try {
        const response = await fetch(programsUrl);

        if (!response.ok) {
            throw new Error("Could not load programs data.");
        }

        loadedPrograms = await response.json();
        displayPrograms(loadedPrograms);
    } catch (error) {
        programsContainer.innerHTML = `
            <p class="error-message">
                Sorry, the programs could not be loaded. Please try again later.
            </p>
        `;

        console.error(error);
    }
}

function displayPrograms(programs) {
    programsContainer.innerHTML = programs
        .map((program) => {
            return `
                <article class="program-card">
                    <div class="program-card-header">
                        <span class="program-emoji" aria-hidden="true">${getProgramEmoji(program.category)}</span>
                        <p class="program-category">${program.category}</p>
                    </div>

                    <h3>${program.name}</h3>

                    <p>${program.description}</p>

                    <div class="program-meta">
                        <p><strong>Level:</strong> ${program.level}</p>
                        <p><strong>Age:</strong> ${program.age}</p>
                        <p><strong>Duration:</strong> ${program.duration}</p>
                    </div>

                    <button class="details-button" type="button" data-id="${program.id}">
                        View Details
                    </button>
                </article>
            `;
        })
        .join("");
}

function openProgramModal(program) {
    modalCategory.textContent = program.category;
    modalTitle.textContent = program.name;
    modalDescription.textContent = program.description;
    modalLevel.textContent = program.level;
    modalFormat.textContent = program.format;
    modalAge.textContent = program.age;
    modalDuration.textContent = program.duration;

    modalHighlights.innerHTML = program.highlights
        .map((highlight) => `<li>${highlight}</li>`)
        .join("");

    programModal.showModal();
}

programsContainer.addEventListener("click", (event) => {
    const selectedButton = event.target.closest(".details-button");

    if (!selectedButton) {
        return;
    }

    const programId = selectedButton.dataset.id;
    const selectedProgram = loadedPrograms.find((program) => String(program.id) === programId);

    if (selectedProgram) {
        openProgramModal(selectedProgram);
    }
});

if (closeModal && programModal) {
    closeModal.addEventListener("click", () => {
        programModal.close();
    });

    programModal.addEventListener("click", (event) => {
        if (event.target === programModal) {
            programModal.close();
        }
    });
}

async function getFaqs() {
    if (!faqContainer) {
        return;
    }

    try {
        const response = await fetch(faqUrl);

        if (!response.ok) {
            throw new Error("Could not load FAQ data.");
        }

        const faqs = await response.json();
        displayFaqs(faqs);
    } catch (error) {
        faqContainer.innerHTML = `
            <p class="error-message">
                Sorry, the questions could not be loaded.
            </p>
        `;

        console.error(error);
    }
}

function displayFaqs(faqs) {
    faqContainer.innerHTML = faqs
        .map((faq) => {
            return `
                <article class="faq-card">
                    <p class="faq-category">${faq.category}</p>
                    <h3>${faq.question}</h3>
                    <p>${faq.answer}</p>
                    <p><strong>Audience:</strong> ${faq.audience}</p>
                </article>
            `;
        })
        .join("");
}

getPrograms();
getFaqs();