JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Web.WebAppStart = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: {
                    Def: function () {
                        this._Renderer = new JsBedRock.UI.Web.HtmlComponentRenderer();
                        this._ServiceFactory = new JsBedRock.UI.ServiceFactory();
                        this._Router = new JsBedRock.UI.Web.WebAppRouter();
                        
                        this._CompFactory = new JsBedRock.UI.ComponentFactory(
                            this._Renderer,
                            this._ServiceFactory
                        );
                        this._CompFactory.Init();
                        this._Router.LoadRoutes(this.GetRoutes());
                        
                        var self = this;
                        $(document).ready(function () {
                            self._SetPage();
                        });
                    }
                },
                GetRoutes: {
                    Def: function () {
                        var ret = new JsBedRock.Collections.Dictionary();
                        
                        return ret;
                    }
                },
                _SetPage: {
                    Def: function () {
                        var routingResult = this._Router.ParseRouteResult();
                        
                        document.getElementById("AppBody").innerHTML = 
                            this._CompFactory.GetComponent(routingResult.Component, routingResult.Context).Refresh();
                    }
                },
                _CompFactory: { Def: null },
                _ServiceFactory: { Def: null },
                _Renderer: { Def: null },
                _Router: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);