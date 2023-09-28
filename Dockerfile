FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 80
CMD PORT=80 npm start

# docker build -t video-club .
# docker pull mysql 5.7