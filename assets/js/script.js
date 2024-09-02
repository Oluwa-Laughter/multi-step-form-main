"use-strict";

const sideBarNum = document.querySelectorAll(".side-bar__step-number");
const form = document.querySelector(".form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const nextBtn = document.querySelectorAll(".next_btn");
const backBtn = document.querySelectorAll(".back_btn");
const monthlyPlan = document.querySelector(".monthly_plan");
const formContainer = document.querySelector(".form-data");
const addOns = document.querySelector(".add-ons");
const finishing = document.querySelector(".finishing");
const thankYou = document.querySelector(".thank_you-box");
const errorMessage = document.querySelectorAll(".errorMessage");
const confirmBtn = document.querySelector(".confirm_btn");
const checked = document.querySelectorAll(".checked");
console.log(sideBarNum);

console.log(nextBtn);
console.log(backBtn);
const validateFieldRequired = function (value) {
  return value === "" ? "This field is required" : null;
};

const validateOnlyAlphabets = function (value) {
  return /^[a-zA-Z\s]+$/.test(value)
    ? null
    : "Only Alphabet characters are required";
};

const validateEmail = function (value) {
  return /^([a-zA-Z\d'.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/.test(
    value
  )
    ? null
    : "Invalid email address";
};

const validatePhoneNumber = function (value) {
  return /^\+[\d]+$/.test(value) ? null : "Invalid phone number";
};

const validateForm = function () {
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();

  const nameError =
    validateFieldRequired(nameValue) || validateOnlyAlphabets(nameValue);

  const emailError =
    validateFieldRequired(emailValue) || validateEmail(emailValue);

  const phoneError =
    validateFieldRequired(phoneValue) || validatePhoneNumber(phoneValue);

  nameError ? name.classList.add("error") : name.classList.remove("error");
  errorMessage[0].textContent = nameError;

  emailError ? email.classList.add("error") : email.classList.remove("error");
  errorMessage[1].textContent = emailError;
  phoneError ? phone.classList.add("error") : phone.classList.remove("error");
  errorMessage[2].textContent = phoneError;
};

// Update Sidebar Function
const updateSidebar = (activeStepIndex) => {
  sideBarNum.forEach((step, index) => {
    step.classList.toggle("active-step", index === activeStepIndex);
  });
};

// Show Step Function
const showStep = (currentStep, nextStep, stepIndex) => {
  currentStep.style.display = "none";
  nextStep.style.display = "flex";
  updateSidebar(stepIndex);
};

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();

  if (![name, email, phone].some((el) => el.classList.contains("error"))) {
    showStep(formContainer, monthlyPlan, 1);
  }
});

backBtn[0].addEventListener("click", () =>
  showStep(monthlyPlan, formContainer, 0)
);
nextBtn[1].addEventListener("click", () => showStep(monthlyPlan, addOns, 2));
backBtn[1].addEventListener("click", () => showStep(addOns, monthlyPlan, 1));
nextBtn[2].addEventListener("click", () => showStep(addOns, finishing, 3));
backBtn[2].addEventListener("click", () => showStep(finishing, addOns, 2));

confirmBtn.addEventListener("click", () => {
  finishing.style.display = "none";
  thankYou.style.display = "flex";
  name.value = "";
  email.value = "";
  phone.value = "";
  checked.forEach((check) => (check.checked = false));
});
