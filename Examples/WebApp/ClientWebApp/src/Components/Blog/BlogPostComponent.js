JsBedRock.Components = JsBedRock.Components || {};
JsBedRock.Components.Blog = JsBedRock.Components.Blog || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Components.Blog.BlogPostComponent = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Web.HtmlComponent,
            Constructor: function (context, renderer, componentFactory) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Web.HtmlComponent, context, renderer, componentFactory);
            },
            Members: {
                Name: { Def: "BlogPost" },
                //DI
                _GetServices: {
                    Def: function() {
                        return [ JsBedRock.Services.BlogService ];
                    }
                },
                //Model
                _BuildModel: {
                    Def: function () {
                        this._Model.ID = "test";
                        this._Model.Title = "<p>test</p>";
                        this._Model.Body = "test";
                    }
                },
                //Controller
                Init: {
                    Def: function () {
                        var self = this;
                        this.Base();
                        
                        this._Service.Blog.GetPostData("testId", function (postData) {
                            self._Model.Body = postData.BodyText;
                        });
                    }
                },
                //View
                _GetTemplate: {
                    Def: function () { //ViewUI
                        return '\
                            <div class="entry">\
                                <h2 id="testTitleId{{Model.ID}}">{{Model.Title}}</h2>\
                                <div id="testBodyId{{Model.ID}}" class="body">{{Model.Body}}</div>\
                            </div>';
                    }
                },
                _InitListeners: {
                    Def: function () { //ViewLogic
                        var self = this;
                        
                        $("#testBodyId" + self._Model.ID).click(function () {
                            self._Model.Body = self._Model.Body + "2";
                        });
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);