var url = require('url');
var qs = require('querystring');
var request = require('request');

module.exports = TmsSource;

function TmsSource(uri, callback) {
    uri = url.parse(uri.host + ":" + uri.path);
    this.uri = uri.href;

    if (!(this.uri.match(/\{z}/) && this.uri.match(/\{x}/) && this.uri.match(/\{y}/))) {
        callback(new Error("TMS URL template must contain {z}, {x} and {y} placeholders."));
        return;
    }

    callback(null, this);
}

TmsSource.registerProtocols = function(tilelive) {
    tilelive.protocols['tms:'] = TmsSource;
};

TmsSource.prototype.getTile = function(z, x, y, callback) {
    request.get({
        uri: this.uri.replace(/\{z}/i, z).replace(/\{x}/i, x).replace(/\{y}/i, String(Math.pow(2, z) - y - 1)),
        encoding: null,
        timeout: 30e3 // 30 seconds
    }, function (error, response, body) {
        if (error) {
            callback(error);
            return;
        }

        switch (response.statusCode) {
            case 200:
                callback(null, body, {});
                break;
            default:
                console.warn("TMS URL " + this.href + " returned HTTP status code " + response.statusCode + ", tile will be skipped");
                callback(new Error("Tile does not exist"));
                break;
        }
    });
};

TmsSource.prototype.getInfo = function (callback) {
    callback(null, {});
};
