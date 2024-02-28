FROM node:18.18.2

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 4001

CMD ["npm", "start"]
