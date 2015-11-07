exports.forEach = function (obj, cb) {
    var name;
    for (name in obj) {
        if (obj.hasOwnProperty(name)) {
            cb.call(this, obj[name], name);
        }
    }
};

exports.reply = function (client, net, msg) {
    client.reply(net.network, net.channel, net.user, msg, false);
}
