JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.RequestRouter = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this._Routes = new JsBedRock.Collections.List();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                ParseRequest: {
                    Def: function(uri) {
                        //TODO: Parse against configured routes
                        var segments = uri.split("/");
                            
                        return new JsBedRock.Node.Web.Rest.RequestRouterResult(
                            segments[1],
                            segments[2],
                            new JsBedRock.Web.Rest.RestRequest()
                        );
                    }
                },
                RegisterRoute: {
                    Def: function() {
                    }
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);