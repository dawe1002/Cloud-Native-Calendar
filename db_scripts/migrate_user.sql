CREATE DATABASE IF NOT EXISTS user_db;

USE user_db;

CREATE TABLE IF NOT EXISTS nutzerdaten (
    benutzer_id INT PRIMARY KEY AUTO_INCREMENT,
    vorname VARCHAR(255) NOT NULL,
    nachname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwort VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    UNIQUE (email)
);

INSERT INTO nutzerdaten (vorname, nachname, email, passwort, token)
SELECT 'Max', 'Mustermann', 'maxmuster1000@stud.hs-kl.de', '', ''
WHERE NOT EXISTS (
    SELECT 1 FROM nutzerdaten WHERE email = 'maxmuster1000@stud.hs-kl.de'
);

INSERT INTO nutzerdaten (vorname, nachname, email, passwort, token)
SELECT 'John', 'Doe', 'JohnDoe1001@stud.hs-kl.de', '', ''
WHERE NOT EXISTS (
    SELECT 1 FROM nutzerdaten WHERE email = 'JohnDoe1001@stud.hs-kl.de'
);

INSERT INTO nutzerdaten (vorname, nachname, email, passwort, token)
SELECT 'Johnny', 'Doe', 'JohnnyDoe1001@gmail.com', '', ''
WHERE NOT EXISTS (
    SELECT 1 FROM nutzerdaten WHERE email = 'JohnnyDoe1001@gmail.com'
);

INSERT INTO nutzerdaten (vorname, nachname, email, passwort, token)
SELECT 'David', 'Weyer', 'weyerdavid@gmail.com', 'passwort', ''
WHERE NOT EXISTS (
    SELECT 1 FROM nutzerdaten WHERE email = 'weyerdavid@gmail.com'
);
