(function (asm) {
    asm.OnLoad(function () {
        QUnit.test("JsBedRock.Collections.Dictionary tests", function (assert) {
            var list = new JsBedRock.Collections.Dictionary();
            var list2 = new JsBedRock.Collections.Dictionary();
            
            list.Add("test", 1);
            list.Add("test1", 2);
            list.Add("test2", 3);
            list.Add("test3", 4);
            
            list2.Add("test", 9);
            list2.Add("test1", 8);
            list2.Add("test2", 7);
            list2.Add("test3", 6);
            list2.Add("test4", 5);
            
            assert.equal(list.Contains("test1"), true, "Console Debugging Turns On");
            list.Remove("test1");
            assert.equal(list.Contains("test1"), false, "Console Debugging Turns On");
            
            list2.Remove("test");
            list2.Remove("test3");
            assert.equal(list2.Get("test4"), 5, "Console Debugging Turns On");
        });
    });
})(JsBedRock.CurrentAssembly);