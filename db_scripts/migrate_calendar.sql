CREATE DATABASE IF NOT EXISTS calendar_db;

USE calendar_db;

CREATE TABLE IF NOT EXISTS termine (
	termin_id INT PRIMARY KEY AUTO_INCREMENT,
	benutzer_id INT,
	titel VARCHAR(255) NOT NULL,
	beschreibung VARCHAR(255) NOT NULL,
	termin_datetime DATETIME NOT NULL
);

INSERT IGNORE INTO termine(benutzer_id,titel,beschreibung,termin_datetime)
VALUES
('1','Meeting 1','Teambesprechung im Saal A134','2025-01-31 14:30:00'),
('1','Meeting 2','Teambesprechung im Saal A135','2025-02-03 14:30:00'),
('2','Meeting 3','Nachbesprechung im Saal A155','2025-02-03 15:30:00'),
('3','Meeting 4','Teambesprechung im Saal A136','2025-02-06 12:30:00'),
('4','Meeting 5','Teambesprechung im Saal A137','2025-02-13 11:00:00'),
('4','Meeting 6','Teambesprechung im Saal A138','2025-02-16 14:30:00');