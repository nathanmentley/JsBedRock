JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Rest = JsBedRock.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.Rest.RestResult = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                FromJson: function (json) {
                    var obj = JSON.parse(json);
                    
                    for(var key in obj)
                        this[key] = obj[key];
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);