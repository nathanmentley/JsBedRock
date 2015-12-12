JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.DAL = JsBedRock.WebAppExample.DAL || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.Manager = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (accessorLoader) {
                this.AccessorLoader = accessorLoader;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: {
                    Def: null
                },
                AccessorLoader: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);