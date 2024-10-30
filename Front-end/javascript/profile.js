document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile data');
        }

        const userData = await response.json();
        document.getElementById('username').textContent = userData.username;
        document.getElementById('email').textContent = `Email: ${userData.email}`;
        // Populate activity list as needed
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html'; // Redirect to login page
});