# tilelive-tms

Reads tiles from an XYZ, TMS or WMTS service.

This module is intended to be used with [tilelive.js](https://github.com/mapbox/tilelive.js).

### Usage example

Install tilelive-tms and other needed tilelive protocols:

    npm install @mapbox/tilelive @mapbox/mbtiles tilelive-tms

To dump a GeoServer cached layer (accessible as a TMS service) into a mbtiles file, use the "tilelive-copy" utility with the following syntax:

    npx tilelive-copy <src> <dst> --bounds=xmin,ymin,xmax,ymax --minzoom=zmin --maxzoom=zmax

The source url is prefixed with `tms:` and uses the `{z}`, `{x}` and `{y}` placeholders for TMS layers, or, `{z}`, `{x}` and `{-y}` placeholders for XYZ and WMTS layers.

Example using a TMS service (public GeoServer instance from geo-solutions.it):

    npx tilelive-copy tms:https://demo.geo-solutions.it/geoserver/gwc/service/tms/1.0.0/geosolutions%3ANaturalEarth@EPSG%3A900913@jpeg/{z}/{x}/{y}.jpg mbtiles://./naturalearth.mbtiles --bounds=-180,-90,180,90 --minzoom=0 --maxzoom=4

Example using an XYZ service (OpenStreetMap):

    npx tilelive-copy tms:https://a.tile.openstreetmap.org/{z}/{x}/{-y}.png mbtiles://./osm.mbtiles --bounds=1.8959314626397201,41.24712051859019,2.3140591893595457,41.53442029978945 --minzoom=0 --maxzoom=16

Example using a WMTS service (PNOA):

    npx tilelive-copy 'tms:http://www.ign.es/wmts/pnoa-ma?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&Layer=OI.OrthoimageCoverage&Style=default&Format=image/jpeg&TileMatrixSet=GoogleMapsCompatible&TileMatrix={z}&TileCol={x}&TileRow={-y}' mbtiles://./pnoa.mbtiles --bounds=-18.162,21.899,6.289,45.286 --minzoom=0 --maxzoom=6
