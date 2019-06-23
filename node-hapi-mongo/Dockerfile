FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
    && apt update \
    && apt install -y vim nmap

# RUN echo "nameserver 8.8.8.8">/etc/resolv.conf

COPY . .

EXPOSE 3000

CMD ["npm", "start"]