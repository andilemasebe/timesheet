document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Form validation
    loginForm.addEventListener('submit', function(event) {
        if (!loginForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        loginForm.classList.add('was-validated');
    });

    // Password visibility toggle
    const passwordInput = document.getElementById('password');
    const togglePassword = document.createElement('span');
    togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
    togglePassword.className = 'position-absolute end-0 top-50 translate-middle-y pe-3 pointer';
    togglePassword.style.cursor = 'pointer';
    passwordInput.parentElement.style.position = 'relative';
    passwordInput.parentElement.appendChild(togglePassword);

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Add loading state to button on submit
    loginForm.addEventListener('submit', function() {
        const button = this.querySelector('button[type="submit"]');
        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
        button.disabled = true;
    });
});
