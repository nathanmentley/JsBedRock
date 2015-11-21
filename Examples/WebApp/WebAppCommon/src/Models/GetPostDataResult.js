JsBedRock.Models = JsBedRock.Models || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Models.GetPostDataResult = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Web.Rest.RestResult,
            Constructor: function (body, error) {
                this.BodyText = body;
                this.ErrorText = error;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Web.Rest.RestResult);
            },
            Members: {
                BodyText: null,
                ErrorText: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);