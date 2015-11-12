var http = require('http');

/**
 * For each key in an object, call cb(value, key).
 */
exports.forEach = function (obj, cb) {
    var name;
    for (name in obj) {
        if (obj.hasOwnProperty(name)) {
            cb.call(this, obj[name], name);
        }
    }
};

/**
 * Reply a given message to a user.
 */
exports.reply = function (client, net, msg) {
    client.reply(net.network, net.channel, net.user, msg, false);
}

/**
 * Performs a http get request, calls either cb (success)
 * or ecb (error).
 */
exports.httpget = function (con, cb, ecb) {
    var request, options;

    options = {
        'hostname': con.hostname,
        'port': con.port,
        'path': con.path,
        'method': 'GET'
    };
    request = http.request(options, function (result) {
        var response = '';
        if (result.statusCode !== 200) {
            ecb('Response had status code ' + result.statusCode);
        } else {
            result.setEncoding('utf8');
            result.on('data', function (data) {
                response += data;
            });
            result.on('end', function () {
                cb(response);
            });
        }
    });
    request.on('error', function (error) {
        ecb(error.message);
    });
    request.end();
}
