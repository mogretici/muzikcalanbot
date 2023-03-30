remove old container

# docker kill 944 && docker remove 944
# docker kill $(docker ps -ql) && docker remove $(docker ps -ql)

Build the docker container for the Discord bot

# docker build -t muzikcalanbot .


Run the docker container

# docker run -dit muzikcalanbot