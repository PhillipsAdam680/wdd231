
const wishlistForm = document.querySelector("#wishlist-form");
const setNameInput = document.querySelector("#set-name");
const wishlistItems = document.querySelector("#wishlist-items");
const wishlistMessage = document.querySelector("#wishlist-message");

const storageKey = "legoWishlist";

// Load saved items
let wishlist = [];

try {
    const savedItems = JSON.parse(
        localStorage.getItem(storageKey)
    );

    if (Array.isArray(savedItems)) {
        wishlist = savedItems.filter(
            item => typeof item === "string"
        );
    }
} catch (error) {
    console.error("Could not read saved wish list.", error);
}

// Save to localStorage
function saveWishlist() {
    try {
        localStorage.setItem(
            storageKey,
            JSON.stringify(wishlist)
        );
        return true;
    } catch (error) {
        console.error("Could not save wish list.", error);
        wishlistMessage.textContent =
            "Changes could not be saved in this browser.";
        return false;
    }
}

// Display saved sets
function displayWishlist() {
    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistMessage.textContent =
            "Your LEGO wish list is currently empty.";
        return;
    }

    wishlistMessage.textContent =
        `You have ${wishlist.length} set(s) on your wish list.`;

    wishlist.forEach((setName, index) => {
        const listItem = document.createElement("li");
        const name = document.createElement("span");
        const removeButton = document.createElement("button");

        name.textContent = setName;

        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.classList.add("remove-button");

        removeButton.setAttribute(
            "aria-label",
            `Remove ${setName} from wish list`
        );

        removeButton.addEventListener("click", () => {
            wishlist.splice(index, 1);
            saveWishlist();
            displayWishlist();
        });

        listItem.appendChild(name);
        listItem.appendChild(removeButton);
        wishlistItems.appendChild(listItem);
    });
}

// Add a LEGO set
wishlistForm.addEventListener("submit", event => {
    event.preventDefault();

    const setName = setNameInput.value.trim();

    if (setName === "") {
        return;
    }

    wishlist.push(setName);

    saveWishlist();
    displayWishlist();

    wishlistForm.reset();
    setNameInput.focus();
});

// Initial display
displayWishlist();
