# compile & build frontend
FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /usr/src/nginx-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production
FROM nginx:1.17

COPY --from=build-stage /usr/src/nginx-app/build /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
