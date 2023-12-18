var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  
  // Server-side validation
  if (!username || username.length < 5) {
    return res.status(400).send('Username must be at least 5 characters long.');
}

const emailRegex = /^\w+@\w+\.\w+$/;

  if (!email || !email.match(emailRegex)) {
    return res.status(400).send('Invalid email format.');
  }

const passwordRegex = /^[a-zA-Z0-9]+$/;
if (!password || !password.match(passwordRegex) || password.length < 6) {
    return res.status(400).send('Password must be alphanumeric and at least 6 characters long.');
}

if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match.');
}

  // Echoing back the data (excluding password for security)
  res.json({ username, email });
});



module.exports = router;
