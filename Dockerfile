FROM oven/bun:alpine
RUN mkdir /app
WORKDIR /app

RUN apk update
RUN apk add build-base python3

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY .env ./
COPY src ./

EXPOSE 14831

CMD ["bun", "run", "start"]
