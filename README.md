# IP2GeoApp

[![Node.js CI](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/node.js.yml/badge.svg)](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/node.js.yml)
[![Fly Deploy](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/fly-deploy.yml/badge.svg)](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/fly-deploy.yml)
[![Docker Image CI](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/docker-image.yml/badge.svg)](https://github.com/jadiagaurang/IP2GeoApp/actions/workflows/docker-image.yml)
[![Docker pulls](https://img.shields.io/docker/pulls/jadiagaurang/ip2geo-app.svg?logo=docker)](https://hub.docker.com/r/jadiagaurang/ip2geo-app/)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/989-512a9e69-374a-4b6d-8210-c9e55b32f633?action=collection%2Ffork&collection-url=entityId%3D989-512a9e69-374a-4b6d-8210-c9e55b32f633%26entityType%3Dcollection%26workspaceId%3Dd2a3c361-a7be-40bd-b6cf-14577d649e88#?env%5BPROD%5D=W3sia2V5IjoiQXBwSG9zdCIsInZhbHVlIjoiaHR0cHM6Ly93d3cuaXAyZ2VvYXBwLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly93d3cuaXAyZ2VvYXBwLmNvbSIsInNlc3Npb25JbmRleCI6MH1d)

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

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout security/private.key -out security/primary.crt -config security/csr.cnf -sha256
```

## Code Example

### Prod

```base
npm start
```

### Local/Develop

```base
npm run-script dev
```

### Docker Container

```base
docker pull jadiagaurang/ip2geo-app
docker run -d -p 80:80 jadiagaurang/ip2geo-app
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
