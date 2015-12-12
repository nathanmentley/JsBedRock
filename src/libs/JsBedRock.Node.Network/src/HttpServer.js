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
                Start: {
                    Def: function () {
                        this.__Server.listen(this.__PortNumber);
                    }
                },
                End: {
                    Def: function (callback) {
                        this.__Server.close(callback);
                    }
                },
                __Server: { Def: null},
				__Http: { Def: null},
                __PortNumber: { Def: null}
            }
        });
    });
})(JsBedRock.CurrentAssembly);