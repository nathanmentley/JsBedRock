JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Component = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (context, renderer, componentFactory) {
                this._Renderer = renderer;
                this._ComponentFactory = componentFactory;
                this._Context = context;
                this._Service = {};
                this._Model = {};
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: { Def: "" },
                Init: {
                    Def: function () {
                        var services = this._GetServices();
                        
                        for(var i = 0; i < services.length; i++) {
                            var key = JsBedRock.UI.Utils.GetKeyFromServiceType(services[i]);
                            this._Service[key] = this._ComponentFactory.GetServiceFactory().GetService(services[i]);
                        }
                        
                        this._BuildModel();
                    }
                },
                Render: {
                    Def: function () {
                        return this._Renderer.Render(this._GetTemplate(), { Model: this._GetModel() }, this);
                    }
                },
                Refresh: {
                    Def: function () {
                        return this.Render();
                    }
                },
                _BuildModel: {
                    Def:  function () {
                    }
                },
                _GetServices: {
                    Def: function () {
                        return [];
                    }
                },
                _GetTemplate: {
                    Def: function () {
                        return "";
                    }
                },
                _GetModel: {
                    Def: function () {
                        return this._Model;
                    }
                },
                _Service: { Def: null },
                _Context: { Def: null },
                _Renderer: { Def: null },
                _ComponentFactory: { Def: null },
                _Model: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);