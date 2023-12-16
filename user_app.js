document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".offcanvas-userform-body form");
  const forgotPasswordForm = document.querySelector(".forgot-password-form");
  const otpForm = document.querySelector(".otp-form");
  const newPasswordForm = document.querySelector(".new-password-form");
  const registerForm = document.querySelector(".register-form");
  const registerNowLink = document.getElementById("go-to-register-user");

  const buttonClose = document.querySelector(".btn-close");
  const forgotPasswordLink = document.getElementById("forgot-password-link");
  const goBackLinkForm = document.getElementById("go-back-link-login");
  const goBackLinkGetOtp = document.getElementById("go-back-link-getotp");
  const getOtpButton = document.getElementById("get-otp-button");
  const goBackLinkNewPassword = document.getElementById(
    "go-back-link-newpassword"
  );
  const verifyOtpButton = document.getElementById("verify-otp-button");
  const confirmPass = document.getElementById("confirm-new-password-button");
  const userLog = document.getElementById("go-to-login-user");

  registerNowLink.addEventListener("click", (event) => {
    event.preventDefault();
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    forgotPasswordForm.style.display = "none";
    newPasswordForm.style.display = "none";
    otpForm.style.display = "none";
  });

  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault();
    forgotPasswordForm.style.display = "block";
    loginForm.style.display = "none";
    newPasswordForm.style.display = "none";
    otpForm.style.display = "none";
    registerForm.style.display = "none";
  });

  getOtpButton.addEventListener("click", (event) => {
    event.preventDefault();
    otpForm.style.display = "block";
    loginForm.style.display = "none";
    forgotPasswordForm.style.display = "none";
    newPasswordForm.style.display = "none";
    registerForm.style.display = "none";
  });

  goBackLinkForm.addEventListener("click", (event) => {
    event.preventDefault();
    loginForm.style.display = "block";
    forgotPasswordForm.style.display = "none";
    newPasswordForm.style.display = "none";
    otpForm.style.display = "none";
    registerForm.style.display = "none";
  });

  goBackLinkGetOtp.addEventListener("click", (event) => {
    event.preventDefault();
    forgotPasswordForm.style.display = "block";
    otpForm.style.display = "none";
    newPasswordForm.style.display = "none";
    loginForm.style.display = "none";
    registerForm.style.display = "none";
  });

  goBackLinkNewPassword.addEventListener("click", (event) => {
    event.preventDefault();
    forgotPasswordForm.style.display = "block";
    newPasswordForm.style.display = "none";
    otpForm.style.display = "none";
    loginForm.style.display = "none";
    registerForm.style.display = "none";
  });

  buttonClose.addEventListener("click", () => {
    loginForm.style.display = "block";
    forgotPasswordForm.style.display = "none";
    otpForm.style.display = "none";
    newPasswordForm.style.display = "none";
    registerForm.style.display = "none";
  });

  verifyOtpButton.addEventListener("click", (event) => {
    event.preventDefault();
    newPasswordForm.style.display = "block";
    otpForm.style.display = "none";
    loginForm.style.display = "none";
    forgotPasswordForm.style.display = "none";
    registerForm.style.display = "none";
  });

  confirmPass.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Password updated successfully");
    loginForm.style.display = "block";
    otpForm.style.display = "none";
    newPasswordForm.style.display = "none";
    forgotPasswordForm.style.display = "none";
    registerForm.style.display = "none";
  });

  userLog.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    otpForm.style.display = "none";
    newPasswordForm.style.display = "none";
    forgotPasswordForm.style.display = "none";
    registerForm.style.display = "none";
  })

  var config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
  };

  var countrySelect = document.querySelector(".country-user"),
    stateSelect = document.querySelector(".state-user"),
    citySelect = document.querySelector(".city-user");

  function loadCountriesUser() {
    let apiEndPoint = config.cUrl;
    fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.ckey } })
      .then((Response) => Response.json())
      .then((data) => {
        data.forEach((country) => {
          const option = document.createElement("option");
          option.value = country.iso2;
          option.textContent = country.name;
          countrySelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error loading countries:", error));

    stateSelect.disabled = true;
    citySelect.disabled = true;
  }

  function loadStatesUser() {
    stateSelect.disabled = false;
    citySelect.disabled = true;

    const selectedCountryCode = countrySelect.value;

    stateSelect.innerHTML = '<option value="">Select State</option>'; // Clear existing options

    fetch(`${config.cUrl}/${selectedCountryCode}/states`, {
      headers: { "X-CSCAPI-KEY": config.ckey },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((state) => {
          const option = document.createElement("option");
          option.value = state.iso2;
          option.textContent = state.name;
          stateSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error loading states:", error));
  }

  function loadCitiesUser() {
    citySelect.disabled = false;

    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;

    citySelect.innerHTML = '<option value="">Select City</option>'; // Clear existing options

    fetch(
      `${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
      { headers: { "X-CSCAPI-KEY": config.ckey } }
    )
      .then((response) => response.json())
      .then((data) => {
        data.forEach((city) => {
          const option = document.createElement("option");
          option.value = city.iso2;
          option.textContent = city.name;
          citySelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error loading cities:", error));
  }

  // Initial load of countries
  window.onload = loadCountriesUser;

  // Event listeners for changes in the country and state selections
  countrySelect.addEventListener("change", loadStatesUser);
  stateSelect.addEventListener("change", loadCitiesUser);
});
