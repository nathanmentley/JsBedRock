JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Rest = JsBedRock.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.Rest.RequestRouter = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                ParseRequest: function(uri) {
                    //TODO: Parse against configured routes
                    var segments = uri.split("/");
                        
                    return new JsBedRock.Web.Rest.RequestRouterResult(
                        segments[1],
                        segments[2],
                        new JsBedRock.Web.Rest.RestRequest()
                    );
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);