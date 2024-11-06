const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Default user for XAMPP MySQL is usually 'root'
    password: '', // Default password is empty
    database: 'Reseaux'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// User registration endpoint
app.post('/register', (req, res) => {
    const { appName, username, password } = req.body;

    const query = 'INSERT INTO users (appName, username, password) VALUES (?, ?, ?)';
    db.query(query, [appName, username, password], (err, result) => {
        if (err) {
            console.error("Database error:", err); // Log the error
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
