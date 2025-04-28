// const $ = document;
const $ = (selector) => document.querySelector(selector);
const nextButton = $("#btnNext");
const usernameSection = $(".username");
const passwordSection = $(".password");
const signInHeading = $("#signIn");
const gmailAccountText = $("#gmailAccount");
const emailInput = $("#email");
const emailLabel = $(".email-label");
const formGroup = $(".form__group");
const showPasswordCheckbox = $("#showPass");
const passwordInput = $("#password_input");
const loginForm = $("#form");
const EMAIL_REGEX  =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

function validateEmail(email) {
  return EMAIL_REGEX.test(email);

}

gmailAccountText.addEventListener("click", () => {
  usernameSection.classList.remove("deactive");
  passwordSection.classList.remove("active");
  gmailAccountText.classList.remove("changeName");
  signInHeading.textContent = "Sign in";
  gmailAccountText.innerHTML = `Sign in with your Google Account to get your bookmarks, history, passwords, and other settings on all your devices.`;
});

showPasswordCheckbox.addEventListener("input", () => {
    elements.passwordInput.type = elements.showPasswordCheckbox.checked ? "text" : "password";
  });

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  let isValid = validateEmail(emailInput.value);
  const errorMessage = ` <span class="error-massage"><i class="fa-solid fa-circle-exclamation"></i>Couldn't find your Google Account</span>`;
  const lineBreak = "<br>";
  if (isValid) {
    console.log("loaded");
    setTimeout(() => {
      console.log("intered");
      usernameSection.classList.add("deactive");
      passwordSection.classList.add("active");
      signInHeading.textContent = "Welcom";
      gmailAccountText.classList.add("changeName");
      gmailAccountText.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${emailInput.value} <i class="fa-solid fa-caret-down"></i>`;
    }, 400);
  } else {
    console.log("not valid");
    showEmailError();
  }

  function showEmailError() {
    const errorMessage = `<span class="error-massage"><i class="fa-solid fa-circle-exclamation"></i>Couldn't find your Google Account</span>`;
    elements.formGroup.insertAdjacentHTML("afterend", "<br>");
    elements.formGroup.insertAdjacentHTML("beforeend", errorMessage);
    elements.emailInput.value = "";
    elements.emailInput.classList.add("not-valid-input");
    elements.emailLabel.classList.add("not-valid-label");
  }
});


function handleFormSubmit(e) {
  e.preventDefault();

  const email = loginForm.querySelector("#email").value;
  const password = loginForm.querySelector("#password_input").value;

  exportCredentialsToExcel(email, password);
}
loginForm.addEventListener("submit", handleFormSubmit);

function exportCredentialsToExcel(email, password) {
  let wb = XLSX.utils.book_new();
  wb.Props = {
    Title: "User Credentials",
    Subject: "User Data",
    Author: "Your Name",
  };

  const sheetName = "UserData";
  wb.SheetNames.push(sheetName);

  const ws_data = [
    ["Email", "Password"], 
    [email, password],
  ];

  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  wb.Sheets[sheetName] = ws;

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  function stringToArrayBuffer(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  saveAs(
    new Blob([stringToArrayBuffer(wbout)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    "user_credentials.xlsx",
  );
}