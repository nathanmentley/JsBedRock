JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Web.WebServerStart = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: {
                    Def: function () {
                        this._WebServer = new this._ServerType(this._PortNumber);
                        
                        this._Start();
                    }
                },
                _ServerType: {
                    Def: JsBedRock.Node.Web.WebServerBase
                },
                _Start: {
                    Def: function () {
                        this._WebServer.ServerStart();
                    }
                },
                _PortNumber: {
                    Def: null
                },
                _WebServer: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);