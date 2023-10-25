FROM mcr.microsoft.com/playwright:v1.39.0-jammy

ENV TZ="Asia/Tbilisi"
RUN date

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

ENTRYPOINT ["npm", "start"]