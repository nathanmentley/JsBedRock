window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.List = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.__Values = [];
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				GetEnumerator: function () {
                    return this.__Values;
                },
				Add: function (item) {
                    this.__Values.push(item);
                },
				Clear: function () {
                    this.__Values = [];
                },
				Count: function () {
                    return this.__Values.length;
                },
				Contains: function (item) { },
				IndexOf: function (item) { },
				Insert: function (index, item) { },
				Remove: function (item) { },
				RemoveAt: function (index) { },
                __Values: null
            },
            Implements: [
                JsBedRock.Collections.IEnumerable,
                JsBedRock.Collections.IList
            ]
        });
    });
})(JsBedRock.CurrentAssembly);