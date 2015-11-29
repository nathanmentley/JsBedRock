var JsBedRock={};JsBedRock.FrameworkVersion="0.16.02",JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.Object=JsBedRock.Utils.Object||{},JsBedRock.Utils.Object.MergeObjects=function(e,t){var s={};for(var o in e)s[o]=e[o];for(var o in t)s[o]=t[o];return s}}(),JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.ObjectOriented=JsBedRock.Utils.ObjectOriented||{};var e={ObjectDefBuilder:function(e){"function"!=typeof e&&JsBedRock.Console.Error("Invalid Constructor. Cannot create object definition."),e.prototype.GetType=function(){return e};var t=JsBedRock.CurrentAssembly;return e.prototype.GetAssembly=function(){return t},e},Inherit:function(e,t){var s=e.prototype.GetType,o=e.prototype.GetAssembly;e.prototype={};for(var n in t.prototype)e.prototype[n]=t.prototype[n]instanceof Array?t.prototype[n].slice():t.prototype[n];e.prototype.GetType=s,e.prototype.GetAssembly=o,e.prototype.__InheritanceChain=e.prototype.__InheritanceChain||[],e.prototype.__InheritanceChain.unshift(t)},Implement:function(e,t){if(e.prototype.__Implemented=e.prototype.__Implemented||[],-1===e.prototype.__Implemented.indexOf(t)){for(reqPubilcs in t.prototype)e.prototype[reqPubilcs]||JsBedRock.Console.Error(reqPubilcs+" not implemented on "+e.prototype.Name+" for "+t.InterfaceName+".");e.prototype.__Implemented.push(t)}},ClassDefaults:{Inherit:null,Implements:[],Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{},Attributes:[],Name:""},InterfaceDefaults:{Name:"",Members:{}},MethodDefaults:{Def:null,Attributes:[]}};JsBedRock.Utils.ObjectOriented.CreateClass=function(t){var s=JsBedRock.Utils.Object.MergeObjects(e.ClassDefaults,t),o=e.ObjectDefBuilder(s.Constructor);null===s.Inherit?JsBedRock.Types.Object&&e.Inherit(o,JsBedRock.Types.Object):e.Inherit(o,s.Inherit);for(var n in s.Members){var i=JsBedRock.Utils.Object.MergeObjects(e.MethodDefaults,s.Members[n]);o.prototype[n]=i.Def;for(var c=0;c<i.Attributes.length;c++)o.prototype.__Attributes[n]||(o.prototype.__Attributes[n]=[]),o.prototype.__Attributes[n].push(i.Attributes[c])}o.prototype.__ClassName=s.Name;for(var c=0;c<s.Implements.length;c++)e.Implement(o,s.Implements[c]);for(var c=0;c<s.Attributes.length;c++)o.prototype.__Attributes[""]||(o.prototype.__Attributes[""]=[]),o.prototype.__Attributes[""].push(s.Attributes[c]);return JsBedRock.CurrentAssembly.Classes.push(o),o},JsBedRock.Utils.ObjectOriented.CreateInterface=function(t){var s=JsBedRock.Utils.Object.MergeObjects(e.InterfaceDefaults,t),o=function(){};o.InterfaceName=s.Name;for(var n in s.Members)o.prototype[n]=s.Members[n];return o},JsBedRock.Utils.ObjectOriented.IsOfType=function(e,t){if(e instanceof t)return!0;for(var s in e.__InheritanceChain)if(t===e.__InheritanceChain[s])return!0;if(e.__Implemented instanceof Array)for(var o=0;o<e.__Implemented.length;o++)if(e.__Implemented[o]===t)return!0;return!1},JsBedRock.Utils.ObjectOriented.CallBaseConstructor=function(e,t){var s=Array.prototype.slice.call(arguments);t.apply(e,s.slice(2,s.length))}}(),JsBedRock.Utils=JsBedRock.Utils||{},JsBedRock.Utils.ObjectOriented=JsBedRock.Utils.ObjectOriented||{},JsBedRock.Utils.ObjectOriented.Reflection=JsBedRock.Utils.ObjectOriented.Reflection||{},function(){JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName=function(e,t){var s;for(var o in e)if(e[o]===t){s=o;break}if(JsBedRock.Utils.String.IsEmptyOrSpaces(s))for(var n in e.__InheritanceChain)for(var o in e.__InheritanceChain[n].prototype)if(e.__InheritanceChain[n].prototype[o]===t){s=o;break}return s},JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType=function(e,t){var s=[];if(e.Classes)for(var o=0;o<e.Classes.length;o++)try{var n=new e.Classes[o];JsBedRock.Utils.ObjectOriented.IsOfType(n,t)&&s.push(e.Classes[o])}catch(i){}return s}}(),JsBedRock.Utils=JsBedRock.Utils||{},function(){JsBedRock.Utils.String=JsBedRock.Utils.String||{},JsBedRock.Utils.String.IsEmptyOrSpaces=function(e){return null==e||""===e.trim()},JsBedRock.Utils.String.Empty=""}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.GlobalAssemblyCache=JsBedRock.Assemblies.GlobalAssemblyCache||{};var e={_GAC:{},LoadedAsms:[],DoesAssemblyExist:function(t){return t in e._GAC},IsAssemblyLoaded:function(t){return-1!==e.LoadedAsms.indexOf(t)},LoadAssembly:function(t,s){JsBedRock.Assemblies.LoaderLogic(e.GetAssemblyKey(t),s),e._GAC[e.GetAssemblyKey(t)]=t},GetAssemblyKey:function(e){return e.Name},LoadAssemblyClasses:function(t){JsBedRock.CurrentAssembly=t;for(var s=0;s<t.Callbacks.length;s++)t.Callbacks[s]();t.Callbacks=[],e._GAC[e.GetAssemblyKey(t)]=t,e.LoadedAsms.push(e.GetAssemblyKey(t))}};JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly=function(t){for(var s=0;s<t.Dependencies.length;s++){if(!e.DoesAssemblyExist(e.GetAssemblyKey(t.Dependencies[s])))return void e.LoadAssembly(t.Dependencies[s],function(){setTimeout(function(){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(t)},1)});if(!e.IsAssemblyLoaded(e.GetAssemblyKey(t.Dependencies[s])))return void setTimeout(function(){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(t)},1)}e.LoadAssemblyClasses(t)},JsBedRock.Assemblies.GlobalAssemblyCache.GetLoadedAssemblies=function(){return e._GAC}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyDef=function(e){var t=this,s={Defaults:{Name:"",Loaded:!1,Dependencies:[],Callbacks:[],Classes:[],OnLoad:function(e){t.Callbacks.push(e)}}},o=JsBedRock.Utils.Object.MergeObjects(s.Defaults,e);for(var n in o)t[n]=o[n];JsBedRock.CurrentAssembly=this}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyDependency=function(e){var t=this,s={Defaults:{Name:"",Loaded:!1}},o=JsBedRock.Utils.Object.MergeObjects(s.Defaults,e);for(var n in o)t[n]=o[n]}}(),JsBedRock.Assemblies=JsBedRock.Assemblies||{},function(){JsBedRock.Assemblies.AssemblyConfig=JsBedRock.Assemblies.AssemblyConfig||{},JsBedRock.Assemblies.AssemblyConfig.LoadConfig=function(e){JsBedRock.AppConfig=e}}(),function(){new JsBedRock.Assemblies.AssemblyDef({Name:"ClientWebApp",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Collections"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Web"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.UI"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.UI.Web"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"WebAppCommon"})],NodeDependencies:[]})}(),JsBedRock.Services=JsBedRock.Services||{},function(e){e.OnLoad(function(){JsBedRock.Services.BlogService=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.RestClientService,Constructor:function(e){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.RestClientService,e)},Members:{Name:{Def:"Blog"},GetPosts:{Def:function(){var e=new JsBedRock.Promise,t=new JsBedRock.Collections.List;return t.Add(new JsBedRock.Models.TestResult("1","value one","value too")),t.Add(new JsBedRock.Models.TestResult("2","value 1","value 2")),t.Add(new JsBedRock.Models.TestResult("3","value ein","value two")),e.Resolve(t),e}},GetPostData:{Def:function(e){return this._Post(new JsBedRock.Models.GetPostDataRequest(e),JsBedRock.Models.GetPostDataResult,JsBedRock.Models.ErrorResult)}},_RootUrl:{Def:"http://localhost:8080"}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Services=JsBedRock.Services||{},function(e){e.OnLoad(function(){JsBedRock.Services.LayoutService=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.RestClientService,Constructor:function(e){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.RestClientService,e)},Members:{Name:{Def:"Layout"},GetNavData:{Def:function(){var e=new JsBedRock.Promise;return e.Resolve(new JsBedRock.Models.TestResult("idvalue","value one Layhout","value too Layhout")),e}},_RootUrl:{Def:"http://localhost:8080"}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Components=JsBedRock.Components||{},JsBedRock.Components.Blog=JsBedRock.Components.Blog||{},function(e){e.OnLoad(function(){JsBedRock.Components.Blog.BlogPostComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.HtmlComponent,Constructor:function(e,t,s){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.HtmlComponent,e,t,s)},Members:{Name:{Def:"BlogPost"},_GetServices:{Def:function(){return[JsBedRock.Services.BlogService]}},_BuildModel:{Def:function(){this._Model.ID="test",this._Model.Title="<p>test</p>",this._Model.Body="test"}},Init:{Def:function(){var e=this;this.Base(),this._Service.Blog.GetPostData("testId").Success(function(t){e._Model.Body=t.BodyText})}},_GetTemplate:{Def:function(){return'                            <div class="entry">                                <h2 id="testTitleId{{Model.ID}}">{{Model.Title}}</h2>                                <div id="testBodyId{{Model.ID}}" class="body">{{Model.Body}}</div>                            </div>'}},_InitListeners:{Def:function(){var e=this;$("#testBodyId"+e._Model.ID).click(function(){e._Model.Body=e._Model.Body+"2"})}}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Components=JsBedRock.Components||{},JsBedRock.Components.Blog=JsBedRock.Components.Blog||{},function(e){e.OnLoad(function(){JsBedRock.Components.Blog.BlogWallComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.HtmlComponent,Constructor:function(e,t,s){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.HtmlComponent,e,t,s)},Members:{Name:{Def:"BlogWall"},_GetServices:{Def:function(){return[JsBedRock.Services.BlogService]}},_BuildModel:{Def:function(){this._Model.Posts=[],this._Model.BlogPostModel=new JsBedRock.Types.Object}},Init:{Def:function(){var e=this;this.Base(),this._Service.Blog.GetPosts().Success(function(t){t.ForEach(function(t){e._Model.Posts.push({ID:t.ID})})})}},_GetTemplate:{Def:function(){return'                            <div class="blogWall">                                <div id="blogpost">test {{BlogPost Model.BlogPostModel}}</div>                            </div>'}},_InitListeners:{Def:function(){}}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Components=JsBedRock.Components||{},function(e){e.OnLoad(function(){JsBedRock.Components.HomePageComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.HtmlComponent,Constructor:function(e,t,s){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.HtmlComponent,e,t,s)},Members:{Name:{Def:"HomePage"},_GetServices:{Def:function(){return[JsBedRock.Services.LayoutService]}},_BuildModel:{Def:function(){this._Model.Title="",this._Model.BlogWallModel=new JsBedRock.Types.Object}},Init:{Def:function(){this.Base();var e=this;this._Service.Layout.GetNavData().Success(function(t){e._Model.Title=t.Value1+" "+t.Value2})}},_GetTemplate:{Def:function(){return'                            <div class="maincontianer">                                <h1 id="testTitleId">{{Model.Title}}</h1>                                <div id="blogBodyId">{{BlogWall Model.BlogWallModel}}</div>                            </div>'}},_InitListeners:{Def:function(){var e=this;$("#testTitleId").click(function(){e._Model.Title=e._Model.Title+"1"})}}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Components=JsBedRock.Components||{},function(e){e.OnLoad(function(){JsBedRock.Components.OtherPageComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.HtmlComponent,Constructor:function(e,t,s){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.HtmlComponent,e,t,s)},Members:{Name:{Def:"OtherPage"},_GetServices:{Def:function(){return[JsBedRock.Services.LayoutService]}},_BuildModel:{Def:function(){this._Model.Title="",this._Model.BlogWallModel=new JsBedRock.Types.Object}},Init:{Def:function(){this.Base(),alert(this._Context.BTestValue1+"-"+this._Context.BTestValue2);var e=this;this._Service.Layout.GetNavData().Success(function(t){e._Model.Title="Other Page"})}},_GetTemplate:{Def:function(){return'                            <div class="maincontianer">                                <h1 id="testTitleId">{{Model.Title}}</h1>                            </div>'}},_InitListeners:{Def:function(){var e=this;$("#testTitleId").click(function(){e._Model.Title=e._Model.Title+"1"})}}}})})}(JsBedRock.CurrentAssembly),function(e){e.OnLoad(function(){JsBedRock.Main=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Web.WebAppStart,Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Web.WebAppStart)},Members:{GetRoutes:{Def:function(){var e=this.Base();return e.Add("Default",new JsBedRock.UI.Web.WebAppRouteDef(JsBedRock.Components.HomePageComponent,{0:"TestValue1",1:"TestValue2"})),e.Add("Other",new JsBedRock.UI.Web.WebAppRouteDef(JsBedRock.Components.OtherPageComponent,{0:"BTestValue1",1:"BTestValue2"})),e}}}})})}(JsBedRock.CurrentAssembly),function(e){e.OnLoad(function(){(new JsBedRock.Main).Main()}),JsBedRock.Assemblies.LoaderLogic=function(e,t){var s=document,o="script",n=s.createElement(o),i=s.getElementsByTagName(o)[0];n.src=e+".js",t&&n.addEventListener("load",function(e){t(null,e)},!1),i.parentNode.insertBefore(n,i)},document.addEventListener("DOMContentLoaded",function(t){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)})}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=Examples/WebApp/bin/ClientWebApp/ClientWebApp.js.map