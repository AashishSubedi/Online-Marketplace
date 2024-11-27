/*Author Aashish Subedi*/
// Simulated user database
const users = [
  { username: 'admin', password: 'password123' }, // Admin credentials
  { username: 'user1', password: 'mypassword' },  // Regular user credentials
];

// Maximum allowed login attempts before locking the account
const MAX_ATTEMPTS = 3;

// Counter to track failed login attempts
let loginAttempts = 0;

// Add event listener to handle form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Retrieve and trim input values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Check if any input field is empty
  if (!username || !password) {
    alert('Please fill in all fields.');
    return; // Stop execution if fields are not filled
  }

  // Check if maximum login attempts have been reached
  if (loginAttempts >= MAX_ATTEMPTS) {
    alert('Too many failed attempts. Please try again later.');
    return; // Stop further login attempts
  }

  // Check if the user exists in the database and credentials match
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Successful login
    sessionStorage.setItem('isLoggedIn', 'true'); // Save login status in session storage
    window.location.href = 'index.html'; // Redirect user to homepage
  } else {
    // Increment failed login attempts
    loginAttempts++;
    alert(
      `Invalid username or password. You have ${
        MAX_ATTEMPTS - loginAttempts
      } attempt(s) remaining.` // Display remaining attempts
    );

    // Lock account if maximum attempts are reached
    if (loginAttempts >= MAX_ATTEMPTS) {
      alert('Your account is temporarily locked.');
    }
  }
});
