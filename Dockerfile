FROM node:latest



# Create the bot's directory

RUN mkdir -p /home/azureuser/muzikcalanbot

WORKDIR /home/azureuser/muzikcalanbot



COPY package.json /home/azureuser/muzikcalanbot

RUN npm install -g nodemon
RUN npm install



COPY . /home/azureuser/muzikcalanbot



# Start the bot.

CMD ["nodemon", "index.js"]