JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.IO = JsBedRock.Node.IO || {};

//JsBedRock.Node.IO
(function (asm) {
    asm.OnLoad(function () {
		//Private Static fs object.
		
        JsBedRock.Node.IO.FileSystem = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
				this.__FS = require('fs');
				
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				ReadFileSync: {
					Def: function (fileName) {
						return this.__FS.readFileSync(fileName);
					}
				},
				WriteFileSync: {
					Def : function (fileName, data) {
						return this.__FS.writeFileSync(fileName, data);
					}
				},
				ReadFile: {
					Def: function (fileName, callback) {
						return this.__FS.readFile(fileName, callback);
					}
				},
				MkDir: {
					Def: function (path, callback) {
						this.__FS.mkdir(path, callback);
					}
				},
				MkDirSync: {
					Def: function (path) {
						this.__FS.mkdirSync(path);
					}
				},
				DirectoryExistsSync: {
					Def: function (path) {
						try {
							var stats = this.__FS.lstatSync(path);
							return stats.isDirectory();
						}
						catch (e) {
							return false;
						}
					}
				},
				FileExistsSync: {
					Def: function (path) {
						try{
							return this.__FS.statSync(path).isFile();
						}catch(err){
							return false;
						}
					}
				},
				CopyFile: {
					Def: function (fileFrom, fileTo) {
						this.WriteFileSync(fileTo, this.ReadFileSync(fileFrom).toString());
					}
				},
				Rename: {
					Def: function (oldName, newName) {
						this.__FS.renameSync(oldName, newName);
					}
				},
				RenameAsync: {
					Def: function (oldName, newName, callback) {
						this.__FS.rename(oldName, newName, function (err) {
							callback(err);
						});
					}
				},
				Delete: {
					Def: function(file, callback) {
						this.__FS.unlinkSync(file, callback);
					}
				},
				DeleteSync: {
					Def: function(file) {
						this.__FS.unlinkSync(file);
					}
				},
				CreateReadStream: {
					Def: function (file) {
						return this.__FS.createReadStream(file);
					}
				},
				CreateWriteStream: {
					Def: function (file) {
						return this.__FS.createWriteStream(file);
					}
				},
				__FS: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);