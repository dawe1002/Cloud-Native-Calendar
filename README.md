____________________________________________________________________________________________________________________________

# Cloud-Native-Calendar

REMOTE REPOSITORY: 
https://github.com/dawe1002/Cloud-Native-Calendar

BEISPIEL-BILDER:
siehe ./Cloud-Native-Calendar/Beispiel-Bilder

Es handelt sich um einen "Cloud Native Kalender mit Asynchronen Benachrichtigungen über RabbitMQ".
Die Anwendung gibt Benutzern die Möglichkeit Termine in einen Kalender einzutragen.
Außerdem erhalten User bei Änderungen am Terminplan eine Benachrichtigung.

Die Anwendung besteht aus mehreren Microservices, die unabhängig voneinander funktionieren.
Wie in der Vorlesung besprochen benutze ich Spring Boot und Docker, um das Projekt zu bauen.
Ich verwende GitHub zur Versionsverwaltung und nutze GitHub Actions um Builds und Tests zu automatisieren.

2-3 Features:

1.	CRUD-Operationen für Kalenderereignisse:
		-Containerisierte MySQL-Datenbank
		-Frontend API Calls für Create,Read,Update,Delete

2.	Benutzerverwaltung:
		-(seperate) containerisierte MySQL-Datenbank zum Speichern von Benutzerdaten
		-Login-/Registrierungsdialog
		-sichere Passwortverwaltung
		-JTW-Tokensbasierter Login/Logout Vorgang

3.	Benachrichtigung bei neuen Terminen:
		-Websockets(TCP) als Schnittstelle (never expose RabbitMQ to the front-end)	
		-RabbitMQ als Message Broker für asynchrone PopUp-Benachrichtigungen im Frontend:
			Ablauf:
			Im Frontend wird ein neuer Termin erstellt und an den calendar-service weitergeleitet (->Entry Point)/
			Der calendar-service hat diesen Termin in der calendar-db gespeichert und dazu ein Termin-Event erstellt (->Producer/Publisher) /
			Das Termin-Event wird an die RabbitMQ-Message-Queue weitergeleitet (->Message Broker) /
			Der notification-service konsumiert das Termin-Event aus der Message-Queue (->Consumer) /
			Der notification-service leitet diese Popup-Nachricht an das Frontend (->WebSocket)


zukünftige optionale Features:
	-zusätzlich Emails zur Erinnerung an Benutzer senden
	-Kalender mit Google Calender oder Outlook synchronisieren
	-STATT RabbitMQ optional Push API für Popup-Nachrichten (allerdings keine Emails möglich)
	
Technologien:	
	Java, Spring Boot (Backend), Docker, RabbitMQ (Open Source Message Broker), WebSockets(TCP-Protokoll), Git (Versionsverwaltung)
 
____________________________________________________________________________________________________________________________


#Dokumentation

	Orchestrierungsebene:
	Die Anwendung "Cloud-Native-Calendar" ist ein Multi-POM Projekt und dient als Orchestrierungsebene.
		->./Cloud-Native-Calendar/docker-compose.yml
		->./Cloud-Native-Calendar/pom.xml
	Beim Bauen des Projekts werden 2 Datenbanken migriert (user-db/calendar-db) und mit Beispiel Benutzern/Terminen gefüllt:
		->db_scripts/migrate_calendar.sql
		->db_scripts/migrate_user.sql
	
	Microservices:
		Wenn man im Hauptverzeichnis docker compose ausführt, werden die einzelnen Microservices(Unterordner mit Dockerfiles) 
		in sereraten Containern gebaut und ein gemeinsames Netzwerk wird erstellt.
	
		Alle Microservices sind eigenständige Maven Projekte, 
		die mithilfe von Apache Webservern über HTTP-Requests im JSON-Format oder über Websockets kommunizieren.
		
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

	-Öffne ein Terminal im Hauptverzeichnis des Projekts (./Cloud-Native-Calendar)
	(Ich benutze ein GitBash Terminal in der Visual Studio Code IDE)
	
	-Java Version 21 muss installiert sein
	-Das Terminal muss das Installationsverzeichnis von Java kennen: 
	(JAVA_HOME-Umgebungsvariable zeigt auf das Installationsverzeichnis von Java)
		Ausgabe von "java -version"	-> 21.0.9
		Ausgabe von "mvn -v"		-> 21.0.9
	-Falls das nicht der Fall ist muss man die JAVA_HOME-Umgebungsvariable manuell setzen mit:
		export JAVA_HOME="/c/Program Files/Java/jdk-21"
		export PATH="$JAVA_HOME/bin:$PATH"
	(In meinem Fall ist das Installationsverzeichnis "c/Program Files/Java/jdk-21")


	Erster Start(oder nach Änderungen in der docker-compose.yml):

		mvn clean package
		docker-compose up --build

	Nachfolgende Starts:
	
		docker-compose start

	Server herunterfahren und Docker Containers, Volumes und Images zurücksetzen: 
	
		docker-compose down --volumes --rmi all

	DAS PROJEKT UND ALLE MICROSERVICES WURDEN MIT DEN FOLGENDEN PORTS GEBAUT:
		frontend					->	https://localhost:3000
		calendar-service			->	https://calendar-service:8082
		calendar_db					->	https://calendar_db:3306
		user-management				->	https://user-management:8081
		user_db						->	https://user_db_:3306
		notifications				->	https://notifications:8083
		adminer(debug/dev)			->	https://localhost:8084
		rabbitMQ(debug/dev)			->	http://localhost:15672

	DIE BENUTZEROBERFLÄCHE LÄUFT AUF DEM PORT: 
		HTML-Frontend				->	https://localhost:3000
	Anmeldedaten-Frontend(Beispiel):
		E-Mail: "weyerdavid@gmail.com" Passwort: "password"

	adminer zum testen der DB: http://localhost:8084
	
		Anmeldedaten (user_db):
			Server: user-db
			Username: user
			Password: rootpassword
			Database: user_db
		
		Anmeldedaten (calendar_db):
			Server: calendar-db
			Username: user
			Password: rootpassword
			Database: calendar_db

	rabbitMQ zum testen der Message-Queue (Message Broker):

		Anmeldedaten (calendar_db):
			Username: guest
			Password: guest

	VIEL SPAß!

	OPTIONAL (Projekt mit Hot Reload bauen):
		mvn spring-boot:run -pl calendar-service
		mvn spring-boot:run -pl user-management
		mvn spring-boot:run -pl notifications
		mvn spring-boot:run -pl frontend