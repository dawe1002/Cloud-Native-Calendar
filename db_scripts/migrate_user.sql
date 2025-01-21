CREATE DATABASE IF NOT EXISTS user_db;

USE user_db;

CREATE TABLE IF NOT EXISTS nutzerdaten (
    benutzer_id INT PRIMARY KEY AUTO_INCREMENT,
    vorname VARCHAR(255) NOT NULL,
    nachname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);

INSERT IGNORE INTO nutzerdaten(vorname, nachname, email, password_salt, password_hash, token)
VALUES
('Max', 'Mustermann', 'maxmuster1000@stud.hs-kl.de', '', '', ''),
('John', 'Doe', 'JohnDoe1001@stud.hs-kl.de', '', '', ''),
('Johnny', 'Doe', 'JohnnyDoe1001@gmail.com', '', '', '');
