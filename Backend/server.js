import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';


const app = express();


app.use(express.json());
app.use(cors());
app.use(express.static('assets'));

const db = new sqlite3.Database('carapp.db');

db.serialize(() => {

  //Nulstiller tabellerne hver gang serveren startes.
  db.run(`DROP TABLE IF EXISTS rents`);
  db.run(`DROP TABLE IF EXISTS car`);
  db.run(`DROP TABLE IF EXISTS user`);

  db.run('PRAGMA foreign_keys = ON');

  // Laver de forskellige tabeller
  db.run(`CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
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
    image TEXT NOT NULL,
    owner_id INTEGER,
    FOREIGN KEY(owner_id) REFERENCES user(user_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS rents (
   rent_id INTEGER PRIMARY KEY AUTOINCREMENT,
   renter_id INTEGER,
   car_id INTEGER,
   start_date INTEGER NOT NULL,
   end_date INTEGER NOT NULL,
   FOREIGN KEY (renter_id) REFERENCES user(user_id),
   FOREIGN KEY (car_id) REFERENCES car(car_id)

  )`);

 // Indsætter dummy data ind til alle tabellerne
  db.run(`INSERT INTO user (username, email, name, phonenumber, password, is_owner, rating) VALUES
  ('alicej', 'alice@example.com', 'Alice Johnson', '+14155550111', 'pass123', 1, 4.9),
  ('bobm', 'bob@example.com', 'Bob Martinez', '+14155550222', 'pass456', 0, 4.2),
  ('charlies', 'charlie@example.com', 'Charlie Smith', '+14155550333', 'pass789', 0, 3.8),
  ('dianap', 'diana@example.com', 'Diana Prince', '+14155550444', 'pass321', 1, 4.7),
  ('ethanh', 'ethan@example.com', 'Ethan Hunt', '+14155550555', 'pass654', 0, 4.5)
`);


  db.run(`INSERT INTO car (brand, model, description, price, fuel_type, range, seats, location, image, owner_id) VALUES
    ('Tesla', 'Model 3', 'A sleek electric car with autopilot features.', 450, 'Electric', 350, 5, 'San Francisco, CA', 'Tesla_Model_3.png', 1),
    ('Toyota', 'Camry', 'Reliable and fuel-efficient sedan.', 240, 'Gasoline', 600, 5, 'Oakland, CA', 'Toyota_Camry.png', 4),
    ('BMW', 'X5', 'Luxury SUV with spacious interior.', 600, 'Hybrid', 650, 5, 'Palo Alto, CA', 'Bmv_X5.png', 1),
    ('Honda', 'Civic', 'Compact and efficient car.', 220, 'Gasoline', 500, 5, 'Berkeley, CA', 'Honda_Civic.png', 4),
    ('Ford', 'Mustang', 'Sporty car with great performance.', 550, 'Gasoline', 400, 4, 'San Jose, CA', 'Ford_Mustang.png', 1)
`);


  db.run(`INSERT INTO rents (renter_id, car_id, start_date, end_date) VALUES
    (2, 1, '20251001', '20251005'),
    (3, 2, '20251003', '20251007'),
    (5, 3, '20251010', '20251015'),
    (2, 4, '20251012', '20251014'),
    (3, 5, '20251020', '20251025')
`);

});
app.get('/getAllUsers', (req, res) => {
  db.all('SELECT * FROM user', [], (err, rows) => {
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

app.get('/getUser/:id', (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT * FROM user WHERE user_id = ?', 
    [id], 
    (err, row) => {
      if(err) return res.status(500).json({error: err.message});
      if(!row) return res.status(404).json({error: 'owner not found'});
      res.json(row);
    });
});

// Server
app.get('/getCar/:id', (req, res) => {
  const id = Number(req.params.id);

  db.get('SELECT * FROM car WHERE car_id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'car not found' });

    // Hvis images er gemt som JSON-string i DB:
    try {
      if (typeof row.images === 'string') {
        row.images = JSON.parse(row.images); // forventer f.eks. '["https://.../img.jpg"]'
      }
    } catch (e) {
      // fallback: gør det til et array
      row.images = row.images ? [row.images] : [];
    }

    res.json(row); // <- et enkelt Car-objekt
  });
});

app.get('/getRenter/:id', (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT * FROM user WHERE user_id = ?', 
    [id], 
    (err, row) => {
      if(err) return res.status(500).json({error: err.message});
      if(!row) return res.status(404).json({error: 'car not found'});
      res.json(row);
    });
});

app.get('/getRentsByCar/:id', (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT * FROM rents WHERE car_id = ?',
    [id],
    (err, rows) => {
      if(err) return res.status(500).json({error: err.message});
      if(!row) return res.status(404).json({error: 'rents not found'});
      res.json(rows);
    });
});
app.get('/getRentsByOwner/:id', (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT rents.* FROM rents JOIN car on rents.car_id = car.car_id WHERE owner_id = ?',
    [id],
    (err, rows) => {
      if(err) return res.status(500).json({error: err.message});
      if(!row) return res.status(404).json({error: 'rents not found'});
      res.json(rows);
    });
});
app.get('/getRentsByRenter/:id', (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT * FROM rents WHERE renter_id = ?',
    [id],
    (err, rows) => {
      if(err) return res.status(500).json({error: err.message});
      if(!row) return res.status(404).json({error: 'rents not found'});
      res.json(rows);
    });
});

