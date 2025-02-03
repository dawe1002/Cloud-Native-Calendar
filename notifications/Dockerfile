FROM openjdk:17-jdk-slim
WORKDIR /app
ARG JAR_FILE=target/notifications-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
COPY pom.xml .
COPY src ./src

EXPOSE 8082
ENTRYPOINT ["java", "-Dspring.devtools.restart.enabled=true", "-jar", "app.jar"]
