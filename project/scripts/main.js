
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Mobile navigation
menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
});

// Current year
document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

// Last modified date
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
