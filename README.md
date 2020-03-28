# free-chat
Free-chat is a chat room web app that allows instant message based on WebSocket. Free-chat also connects to MongoDB to perform simple sign-in activities. The app is also containerized for simple deployment.
## Installation
### To push to docker hub
```bash
docker build --tag freechat:<tag>
docker push <username>/freechat:<tag>
```
### Or pull from the existing docker repo
```bash
docker pull jiewuu/freechat:1.1
```
### For Kubernetes deployment
```bash
kubectl apply -f deployment.yml
```
The app will be listening on PORT 30000.
