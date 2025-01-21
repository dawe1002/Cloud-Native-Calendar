_________________________________________________________________________________________________________________________________

# Cloud-Native-Calendar
Es handelt sich um einen "Cloud Native Kalender mit Benachrichtigungen".
Die Anwendung gibt Benutzern die Möglichkeit Termine in einen Kalender einzutragen.
Außerdem erhalten User bei Änderungen am Terminplan und beim Erreichen von Deadlines eine Benachrichtigung.

Die Anwendung soll aus mehreren Microservices bestehen, die unabhängig voneinander funktionieren.
Wie in der Vorlesung besprochen benutze ich Spring Boot und Docker, um das Projekt zu bauen.
Ich verwende GitHub zur Versionsverwaltung und nutze GitHub Actions um Builds und Tests zu automatisieren.

2-3 Features:

1.	CRUD-Operationen für Kalenderereignisse:
		-Containerisierte MySQL-Datenbank
		-Frontend API Calls für Create,Read,Update,Delete

2.	Benutzerverwaltung:
		-(seperate) containerisierte MySQL-Datenbank zum Speichern von Benutzerdaten
		-Login-/Registrierungsdialog
		-sichere Passwortverwaltung (Hash und Salt)

3.	Benachrichtigung bei Fristen und Statusänderungen:
		-RabbitMQ als Message Broker für asynchrone PopUp-Benachrichtigungen im Frontend
		-Websockets(TCP) als Schnittstelle (never expose RabbitMQ to the front-end)	


weitere optionale Features:
	-zusätzlich Emails zur Erinnerung an Benutzer senden
	-Kalender mit Google Calender oder Outlook synchronisieren
	-STATT RabbitMQ optional Push API für Popup-Nachrichten (allerdings keine Emails möglich)
	
Technologien:	
	Java, Spring Boot (Backend), Docker, RabbitMQ (Open Source Message Broker), WebSockets(TCP-Protokoll), Git (Versionsverwaltung)
 
_________________________________________________________________________________________________________________________________


#TODO
Dokumentation

    README.md Struktur:
        Features: Liste der Microservices und ihre Funktionalitäten.
        Setup-Anleitung: Schritte zum lokalen Start.
        Screenshots: UI und API-Responses.