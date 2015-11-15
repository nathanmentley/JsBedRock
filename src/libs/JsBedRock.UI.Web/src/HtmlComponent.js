JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Web.HtmlComponent = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.UI.Component,
            Constructor: function (context, renderer, componentFactory) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Component, context, renderer, componentFactory);
            },
            Members: {
                Name: "",
                Init: function () {
                    var self = this;
                    this.Base();
                    
                    watch(this._Model, function(){
                        self.Render();
                    });                    
                },
                Render: function () {
                    var ret = this.Base();
                    
                    this._InitListeners();
                    
                    return ret;
                },
                _InitListeners: function() {
                    
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);