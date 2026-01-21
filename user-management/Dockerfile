#Build
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app
ARG JAR_FILE=target/user-management-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

#Run
ENV DATABASE_URL=jdbc:mysql://user-db:3306/user_db
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
