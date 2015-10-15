window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};
JsBedRock.Collections.Tests = JsBedRock.Collections.Tests || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Tests.DictionaryTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'DictionaryTests',
                FirstTest: function () {
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
                    
                    this.Assert(list.Contains("test1") === true, "Console Debugging Turns On");
                    list.Remove("test1");
                    this.Assert(list.Contains("test1") === false, "Console Debugging Turns On");
                    
                    list2.Remove("test");
                    list2.Remove("test3");
                    
                    this.Assert(list2.Get("test4") === 5, "Console Debugging Turns On");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);