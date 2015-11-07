var bamEvents = require('./events');
var util = require('./util');

exports.onJoin = function (client, net, args) {
    var name, bevent;
    if (args.length < 1) {
        util.reply(client, net, 'Type }join <event name> to join an event.');
        return;
    }
    name = args[0];

    bevent = bamEvents.findEvent(name);
    if (bevent.errorMessage !== undefined) {
        util.reply(client, net, bevent.errorMessage);
        return;
    }
    util.reply(client, net, net.user + ' joined ' + bevent.title + '.');
};

exports.onInfo = function (client, net, args) {
    var name;
    if (args.length < 1) {
        util.reply(client, net, 'Type }info <event name> to find information about an event.');
        return;
    }
    name = args[0];

    bevent = bamEvents.findEvent(name);
    if (bevent.errorMessage !== undefined) {
        util.reply(client, net, bevent.errorMessage);
        return;
    }
    util.reply(client, net, 'Event ' + bevent.title + ' ('+ name + '): ' + bevent.description);
};
