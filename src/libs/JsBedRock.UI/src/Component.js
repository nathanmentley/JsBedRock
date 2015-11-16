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
                this._Children = new JsBedRock.Collections.List();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: "",
                Init: function () {
                    var services = this._GetServices();
                    
                    for(var i = 0; i < services.length; i++) {
                        var key = JsBedRock.UI.Utils.GetKeyFromServiceType(services[i]);
                        this._Service[key] = this._ComponentFactory.GetServiceFactory().GetService(services[i]);
                    }
                    
                    this._BuildModel();
                },
                Render: function () {
                    this._Renderer.Render(this._GetTemplate(), this._GetModel(), this._Context);
                    
                    this._Children.ForEach(function (x) {
                        x.Render();
                    });
                },
                _BuildModel: function () {
                },
                _GetServices: function () {
                    return [];
                },
                _GetTemplate: function () {
                    return "";
                },
                _GetModel: function () {
                    return this._Model;
                },
                _Service: null,
                _Context: null,
                _Children: null,
                _Renderer: null,
                _ComponentFactory: null,
                _Model: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);