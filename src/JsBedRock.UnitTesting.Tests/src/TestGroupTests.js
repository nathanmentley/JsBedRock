JsBedRock.UnitTesting = JsBedRock.UnitTesting || {};
JsBedRock.UnitTesting.Tests = JsBedRock.UnitTesting.Tests || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UnitTesting.Tests.TestGroupTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'TestGroupTests',
                TestGroupKeepsTrackOfAsserts: function () {
                    var testGroup = new JsBedRock.UnitTesting.TestGroup();
                    
                    this.Assert(testGroup.GetFailures() === 0, "should start with zero failures.");
                    this.Assert(testGroup.GetAttempts() === 0, "should start with zero attempts.");
                    this.Assert(testGroup.GetSuccesses() === 0, "should start with zero successes.");
                    
                    testGroup.Assert(false, "Mock: force fail.");
                    
                    this.Assert(testGroup.GetAttempts() === 1, "a failure should count as an attempt.");
                    this.Assert(testGroup.GetFailures() === 1, "a failure should count as a failure.");
                    
                    testGroup.Assert(true, "Mock: force pass.");
                    
                    this.Assert(testGroup.GetAttempts() === 2, "a pass should count as an attempt.");
                    this.Assert(testGroup.GetSuccesses() === 1, "a pass should count as a success.");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);