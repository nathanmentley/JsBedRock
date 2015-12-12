JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Rest = JsBedRock.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.Rest.RestRequestRouteAttribute = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (route) {
                this.Route = route;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Attribute);
            },
            Members: {
                Route: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);