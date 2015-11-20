JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.RestClientService = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Service,
            Constructor: function (context) {
                this._Client = new JsBedRock.Web.Rest.RestHttpClient(this._RootUrl);
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Service);
            },
            Members: {
                _Client: null,
                _RootUrl: ""
            }
        });
    });
})(JsBedRock.CurrentAssembly);