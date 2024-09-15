const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());
app.use(cors());

// Example route to get all data
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// Example route to add a new item
app.post('/api/items', (req, res) => {
  const { name, value } = req.body;
  db.run('INSERT INTO items (name, value) VALUES (?, ?)', [name, value], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item created successfully', id: this.lastID });
  });
});

// Example route to update an item
app.put('/api/items/:id', (req, res) => {
  const { name, value } = req.body;
  const { id } = req.params;
  db.run('UPDATE items SET name = ?, value = ? WHERE id = ?', [name, value, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item updated successfully' });
  });
});

// Example route to delete an item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM items WHERE id = ?', id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
