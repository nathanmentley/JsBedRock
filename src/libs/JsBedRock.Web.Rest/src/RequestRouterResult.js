JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Rest = JsBedRock.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.Rest.RequestRouterResult = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (controller, action, request) {
				this.Controller = controller;
				this.Action = action;
                this.Request = request;
				
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Controller: null,
				Action: null,
                Request: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);