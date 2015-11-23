JsBedRock.Models = JsBedRock.Models || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Models.TestResult = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Web.Rest.RestResult,
            Constructor: function (id, v1, v2) {
                this.ID = id;
                this.Value1 = v1;
                this.Value2 = v2;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Web.Rest.RestResult);
            },
            Members: {
                ID: { Def: null },
                Value1: { Def: null },
                Value2: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);