document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(e => e.innerText = '');

    // Validate email
    const loginEmail = document.getElementById('loginEmail').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(loginEmail)) {
        document.getElementById('loginEmailError').innerText = 'Invalid email format';
        isValid = false;
    }

    // Validate password
    const loginPassword = document.getElementById('loginPassword').value;
    if (loginPassword.length < 8) {
        document.getElementById('loginPasswordError').innerText = 'Password must be at least 8 characters';
        isValid = false;
    }

    // If form is valid, proceed with login
    if (isValid) {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/patients/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('token', result.token);
                alert('Login successful');
                // Redirect to appointments page or another secured page
                window.location.href = 'appointments.html';
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});
