// Set form timestamp
const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toISOString();


// Membership dialogs
const npButton = document.querySelector("#npButton");
const bronzeButton = document.querySelector("#bronzeButton");
const silverButton = document.querySelector("#silverButton");
const goldButton = document.querySelector("#goldButton");

const npDialog = document.querySelector("#npDialog");
const bronzeDialog = document.querySelector("#bronzeDialog");
const silverDialog = document.querySelector("#silverDialog");
const goldDialog = document.querySelector("#goldDialog");


npButton.addEventListener("click", () => {
    npDialog.showModal();
});

bronzeButton.addEventListener("click", () => {
    bronzeDialog.showModal();
});

silverButton.addEventListener("click", () => {
    silverDialog.showModal();
});

goldButton.addEventListener("click", () => {
    goldDialog.showModal();
});


const closeButtons = document.querySelectorAll(".close-dialog");

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});