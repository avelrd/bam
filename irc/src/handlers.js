var bamEvents = require('./events');
var util = require('./util');

/**
 * Join command handler. Given a client and net and the event name as argument,
 * attempts to join the event and replies the user about it.
 * client: the client object
 * net: should contain fields network, user and channel.
 * args: the arguments (should be the event name to join).
 */
exports.onJoin = function (client, net, args) {
    var name, bevent;
    if (args.length < 1) {
        util.reply(client, net, 'Type }join <event name> to join an event.');
        return;
    }
    name = args[0];

    bamEvents.findEvent(name, function (bevent) {
        if (bevent.errorMessage !== undefined) {
            util.reply(client, net, bevent.errorMessage);
            return;
        }
        util.reply(client, net, net.user + ' joined ' + bevent.title + '.');
        util.reply(client, net, 'I lied.');
    });
};

/**
 * Info command handler. Given a client and net and the event name as argument,
 * replies the user about the event.
 * client: the client object
 * net: should contain fields network, user and channel.
 * args: the arguments (should be the event name to join).
 */
exports.onInfo = function (client, net, args) {
    var name;
    if (args.length < 1) {
        util.reply(client, net, 'Type }info <event name> to find information about an event.');
        return;
    }
    name = args[0];

    bamEvents.findEvent(name, function (bevent) {
        if (bevent.errorMessage !== undefined) {
            util.reply(client, net, bevent.errorMessage);
            return;
        }
        util.reply(client, net, 'I could find event ' + bevent.title + ' ('+ name + ')');
    });
};
