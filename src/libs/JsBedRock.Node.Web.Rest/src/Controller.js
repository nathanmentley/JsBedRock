JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.Controller = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (request, response) {
                this._Request = request;
                this._Response = response;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: { Def: 'controller' },
                _WriteHeader: { Def: function () {} },
                _Request: { Def: null },
                _Response: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);