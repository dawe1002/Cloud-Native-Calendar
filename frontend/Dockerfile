
FROM node:18-alpine
WORKDIR /app
ARG JAR_FILE=target/frontend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
