window.JsBedRock = window.JsBedRock || {};
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
				Contains: function (item) {
                    return this.__Values.indexOf(item) !== -1;
                },
				IndexOf: function (item) {
                    return this.__Values.indexOf(item);
                },
				Insert: function (index, item) {
                    this.__Values.splice(index, 0, item);
                },
				Remove: function (item) {
                    if(this.Contains(item))
                        this.RemoveAt(this.IndexOf(item));
                },
				RemoveAt: function (index) {
                    this.__Values.splice(index, 1);
                },
                __Values: null
            },
            Implements: [
                JsBedRock.Collections.IEnumerable,
                JsBedRock.Collections.IList
            ]
        });
    });
})(JsBedRock.CurrentAssembly);