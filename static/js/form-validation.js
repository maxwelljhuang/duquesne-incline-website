document.addEventListener('DOMContentLoaded', function() {
    const mailingListForm = document.getElementById('mailing-list-form');
    if (mailingListForm) {
        mailingListForm.addEventListener('submit', validateMailingListForm);
    }
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', validateBookingForm);
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(emailInput);
        });
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validatePhone(phoneInput);
        });
    }
    
    const zipInput = document.getElementById('zip');
    if (zipInput) {
        zipInput.addEventListener('input', function() {
            validateZip(zipInput);
        });
    }
});

/**
 * @param {Event} event 
 */
function validateMailingListForm(event) {
    event.preventDefault();
    
    let isValid = true;
    
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else {
        clearError(nameInput);
    }
    
    const emailInput = document.getElementById('email');
    if (!validateEmail(emailInput)) {
        isValid = false;
    }
    
    const phoneInput = document.getElementById('phone');
    const smsCheckbox = document.getElementById('sms');
    
    if (phoneInput.value.trim() || smsCheckbox.checked) {
        if (!validatePhone(phoneInput)) {
            isValid = false;
        }
    }
    
    const zipInput = document.getElementById('zip');
    if (zipInput.value.trim()) {
        if (!validateZip(zipInput)) {
            isValid = false;
        }
    }
    
    if (isValid) {
        mailingListForm.style.display = 'none';
        const successMessage = document.getElementById('form-success');
        if (successMessage) {
            successMessage.classList.remove('hidden');
        }
        
        console.log('Form submitted successfully');
    }
}

/**
 * @param {Event} event 
 */
function validateBookingForm(event) {
    event.preventDefault();
    
    bookingForm.style.display = 'none';
    const successMessage = document.getElementById('booking-success');
    if (successMessage) {
        successMessage.classList.remove('hidden');
    }
    
    console.log('Booking form submitted successfully');
}

/**
 * @param {HTMLInputElement} emailInput 
 * @returns {boolean} 
 */
function validateEmail(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = emailInput.value.trim();
    const errorElement = document.getElementById('email-error');
    
    if (!emailValue) {
        showError(emailInput, 'Email address is required', errorElement);
        return false;
    } else if (!emailRegex.test(emailValue)) {
        showError(emailInput, 'Please enter a valid email address', errorElement);
        return false;
    } else {
        clearError(emailInput, errorElement);
        return true;
    }
}

/**
 * @param {HTMLInputElement} phoneInput 
 * @returns {boolean}
 */
function validatePhone(phoneInput) {
    const phoneRegex = /^\d{10,15}$/;
    const phoneValue = phoneInput.value.trim().replace(/[^\d]/g, ''); 
    const errorElement = document.getElementById('phone-error');
    
    if (phoneValue && !phoneRegex.test(phoneValue)) {
        showError(phoneInput, 'Please enter a valid phone number (10-15 digits)', errorElement);
        return false;
    } else {
        clearError(phoneInput, errorElement);
        return true;
    }
}

/**
 * @param {HTMLInputElement} zipInput 
 * @returns {boolean}
 */
function validateZip(zipInput) {
    const zipRegex = /^\d{5}$/;
    const zipValue = zipInput.value.trim();
    const errorElement = document.getElementById('zip-error');
    
    if (zipValue && !zipRegex.test(zipValue)) {
        showError(zipInput, 'Please enter a valid 5-digit ZIP code', errorElement);
        return false;
    } else {
        clearError(zipInput, errorElement);
        return true;
    }
}

/**
 * @param {HTMLInputElement} inputElement 
 * @param {string} message 
 * @param {HTMLElement} errorElement 
 */
function showError(inputElement, message, errorElement) {
    inputElement.classList.add('error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * @param {HTMLInputElement} inputElement 
 * @param {HTMLElement} errorElement
 */
function clearError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}