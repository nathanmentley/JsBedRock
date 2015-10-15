(function (asm) {
    asm.OnLoad(function () {
        QUnit.test("JsBedRock.Collections.Hidden.List tests", function (assert) {
            var list = new JsBedRock.Collections.List();
            
            assert.equal(list.Count(), 0, "Console Debugging Turns On");
        });
    });
})(JsBedRock.CurrentAssembly);