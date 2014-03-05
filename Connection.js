var net = require('net');

function Connection(options, s) {
    if (!(this instanceof Connection)) {
        return new Connection(c);
    }
    
    this.s = s;
    this.options = options;
}

Connection.prototype.run = function () {
    this.c = net.connect(this.options);
    this.s.pipe(this.c);
    this.c.pipe(this.s);
};

module.exports.Connection = Connection;