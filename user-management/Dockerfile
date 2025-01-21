FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/user-management-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app.jar"]