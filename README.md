# MyWorld

## Requirements

- docker
- docker-compose

## Installation

Just run the following command :

```
docker-compose up
```

You can then access the map-editor at http://localhost:8888

## Development

To have a watcher on your files, you can run those processes :

```
docker-compose exec map-editor-server npm run watch

docker-compose exec map-editor-client npm run watch
```
