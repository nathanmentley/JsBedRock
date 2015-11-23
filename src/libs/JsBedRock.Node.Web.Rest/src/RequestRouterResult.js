JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.RequestRouterResult = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (controller, action, request) {
				this.Controller = controller;
				this.Action = action;
                this.Request = request;
				
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Controller: { Def: null },
				Action: { Def: null },
                Request: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);