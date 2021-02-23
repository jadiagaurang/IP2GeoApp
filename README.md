# MaxMind GeoIP2 DB App using NodeJS + Express

[![Node.js CI](https://github.com/jadiagaurang/mmdb-geoip-node-express/actions/workflows/node.js.yml/badge.svg)](https://github.com/jadiagaurang/mmdb-geoip-node-express/actions/workflows/node.js.yml)
[![Build Status](https://www.travis-ci.com/jadiagaurang/mmdb-geoip-node-express.svg?branch=main)](https://www.travis-ci.com/jadiagaurang/mmdb-geoip-node-express)

This example provides an API for the MaxMind's free [GeoLite2 databases](https://dev.maxmind.com/geoip/geoip2/geolite2/).

### Search
![Search](https://user-images.githubusercontent.com/430637/108790309-38b27980-7531-11eb-90b3-b879ca779f3b.png)

### Result
![Result](https://user-images.githubusercontent.com/430637/108790308-3819e300-7531-11eb-9845-d6dff15c6ffd.png)

## Installation

```
npm install
```

## Code Example

### Prod
```
npm start
```

### Local
```
nodemon app.js
```

## API Reference

```
curl --location --request GET "http://localhost:8080/api/geoip?ipaddress=8.8.4.4"
```

```
curl --location --request POST "http://localhost:8080/api/geoip" --header 'Content-Type: application/json' --data-raw '{
    "ipaddress": "1.1.1.1"
}'
```

## License

[Unlicense](https://unlicense.org/)