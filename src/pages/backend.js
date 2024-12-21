// pages/api/events.js

import mysql from 'mysql2';

// Create MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default user for XAMPP
  password: '', // Default password for XAMPP
  database: 'schedule', // Name of your MySQL database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request: Fetch all events
    db.query('SELECT * FROM events', (err, results) => {
      if (err) {
        console.error('Error fetching events:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results); // Send events as response
    });
  } else if (req.method === 'POST') {
    // Handle POST request: Insert a new event
    const { title, description, start, end } = req.body;
    
    // Basic validation
    if (!title || !description || !start || !end) {
      return res.status(400).json({ error: 'All fields (title, description, start, end) are required.' });
    }

    const query = 'INSERT INTO events (title, description, start, end) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, start, end], (err, results) => {
      if (err) {
        console.error('Error adding event:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Event added successfully', eventId: results.insertId });
    });
  }
}
