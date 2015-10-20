JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.TempFile = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (content) {
                this.__FileSystem = new JsBedRock.Node.IO.FileSystem();
                this.__FileName = this.__CreateFileName();
                this._WriteFile(content);
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				_WriteFile: function (content) {
					this.__FileSystem.WriteFileSync(this.__FileName, content);
				},
				_CleanUpFile: function () {
					this.__FileSystem.DeleteSync(this.__FileName);
				},
				GetFileName: function () {
					return this.__FileName;
				},
                __CreateFileName: function () {
                    return __dirname + "\\" + (Math.random().toString(36)+'00000000000000000').slice(2, 12) + ".temp";
                },
				__FileSystem: null,
				__FileName: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);