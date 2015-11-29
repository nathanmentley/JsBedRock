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
                    Def: function (data, successType, errorType) {
                        var self = this;
                        var promise = new JsBedRock.Promise();
                        
                        this.__Client.Post(data, function(xhttp) {
                            if(xhttp.readyState == 4){
                                if(xhttp.status == 200){
                                    promise.Resolve(self.__ProcessResult(xhttp.responseText, successType));
                                }else{
                                    promise.Reject(self.__ProcessResult(xhttp.responseText, errorType));
                                }
                            }
                        });
                        
                        return promise;
                    }
                },
                __ProcessResult: {
                    Def: function (respData, respType) {
                        var result = new respType();
                        result.FromJson(respData);
                        
                        return result;
                    }
                },
                _RootUrl: { Def: "" },
                __Client: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);