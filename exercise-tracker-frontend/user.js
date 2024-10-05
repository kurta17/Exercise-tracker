document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (!token) {
        console.error('No authorization token found');
        return;
    }

    fetch(`http://localhost:8080/api/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(user => {
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').textContent = `Email: ${user.email}`;
        document.getElementById('user-role').textContent = `Role: ${user.role}`;
    })
    .catch(error => console.error('Error fetching user:', error));
});