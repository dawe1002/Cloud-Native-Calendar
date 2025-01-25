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


//Erstellen eines neuen Benutzers
app.post('/register', async (req, res) => {
    const { benutzer_id, passwort, email, vorname, nachname } = req.body;
    
    try {
        if (!benutzer_id || !passwort || !email || !vorname || !nachname) {
            return res.status(400).send('Alle Felder sind erforderlich.');
        }

        const hashedPasswort = await hashPassword(passwort);

        const newUser = {
            benutzer_id,
            passwort: hashedPasswort, // Speichern des verschlüsselten Passworts
            email,
            vorname,
            nachname,
        };

        const result = await db.collection('users').insertOne(newUser);

        res.status(201).send({ message: 'Benutzer erfolgreich registriert' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Fehler bei der Registrierung');
    }
});
