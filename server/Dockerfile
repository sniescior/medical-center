FROM node:alpine3.11
WORKDIR /usr/medical_center_code
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start:dev"]
