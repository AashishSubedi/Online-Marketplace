//Author Vinisha Chaudhary
// Validate login form
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === '' || password === '') {
    alert('Please fill in all fields.');
    return;
  }

  // Placeholder logic for login
  if (username === 'admin' && password === 'password') {
    window.location.href = 'index.html'; // Redirect to the homepage
  } else {
    alert('Invalid username or password.');
  }
});

