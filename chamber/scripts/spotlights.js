const spotlightContainer =
    document.querySelector("#spotlights");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();

        displaySpotlights(data.members);

    } catch (error) {
        console.error("Member spotlight error:", error);
    }
}

function displaySpotlights(members) {

    // Membership levels:
    // 1 = Member
    // 2 = Silver
    // 3 = Gold

    const qualifiedMembers = members.filter(member =>
        member.membership === 2 ||
        member.membership === 3
    );

    // Randomize the members
    qualifiedMembers.sort(() => Math.random() - 0.5);

    // Display three random Silver/Gold members
    const selectedMembers = qualifiedMembers.slice(0, 3);

    spotlightContainer.innerHTML = "";

    selectedMembers.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener";

        const membership = document.createElement("p");

        membership.textContent =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";

        card.append(
            name,
            image,
            address,
            phone,
            website,
            membership
        );

        spotlightContainer.appendChild(card);
    });
}

getMembers();