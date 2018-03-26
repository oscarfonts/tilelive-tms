# tilelive-tms

Reads tiles from an XYZ or TMS service.

This module is intended to be used with [tilelive.js](https://github.com/mapbox/tilelive.js).

### Usage example

Install tilelive-tms and other needed tilelive protocols:

    npm install @mapbox/tilelive @mapbox/mbtiles tilelive-tms

To dump a GeoServer cached layer (accessible as a TMS service) into a mbtiles file, use the "tilelive-copy" utility with the following syntax:

    npx tilelive-copy <src> <dst> --bounds=xmin,ymin,xmax,ymax --minzoom=zmin --maxzoom=zmax

The source url is prefixed with `tms:` and uses the `{z}`, `{x}` and `{y}` placeholders for TMS layers, or, `{z}`, `{x}` and `{-y}` placeholders for XYZ layers.

Example using a public GeoServer instance ("natural earth" layer from demo.geo-solutions.it):

    npx tilelive-copy tms:https://demo.geo-solutions.it/geoserver/gwc/service/tms/1.0.0/geosolutions%3ANaturalEarth@EPSG%3A900913@jpeg/{z}/{x}/{y}.jpg mbtiles://./naturalearth.mbtiles --bounds=-180,-90,180,90 --minzoom=0 --maxzoom=4

Example using an XYZ service from OpenStreetMap:

    npx tilelive-copy tms:https://a.tile.openstreetmap.org/{z}/{x}/{-y}.png mbtiles://./osm.mbtiles --bounds=1.8959314626397201,41.24712051859019,2.3140591893595457,41.53442029978945 --minzoom=0 --maxzoom=16
