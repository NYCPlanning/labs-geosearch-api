# labs-geaosearch-api
An express.js api that proxies requests to a pelias instance, appending metadata to the response. Part of the NYC Geosearch Geocoder Project

This api exists as a workaround for a current limitation in the Pelias open source geocoder.  It's not possible to add custom metadata to Pelias responses, even if you can get the data into the Pelias database.

## How it works

When a request comes in, it is forwarded, along with its query params, to the Pelias API.  The Pelias response is intercepted, and if the response contains features, the ids are used to query the Pelias database directly for the original documents.  The responses from Pelias contain a `meta` object that includes custom data about the source of the address record.  This meta object is assigned to its respective feature's prperties, and the response is sent back to the client.

### Routes

- `/search` - proxy requests to pelias' `/search` endpoint
- `/autocomplete` - proxy requests to pelias' `/autocomplete` endpoint
