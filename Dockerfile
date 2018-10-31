# Build frontend 
FROM node:10.12 AS builder

RUN apt-get update ; apt-get install -y unzip

WORKDIR /services

RUN wget --quiet https://github.com/McFizh/rekrypeli_front/archive/master.zip ;\
    unzip master.zip ;\
    cd rekrypeli_front-master; mv * .. ; mv .[a-z]* .. ; cd .. ; rmdir rekrypeli_front-master

RUN npm ci
RUN npm run build

# Create container for running frontend
FROM nginx:1.14
EXPOSE 80

COPY --from=builder /services/dist /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]
