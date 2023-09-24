const name = document.getElementById('name');
name.focus();

const otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = 'none';

const jobSelection = document.getElementById('title');

jobSelection.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none'
    }
});

const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');

shirtColor.disabled = true;

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

const registerForActivities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let totalCost = 0;

registerForActivities.addEventListener('change', (e) => {
    const dataCost = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`
});

const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

paypal.hidden = true;
bitcoin.hidden = true;

payment.children[1].setAttribute('selected', 'selected');

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

const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipcode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');
const activities = document.querySelectorAll('input[type="checkbox"]');

const isValidName = () => {
    const usersName = name.value;
    const nameRegEx = /^\w+[^0-9]\s\w+[^0-9]$/;
    const testName = nameRegEx.test(usersName);
    return testName;
}

const isValidEmail = () => {
    const userEmail = email.value;
    const emailRegEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const testEmail = emailRegEx.test(userEmail);
    return testEmail;
}

const isValidCCNumber = () => {
    const userCardNumber = cardNumber.value;
    const creditCardRegEx = /^[0-9]{13,16}$/;
    let testCreditCard = creditCardRegEx.test(userCardNumber);
    if (document.getElementById('credit-card').hidden === true) {
        testCreditCard = false;
    }
    return testCreditCard;
}

const isValidZipcode = () => {
    const userZipcode = zipcode.value;
    const zipcodeRegEx = /^[0-9]{5}$/;
    const testZipcode = zipcodeRegEx.test(userZipcode);
    return testZipcode;
}

const isValidCVV = () => {
    const userCVV = cvv.value;
    const cvvRegEx = /^[0-9]{3}$/;
    const testCVV = cvvRegEx.test(userCVV);
    return testCVV;
}

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

form.addEventListener('submit', (e) => {
    const submitValidator = (inputElement, validatorFunction) => {
        if(validatorFunction()) {
            console.log('it works');
            inputElement.classList.add('valid');
            inputElement.classList.remove('not-valid');
        } else {
            e.preventDefault();
            inputElement.classList.add('not-valid');
            inputElement.classList.remove('valid');
            console.log('it doesn\'t work');
        }
    };
    submitValidator(name.parentElement, isValidName);
    submitValidator(email.parentElement, isValidEmail);
    if (creditCard.hidden === false) {
        submitValidator(cardNumber.parentElement, isValidCCNumber);
        submitValidator(zipcode.parentElement, isValidZipcode);
        submitValidator(cvv.parentElement, isValidCVV);
    }
    submitValidator(registerForActivities, activityChecked);
});

for (let i = 0; i < activities.length; i++) {
    activities[i].addEventListener('focus', (e) => {
        const parent = e.target.parentElement;
        parent.classList.add('focus');
    });
    activities[i].addEventListener('blur', (e) => {
        const parent = e.target.parentElement;
        parent.classList.remove('focus');
    });
}