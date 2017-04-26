# Build Setup

```
# install dependencies
npm install

# TODO ws don't work with cluster (for implement redis in next commit)

# postgres at localhost:5432 (only production)
docker run --name postgres -p 127.0.0.1:5432:5432 -e POSTGRES_USER=popstream -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=popstream -d postgres:alpine

# serve at localhost:1337
npm start
```
