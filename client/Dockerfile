FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./

RUN npm install
ENV VITE_API_URI=http://a3c83ed3f2ab943bbb0be8267211fdcf-906781797.eu-central-1.elb.amazonaws.com/erp/api
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

