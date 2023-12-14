// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the login, forgot password, OTP, and new password forms
    const loginForm = document.querySelector(".offcanvas-serverform-body form");
    const forgotPasswordForm = document.querySelector(".forgot-password-form-server");
    const otpForm = document.querySelector(".otp-form-server");
    const newPasswordForm = document.querySelector(".new-password-form-server"); // Add reference to the new password form
    
    // Get references to the close button, links, and the "Get OTP" button
    const buttonClose = document.querySelector(".btn-close-server");
    const forgotPasswordLink = document.getElementById("forgot-password-link-server");
    const goBackLinkForm = document.getElementById("go-back-link-login-server");
    const goBackLinkGetOtp = document.getElementById("go-back-link-getotp-server");
    const getOtpButton = document.getElementById("get-otp-button-server");
    const goBackLinkNewPassword = document.getElementById("go-back-link-newpassword-server"); // Add reference to the "Go Back" link for the new password form
    const verifyOtpButton = document.getElementById("verify-otp-button-server");
    const confirmPass = document.getElementById("confirm-new-password-button-server");

    // Event listener for the "Forgot Password" link
    forgotPasswordLink.addEventListener("click", event => {
        // Prevent the default behavior of the link
        event.preventDefault();

        // Toggle visibility of the forms
        forgotPasswordForm.style.display = "block";
        loginForm.style.display = "none";
        newPasswordForm.style.display = "none";
        otpForm.style.display = "none";
    });

    // Event listener for the "Get OTP" button
    getOtpButton.addEventListener("click", event => {
        event.preventDefault();

        // Hide login, forgot password, and new password forms, display OTP form
        otpForm.style.display = "block";
        loginForm.style.display = "none";
        forgotPasswordForm.style.display = "none";
        newPasswordForm.style.display = "none"; // Hide the new password form
    });

    // Event listener for the "Go Back" link in the login form
    goBackLinkForm.addEventListener("click", event => {
        event.preventDefault();
        // Show login form, hide forgot password and new password forms
        loginForm.style.display = "block";
        forgotPasswordForm.style.display = "none";
        newPasswordForm.style.display = "none"; // Hide the new password form
        otpForm.style.display = "none";
    });

    // Event listener for the "Go Back" link in the OTP form
    goBackLinkGetOtp.addEventListener("click", event => {
        event.preventDefault();
        // Show forgot password form, hide OTP and new password forms
        forgotPasswordForm.style.display = "block";
        otpForm.style.display = "none";
        newPasswordForm.style.display = "none"; 
        loginForm.style.display = "none";

    });

    // Event listener for the "Go Back" link in the new password form
    goBackLinkNewPassword.addEventListener("click", event => {
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

    verifyOtpButton.addEventListener("click", event => {
        event.preventDefault();
        newPasswordForm.style.display = "block";
        otpForm.style.display = "none";
        loginForm.style.display = "none";
        forgotPasswordForm.style.display = "none";
    });

    confirmPass.addEventListener("click", event => {
        event.preventDefault();
        alert("Password updated sucessfully");
        loginForm.style.display = "block";
        otpForm.style.display = "none";
        newPasswordForm.style.display = "none";
        forgotPasswordForm.style.display = "none";
    })
});
