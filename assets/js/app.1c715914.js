(function(e){function t(t){for(var n,a,l=t[0],r=t[1],c=t[2],u=0,p=[];u<l.length;u++)a=l[u],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&p.push(i[a][0]),i[a]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);d&&d(t);while(p.length)p.shift()();return s.push.apply(s,c||[]),o()}function o(){for(var e,t=0;t<s.length;t++){for(var o=s[t],n=!0,l=1;l<o.length;l++){var r=o[l];0!==i[r]&&(n=!1)}n&&(s.splice(t--,1),e=a(a.s=o[0]))}return e}var n={},i={app:0},s=[];function a(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=n,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(o,n,function(t){return e[t]}.bind(null,n));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],r=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var d=r;s.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},15:function(e,t){},16:function(e,t){},17:function(e,t){},18:function(e,t){},19:function(e,t){},2:function(e,t){},20:function(e,t){},"2e18":function(e,t,o){},3:function(e,t){},4:function(e,t){},"413b":function(e,t,o){},5:function(e,t){},"56d7":function(e,t,o){"use strict";o.r(t);var n=o("2b0e"),i=o("f825"),s=o.n(i),a=(o("f8ce"),function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[e.isRouterAlive?o("router-view"):e._e()],1)}),l=[],r={name:"App",provide(){return{reload:this.reload}},data(){return{isRouterAlive:!0}},methods:{reload(){this.isRouterAlive=!1,this.$nextTick((function(){this.isRouterAlive=!0}))}}},c=r,d=o("2877"),u=Object(d["a"])(c,a,l,!1,null,null,null),p=u.exports,h=o("8c4f"),m=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("WalletPanel",{ref:"wallet",attrs:{onAccountChanged:e.onAccountChanged}}),o("div",{staticClass:"layout"},[o("div",{staticClass:"layout-content-center"},[o("div",[o("div",[o("h2",{staticStyle:{"text-align":"center","margin-bottom":"20px"}},[e._v("Trigger3")]),o("Radio-group",{model:{value:e.modelFunc,callback:function(t){e.modelFunc=t},expression:"modelFunc"}},[o("Radio",{attrs:{label:"send"}},[e._v("触发")]),o("Radio",{attrs:{label:"call"}},[e._v("查询")])],1),o("span",{directives:[{name:"show",rawName:"v-show",value:""!==e.scriptFileName,expression:"scriptFileName !== ''"}],staticStyle:{"margin-right":"8px"}},[e._v("|")]),o("Radio-group",{directives:[{name:"show",rawName:"v-show",value:""!==e.scriptFileName,expression:"scriptFileName !== ''"}],model:{value:e.modelExecute,callback:function(t){e.modelExecute=t},expression:"modelExecute"}},[o("Radio",{attrs:{label:"auto"}},[e._v("自动")]),o("Radio",{attrs:{label:"hand"}},[e._v("手动")])],1),o("Select",{staticStyle:{"margin-top":"20px"},on:{"on-change":e.onSelectMethod},model:{value:e.modelMethod,callback:function(t){e.modelMethod=t},expression:"modelMethod"}},e._l(e.abiList,(function(t){return o("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1),o("Input",{staticStyle:{"margin-top":"20px"},attrs:{type:"text",placeholder:"输入合约地址"},model:{value:e.modelAddres,callback:function(t){e.modelAddres=t},expression:"modelAddres"}},[o("span",{attrs:{slot:"prepend"},slot:"prepend"},[e._v("Contract")])]),o("Input",{staticStyle:{"margin-top":"20px"},attrs:{type:"text",readonly:""},model:{value:e.modelTypes,callback:function(t){e.modelTypes=t},expression:"modelTypes"}},[o("span",{attrs:{slot:"prepend"},slot:"prepend"},[e._v("TypeList")])]),o("Input",{staticStyle:{"margin-top":"20px"},attrs:{type:"text",placeholder:"输入函数调用参数, json字符串"},model:{value:e.modelParams,callback:function(t){e.modelParams=t},expression:"modelParams"}},[o("span",{attrs:{slot:"prepend"},slot:"prepend"},[e._v("Params")])]),o("Input",{staticStyle:{"margin-top":"20px"},attrs:{type:"text",readonly:""},model:{value:e.modelResult,callback:function(t){e.modelResult=t},expression:"modelResult"}},[o("span",{attrs:{slot:"prepend"},slot:"prepend"},[e._v("Result")]),o("span",{attrs:{slot:"append"},slot:"append"},[e._v("当前流程: "+e._s(e.workIndex))])]),o("Button",{staticStyle:{"margin-top":"20px"},attrs:{disabled:e.executing,type:"primary"},on:{click:function(t){return e.web3Execute()}}},[e._v("Execute")]),o("Upload",{staticStyle:{"margin-top":"20px"},attrs:{type:"drag",multiple:"","before-upload":e.onUploadBefore,action:"/"}},[o("div",{staticStyle:{padding:"20px 0"}},[o("Icon",{staticStyle:{color:"#3399ff"},attrs:{type:"ios-cloud-upload",size:"52"}}),o("p",[e._v("点击或将ABI文件拖拽到这里上传")])],1),""!==e.fileName?o("span",{staticStyle:{color:"green"}},[e._v(e._s(e.fileName+".json"))]):e._e()]),o("Upload",{staticStyle:{"margin-top":"20px"},attrs:{type:"drag","before-upload":e.onUploadBeforeForTest,action:"/"}},[o("div",{staticStyle:{padding:"20px 0"}},[o("Icon",{staticStyle:{color:"#3399ff"},attrs:{type:"ios-cloud-upload",size:"52"}}),o("p",[e._v("点击或将批处理json文件拖拽到这里上传")])],1),""!==e.scriptFileName?o("span",{staticStyle:{color:"green"}},[e._v(e._s(e.scriptFileName))]):e._e()])],1)])])])],1)},f=[],g=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("Row",{staticStyle:{height:"60px","background-color":"#ebe9e7","vertical-align":"middle"}},[o("Col",{attrs:{span:"12"}},[o("div",{staticStyle:{"text-align":"left"}},[o("div",{staticClass:"nav-header-left"},[o("Select",{staticStyle:{width:"90px","text-align":"center"},attrs:{placeholder:"network"},on:{"on-select":e.selectNetwork},model:{value:e.network,callback:function(t){e.network=t},expression:"network"}},[o("Option",{attrs:{value:"mainnet"}},[e._v("mainnet")]),o("Option",{attrs:{value:"goerli"}},[e._v("goerli")]),o("Option",{attrs:{value:"kovan"}},[e._v("rinkby")])],1)],1)])]),o("Col",{attrs:{span:"12"}},[o("div",{staticStyle:{"text-align":"right","margin-top":"5px"}},[o("Button",{staticStyle:{"margin-top":"10px","margin-right":"10px"},attrs:{disabled:""===e.network,type:"primary"},on:{click:function(t){e.connect?e.uninit():e.init()}}},[e._v(e._s(e.connect?"Disconnect":"Connect Wallet"))])],1)])],1)],1)},v=[],b=o("99e5"),x=o.n(b),w=o("5aac"),y=o.n(w),M=o("4c41"),k=o.n(M),A=o("2eaf"),S={data(){return{network:"",connect:!1,web3:null,providerOptions:{metamaskconnect:{package:k.a,options:{infuraId:"https://"+this.network+".infura.io/v3/cf8db3246b74481bb1289c9070156832"}},walletconnect:{package:A["a"],options:{infuraId:"https://"+this.network+".infura.io/v3/cf8db3246b74481bb1289c9070156832"}}}}},mounted(){void 0!==localStorage.getItem("network")&&null!==localStorage.getItem("network")&&this.setNetwork(localStorage.getItem("network"))},methods:{setNetwork(e){if(this.network=e,void 0!==localStorage.getItem("wallet")&&null!==localStorage.getItem("wallet")){let e=this.initWeb3Modal();this.initWeb3(e)}},selectNetwork(e){this.setNetwork(e.value),localStorage.setItem("network",e.value)},async init(){let e=this.initWeb3Modal();await e.clearCachedProvider(),await this.initWeb3(e)},async uninit(){let e=this.initWeb3Modal();await e.clearCachedProvider(),this.ondisconnect()},initWeb3Modal(){let e=this.network,t=this.providerOptions;const o=new y.a({network:e,cacheProvider:!0,providerOptions:t});return o},async initWeb3(e){const t=await e.connect();this.web3=new x.a(t);let o=await this.web3.eth.net.getNetworkType();if("main"===o&&(o="mainnet"),o!==this.network)return this.$Modal.error({title:"invalid network: "+o,content:"Please switch Ethereum network to "+this.network}),void await this.uninit();let n=this;const i=await this.web3.eth.getAccounts();this.onConnect(i[0]),t.on("accountsChanged",e=>{console.log("accountsChanged",e),n.ondisconnect()}),t.on("chainChanged",e=>{console.log("chainChanged",e),n.ondisconnect()}),t.on("disconnect",e=>{console.log("disconnect",e),n.ondisconnect()})},onConnect(e){this.connect=!0,localStorage.setItem("wallet",e),this.$parent.onAccountChanged("connect",this.network,e)},ondisconnect(){this.web3=null,this.connect=!1,localStorage.removeItem("wallet"),this.$parent.onAccountChanged("disconnect",this.network,"")},getWeb3(){return this.web3},async Execute(e,t,o,n,i,s,a,l){console.log(e,t,o,n,i,s);const r=new this.web3.eth.Contract(t,o);let c=r.methods[n];console.log(n,c,r.methods);let d=this,u={};if(u=0===s.length?c():c(...s),console.log("kind: ",e,"from: ",i),"call"==e)await u.call({from:i},(function(e,t){e?(console.log("Execute failed: ",e),void 0!==l&&null!==l&&l(e)):(console.log("Execute successed: ",t),void 0!==a&&null!==a&&a(t))}));else if("send"==e){const e=await u.estimateGas({from:i});console.log("gasLimit",e),await u.send({from:i,gasLimit:e}).on("transactionHash",(function(e){console.log("transactionHash:",e),d.$Message.success("web3Execute run succesed: ",e)})).on("confirmation",(function(e,t){})).on("receipt",(function(e){console.log("Execute successed: ",e),void 0!==a&&null!==a&&a(e)})).on("error",(function(e){console.log("Execute failed: ",e),void 0!==l&&null!==l&&l(e)}))}}}},_=S,O=(o("f337"),Object(d["a"])(_,g,v,!1,null,"5f6e72ae",null)),E=O.exports,N={components:{WalletPanel:E},inject:["reload"],data(){return{network:"",connect:!1,walletAddress:"",modelAddres:"",modelMethod:"",modelParams:"",modelResult:"",modelFunc:"send",modelExecute:"auto",modelTypes:"",inputTypes:{},executing:!1,workIndex:0,abiList:[],abiMap:{},scriptMap:{},fileName:"",scriptFileName:"",executeResult:{}}},mounted:function(){},methods:{onSelectMethod(e){if(this.modelTypes=""===this.inputTypes[e]||void 0===this.inputTypes[e]?"无":this.inputTypes[e],""===this.scriptFileName)return;this.modelAddres=this.scriptMap[e]["contract"],this.modelFunc=this.scriptMap[e]["kind"];let t=this.scriptMap[e]["params"];console.log("before parse modelParams: ",t),void 0!==this.executeResult[this.modelAddres]&&null!==this.executeResult[this.modelAddres]&&(this.modelAddres=this.executeResult[this.modelAddres]),t.length>0?(t.forEach((e,o)=>{e+""==="walletAddress"?t[o]=this.walletAddress:void 0!==this.executeResult[e+""]&&(t[o]=this.executeResult[e])}),this.modelParams=JSON.stringify(t)):this.modelParams="",console.log("after parse modelParams: ",this.modelParams)},onAccountChanged(e,t,o){"connect"===e?(this.network=t,this.connect=!0,this.modelAuthID=o,this.walletAddress=o):"disconnect"===e&&(this.network="",this.connect=!1,this.walletAddress="")},onUploadBefore(e){let t=e.name.lastIndexOf("."),o=e.name.substring(t+1,e.name.length).trim();return"json"!=o?(this.$Notice.warning({title:"文件格式错误",desc:e.name+"文件格式不正确, 请选择ABI文件"}),!1):(this.fileName=e.name.split(".")[0],this.parseABI(e),!1)},onUploadBeforeForTest(e){if(0===this.abiList.length)return this.$Notice.warning({title:"操作异常",desc:"请先上传ABI文件"}),!1;let t=e.name.lastIndexOf("."),o=e.name.substring(t+1,e.name.length).trim();return"json"!=o?(this.$Notice.warning({title:"文件格式错误",desc:e.name+"文件格式不正确, 请选择json文件"}),!1):(this.scriptFileName=e.name,this.parseTest(e),!1)},parseTest(e){const t=new FileReader;t.readAsText(e);let o=this;t.onload=function(){t.result&&(o.abiList=[],o.scriptMap=JSON.parse(t.result),Object.keys(o.scriptMap).forEach((function(e){o.abiList.push(e)})),console.log(o.scriptFileName,o.scriptMap))}},parseABI(e){const t=new FileReader;t.readAsText(e);let o=this,n=[];t.onload=function(){t.result&&(n=JSON.parse(t.result),o.abiList=[],n.forEach(e=>{if(void 0!==e.name&&""!==e.name&&o.abiList.indexOf(e.name)<0){o.abiList.push(e.name);let t=[];e.inputs.forEach(e=>{t.push(" "+e.internalType)}),o.inputTypes[e.name]=t+""}}),o.abiMap[e.name.split(".")[0]]=n,console.log(e.name.split(".")[0],n))}},getAbiMap(){return this.modelMethod.indexOf(".")>=0?this.abiMap[this.modelMethod.split(".")[0]]:this.abiMap[this.fileName]},getAbiMethod(){if(this.modelMethod.indexOf(".")>=0){let e=this.modelMethod.split(".")[1];return e.indexOf("_")>=0?e.split("_")[0]:e}return this.modelMethod},web3Execute(){""===this.scriptFileName||"auto"!==this.modelExecute||(this.modelMethod="",this.doSwitchMethod()),this.doWeb3Execute()},doSwitchMethod(){if(console.log("doAutoExecute start: ===>"),""===this.scriptFileName)return;let e=this;""!==e.modelMethod&&console.log("before doAutoExecute: ",e.modelMethod,e.scriptMap[e.modelMethod]);for(let t in e.scriptMap)if(t!==e.modelMethod&&(""===e.modelMethod||e.scriptMap[t]["index"]-e.scriptMap[e.modelMethod]["index"]===1)){console.log("doAutoExecute: ",e.modelMethod,t,e.scriptMap[t]),e.workIndex=e.scriptMap[t]["index"],e.modelMethod=t,e.onSelectMethod(t);break}""!==e.modelMethod&&console.log("after doAutoExecute: ",e.modelMethod,e.scriptMap[e.modelMethod])},doWeb3Execute(){if(""===this.modelMethod||""===this.modelAddres)return void this.$Message.error("参数异常, 无效操作");let e=this,t=this.parseParams(this.modelMethod,this.modelParams);console.log("before web3 execute: ",this.modelAddres,this.modelFunc,this.getAbiMap(),this.getAbiMethod(),t),this.executing=!0;const o=this.walletAddress,n=this.$refs.wallet.Execute;n(this.modelFunc,this.getAbiMap(),this.modelAddres,this.getAbiMethod(),o,t,(function(t){e.$Message.success("web3Execute response succesed");let o=t+"";"call"===e.modelFunc&&-1===o.indexOf("blockHash")?(o="",e.modelResult=t+"",e.executeResult[e.modelMethod]=t):"send"===e.modelFunc&&(o="",e.modelResult=JSON.stringify(t)),""===o&&void 0!==e.scriptMap[e.modelMethod]&&null!==e.scriptMap[e.modelMethod]&&(e.doSwitchMethod(),"auto"===e.modelExecute&&e.doWeb3Execute()),e.executing=!1,console.log("web3 execute succesed: ",e.modelResult)}),(function(t){e.executing=!1,e.$Message.error(t),e.modelExecute="hand",e.executeResult[e.modelMethod]=void 0}))},parseParams(e,t){if(""===t)return[];let o=this.getAbiMethod(),n=JSON.parse(t);return this.getAbiMap().forEach(e=>{if(e["name"]!==o)return;if(void 0===e["inputs"])return;let t=function(e,t){let o=function(e,t,o){return console.log("type transfer before: ",t,o[t]),e["type"].indexOf("uint256")>=0&&void 0!==o[t]["BN"]?x.a.utils.toBN(x.a.utils.toWei(o[t]["BN"]+"","ether")):e["type"].indexOf("bytes")>=0?x.a.utils.hexToBytes(o[t]+""):o[t]};return e.forEach((e,n)=>{if(!(n>=t.length)){if(e["type"].indexOf("[]")>0){let i=[];t[n].forEach((s,a)=>{i.push(o(e,a,t[n]))}),t[n]=i}else t[n]=o(e,n,t);console.log("type transfer after: ",n,t[n])}}),t};n=t(e["inputs"],n)}),n}}},R=N,I=(o("7459"),Object(d["a"])(R,m,f,!1,null,"f70e1f06",null)),P=I.exports;n["default"].use(h["a"]);const F=[{path:"/",name:"Home",component:P}],T=new h["a"]({routes:F});var C=T,j=o("00e7"),$=o.n(j),B=o("bc3a"),W=o.n(B);n["default"].use(s.a),n["default"].config.productionTip=!1,n["default"].prototype.$cookie=$.a,W.a.defaults.withCredentials=!0,n["default"].prototype.$axios=W.a,new n["default"]({router:C,render:e=>e(p)}).$mount("#app")},6:function(e,t){},7:function(e,t){},7459:function(e,t,o){"use strict";o("2e18")},8:function(e,t){},9:function(e,t){},f337:function(e,t,o){"use strict";o("413b")}});