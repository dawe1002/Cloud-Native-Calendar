#Build
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app
ARG JAR_FILE=target/calendar-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

#Run
ENV DATABASE_URL=jdbc:mysql://calendar-db:3306/calendar_db
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
