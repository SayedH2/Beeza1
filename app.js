const heroDashboard = document.querySelector("#hero-dashboard");
const demoSpent = document.querySelector("[data-demo-spent]");
const demoMeter = document.querySelector("[data-demo-meter]");
const demoPercent = document.querySelector("[data-demo-percent]");
const demoMessage = document.querySelector("[data-demo-message]");
const initialSpend = 2.1;
const dailyLimit = 5;
let currentSpend = initialSpend;

function updateSpending(spend, spentElement, meterElement, percentElement, messageElement) {
  const percent = Math.round((spend / dailyLimit) * 100);
  const boundedPercent = Math.min(percent, 100);
  spentElement.textContent = spend.toFixed(2);
  meterElement.style.width = `${boundedPercent}%`;
  percentElement.textContent = `${percent}%`;
  meterElement.parentElement.setAttribute("aria-valuenow", String(boundedPercent));

  if (percent >= 100) {
    messageElement.className = "demo-message is-over";
    messageElement.innerHTML = '<span class="message-icon" aria-hidden="true">!</span><span><strong>You’ve reached today’s limit</strong><small>Take a pause before spending more.</small></span>';
    meterElement.style.backgroundColor = "#c8795e";
  } else if (percent >= 80) {
    messageElement.className = "demo-message is-warning";
    messageElement.innerHTML = '<span class="message-icon" aria-hidden="true">!</span><span><strong>You’re getting close</strong><small>A quick check-in before your next purchase?</small></span>';
    meterElement.style.backgroundColor = "#d6ac48";
  } else {
    messageElement.className = "demo-message";
    messageElement.innerHTML = '<span class="message-icon" aria-hidden="true">✓</span><span><strong>You’re on track</strong><small>There’s room left in today’s plan.</small></span>';
    meterElement.style.backgroundColor = "#9dc23e";
  }
}

window.setTimeout(() => {
  heroDashboard?.classList.add("is-ready");
  heroDashboard?.setAttribute("aria-busy", "false");
}, 420);

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    currentSpend = Math.min(currentSpend + Number(button.dataset.add), dailyLimit * 1.5);
    updateSpending(currentSpend, demoSpent, demoMeter, demoPercent, demoMessage);
  });
});

document.querySelector("[data-reset]")?.addEventListener("click", () => {
  currentSpend = initialSpend;
  updateSpending(currentSpend, demoSpent, demoMeter, demoPercent, demoMessage);
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen ? "Open menu" : "Close menu";
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.querySelector(".sr-only").textContent = "Open menu";
    }
    primaryNav.classList.remove("is-open");
  });
});

document.querySelector("[data-contact-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const subject = encodeURIComponent(`A note for Beeza from ${formData.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`,
  );
  const feedback = document.querySelector("[data-form-feedback]");
  feedback.textContent = "Your email app should open with your message ready. The form doesn’t save or send it.";
  window.location.href = `mailto:hello@beeza.app?subject=${subject}&body=${body}`;
});

document.querySelector("[data-year]").textContent = String(new Date().getFullYear());
