FROM ubuntu:20.04

COPY ./dist/app-linux ./app

EXPOSE 8001

CMD ./app start server