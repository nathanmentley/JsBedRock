JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.ResponseTypeAttribute = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Types.Attribute,
            Constructor: function (respType) {
				this.Type = respType;
				
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Attribute);
            },
            Members: {
				Type: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);