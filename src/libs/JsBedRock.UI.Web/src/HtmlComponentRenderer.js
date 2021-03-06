JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.UI.Web.HtmlComponentRenderer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this._ComponentCache = new JsBedRock.UI.ComponentCache();
                this._ComponentInstanceCache = new JsBedRock.Collections.Dictionary();
                this._CompiledTemplateCache = new JsBedRock.Collections.Dictionary();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Init: {
                    Def: function (componentFactory) {
                        var self = this;
                        this._ComponentCache.PopulateCache();
                        this._ComponentFactory = componentFactory;
                        
                        for(var prop in this._ComponentCache.GetComponents()){
                            Handlebars.registerHelper(prop, this._GenerateHelperFunction(self, prop));
                        }
                    }
                },
                Render: {
                    Def: function (template, model, component) {
                        if(!this._CompiledTemplateCache.Contains(template)) {
                            this._CompiledTemplateCache.Add(template, Handlebars.compile(template));
                        }
                        
                        return this._WrapRenderedTemplate((this._CompiledTemplateCache.Get(template))(model), component);
                    }
                },
                ClearUnusedCachedComponents: {
                    Def: function () {
                        var self = this;
                        
                        this._ComponentInstanceCache.ForEach(function (key, value) {
                            if($("#" + value.GetDivID()).length === 0)
                                self._ComponentInstanceCache.Remove(key);
                        });
                    }
                },
                _WrapRenderedTemplate: {
                    Def: function (template, component) {
                        return "<div id='" + component.GetDivID() + "'>" + template + "</div>";
                    }
                },
                _GenerateHelperFunction: {
                    Def: function (self, prop) {
                        return function (model) {
                            return self._GetOrCreateComponentInstance(model.ObjectGuid.ToString(), prop, model).Render();
                        };
                    }
                },
                _GetOrCreateComponentInstance: {
                    Def: function (instanceKey, componentKey, model){
                        if(!this._ComponentInstanceCache.Contains(componentKey + "_" + instanceKey)){
                            this._ComponentInstanceCache.Add(
                                componentKey + "_" + instanceKey,
                                this._ComponentFactory.GetComponent(this._ComponentCache.GetComponentFromKey(componentKey), model)
                            );
                        }
                        return this._ComponentInstanceCache.Get(componentKey + "_" + instanceKey);
                    }
                },
                _ComponentCache: { Def: null },
                _ComponentFactory: { Def: null },
                _ComponentInstanceCache: { Def: null },
                _CompiledTemplateCache: { Def: null }
            },
            Implements: [ JsBedRock.UI.IComponentRenderer ]
        });
    });
})(JsBedRock.CurrentAssembly);