document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (!token) {
        console.error('No authorization token found');
        return;
    }

    fetch('http://localhost:8080/api/users', {
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
    .then(users => {
        const userList = document.getElementById('user-list');
        if (users.length === 0) {
            userList.innerHTML = '<li>No users found</li>';
        } else {
            users.forEach(user => {
                const userItem = document.createElement('li');
                userItem.className = 'mb-2';
                userItem.innerHTML = `<a href="user.html?id=${user.id}" class="text-blue-500">${user.name}</a>`;
                userList.appendChild(userItem);
            });
        }
    })
    .catch(error => console.error('Error fetching users:', error));
});