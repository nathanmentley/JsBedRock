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
				GetEnumerator: {
                    Def: function () {
                        return this._Values;
                    }
                },
				Add: {
                    Def: function (key, item) {
                        this._Values[key] = item;
                    }
                },
				Clear: {
                    Def: function () {
                        this._Values = {};
                    }
                },
				Contains: {
                    Def: function (key) {
                        return (key in this._Values)
                    }
                },
				Get: {
                    Def: function (key) {
                        return this._Values[key];
                    }
                },
				Remove: {
                    Def: function (key) {
                        delete this._Values[key];
                    }
                },
                ToList: {
                    Def: function () {
                        var ret = new JsBedRock.Collections.List();
                        
                        for(var prop in this.GetEnumerator())
                            ret.Add(this.Get(prop));
                        
                        return ret;
                    }
                },
				ForEach: {
                    Def: function (lambda) {
                        for(var prop in this.GetEnumerator())
                            lambda(prop, this.Get(prop));
                    }
                },
                _Values: { Def: null }
            },
            Implements: [
                JsBedRock.Collections.IEnumerable,
                JsBedRock.Collections.IDictionary
            ]
        });
    });
})(JsBedRock.CurrentAssembly);