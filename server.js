const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static files middleware
app.use(express.static('public'));

// database
let users = [];

// Registration endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // check if user already exists
    if(users.find(user => user.username === username)) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    if(users.find(user => user.email === email)) {
        return res.status(409).json({ message: 'Email already exists' });
    }

    // add to database
    users.push({ username, email, password });
    res.status(201).json({ message: 'User registered successfully' });

});

// start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
