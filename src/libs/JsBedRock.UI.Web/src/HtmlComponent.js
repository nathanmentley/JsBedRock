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
                    
                    watch(this._Model, function(prop, action, newvalue, oldvalue){
                        self.Refresh();
                    });
                },
                Render: function () {
                    var self = this;
                    this.__ListenerRefreshQueue.Add(function () { self._InitListeners(); });
                    
                    return new Handlebars.SafeString(this.Base());
                },
                Refresh: function () {
                    var ret = this.Base();
                    
                    $("#" + this.GetDivID()).replaceWith(ret.toString());
                    
                    this.__ListenerRefreshQueue.ForEach(function (x) { x(); });
                    this.__ListenerRefreshQueue.Clear();
                    
                    this._Renderer.ClearUnusedCachedComponents();
                    
                    return ret;
                },
                GetDivID: function () {
                    return "JsBedRockComponent_" + this.ObjectGuid.ToString();
                },
                _InitListeners: function() {
                    
                },
                __ListenerRefreshQueue: new JsBedRock.Collections.List()
            }
        });
    });
})(JsBedRock.CurrentAssembly);