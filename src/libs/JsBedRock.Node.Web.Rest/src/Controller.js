JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.Controller = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (request, response) {
                this._Request = request;
                this._Response = response;
                this._WriteHeader();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: { Def: 'controller' },
                _Init: {
                    Def: function () {
                        
                    }
                },
                _Deinit: {
                    Def: function () {
                        
                    }
                },
                _WriteHeader: {
                    Def: function () {
                        if(this._Response) {
                            this._Response.writeHead(200, { });
                        }
                    }
                 },
                _Request: { Def: null },
                _Response: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);