var url = require('url');
var qs = require('querystring');
var request = require('request');
var retry = require("retry");

module.exports = TmsSource;

function TmsSource(uri, callback) {
    this.uri_template = uri.host + ":" + uri.path.replace(/%7B/g, "{").replace(/%7D/g, "}");

    if (!(this.uri_template.match(/\{z}/) && this.uri_template.match(/\{x}/) && (this.uri_template.match(/\{y}/) || this.uri_template.match(/\{-y}/)))) {
        callback(new Error("TMS URL template must contain {z}, {x} and {y} (or {-y}) placeholders."));
        return;
    }

    callback(null, this);
}

TmsSource.registerProtocols = function(tilelive) {
    tilelive.protocols['tms:'] = TmsSource;
};

TmsSource.prototype.getTile = function(z, x, y, callback) {
    var operation = retry.operation({
        retries: 4,
        factor: 1.71023
    });

    var tile_uri = this.uri_template
        .replace(/\{z}/i, z)
        .replace(/\{x}/i, x)
        .replace(/\{y}/i, String(Math.pow(2, z) - y - 1))
        .replace(/\{-y}/i, y);

    return operation.attempt(function(currentAttempt) {
        request.get({
            uri: tile_uri,
            encoding: null,
            timeout: 30e3 // 30 seconds
        }, function (error, response, body) {
            if (operation.retry(error)) {
                console.warn("Failed %s after %d attempts:", tile_uri, currentAttempt, error);
                // retrying, callback will eventually be called
                return;
            }

            if (error) {
                return callback(error);
            }

            switch (response.statusCode) {
                case 200:
                case 403:
                case 404:
                    return callback(null, body, {});
                default:
                    console.warn("TMS URL " + this.href + " returned HTTP status code " + response.statusCode + ", tile will be skipped");
                    return callback(new Error("Tile does not exist"));
            }
        });
    });
};

TmsSource.prototype.getInfo = function (callback) {
    callback(null, {});
};
