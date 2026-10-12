# Autocanon-BE
Back end microservices

# to run docker:
docker-compose up -d --build

# to stop docker containers:
docker-compose down

# to check the node-app logs:
docker logs -f node-app

# to connect to mongodb
docker exec -it auto-canon-be_mongo-db_1 mongosh -u "mongo" -p "mongo"

# mongo commands:

show dbs;
use sukalpadb;
show collections;
db.suppliers.find()