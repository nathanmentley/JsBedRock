(function (asm) {
    asm.OnLoad(function () {
        QUnit.test("JsBedRock.Collections.Hidden.List tests", function (assert) {
            var list = new JsBedRock.Collections.Hidden.List();
            
            assert.equal(list.GetName(), "List", "Console Debugging Turns On");
        });
    });
})(JsBedRock.CurrentAssembly);