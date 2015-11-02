JsBedRock.Web = JsBedRock.Web || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.WebServerBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (portNumber) {
                this._HttpServer = new JsBedRock.Node.Network.HttpServer(this._HandleRequest, portNumber);
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                ServerStart: function () {
                    this._HttpServer.Start();
                },
                ServerEnd: function (callback) {
                    this._HttpServer.End(callback);
                },
                _HandleRequest: function(req, res) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end("Response From Node Server");
                },
                _HttpServer: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);