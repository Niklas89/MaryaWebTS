FROM node:lts

WORKDIR /home/node/front
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 8081
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
