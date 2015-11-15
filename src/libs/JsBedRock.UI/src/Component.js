JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Component = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (context, renderer, componentFactory) {
                this._Renderer = renderer;
                this._ComponentFactory = componentFactory;
                this._Context = context;
                this._Service = {};
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: "",
                Init: function () {
                    //How do we define what Service Factory we should be using? Should each comp have it's own? that makes no sense.
                    var serviceFactory = new JsBedRock.UI.ServiceFactory();
                    serviceFactory.Init();
                    
                    var services = this._GetServices();
                    
                    for(var i = 0; i < services.length; i++) {
                        var key = JsBedRock.UI.Utils.GetKeyFromServiceType(services[i]);
                        this._Service[key] = serviceFactory.GetService(services[i]);
                    }
                },
                Render: function () {
                    return this._Renderer.Render(this._GetTemplate(), this._GetModel(), this._Context);
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
                _Renderer: null,
                _ComponentFactory: null,
                _Model: {}
            }
        });
    });
})(JsBedRock.CurrentAssembly);