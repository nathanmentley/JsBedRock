JsBedRock.Components = JsBedRock.Components || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Components.HomePageComponent = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Web.HtmlComponent,
            Constructor: function (context, renderer, componentFactory) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Web.HtmlComponent, context, renderer, componentFactory);
            },
            Members: {
                Name: { Def: "HomePage" },
                //DI
                _GetServices: {
                    Def: function() {
                        return [ JsBedRock.Services.LayoutService ];
                    }
                },
                //Model
                _BuildModel: {
                    Def: function () {
                        this._Model.Title = "";
                        this._Model.BlogWallModel = new JsBedRock.Types.Object();
                    }
                },
                //Controller
                Init: {
                    Def: function () {
                        this.Base();
                        
                        var self = this;
                        this._Service.Layout.GetNavData().Success(function (navData) {
                            self._Model.Title = navData.Value1 + " " + navData.Value2;
                        });
                    }
                },
                //View
                _GetTemplate: {
                    Def: function () { //ViewUI
                        return '\
                            <div class="maincontianer">\
                                <h1 id="testTitleId">{{Model.Title}}</h1>\
                                <div id="blogBodyId">{{BlogWall Model.BlogWallModel}}</div>\
                            </div>';
                    }
                },
                _InitListeners: {
                    Def: function () { //ViewLogic
                        var self = this;
                        
                        $("#testTitleId").click(function () {
                            self._Model.Title = self._Model.Title + "1";
                        });
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);