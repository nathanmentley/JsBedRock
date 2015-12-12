JsBedRock.Types = JsBedRock.Types || {};

//JsBedRock.Types
(function (asm) {
	asm.OnLoad(function () {
        JsBedRock.Types.Object = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                /// <summary>Base Object Type. All JsBedRock Object Types must Inherit from this object.</summary>
                this.ObjectGuid = new JsBedRock.Types.Guid();
                this.ObjectGuid.Generate();
            },
            Implements: [
                JsBedRock.Types.Interface
            ],
            Members: {
                Base: {
                    Def: function () {
                        /// <summary>Executes the inherited class def's implementation of the current method</summary>
                        /// <param name="param[]" type="any">Any parameters for the base method should be included as parameters on this method call.</param>
            
                        //Since we only have the method definition of the calling method... We'll have to cycle through the intstance to get the method name.
                        var methodName = JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(this, arguments.callee.caller);
            
                        //Create these hidden props if they don't exist.
                        this.__InheritanceMethodDepth = this.__InheritanceMethodDepth || {};
                        this.__InheritanceChain = this.__InheritanceChain || [];
                        this.__InheritanceMethodDepth[methodName] = this.__InheritanceMethodDepth[methodName] || 0;
            
                        if(!this.__InheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName])
                            JsBedRock.Console.Error(methodName + " not found and could not be called from this.Base();");
            
                        //If we find the method, but it has the same def as the method we just executed... we don't want to re-execute.
                        // So we'll keep jumping down until we find the overriden method.
                        while (this.__InheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName] === arguments.callee.caller)
                            this.__InheritanceMethodDepth[methodName]++;
            
                        //call the overriden method.
                        var ret = this.__InheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName].apply(this, arguments);
            
                        //Now that's it's been executed let's jump back up to the correct inheritance chain level.
                        this.__InheritanceMethodDepth[methodName]--;
            
                        //If the method has the same definition we'll need to keep jumping up.
                        while (this.__InheritanceMethodDepth[methodName] - 1 >= 0 && this.__InheritanceChain[this.__InheritanceMethodDepth[methodName] - 1].prototype[methodName] === arguments.callee.caller)
                            this.__InheritanceMethodDepth[methodName]--;
            
                        return ret;
                    }
                },
                ToJson: {   
                    Def: function () {
                        var jsonObject = {};
                        
                        for(var prop in this){
                            if (prop.lastIndexOf('_', 0) === 0)
                                continue;
                            
                            jsonObject[prop] = this[prop];
                        }
                        
                        return JSON.stringify(jsonObject);
                    }
                },
                FromJson: {
                    Def: function (json) {
                        var obj = null;
                        
                        if (typeof json === 'string' || json instanceof String)
                            obj = JSON.parse(json);
                        else
                            obj = json;
                        
                        for(var key in obj)
                            this[key] = obj[key];
                    }
                },
                GetClassAttribute: {
                    Def: function (attributeType) {
                        return this.GetAttribute("", attributeType);
                    }
                },
                GetAttribute: {
                    Def: function (target, attributeType) {
                        if(!this.__Attributes[target])
                            return null;
                        for(var i = 0; i < this.__Attributes[target].length; i++) {
                            if(this.__Attributes[target][i])
                                if(JsBedRock.Utils.ObjectOriented.IsOfType(this.__Attributes[target][i], attributeType))
                                    return this.__Attributes[target][i];
                        }
                        return null;
                    }
                },
                ObjectGuid: { Def: null },
                __Attributes: { Def: [] }
            }
        });
    });
})(JsBedRock.CurrentAssembly);