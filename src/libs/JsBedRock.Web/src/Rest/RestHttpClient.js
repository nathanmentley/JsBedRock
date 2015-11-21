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
                
                Post: function(data, callback) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", this._RootUrl + data.GetRestUrl(), true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(data.ToJson());
                    
                    xhttp.onreadystatechange = function() {
                        callback(xhttp);
                    }
                },
                Get: function(url, data, callback) {
                    
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);