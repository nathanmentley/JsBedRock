
;
(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Collections',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Core'
			})
		]
	});
})();
;
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Collections.IEnumerable = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IEnumerable",
			Members: {
				GetEnumerator: function () { },
			}
		});
	});
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Collections.IList = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IList",
			Members: {
				Add: function (item) { },
				Clear: function () { },
				Count: function () { },
				Contains: function (item) { },
				IndexOf: function (item) { },
				Insert: function (index, item) { },
				Remove: function (item) { },
				RemoveAt: function (index) { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.List = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.Clear();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				GetEnumerator: function () {
                    return this._Values;
                },
				Add: function (item) {
                    this._Values.push(item);
                },
				Clear: function () {
                    this._Values = [];
                },
				Count: function () {
                    return this._Values.length;
                },
				Contains: function (item) {
                    return this._Values.indexOf(item) !== -1;
                },
				IndexOf: function (item) {
                    return this._Values.indexOf(item);
                },
				Insert: function (index, item) {
                    this._Values.splice(index, 0, item);
                },
				Remove: function (item) {
                    if(this.Contains(item))
                        this.RemoveAt(this.IndexOf(item));
                },
				RemoveAt: function (index) {
                    this._Values.splice(index, 1);
                },
                _Values: null
            },
            Implements: [
                JsBedRock.Collections.IEnumerable,
                JsBedRock.Collections.IList
            ]
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Collections.IDictionary = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IDictionary",
			Members: {
				Add: function (key, item) { },
				Clear: function () { },
				Contains: function (key) { },
				Get: function (key) { },
				Remove: function (key) { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Dictionary = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.Clear();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				GetEnumerator: function () {
                    return this._Values;
                },
				Add: function (key, item) {
                    this._Values[key] = item;
                },
				Clear: function () {
                    this._Values = {};
                },
				Contains: function (key) {
                    return (key in this._Values)
                },
				Get: function (key) {
                    return this._Values[key];
                },
				Remove: function (key) {
                    delete this._Values[key];
                },
                _Values: null
            },
            Implements: [
                JsBedRock.Collections.IEnumerable,
                JsBedRock.Collections.IDictionary
            ]
        });
    });
})(JsBedRock.CurrentAssembly);
;
(function(asm) {
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);