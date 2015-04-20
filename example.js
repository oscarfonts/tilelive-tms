"use strict";

// Dump geoserver cached layer to a mbtiles file

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
        process.stdout.write("\r" + (p.percentage).toFixed(2) + " % - ETA " + formatDuration(p.eta));
    }
};

tilelive.copy(src, dst, options);

function formatDuration(duration) {
    var seconds = duration % 60;
    duration -= seconds;
    var minutes = (duration % 3600) / 60;
    duration -= minutes * 60;
    var hours = (duration % 86400) / 3600;
    duration -= hours * 3600;
    var days = duration / 86400;

    return (days > 0 ? days + 'd ' : '') +
        (hours > 0 || days > 0 ? hours + 'h ' : '') +
        (minutes > 0 || hours > 0 || days > 0 ? minutes + 'm ' : '') +
        seconds + 's';
}
