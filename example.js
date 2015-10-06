/*
  This example dumps a TMS layer into a mbtiles file
  Requires "request", tilelive" and "mbtiles" packages
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
var src = "tms:http://demo.opengeo.org/geoserver/gwc/service/tms/1.0.0/ne%3ANE1_HR_LC_SR_W_DR@EPSG%3A900913@jpeg/{z}/{x}/{y}.jpg";
var dst = "mbtiles://./naturalearth.mbtiles";
var options = {
    minzoom: 0,
    maxzoom: 4,
    bounds: [-180,-90,180,90],
    progress: progress
};

tilelive.copy(src, dst, options, error);
