_________________________________________________________________________________________________________________________________

# Cloud-Native-Calendar

REMOTE REPOSITORY: 
https://github.com/dawe1002/Cloud-Native-Calendar

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


#Dokumentation

	Orchestrierungsebene:
	Die Anwendung "Cloud-Native-Calendar" ist ein Multi-POM Projekt und dient als Orchestrierungsebene.(docker-compose.yml/pom.xml)
	
	Microservices:
	Wenn man im Hauptverzeichnis docker compose ausführt, werden die einzelnen Microservices(Unterordner) in sereraten 
	Containern gebaut und ein gemeinsames Netzwerk wird erstellt.
	
	Alle Microservices sind eigenständige Maven Projekte, 
	die mithilfe von Apache Webservern über HTTP im JSON-Format kommunizieren.
	
	Die einzelnen Projekte wurden mit dem Spring Initializr initialisiert und benutzen weitestgehend Spring Dependencies.

	Der Microservice "Frontend" kommuniziert über einen node.js-Server mit den anderen Microservices.
	

Datenbanken: 
	-Calendar Service: ->	calendar_db
	MySql-Datenbank mit Termindaten des Kalenders
	
	-User Management:	->	user_db
	MySql-Datenbank mit sensiblen Nutzerdaten

	-adminer:
	Zum debuggen und gegenprüfen der Datenbanken, läuft auf Port : http://localhost:8084

#Setup-Anleitung: 

Schritte zum lokalen Start:

	Öffne ein Terminal im Hauptverzeichnis des Projekts 
	(Ich benutze GitBash)

	Erster Start(oder nach Änderungen in der docker-compose.yml):

	mvn clean package
	docker-compose up -d

	Nachfolgende Starts:
	
	docker-compose start

	Server herunterfahren und Docker Containers, Volumes und Images zurücksetzen: 
	
	docker-compose down --volumes --rmi all

	DAS PROJEKT UND ALLE MICROSERVICES WURDEN MIT DEN FOLGENDEN PORTS GEBAUT:
	frontend				->	https://localhost:3000
	calendar-service			->	https://calendar-service:8082
	calendar_db				->	https://calendar_db:3306
	user-management				->	https://user-management:8081
	user_db					->	https://user_db_:3306
	notifications(rabbitmq)			->	https://notifications:8083
	adminer(debug/dev)			->	https://localhost:8084

	DIE BENUTZEROBERFLÄCHE LÄUFT AUF DEM PORT: 
	https://localhost:3000
	Anmeldedaten-Frontend(Beispiel):
	E-Mail: "weyerdavid@gmail.com" Passwort: "password"

	adminer zum testen der DB:
	http://localhost:8084
	
	Anmeldedaten (user_db):
		Server: user-db
		Username user
		Password: rootpassword
		Database: user_db
	
	Anmeldedaten (calendar_db):
		Server: calendar-db
		Username user
		Password: rootpassword
		Database: calendar_db


	VIEL SPAß!

	OPTIONAL (Projekt mit Hot Reload bauen):
		mvn spring-boot:run -pl calendar-service
		mvn spring-boot:run -pl user-management
		mvn spring-boot:run -pl notifications
		mvn spring-boot:run -pl frontend