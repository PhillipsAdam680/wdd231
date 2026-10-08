
import { places } from "../data/places.mjs";

// Create the discovery cards
const discoverGrid = document.querySelector("#discover-grid");

places.forEach((place, index) => {
  const card = document.createElement("article");
  card.classList.add("discover-card");
  card.style.gridArea = `card${index + 1}`;

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const image = document.createElement("img");

  image.src = `images/${place.image}`;
  image.alt = `View of ${place.name}`;
  image.width = 300;
  image.height = 200;
  image.loading = "lazy";

  figure.appendChild(image);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.textContent = "Learn More";
  button.type = "button";

  button.addEventListener("click", () => {
    window.open(place.url, "_blank", "noopener,noreferrer");
  });

  card.appendChild(title);
  card.appendChild(figure);
  card.appendChild(address);
  card.appendChild(description);
  card.appendChild(button);

  discoverGrid.appendChild(card);
});

// Visitor message using localStorage
const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (lastVisit === null) {
  visitMessage.textContent =
    "Welcome! Let us know if you have any questions.";
} else {
  const daysBetween = Math.floor(
    (currentVisit - Number(lastVisit)) /
    (1000 * 60 * 60 * 24)
  );

  if (daysBetween < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    visitMessage.textContent =
      "You last visited 1 day ago.";
  } else {
    visitMessage.textContent =
      `You last visited ${daysBetween} days ago.`;
  }
}

localStorage.setItem("lastVisit", currentVisit);

// Footer information
document.querySelector("#currentyear").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

// Mobile navigation
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});
