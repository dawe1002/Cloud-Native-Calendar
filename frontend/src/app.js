const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, '../public')));

// Beispiel-API-Route
app.get('/api/calendar', (req, res) => {
  res.json({ message: 'Kalenderdaten erfolgreich geladen!' });
});

// Start des Servers
app.listen(PORT, () => {
  console.log(`Server läuft unter http://localhost:${PORT}`);
});
