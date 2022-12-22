FROM ubuntu:20.04

COPY ./dist/app-root ./app

EXPOSE 8000

CMD ./app start server