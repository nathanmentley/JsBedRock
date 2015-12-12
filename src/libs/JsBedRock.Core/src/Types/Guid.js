JsBedRock.Types = JsBedRock.Types || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Types.Guid = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.Clear();
            },
            Members: {
                Equals: {
                    Def: function (otherGuid) {
                        return (this.ToString() === otherGuid.ToString());
                    }
                },
                Clear: {
                    Def: function () {
                        this._Values = [];
                        
                        for(var i  = 0; i < 8; i++) {
                            this._Values.push("0000");
                        }
                        
                        this._Values[3] = "4" + this._Values[3].substr(0,3);
                    }
                },
                Generate: {
                    Def: function () {
                        this._Values = [];
                        
                        for(var i  = 0; i < 8; i++) {
                            this._Values.push(this._GeneratePartial());
                        }
                        
                        this._Values[3] = "4" + this._Values[3].substr(0,3);
                    }
                },
				ToString: { 
                    Def: function () {
                        return (this._Values[0] + this._Values[1] + "-" + this._Values[2] + "-" + this._Values[3] + "-" + this._Values[4] + "-" + this._Values[5] + this._Values[6] + this._Values[7]).toLowerCase();
                    }
                },
                FromString: {
                    Def: function (str) {
                        this.Clear();
                        
                        var data = str.toLowerCase().replace("-", "");
                        
                        for(var i  = 0; i < 8; i++) {
                            this._Values[i] = data.substr(i * 4, 4);
                        }
                    }
                },
                _GeneratePartial: {
                    Def: function () {
                        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
                    }
                },
                _Values: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);