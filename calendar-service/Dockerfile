FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/calendar-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
CMD ["sh", "-c", "java -jar /app/calendar-service-0.0.1-SNAPSHOT.jar"]
