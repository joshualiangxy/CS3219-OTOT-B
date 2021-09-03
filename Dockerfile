FROM    node:14.2.0-alpine3.11 as builder

WORKDIR /app

COPY    package*.json ./
RUN     npm install

COPY    . .
RUN     npm run build
RUN     mkdir /pkg
RUN     mv dist node_modules package.json /pkg/

FROM    node:14.2.0-alpine3.11

WORKDIR /app

COPY    --from=builder /pkg /app

CMD ["node", "dist/main.js"]
