# create a file named Dockerfile
FROM node:argon
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
RUN pwd
RUN ls -al
CMD ["npm", "start"]
