FROM node:latest



# Create the bot's directory

RUN mkdir -p /home/azureuser/bosyapanbot

WORKDIR /home/azureuser/bosyapanbot



COPY package.json /home/azureuser/bosyapanbot

RUN npm install



COPY . /home/azureuser/bosyapanbot



# Start the bot.

CMD ["node", "index.js"]