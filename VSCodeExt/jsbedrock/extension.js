function active(e){var s=vscode.commands.registerCommand("extension.compile",function(){JsBedRock.Main2?((new JsBedRock.Main2).DisplayMessage("Compiling: "+vscode.workspace.rootPath+"/solution.json"),(new JsBedRock.Compiler.Compiler).BuildSolution(vscode.workspace.rootPath+"/solution.json"),(new JsBedRock.Main2).DisplayMessage("Compiled")):vscode.window.showInformationMessage("JsBedRock... Still Loading.")}),s=vscode.commands.registerCommand("extension.about",function(){JsBedRock.Main2?(new JsBedRock.Main2).DisplayMessage("About: Started."):vscode.window.showInformationMessage("JsBedRock... Still Loading.")});e.subscriptions.push(s)}var JsBedRock={};JsBedRock.FrameworkVersion="0.16.02",JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.Object=JsBedRock.Utils.Object||{},JsBedRock.Utils.Object.MergeObjects=function(e,s){var t={};for(var o in e)t[o]=e[o];for(var o in s)t[o]=s[o];return t}}(),JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.ObjectOriented=JsBedRock.Utils.ObjectOriented||{};var e={ObjectDefBuilder:function(e){"function"!=typeof e&&JsBedRock.Console.Error("Invalid Constructor. Cannot create object definition."),e.prototype.GetType=function(){return e};var s=JsBedRock.CurrentAssembly;return e.prototype.GetAssembly=function(){return s},e},Inherit:function(e,s){var t=e.prototype.GetType,o=e.prototype.GetAssembly;e.prototype={};for(var n in s.prototype)e.prototype[n]=s.prototype[n]instanceof Array?s.prototype[n].slice():s.prototype[n];e.prototype.GetType=t,e.prototype.GetAssembly=o,e.prototype.__InheritanceChain=e.prototype.__InheritanceChain||[],e.prototype.__InheritanceChain.unshift(s)},Implement:function(e,s){if(e.prototype.__Implemented=e.prototype.__Implemented||[],-1===e.prototype.__Implemented.indexOf(s)){for(reqPubilcs in s.prototype)e.prototype[reqPubilcs]||JsBedRock.Console.Error(reqPubilcs+" not implemented on "+e.prototype.Name+" for "+s.InterfaceName+".");e.prototype.__Implemented.push(s)}},ClassDefaults:{Inherit:null,Implements:[],Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{},Attributes:[],Name:""},InterfaceDefaults:{Name:"",Members:{}},MethodDefaults:{Def:null,Attributes:[]}};JsBedRock.Utils.ObjectOriented.CreateClass=function(s){var t=JsBedRock.Utils.Object.MergeObjects(e.ClassDefaults,s),o=e.ObjectDefBuilder(t.Constructor);null===t.Inherit?JsBedRock.Types.Object&&e.Inherit(o,JsBedRock.Types.Object):e.Inherit(o,t.Inherit);for(var n in t.Members){var i=JsBedRock.Utils.Object.MergeObjects(e.MethodDefaults,t.Members[n]);o.prototype[n]=i.Def;for(var r=0;r<i.Attributes.length;r++)o.prototype.__Attributes[n]||(o.prototype.__Attributes[n]=[]),o.prototype.__Attributes[n].push(i.Attributes[r])}o.prototype.__ClassName=t.Name;for(var r=0;r<t.Implements.length;r++)e.Implement(o,t.Implements[r]);for(var r=0;r<t.Attributes.length;r++)o.prototype.__Attributes[""]||(o.prototype.__Attributes[""]=[]),o.prototype.__Attributes[""].push(t.Attributes[r]);return JsBedRock.CurrentAssembly.Classes.push(o),o},JsBedRock.Utils.ObjectOriented.CreateInterface=function(s){var t=JsBedRock.Utils.Object.MergeObjects(e.InterfaceDefaults,s),o=function(){};o.InterfaceName=t.Name;for(var n in t.Members)o.prototype[n]=t.Members[n];return o},JsBedRock.Utils.ObjectOriented.IsOfType=function(e,s){if(e instanceof s)return!0;for(var t in e.__InheritanceChain)if(s===e.__InheritanceChain[t])return!0;if(e.__Implemented instanceof Array)for(var o=0;o<e.__Implemented.length;o++)if(e.__Implemented[o]===s)return!0;return!1},JsBedRock.Utils.ObjectOriented.CallBaseConstructor=function(e,s){var t=Array.prototype.slice.call(arguments);s.apply(e,t.slice(2,t.length))}}(),JsBedRock.Utils=JsBedRock.Utils||{},JsBedRock.Utils.ObjectOriented=JsBedRock.Utils.ObjectOriented||{},JsBedRock.Utils.ObjectOriented.Reflection=JsBedRock.Utils.ObjectOriented.Reflection||{},function(){JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName=function(e,s){var t;for(var o in e)if(e[o]===s){t=o;break}if(JsBedRock.Utils.String.IsEmptyOrSpaces(t))for(var n in e.__InheritanceChain)for(var o in e.__InheritanceChain[n].prototype)if(e.__InheritanceChain[n].prototype[o]===s){t=o;break}return t},JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType=function(e,s){var t=[];if(e.Classes)for(var o=0;o<e.Classes.length;o++)try{var n=new e.Classes[o];JsBedRock.Utils.ObjectOriented.IsOfType(n,s)&&t.push(e.Classes[o])}catch(i){}return t}}(),JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.String=JsBedRock.Utils.String||{},JsBedRock.Utils.String.IsEmptyOrSpaces=function(e){return null==e||""===e.trim()},JsBedRock.Utils.String.Empty=""}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.GlobalAssemblyCache=JsBedRock.Assemblies.GlobalAssemblyCache||{};var e={_GAC:{},LoadedAsms:[],DoesAssemblyExist:function(s){return s in e._GAC},IsAssemblyLoaded:function(s){return-1!==e.LoadedAsms.indexOf(s)},LoadAssembly:function(s,t){JsBedRock.Assemblies.LoaderLogic(e.GetAssemblyKey(s),t),e._GAC[e.GetAssemblyKey(s)]=s},GetAssemblyKey:function(e){return e.Name},LoadAssemblyClasses:function(s){JsBedRock.CurrentAssembly=s;for(var t=0;t<s.Callbacks.length;t++)s.Callbacks[t]();s.Callbacks=[],e._GAC[e.GetAssemblyKey(s)]=s,e.LoadedAsms.push(e.GetAssemblyKey(s))}};JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly=function(s){for(var t=0;t<s.Dependencies.length;t++){if(!e.DoesAssemblyExist(e.GetAssemblyKey(s.Dependencies[t])))return void e.LoadAssembly(s.Dependencies[t],function(){setTimeout(function(){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(s)},1)});if(!e.IsAssemblyLoaded(e.GetAssemblyKey(s.Dependencies[t])))return void setTimeout(function(){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(s)},1)}e.LoadAssemblyClasses(s)},JsBedRock.Assemblies.GlobalAssemblyCache.GetLoadedAssemblies=function(){return e._GAC}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyDef=function(e){var s=this,t={Defaults:{Name:"",Loaded:!1,Dependencies:[],Callbacks:[],Classes:[],OnLoad:function(e){s.Callbacks.push(e)}}},o=JsBedRock.Utils.Object.MergeObjects(t.Defaults,e);for(var n in o)s[n]=o[n];JsBedRock.CurrentAssembly=this}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyDependency=function(e){var s=this,t={Defaults:{Name:"",Loaded:!1}},o=JsBedRock.Utils.Object.MergeObjects(t.Defaults,e);for(var n in o)s[n]=o[n]}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyConfig=JsBedRock.Assemblies.AssemblyConfig||{},JsBedRock.Assemblies.AssemblyConfig.LoadConfig=function(e){JsBedRock.AppConfig=e}}(),function(){new JsBedRock.Assemblies.AssemblyDef({Name:"JsBedRockForVSCode",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Node.Compiler"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Node.IO"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Node"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"})],NodeDependencies:["uglify-js","fstream","tar","jshint"]})}(),function(e){e.OnLoad(function(){JsBedRock.Main2=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){this._VsCode=require("vscode"),JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{DisplayMessage:{Def:function(e){this._VsCode.window.showInformationMessage(e)}},_VsCode:{Def:null}}})})}(JsBedRock.CurrentAssembly);var vscode=require("vscode");exports.activate=active,function(asm){asm.OnLoad(function(){});var fs=require("fs"),sdkConfgJson={};if(process.env.JSBEDROCK_FRAMEWORK_PATH)try{sdkConfgJson=JSON.parse(fs.readFileSync(process.env.JSBEDROCK_FRAMEWORK_PATH+"/"+JsBedRock.FrameworkVersion+"/config.json","utf8").toString())}catch(err){}var appConfgJson=JSON.parse(fs.readFileSync(__dirname+"/config.json","utf8").toString());JsBedRock.Assemblies.AssemblyConfig.LoadConfig(JsBedRock.Utils.Object.MergeObjects(sdkConfgJson,appConfgJson)),JsBedRock.Assemblies.LoaderLogic=function(u,c){var file=__dirname+"/"+u+".js";try{fs.statSync(file)}catch(err){process.env.JSBEDROCK_FRAMEWORK_PATH&&(file=process.env.JSBEDROCK_FRAMEWORK_PATH+"/"+JsBedRock.FrameworkVersion+"/"+u+".js")}eval(fs.readFileSync(file,"utf8")),setTimeout(function(){c()},0)},require("child_process").exec("npm install npm",function(e,s,t){var o=require("npm");o.load(function(e){o.commands.install(asm.NodeDependencies,function(e,s){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm)}),o.on("log",function(e){console.log(e)})})})}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=VSCodeExt/jsbedrock/extension.js.map