app.get('/filterCars', (req, res) => {
  const { brand, model, minPrice, maxPrice, fuel_type, seats, location, owner_id} = req.query;

  let sql = 'SELECT * FROM car';
  let categories = [];
  let values = [];

  if(brand) {
    categories.push("LOWER(brand) = ?");
    values.push(brand.toLowerCase());
  }
  

  if(model) {
    categories.push("LOWER(model) = ?");
    values.push(model.toLowerCase());
  }

  if(minPrice) {
    categories.push("price >= ?");
    values.push(minPrice);
  }

  if(maxPrice) {
    categories.push("price <= ?");
    values.push(maxPrice);
  }

  if(fuel_type) {
    categories.push("LOWER(fuel_type) = ?");
    values.push(fuel_type.toLowerCase());
  }

  if(seats) {
    categories.push("seats = ?");
    values.push(seats);
  }

  if(location) {
    categories.push("LOWER(location) = ?");
    values.push(location.toLowerCase());
  }

  if(owner_id) {
    categories.push("owner_id = ?");
    values.push(owner_id);
  }

  if(categories.length > 0) {
    sql += " WHERE " + categories.join(" AND ");
  }

  db.all(sql, values, (err, rows) => {
    if(err) return res.status(500).json({error: err.message });
    if(!rows) return res.status(404).json({error: "Cars not found"});
    res.json(rows);
  })
});


//Checker Login og returnerer user ved success
app.post('/login', (req, res) => {
  const { identifier , password} = req.body;

  db.get('SELECT * FROM user WHERE email = ? OR username = ?', [identifier, identifier], async (err, user) => {
    if(err) return res.status(500).json({error: err.message});
    if(!user) return res.status(401).json({error: "User not found"});

    const succeeded = await bcrypt.compare(password, user.password);
    if(!succeeded) return res.status(401).json({error: "Incorrect password"});

    res.json({user});
  });
});

//endpoints for at indsætte data i tabeller
app.post('/insertUser', async (req, res) => {
  try {
    const { username, email, name, phonenumber, password, is_owner, rating } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    db.run(
      'INSERT INTO user (username, email, name, phonenumber, password, is_owner, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, email, name, phonenumber, hashedPassword, is_owner, rating],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const user_id = this.lastID;
        db.get('SELECT * FROM user WHERE user_id = ?', [user_id], (err2, row) => {
          if (err2) return res.status(500).json({ error: err2.message });
          if (!row) return res.status(404).json({ error: 'user not found' });
          return res.json(row);
        });
      }
    );
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});


app.post('/insertCar', (req, res) => {
  const { brand, model, description, price, fuel_type, range, seats, location, image, owner_id } = req.body;

  db.run(
    'INSERT INTO car (brand, model, description, price, fuel_type, range, seats, location, image, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [brand, model, description, price, fuel_type, range, seats, location, image, owner_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ car_id: this.lastID });
    }
  );
});


app.post('/insertRents', (req, res) => {
  const { renter_id, car_id, start_date, end_date} = req.body;

  db.get('SELECT * FROM rents WHERE car_id = ? AND start_date <= ? AND end_date >= ?', [car_id, start_date, end_date], (err, row) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    if(row) {
      return res.status(400).json({error: err.message});
    }
  });

  db.run('INSERT INTO rents (renter_id, car_id, start_date, end_date) VALUES (?, ?, ?, ?)', [renter_id, car_id, start_date, end_date],
    function(err) {
      if(err) {
        return res.status(500).json({error: err.message});
      }
      res.json({rents_id: this.lastID});
    }
  );
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
