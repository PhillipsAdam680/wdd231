
const themeContainer = document.querySelector("#theme-container");
const themeFilter = document.querySelector("#theme-filter");

let allThemes = [];

// Fetch LEGO theme data
async function getThemes() {
    try {
        const response = await fetch("data/themes.json");

        if (!response.ok) {
            throw new Error("Could not load LEGO themes.");
        }

        const data = await response.json();
        allThemes = data.themes;

        displayThemes(allThemes);

    } catch (error) {
        console.error(error);
        themeContainer.textContent =
            "Sorry, LEGO themes could not be loaded.";
    }
}

// Display theme cards
function displayThemes(themes) {
    themeContainer.innerHTML = "";

    themes.forEach(theme => {
        const card = document.createElement("article");
        card.classList.add("theme-card");

        const heading = document.createElement("h3");
        heading.textContent = theme.name;

        const description = document.createElement("p");
        description.textContent = theme.description;

        const recommendation = document.createElement("p");
        recommendation.textContent =
            `Recommended for: ${theme.recommendedFor}`;

        card.appendChild(heading);
        card.appendChild(description);
        card.appendChild(recommendation);

        themeContainer.appendChild(card);
    });
}

// Filter by category
themeFilter.addEventListener("change", () => {
    const selected = themeFilter.value;

    const filteredThemes = selected === "all"
        ? allThemes
        : allThemes.filter(theme =>
            theme.category === selected);

    displayThemes(filteredThemes);
});

getThemes();
