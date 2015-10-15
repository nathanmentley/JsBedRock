(function (asm) {
    asm.OnLoad(function () {
        QUnit.test("JsBedRock.Collections.Hidden.List tests", function (assert) {
            var list = new JsBedRock.Collections.Generic.List1();
            
            assert.equal(list.IsDebuggingOn(), "List1", "Console Debugging Turns On");
        });
    });
})(JsBedRock.CurrentAssembly);