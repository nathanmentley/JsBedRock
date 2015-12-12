JsBedRock.Models = JsBedRock.Models || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Models.ErrorResult = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Web.Rest.RestResult,
            Constructor: function (error) {
                this.ErrorMessage = error;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Web.Rest.RestResult);
            },
            Members: {
                ErrorMessage: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);