const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

function toggleMenu() {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }
}

menuButton.addEventListener("click", toggleMenu);