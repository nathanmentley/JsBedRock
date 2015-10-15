window.JsBedRock = window.JsBedRock || {};
JsBedRock.Types = JsBedRock.Types || {};

//JsBedRock.Types
(function (asm) {
	asm.OnLoad(function () {
        JsBedRock.Types.Object = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                /// <summary>Base Object Type. All JsBedRock Object Types must Inherit from this object.</summary>
                var context = this;
                //Safe on document ready.
                if (document.readyState) {
                    this.Init();
                } else {
                    document.addEventListener('DOMContentLoaded', function() {
                        context.Init();
                    });
                }
            },
            Implements: [
                JsBedRock.Types.Interface
            ],
            Members: {
                Base: function () {
                    /// <summary>Executes the inherited class def's implementation of the current method</summary>
                    /// <param name="param[]" type="any">Any parameters for the base method should be included as parameters on this method call.</param>
        
                    //Since we only have the method definition of the calling method... We'll have to cycle through the intstance to get the method name.
                    var methodName = JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(this, arguments.callee.caller);
        
                    //Create these hidden props if they don't exist.
                    this.__InheritanceMethodDepth = this.__InheritanceMethodDepth || {};
                    this.__InheritanceChain = this.__InheritanceChain || [];
                    this.__InheritanceMethodDepth[methodName] = this.__InheritanceMethodDepth[methodName] || this.__InheritanceChain.length;
        
                    //We're now looking for a method that's one more step down the inheritance chain.
                    this.__InheritanceMethodDepth[methodName]--;
        
                    //If we find the method, but it has the same def as the method we just executed... we don't want to re-execute.
                    // So we'll keep jumping down until we find the overriden method.
                    while (this.__InheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName] === arguments.callee.caller || !this.__InheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName])
                        this.__InheritanceMethodDepth[methodName]--;
        
                    //call the overriden method.
                    var ret = this.__InheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName].apply(this, arguments);
        
                    //Now that's it's been executed let's jump back up to the correct inheritance chain level.
                    this.__InheritanceMethodDepth[methodName]++;
        
                    //If the method has the same definition we'll need to keep jumping up.
                    while (this.__InheritanceMethodDepth[methodName] + 1 < this.__InheritanceDepth && this.__InheritanceChain[this.__InheritanceMethodDepth[methodName] + 1].prototype[methodName] === arguments.callee.caller)
                        this.__InheritanceMethodDepth[methodName]++;
        
                    return ret;
                },
                Init: function () {
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);