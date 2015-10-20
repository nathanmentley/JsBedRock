JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDependency
(function () {
    JsBedRock.Assemblies.AssemblyDependency = function (overrides) {
        var context = this;
        var PrivateMembers = {
            Defaults: {
                Name: '',
                Loaded: false
            }
        };
        
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides);
        
        for(var prop in values)
            context[prop] = values[prop];
    };
})();