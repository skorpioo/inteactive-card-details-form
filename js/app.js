const form = document.querySelector('[data-form]');
const cardNumber = document.querySelector('[data-card-number]');
const formNumber = document.querySelector('[data-form-number]');
const cardName = document.querySelector('[data-card-name]');
const formName = document.querySelector('[data-form-name]');
const cardMonth = document.querySelector('[data-card-month]');
const formMonth = document.querySelector('[data-form-month]');
const cardYear = document.querySelector('[data-card-year]');
const formYear = document.querySelector('[data-form-year]');
const cardCvc = document.querySelector('[data-card-cvc]');
const formCvc = document.querySelector('[data-form-cvc]');
const successMessage = document.querySelector('[data-success-message]');
const resetBtn = document.querySelector('[data-reset-btn]');

// target the card inputfields
function setCardNumber(e) {
	let inputValue = e.target.value;
	cardNumber.innerText = format(inputValue);
	if (!inputValue) {
		cardNumber.innerText = '0000 0000 0000 0000';
	}
}

function setCardName(e) {
	let inputValue = e.target.value;
	cardName.innerText = inputValue;
	if (!inputValue) {
		cardName.innerText = 'Jane Appleseed';
	}
}

function setCardMonth(e) {
	let inputValue = e.target.value;
	cardMonth.innerText = inputValue;
	if (!inputValue) {
		cardMonth.innerText = '00';
	}
}

function setCardYear(e) {
	let inputValue = e.target.value;
	cardYear.innerText = inputValue;
	if (!inputValue) {
		cardYear.innerText = '00';
	}
}

function setCardCvc(e) {
	let inputValue = e.target.value;
	cardCvc.innerText = inputValue;
	if (!inputValue) {
		cardCvc.innerText = '000';
	}
}

function format(s) {
	return s.toString().replace(/\d{4}(?=.)/g, '$& ');
}

// Add form inputs to card content based on code above
formNumber.addEventListener('keyup', setCardNumber);
formName.addEventListener('keyup', setCardName);
formMonth.addEventListener('keyup', setCardMonth);
formYear.addEventListener('keyup', setCardYear);
formCvc.addEventListener('keyup', setCardCvc);

// Jump to the next input field after finishing the input
formMonth.addEventListener('keyup', function (event) {
	if (event.keyCode === 13 || formMonth.value.length == 2) {
		formYear.focus();
	}
});

formYear.addEventListener('keyup', function (event) {
	if (event.keyCode === 13 || formYear.value.length == 2) {
		formCvc.focus();
	}
});

// Add spaces after every 4 characters in formNumber input field
formNumber.addEventListener('input', (e) => {
	let inputValue = e.target.value;
	formNumber.value = inputValue
		.replace(/\s/g, '')
		.replace(/([0-9]{4})/g, '$1 ')
		.trim();
});

formName.addEventListener('input', (e) => {
	let inputValue = e.target.value;
	formName.value = inputValue.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
});

// Trigger form validation
window.onload = () => {
	var form = document.querySelector('[data-form]');
	var pristine = new Pristine(form);

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		var valid = pristine.validate();

		if (valid) {
			form.classList.add('hidden');
			successMessage.classList.remove('hidden');
		}
	});
};

resetBtn.addEventListener('click', () => {
	form.reset();
	form.classList.remove('hidden');
	successMessage.classList.add('hidden');
});
