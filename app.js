document.addEventListener("DOMContentLoaded", () => {
  const userForms = {
    type: "User",
    loginForm: document.querySelector(".offcanvas-userform-body form"),
    forgotPasswordForm: document.querySelector(".forgot-password-form"),
    otpForm: document.querySelector(".otp-form"),
    newPasswordForm: document.querySelector(".new-password-form"),
    registerForm: document.querySelector(".register-form"),
    registerNowLink: document.getElementById("go-to-register-user"),
    buttonClose: document.querySelector(".btn-close"),
    forgotPasswordLink: document.getElementById("forgot-password-link"),
    goBackLinkForm: document.getElementById("go-back-link-login"),
    goBackLinkGetOtp: document.getElementById("go-back-link-getotp"),
    getOtpButton: document.getElementById("get-otp-button"),
    LoginFormTitle: document.getElementById("offcanvasRightLabel"),
    goBackLinkNewPassword: document.getElementById("go-back-link-newpassword"),
    verifyOtpButton: document.getElementById("verify-otp-button"),
    confirmPass: document.getElementById("confirm-new-password-button"),
    userLog: document.getElementById("go-to-login-user"),
  };

  const serverForms = {
    type: "Server",
    loginForm: document.querySelector(".offcanvas-serverform-body form"),
    forgotPasswordForm: document.querySelector(".forgot-password-form-server"),
    otpForm: document.querySelector(".otp-form-server"),
    newPasswordForm: document.querySelector(".new-password-form-server"),
    registerForm: document.querySelector(".register-form-server"),
    registerNowLink: document.getElementById("register-link-server"),
    buttonClose: document.querySelector(".btn-close-server"),
    forgotPasswordLink: document.getElementById("forgot-password-link-server"),
    goBackLinkForm: document.getElementById("go-back-link-login-server"),
    goBackLinkGetOtp: document.getElementById("go-back-link-getotp-server"),
    getOtpButton: document.getElementById("get-otp-button-server"),
    LoginFormTitle: document.querySelector(".offcanvas-title-server"),
    goBackLinkNewPassword: document.getElementById(
      "go-back-link-newpassword-server"
    ),
    verifyOtpButton: document.getElementById("verify-otp-button-server"),
    confirmPass: document.getElementById("confirm-new-password-button-server"),
    userLog: document.getElementById("go-to-login"),
  };

  var config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
  };

  var countrySelectUser = document.querySelector(".country-user"),
    stateSelectUser = document.querySelector(".state-user"),
    citySelectUser = document.querySelector(".city-user");

  var countrySelectServer = document.querySelector(".country"),
    stateSelectServer = document.querySelector(".state"),
    citySelectServer = document.querySelector(".city");

  function loadCountries(selectElement, url, apiKey) {
    fetch(url, { headers: { "X-CSCAPI-KEY": apiKey } })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((country) => {
          const option = document.createElement("option");
          option.value = country.iso2;
          option.textContent = country.name;
          selectElement.appendChild(option);
        });
      })
      .catch((error) => console.error("Error loading countries:", error));
  }

  function loadStates(selectElement, countryCode, url, apiKey) {
    selectElement.disabled = false;
    const selectedCountryCode = countryCode;

    selectElement.innerHTML = '<option value="">Select State</option>';

    fetch(`${url}/${selectedCountryCode}/states`, {
      headers: { "X-CSCAPI-KEY": apiKey },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((state) => {
          const option = document.createElement("option");
          option.value = state.iso2;
          option.textContent = state.name;
          selectElement.appendChild(option);
        });
      });
  }

  function loadCities(selectElement, countryCode, stateCode, url, apiKey) {
    selectElement.disabled = false;
    const selectedCountryCode = countryCode;
    const selectedStateCode = stateCode;

    selectElement.innerHTML = '<option value="">Select City</option>';

    fetch(`${url}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {
      headers: { "X-CSCAPI-KEY": apiKey },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((city) => {
          const option = document.createElement("option");
          option.value = city.iso2;
          option.textContent = city.name;
          selectElement.appendChild(option);
        });
      });
  }

  function initializeFormNavigation(forms) {
    if (!forms || !forms.registerNowLink) {
      console.error("Form elements not found");
      return;
    }

    forms.registerNowLink.addEventListener("click", (event) => {
      event.preventDefault();
      forms.registerForm.style.display = "block";
      forms.loginForm.style.display = "none";
      forms.forgotPasswordForm.style.display = "none";
      forms.newPasswordForm.style.display = "none";
      forms.otpForm.style.display = "none";

      forms.LoginFormTitle.textContent = `${forms.type} SignUp`;
    });

    forms.forgotPasswordLink.addEventListener("click", (event) => {
      event.preventDefault();
      forms.forgotPasswordForm.style.display = "block";
      forms.loginForm.style.display = "none";
      forms.newPasswordForm.style.display = "none";
      forms.otpForm.style.display = "none";
      forms.registerForm.style.display = "none";
    });

    forms.getOtpButton.addEventListener("click", (event) => {
      event.preventDefault();
      forms.otpForm.style.display = "block";
      forms.loginForm.style.display = "none";
      forms.forgotPasswordForm.style.display = "none";
      forms.newPasswordForm.style.display = "none";
      forms.registerForm.style.display = "none";
    });

    forms.goBackLinkForm.addEventListener("click", (event) => {
      event.preventDefault();
      forms.loginForm.style.display = "block";
      forms.forgotPasswordForm.style.display = "none";
      forms.newPasswordForm.style.display = "none";
      forms.otpForm.style.display = "none";
      forms.registerForm.style.display = "none";
    });

    forms.goBackLinkGetOtp.addEventListener("click", (event) => {
      event.preventDefault();
      forms.forgotPasswordForm.style.display = "block";
      forms.otpForm.style.display = "none";
      forms.newPasswordForm.style.display = "none";
      forms.loginForm.style.display = "none";
      forms.registerForm.style.display = "none";
    });

    forms.goBackLinkNewPassword.addEventListener("click", (event) => {
      event.preventDefault();
      forms.forgotPasswordForm.style.display = "block";
      forms.newPasswordForm.style.display = "none";
      forms.otpForm.style.display = "none";
      forms.loginForm.style.display = "none";
      forms.registerForm.style.display = "none";
    });

    forms.buttonClose.addEventListener("click", () => {
      forms.loginForm.style.display = "block";
      forms.forgotPasswordForm.style.display = "none";
      forms.otpForm.style.display = "none";
      forms.newPasswordForm.style.display = "none";
      forms.registerForm.style.display = "none";

      forms.LoginFormTitle.textContent = `LogIn`;
    });

    forms.verifyOtpButton.addEventListener("click", (event) => {
      event.preventDefault();
      forms.newPasswordForm.style.display = "block";
      forms.otpForm.style.display = "none";
      forms.loginForm.style.display = "none";
      forms.forgotPasswordForm.style.display = "none";
      forms.registerForm.style.display = "none";
    });

    forms.confirmPass.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Password updated successfully");
      forms.loginForm.style.display = "block";
      forms.otpForm.style.display = "none";
      forms.newPasswordForm.style.display = "none";
      forms.forgotPasswordForm.style.display = "none";
      forms.registerForm.style.display = "none";
    });

    forms.userLog.addEventListener("click", (e) => {
      e.preventDefault();
      forms.loginForm.style.display = "block";
      forms.otpForm.style.display = "none";
      forms.newPasswordForm.style.display = "none";
      forms.forgotPasswordForm.style.display = "none";
      forms.registerForm.style.display = "none";

      forms.LoginFormTitle.textContent = `${forms.type} LogIn`;
    });
  }

  // Initialize user form navigation
  initializeFormNavigation(userForms);

  // Load countries for user form
  loadCountries(countrySelectUser, config.cUrl, config.ckey);

  // Event listeners for changes in the country and state selections for user form
  countrySelectUser.addEventListener("change", () => {
    loadStates(
      stateSelectUser,
      countrySelectUser.value,
      config.cUrl,
      config.ckey
    );
  });

  stateSelectUser.addEventListener("change", () => {
    loadCities(
      citySelectUser,
      countrySelectUser.value,
      stateSelectUser.value,
      config.cUrl,
      config.ckey
    );
  });

  // Initialize server form navigation
  initializeFormNavigation(serverForms);

  // Load countries for server form
  loadCountries(countrySelectServer, config.cUrl, config.ckey);

  // Event listeners for changes in the country and state selections for server form
  countrySelectServer.addEventListener("change", () => {
    loadStates(
      stateSelectServer,
      countrySelectServer.value,
      config.cUrl,
      config.ckey
    );
  });

  stateSelectServer.addEventListener("change", () => {
    loadCities(
      citySelectServer,
      countrySelectServer.value,
      stateSelectServer.value,
      config.cUrl,
      config.ckey
    );
  });
});
