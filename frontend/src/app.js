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
    const { email, passwort } = req.body;

    try {
        const response = await axios.post('http://user-management:8080/api/users/login', {
            email: email,
            password: passwort,  // Falls dein Service `password` erwartet, stelle sicher, dass du das richtige Format sendest.
        }, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Prüfen, ob die Antwort vom Login-Service erfolgreich ist
        if (response.status === 200) {  
			console.log(response.data);
            res.status(200).json({ 
                message: 'Login erfolgreich!', 
                data: response.data, 
            });
        } else {
            console.log('Login-Service Antwort:', response.data); // TODO Debug entfernen
            res.status(response.status).json({ 
                message: response.data.message || 'Fehlerhafte Antwort vom Login-Service.' 
            });
        }
    } catch (error) {
        console.error('Fehler vom Login-Service:', error.message);      
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
    try {
        const { titel, beschreibung, termin_datetime } = req.body;
		
        await axios.post('http://calendar-service:8080/api/calendar/add', { titel, beschreibung, termin_datetime });
        res.status(200).send('Aktion erfolgreich');
    } catch (error) {
        res.status(400).send('Aktion fehlgeschlagen');
    }
});

// Delete Termine API
app.post('/delete', async (req, res) => {
    try {
        const termin_id = parseInt(req.body.termin_id, 10);
        if (isNaN(termin_id)) {
            return res.status(400).json({ error: "Ungültige Termin-ID!" });
        }

        const response = await axios.post(
            'http://calendar-service:8080/api/calendar/delete',
            { termin_id },
            { headers: { "Content-Type": "application/json" } }
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
