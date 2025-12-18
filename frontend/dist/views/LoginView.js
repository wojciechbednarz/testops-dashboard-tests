export function renderLogin(container) {
    const loginButton = document.getElementById("login-button");
    if (loginButton) {
        loginButton.addEventListener("click", (event) => {
            event.preventDefault();
            const usernameInput = document.querySelector('input[type="text"]');
            const passwordInput = document.querySelector('input[type="password"]');
            const username = usernameInput.value;
            const password = passwordInput.value;
            if (username && password) {
                // Here you would typically send the login data to your server
                console.log(`Logging in with Username: ${username}, Password: ${password}`);
                // For now, just clear the inputs
                usernameInput.value = '';
                passwordInput.value = '';
                // Optionally, redirect to another page after login
                window.location.href = "/tests.html"; // Redirect to test runs page
            }
            else {
                console.error("Username and Password cannot be empty");
            }
        });
    }
}
