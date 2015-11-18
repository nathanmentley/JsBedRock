JsBedRock.Components = JsBedRock.Components || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Components.HomePageComponent = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Web.HtmlComponent,
            Constructor: function (context, renderer, componentFactory) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Web.HtmlComponent, context, renderer, componentFactory);
            },
            Members: {
                Name: "HomePage",
                //DI
                _GetServices: function() {
                    return [ JsBedRock.Services.LayoutService ];
                },
                //Model
                _BuildModel: function () {
                    this._Model.Title = "";
                    this._Model.BlogWallModel = new JsBedRock.Types.Object();
                },
                //Controller
                Init: function () {
                    this.Base();
                    
                    var self = this;
                    this._Service.Layout.GetNavData(function (navData) {
                        self._Model.Title = navData.Value1 + " " + navData.Value2;
                    });
                },
                //View
                _GetTemplate: function () { //ViewUI
                    return '\
                        <div class="maincontianer">\
                            <h1 id="testTitleId">{{Title}}</h1>\
                            <div id="blogBodyId">{{BlogWall BlogWallModel}}</div>\
                        </div>';
                },
                _InitListeners: function () { //ViewLogic
                    var self = this;
                    
                    $("#testTitleId").click(function () {
                        self._Model.Title = self._Model.Title + "1";
                    });
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);