JsBedRock.Compiler = JsBedRock.Compiler || {};
//
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.NodeExecutableProjectCompiler,
            Constructor: (JsBedRock.Compiler.NodeInstallerExecutableProjectCompiler = function (soultionData, solutionFile, projectData, projectFile) {
                this._Fs = new JsBedRock.Node.IO.FileSystem();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.NodeExecutableProjectCompiler, soultionData, solutionFile, projectData, projectFile);
            }),
            Members: {
				CompileProject: function () {
                    this.Base();
                    
                    this._BuildContentArchive();
                },
                _BuildContentArchive: function () {
                    var fstream = require("fstream");
                    var tar = require('tar');
                    
                    var dirDest = this._Fs.CreateWriteStream(this.__Path.dirname(this._OutputFile) + '/Content.tar');
                    var packer = tar.Pack({ noProprietary: true });
                    fstream.Reader({
                        path: this.__Path.join(this._ProjectDir, this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._ProjectData.InstallContentDirectory)),
                        type: "Directory" 
                    }).pipe(packer).pipe(dirDest);
                }
            },
            Name: 'NodeInstallerExecutableProjectCompiler',
            _Fs: null
        });
    });
})(JsBedRock.CurrentAssembly);