JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Http = JsBedRock.Web.Http || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.Http.HttpClient = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                _Request: {
                    Def: function (requestType, url, data, callback) {
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.open(requestType, url, true);
                        xmlhttp.onreadystatechange= function(){
                            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                                callback(xmlhttp);
                            }else{
                                JsBedRock.Console.Write("error");
                            }
                        };
                        xmlhttp.send();
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);