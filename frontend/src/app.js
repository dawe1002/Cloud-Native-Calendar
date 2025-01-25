const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'main/webapp')));

// View Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main/webapp/index.html'));
});

// Login API
app.post('/login', async (req, res) => {
    const { benutzer_id, passwort } = req.body;
    try {
        const response = await axios.post('http://user-management:8081/login', {
            benutzer_id,
            passwort,
        });
        res.status(200).send(response.data);
    } catch (error) {
        res.status(400).send('Login fehlgeschlagen');
    }
});

// Registrierung API
app.post('/register', async (req, res) => {
    const {vorname, nachname, passwort, email} = req.body;
    try {
        const response = await axios.post('http://user-management:8081/register', {
            vorname,
			nachname,
            passwort,
            email
        });
        // Erfolgreiche Registrierung
        res.status(201).send(response.data);
    } catch (error) {
        // Fehlerbehandlung
        console.error(error);
        res.status(400).send('Registrierung fehlgeschlagen');
    }
});


// Add/Delete Termine API
app.post('/termine', async (req, res) => {
    try {
        const { action, titel, beschreibung, termin_datetime } = req.body;
        const endpoint =
            action === 'add'
                ? 'http://calendar-db:8082/termine/add'
                : 'http://calendar-db:8082/termine/delete';
        await axios.post(endpoint, { titel, beschreibung, termin_datetime });
        res.status(200).send('Aktion erfolgreich');
    } catch (error) {
        res.status(400).send('Aktion fehlgeschlagen');
    }
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
