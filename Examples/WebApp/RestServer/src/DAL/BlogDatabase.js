JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.DAL = JsBedRock.WebAppExample.DAL || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.DAL.BlogDatabase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Db.MySql.MySqlEntityDatabaseBase,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(
					this,
					JsBedRock.Node.Db.MySql.MySqlEntityDatabaseBase,
                    JsBedRock.AppConfig.DbServer.Host,
                    JsBedRock.AppConfig.DbServer.User,
                    JsBedRock.AppConfig.DbServer.Password,
                    JsBedRock.AppConfig.DbServer.Database
				);
            },
            Members: {
                BlogPosts: {
                    Def: function () {
                        return this._GetQueryable(JsBedRock.WebAppExample.DAL.Models.BlogPost);
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);