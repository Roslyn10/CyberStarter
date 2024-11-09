document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'Profile.html';
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
    } catch (error) {
        console.error('Error fetching profile data:', error);
        document.getElementById('error-message').style.display = 'block';
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login-page.html';
});

async function updateProfile(username, email, password) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const updatedData = await response.json();
        document.getElementById('username').textContent = updatedData.username;
        document.getElementById('email').textContent = `Email: ${updatedData.email}`;
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}