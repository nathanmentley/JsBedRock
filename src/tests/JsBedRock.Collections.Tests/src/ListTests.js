JsBedRock.Collections = JsBedRock.Collections || {};
JsBedRock.Collections.Tests = JsBedRock.Collections.Tests || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Tests.ListTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'ListTests',
                FirstTest: function () {
                    var list = new JsBedRock.Collections.List();
                    var list2 = new JsBedRock.Collections.List();
                    
                    this.Assert(list.Count() === 0, "Console Debugging Turns On");
                    this.Assert(list2.Count() === 0, "Console Debugging Turns On");
                    
                    list.Add("test");
                    list.Add("test1");
                    list.Add("test2");
                    list.Add("test3");
                    
                    list2.Add("test");
                    list2.Add("test1");
                    list2.Add("test2");
                    list2.Add("test3");
                    list2.Add("test4");
                    
                    this.Assert(list.Count() === 4, "Console Debugging Turns On");
                    this.Assert(list2.Count() === 5, "Console Debugging Turns On");
                    
                    this.Assert(list.IndexOf("test1") === 1, "Console Debugging Turns On");
                    list.Remove("test1");
                    this.Assert(list.IndexOf("test2") === 1, "Console Debugging Turns On");
                    this.Assert(list2.IndexOf("test2") === 2, "Console Debugging Turns On");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);