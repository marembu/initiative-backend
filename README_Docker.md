Instalacion de Docker en Windows 10 Home Edition
https://www.youtube.com/watch?v=UqfWTPPlmIQ

Una vez instalado

- Dockerfile
  FROM node:10-alpine
  WORKDIR /srv/app
  COPY . .
  RUN npm install
  EXPOSE 3000
  ENV NODE_ENV=production
  CMD ["node", "index.js"]

- docker build -t movies-api .
- docker run -p 3000:3000 -d movies-api

Listo
