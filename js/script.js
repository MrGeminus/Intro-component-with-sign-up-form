let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let foundErrors = validateForm();
    if (foundErrors.length === 0) {
        document.getElementById("free-trial-form").submit();
    }
    else {
        displayErrorMessage(foundErrors);
        removeErrorMessage(foundErrors);
    }
});

function validateForm() {
    let failures = [];
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email-address");
    let password = document.getElementById("password");
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
