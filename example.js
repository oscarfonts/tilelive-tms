/*jslint node: true */
"use strict";

var tilelive = require("tilelive");
require("./").registerProtocols(tilelive);
require("mbtiles").registerProtocols(tilelive);

var src = "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/osm@EPSG%3A900913@png8/{z}/{x}/{y}.png";
var dst = "mbtiles://./osm.mbtiles";
var options = {
    minzoom: 0,
    maxzoom: 16,
    bounds: [1.8959314626397201, 41.24712051859019, 2.3140591893595457, 41.53442029978945],
    progress: function report(stats, p) {
        process.stdout.write("\r" + (p.percentage).toFixed(1) + " % - ETA " + p.eta % 60 + " s          ");
        if (p.percentage == 100) process.stdout.write("\r\nDone!\r\n");
    }
};

tilelive.copy(src, dst, options);
