const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

const dataURL = "data/members.json";

async function getMembers() {
    try {
        const response = await fetch(dataURL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayMembers(data.members);
    } catch (error) {
        console.error("Unable to load chamber members:", error);

        membersContainer.innerHTML = `
            <p class="error-message">
                Chamber member information is currently unavailable.
            </p>
        `;
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const membershipName = getMembershipName(member.membership);

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name}"
                loading="lazy"
                width="300"
                height="200"
            >

            <div class="member-info">
                <h2>${member.name}</h2>

                <p class="membership">
                    ${membershipName} Member
                </p>

                <p>${member.description}</p>

                <address>
                    ${member.address}
                </address>

                <p>
                    <a href="tel:${formatPhone(member.phone)}">
                        ${member.phone}
                    </a>
                </p>

                <p>
                    <a
                        href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Website
                    </a>
                </p>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

function getMembershipName(level) {
    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Standard";
}

function formatPhone(phone) {
    return phone.replace(/[^\d+]/g, "");
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("members-grid");
    membersContainer.classList.remove("members-list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("members-list");
    membersContainer.classList.remove("members-grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

getMembers();