/*
PluginDetect v0.9.0
www.pinlady.net/PluginDetect/license/
[ AdobeReader ]
[ isMinVersion getVersion hasMimeType getInfo onDetectionDone ]
[ AllowActiveX ]
*/
(function(){var j={version:"0.9.0",name:"PluginDetect",addPlugin:function(p,q){if(p&&j.isString(p)&&q&&j.isFunc(q.getVersion)){p=p.replace(/\s/g,"").toLowerCase();j.Plugins[p]=q;if(!j.isDefined(q.getVersionDone)){q.installed=null;q.version=null;q.version0=null;q.getVersionDone=null;q.pluginName=p;}}},uniqueName:function(){return j.name+"998"},openTag:"<",hasOwnPROP:({}).constructor.prototype.hasOwnProperty,hasOwn:function(s,t){var p;try{p=j.hasOwnPROP.call(s,t)}catch(q){}return !!p},rgx:{str:/string/i,num:/number/i,fun:/function/i,arr:/array/i},toString:({}).constructor.prototype.toString,isDefined:function(p){return typeof p!="undefined"},isArray:function(p){return j.rgx.arr.test(j.toString.call(p))},isString:function(p){return j.rgx.str.test(j.toString.call(p))},isNum:function(p){return j.rgx.num.test(j.toString.call(p))},isStrNum:function(p){return j.isString(p)&&(/\d/).test(p)},isFunc:function(p){return j.rgx.fun.test(j.toString.call(p))},getNumRegx:/[\d][\d\.\_,\-]*/,splitNumRegx:/[\.\_,\-]/g,getNum:function(q,r){var p=j.isStrNum(q)?(j.isDefined(r)?new RegExp(r):j.getNumRegx).exec(q):null;return p?p[0]:null},compareNums:function(w,u,t){var s,r,q,v=parseInt;if(j.isStrNum(w)&&j.isStrNum(u)){if(j.isDefined(t)&&t.compareNums){return t.compareNums(w,u)}s=w.split(j.splitNumRegx);r=u.split(j.splitNumRegx);for(q=0;q<Math.min(s.length,r.length);q++){if(v(s[q],10)>v(r[q],10)){return 1}if(v(s[q],10)<v(r[q],10)){return -1}}}return 0},formatNum:function(q,r){var p,s;if(!j.isStrNum(q)){return null}if(!j.isNum(r)){r=4}r--;s=q.replace(/\s/g,"").split(j.splitNumRegx).concat(["0","0","0","0"]);for(p=0;p<4;p++){if(/^(0+)(.+)$/.test(s[p])){s[p]=RegExp.$2}if(p>r||!(/\d/).test(s[p])){s[p]="0"}}return s.slice(0,4).join(",")},pd:{getPROP:function(s,q,p){try{if(s){p=s[q]}}catch(r){}return p},findNavPlugin:function(u){if(u.dbug){return u.dbug}var A=null;if(window.navigator){var z={Find:j.isString(u.find)?new RegExp(u.find,"i"):u.find,Find2:j.isString(u.find2)?new RegExp(u.find2,"i"):u.find2,Avoid:u.avoid?(j.isString(u.avoid)?new RegExp(u.avoid,"i"):u.avoid):0,Num:u.num?/\d/:0},s,r,t,y,x,q,p=navigator.mimeTypes,w=navigator.plugins;if(u.mimes&&p){y=j.isArray(u.mimes)?[].concat(u.mimes):(j.isString(u.mimes)?[u.mimes]:[]);for(s=0;s<y.length;s++){r=0;try{if(j.isString(y[s])&&/[^\s]/.test(y[s])){r=p[y[s]].enabledPlugin}}catch(v){}if(r){t=this.findNavPlugin_(r,z);if(t.obj){A=t.obj}if(A&&!j.dbug){return A}}}}if(u.plugins&&w){x=j.isArray(u.plugins)?[].concat(u.plugins):(j.isString(u.plugins)?[u.plugins]:[]);for(s=0;s<x.length;s++){r=0;try{if(x[s]&&j.isString(x[s])){r=w[x[s]]}}catch(v){}if(r){t=this.findNavPlugin_(r,z);if(t.obj){A=t.obj}if(A&&!j.dbug){return A}}}q=w.length;if(j.isNum(q)){for(s=0;s<q;s++){r=0;try{r=w[s]}catch(v){}if(r){t=this.findNavPlugin_(r,z);if(t.obj){A=t.obj}if(A&&!j.dbug){return A}}}}}}return A},findNavPlugin_:function(t,s){var r=t.description||"",q=t.name||"",p={};if((s.Find.test(r)&&(!s.Find2||s.Find2.test(q))&&(!s.Num||s.Num.test(RegExp.leftContext+RegExp.rightContext)))||(s.Find.test(q)&&(!s.Find2||s.Find2.test(r))&&(!s.Num||s.Num.test(RegExp.leftContext+RegExp.rightContext)))){if(!s.Avoid||!(s.Avoid.test(r)||s.Avoid.test(q))){p.obj=t}}return p},getVersionDelimiter:",",findPlugin:function(r){var q,p={status:-3,plugin:0};if(!j.isString(r)){return p}if(r.length==1){this.getVersionDelimiter=r;return p}r=r.toLowerCase().replace(/\s/g,"");q=j.Plugins[r];if(!q||!q.getVersion){return p}p.plugin=q;p.status=1;return p}},getPluginFileVersion:function(u,q){var t,s,v,p,r=-1;if(!u){return q}if(u.version){t=j.getNum(u.version+"")}if(!t||!q){return q||t||null}s=(j.formatNum(q)).split(j.splitNumRegx);v=(j.formatNum(t)).split(j.splitNumRegx);for(p=0;p<s.length;p++){if(r>-1&&p>r&&s[p]!="0"){return q}if(v[p]!=s[p]){if(r==-1){r=p}if(s[p]!="0"){return q}}}return t},AXO:(function(){var q;try{q=new window.ActiveXObject()}catch(p){}return q?null:window.ActiveXObject})(),getAXO:function(p){var r=null;try{r=new j.AXO(p)}catch(q){j.errObj=q;}if(r){j.browser.ActiveXEnabled=!0}return r},browser:{detectPlatform:function(){var r=this,q,p=window.navigator?navigator.platform||"":"";j.OS=100;if(p){var s=["Win",1,"Mac",2,"Linux",3,"FreeBSD",4,"iPhone",21.1,"iPod",21.2,"iPad",21.3,"Win.*CE",22.1,"Win.*Mobile",22.2,"Pocket\\s*PC",22.3,"",100];for(q=s.length-2;q>=0;q=q-2){if(s[q]&&new RegExp(s[q],"i").test(p)){j.OS=s[q+1];break}}}},detectIE:function(){var r=this,u=document,t,q,v=window.navigator?navigator.userAgent||"":"",w,p,y;r.ActiveXFilteringEnabled=!1;r.ActiveXEnabled=!1;try{r.ActiveXFilteringEnabled=!!window.external.msActiveXFilteringEnabled()}catch(s){}p=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","TDCCtl.TDCCtl","Shell.UIHelper","HtmlDlgSafeHelper.HtmlDlgSafeHelper","Scripting.Dictionary"];y=["WMPlayer.OCX","ShockwaveFlash.ShockwaveFlash","AgControl.AgControl"];w=p.concat(y);for(t=0;t<w.length;t++){if(j.getAXO(w[t])&&!j.dbug){break}}if(r.ActiveXEnabled&&r.ActiveXFilteringEnabled){for(t=0;t<y.length;t++){if(j.getAXO(y[t])){r.ActiveXFilteringEnabled=!1;break}}}q=u.documentMode;try{u.documentMode=""}catch(s){}r.isIE=r.ActiveXEnabled;r.isIE=r.isIE||j.isNum(u.documentMode)||new Function("return/*@cc_on!@*/!1")();try{u.documentMode=q}catch(s){}r.verIE=null;if(r.isIE){r.verIE=(j.isNum(u.documentMode)&&u.documentMode>=7?u.documentMode:0)||((/^(?:.*?[^a-zA-Z])??(?:MSIE|rv\s*\:)\s*(\d+\.?\d*)/i).test(v)?parseFloat(RegExp.$1,10):7)}},detectNonIE:function(){var p=this,s=window.navigator?navigator:{},r=p.isIE?"":s.userAgent||"",t=s.vendor||"",q=s.product||"";p.isGecko=(/Gecko/i).test(q)&&(/Gecko\s*\/\s*\d/i).test(r);p.verGecko=p.isGecko?j.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(r)?RegExp.$1:"0.9"):null;p.isOpera=(/(OPR\s*\/|Opera\s*\/\s*\d.*\s*Version\s*\/|Opera\s*[\/]?)\s*(\d+[\.,\d]*)/i).test(r);p.verOpera=p.isOpera?j.formatNum(RegExp.$2):null;p.isChrome=!p.isOpera&&(/(Chrome|CriOS)\s*\/\s*(\d[\d\.]*)/i).test(r);p.verChrome=p.isChrome?j.formatNum(RegExp.$2):null;p.isSafari=!p.isOpera&&!p.isChrome&&((/Apple/i).test(t)||!t)&&(/Safari\s*\/\s*(\d[\d\.]*)/i).test(r);p.verSafari=p.isSafari&&(/Version\s*\/\s*(\d[\d\.]*)/i).test(r)?j.formatNum(RegExp.$1):null;},init:function(){var p=this;p.detectPlatform();p.detectIE();p.detectNonIE()}},init:{hasRun:0,library:function(){window[j.name]=j;var q=this,p=document;j.win.init();j.head=p.getElementsByTagName("head")[0]||p.getElementsByTagName("body")[0]||p.body||null;j.browser.init();q.hasRun=1;}},ev:{addEvent:function(r,q,p){if(r&&q&&p){if(r.addEventListener){r.addEventListener(q,p,false)}else{if(r.attachEvent){r.attachEvent("on"+q,p)}else{r["on"+q]=this.concatFn(p,r["on"+q])}}}},removeEvent:function(r,q,p){if(r&&q&&p){if(r.removeEventListener){r.removeEventListener(q,p,false)}else{if(r.detachEvent){r.detachEvent("on"+q,p)}}}},concatFn:function(q,p){return function(){q();if(typeof p=="function"){p()}}},handler:function(t,s,r,q,p){return function(){t(s,r,q,p)}},handlerOnce:function(s,r,q,p){return function(){var u=j.uniqueName();if(!s[u]){s[u]=1;s(r,q,p)}}},handlerWait:function(s,u,r,q,p){var t=this;return function(){t.setTimeout(t.handler(u,r,q,p),s)}},setTimeout:function(q,p){if(j.win&&j.win.unload){return}setTimeout(q,p)},fPush:function(q,p){if(j.isArray(p)&&(j.isFunc(q)||(j.isArray(q)&&q.length>0&&j.isFunc(q[0])))){p.push(q)}},call0:function(q){var p=j.isArray(q)?q.length:-1;if(p>0&&j.isFunc(q[0])){q[0](j,p>1?q[1]:0,p>2?q[2]:0,p>3?q[3]:0)}else{if(j.isFunc(q)){q(j)}}},callArray0:function(p){var q=this,r;if(j.isArray(p)){while(p.length){r=p[0];p.splice(0,1);if(j.win&&j.win.unload&&p!==j.win.unloadHndlrs){}else{q.call0(r)}}}},call:function(q){var p=this;p.call0(q);p.ifDetectDoneCallHndlrs()},callArray:function(p){var q=this;q.callArray0(p);q.ifDetectDoneCallHndlrs()},allDoneHndlrs:[],ifDetectDoneCallHndlrs:function(){var r=this,p,q;if(!r.allDoneHndlrs.length){return}if(j.win){if(!j.win.loaded||j.win.loadPrvtHndlrs.length||j.win.loadPblcHndlrs.length){return}}if(j.Plugins){for(p in j.Plugins){if(j.hasOwn(j.Plugins,p)){q=j.Plugins[p];if(q&&j.isFunc(q.getVersion)){if(q.OTF==3||(q.DoneHndlrs&&q.DoneHndlrs.length)||(q.BIHndlrs&&q.BIHndlrs.length)){return}}}}}r.callArray0(r.allDoneHndlrs);}},isMinVersion:function(v,u,r,q){var s=j.pd.findPlugin(v),t,p=-1;if(s.status<0){return s.status}t=s.plugin;u=j.formatNum(j.isNum(u)?u.toString():(j.isStrNum(u)?j.getNum(u):"0"));if(t.getVersionDone!=1){t.getVersion(u,r,q);if(t.getVersionDone===null){t.getVersionDone=1}}if(t.installed!==null){p=t.installed<=0.5?t.installed:(t.installed==0.7?1:(t.version===null?0:(j.compareNums(t.version,u,t)>=0?1:-0.1)))}return p},getVersion:function(u,r,q){var s=j.pd.findPlugin(u),t,p;if(s.status<0){return null}t=s.plugin;if(t.getVersionDone!=1){t.getVersion(null,r,q);if(t.getVersionDone===null){t.getVersionDone=1}}p=(t.version||t.version0);p=p?p.replace(j.splitNumRegx,j.pd.getVersionDelimiter):p;return p},hasMimeType:function(t){if(t&&window.navigator&&navigator.mimeTypes){var w,v,q,s,p=navigator.mimeTypes,r=j.isArray(t)?[].concat(t):(j.isString(t)?[t]:[]);s=r.length;for(q=0;q<s;q++){w=0;try{if(j.isString(r[q])&&/[^\s]/.test(r[q])){w=p[r[q]]}}catch(u){}v=w?w.enabledPlugin:0;if(v&&(v.name||v.description)){return w}}}return null},getInfo:function(v,r,q){var p=null,t=j.pd.findPlugin(v),u,s;if(t.status<0){return p}u=t.plugin;if(j.isFunc(u.getInfo)){if(u.getVersionDone===null){s=j.getVersion?j.getVersion(v,r,q):j.isMinVersion(v,"0",r,q)}p=u.getInfo()}return p},onDetectionDone:function(u,t,q,p){var r=j.pd.findPlugin(u),v,s;if(r.status==-3){return -1}s=r.plugin;if(!j.isArray(s.DoneHndlrs)){s.DoneHndlrs=[];}if(s.getVersionDone!=1){v=j.getVersion?j.getVersion(u,q,p):j.isMinVersion(u,"0",q,p)}if(s.installed!=-0.5&&s.installed!=0.5){j.ev.call(t);return 1}j.ev.fPush(t,s.DoneHndlrs);return 0},win:{disable:function(){this.cancel=true},cancel:false,loaded:false,unload:false,hasRun:0,init:function(){var p=this;if(!p.hasRun){p.hasRun=1;if((/complete/i).test(document.readyState||"")){p.loaded=true;}else{j.ev.addEvent(window,"load",p.onLoad)}j.ev.addEvent(window,"unload",p.onUnload)}},loadPrvtHndlrs:[],loadPblcHndlrs:[],unloadHndlrs:[],onUnload:function(){var p=j.win;if(p.unload){return}p.unload=true;j.ev.removeEvent(window,"load",p.onLoad);j.ev.removeEvent(window,"unload",p.onUnload);j.ev.callArray(p.unloadHndlrs)},onLoad:function(){var p=j.win;if(p.loaded||p.unload||p.cancel){return}p.loaded=true;j.ev.callArray(p.loadPrvtHndlrs);j.ev.callArray(p.loadPblcHndlrs);}},DOM:{isEnabled:{objectTag:function(){var q=j.browser,p=q.isIE?0:1;if(q.ActiveXEnabled){p=1}return !!p},objectTagUsingActiveX:function(){var p=0;if(j.browser.ActiveXEnabled){p=1}return !!p},objectProperty:function(p){if(p&&p.tagName&&j.browser.isIE){if((/applet/i).test(p.tagName)){return(!this.objectTag()||j.isDefined(j.pd.getPROP(document.createElement("object"),"object"))?1:0)}return j.isDefined(j.pd.getPROP(document.createElement(p.tagName),"object"))?1:0}return 0}},HTML:[],div:null,divID:"plugindetect",divWidth:500,getDiv:function(){return this.div||document.getElementById(this.divID)||null},initDiv:function(){var q=this,p;if(!q.div){p=q.getDiv();if(p){q.div=p;}else{q.div=document.createElement("div");q.div.id=q.divID;q.setStyle(q.div,q.getStyle.div());q.insertDivInBody(q.div)}j.ev.fPush([q.onUnload,q],j.win.unloadHndlrs)}p=0},pluginSize:1,iframeWidth:40,iframeHeight:10,altHTML:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",emptyNode:function(q){var p=this;if(q&&(/div|span/i).test(q.tagName||"")){if(j.browser.isIE){p.setStyle(q,["display","none"])}try{q.innerHTML=""}catch(r){}}},removeNode:function(p){try{if(p&&p.parentNode){p.parentNode.removeChild(p)}}catch(q){}},onUnload:function(u,t){var r,q,s,v,w=t.HTML,p=w.length;if(p){for(q=p-1;q>=0;q--){v=w[q];if(v){w[q]=0;t.emptyNode(v.span());t.removeNode(v.span());v.span=0;v.spanObj=0;v.doc=0;v.objectProperty=0}}}r=t.getDiv();t.emptyNode(r);t.removeNode(r);v=0;s=0;r=0;t.div=0},span:function(){var p=this;if(!p.spanObj){p.spanObj=p.doc.getElementById(p.spanId)}return p.spanObj||null},width:function(){var t=this,s=t.span(),q,r,p=-1;q=s&&j.isNum(s.scrollWidth)?s.scrollWidth:p;r=s&&j.isNum(s.offsetWidth)?s.offsetWidth:p;s=0;return r>0?r:(q>0?q:Math.max(r,q))},obj:function(){var p=this.span();return p?p.firstChild||null:null},readyState:function(){var p=this;return j.browser.isIE&&j.isDefined(j.pd.getPROP(p.span(),"readyState"))?j.pd.getPROP(p.obj(),"readyState"):j.UNDEFINED},objectProperty:function(){var r=this,q=r.DOM,p;if(q.isEnabled.objectProperty(r)){p=j.pd.getPROP(r.obj(),"object")}return p},onLoadHdlr:function(p,q){q.loaded=1},getTagStatus:function(q,A,E,D,t,H,v){var F=this;if(!q||!q.span()){return -2}var y=q.width(),r=q.obj()?1:0,s=q.readyState(),p=q.objectProperty();if(p){return 1.5}var u=/clsid\s*\:/i,C=E&&u.test(E.outerHTML||"")?E:(D&&u.test(D.outerHTML||"")?D:0),w=E&&!u.test(E.outerHTML||"")?E:(D&&!u.test(D.outerHTML||"")?D:0),z=q&&u.test(q.outerHTML||"")?C:w;if(!A||!A.span()||!z||!z.span()){return -2}var x=z.width(),B=A.width(),G=z.readyState();if(y<0||x<0||B<=F.pluginSize){return 0}if(v&&!q.pi&&j.isDefined(p)&&j.browser.isIE&&q.tagName==z.tagName&&q.time<=z.time&&y===x&&s===0&&G!==0){q.pi=1}if(x<B||!q.loaded||!A.loaded||!z.loaded){return q.pi?-0.1:0}if(y==B||!r){return q.pi?-0.5:-1}else{if(y==F.pluginSize&&r&&(!j.isNum(s)||s===4)){return 1}}return q.pi?-0.5:-1},setStyle:function(q,t){var s=q.style,p;if(s&&t){for(p=0;p<t.length;p=p+2){try{s[t[p]]=t[p+1]}catch(r){}}}q=0;s=0},getStyle:{iframe:function(){return this.span()},span:function(r){var q=j.DOM,p;p=r?this.plugin():([].concat(this.Default).concat(["display","inline","fontSize",(q.pluginSize+3)+"px","lineHeight",(q.pluginSize+3)+"px"]));return p},div:function(){var p=j.DOM;return[].concat(this.Default).concat(["display","block","width",p.divWidth+"px","height",(p.pluginSize+3)+"px","fontSize",(p.pluginSize+3)+"px","lineHeight",(p.pluginSize+3)+"px","position","absolute","right","9999px","top","-9999px"])},plugin:function(q){var p=j.DOM;return"background-color:transparent;background-image:none;vertical-align:baseline;outline-style:none;border-style:none;padding:0px;margin:0px;visibility:"+(q?"hidden;":"visible;")+"display:inline;font-size:"+(p.pluginSize+3)+"px;line-height:"+(p.pluginSize+3)+"px;"},Default:["backgroundColor","transparent","backgroundImage","none","verticalAlign","baseline","outlineStyle","none","borderStyle","none","padding","0px","margin","0px","visibility","visible"]},insertDivInBody:function(v,t){var u="pd33993399",q=null,s=t?window.top.document:window.document,p=s.getElementsByTagName("body")[0]||s.body;if(!p){try{s.write('<div id="'+u+'">.'+j.openTag+"/div>");q=s.getElementById(u)}catch(r){}}p=s.getElementsByTagName("body")[0]||s.body;if(p){p.insertBefore(v,p.firstChild);if(q){p.removeChild(q)}}v=0},iframe:{onLoad:function(p,q){j.ev.callArray(p);},insert:function(r,q){var s=this,v=j.DOM,p,u=document.createElement("iframe"),t;v.setStyle(u,v.getStyle.iframe());u.width=v.iframeWidth;u.height=v.iframeHeight;v.initDiv();p=v.getDiv();p.appendChild(u);try{s.doc(u).open()}catch(w){}u[j.uniqueName()]=[];t=j.ev.handlerOnce(j.isNum(r)&&r>0?j.ev.handlerWait(r,s.onLoad,u[j.uniqueName()],q):j.ev.handler(s.onLoad,u[j.uniqueName()],q));j.ev.addEvent(u,"load",t);if(!u.onload){u.onload=t}j.ev.addEvent(s.win(u),"load",t);return u},addHandler:function(q,p){if(q){j.ev.fPush(p,q[j.uniqueName()])}},close:function(p){try{this.doc(p).close()}catch(q){}},write:function(p,r){try{this.doc(p).write(r)}catch(q){}},win:function(p){try{return p.contentWindow}catch(q){}return null},doc:function(p){var r;try{r=p.contentWindow.document}catch(q){}try{if(!r){r=p.contentDocument}}catch(q){}return r||null}},insert:function(t,s,u,p,y,w,v){var D=this,F,E,C,B,A;if(!v){D.initDiv();v=D.getDiv()}if(v){if((/div/i).test(v.tagName)){B=v.ownerDocument}if((/iframe/i).test(v.tagName)){B=D.iframe.doc(v)}}if(B&&B.createElement){}else{B=document}if(!j.isDefined(p)){p=""}if(j.isString(t)&&(/[^\s]/).test(t)){t=t.toLowerCase().replace(/\s/g,"");F=j.openTag+t+" ";F+='style="'+D.getStyle.plugin(w)+'" ';var r=1,q=1;for(A=0;A<s.length;A=A+2){if(/[^\s]/.test(s[A+1])){F+=s[A]+'="'+s[A+1]+'" '}if((/width/i).test(s[A])){r=0}if((/height/i).test(s[A])){q=0}}F+=(r?'width="'+D.pluginSize+'" ':"")+(q?'height="'+D.pluginSize+'" ':"");if(t=="embed"||t=="img"){F+=" />"}else{F+=">";for(A=0;A<u.length;A=A+2){if(/[^\s]/.test(u[A+1])){F+=j.openTag+'param name="'+u[A]+'" value="'+u[A+1]+'" />'}}F+=p+j.openTag+"/"+t+">"}}else{t="";F=p}E={spanId:"",spanObj:null,span:D.span,loaded:null,tagName:t,outerHTML:F,DOM:D,time:new Date().getTime(),width:D.width,obj:D.obj,readyState:D.readyState,objectProperty:D.objectProperty,doc:B};if(v&&v.parentNode){if((/iframe/i).test(v.tagName)){D.iframe.addHandler(v,[D.onLoadHdlr,E]);E.loaded=0;E.spanId=j.name+"Span"+D.HTML.length;C='<span id="'+E.spanId+'" style="'+D.getStyle.span(1)+'">'+F+"</span>";D.iframe.write(v,C)}else{if((/div/i).test(v.tagName)){C=B.createElement("span");D.setStyle(C,D.getStyle.span());v.appendChild(C);try{C.innerHTML=F}catch(z){}E.spanObj=C}}}C=0;v=0;D.HTML.push(E);return E}},file:{any:"fileStorageAny999",valid:"fileStorageValid999",save:function(s,t,r){var q=this,p;if(s&&j.isDefined(r)){if(!s[q.any]){s[q.any]=[]}if(!s[q.valid]){s[q.valid]=[]}s[q.any].push(r);p=q.split(t,r);if(p){s[q.valid].push(p)}}},getValidLength:function(p){return p&&p[this.valid]?p[this.valid].length:0},getAnyLength:function(p){return p&&p[this.any]?p[this.any].length:0},getValid:function(r,p){var q=this;return r&&r[q.valid]?q.get(r[q.valid],p):null},getAny:function(r,p){var q=this;return r&&r[q.any]?q.get(r[q.any],p):null},get:function(s,p){var r=s.length-1,q=j.isNum(p)?p:r;return(q<0||q>r)?null:s[q]},split:function(t,q){var s=null,p,r;t=t?t.replace(".","\\."):"";r=new RegExp("^(.*[^\\/])("+t+"\\s*)$");if(j.isString(q)&&r.test(q)){p=(RegExp.$1).split("/");s={name:p[p.length-1],ext:RegExp.$2,full:q};p[p.length-1]="";s.path=p.join("/")}return s}},Plugins:{}};j.init.library();var c={OTF:null,setPluginStatus:function(){var p=this,B=p.OTF,v=p.nav.detected,x=p.nav.version,z=p.nav.precision,C=z,u=x,s=v>0;var H=p.axo.detected,r=p.axo.version,w=p.axo.precision,D=p.doc.detected,G=p.doc.version,t=p.doc.precision,E=p.doc2.detected,F=p.doc2.version,y=p.doc2.precision;u=F||u||r||G;C=y||C||w||t;s=E>0||s||H>0||D>0;u=u||null;p.version=j.formatNum(u);p.precision=C;var q=-1;if(B==3){q=p.version?0.5:-0.5}else{if(u){q=1}else{if(s){q=0}else{if(H==-0.5||D==-0.5){q=-0.15}else{if(j.browser.isIE&&(!j.browser.ActiveXEnabled||j.browser.ActiveXFilteringEnabled)){q=-1.5}}}}}p.installed=q;if(p.getVersionDone!=1){var A=1;if((p.verify&&p.verify.isEnabled())||p.installed==0.5||p.installed==-0.5){A=0}else{if(p.doc2.isDisabled()==1){A=0}}p.getVersionDone=A}},getVersion:function(s,r){var p=this,q=0,t=p.verify;if(p.getVersionDone===null){p.OTF=0;if(t){t.init()}}j.file.save(p,".pdf",r);if(p.getVersionDone===0){p.doc2.insertHTMLQuery();p.setPluginStatus();return}if((!q||j.dbug)&&p.nav.query().version){q=1}if((!q||j.dbug)&&p.axo.query().version){q=1}if((!q||j.dbug)&&p.doc.query().version){q=1}if(1){p.doc2.insertHTMLQuery()}p.setPluginStatus()},getPrecision:function(v,u,t){if(j.isString(v)){u=u||"";t=t||"";var q,s="\\d+",r="[\\.]",p=[s,s,s,s];for(q=4;q>0;q--){if((new RegExp(u+p.slice(0,q).join(r)+t)).test(v)){return q}}}return 0},nav:{detected:0,version:null,precision:0,mimeType:["application/pdf","application/vnd.adobe.pdfxml"],find:"Adobe.*PDF.*Plug-?in|Adobe.*Acrobat.*Plug-?in|Adobe.*Reader.*Plug-?in",plugins:["Adobe Acrobat","Adobe Acrobat and Reader Plug-in","Adobe Reader Plugin"],query:function(){var r=this,q,p=null;if(r.detected||!j.hasMimeType(r.mimeType)){return r}q=j.pd.findNavPlugin({find:r.find,mimes:r.mimeType,plugins:r.plugins});r.detected=q?1:-1;if(q){p=j.getNum(q.description)||j.getNum(q.name);p=j.getPluginFileVersion(q,p);if(!p){p=r.attempt3()}if(p){r.version=p;r.precision=c.getPrecision(p)}}return r},attempt3:function(){var p=null;if(j.OS==1){if(j.hasMimeType("application/vnd.adobe.pdfxml")){p="9"}else{if(j.hasMimeType("application/vnd.adobe.x-mars")){p="8"}else{if(j.hasMimeType("application/vnd.adobe.xfdf")){p="6"}}}}return p}},activexQuery:function(w){var u="",t,q,s,r,p={precision:0,version:null};try{if(w){u=w.GetVersions()+"";}}catch(v){}if(u&&j.isString(u)){t=/\=\s*[\d\.]+/g;r=u.match(t);if(r){for(q=0;q<r.length;q++){s=j.formatNum(j.getNum(r[q]));if(s&&(!p.version||j.compareNums(s,p.version)>0)){p.version=s}}p.precision=c.getPrecision(u,"\\=\\s*")}}return p},axo:{detected:0,version:null,precision:0,progID:["AcroPDF.PDF","AcroPDF.PDF.1","PDF.PdfCtrl","PDF.PdfCtrl.5","PDF.PdfCtrl.1"],progID_dummy:"AcroDUMMY.DUMMY",query:function(){var t=this,q=c,u,v,s,r,p,w;if(t.detected){return t}t.detected=-1;v=j.getAXO(t.progID_dummy);if(!v){w=j.errObj}for(p=0;p<t.progID.length;p++){v=j.getAXO(t.progID[p]);if(v){t.detected=1;u=q.activexQuery(v);s=u.version;r=u.precision;if(!j.dbug&&s){break}}else{if(w&&j.errObj&&w!==j.errObj&&w.message!==j.errObj.message){t.detected=-0.5}}}if(s){t.version=s}if(r){t.precision=r}return t}},doc:{detected:0,version:null,precision:0,classID:"clsid:CA8A9780-280D-11CF-A24D-444553540000",classID_dummy:"clsid:CA8A9780-280D-11CF-A24D-BA9876543210",DummySpanTagHTML:0,HTML:0,DummyObjTagHTML1:0,DummyObjTagHTML2:0,isDisabled:function(){var q=this,p=0;if(q.HTML){p=1}else{if(j.dbug){}else{if(!j.DOM.isEnabled.objectTagUsingActiveX()){p=1}}}return p},query:function(){var y=this,v=c,p=j.DOM.altHTML,r=1,s,x,w,t,u=1,q;if(y.isDisabled()){return y}s=j.DOM.iframe.insert(99,"Adobe Reader");y.DummySpanTagHTML=j.DOM.insert("",[],[],p,v,u,s);y.HTML=j.DOM.insert("object",["classid",y.classID],[],p,v,u,s);y.DummyObjTagHTML2=j.DOM.insert("object",["classid",y.classID_dummy],[],p,v,u,s);j.DOM.iframe.close(s);q=j.DOM.getTagStatus(y.HTML,y.DummySpanTagHTML,y.DummyObjTagHTML1,y.DummyObjTagHTML2,0,0,r);x=v.activexQuery(y.HTML.obj());w=x.version;t=x.precision;y.detected=q>0||w?1:(q==-0.1||q==-0.5?-0.5:-1);if(w){y.version=w}if(t){y.precision=t}return y}},doc2:{detected:0,version:null,precision:0,classID:"clsid:CA8A9780-280D-11CF-A24D-444553540000",mimeType:"application/pdf",HTML:0,count:0,count2:0,time2:0,intervalLength:50,maxCount:150,isDisabled:function(){var r=this,v=c,u=v.axo,p=v.nav,x=v.doc,w,t,q=0,s;if(r.HTML){q=2}else{if(j.dbug){}else{if(!j.DOM.isEnabled.objectTagUsingActiveX()){q=2}else{w=(p?p.version:0)||(u?u.version:0)||(x?x.version:0)||0;t=(p?p.precision:0)||(u?u.precision:0)||(x?x.precision:0)||0;if(!w||!t||t>2||j.compareNums(j.formatNum(w),j.formatNum("11"))<0){q=2}}}}if(q<2){s=j.file.getValid(v);if(!s||!s.full){q=1}}return q},handlerSet:0,onMessage:function(){var p=this;return function(q){if(p.version){return}p.detected=1;if(j.isArray(q)){q=q[0]}q=j.getNum(q+"");if(q){if(!(/[.,_]/).test(q)){q+="."}q+="00000";if((/^(\d+)[.,_](\d)(\d\d)(\d\d)/).test(q)){q=RegExp.$1+","+RegExp.$2+","+RegExp.$3+","+RegExp.$4}p.version=j.formatNum(q);p.precision=3;c.setPluginStatus()}}},isDefinedMsgHandler:function(q,r){try{return q?q.messageHandler!==r:0}catch(p){}return 1},queryObject:function(){var r=this,s=r.HTML,q=s?s.obj():0;if(!q){return}if(!r.handlerSet&&r.isDefinedMsgHandler(q)){try{q.messageHandler={onMessage:r.onMessage()}}catch(p){}r.handlerSet=1;r.count2=r.count;r.time2=(new Date()).getTime()}if(!r.detected){if(r.count>3&&!r.handlerSet){r.detected=-1}else{if(r.time2&&r.count-r.count2>=r.maxCount&&(new Date()).getTime()-r.time2>=r.intervalLength*r.maxCount){r.detected=-0.5}}}if(r.detected){if(r.detected!=-1){}}},insertHTMLQuery:function(){var u=this,p=c,r=j.DOM.altHTML,q,s,t=0;if(u.isDisabled()){return u}if(p.OTF<2){p.OTF=2}q=j.file.getValid(p).full;s=j.DOM.iframe.insert(0,"Adobe Reader");j.DOM.iframe.write(s,'<script type="text/javascript"><\/script>');u.HTML=j.DOM.insert("object",["data",q].concat(j.browser.isIE?["classid",u.classID]:["type",u.mimeType]),["src",q],r,p,t,s);j.DOM.iframe.addHandler(s,u.onIntervalQuery);if(p.OTF<3&&u.HTML){p.OTF=3;}j.DOM.iframe.close(s);return u},onIntervalQuery:function(){var p=c,q=p.doc2;q.count++;if(p.OTF==3){q.queryObject();if(q.detected){q.queryCompleted()}}if(p.OTF==3){j.ev.setTimeout(q.onIntervalQuery,q.intervalLength)}},queryCompleted:function(){var q=this,p=c;if(p.OTF==4){return}p.OTF=4;p.setPluginStatus();j.ev.callArray(p.DoneHndlrs);},z:0},getInfo:function(){var q=this;q.setPluginStatus();var p={OTF:(q.OTF<3?0:(q.OTF==3?1:2)),DummyPDFused:false,version:q.version,precision:q.precision};if(q.doc2.detected==1||q.doc2.detected==-0.5){p.DummyPDFused=true}return p}};j.addPlugin("adobereader",c);})();