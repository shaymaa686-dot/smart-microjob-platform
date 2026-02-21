// ------------------ JOBS DATA (Array of Objects) ------------------
const jobs = [
  { title: "Electrician Assistant", category: "Construction", status: "Open", desc: "Assist in basic wiring tasks and tool handling." },
  { title: "Data Entry Clerk", category: "IT", status: "Closed", desc: "Enter and clean datasets for a short project." },
  { title: "Teaching Assistant", category: "Education", status: "Open", desc: "Support students with learning activities and worksheets." },
  { title: "Delivery Helper", category: "Logistics", status: "Open", desc: "Help in packing and delivering items locally." }
];

// ------------------ DOM ELEMENTS ------------------
const jobsContainer = document.getElementById("jobsContainer");
const searchInput = document.getElementById("searchInput");
const detailsBox = document.getElementById("detailsBox");

const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

const darkBtn = document.getElementById("darkBtn");

// ------------------ RENDER JOBS (DOM + Loop + Conditions) ------------------
function renderJobs(list) {
  jobsContainer.innerHTML = "";

  list.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("fade-in"); // Animation

    jobCard.style.padding = "12px";
    jobCard.style.borderBottom = "1px solid #ddd";

    // Condition for status class
    const statusClass = job.status === "Open" ? "status-open" : "status-closed";

    jobCard.innerHTML = `
      <strong>${job.title}</strong><br>
      Category: ${job.category}<br>
      Status: <span class="${statusClass}">${job.status}</span>
      <br><br>
      <button class="btn detailsBtn" type="button">Details</button>
    `;

    // ------------------ DETAILS EVENT ------------------
    jobCard.querySelector(".detailsBtn").addEventListener("click", function () {
      detailsBox.innerHTML = `
        <h3 style="margin-top:0">${job.title}</h3>
        <p><strong>Category:</strong> ${job.category}</p>
        <p><strong>Status:</strong> ${job.status}</p>
        <p><strong>Description:</strong> ${job.desc}</p>
      `;

      // Auto scroll to details box
      detailsBox.scrollIntoView({ behavior: "smooth" });
    });

    jobsContainer.appendChild(jobCard);
  });
}

// Initial render
renderJobs(jobs);

// ------------------ SEARCH (Filter + Event) ------------------
searchInput.addEventListener("input", function () {
  const value = searchInput.value.toLowerCase();

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(value) ||
    job.category.toLowerCase().includes(value) ||
    job.status.toLowerCase().includes(value)
  );

  renderJobs(filtered);
});

// ------------------ FORM VALIDATION (Events + Regex) ------------------
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill all fields!");
    return;
  }

  // Better email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email!");
    return;
  }

  successMsg.style.display = "block";
  contactForm.reset();
});

// ------------------ DARK MODE ------------------
darkBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});
// jQuery animation (Requirement)
$(document).ready(function () {
  // Smooth fade-in for details box when clicking Details
  $(document).on("click", ".detailsBtn", function () {
    $("#detailsBox").hide().fadeIn(400);
  });
});