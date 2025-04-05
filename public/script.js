document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        
        // Create AJAX request
        const xhr = new XMLHttpRequest();
        
        // Configure the request
        xhr.open('POST', '/register', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        // Handle response
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    showMessage(response.message, 'success');
                    form.reset();
                } else {
                    showMessage(response.message, 'error');
                }
            } else {
                showMessage('An error occurred. Please try again.', 'error');
            }
        };
        
        // Handle network errors
        xhr.onerror = function() {
            showMessage('Network error. Please check your connection.', 'error');
        };
        
        // Send the request
        xhr.send(JSON.stringify(formData));
    });
    
    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = type;
    }
});