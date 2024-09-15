const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value TEXT)');
  db.run('INSERT INTO items (name, value) VALUES ("Item 1", "Value 1")');
});

db.close();
