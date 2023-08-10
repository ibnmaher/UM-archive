FROM node:alpine3.11
RUN mkdir -p /app
WORKDIR /app
COPY  UM-ARCHIVE/package*.json ./
RUN npm install
COPY UM-ARCHIVE/ .
RUN npm run build
EXPOSE $PORT
ENV REACT_APP_URL http://144.86.228.218:9888/api/
CMD ["npm", "start"]