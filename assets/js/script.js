"use-strict";
const form = document.querySelector(".form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const nextBtn = document.querySelectorAll(".next_btn");
const backBtn = document.querySelectorAll(".back_btn");
const monthlyPlan = document.querySelector(".monthly_plan");
const formContainer = document.querySelector(".form-data");

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
  emailError ? email.classList.add("error") : email.classList.remove("error");
  phoneError ? phone.classList.add("error") : phone.classList.remove("error");
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
  formContainer.style.display = "none";
  monthlyPlan.style.display = "flex";
});

backBtn[0].addEventListener("click", function () {
  formContainer.style.display = "flex";
  monthlyPlan.style.display = "none";
});
