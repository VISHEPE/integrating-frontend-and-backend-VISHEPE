document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Clear previous error messages
    document.querySelectorAll('.error').forEach(e => e.innerText = '');

    // Gather form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Validate form
    const isValid = validateForm(data);
    if (!isValid) return;

    // Submit form data
    try {
        const response = await fetch('/patients/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Registration successful');
            window.location.href = "login.html"; 
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Validation function
function validateForm(data) {
    let isValid = true;

    // Check for first name
    if (!data.first_name || !data.first_name.trim()) {
        const firstNameError = document.getElementById('firstNameError');
        if (firstNameError) firstNameError.innerText = 'First name is required';
        isValid = false;
    }

    // Check for last name
    if (!data.last_name || !data.last_name.trim()) {
        const lastNameError = document.getElementById('lastNameError');
        if (lastNameError) lastNameError.innerText = 'Last name is required';
        isValid = false;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(data.email)) {
        const emailError = document.getElementById('emailError');
        if (emailError) emailError.innerText = 'Invalid email format';
        isValid = false;
    }

    // Validate password length
    if (!data.password || data.password.length < 8) {
        const passwordError = document.getElementById('passwordError');
        if (passwordError) passwordError.innerText = 'Password must be at least 8 characters';
        isValid = false;
    }

    // Check password confirmation
    if (data.password !== data.confirmPassword) {
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        if (confirmPasswordError) confirmPasswordError.innerText = 'Passwords do not match';
        isValid = false;
    }

    // Validate phone number
    if (!data.phone || !data.phone.trim()) {
        const phoneError = document.getElementById('phoneError');
        if (phoneError) phoneError.innerText = 'Phone number is required';
        isValid = false;
    }

    // Validate gender
    if (!data.gender) {
        const genderError = document.getElementById('genderError');
        if (genderError) genderError.innerText = 'Gender is required';
        isValid = false;
    }

    // Validate address
    if (!data.address || !data.address.trim()) {
        const addressError = document.getElementById('addressError');
        if (addressError) addressError.innerText = 'Address is required';
        isValid = false;
    }

    // Validate terms acceptance
    if (!data.terms) {
        const termsError = document.getElementById('termsError');
        if (termsError) termsError.innerText = 'You must accept the terms and conditions';
        isValid = false;
    }

    return isValid;
}
