// selecting the submit button from the DOM
let submitBtn = document.getElementById("submit-btn");
// checking if the submit button has been clicked
submitBtn.addEventListener("click", (e) => {
    // preventing the default behavior of the submit button
    e.preventDefault();
    // declaring 
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email-address");
    let password = document.getElementById("password");
    // calling the form validation function and passing in the input fields that need to be checked
    let foundErrors = validateForm(firstName, lastName, email, password);
    // if validation has been passed send the form and reset the input fields
    if (foundErrors.length === 0) {
        // document.getElementById("trial-claim-form").submit();
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        password.value = ""
    }
    // if validation hasn't been passed display errors and listen for change
    else {
        displayErrorMessage(foundErrors);
        removeErrorMessage(foundErrors);
    }
});
// validating inputs
function validateForm(firstName, lastName, email, password) {
    let failures = [];
    if (firstName.value === "") {
        failures.push({ input: `${firstName.id}`, errorMessage: "First Name cannot be empty" })
    }
    if (lastName.value === "") {
        failures.push({ input: `${lastName.id}`, errorMessage: "Last Name cannot be empty" })
    }
    if (password.value === "") {
        failures.push({ input: `${password.id}`, errorMessage: "Password cannot be empty" })
    }
    if (email.value == "") {
        failures.push({ input: `${email.id}`, errorMessage: "Email cannot be empty" })
    }
    else {
        let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailFormat.test(email.value)) {
            failures.push({ input: `${email.id}`, errorMessage: "Looks like this is not an email" });
        }
    }
    return failures;
}
// apply the error styling and appropriate message if an input field is empty or the email address is not valid
function displayErrorMessage(foundErrors) {
    foundErrors.forEach(foundError => {
        let targetInput = document.getElementById(foundError.input)
        let targetErrorField = targetInput.nextElementSibling;
        targetErrorField.innerHTML = foundError.errorMessage;
        targetErrorField.classList.add('trial-claim__form-error-message--active');
        targetInput.classList.add('trial-claim__form-input--error');
        targetInput.placeholder = "";
    });
}
// removing the error styling and message after the user starts typing
function removeErrorMessage(foundErrors) {
    foundErrors.forEach(foundError => {
        let targetInput = document.getElementById(foundError.input);
        targetInput.addEventListener("keydown", () => {
            let targetErrorField = targetInput.nextElementSibling;
            targetErrorField.innerHTML = "";
            targetErrorField.classList.remove('trial-claim__form-error-message--active');
            targetInput.classList.remove('trial-claim__form-input--error');
            function capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            targetInput.placeholder = `${targetInput.id.split("-").map(capitalize).join(' ').toString()}`;
        })
    });
}
