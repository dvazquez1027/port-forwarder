/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var net = require('net');
var config = require('config');
var _ = require('underscore');
var Connection = require('./Connection').Connection;

function PortForwarder(options) {
    this.options = options;
}

PortForwarder.DEFAULT_SERVER_PORT = 6000;

PortForwarder.prototype.run = function () {
    this.server = net.createServer();
    this.server.on('connection', this._onConnection.bind(this));
    this.server.listen(this._getServerPort(), this._onListen.bind(this));
};

PortForwarder.prototype._onConnection = function (c) {
    new Connection(config.client, c).run();
};

PortForwarder.prototype._onListen = function () {
    console.log('Server listening on port ' + this._getServerPort());
};

PortForwarder.prototype._getServerPort = function () {
    return !_.isUndefined(config.server) && !_.isUndefined(config.server.port) && _.isNumber(config.server.port) ? config.server.port : PortForwarder.DEFAULT_SERVER_PORT;
};

new PortForwarder(config).run();
