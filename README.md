# IP2GeoApp

[![Node.js CI](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/node.js.yml/badge.svg)](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/node.js.yml)
[![Docker Image CI](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/docker-image.yml/badge.svg)](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/docker-image.yml)
[![Docker pulls](https://img.shields.io/docker/pulls/jadiagaurang/ip2geo-app.svg?logo=docker)](https://hub.docker.com/r/jadiagaurang/ip2geo-app/)

IP2Geo is an open-source app to get the Geolocation (Latitude and Longitude) from an IP Address using MaxMind's free [GeoLite2 databases](https://dev.maxmind.com/geoip/geoip2/geolite2/).

## Motivation

* [https://www.maxmind.com/en/geoip-demo](https://www.maxmind.com/en/geoip-demo)
* [https://ipinfo.io/](https://ipinfo.io/)
* [https://ipgeolocation.io/](https://ipgeolocation.io/)
* [https://www.ip2geo.co/](https://www.ip2geo.co/)
* [https://www.geolocation.com/](https://www.geolocation.com/)

## Demo

[https://ip2geoapp.com/](https://ip2geoapp.com/)

## Installation

```base
npm install
npm update
```

## Code Example

### PROD

```base
npm start
```

### LOCAL DEV

```base
npm run-script dev
```

## API Reference

```bash
curl --location --request GET "https://ip2geoapp.com/api/geoip?ipaddress=8.8.4.4"
```

```bash
curl --location --request POST "http://ip2geoapp.com/api/geoip" --header "Content-Type: application/json" --data-raw "{
    \"ipaddress\": \"1.1.1.1\"
}"
```

## Tests

```base
npm test
```

## License

Please see the [license file](https://github.com/jadiagaurang/IP2GeoApp/blob/main/LICENSE) for more information.
