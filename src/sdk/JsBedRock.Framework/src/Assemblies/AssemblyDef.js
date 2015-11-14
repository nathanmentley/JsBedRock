JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDef
(function () {
    JsBedRock.Assemblies.AssemblyDef = function (overrides) {
        var context = this;
        var PrivateMembers = {
            Defaults: {
                Name: '',
                Loaded: false,
                Dependencies: [],
                Callbacks: [],
                Classes: [],
                OnLoad: function(callback) {
                    context.Callbacks.push(callback);
                }
            }
        };
        
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides);
        
        for(var prop in values)
            context[prop] = values[prop];
        
        JsBedRock.CurrentAssembly = this;
    };
})();