!function(){new JsBedRock.Assemblies.AssemblyDef({Name:"JsBedRock.Core",Dependencies:[],NodeDependencies:[]})}(),JsBedRock.Types=JsBedRock.Types||{},function(e){e.OnLoad(function(){JsBedRock.Types.Interface=JsBedRock.Utils.ObjectOriented.CreateInterface({Name:"Interface",Members:{}})})}(JsBedRock.CurrentAssembly),JsBedRock.Types=JsBedRock.Types||{},function(e){e.OnLoad(function(){JsBedRock.Types.Object=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){this.ObjectGuid=new JsBedRock.Types.Guid,this.ObjectGuid.Generate()},Implements:[JsBedRock.Types.Interface],Members:{Base:function(){var e=JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(this,arguments.callee.caller);for(this.__InheritanceMethodDepth=this.__InheritanceMethodDepth||{},this.__InheritanceChain=this.__InheritanceChain||[],this.__InheritanceMethodDepth[e]=this.__InheritanceMethodDepth[e]||0,this.__InheritanceChain[this.__InheritanceMethodDepth[e]].prototype[e]||JsBedRock.Console.Error(e+" not found and could not be called from this.Base();");this.__InheritanceChain[this.__InheritanceMethodDepth[e]].prototype[e]===arguments.callee.caller;)this.__InheritanceMethodDepth[e]++;var t=this.__InheritanceChain[this.__InheritanceMethodDepth[e]].prototype[e].apply(this,arguments);for(this.__InheritanceMethodDepth[e]--;this.__InheritanceMethodDepth[e]-1>=0&&this.__InheritanceChain[this.__InheritanceMethodDepth[e]-1].prototype[e]===arguments.callee.caller;)this.__InheritanceMethodDepth[e]--;return t},ToJson:function(){var e={};for(var t in this)0!==t.lastIndexOf("_",0)&&(e[t]=this[t]);return JSON.stringify(e)},ObjectGuid:null}})})}(JsBedRock.CurrentAssembly),JsBedRock.Types=JsBedRock.Types||{},function(e){e.OnLoad(function(){JsBedRock.Types.Guid=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){this.Clear()},Members:{Equals:function(e){return this.ToString()===e.ToString()},Clear:function(){this._Values=[];for(var e=0;8>e;e++)this._Values.push("0000");this._Values[3]="4"+this._Values[3].substr(0,3)},Generate:function(){this._Values=[];for(var e=0;8>e;e++)this._Values.push(this._GeneratePartial());this._Values[3]="4"+this._Values[3].substr(0,3)},ToString:function(){return(this._Values[0]+this._Values[1]+"-"+this._Values[2]+"-"+this._Values[3]+"-"+this._Values[4]+"-"+this._Values[5]+this._Values[6]+this._Values[7]).toLowerCase()},FromString:function(e){this.Clear();for(var t=e.toLowerCase().replace("-",""),n=0;8>n;n++)this._Values[n]=t.substr(4*n,4)},_GeneratePartial:function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},_Values:null}})})}(JsBedRock.CurrentAssembly),function(e){e.OnLoad(function(){var e={Initialized:!1,EnableConsole:!0,Reporter:null};e.Reporter=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){e.Initialized&&JsBedRock.Console.Error("JsBedRock.Console is a singleton. You cannot create a second instance."),e.Initialized=!0,e.EnableConsole=!1,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{Error:function(e){if(!JsBedRock.Utils.String.IsEmptyOrSpaces(e))throw new Error(e)},Info:function(t){"undefined"!=typeof console&&!JsBedRock.Utils.String.IsEmptyOrSpaces(t)&&e.EnableConsole&&console.info(t)},Log:function(t){"undefined"!=typeof console&&!JsBedRock.Utils.String.IsEmptyOrSpaces(t)&&e.EnableConsole&&console.log(message)},Write:function(e){"undefined"!=typeof console&&(JsBedRock.Utils.String.IsEmptyOrSpaces(e)||console.info(e))},EnableDebugging:function(){e.EnableConsole=!0},DisableDebugging:function(){e.EnableConsole=!1},IsDebuggingOn:function(){return e.EnableConsole},Dump:function(e,t){var n="";t||(t=0);for(var s="",o=0;t+1>o;o++)s+="    ";if("object"==typeof e)for(var i in e){var r=e[i];"object"==typeof r?(n+=s+"'"+i+"' ...\n",n+=dump(r,t+1)):n+=s+"'"+i+"' => \""+r+'"\n'}else n="===>"+e+"<===("+typeof e+")";return n}}}),JsBedRock.Console=new e.Reporter})}(JsBedRock.CurrentAssembly),function(e){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=bin/0.16.02/JsBedRock.Core.js.map