JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Network = JsBedRock.Node.Network || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Network.HttpServer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (requestCallback, portNumber) {
				this.__Http = require('http');
                
                this.__Server = this.__Http.createServer(requestCallback);
                this.__PortNumber = portNumber;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Start: function () {
                    this.__Server.listen(this.__PortNumber);
                },
                End: function (callback) {
                    this.__Server.close(callback);
                },
                __Server: null,
				__Http: null,
                __PortNumber: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);