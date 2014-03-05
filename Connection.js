var net = require('net');

function Connection(options, s) {
    if (!(this instanceof Connection)) {
        return new Connection(c);
    }
    
    console.log('Connected from ' + s.remoteAddress);
    
    this.options = options;
    this.s = s;
    this.remoteAddress = this.s.remoteAddress;
    
    this.s.on('close', this._onClose.bind(this));
    
    this.c = net.connect(this.options);
    this.s.pipe(this.c);
    this.c.pipe(this.s);
};

Connection.prototype._onClose = function () {
    console.log('Connection closed from ' + this.remoteAddress);
};

module.exports.Connection = Connection;