JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.DAL = JsBedRock.WebAppExample.DAL || {};
JsBedRock.WebAppExample.DAL.Accessors = JsBedRock.WebAppExample.DAL.Accessors || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.DAL.Accessors.BlogPostAccessor = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Db.Accessors.AccessorBase,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Db.Accessors.AccessorBase);
            },
            Members: {
                GetAll: {
                    Def: function () {
                        return JsBedRock.Using(new JsBedRock.WebAppExample.DAL.BlogDatabase(),
                            function (db) {
                                return db.BlogPosts().Execute();
                            }
                        );
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);