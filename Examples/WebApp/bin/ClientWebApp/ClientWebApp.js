var JsBedRock={};JsBedRock.FrameworkVersion="0.16.02",JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.Object=JsBedRock.Utils.Object||{},JsBedRock.Utils.Object.MergeObjects=function(e,s){var t={};for(var o in e)t[o]=e[o];for(var o in s)t[o]=s[o];return t}}(),JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.ObjectOriented=JsBedRock.Utils.ObjectOriented||{};var e={ObjectDefBuilder:function(e){"function"!=typeof e&&JsBedRock.Console.Error("Invalid Constructor. Cannot create object definition."),e.prototype.GetType=function(){return e};var s=JsBedRock.CurrentAssembly;return e.prototype.GetAssembly=function(){return s},e},Inherit:function(e,s){var t=e.prototype.GetType,o=e.prototype.GetAssembly;e.prototype={};for(var n in s.prototype)e.prototype[n]=s.prototype[n]instanceof Array?s.prototype[n].slice():s.prototype[n];e.prototype.GetType=t,e.prototype.GetAssembly=o,e.prototype.__InheritanceChain=e.prototype.__InheritanceChain||[],e.prototype.__InheritanceChain.unshift(s)},Implement:function(e,s){if(e.prototype.__Implemented=e.prototype.__Implemented||[],-1===e.prototype.__Implemented.indexOf(s)){for(reqPubilcs in s.prototype)e.prototype[reqPubilcs]||JsBedRock.Console.Error(reqPubilcs+" not implemented on "+e.prototype.Name+" for "+s.InterfaceName+".");e.prototype.__Implemented.push(s)}},ClassDefaults:{Inherit:null,Implements:[],Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{},Name:""},InterfaceDefaults:{Name:"",Members:{}}};JsBedRock.Utils.ObjectOriented.CreateClass=function(s){var t=JsBedRock.Utils.Object.MergeObjects(e.ClassDefaults,s),o=e.ObjectDefBuilder(t.Constructor);null===t.Inherit?JsBedRock.Types.Object&&e.Inherit(o,JsBedRock.Types.Object):e.Inherit(o,t.Inherit);for(var n in t.Members)o.prototype[n]=t.Members[n];o.prototype.__ClassName=t.Name;for(var i=0;i<t.Implements.length;i++)e.Implement(o,t.Implements[i]);return JsBedRock.CurrentAssembly.Classes.push(o),o},JsBedRock.Utils.ObjectOriented.CreateInterface=function(s){var t=JsBedRock.Utils.Object.MergeObjects(e.InterfaceDefaults,s),o=function(){};o.InterfaceName=t.Name;for(var n in t.Members)o.prototype[n]=t.Members[n];return o},JsBedRock.Utils.ObjectOriented.IsOfType=function(e,s){if(e instanceof s)return!0;for(var t in e.__InheritanceChain)if(s===e.__InheritanceChain[t])return!0;if(e.__Implemented instanceof Array)for(var o=0;o<e.__Implemented.length;o++)if(e.__Implemented[o]===s)return!0;return!1},JsBedRock.Utils.ObjectOriented.CallBaseConstructor=function(e,s){var t=Array.prototype.slice.call(arguments);s.apply(e,t.slice(2,t.length))}}(),JsBedRock.Utils=JsBedRock.Utils||{},JsBedRock.Utils.ObjectOriented=JsBedRock.Utils.ObjectOriented||{},JsBedRock.Utils.ObjectOriented.Reflection=JsBedRock.Utils.ObjectOriented.Reflection||{},function(){JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName=function(e,s){var t;for(var o in e)if(e[o]===s){t=o;break}if(JsBedRock.Utils.String.IsEmptyOrSpaces(t))for(var n in e.__InheritanceChain)for(var o in e.__InheritanceChain[n].prototype)if(e.__InheritanceChain[n].prototype[o]===s){t=o;break}return t},JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType=function(e,s){for(var t=[],o=0;o<e.Classes.length;o++)try{var n=new e.Classes[o];JsBedRock.Utils.ObjectOriented.IsOfType(n,s)&&t.push(e.Classes[o])}catch(i){}return t}}(),JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.String=JsBedRock.Utils.String||{},JsBedRock.Utils.String.IsEmptyOrSpaces=function(e){return null==e||""===e.trim()},JsBedRock.Utils.String.Empty=""}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.GlobalAssemblyCache=JsBedRock.Assemblies.GlobalAssemblyCache||{};var e={_GAC:{},LoadedAsms:[],DoesAssemblyExist:function(s){return s in e._GAC},IsAssemblyLoaded:function(s){return-1!==e.LoadedAsms.indexOf(s)},LoadAssembly:function(s,t){JsBedRock.Assemblies.LoaderLogic(e.GetAssemblyKey(s),t),e._GAC[e.GetAssemblyKey(s)]=s},GetAssemblyKey:function(e){return e.Name},LoadAssemblyClasses:function(s){JsBedRock.CurrentAssembly=s;for(var t=0;t<s.Callbacks.length;t++)s.Callbacks[t]();s.Callbacks=[],e._GAC[e.GetAssemblyKey(s)]=s,e.LoadedAsms.push(e.GetAssemblyKey(s))}};JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly=function(s){for(var t=0;t<s.Dependencies.length;t++){if(!e.DoesAssemblyExist(e.GetAssemblyKey(s.Dependencies[t])))return void e.LoadAssembly(s.Dependencies[t],function(){setTimeout(function(){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(s)},1)});if(!e.IsAssemblyLoaded(e.GetAssemblyKey(s.Dependencies[t])))return void setTimeout(function(){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(s)},1)}e.LoadAssemblyClasses(s)},JsBedRock.Assemblies.GlobalAssemblyCache.GetLoadedAssemblies=function(){return e._GAC}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyDef=function(e){var s=this,t={Defaults:{Name:"",Loaded:!1,Dependencies:[],Callbacks:[],Classes:[],OnLoad:function(e){s.Callbacks.push(e)}}},o=JsBedRock.Utils.Object.MergeObjects(t.Defaults,e);for(var n in o)s[n]=o[n];JsBedRock.CurrentAssembly=this}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyDependency=function(e){var s=this,t={Defaults:{Name:"",Loaded:!1}},o=JsBedRock.Utils.Object.MergeObjects(t.Defaults,e);for(var n in o)s[n]=o[n]}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyConfig=JsBedRock.Assemblies.AssemblyConfig||{},JsBedRock.Assemblies.AssemblyConfig.LoadConfig=function(e){JsBedRock.AppConfig=e}}(),function(){new JsBedRock.Assemblies.AssemblyDef({Name:"ClientWebApp",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Collections"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Web"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.UI"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.UI.Web"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"WebAppCommon"})],NodeDependencies:[]})}(),JsBedRock.Services=JsBedRock.Services||{},function(e){e.OnLoad(function(){JsBedRock.Services.BlogService=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.RestClientService,Constructor:function(e){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.RestClientService,e)},Members:{Name:"Blog",GetPosts:function(e){var s=new JsBedRock.Collections.List;s.Add(new JsBedRock.Models.TestResult("1","value one","value too")),s.Add(new JsBedRock.Models.TestResult("2","value 1","value 2")),s.Add(new JsBedRock.Models.TestResult("3","value ein","value two")),e(s)}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Services=JsBedRock.Services||{},function(e){e.OnLoad(function(){JsBedRock.Services.LayoutService=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.RestClientService,Constructor:function(e){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.RestClientService,e)},Members:{Name:"Layout",GetNavData:function(e){e(new JsBedRock.Models.TestResult("idvalue","value one Layhout","value too Layhout"))}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Components=JsBedRock.Components||{},JsBedRock.Components.Blog=JsBedRock.Components.Blog||{},function(e){e.OnLoad(function(){JsBedRock.Components.Blog.BlogPostComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.HtmlComponent,Constructor:function(e,s,t){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.HtmlComponent,e,s,t)},Members:{Name:"BlogPost",_GetServices:function(){return[JsBedRock.Services.BlogService]},_BuildModel:function(){this._Model.ID="test",this._Model.Title="<p>test</p>",this._Model.Body="test"},Init:function(){this.Base()},_GetTemplate:function(){return'                        <div class="entry">                            <h2 id="testTitleId{{Model.ID}}">{{Model.Title}}</h2>                            <div class="body">{{Model.Body}}</div>                        </div>'},_InitListeners:function(){var e=this;$("#testTitleId"+e._Model.ID).click(function(){e._Model.Title=e._Model.Title+"1"})}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Components=JsBedRock.Components||{},JsBedRock.Components.Blog=JsBedRock.Components.Blog||{},function(e){e.OnLoad(function(){JsBedRock.Components.Blog.BlogWallComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.HtmlComponent,Constructor:function(e,s,t){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.HtmlComponent,e,s,t)},Members:{Name:"BlogWall",_GetServices:function(){return[JsBedRock.Services.BlogService]},_BuildModel:function(){this._Model.Posts=[],this._Model.BlogPostModel=new JsBedRock.Types.Object},Init:function(){var e=this;this.Base(),this._Service.Blog.GetPosts(function(s){s.ForEach(function(s){e._Model.Posts.push({ID:s.ID})})})},_GetTemplate:function(){return'                        <div class="blogWall">                            <div id="blogpost">test {{BlogPost Model.BlogPostModel}}</div>                        </div>'},_InitListeners:function(){}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Components=JsBedRock.Components||{},function(e){e.OnLoad(function(){JsBedRock.Components.HomePageComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.HtmlComponent,Constructor:function(e,s,t){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.HtmlComponent,e,s,t)},Members:{Name:"HomePage",_GetServices:function(){return[JsBedRock.Services.LayoutService]},_BuildModel:function(){this._Model.Title="",this._Model.BlogWallModel=new JsBedRock.Types.Object},Init:function(){this.Base();var e=this;this._Service.Layout.GetNavData(function(s){e._Model.Title=s.Value1+" "+s.Value2})},_GetTemplate:function(){return'                        <div class="maincontianer">                            <h1 id="testTitleId">{{Model.Title}}</h1>                            <div id="blogBodyId">{{BlogWall Model.BlogWallModel}}</div>                        </div>'},_InitListeners:function(){var e=this;$("#testTitleId").click(function(){e._Model.Title=e._Model.Title+"1"})}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Components=JsBedRock.Components||{},function(e){e.OnLoad(function(){JsBedRock.Components.OtherPageComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.HtmlComponent,Constructor:function(e,s,t){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.HtmlComponent,e,s,t)},Members:{Name:"OtherPage",_GetServices:function(){return[JsBedRock.Services.LayoutService]},_BuildModel:function(){this._Model.Title="",this._Model.BlogWallModel=new JsBedRock.Types.Object},Init:function(){this.Base(),alert(this._Context.BTestValue1+"-"+this._Context.BTestValue2);var e=this;this._Service.Layout.GetNavData(function(s){e._Model.Title="Other Page"})},_GetTemplate:function(){return'                        <div class="maincontianer">                            <h1 id="testTitleId">{{Model.Title}}</h1>                        </div>'},_InitListeners:function(){var e=this;$("#testTitleId").click(function(){e._Model.Title=e._Model.Title+"1"})}}})})}(JsBedRock.CurrentAssembly),function(e){e.OnLoad(function(){JsBedRock.Main=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.WebAppStart,Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.WebAppStart)},Members:{GetRoutes:function(){var e=this.Base();return e.Add("Default",new JsBedRock.UI.Web.WebAppRouteDef(JsBedRock.Components.HomePageComponent,{0:"TestValue1",1:"TestValue2"})),e.Add("Other",new JsBedRock.UI.Web.WebAppRouteDef(JsBedRock.Components.OtherPageComponent,{0:"BTestValue1",1:"BTestValue2"})),e}}})})}(JsBedRock.CurrentAssembly),function(e){e.OnLoad(function(){(new JsBedRock.Main).Main()}),JsBedRock.Assemblies.LoaderLogic=function(e,s){var t=document,o="script",n=t.createElement(o),i=t.getElementsByTagName(o)[0];n.src=e+".js",s&&n.addEventListener("load",function(e){s(null,e)},!1),i.parentNode.insertBefore(n,i)},document.addEventListener("DOMContentLoaded",function(s){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)})}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=Examples/WebApp/bin/ClientWebApp/ClientWebApp.js.map