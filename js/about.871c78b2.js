(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"159b":function(t,r,e){var n=e("da84"),o=e("fdbc"),i=e("17c2"),a=e("9112");for(var u in o){var c=n[u],f=c&&c.prototype;if(f&&f.forEach!==i)try{a(f,"forEach",i)}catch(s){f.forEach=i}}},"17c2":function(t,r,e){"use strict";var n=e("b727").forEach,o=e("a640"),i=e("ae40"),a=o("forEach"),u=i("forEach");t.exports=a&&u?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,r,e){var n=e("d039"),o=e("b622"),i=e("2d00"),a=o("species");t.exports=function(t){return i>=51||!n((function(){var r=[],e=r.constructor={};return e[a]=function(){return{foo:1}},1!==r[t](Boolean).foo}))}},4160:function(t,r,e){"use strict";var n=e("23e7"),o=e("17c2");n({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},"4de4":function(t,r,e){"use strict";var n=e("23e7"),o=e("b727").filter,i=e("1dde"),a=e("ae40"),u=i("filter"),c=a("filter");n({target:"Array",proto:!0,forced:!u||!c},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"7db0":function(t,r,e){"use strict";var n=e("23e7"),o=e("b727").find,i=e("44d2"),a=e("ae40"),u="find",c=!0,f=a(u);u in[]&&Array(1)[u]((function(){c=!1})),n({target:"Array",proto:!0,forced:c||!f},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i(u)},"96cf":function(t,r,e){var n=function(t){"use strict";var r,e=Object.prototype,n=e.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{c({},"")}catch(G){c=function(t,r,e){return t[r]=e}}function f(t,r,e,n){var o=r&&r.prototype instanceof d?r:d,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=O(t,e,a),i}function s(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(G){return{type:"throw",arg:G}}}t.wrap=f;var h="suspendedStart",p="suspendedYield",l="executing",v="completed",y={};function d(){}function g(){}function m(){}var w={};w[i]=function(){return this};var b=Object.getPrototypeOf,x=b&&b(b(P([])));x&&x!==e&&n.call(x,i)&&(w=x);var E=m.prototype=d.prototype=Object.create(w);function L(t){["next","throw","return"].forEach((function(r){c(t,r,(function(t){return this._invoke(r,t)}))}))}function j(t,r){function e(o,i,a,u){var c=s(t[o],t,i);if("throw"!==c.type){var f=c.arg,h=f.value;return h&&"object"===typeof h&&n.call(h,"__await")?r.resolve(h.__await).then((function(t){e("next",t,a,u)}),(function(t){e("throw",t,a,u)})):r.resolve(h).then((function(t){f.value=t,a(f)}),(function(t){return e("throw",t,a,u)}))}u(c.arg)}var o;function i(t,n){function i(){return new r((function(r,o){e(t,n,r,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function O(t,r,e){var n=h;return function(o,i){if(n===l)throw new Error("Generator is already running");if(n===v){if("throw"===o)throw i;return A()}e.method=o,e.arg=i;while(1){var a=e.delegate;if(a){var u=k(a,e);if(u){if(u===y)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===h)throw n=v,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=l;var c=s(t,r,e);if("normal"===c.type){if(n=e.done?v:p,c.arg===y)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(n=v,e.method="throw",e.arg=c.arg)}}}function k(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator["return"]&&(e.method="return",e.arg=r,k(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=s(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function _(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function R(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function P(t){if(t){var e=t[i];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function e(){while(++o<t.length)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:A}}function A(){return{value:r,done:!0}}return g.prototype=E.constructor=m,m.constructor=g,g.displayName=c(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"===typeof t&&t.constructor;return!!r&&(r===g||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,u,"GeneratorFunction")),t.prototype=Object.create(E),t},t.awrap=function(t){return{__await:t}},L(j.prototype),j.prototype[a]=function(){return this},t.AsyncIterator=j,t.async=function(r,e,n,o,i){void 0===i&&(i=Promise);var a=new j(f(r,e,n,o),i);return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(E),c(E,u,"Generator"),E[i]=function(){return this},E.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){while(r.length){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=P,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(R),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],r=t.completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return u.type="throw",u.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),f=n.call(a,"finallyLoc");if(c&&f){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),y},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),R(e),y}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;R(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),y}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},a640:function(t,r,e){"use strict";var n=e("d039");t.exports=function(t,r){var e=[][t];return!!e&&n((function(){e.call(null,r||function(){throw 1},1)}))}},ae40:function(t,r,e){var n=e("83ab"),o=e("d039"),i=e("5135"),a=Object.defineProperty,u={},c=function(t){throw t};t.exports=function(t,r){if(i(u,t))return u[t];r||(r={});var e=[][t],f=!!i(r,"ACCESSORS")&&r.ACCESSORS,s=i(r,0)?r[0]:c,h=i(r,1)?r[1]:void 0;return u[t]=!!e&&!o((function(){if(f&&!n)return!0;var t={length:-1};f?a(t,1,{enumerable:!0,get:c}):t[1]=1,e.call(t,s,h)}))}},f820:function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"about"},[e("h1",[t._v("Zadar")]),e("p",[t._v(t._s(t.user))]),e("p",[t._v(t._s(t.events))])])},o=[];e("96cf"),e("d3b7");function i(t,r,e,n,o,i,a){try{var u=t[i](a),c=u.value}catch(f){return void e(f)}u.done?r(c):Promise.resolve(c).then(n,o)}function a(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var a=t.apply(r,e);function u(t){i(a,n,o,u,c,"next",t)}function c(t){i(a,n,o,u,c,"throw",t)}u(void 0)}))}}var u=e("d4ec");function c(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function f(t,r,e){return r&&c(t.prototype,r),e&&c(t,e),t}var s=e("262e"),h=e("2caf"),p=e("9ab4"),l=e("60a3");e("4de4"),e("7db0"),e("4160"),e("159b");function v(t){return y.apply(this,arguments)}function y(){return y=a(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",fetch("https://ituapi.herokuapp.com/user-types/"+r).then((function(t){return t.json()})).then((function(t){return t})));case 1:case"end":return t.stop()}}),t)}))),y.apply(this,arguments)}function d(){return g.apply(this,arguments)}function g(){return g=a(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",fetch("https://ituapi.herokuapp.com/event-types/").then((function(t){return t.json()})).then((function(t){return t})));case 1:case"end":return t.stop()}}),t)}))),g.apply(this,arguments)}function m(t){return w.apply(this,arguments)}function w(){return w=a(regeneratorRuntime.mark((function t(r){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://ituapi.herokuapp.com/users/"+r).then((function(t){return t.json()})).then((function(t){return t}));case 2:return e=t.sent,t.next=5,v(e.type);case 5:return n=t.sent,e.typeObj=n,t.abrupt("return",e);case 8:case"end":return t.stop()}}),t)}))),w.apply(this,arguments)}function b(){return x.apply(this,arguments)}function x(){return x=a(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d();case 2:return r=t.sent,t.abrupt("return",fetch("https://ituapi.herokuapp.com/events/").then((function(t){return t.json()})).then((function(t){return t})).then((function(t){return t.forEach((function(t){t.eventTypeObj=r.find((function(r){return r.id===t.eventType}))})),t})));case 4:case"end":return t.stop()}}),t)}))),x.apply(this,arguments)}function E(t){return L.apply(this,arguments)}function L(){return L=a(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",b().then((function(t){return t.filter((function(t){return t.pilotId===r||t.escortId===r}))})));case 1:case"end":return t.stop()}}),t)}))),L.apply(this,arguments)}var j=function(t){Object(s["a"])(e,t);var r=Object(h["a"])(e);function e(){var t;return Object(u["a"])(this,e),t=r.apply(this,arguments),t.user={},t.events=[],t}return f(e,[{key:"created",value:function(){var t=a(regeneratorRuntime.mark((function t(){var r=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m(1).then((function(t){return r.user=t}));case 2:E(this.user.id).then((function(t){return r.events=t}));case 3:case"end":return t.stop()}}),t,this)})));function r(){return t.apply(this,arguments)}return r}()}]),e}(l["c"]);j=Object(p["a"])([l["a"]],j);var O=j,k=O,_=e("2877"),R=Object(_["a"])(k,n,o,!1,null,null,null);r["default"]=R.exports}}]);
//# sourceMappingURL=about.871c78b2.js.map