(function (asm) {
    asm.OnLoad(function () {
        QUnit.test("JsBedRock.Collections.List tests", function (assert) {
            var list = new JsBedRock.Collections.List();
            var list2 = new JsBedRock.Collections.List();
            
            assert.equal(list.Count(), 0, "Console Debugging Turns On");
            assert.equal(list2.Count(), 0, "Console Debugging Turns On");
            
            list.Add("test");
            list.Add("test1");
            list.Add("test2");
            list.Add("test3");
            
            list2.Add("test");
            list2.Add("test1");
            list2.Add("test2");
            list2.Add("test3");
            list2.Add("test4");
            
            assert.equal(list.Count(), 4, "Console Debugging Turns On");
            assert.equal(list2.Count(), 5, "Console Debugging Turns On");
            
            assert.equal(list.IndexOf("test1"), 1);
            assert.equal(list.Remove("test1"));
            assert.equal(list.IndexOf("test2"), 1);
            assert.equal(list2.IndexOf("test2"), 2);
        });
    });
})(JsBedRock.CurrentAssembly);