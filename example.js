var tilelive = require("tilelive");
require("./").registerProtocols(tilelive);      // Register tms protocol
require("mbtiles").registerProtocols(tilelive); // Register mbtiles protocol

// A tms url starts with "tms:", followed by an URL template, which must contain {z} {x} and {y} placeholders
var src = "tms:http://localhost:8080/geoserver/gwc/service/tms/1.0.0/osm@EPSG%3A900913@png8/{z}/{x}/{y}.png";
var dst = "mbtiles://./osm.mbtiles";

// Indicate zoom levels and bbox in geographic coordinates [xmin, ymin, xmax, ymax]
var options = {
    minzoom: 0,
    maxzoom: 16,
    bounds: [1.8959314626397201, 41.24712051859019, 2.3140591893595457, 41.53442029978945],
    progress: function report(stats, p) {
        // Write a progress indication
        process.stdout.write("\r" + (p.percentage).toFixed(1) + " % - ETA " + p.eta % 60 + " s          ");
        if (p.percentage == 100) process.stdout.write("\r\nDone!\r\n");
    }
};

// Run!
tilelive.copy(src, dst, options, function(error) {
    // Handle errors
    if (error) console.error(error);
});
