window.JsBedRock = window.JsBedRock || {};
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDef
(function () {
    JsBedRock.Assemblies.AssemblyDef = function (overrides) {
        var PrivateMembers = {
            Defaults: {
                Name: '',
                Dependencies: [],
                Callbacks: []
            }
        };
        var context = this;
        
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides);
        
        for(var prop in values)
            this[prop] = values[prop];

        this.OnLoad = function(callback) {
            context.Callbacks.push(callback);
        };
        
        JsBedRock.CurrentAssembly = this;
    };
})();