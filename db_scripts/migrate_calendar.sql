CREATE DATABASE IF NOT EXISTS calendar_db;

USE calendar_db;

CREATE TABLE IF NOT EXISTS termine (
	termin_id INT PRIMARY KEY AUTO_INCREMENT,
	benutzer_id INT,
	titel VARCHAR(255) NOT NULL,
	beschreibung VARCHAR(255) NOT NULL,
	termin_datetime DATETIME NOT NULL,
    is_notified BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO termine (benutzer_id, titel, beschreibung, termin_datetime, is_notified)
SELECT 1, 'Meeting 1', 'Teambesprechung im Saal A134', '2026-01-31 14:30:00', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM termine 
    WHERE benutzer_id = 1 
    AND titel = 'Meeting 1' 
    AND termin_datetime = '2026-01-31 14:30:00'
);

INSERT INTO termine (benutzer_id, titel, beschreibung, termin_datetime, is_notified)
SELECT 1, 'Meeting 2', 'Teambesprechung im Saal A135', '2026-02-03 14:30:00', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM termine 
    WHERE benutzer_id = 1 
    AND titel = 'Meeting 2' 
    AND termin_datetime = '2026-02-03 14:30:00'
);

INSERT INTO termine (benutzer_id, titel, beschreibung, termin_datetime, is_notified)
SELECT 2, 'Meeting 3', 'Nachbesprechung im Saal A155', '2026-02-03 15:30:00', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM termine 
    WHERE benutzer_id = 2 
    AND titel = 'Meeting 3' 
    AND termin_datetime = '2026-02-03 15:30:00'
);

INSERT INTO termine (benutzer_id, titel, beschreibung, termin_datetime, is_notified)
SELECT 3, 'Meeting 4', 'Teambesprechung im Saal A136', '2026-02-06 12:30:00', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM termine 
    WHERE benutzer_id = 3 
    AND titel = 'Meeting 4' 
    AND termin_datetime = '2026-02-06 12:30:00'
);

INSERT INTO termine (benutzer_id, titel, beschreibung, termin_datetime, is_notified)
SELECT 4, 'Meeting 5', 'Teambesprechung im Saal A137', '2026-02-13 11:00:00', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM termine 
    WHERE benutzer_id = 4 
    AND titel = 'Meeting 5' 
    AND termin_datetime = '2026-02-13 11:00:00'
);

INSERT INTO termine (benutzer_id, titel, beschreibung, termin_datetime, is_notified)
SELECT 4, 'Meeting 6', 'Teambesprechung im Saal A138', '2026-02-16 14:30:00', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM termine 
    WHERE benutzer_id = 4 
    AND titel = 'Meeting 6' 
    AND termin_datetime = '2026-02-16 14:30:00'
);

