# MaxMind GeoIP2 DB API Endpoint using NodeJS + Express

## Description

This example provides an API for the MaxMind's free [GeoLite2 databases](https://dev.maxmind.com/geoip/geoip2/geolite2/).

## Installation

```
npm install
```

## Code Example

```
nodemon ./server/app.js
```

## API Reference

```
curl --location --request GET "http://localhost:8080/v1/geoip?ipaddress=8.8.4.4"
```

```
curl --location --request POST "http://localhost:8080/v1/geoip" --header 'Content-Type: application/json' --data-raw '{
    "ipaddress": "1.1.1.1"
}'
```

## License

[Unlicense](https://unlicense.org/)