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
				ReadFileSync: function (fileName) {
					return this.__FS.readFileSync(fileName);
				},
				WriteFileSync: function (fileName, data) {
					return this.__FS.writeFileSync(fileName, data);
				},
				ReadFile: function (fileName, callback) {
					return this.__FS.readFile(fileName, callback);
				},
				MkDir: function (path, callback) {
					this.__FS.mkdir(path, callback);
				},
				MkDirSync: function (path) {
					this.__FS.mkdirSync(path);
				},
				DirectoryExistsSync: function (path) {
					try {
						var stats = this.__FS.lstatSync(path);
						return stats.isDirectory();
					}
					catch (e) {
						return false;
					}
				},
				CopyFile: function (fileFrom, fileTo) {
					this.WriteFileSync(fileTo, this.ReadFileSync(fileFrom).toString());
				},
				Rename: function (oldName, newName) {
					this.__FS.renameSync(oldName, newName);
				},
				RenameAsync: function (oldName, newName, callback) {
					this.__FS.rename(oldName, newName, function (err) {
						callback(err);
					});
				},
				__FS: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);