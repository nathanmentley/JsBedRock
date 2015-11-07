(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this._Fs = new JsBedRock.Node.IO.FileSystem();
                this._Tar = require("tar");
                    
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    process.env.JSBEDROCK_FRAMEWORK_PATH = "/usr/lib/JsBedRock";
                    JsBedRock.Console.Write("Installing JsBedRock Version [" + JsBedRock.FrameworkVersion + "]");
                    
                    this._Fs.CreateReadStream(__dirname + "/Content.tar").pipe(this._Tar.Extract({
                        path: process.env.JSBEDROCK_FRAMEWORK_PATH
                    }));
                    
                    this._Fs.WriteFileSync("/etc/profile.d/JsBedRock.sh", "export JSBEDROCK_FRAMEWORK_PATH='" + process.env.JSBEDROCK_FRAMEWORK_PATH + "/'");
                },
                _Tar: null,
                _Fs: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);