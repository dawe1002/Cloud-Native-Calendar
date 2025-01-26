FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /workspace
COPY . .
RUN mvn clean package -DskipTests
FROM openjdk:17-jdk-slim
WORKDIR /app

# Kopiere die JARs der Module in das Image
COPY --from=builder /workspace/calendar-service/target/calendar-service-0.0.1-SNAPSHOT.jar /app/calendar-service.jar
COPY --from=builder /workspace/user-management/target/user-management-0.0.1-SNAPSHOT.jar /app/user-management.jar
COPY --from=builder /workspace/notifications/target/notifications-0.0.1-SNAPSHOT.jar /app/notifications.jar
COPY --from=builder /workspace/frontend/dist /app/frontend.jar

# Standardbefehl zum Testen
CMD ["sh", "-c", "echo 'Tests können jetzt ausgeführt werden'"]
