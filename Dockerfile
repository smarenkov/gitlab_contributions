FROM node:20-alpine
WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
USER node
EXPOSE 3010

CMD ["npm", "run", "start:dev"]