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
                    JsBedRock.Console.Write("Installing JsBedRock Version [" + JsBedRock.FrameworkVersion + "]");
                    
                    this.ParseParameters();
                    this.UnpackContent();
                    this.SetEnviormentVariables();
                    
                    JsBedRock.Console.Write("Installation Complete - JsBedRock Version [" + JsBedRock.FrameworkVersion + "]");
                },
                ParseParameters: function () {
                    this._InstallLocation = "/usr/lib/JsBedRock";
                },
                UnpackContent: function () {
                    this._Fs.CreateReadStream(__dirname + "/Content.tar").pipe(
                        this._Tar.Extract({
                            path: this._InstallLocation
                        })
                    );
                },
                SetEnviormentVariables: function () {
                    process.env.JSBEDROCK_FRAMEWORK_PATH = this._InstallLocation;
                    
                    this._Fs.WriteFileSync(
                        "/etc/profile.d/JsBedRock.sh",
                        "export JSBEDROCK_FRAMEWORK_PATH='" + this._InstallLocation + "/'"
                    );
                },
                _InstallLocation: null,
                _Tar: null,
                _Fs: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);