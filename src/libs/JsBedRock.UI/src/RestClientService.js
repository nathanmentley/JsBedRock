JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.RestClientService = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Service,
            Constructor: function (context) {
                this.__Client = new JsBedRock.Web.Rest.RestHttpClient(this._RootUrl);
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Service);
            },
            Members: {
                _Post: {
                    Def: function (data, successType, successCallback, errorType, errorCallback) {
                        var self = this;
                        
                        this.__Client.Post(data, function(xhttp) {
                            if(xhttp.readyState == 4){
                                if(xhttp.status == 200){
                                    self.__ProcessResult(xhttp.responseText, successType, successCallback);
                                }else{
                                    self.__ProcessResult(xhttp.responseText, errorType, errorCallback);
                                }
                            }
                        });
                    }
                },
                __ProcessResult: {
                    Def: function (respData, respType, respCallback) {
                        var result = new respType();
                        result.FromJson(respData);
                        respCallback(result);
                    }
                },
                _RootUrl: { Def: "" },
                __Client: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);