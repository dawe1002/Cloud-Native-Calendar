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
        if (error.response) {
            console.log('Fehler-Antwort:', error.response.data);
            res.status(error.response.status || 400).json({
                message: error.response.data.message || 'Login fehlgeschlagen!',
            });
        } else {
            console.error('Fehlerdetails:', error);
            res.status(500).json({ message: 'Interner Fehler: Login-Service nicht erreichbar!' });
        }
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


// Add/Delete Termine API
app.post('/termine', async (req, res) => {
    try {
        const { action, titel, beschreibung, termin_datetime } = req.body;
        const endpoint =
            action === 'add'
                ? 'http://calendar-service:8080/termine/add'
                : 'http://calendar-service:8080/termine/delete';
        await axios.post(endpoint, { titel, beschreibung, termin_datetime });
        res.status(200).send('Aktion erfolgreich');
    } catch (error) {
        res.status(400).send('Aktion fehlgeschlagen');
    }
});

// Server Start
const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf `+ PORT));
