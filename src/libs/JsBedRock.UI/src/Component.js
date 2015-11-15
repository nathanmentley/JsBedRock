JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Component = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (context, renderer) {
                this._Renderer = renderer;
                this._Context = context;
                this._Service = {};
                
                var serviceFactory = new JsBedRock.UI.ServiceFactory();
                
                var services = this._GetServices();
                
                for(var i = 0; i < services.length; i++) {
                    var key = JsBedRock.UI.Utils.GetKeyFromServiceType(services[i]);
                    this._Service[key] = serviceFactory.GetService(services[i]);
                }
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Init: function () {
                    
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
                _Model: {}
            }
        });
    });
})(JsBedRock.CurrentAssembly);