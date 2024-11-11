document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');  // Get the JWT token from localStorage
  const errorMessage = document.getElementById('error-message');
  const usernameElement = document.getElementById('username');
  const emailElement = document.getElementById('email');
  
  if (!token) {
      errorMessage.textContent = 'You need to be logged in to view your profile.';
      errorMessage.style.display = 'block';
      return;
  }

  try {
      // Send a request to the backend to fetch the user's profile data
      const response = await fetch('http://localhost:5000/api/auth/profile', { 
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });

      const result = await response.json();

      if (response.ok) {
          // Display the user's profile data
          usernameElement.textContent = result.username;
          emailElement.textContent = `Email: ${result.email}`;
      } else {
          errorMessage.textContent = result.message || 'Error fetching profile data';
          errorMessage.style.display = 'block';
      }
  } catch (error) {
      console.error('Error fetching profile data:', error);
      errorMessage.textContent = 'An error occurred while fetching profile data.';
      errorMessage.style.display = 'block';
  }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('token'); 
  window.location.href = 'login.html'; 
});