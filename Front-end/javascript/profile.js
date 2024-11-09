const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const btn = document.getElementById('btn');
const errorMessage = document.getElementById('error-message');

// URL Base (set up for development, can be adjusted for production)
const API_BASE_URL = 'http://localhost:5000/api/auth';

// Function to switch to the signup form
function signup () {
  loginForm.style.left = '-400px';
  signupForm.style.left = '50px';
  btn.style.left = '110px';
}

// Function to switch to the login form
function login () {
  loginForm.style.left = '50px';
  signupForm.style.left = '450px';
  btn.style.left = '0px';
}

// Handle Sign Up
async function handleSignup (event) {
  event.preventDefault();
  errorMessage.textContent = '';

  const formData = new FormData(signupForm);
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    console.log('Sign Up Data:', userData);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Registration successful:', result);
      localStorage.setItem('token', result.token);
      window.location.href = 'index.html';
    } else {
      console.error('Registration failed:', result);
      errorMessage.textContent = result.message || 'Registration failed';
    }
  } catch (error) {
    console.error('Error during registration:', error);
    errorMessage.textContent = 'An error occurred during registration.';
  }
}

// Handle Log In
async function handleLogin (event) {
  event.preventDefault();
  errorMessage.textContent = '';

  const formData = new FormData(loginForm);
  const userData = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    console.log('Login Data:', userData);
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Login successful:', result);
      localStorage.setItem('token', result.token);
      window.location.href = 'index.html';
    } else {
      console.error('Login failed:', result);
      errorMessage.textContent = result.message || 'Login failed';
    }
  } catch (error) {
    console.error('Error during login:', error);
    errorMessage.textContent = 'An error occurred during login.';
  }
}

// Attach the functions to form buttons
document.getElementById('signup-btn').addEventListener('click', signup);
document.getElementById('login-btn').addEventListener('click', login);
signupForm.addEventListener('submit', handleSignup);
loginForm.addEventListener('submit', handleLogin);
