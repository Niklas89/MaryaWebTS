FROM node:lts

WORKDIR /home/node/front
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start"]