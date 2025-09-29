import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('carapp.db');

db.serialize(() => {
  // Drop tables if they exist
  db.run(`DROP TABLE IF EXISTS rents`);
  db.run(`DROP TABLE IF EXISTS car`);
  db.run(`DROP TABLE IF EXISTS renter`);
  db.run(`DROP TABLE IF EXISTS owner`);

  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS owner (
    owner_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    phonenumber VARCHAR(15) NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS renter (
    renter_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phonenumber VARCHAR(15) NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS car (
    car_id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER REFERENCES owner(owner_id),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    fuel_type TEXT NOT NULL,
    fuel_economy TEXT,
    range INTEGER,
    seats INTEGER NOT NULL,
    location TEXT NOT NULL,
    images TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS rents (
    rent_id INTEGER PRIMARY KEY AUTOINCREMENT,
    renter_id INTEGER REFERENCES renter(renter_id),
    car_id INTEGER REFERENCES car(car_id),
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL
  )`);

  // Insert data
  db.run(`INSERT INTO owner (name, rating, phonenumber) VALUES
    ('Alice Johnson', 5, '+14155550111'),
    ('Bob Martinez', 4, '+14155550222'),
    ('Charlie Smith', 3, '+14155550333')`
  );

  db.run(`INSERT INTO renter (name, phonenumber) VALUES
    ('David Lee', '+14155560111'),
    ('Emma Wilson', '+14155560222'),
    ('Frank Zhang', '+14155560333')`
  );

  db.run(`INSERT INTO car (owner_id, brand, model, description, price, fuel_type, fuel_economy, range, seats, location, images) VALUES
    (1, 'Tesla', 'Model 3', 'A sleek electric car with autopilot features.', 45000.00, 'Electric', '130 Wh/km', 350, 5, 'San Francisco, CA', '["tesla_model3_1.jpg","tesla_model3_2.jpg"]'),
    (2, 'Toyota', 'Camry', 'Reliable and fuel-efficient sedan.', 24000.00, 'Gasoline', '30 mpg', 600, 5, 'Oakland, CA', '["toyota_camry_1.jpg","toyota_camry_2.jpg"]'),
    (3, 'BMW', 'X5', 'Luxury SUV with spacious interior.', 60000.00, 'Hybrid', '25 mpg', 650, 5, 'Palo Alto, CA', '["bmw_x5_1.jpg","bmw_x5_2.jpg"]')`
  );

  db.run(`INSERT INTO rents (renter_id, car_id, start_date, end_date) VALUES
    (1, 1, '2025-10-01', '2025-10-05'),
    (2, 2, '2025-10-03', '2025-10-07'),
    (3, 3, '2025-10-10', '2025-10-15')`
  );
});

// Get all cars
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM car', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a renter (fixed the broken /users route)
app.post('/renter', (req, res) => {
  const { name, phonenumber } = req.body;
  db.run(
    'INSERT INTO renter (name, phonenumber) VALUES (?, ?)',
    [name, phonenumber],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, phonenumber });
    }
  );
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
