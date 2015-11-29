JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.Controllers = JsBedRock.WebAppExample.Controllers || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.Controllers.BlogController = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.WebAppExample.Controllers.BaseController,
            Constructor: function (request, response) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.WebAppExample.Controllers.BaseController, request, response);
            },
            Members: {
                Name: {
                    Def: 'Blog'
                },
                Data: {
                    Attributes: [
                        new JsBedRock.Node.Web.Rest.ResponseTypeAttribute(JsBedRock.Models.GetPostDataRequest)
                    ],
                    Def: function (request) {
                        
                        this._Db = new JsBedRock.Node.Db.MySql.MySqlConnection(
                            JsBedRock.AppConfig.DbServer.Host,
                            JsBedRock.AppConfig.DbServer.User,
                            JsBedRock.AppConfig.DbServer.Password,
                            JsBedRock.AppConfig.DbServer.Database
                        );
                        this._Db.Connect();
                        
                        var promise = new JsBedRock.Promise();
                        
                        (new JsBedRock.WebAppExample.DAL.BlogPostManager()).GetBlogPosts(this._Db, function (err, rows, fields) {
                            promise.Resolve(new JsBedRock.Models.GetPostDataResult("Data From Rest Server - " + rows[0].Subject));
                        });
                        
                        this._Db.Disconnect();
                        
                        return promise;
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);