module.exports = TmsSource;

var url = require('url');
var qs = require('querystring');
var request = require('request');

function TmsSource(uri, callback) {
    this.uri = uri.href;

    if (!(this.uri.match(/{z}/) && this.uri.match(/{x}/) && this.uri.match(/{y}/))) {
        callback(new Error("TMS URL must contain {z}, {x} and {y} placeholders."));
    }
    callback(null, this);
    return this;
}

TmsSource.registerProtocols = function (tilelive) {
    tilelive.protocols['http:'] = TmsSource;
    tilelive.protocols['https:'] = TmsSource;
};

TmsSource.prototype.getTile = function (z, x, y, callback) {
    var tile = this.uri.replace(/{z}/i, z).replace(/{x}/i, x).replace(/{y}/i, Math.pow(2, z) - y - 1);
    request.get({
        uri: tile,
        encoding: null,
        timeout: 30e3
    }, function (error, response, body) {
        if (error) {
            return callback(error);
        }

        switch (response.statusCode) {
            case 200:
                var headers = ["content-type", "content-md5", "content-encoding"].reduce(function (obj, key) {
                    if (response.headers[key]) {
                        obj[key] = response.headers[key];
                    }
                    return obj;
                }, {});
                callback(null, body, headers);
                break;
            case 404:
                callback(new Error("Tile does not exist"));
                break;
            default:
                callback(new Error("Upstream error: " + response.statusCode));
                break;
        }
    });
};

TmsSource.prototype.getInfo = function (callback) {
    callback(null, {});
};
