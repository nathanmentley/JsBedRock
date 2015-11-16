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
                },
                //Controller
                Init: function () {
                    var self = this;
                    
                    this.Base();
                    
                    this._Service.Blog.GetPosts(function (postData) {
                        postData.ForEach(function (x) {    
                            self._Children.Add(
                                self._ComponentFactory.GetComponent(JsBedRock.Components.Blog.BlogPostComponent, { TargetId: "#blogpost_" + x.ID, PostData: x })
                            );
                            self._Model.Posts.push({ ID: x.ID });
                        });
                    });
                },
                //View
                _GetTemplate: function () { //ViewUI
                    return '\
                        <div class="blogWall">\
                        {{#each Posts}}\
                            <div id="blogpost_{{ID}}"></div>\
                        {{/each}}\
                        </div>';
                },
                _InitListeners: function () { //ViewLogic
                    var self = this;
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);