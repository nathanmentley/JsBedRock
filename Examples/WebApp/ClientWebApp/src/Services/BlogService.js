JsBedRock.Services = JsBedRock.Services || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Services.BlogService = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.RestClientService,
            Constructor: function (context) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.RestClientService, context);
            },
            Members: {
                Name: { Def: "Blog" },
                GetPosts: {
                    Def: function () {
                        var promise = new JsBedRock.Promise();
                        
                        var list = new JsBedRock.Collections.List();
                        
                        list.Add(new JsBedRock.Models.TestResult("1", "value one", "value too"));
                        list.Add(new JsBedRock.Models.TestResult("2", "value 1", "value 2"));
                        list.Add(new JsBedRock.Models.TestResult("3", "value ein", "value two"));
                        
                        promise.Resolve(list);
                        
                        return promise;
                    }
                },
                GetPostData: {
                    Def: function (postID) {
                        return this._Post(
                            new JsBedRock.Models.GetPostDataRequest(postID),
                            JsBedRock.Models.GetPostDataResult,
                            JsBedRock.Models.ErrorResult
                        );
                    }
                },
                _RootUrl: { Def: "http://localhost:8080" }// JsBedRock.AppConfig.ClientWebApp.RestServerUrlRoot }
            }
        });
    });
})(JsBedRock.CurrentAssembly);