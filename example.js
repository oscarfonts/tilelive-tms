/*
  This example dumps a TMS layer into a mbtiles file
  Requires "tilelive" and "mbtiles" packages
*/

var tilelive = require("tilelive");
require("./").registerProtocols(tilelive);      // Register tms protocol
require("mbtiles").registerProtocols(tilelive); // Register mbtiles protocol

var progress = function(stats, progress) {
    process.stdout.write("\r" + (progress.percentage).toFixed(1) + " % - ETA " + Math.round(progress.eta) + " s          ");
    if (progress.percentage == 100) process.stdout.write("\r\nDone!\r\n");
};

var error = function(error) {
    if (error) console.error(error);
};


// A tms url starts with "tms:", followed by an URL template, which must contain {z} {x} and {y} placeholders
var src = "tms:http://localhost:8080/geoserver/gwc/service/tms/1.0.0/osm@EPSG%3A900913@png8/{z}/{x}/{y}.png";
var dst = "mbtiles://./osm.mbtiles";
var options = {
    minzoom: 0,
    maxzoom: 16,
    bounds: [1.8959314626397201, 41.24712051859019, 2.3140591893595457, 41.53442029978945],
    progress: progress
};

tilelive.copy(src, dst, options, error);
