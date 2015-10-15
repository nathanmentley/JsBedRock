window.JsBedRock = window.JsBedRock || {};
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
                    return this.__Values;
                },
				Add: function (key, item) {
                    this.__Values[key] = item;
                },
				Clear: function () {
                    this.__Values = {};
                },
				Contains: function (key) {
                    return (key in this.__Values)
                },
				Get: function (key) {
                    return this.__Values[key];
                },
				Remove: function (key) {
                    delete this.__Values[key];
                },
                __Values: null
            },
            Implements: [
                JsBedRock.Collections.IEnumerable,
                JsBedRock.Collections.IDictionary
            ]
        });
    });
})(JsBedRock.CurrentAssembly);