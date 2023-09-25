// Variables for the 'basic info' section
const name = document.getElementById('name');
const otherJobRole = document.getElementById('other-job-role');
const jobSelection = document.getElementById('title');
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');

// Variable for the 'activities' section
const registerForActivities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let totalCost = 0;
const activities = document.querySelectorAll('input[type="checkbox"]');

// Variables for the 'payment' section
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipcode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

// Variable for the form
const form = document.querySelector('form');

// DOM event listener to trigger once DOM loads.
// This will set some basic attributes and default options.

// Ex: 'Other' job role box hidden unless selected,
//     Shirt color disabled until theme selected,
//     Paypal and bitcoin boxes hidden by default,
//     'Credit card' selected as default payment
//     Loop through activity checkboxes and give them
//      a 'focus' and 'blur' event listeners

document.addEventListener('DOMContentLoaded', () => {
    name.focus();
    otherJobRole.style.display = 'none';
    shirtColor.disabled = true;
    paypal.hidden = true;
    bitcoin.hidden = true;
    payment.children[1].setAttribute('selected', 'selected');
    for (let i = 0; i < activities.length; i++) {
        activities[i].addEventListener('focus', (e) => {
            const parent = e.target.parentElement;
            parent.classList.add('focus');
        });
        activities[i].addEventListener('blur', (e) => {
            const parent = e.target.parentElement;
            parent.classList.remove('focus');
        });
    };
});

// Job selection event listener to trigger 'other' 
// job role box if selected.

jobSelection.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none'
    }
});

// Shirt design event listener to enable the shirt
// color dropdown and change possible choices from
// color dropdown depending on the theme selected.

shirtDesign.addEventListener('change', (e) => {
    shirtColor.disabled = false;
    for (let i = 0; i < shirtColor.children.length; i++) {
        const value = e.target.value;
        const dataTheme = shirtColor.children[i].getAttribute('data-theme');
        if (value === dataTheme) {
            shirtColor.children[i].hidden = false;
            shirtColor.children[i].selected = true;
        } else {
            shirtColor.children[i].hidden = true;
            shirtColor.children[i].selected = false;
        }
    }
});

// Activities register event listener to track what 
// activities are selected and total the amount that
// they cost and update the total value in the DOM

registerForActivities.addEventListener('change', (e) => {
    const dataCost = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`
});

// Payment event listener that tracks what payment
// has been selected and show the payment field 
// for the selected payment while hiding the 
// payment field for un used payment types

payment.addEventListener('change', (e) => {
    const paymentSelected = e.target.value;
    if (paymentSelected === 'credit-card') {
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    } else if (paymentSelected === 'paypal') {
        creditCard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;
    } else if (paymentSelected === 'bitcoin') {
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    }
});

/*
activities.addEventListener('change', (e) => {
    const checkedTime = 
})
*/

// 'isValid' functions to check whether an input is a
// valid input using regular expressions.

// Name is based on a 'first' and 'last' name check that
// excludes numbers and special characters

const isValidName = () => {
    const usersName = name.value;
    if (usersName === '') {
        const testName = false;
        return testName;
    } else {
        const nameRegEx = /^\w+[^0-9\W]\s\w+[^0-9\W]$/;
        testName = nameRegEx.test(usersName);
        return testName;
    }
}

// Email must include an '@' followed by an ending
// including '.' and 2-3 letter domain extension

const isValidEmail = () => {
    const userEmail = email.value;
    const emailRegEx = /^[^@]+@[^@.]+\.[a-z]{2,3}$/i;
    const testEmail = emailRegEx.test(userEmail);
    return testEmail;
}

// Credit card number must include 13-16 digits

const isValidCCNumber = () => {
    const userCardNumber = cardNumber.value;
    const creditCardRegEx = /^[0-9]{13,16}$/;
    const testCreditCard = creditCardRegEx.test(userCardNumber);
    return testCreditCard;
}

// Valid must include 5 digits

const isValidZipcode = () => {
    const userZipcode = zipcode.value;
    const zipcodeRegEx = /^[0-9]{5}$/;
    const testZipcode = zipcodeRegEx.test(userZipcode);
    return testZipcode;
}

// CVV must include 3 digits

const isValidCVV = () => {
    const userCVV = cvv.value;
    const cvvRegEx = /^[0-9]{3}$/;
    const testCVV = cvvRegEx.test(userCVV);
    return testCVV;
}

// An activity must be checked to validate.
// Checks to see if any activities are checked,
// increments 'checkedActivities' if there are any.
// 'checkedActivities' is compared at the end and if there are
// checked activities, 'isActivityChecked' is set to true.

const activityChecked = () => {
    let isActivityChecked = false;
    let checkedActivities = 0;
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            checkedActivities += 1;
        }
    }
    if (checkedActivities > 0) {
        isActivityChecked = true;
    }
    return isActivityChecked;
}

// form event listener triggers when the submit button is clicked. 
// The 'submitValidator' function takes in two parameters: inputElement and validatorFunction.
// This runs through each required fields validator function (isValidName, isValidEmail, etc.)
//  and either assigns 'not-valid' or 'valid' based on whether the functions validate properly.

// If validation is successful:
// a checkmark icon is displayed and no error indicators are displayed.

// If validation is unsuccessful:
// a validation error message, warning icon and color are displayed.

form.addEventListener('submit', (e) => {
    const submitValidator = (inputElement, validatorFunction) => {
        if(validatorFunction()) {
            inputElement.classList.add('valid');
            inputElement.classList.remove('not-valid');
            inputElement.lastElementChild.style.display = 'none';
        } else {
            e.preventDefault();
            inputElement.classList.add('not-valid');
            inputElement.classList.remove('valid');
            inputElement.lastElementChild.style.display = 'block';
        }
    };
    submitValidator(name.parentElement, isValidName);
    submitValidator(email.parentElement, isValidEmail);
    if (creditCard.hidden === false) {                                                   //// This if statement will check if the credit card field is shown 
        submitValidator(cardNumber.parentElement, isValidCCNumber);                      //// and validates the required fields if credit card is selected as payment
        submitValidator(zipcode.parentElement, isValidZipcode);
        submitValidator(cvv.parentElement, isValidCVV);
    }
    submitValidator(registerForActivities, activityChecked);
});

const realTimeValidator = (input, validateFunction, errorMessage) => {
    if (validateFunction()) {
        input.classList.add('valid');
        input.classList.remove('not-valid');
        input.lastElementChild.style.display = 'none';
    } else {
        errorMessage;
        input.classList.add('not-valid');
        input.classList.remove('valid');
        input.lastElementChild.style.display = 'block';
    }
};

// Name 'keyup' event listener to check in real time 'Name' validation

name.addEventListener('keyup', (e) => {
    if (name.value === '') {
        const errorGiven = name.parentElement.lastElementChild.innerHTML = 'Name field cannot be blank';
        realTimeValidator(name.parentElement, isValidName, errorGiven);
    } else {
        errorGiven = name.parentElement.lastElementChild.innerHTML = 'Name must include first and last name';
        realTimeValidator(name.parentElement, isValidName, errorGiven);
    }
});
