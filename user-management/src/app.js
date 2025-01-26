const bcrypt = require('bcrypt');

// Funktion zum Verschlüsseln des Passworts
async function hashPassword(passwort) {
    const saltRounds = 10; // Anzahl der Saltrunden (je höher, desto sicherer, aber langsamer)
    return bcrypt.hash(passwort, saltRounds);
}

// Login API
app.post('/login', async (req, res) => {
    const { benutzer_id, passwort } = req.body;

    try {
        // Benutzer aus der Datenbank holen (dies ist ein Dummy-Beispiel)
        const user = await db.collection('users').findOne({ benutzer_id });

        if (!user) {
            return res.status(400).send('Benutzer nicht gefunden');
        }

        // Vergleichen des eingegebenen Passworts mit dem gespeicherten verschlüsselten Passwort
        const isMatch = await bcrypt.compare(passwort, user.passwort);

        if (isMatch) {
            // Login erfolgreich
            res.status(200).send('Login erfolgreich');
        } else {
            // Passwort stimmt nicht überein
            res.status(400).send('Falsches Passwort');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim Login');
    }
});


// Registration API
app.post('/register', async (req, res) => {
    const { vorname, nachname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Optional: Passwortverschlüsselung
    const query = `
        INSERT INTO users (vorname, nachname, email, password)
        VALUES (?, ?, ?, ?)
    `;
    try {
        await db.execute(query, [vorname, nachname, email, hashedPassword]);
        res.status(201).send('Registrierung erfolgreich');
    } catch (error) {
        console.error('Registrierungsfehler:', error);
        res.status(500).send('Registrierung fehlgeschlagen');
    }
});

