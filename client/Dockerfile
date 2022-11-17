FROM node:alpine3.11
WORKDIR /usr/medical_center_code/client
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]