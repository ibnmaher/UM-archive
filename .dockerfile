FROM ubuntu:22.04
RUN DEBIAN_FRONTEND=noninteractive \
  apt-get update \
  && apt-get install -y python3
RUN apt-get install -y curl
RUN mkdir -p /app
WORKDIR /app
RUN curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN apt-get install -y curl gnupg2 ca-certificates lsb-release ubuntu-keyring
RUN curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
    | tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
RUN gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
  | tee /etc/apt/sources.list.d/nginx.list
RUN DEBIAN_FRONTEND=noninteractive \
  apt-get update \
  && apt-get install -y nginx
COPY  um-archive/package*.json ./
RUN npm install
COPY um-archive/ .
ENV REACT_APP_URL http://144.86.228.218:9888/api/
RUN npm run build
RUN cp -r build/* /usr/share/nginx/html/
EXPOSE 80
ENTRYPOINT service nginx start && npm run start
