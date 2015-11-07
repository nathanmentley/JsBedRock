JsBedRock.Compiler = JsBedRock.Compiler || {};
//
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.NodeExecutableProjectCompiler,
            Constructor: (JsBedRock.Compiler.NodeInstallerExecutableProjectCompiler = function (soultionData, solutionFile, projectData, projectFile) {
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
                    var fs = require('fs');
                    //var zlib = require('zlib');
                    
                    var dirDest = fs.createWriteStream(this.__Path.dirname(this._OutputFile) + '/Content.tar');
                    var packer = tar.Pack({ noProprietary: true });
                    fstream.Reader({
                        path: this.__Path.join(this._ProjectDir, this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._ProjectData.InstallContentDirectory)),
                        type: "Directory" 
                    }).pipe(packer).pipe(dirDest);
                    
                    //var gzip = zlib.createGzip();
                    //var inp = fs.createReadStream('dir.tar');
                    //var out = fs.createWriteStream('dir.tar.gz');
                    //inp.pipe(gzip).pipe(out);
                }
            },
            Name: 'NodeInstallerExecutableProjectCompiler'
        });
    });
})(JsBedRock.CurrentAssembly);