(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Promise = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
				this._SuccessCallbacks = new JsBedRock.Collections.List();
				this._ErrorCallbacks = new JsBedRock.Collections.List();
				this._Resolved = false;
				this._WasSuccessful = true;
            },
            Members: {
				Success: {
					Def: function(callback) {
						if(!this._Resolved) {
							this._SuccessCallbacks.Add(callback);
						} else {
							if(this._WasSuccessful)
								callback(this._Data);
						}
						
						return this;
					}
				},
				Error: {
					Def: function(callback) {
						if(!this._Resolved) {
							this._ErrorCallbacks.Add(callback);
						} else {
							if(!this._WasSuccessful)
								callback(this._Data);
						}
						
						return this;
					}
				},
				Resolve: {
					Def: function (data) {
						this._Data = data;
						this._Resolved = true;
						
						this._SuccessCallbacks.ForEach(function(callback) {
							callback(data);
						});
					}
				},
				Reject: {
					Def: function (data) {
						this._Data = data;
						this._Resolved = true;
						this._WasSuccessful = false;
						
						this._ErrorCallbacks.ForEach(function(callback) {
							callback(data);
						});
					}
				},
				_SuccessCallbacks: {
					Def: null
				},
				_ErrorCallbacks: {
					Def: null
				},
				_Data: {
					Def: null	
				},
                _Resolved: {
					Def: null
				},
				_WasSuccessful: {
					Def: null
				}
            }
        });
    });
})(JsBedRock.CurrentAssembly);