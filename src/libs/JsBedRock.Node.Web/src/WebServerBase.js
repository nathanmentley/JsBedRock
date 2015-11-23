JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.WebServerBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (portNumber) {
                var context = this;
                
                this._HttpServer = new JsBedRock.Node.Network.HttpServer(function (req,res) { context._HandleRequest(req, res); }, portNumber);
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                ServerStart: {
                    Def: function () {
                        this._HttpServer.Start();
                    }
                },
                ServerEnd: {
                    Def: function (callback) {
                        this._HttpServer.End(callback);
                    }
                },
                _HandleRequest: {
                    Def: function(req, res) {
                        res.writeHead(404, {'Content-Type': 'text/plain'});
                        res.end("404");
                    }
                },
                _HttpServer: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);