JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Component = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (context) {
                this._Context = context;
                this._Model = {};
                this._Service = {};
                
                //TODO: Where does this come from?
                var serviceFactory = new JsBedRock.UI.ServiceFactory();
                
                var services = this._GetServices();
                
                for(var i = 0; i < services.length; i++) {
                    var key = JsBedRock.UI.Utils.GetKeyFromServiceType(services[i]);
                    this._Service[key] = serviceFactory.GetService(services[i]);
                }
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                GetModel: function () {
                    return this._Model;
                },
                SetRenderer: function (renderer) {
                    this._Renderer = renderer;
                },
                _GetServices: function () {
                    return [];
                },
                _Service: null,
                _Context: null,
                _Renderer: null
            },
            _Model: null
        });
    });
})(JsBedRock.CurrentAssembly);