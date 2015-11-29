(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Promise = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
				this._ResultCallbacks = new JsBedRock.Collections.List();
				this._Resolved = false;
            },
            Members: {
				Success: {
					Def: function(callback) {
						if(!this._Resolved)
							this._ResultCallbacks.Add(callback);
						else
							callback(this._Data);
					}
				},
				Resolve: {
					Def: function (data) {
						this._Data = data;
						this._Resolved = true;
						
						this._ResultCallbacks.ForEach(function(callback) {
							callback(data);
						});
					}
				},
				_ResultCallbacks: {
					Def: null
				},
				_Data: {
					Def: null	
				},
                _Resolved: {
					Def: null
				}
            }
        });
    });
})(JsBedRock.CurrentAssembly);