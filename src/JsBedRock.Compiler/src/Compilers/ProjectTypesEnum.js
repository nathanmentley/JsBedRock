JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.ProjectTypes = {
            Assets: "Assets",
            Flat: "Flat",
            ClassLibrary: "ClassLibrary",
            TestRunner: "TestRunner",
            BrowserExecutable: "BrowserExecutable",
            NodeExecutable: "NodeExecutable"
        };
	});
})(JsBedRock.CurrentAssembly);