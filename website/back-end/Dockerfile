FROM node:18.18.2

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=1119
ENV DB_CONNECTION_STRING=mongodb+srv://vanthao000009:h5xEp5fXFWdQlqow@clusterapikey.cdjupaf.mongodb.net/website?retryWrites=true&w=majority
ENV SECRET_SS=yCyfpTpBiNi7M6a8lK4JMZHvWG1DbQWtVCQqwaMdbbYT7EdCxrMVBX8coNo548UnuwN4rsfiWgrEVtWluK6EFFKZXt40YElE
ENV BASE_URL='http://127.0.0.1:5000/api'
ENV GET_API_KEY_RP='/get-api-key'
ENV GET_QA_RP='/qa-system'
ENV AI_BOT_USERNAME='tdtu'
ENV AI_BOT_PASSWORD='123456'


EXPOSE 1119

CMD ["npm", "start"]
