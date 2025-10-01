import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';


const app = express();


app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('carapp.db');

db.serialize(() => {

  db.run(`DROP TABLE IF EXISTS rents`);
  db.run(`DROP TABLE IF EXISTS car`);
  db.run(`DROP TABLE IF EXISTS renter`);
  db.run(`DROP TABLE IF EXISTS owner`);
  db.run(`DROP TABLE IF EXISTS user`);

  db.run(`CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phonenumber TEXT NOT NULL,
    password TEXT NOT NULL,
    is_owner BOOLEAN DEFAULT 0,
    rating REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS car (
    car_id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    fuel_type TEXT,
    range INTEGER,
    seats INTEGER NOT NULL,
    location TEXT NOT NULL,
    images TEXT NOT NULL,
    owner_id INTEGER,
    FOREIGN KEY(owner_id) REFERENCES user(user_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS rents (
   rent_id INTEGER PRIMARY KEY AUTOINCREMENT,
   renter_id INTEGER,
   car_id INTEGER,
   start_date TEXT NOT NULL,
   end_date TEXT NOT NULL,
   FOREIGN KEY (renter_id) REFERENCES user(user_id),
   FOREIGN KEY (car_id) REFERENCES car(car_id)

  )`);


  db.run(`INSERT INTO user (username, name, phonenumber, password, is_owner, rating) VALUES
    ('alicej', 'Alice Johnson', '+14155550111', 'pass123', 1, 4.9),
    ('bobm', 'Bob Martinez', '+14155550222', 'pass456', 0, 4.2),
    ('charlies', 'Charlie Smith', '+14155550333', 'pass789', 0, 3.8),
    ('dianap', 'Diana Prince', '+14155550444', 'pass321', 1, 4.7),
    ('ethanh', 'Ethan Hunt', '+14155550555', 'pass654', 0, 4.5)
`);

  db.run(`INSERT INTO car (brand, model, description, price, fuel_type, range, seats, location, images, owner_id) VALUES
    ('Tesla', 'Model 3', 'A sleek electric car with autopilot features.', 45000, 'Electric', 350, 5, 'San Francisco, CA', '["tesla_model3_1.jpg","tesla_model3_2.jpg"]', 1),
    ('Toyota', 'Camry', 'Reliable and fuel-efficient sedan.', 24000, 'Gasoline', 600, 5, 'Oakland, CA', '["toyota_camry_1.jpg","toyota_camry_2.jpg"]', 4),
    ('BMW', 'X5', 'Luxury SUV with spacious interior.', 60000, 'Hybrid', 650, 5, 'Palo Alto, CA', '["bmw_x5_1.jpg","bmw_x5_2.jpg"]', 1),
    ('Honda', 'Civic', 'Compact and efficient car.', 22000, 'Gasoline', 500, 5, 'Berkeley, CA', '["honda_civic_1.jpg","honda_civic_2.jpg"]', 4),
    ('Ford', 'Mustang', 'Sporty car with great performance.', 55000, 'Gasoline', 400, 4, 'San Jose, CA', '["ford_mustang_1.jpg","ford_mustang_2.jpg"]', 1)
`);


  db.run(`INSERT INTO rents (renter_id, car_id, start_date, end_date) VALUES
    (2, 1, '2025-10-01', '2025-10-05'),
    (3, 2, '2025-10-03', '2025-10-07'),
    (5, 3, '2025-10-10', '2025-10-15'),
    (2, 4, '2025-10-12', '2025-10-14'),
    (3, 5, '2025-10-20', '2025-10-25')
`);



app.get('/getAllUsers', (req, res) => {
  db.all('SELECT * FROM owner', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.get('/getAllRenters', (req, res) => {
  db.all('SELECT * FROM user WHERE', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.get('/getAllRenters', (req, res) => {
  db.all('SELECT * FROM user WHERE', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.get('/getALLCars', (req, res) => {
  db.all('SELECT * FROM car', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.get('/getAllRents', (req, res) => {
  db.all('SELECT * FROM rents', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/getOwner/:id', (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT * FROM owner WHERE owner_id = ?', 
    [id], 
    (err, row) => {
      if(err) return res.status(500).json({error: err.message});
      if(!row) return res.status(404).json({error: 'owner not found'});
      res.json(row);
    });
});

app.get('/getCar/:id', (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT * FROM car WHERE car_id = ?', 
    [id], 
    (err, row) => {
      if(err) return res.status(500).json({error: err.message});
      if(!row) return res.status(404).json({error: 'car not found'});
      res.json(row);
    });
});
app.get('/getRenter/:id', (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT * FROM renter WHERE renter_id = ?', 
    [id], 
    (err, row) => {
      if(err) return res.status(500).json({error: err.message});
      if(!row) return res.status(404).json({error: 'car not found'});
      res.json(row);
    });
});


app.post('/owner', (req, res) => {
  const { name, rating ,phonenumber } = req.body;
  db.run(
    'INSERT INTO owner (name, rating ,phonenumber) VALUES (?, ?, ?)',
    [name, rating ,phonenumber],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, phonenumber });
    }
  );
});
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
app.post('/cars', (req, res) => {
  const { brand, model, description, price, fuel_type, fuel_economy, range, seats, location, images } = req.body;
  db.run(
    'INSERT INTO car (brand, model, description, price, fuel_type, fuel_economy, range, seats, location, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [brand, model, description, price, fuel_type, fuel_economy, range, seats, location, images],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, phonenumber });
    }
  );
});
app.post('/rents', (req, res) => {
  const { renter_id, car_id, start_date, end_date } = req.body;
  db.run(
    'INSERT INTO renter (renter_id, car_id, start_date, end_date VALUES (?, ?, ?, ?)',
    [renter_id, car_id, start_date, end_date],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, phonenumber });
    }
  );
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
