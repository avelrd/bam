var config = require('./config');
var util = require('./util');

/**
 * Find an event by name, executes a callback function when finished.
 * The parameter given to the cb function either has field errorMessage (with
 * a string) or is a valid event.
 */
exports.findEvent = function (name, cb) {
    var options, successCb, errorCb;
    if (name === undefined) {
        cb({'errorMessage': 'Event not found.'});
    }

    options = {
        'hostname': config.bam.hostname,
        'port': config.bam.port,
        'path': '/events/get/' + name
    };

    successCb = function (response) {
        // valid response to our request, let's hope it's valid json
        var ev;
        if (response === '') {
            // the server currently responds empty when no event is found
            cb({'errorMessage': 'Event not found.'});
        } else {
            try {
                ev = JSON.parse(response);
                // currently event is an array with it's 7th element being
                // a name
                cb({'title': ev[6]});
            } catch (e) {
                console.log('Internal error, trying to parse json: ', response);
                cb({'errorMessage': 'Internal error.'});
            }
        }
    };

    errorCb = function (error) {
        cb({'errorMessage': error});
    };

    util.httpget(options, successCb, errorCb);
};
