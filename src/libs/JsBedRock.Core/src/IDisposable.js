(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.IDisposable = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IDisposable",
			Members: {
				Dispose: function () {}
			}
		});
		
		JsBedRock.Using = function (disposableInstance, lambda) {
			if(disposableInstance && !JsBedRock.Utils.ObjectOriented.IsOfType(disposableInstance, JsBedRock.IDisposable))
				JsBedRock.Console.Error("Non Disposable Object In Using.");
				
			try {
				return lambda(disposableInstance);
			} finally {
				disposableInstance.Dispose();
			}
		};
    });
})(JsBedRock.CurrentAssembly);