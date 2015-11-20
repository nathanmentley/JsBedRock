JsBedRock.Components = JsBedRock.Components || {};
JsBedRock.Components.Blog = JsBedRock.Components.Blog || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Components.Blog.BlogWallComponent = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Web.HtmlComponent,
            Constructor: function (context, renderer, componentFactory) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Web.HtmlComponent, context, renderer, componentFactory);
            },
            Members: {
                Name: "BlogWall",
                //DI
                _GetServices: function() {
                    return [ JsBedRock.Services.BlogService ];
                },
                //Model
                _BuildModel: function () {
                    this._Model.Posts = [];
                    this._Model.BlogPostModel = new JsBedRock.Types.Object();
                },
                //Controller
                Init: function () {
                    var self = this;
                    
                    this.Base();
                    
                    this._Service.Blog.GetPosts(function (postData) {
                        postData.ForEach(function (x) {
                            self._Model.Posts.push({ ID: x.ID });
                        });
                    });
                },
                //View
                _GetTemplate: function () { //ViewUI
                    return '\
                        <div class="blogWall">\
                            <div id="blogpost">test {{BlogPost Model.BlogPostModel}}</div>\
                        </div>';
                },
                _InitListeners: function () { //ViewLogic
                    var self = this;
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);