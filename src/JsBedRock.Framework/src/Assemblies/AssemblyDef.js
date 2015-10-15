window.JsBedRock = window.JsBedRock || {};
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDef
(function () {
    JsBedRock.Assemblies.AssemblyDef = function (name, dependencies) { 
        var PrivateMembers = {
        };
        var context = this;
        
        this.Name = name;
        this.Dependencies = dependencies;
        this.Callbacks = [];
        
        this.OnLoad = function(callback) {
            context.Callbacks.push(callback);
        };
        
        JsBedRock.CurrentAssembly = this;
    };
})();