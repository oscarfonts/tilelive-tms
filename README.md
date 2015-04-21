# tilelive-tms

Reads tiles from a TMS service.

This module is intended to be used with [tilelive.js](https://github.com/mapbox/tilelive.js).

### Usage example

Install tilelive and needed drivers:

    npm install tilelive mbtiles tilelive-tms

For example, to dump a GeoServer cached layer (accessible as a TMS service) into a mbtiles file, use the "tilelive-copy" utility with the following syntax:

    tilelive-copy <src> <dst> --bounds=xmin,ymin,xmax,ymax --minzoom=zmin --maxzoom=zmax

For instance, for an "osm" layer in png8 format, generate up to zoom 16 covering the Barcelona area:

    node_modules/tilelive/bin/tilelive-copy tms:http://localhost:8080/geoserver/gwc/service/tms/1.0.0/osm@EPSG%3A900913@png8/{z}/{x}/{y}.png mbtiles://./osm.mbtiles --bounds=1.8959314626397201,41.24712051859019,2.3140591893595457,41.53442029978945 --minzoom=0 --maxzoom=16
