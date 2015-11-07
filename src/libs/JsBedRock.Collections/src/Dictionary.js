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