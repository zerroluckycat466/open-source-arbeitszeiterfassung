const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/arbeitszeiterfassung', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB verbunden');
  } catch (err) {
    console.error('MongoDB-Verbindungsfehler:', err);
  }
};

connectToDatabase();

// Middleware zur Fehlerbehandlung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Etwas ist schief gelaufen!');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});