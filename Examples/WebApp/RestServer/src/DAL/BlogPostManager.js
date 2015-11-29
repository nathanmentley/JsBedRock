JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.DAL = JsBedRock.WebAppExample.DAL || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.DAL.BlogPostManager = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                GetBlogPosts: {
                    Def: function (db, callback) {
                        db.Query("SELECT id, Subject, Content FROM BlogPosts", callback);
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);