(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this._Tar = require('tar');
                this._Fs = require('fs');
                    
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    process.env.JSBEDROCK_FRAMEWORK_PATH = "/home/nathan/Documents/JsBedRockInstall";
                    
                    JsBedRock.Console.Write("Installing JsBedRock Version [" + JsBedRock.FrameworkVersion + "] to " + process.env.JSBEDROCK_FRAMEWORK_PATH);
                    
                    var extract = this._Tar.Extract({
                        path: process.env.JSBEDROCK_FRAMEWORK_PATH
                    });
                    
                    this._Fs.createReadStream(__dirname + "/Content.tar").pipe(extract);
                },
                _Tar: null,
                _Fs: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);