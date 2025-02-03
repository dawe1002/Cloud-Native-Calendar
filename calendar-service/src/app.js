const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'main/webapp')));

// MySQL-Verbindung
const db = mysql.createConnection({
    host: 'calendar-db',
    user: 'root',
    password: 'rootpassword',
    database: 'calendar_db',
});
db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur MySQL-Datenbank:', err.stack);
        return;
    }
    console.log('Verbunden mit der MySQL-Datenbank');
});

// Endpunkt zum Hinzufügen eines Termins
app.post('/termine/add', (req, res) => {
    const { titel, beschreibung, termin_datetime } = req.body;

    if (!titel || !beschreibung || !termin_datetime) {
        return res.status(400).send('Titel, Beschreibung und Datum sind erforderlich.');
    }
    const query = 'INSERT INTO termine (titel, beschreibung, termin_datetime) VALUES (?, ?, ?)';
    db.query(query, [titel, beschreibung, termin_datetime], (err, result) => {
        if (err) {
            console.error('Fehler beim Hinzufügen des Termins:', err);
            return res.status(500).send('Fehler beim Hinzufügen des Termins');
        }
        res.status(200).send('Termin hinzugefügt');
    });
});

// Endpunkt zum Löschen eines Termins
app.post('/termine/delete', (req, res) => {
    const { titel, beschreibung, termin_datetime } = req.body;

	if (!termin_datetime) {
		return res.status(400).send('Datum ist erforderlich.');
	}

    const query = 'DELETE FROM termine WHERE termin_datetime = ?';
    db.query(query, [termin_datetime], (err, result) => {
        if (err) {
            console.error('Fehler beim Löschen des Termins:', err);
            return res.status(500).send('Fehler beim Löschen des Termins');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Termin nicht gefunden');
        }
        res.status(200).send('Termin gelöscht');
    });
});

// Server starten
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Calendar Service läuft auf `+ PORT);
});
