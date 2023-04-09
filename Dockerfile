# Use an official Ubuntu 20.04 as a parent image
FROM ubuntu:20.04
SHELL ["/bin/bash", "-c"]

# Set environment variables
ENV PG_VERSION 12
ENV NODE_VERSION 16.x

# Install PostgreSQL
RUN apt-get update && apt-get upgrade -y
RUN apt-get -y install gnupg2 wget vim

RUN echo "deb http://apt.postgresql.org/pub/repos/apt $(source /etc/os-release && echo $VERSION_CODENAME)-pgdg main" > /etc/apt/sources.list.d/pgdg.list
## Import the repository signing key:
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
##
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install postgresql-$PG_VERSION -y
RUN rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set up PostgreSQL
RUN sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/$PG_VERSION/main/postgresql.conf && \
    echo "host    all             all             0.0.0.0/0               md5" >> /etc/postgresql/$PG_VERSION/main/pg_hba.conf && \
    /etc/init.d/postgresql start && \
    su - postgres -c "psql --command \"CREATE USER docker WITH SUPERUSER PASSWORD 'docker';\"" && \
    su - postgres -c "createdb -O docker docker"

# Set up a working directory for Node.js app
WORKDIR /app

# Copy the Node.js app into the container
COPY . .

# Install dependencies for Node.js app
RUN npm install

# Expose the Node.js app port
EXPOSE 3000
EXPOSE 5432
# Run the Node.js app
CMD service postgresql start && npm start
