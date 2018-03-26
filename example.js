/*
  This example dumps a TMS layer into a mbtiles file
  Requires "request", tilelive" and "mbtiles" packages
*/
var path = require('path');

var tilelive = require("@mapbox/tilelive");
require(path.resolve("./")).registerProtocols(tilelive); // Register tms protocol
require("@mapbox/mbtiles").registerProtocols(tilelive);  // Register mbtiles protocol

var progress = function(stats, progress) {
    process.stdout.write("\r" + (progress.percentage).toFixed(1) + " % - ETA " + Math.round(progress.eta) + " s          ");
    if (progress.percentage == 100) process.stdout.write("\r\nDone!\r\n");
};

var error = function(error) {
    if (error) console.error(error);
};


// A tms url starts with "tms:", followed by an URL template, which must contain {z} {x} and {y} placeholders
var src = "tms:https://demo.geo-solutions.it/geoserver/gwc/service/tms/1.0.0/geosolutions%3ANaturalEarth@EPSG%3A900913@jpeg/{z}/{x}/{y}.jpg";
var dst = "mbtiles://./naturalearth.mbtiles";
var options = {
    minzoom: 0,
    maxzoom: 4,
    bounds: [-180,-90,180,90],
    progress: progress
};

tilelive.copy(src, dst, options, error);
