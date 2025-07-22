document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    function showMessage(id, show) {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? 'inline' : 'none';
    }

    function hideAllMessages() {
        const messages = document.querySelectorAll('.error-message, .mensagem-obrigatoria');
        messages.forEach(msg => msg.style.display = 'none');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function (e) {
        hideAllMessages();
        let valid = true;

        // Nome
        const name = form.name.value.trim();
        if (!name) {
            showMessage('name-obrigatorio', true);
            valid = false;
        } else if (name.length < 2) {
            showMessage('name-error', true);
            valid = false;
        }

        // Email
        const email = form.email.value.trim();
        if (!email) {
            showMessage('email-obrigatorio', true);
            valid = false;
        } else if (!isValidEmail(email)) {
            showMessage('email-error', true);
            valid = false;
        }

        // Idade
        const age = form.age.value.trim();
        if (!age) {
            showMessage('age-obrigatorio', true);
            valid = false;
        } else if (isNaN(age) || Number(age) < 1) {
            showMessage('age-error', true);
            valid = false;
        }

        // Senha
        const password = form.password.value;
        if (!password) {
            showMessage('password-obrigatorio', true);
            valid = false;
        } else if (password.length < 6) {
            showMessage('password-error', true);
            valid = false;
        }

        // Confirmação de senha
        const confirmPassword = form.confirm_password.value;
        if (!confirmPassword) {
            showMessage('confirm-password-obrigatorio', true);
            valid = false;
        } else if (confirmPassword !== password) {
            showMessage('confirm-password-error', true);
            valid = false;
        }

        if (!valid) {
            e.preventDefault();
        }
    });

    // Esconde mensagens ao digitar
    ['name', 'email', 'age', 'password', 'confirm_password'].forEach(field => {
        form[field].addEventListener('input', hideAllMessages);
    });

    hideAllMessages();
});
