FROM node:alpine as build

# Stage - Build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache verify
COPY . ./
RUN npm install && npm run build

# Stage - Deploy
EXPOSE 80
CMD npm run start
