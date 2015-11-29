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
                        var promise = new JsBedRock.Promise();
                        
                        var blogManager = new JsBedRock.WebAppExample.DAL.BlogPostManager();
                        blogManager._Init();
                        
                        blogManager.GetBlogPosts().Success(function (data) {
                            promise.Resolve(new JsBedRock.Models.GetPostDataResult("Data From Rest Server - " + data.GetEnumerator()[0].Subject));
                        }).Error(function (data) {
                            promise.Resolve(new JsBedRock.Models.GetPostDataResult("Data From Rest Server - DB Error"));
                        });
                        
                        blogManager._Deinit();
                        
                        return promise;
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);