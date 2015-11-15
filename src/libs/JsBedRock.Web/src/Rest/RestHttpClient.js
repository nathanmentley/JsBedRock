JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Rest = JsBedRock.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.Rest.RestHttpClient = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Web.Http.HttpClient,
            Constructor: function (rootUrl) {
                this._RootUrl = rootUrl;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Web.Http.HttpClient);
            },
            Members: {
                _RootUrl: null,
                
                Post: function(url, data, callback) {
                    
                },
                Get: function(url, data, callback) {
                    
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);