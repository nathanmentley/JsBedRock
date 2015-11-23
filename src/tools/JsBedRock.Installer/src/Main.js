(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this._Fs = new JsBedRock.Node.IO.FileSystem();
                this._Tar = require("tar");
                    
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: {
                    Def: function (installerArgs) {
                        JsBedRock.Console.Write("Installing JsBedRock Version [" + JsBedRock.FrameworkVersion + "]");
                        
                        this.ParseParameters(installerArgs);
                        this.UnpackContent();
                        this.SetEnviormentVariables();
                        
                        JsBedRock.Console.Write("Installation Complete - JsBedRock Version [" + JsBedRock.FrameworkVersion + "]");
                    }
                },
                ParseParameters: {
                    Def: function (installerArgs) {
                        if(JsBedRock.Utils.String.IsEmptyOrSpaces(installerArgs.Path))
                            JsBedRock.Console.Error("Invalid Install Path.");
                            
                        this._InstallLocation = installerArgs.Path;
                    }
                },
                UnpackContent: {
                    Def: function () {
                        this._Fs.CreateReadStream(__dirname + "/Content.tar").pipe(
                            this._Tar.Extract({
                                path: this._InstallLocation
                            })
                        );
                    }
                },
                SetEnviormentVariables: {
                    Def: function () {
                        process.env.JSBEDROCK_FRAMEWORK_PATH = this._InstallLocation;
                        
                        this._Fs.WriteFileSync(
                            "/etc/profile.d/JsBedRock.sh",
                            "export JSBEDROCK_FRAMEWORK_PATH='" + this._InstallLocation + "/'"
                        );
                    }
                },
                _InstallLocation: { Def: null },
                _Tar: { Def: null },
                _Fs: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);