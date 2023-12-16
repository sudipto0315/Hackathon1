// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the login, forgot password, OTP, and new password forms
    const loginForm = document.querySelector(".offcanvas-serverform-body form");
    const forgotPasswordForm = document.querySelector(".forgot-password-form-server");
    const otpForm = document.querySelector(".otp-form-server");
    const newPasswordForm = document.querySelector(".new-password-form-server"); // Add reference to the new password form
    const registerForm = document.querySelector(".register-form-server"); // Reference to the registration form

    // Get references to the close button, links, and the "Get OTP" button
    const buttonClose = document.querySelector(".btn-close-server");
    const forgotPasswordLink = document.getElementById("forgot-password-link-server");
    const goBackLinkForm = document.getElementById("go-back-link-login-server");
    const goBackLinkGetOtp = document.getElementById("go-back-link-getotp-server");
    const getOtpButton = document.getElementById("get-otp-button-server");
    const goBackLinkNewPassword = document.getElementById("go-back-link-newpassword-server"); // Add reference to the "Go Back" link for the new password form
    const verifyOtpButton = document.getElementById("verify-otp-button-server");
    const confirmPass = document.getElementById("confirm-new-password-button-server");
    const registerLink = document.getElementById("register-link-server"); // Link to open the registration form
    const loginServer = document.getElementById("go-to-login");
   

    // Event listener for the "Forgot Password" link
    forgotPasswordLink.addEventListener("click", (event) => {
        // Prevent the default behavior of the link
        event.preventDefault();

        // Toggle visibility of the forms
        forgotPasswordForm.style.display = "block";
        loginForm.style.display = "none";
        newPasswordForm.style.display = "none";
        otpForm.style.display = "none";
    });
  

    // Event listener for the "Get OTP" button
    getOtpButton.addEventListener("click", (event) => {
        event.preventDefault();

        // Hide login, forgot password, and new password forms, display OTP form
        otpForm.style.display = "block";
        loginForm.style.display = "none";
        forgotPasswordForm.style.display = "none";
        newPasswordForm.style.display = "none"; // Hide the new password form
    });

    // Event listener for the "Go Back" link in the login form
    goBackLinkForm.addEventListener("click", (event) => {
        event.preventDefault();
        // Show login form, hide forgot password and new password forms
        loginForm.style.display = "block";
        forgotPasswordForm.style.display = "none";
        newPasswordForm.style.display = "none"; // Hide the new password form
        otpForm.style.display = "none";
    });

    // Event listener for the "Go Back" link in the OTP form
    goBackLinkGetOtp.addEventListener("click", (event) => {
        event.preventDefault();
        // Show forgot password form, hide OTP and new password forms
        forgotPasswordForm.style.display = "block";
        otpForm.style.display = "none";
        newPasswordForm.style.display = "none";
        loginForm.style.display = "none";
    });

    // Event listener for the "Go Back" link in the new password form
    goBackLinkNewPassword.addEventListener("click", (event) => {
        event.preventDefault();
        // Show forgot password form, hide new password form
        forgotPasswordForm.style.display = "block";
        newPasswordForm.style.display = "none";
        otpForm.style.display = "none";
        loginForm.style.display = "none";
    });

    // Event listener for the close button
    buttonClose.addEventListener("click", () => {
        // Show login form, hide forgot password, OTP, and new password forms
        loginForm.style.display = "block";
        forgotPasswordForm.style.display = "none";
        otpForm.style.display = "none";
        newPasswordForm.style.display = "none"; // Hide the new password form
    });

    verifyOtpButton.addEventListener("click", (event) => {
        event.preventDefault();
        newPasswordForm.style.display = "block";
        otpForm.style.display = "none";
        loginForm.style.display = "none";
        forgotPasswordForm.style.display = "none";
    });

    confirmPass.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Password updated sucessfully");
        loginForm.style.display = "block";
        otpForm.style.display = "none";
        newPasswordForm.style.display = "none";
        forgotPasswordForm.style.display = "none";
    });

    // Event listener for the "Register" link
    registerLink.addEventListener("click", (event) => {
        event.preventDefault();
        registerForm.style.display = "block";
        loginForm.style.display = "none";
        forgotPasswordForm.style.display = "none";
        newPasswordForm.style.display = "none";
        otpForm.style.display = "none";
    });

    loginServer.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        forgotPasswordForm.style.display = "none";
        newPasswordForm.style.display = "none";
        otpForm.style.display = "none";
    })
    var config = {
        cUrl: "https://api.countrystatecity.in/v1/countries",
        ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
    };
    
    var countrySelect = document.querySelector(".country"),
        stateSelect = document.querySelector(".state"),
        citySelect = document.querySelector(".city");
    
    function loadCountries() {
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
    
    function loadStates() {
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
            });
    }
    
    function loadCities() {
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
            });
    }
    
    // Initial load of countries
    window.onload = loadCountries;
    
    // Event listeners for changes in the country and state selections
    countrySelect.addEventListener("change", loadStates);
    stateSelect.addEventListener("change", loadCities);
    
});
