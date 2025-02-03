#Build
FROM openjdk:17-jdk-slim AS build
WORKDIR /app
ARG JAR_FILE=target/calendar-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
COPY pom.xml .
COPY src ./src

#Run
ENV DATABASE_URL=jdbc:mysql://calendar-db:3306/calendar_db
EXPOSE 8082
ENTRYPOINT ["java", "-Dspring.devtools.restart.enabled=true", "-jar", "app.jar"]
CMD ["sh", "-c", "java -jar /app/calendar-service-0.0.1-SNAPSHOT.jar"]
