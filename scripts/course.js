const courseCards = document.querySelector("#course-cards");
const totalCredits = document.querySelector("#total-credits");

const allButton = document.querySelector("#all");
const wddButton = document.querySelector("#wdd");
const cseButton = document.querySelector("#cse");


function displayCourses(courseList) {
    courseCards.innerHTML = "";

    courseList.forEach((course) => {
        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
        `;

        courseCards.appendChild(card);
    });

    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}


allButton.addEventListener("click", () => {
    displayCourses(courses);
});


wddButton.addEventListener("click", () => {
    const wddCourses = courses.filter(
        (course) => course.subject === "WDD"
    );

    displayCourses(wddCourses);
});


cseButton.addEventListener("click", () => {
    const cseCourses = courses.filter(
        (course) => course.subject === "CSE"
    );

    displayCourses(cseCourses);
});


displayCourses(courses);