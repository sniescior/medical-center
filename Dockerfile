FROM node:alpine3.11
WORKDIR /usr/medical_center_code
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server"]
