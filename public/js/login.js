const loginFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Incorrect username or password');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);