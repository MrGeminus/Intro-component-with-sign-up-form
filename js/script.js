let submitBtn = document.getElementById("submit-btn");
let formInputs = document.querySelectorAll(".form__input");


//let error = input.nextElementSibling;
//error.innerHTML = `${input.placeholder}` + " " + `${errorMessage}`;

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let errors = validateForm();
    if (errors.length === 0) {
        document.getElementById("free-trial-form").submit();
    }
    else {
        displayError(errors)
    }
});

function validateForm() {
    let failures = [];
    formInputs.forEach(formInput => {
        if (formInput.value === "") {
            failures.push({ input: `${formInput.id}`, errorMessage: `${formInput.placeholder}` + " " + "cannot be empty" })
        }
        if (formInput.type === "email" && !formInput.value == "") {
            let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailFormat.test(formInput.value)) {
                failures.push({ input: `${formInput.id}`, errorMessage: "Looks like this is not an email" });
            }
        }
    });
    return failures;
}

function displayError(errors) {
    errors.forEach(error => {
        let formInput = document.getElementById(error.input)
        let formErrorMessage = formInput.nextElementSibling;
        formErrorMessage.innerHTML = error.errorMessage;
        formErrorMessage.style.opacity = 1;
        formInput.classList.add('form__input--error');
    });
}

function removeError() {
    formInputs.forEach(formInput => {
        formInput.addEventListener('keydown', () => {
            formInput.classList.remove('form__input--error');
        })
    });
}
removeError();
