# worksample-ICHIGO

this is worksample for ICHIGO

This application is published at the following URL.
<https://meadow-cut-orchestra.glitch.me/>

## How to setup

```shell
npm i
```

## How to start dev server

By executing the command below, you will be able to develop on the frontend.
**To communicate with the server side, please follow the steps from [How to build](#how-to-build) onwards.**

```shell
npm run start:vite
```

## How to build

By executing the command below, the artifacts will be generated under the `dist` directory.

```shell
npm run build
```

## How to start all app

```shell
npm run start
```

## How to register customer

```shell
curl -X POST -H "Content-Type: application/json" -d '{"name":"peter.parker"}' localhost:3000/customers
```

## How to order

```shell
curl -X POST -H "Content-Type: application/json" -d '{"customerId":"1000","customerName":"peter.parker","orderId":"ABC1234","totalInCents":10,"date":"2022-01-01T00:00:00.000Z"}' localhost:3000/orders
```
