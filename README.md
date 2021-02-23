# MaxMind GeoIP2 DB App using NodeJS + Express

## Description

This example provides an API for the MaxMind's free [GeoLite2 databases](https://dev.maxmind.com/geoip/geoip2/geolite2/).

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
nodemon ./server/app.js
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