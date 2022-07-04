# Bingo

![<img src="image.png" width="150"/>](./documentation/demo-1.png)

## How to run

### Prod
1. Make a copy of `.env.template` called `.env` and update the values.
2. Run docker-compose. It will use the newly created env file. It will start the containers detached and then open the logs which can be exited whenever. 
3. To close the app run `docker-compose down`. 

```
docker-compose build; docker-compose up -d; docker-compose logs -f
``` 

### Dev - container
1. Make a copy of `.env.template` called `.env.dev` and update the values.
2. Run docker-compose using the command below. It will use the `docker-compose.dev.yml` as an override and with the newly created env file. It will start the containers detached and then open the logs which can be exited whenever. 
3. To close the app run `docker-compose down`. 

```
docker-compose -f .\docker-compose.yml -f .\docker-compose.dev.yml --env-file=.env.dev build; docker-compose -f .\docker-compose.yml -f .\docker-compose.dev.yml --env-file=.env.dev up -d; docker-compose logs -f
```

### Dev - host
1. `npm install`
2. `npm start`
## Tech stack
- React 
- Docker & Docker compose
- Nginx