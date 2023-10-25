# gwp-notify

Job for sending notifications to Telegram chanel about water supply repairs.

## Technologies
* Playwirght
* Google Cloud 
* Firestore
* Google Translation API
* Telegram API
* Docker

## Build and publish Docker Image
```
docker buildx build --platform linux/amd64 -t gwp-check .
docker tag gwp-check us-central1-docker.pkg.dev/{{project_id}}/gcf-artifacts/gwp-check
docker push us-central1-docker.pkg.dev/{{project_id}}/gcf-artifacts/gwp-check
```