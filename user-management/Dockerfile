FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY target/user-service.jar /app/user-service.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "user-service.jar"]
