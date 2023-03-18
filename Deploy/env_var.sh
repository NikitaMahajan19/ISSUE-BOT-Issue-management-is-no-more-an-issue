#!/bin/bash

echo "export BOTTOKEN=<BOT_TOKEN>" >> /etc/environment
echo "export GITHUBTOKEN=<GIT_HUB_TOKEN>" >> /etc/environment
echo "export GITHUBOWNER=<GIT_HUB_OWNER>" >> /etc/environment
echo "export GITHUBREPO=<GIT_HUB_REPO>" >> /etc/environment
echo "export DB_CRED=<MONGO_DB_CRED>" >> /etc/environment
echo "export MM_HOST=<URL_MATTERMOST_HOST>" >> /etc/environment
echo "export MM_GROUP=<MATTERMOST_GROUP>" >> /etc/environment
echo "export MM_BOT_NAME=issue__bot" >> /etc/environment

source ~/.bashrc
