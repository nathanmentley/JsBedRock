JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.DAL = JsBedRock.WebAppExample.DAL || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.DAL.BlogPostManager = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.WebAppExample.DAL.BaseManager,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.WebAppExample.DAL.BaseManager);
            },
            Members: {
                GetBlogPosts: {
                    Def: function (callback) {
                        this._Db.Query("SELECT id, Subject, Content FROM BlogPosts", callback);
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);