const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
let jwtToken = null;
const axiosInstance = axios.create({
    timeout: 5000 // 5 Sekunden warten auf calendar-service
});


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
    const { email, passwort } = req.body;

    try {
        const response = await axios.post(
            'http://user-management:8080/api/users/login',
            {
                email,
                password: passwort
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        // Token an Browser zurückgeben
        res.status(200).json({
            token: response.data.token
        });

    } catch (error) {
        res.status(401).json({ message: 'Login fehlgeschlagen' });
    }
});

app.post('/logout', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Nicht eingeloggt');
    }

    try {
        await axios.post(
            'http://user-management:8080/api/users/logout',
            {},
            {
                headers: {
                    Authorization: authHeader
                }
            }
        );

        res.status(200).send('Logout erfolgreich');
    } catch (err) {
        console.error('Logout-Fehler:', err.message);
        res.status(500).send('Logout fehlgeschlagen');
    }
});


// Registrierung API
app.post('/register', async (req, res) => {
    const { vorname, nachname, email, password } = req.body;
	
	try {
	    const response = await axios.post('http://user-management:8080/api/users/register', {
	        vorname,
	        nachname,
	        email,
	        password
	    }, {
	        headers: {
	            'Content-Type': 'application/json',
	        },
	    });
        // Erfolgreiche Registrierung
        res.status(201).send(response.data);
    } catch (error) {
		if (error.response.status === 409) {
			res.status(409).send('Nutzername bereits vergeben.');
		} else {
			// Fehlerbehandlung
			console.error(error);
			res.status(500).send('Registrierung fehlgeschlagen');
		}
    }
});

// Add Termine API
app.post('/add', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Nicht eingeloggt');
    }

    try {
        await axiosInstance.post(
            'http://calendar-service:8080/api/calendar/add',
            req.body,
            {
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).send('Termin erfolgreich angelegt');
    } catch (err) {
        console.error('Calendar-Service Fehler:', err.response?.data || err.message);
        res.status(err.response?.status || 500)
           .send(err.response?.data || 'Fehler beim Anlegen des Termins');
    }
});





// Delete Termine API
app.post('/delete', async (req, res) => {
    try {
        const termin_id = parseInt(req.body.termin_id, 10);
        if (isNaN(termin_id)) {
            return res.status(400).json({ error: "Ungültige Termin-ID!" });
        }

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send('Nicht eingeloggt');
        }

        const response = await axios.post(
            'http://calendar-service:8080/api/calendar/delete',
            { termin_id },
            {
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            return res.status(200).json({ message: "Termin erfolgreich gelöscht!" });
        } 
        
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                return res.status(404).json({ error: "Termin nicht gefunden!" });
            } else if (error.response.status === 400) {
                return res.status(400).json({ error: "Ungültige Termin-ID!" });
            }
        }
        console.error("Fehler beim Löschen:", error);
        res.status(500).json({ error: "Interner Serverfehler" });
    }
});


// Show All Termine API
app.post('/all', async (req, res) => {
    try {
        const response = await axios.get('http://calendar-service:8080/api/calendar/all');
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Fehler beim Abrufen der Termine:", error.message);
        res.status(500).json({ error: "Aktion fehlgeschlagen", details: error.message });
    }
});


// Server Start
const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf `+ PORT));
