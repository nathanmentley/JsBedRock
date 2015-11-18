JsBedRock.Types = JsBedRock.Types || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Types.Guid = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.Clear();
            },
            Members: {
                Equals: function (otherGuid) {
                    return (this.ToString() === otherGuid.ToString());
                },
                Clear: function () {
                    this._Values = [];
                    
                    for(var i  = 0; i < 8; i++) {
                        this._Values.push("0000");
                    }
                    
                    this._Values[3] = "4" + this._Values[3].substr(0,3);
                },
                Generate: function () {
                    this._Values = [];
                    
                    for(var i  = 0; i < 8; i++) {
                        this._Values.push(this._GeneratePartial());
                    }
                    
                    this._Values[3] = "4" + this._Values[3].substr(0,3);
                },
				ToString: function () {
                    return (this._Values[0] + this._Values[1] + "-" + this._Values[2] + "-" + this._Values[3] + "-" + this._Values[4] + "-" + this._Values[5] + this._Values[6] + this._Values[7]).toLowerCase();
                },
                FromString: function (str) {
                    this.Clear();
                    
                    var data = str.toLowerCase().replace("-", "");
                    
                    for(var i  = 0; i < 8; i++) {
                        this._Values[i] = data.substr(i * 4, 4);
                    }
                },
                _GeneratePartial: function () {
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
                },
                _Values: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);