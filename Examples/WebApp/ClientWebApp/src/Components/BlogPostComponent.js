JsBedRock.Components = JsBedRock.Components || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Components.BlogPostComponent = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Web.HtmlComponent,
            Constructor: function (context, renderer, componentFactory) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Web.HtmlComponent, context, renderer, componentFactory);
            },
            Members: {
                Name: "BlogPost",
                //Controller
                Init: function () {
                    this.Base();
                    
                    this._Model.Title = this._Context.PostData.Value1;
                    this._Model.Body = this._Context.PostData.Value2;
                },
                //View
                _GetTemplate: function () { //ViewUI
                    return '\
                        <div class="entry">\
                            <h2 id="testTitleId2">{{Title}}</h2>\
                            <div class="body">{{Body}}</div>\
                        </div>';
                },
                _InitListeners: function () { //ViewLogic
                    var self = this;
                    
                    $("#testTitleId2").click(function () {
                        self._Model.Title = self._Model.Title + "1";
                    });
                },
                //Model
                _Model: {
                    Title: "",
                    Body: ""
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);