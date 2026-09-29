const params = new URLSearchParams(window.location.search);

const firstName = params.get("first");
const lastName = params.get("last");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");

const applicationInfo = document.querySelector("#application-info");

applicationInfo.innerHTML = `
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile Phone:</strong> ${phone}</p>
    <p><strong>Organization:</strong> ${organization}</p>
    <p><strong>Submitted:</strong> ${timestamp}</p>
`;