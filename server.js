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

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Registration endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({ 
            success: false,  // 👈 Add consistency
            message: 'All fields are required' 
        });
    }

    // Check if user exists
    if(users.find(user => user.username === username)) {
        return res.status(409).json({ 
            success: false,  // 👈 Add consistency
            message: 'Username already exists' 
        });
    }
    
    if (users.some(user => user.email === email)) {
        return res.status(409).json({ 
            success: false, 
            message: 'Email already registered' 
        });
    }
    
    // Add to database
    users.push({ username, email, password });
    
    res.status(201).json({ 
        success: true,  // 👈 Add consistency
        message: 'User registered successfully' 
    });
});

app.get('/clear', (req, res) => {
    users = [];
    res.send('Database cleared!');
});

// start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
