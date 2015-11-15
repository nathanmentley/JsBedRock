JsBedRock.Models = JsBedRock.Models || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Models.TestResult = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Web.Rest.RestResult,
            Constructor: function (v1, v2) {
                this.Value1 = v1;
                this.Value2 = v2;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Web.Rest.RestResult);
            },
            Members: {
                Value1: null,
                Value2: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);