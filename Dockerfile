FROM oven/bun:alpine
RUN mkdir /app
WORKDIR /app

RUN apk update
RUN apk add nodejs

COPY package.json ./
COPY bun.lockb ./

RUN apk add --no-cache --virtual .build-deps \
  build-base \
  python3 \
  && bun install \
  && apk del .build-deps

RUN mkdir ./src
COPY src ./src

EXPOSE 14831

CMD ["bun", "run", "start"]
