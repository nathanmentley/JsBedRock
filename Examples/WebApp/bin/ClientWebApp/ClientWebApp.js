var JsBedRock={};JsBedRock.FrameworkVersion="0.16.02",JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.Object=JsBedRock.Utils.Object||{},JsBedRock.Utils.Object.MergeObjects=function(e,s){var t={};for(var n in e)t[n]=e[n];for(var n in s)t[n]=s[n];return t}}(),JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.ObjectOriented=JsBedRock.Utils.ObjectOriented||{};var e={ObjectDefBuilder:function(e){"function"!=typeof e&&JsBedRock.Console.Error("Invalid Constructor. Cannot create object definition."),e.prototype.GetType=function(){return e};var s=JsBedRock.CurrentAssembly;return e.prototype.GetAssembly=function(){return s},e},Inherit:function(e,s){var t=e.prototype.GetType,n=e.prototype.GetAssembly;e.prototype={};for(var o in s.prototype)e.prototype[o]=s.prototype[o]instanceof Array?s.prototype[o].slice():s.prototype[o];e.prototype.GetType=t,e.prototype.GetAssembly=n,e.prototype.__InheritanceChain=e.prototype.__InheritanceChain||[],e.prototype.__InheritanceChain.unshift(s)},Implement:function(e,s){if(e.prototype.__Implemented=e.prototype.__Implemented||[],-1===e.prototype.__Implemented.indexOf(s)){for(reqPubilcs in s.prototype)e.prototype[reqPubilcs]||JsBedRock.Console.Error(reqPubilcs+" not implemented on "+e.prototype.Name+" for "+s.InterfaceName+".");e.prototype.__Implemented.push(s)}},ClassDefaults:{Inherit:null,Implements:[],Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{},Name:""},InterfaceDefaults:{Name:"",Members:{}}};JsBedRock.Utils.ObjectOriented.CreateClass=function(s){var t=JsBedRock.Utils.Object.MergeObjects(e.ClassDefaults,s),n=e.ObjectDefBuilder(t.Constructor);null===t.Inherit?JsBedRock.Types.Object&&e.Inherit(n,JsBedRock.Types.Object):e.Inherit(n,t.Inherit);for(var o in t.Members)n.prototype[o]=t.Members[o];n.prototype.__ClassName=t.Name;for(var i=0;i<t.Implements.length;i++)e.Implement(n,t.Implements[i]);return JsBedRock.CurrentAssembly.Classes.push(n),n},JsBedRock.Utils.ObjectOriented.CreateInterface=function(s){var t=JsBedRock.Utils.Object.MergeObjects(e.InterfaceDefaults,s),n=function(){};n.InterfaceName=t.Name;for(var o in t.Members)n.prototype[o]=t.Members[o];return n},JsBedRock.Utils.ObjectOriented.IsOfType=function(e,s){if(e instanceof s)return!0;for(var t in e.__InheritanceChain)if(s===e.__InheritanceChain[t])return!0;if(e.__Implemented instanceof Array)for(var n=0;n<e.__Implemented.length;n++)if(e.__Implemented[n]===s)return!0;return!1},JsBedRock.Utils.ObjectOriented.CallBaseConstructor=function(e,s){var t=Array.prototype.slice.call(arguments);s.apply(e,t.slice(2,t.length))}}(),JsBedRock.Utils=JsBedRock.Utils||{},JsBedRock.Utils.ObjectOriented=JsBedRock.Utils.ObjectOriented||{},JsBedRock.Utils.ObjectOriented.Reflection=JsBedRock.Utils.ObjectOriented.Reflection||{},function(){JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName=function(e,s){var t;for(var n in e)if(e[n]===s){t=n;break}if(JsBedRock.Utils.String.IsEmptyOrSpaces(t))for(var o in e.__InheritanceChain)for(var n in e.__InheritanceChain[o].prototype)if(e.__InheritanceChain[o].prototype[n]===s){t=n;break}return t},JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType=function(e,s){for(var t=[],n=0;n<e.Classes.length;n++){var o=new e.Classes[n];JsBedRock.Utils.ObjectOriented.IsOfType(o,s)&&t.push(e.Classes[n])}return t}}(),JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.String=JsBedRock.Utils.String||{},JsBedRock.Utils.String.IsEmptyOrSpaces=function(e){return null==e||""===e.trim()},JsBedRock.Utils.String.Empty=""}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.GlobalAssemblyCache=JsBedRock.Assemblies.GlobalAssemblyCache||{};var e={_GAC:{},LoadedAsms:[],DoesAssemblyExist:function(s){return s in e._GAC},IsAssemblyLoaded:function(s){return-1!==e.LoadedAsms.indexOf(s)},LoadAssembly:function(s,t){JsBedRock.Assemblies.LoaderLogic(e.GetAssemblyKey(s),t),e._GAC[e.GetAssemblyKey(s)]=s},GetAssemblyKey:function(e){return e.Name},LoadAssemblyClasses:function(s){JsBedRock.CurrentAssembly=s;for(var t=0;t<s.Callbacks.length;t++)s.Callbacks[t]();s.Callbacks=[],e._GAC[e.GetAssemblyKey(s)]=s,e.LoadedAsms.push(e.GetAssemblyKey(s))}};JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly=function(s){for(var t=0;t<s.Dependencies.length;t++){if(!e.DoesAssemblyExist(e.GetAssemblyKey(s.Dependencies[t])))return void e.LoadAssembly(s.Dependencies[t],function(){setTimeout(function(){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(s)},1)});if(!e.IsAssemblyLoaded(e.GetAssemblyKey(s.Dependencies[t])))return void setTimeout(function(){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(s)},1)}e.LoadAssemblyClasses(s)},JsBedRock.Assemblies.GlobalAssemblyCache.GetLoadedAssemblies=function(){return e._GAC}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyDef=function(e){var s=this,t={Defaults:{Name:"",Loaded:!1,Dependencies:[],Callbacks:[],Classes:[],OnLoad:function(e){s.Callbacks.push(e)}}},n=JsBedRock.Utils.Object.MergeObjects(t.Defaults,e);for(var o in n)s[o]=n[o];JsBedRock.CurrentAssembly=this}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyDependency=function(e){var s=this,t={Defaults:{Name:"",Loaded:!1}},n=JsBedRock.Utils.Object.MergeObjects(t.Defaults,e);for(var o in n)s[o]=n[o]}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyConfig=JsBedRock.Assemblies.AssemblyConfig||{},JsBedRock.Assemblies.AssemblyConfig.LoadConfig=function(e){JsBedRock.AppConfig=e}}(),function(){new JsBedRock.Assemblies.AssemblyDef({Name:"ClientWebApp",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"WebAppCommon"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Web"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.UI.Web"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.UI"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"})],NodeDependencies:[]})}(),window.WebApp=window.WebApp||{},WebApp.TestClasses=WebApp.TestClasses||{},function(e){e.OnLoad(function(){JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:WebApp.TestClasses.Base=function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{TestMethod:function(){JsBedRock.Console.Write("Base")}}})})}(JsBedRock.CurrentAssembly),window.WebApp=window.WebApp||{},WebApp.TestClasses=WebApp.TestClasses||{},function(e){e.OnLoad(function(){JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:WebApp.TestClasses.OnceInheritedClass=function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,WebApp.TestClasses.Base)},Inherit:WebApp.TestClasses.Base,Members:{TestMethod:function(){JsBedRock.Console.Write("OnceInheritedClass"),this.Base()}}})})}(JsBedRock.CurrentAssembly),window.WebApp=window.WebApp||{},WebApp.TestClasses=WebApp.TestClasses||{},function(e){e.OnLoad(function(){JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:WebApp.TestClasses.TwiceInheritedClass=function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,WebApp.TestClasses.OnceInheritedClass)},Inherit:WebApp.TestClasses.OnceInheritedClass,Members:{TestMethod:function(){JsBedRock.Console.Write("TwiceInheritedClass"),this.Base()}}})})}(JsBedRock.CurrentAssembly),function(e){e.OnLoad(function(){JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:JsBedRock.Main=function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{Main:function(){var e="new WebApp.TestClasses.TwiceInheritedClass().TestMethod();",s=(new JsBedRock.UI.Web.Dom).CreateElement("Button",{onclick:e});document.body.appendChild(s)}}})})}(JsBedRock.CurrentAssembly),function(e){e.OnLoad(function(){(new JsBedRock.Main).Main()}),JsBedRock.Assemblies.LoaderLogic=function(e,s){var t=document,n="script",o=t.createElement(n),i=t.getElementsByTagName(n)[0];o.src=e+".js",s&&o.addEventListener("load",function(e){s(null,e)},!1),i.parentNode.insertBefore(o,i)},document.addEventListener("DOMContentLoaded",function(s){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)})}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=Examples/WebApp/bin/ClientWebApp/ClientWebApp.js.map