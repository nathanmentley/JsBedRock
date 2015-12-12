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
				GetEnumerator: {
                    Def: function () {
                        return this._Values;
                    }
                },
				Add: {
                    Def: function (item) {
                        this._Values.push(item);
                    }
                },
				Clear: {
                    Def: function () {
                        this._Values = [];
                    }
                },
				Count: {
                    Def: function () {
                        return this._Values.length;
                    }
                },
				Contains: {
                    Def: function (item) {
                        return this._Values.indexOf(item) !== -1;
                    }
                },
				IndexOf: {
                    Def: function (item) {
                        return this._Values.indexOf(item);
                    }
                },
				Insert: {
                    Def: function (index, item) {
                        this._Values.splice(index, 0, item);
                    }
                },
				Remove: {
                    Def: function (item) {
                        if(this.Contains(item))
                            this.RemoveAt(this.IndexOf(item));
                    }
                },
				RemoveAt: {
                    Def: function (index) {
                        this._Values.splice(index, 1);
                    }
                },
				ForEach: {
                    Def: function (lambda) {
                        for(var i = 0; i < this._Values.length; i++)
                            lambda(this._Values[i]);
                    }
                },
                _Values: { Def: null }
            },
            Implements: [
                JsBedRock.Collections.IEnumerable,
                JsBedRock.Collections.IList
            ]
        });
    });
})(JsBedRock.CurrentAssembly);