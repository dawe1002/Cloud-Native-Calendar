#Build
FROM openjdk:17-jdk-slim AS build
WORKDIR /app
ARG JAR_FILE=target/user-management-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
COPY pom.xml .
COPY src ./src

#Run
ENV DATABASE_URL=jdbc:mysql://user-db:3306/user_db
EXPOSE 8081
ENTRYPOINT ["java", "-Dspring.devtools.restart.enabled=true", "-jar", "app.jar"]
