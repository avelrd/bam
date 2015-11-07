var dazeus = require("dazeus");
var handlers = require("./handlers");
var util = require("./util");

var commands = {
    'info': handlers.onInfo,
    'join': handlers.onJoin
};

var client = dazeus.connect({path: '/tmp/dazeus.sock'}, function () {
    client.onCommand('bam', function (network, user, channel, execCmd, args) {
        var pargs = args.split(' ');
        var arg0 = pargs.splice(0, 1)[0];
        var net = {
            'network': network,
            'user': user,
            'channel': channel
        };

        if (commands[arg0] !== undefined) {
            commands[arg0](client, net, pargs);
        }
    });
});
