JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.Managers = JsBedRock.WebAppExample.Managers || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.Managers.BlogPostManager = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.Rest.Manager,
            Constructor: function (accessorLoader) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.Rest.Manager, accessorLoader);
            },
            Members: {
                Name: {
                    Def: "BlogPost"
                },
                GetBlogPosts: {
                    Def: function () {
                        return this.AccessorLoader.Load(JsBedRock.WebAppExample.DAL.Accessors.BlogPostAccessor).GetAll();
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);