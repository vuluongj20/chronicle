(this.webpackJsonpcovid=this.webpackJsonpcovid||[]).push([[0],{39:function(e,t,a){e.exports=a(81)},44:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){},79:function(e,t,a){},80:function(e,t,a){},81:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(17),c=a.n(o),s=(a(44),a(20)),i=a.n(s),l=a(38),u=a(35),m=a(4),d=a(7),p=a(6),h=a(5),f=a(10),v=a(15),y=a.n(v),b=a(9),g=a(12),E=a(23),w=a(1),O=(a(69),a(37)),x=a(24),C=a(25);function j(e){var t=[{month:1,name:"Jan",days:31},{month:2,name:"Feb",days:28},{month:3,name:"Mar",days:31},{month:4,name:"Apr",days:30},{month:5,name:"May",days:31},{month:6,name:"Jun",days:30},{month:7,name:"Jul",days:31},{month:8,name:"Aug",days:31},{month:9,name:"Sep",days:30},{month:10,name:"Oct",days:31},{month:11,name:"Nov",days:30},{month:12,name:"Dec",days:31}],a=e.start.split("-"),n=e.end.split("-"),r=[];function o(e){return e%4===0&&e%100!==0||e%400===0}a.forEach((function(e,t){return a[t]=+e})),n.forEach((function(e,t){return n[t]=+e}));for(var c=a[0],s=a[1];c!==n[0]||s!==n[1];){var i=t[s-1];o(c)&&2===s&&(i.days=29),i.year=c,i.daysCounted=i.days,r.push(i),12!==s?s+=1:(s=1,c+=1)}r[0].daysCounted=r[0].days-a[2]+1;var l=t[n[1]-1];return o(n[0])&&2===n[1]&&(l.days=29),l.year=n[0],l.daysCounted=n[2],r.push(l),r}function N(e,t,a,n,r,o,c){var s=e.schemaMapper,i=n.schemaMapper,l=document.getElementById("earth-canvas-wrapper").getBoundingClientRect(),u=new w.A({antialias:!0,powerPreference:"high-performance"}),m=new w.r;function d(e,t,a){var n=e*Math.PI/180,r=t*Math.PI/180;return[a*Math.cos(r)*Math.cos(n),a*Math.sin(r),-a*Math.cos(r)*Math.sin(n)]}function p(e,t){var a,n=new Array(e.length),r=new w.c,o=0,c=Object(E.a)(e);try{for(c.s();!(a=c.n()).done;){var s=a.value,i=r.clone(),l=[];l.push.apply(l,Object(g.a)(d(s[0][0],s[0][1],100)));var u,p=Object(E.a)(s.slice(1));try{for(p.s();!(u=p.n()).done;){var h=u.value;l.push.apply(l,Object(g.a)(d(h[0],h[1],100))),l.push.apply(l,Object(g.a)(d(h[0],h[1],100)))}}catch(y){p.e(y)}finally{p.f()}l.push.apply(l,Object(g.a)(d(s[s.length-1][0],s[s.length-1][1],100))),i.setAttribute("position",new w.g(l,3)),i.computeBoundingSphere(),n[o]=i,o+=1}}catch(y){c.e(y)}finally{c.f()}var f=x.a.mergeBufferGeometries(n),v=new w.k(f,t);m.add(v)}var h=C.a(a),f=C.a(t);p(h.coordinates,new w.j({color:"#CCC"})),p(f.coordinates,new w.j({color:"#BBB"}));var v=new w.s(100,48,48),y=new w.n({color:"#FFFFFF"}),j=new w.m(v,y);m.add(j);var N=new w.d(.2,.2,1,8);function k(e,t,a,n){var r=new Array(e.data.length),o=t.data[n],c=t.schemaMapper["".concat(a.variable).concat(a.normalize?"Normalized":"").concat(a.logScale?"Log":"")],l=0;return e.data.forEach((function(e,t){var a=N.clone(),n=0;o[l]&&o[l][i.fips]===e[s.fips]&&(n=o[l][c],l+=1),a.translate(0,.5,0),a.scale(1,n,1),a.rotateX(Math.atan(e[s.z]/e[s.y])),a.rotateZ(Math.atan(-e[s.x]/e[s.y])),a.translate(.99*e[s.x],.99*e[s.y],.99*e[s.z]),a.county={fips:e[s.fips],name:e[s.county],state:e[s.state],population:e[s.population]},r[t]=a})),x.a.mergeBufferGeometries(r,!1)}var L={},S={},D=[];for(var M in n.data)L[M]=k(e,n,Object(b.a)(Object(b.a)({},o),{},{variable:"cases"}),M),S[M]=k(e,n,Object(b.a)(Object(b.a)({},o),{},{variable:"deaths"}),M),D.push(M);var A=[],T=[];for(var F in D){var R=D[+F],P=L[R],z=S[R];if(P.key=R,z.key=R,P.ind=+F,z.ind=+F,+F!==D.length-1){var I=L[D[+F+1]].getAttribute("position");I.name="".concat(D[+F+1]),P.morphAttributes.position=[I];var _=S[D[+F+1]].getAttribute("position");_.name="".concat(D[+F+1]),z.morphAttributes.position=[_]}A.push(P),T.push(z)}var B=new w.o({color:"cases"===o.variable?"#D5DD3C":"#DD3CD5",flatShading:!0,transparent:!0,opacity:.8,morphTargets:!0}),G=new w.m(A[0],B);m.add(G);var U=new w.p(75,l.width/l.height,.1,300),W=new O.a(U,u.domElement);W.update(),W.target.set(0,0,0),W.enableDamping=!0,W.dampingFactor=.1,W.zoomSpeed=.3,W.maxPolarAngle=Math.PI/1.1,W.minPolarAngle=.1,W.maxAzimuthAngle=Math.PI/2.1,W.minAzimuthAngle=-Math.PI/2.1,W.maxDistance=360,W.minDistance=120;var Z=new w.a("#FFFFFF",.8),H=new w.e("#FFFFFF",.2);return H.position.set(0,0,60),m.add(Z),m.add(H),u.setSize(l.width,l.height),u.setPixelRatio(window.devicePixelRatio),u.setClearColor("#FFFFFF",1),u.render(m,U),function e(){W.update(),u.render(m,U),requestAnimationFrame(e)}(),{camera:U,orbitControls:W,cylinderMesh:G,baseCaseGeometries:A,baseDeathGeometries:T,renderer:u}}var k=a(3),L=a(11);function S(){return(S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function D(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var M=r.a.createElement("title",null,"Twitter"),A=r.a.createElement("g",{className:"to-fill"},r.a.createElement("path",{d:"M15.4 0L32.6 0C38 0 39.9 0.6 41.9 1.6 43.8 2.6 45.4 4.2 46.4 6.1 47.4 8.1 48 10 48 15.4L48 32.6C48 38 47.4 39.9 46.4 41.9 45.4 43.8 43.8 45.4 41.9 46.4 39.9 47.4 38 48 32.6 48L15.4 48C10 48 8.1 47.4 6.1 46.4 4.2 45.4 2.6 43.8 1.6 41.9 0.6 39.9 0 38 0 32.6L0 15.4C0 10 0.6 8.1 1.6 6.1 2.6 4.2 4.2 2.6 6.1 1.6 8.1 0.6 10 0 15.4 0ZM19.2 38C30.8 38 37.2 28.4 37.2 20 37.2 19.8 37.2 19.5 37.2 19.2 38.4 18.3 39.5 17.2 40.3 16 39.2 16.4 38 16.8 36.7 16.9 38 16.2 39 14.9 39.5 13.5 38.3 14.2 36.9 14.7 35.5 15 34.3 13.8 32.7 13 30.9 13 27.4 13 24.6 15.8 24.6 19.3 24.6 19.8 24.6 20.3 24.7 20.7 19.5 20.5 14.8 18 11.7 14.2 11.2 15.1 10.9 16.2 10.9 17.3 10.9 19.5 12 21.4 13.7 22.6 12.7 22.5 11.7 22.2 10.8 21.8L10.8 21.8C10.8 24.9 13 27.4 15.9 28 15.4 28.2 14.8 28.3 14.2 28.3 13.8 28.3 13.4 28.2 13.1 28.1 13.9 30.6 16.2 32.5 18.9 32.5 16.8 34.2 14.1 35.2 11.1 35.2 10.6 35.2 10.1 35.2 9.6 35.1 12.4 36.9 15.7 38 19.2 38L19.2 38Z"})),T=function(e){var t=e.svgRef,a=e.title,n=D(e,["svgRef","title"]);return r.a.createElement("svg",S({width:48,height:48,viewBox:"0 0 48 48",ref:t},n),void 0===a?M:a?r.a.createElement("title",null,a):null,r.a.createElement("g",{style:{fill:"none",strokeWidth:1,stroke:"none"}},A))},F=r.a.forwardRef((function(e,t){return r.a.createElement(T,S({svgRef:t},e))}));a.p;function R(){return(R=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function P(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var z=r.a.createElement("title",null,"Facebook"),I=r.a.createElement("g",{className:"to-fill"},r.a.createElement("path",{d:"M15.4 0L32.6 0C38 0 39.9 0.6 41.9 1.6 43.8 2.6 45.4 4.2 46.4 6.1 47.4 8.1 48 10 48 15.4L48 32.6C48 38 47.4 39.9 46.4 41.9 45.4 43.8 43.8 45.4 41.9 46.4 39.9 47.4 38 48 32.6 48L15.4 48C10 48 8.1 47.4 6.1 46.4 4.2 45.4 2.6 43.8 1.6 41.9 0.6 39.9 0 38 0 32.6L0 15.4C0 10 0.6 8.1 1.6 6.1 2.6 4.2 4.2 2.6 6.1 1.6 8.1 0.6 10 0 15.4 0ZM38.7 23.9L31.9 23.9 31.9 19.3C31.9 17.4 32.8 15.5 35.9 15.5L39 15.5 39 9.5C39 9.5 36.1 9 33.5 9 27.9 9 24.2 12.4 24.2 18.5L24.2 23.9 18 23.9 18 31 24.2 31 24.2 48C25.4 48 30.5 48 31.9 48L31.9 31 37.6 31 38.7 23.9Z"})),_=function(e){var t=e.svgRef,a=e.title,n=P(e,["svgRef","title"]);return r.a.createElement("svg",R({width:48,height:48,viewBox:"0 0 48 48",ref:t},n),void 0===a?z:a?r.a.createElement("title",null,a):null,r.a.createElement("g",{style:{fill:"none",strokeWidth:1,stroke:"none"}},I))},B=r.a.forwardRef((function(e,t){return r.a.createElement(_,R({svgRef:t},e))}));a.p;function G(){return(G=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function U(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var W=r.a.createElement("title",null,"Linkedin"),Z=r.a.createElement("g",{className:"to-fill"},r.a.createElement("path",{d:"M15.4 0L32.6 0C38 0 39.9 0.6 41.9 1.6 43.8 2.6 45.4 4.2 46.4 6.1 47.4 8.1 48 10 48 15.4L48 32.6C48 38 47.4 39.9 46.4 41.9 45.4 43.8 43.8 45.4 41.9 46.4 39.9 47.4 38 48 32.6 48L15.4 48C10 48 8.1 47.4 6.1 46.4 4.2 45.4 2.6 43.8 1.6 41.9 0.6 39.9 0 38 0 32.6L0 15.4C0 10 0.6 8.1 1.6 6.1 2.6 4.2 4.2 2.6 6.1 1.6 8.1 0.6 10 0 15.4 0ZM16.3 36.9L16.3 18.2 10.1 18.2 10.1 36.9 16.3 36.9ZM38.9 36.9L38.9 26.2C38.9 20.4 35.8 17.7 31.6 17.7 28.3 17.7 26.8 19.5 26 20.8L26 18.2 19.7 18.2C19.8 19.9 19.7 36.9 19.7 36.9L26 36.9 26 26.4C26 25.9 26 25.3 26.2 24.9 26.6 23.8 27.7 22.6 29.4 22.6 31.7 22.6 32.6 24.4 32.6 26.9L32.6 36.9 38.9 36.9 38.9 36.9ZM13.2 9.1C11 9.1 9.6 10.5 9.6 12.4 9.6 14.3 11 15.8 13.1 15.8L13.2 15.8C15.4 15.8 16.8 14.3 16.8 12.4 16.8 10.5 15.4 9.1 13.2 9.1L13.2 9.1Z"})),H=function(e){var t=e.svgRef,a=e.title,n=U(e,["svgRef","title"]);return r.a.createElement("svg",G({width:48,height:48,viewBox:"0 0 48 48",ref:t},n),void 0===a?W:a?r.a.createElement("title",null,a):null,r.a.createElement("g",{style:{fill:"none",strokeWidth:1,stroke:"none"}},Z))},V=r.a.forwardRef((function(e,t){return r.a.createElement(H,G({svgRef:t},e))}));a.p;function J(){return(J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function X(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var q=r.a.createElement("title",null,"Email"),Y=r.a.createElement("g",{className:"to-fill"},r.a.createElement("path",{d:"M32.6 0C38 0 39.9 0.6 41.9 1.6 43.8 2.6 45.4 4.2 46.4 6.1 47.4 8.1 48 10 48 15.4L48 32.6C48 38 47.4 39.9 46.4 41.9 45.4 43.8 43.8 45.4 41.9 46.4 39.9 47.4 38 48 32.6 48L15.4 48C10 48 8.1 47.4 6.1 46.4 4.2 45.4 2.6 43.8 1.6 41.9 0.6 39.9 0 38 0 32.6L0 15.4C0 10 0.6 8.1 1.6 6.1 2.6 4.2 4.2 2.6 6.1 1.6 8.1 0.6 10 0 15.4 0L32.6 0ZM37 20C37 20 26.7 28.3 24.5 28.3 22.5 28.3 12 20 12 20L12 20 12 32.9C12 34 12.9 35 14.1 35L14.1 35 34.9 35C36.1 35 37 34 37 32.9L37 32.9ZM34.9 14L14.1 14C12.9 14 12 15 12 16.2L12 16.2 12 17.2C12 17.2 22.5 26 24.5 26 26.6 26 37 17.3 37 17.3L37 17.3 37 16.2C37 15 36.1 14 34.9 14L34.9 14Z"})),K=function(e){var t=e.svgRef,a=e.title,n=X(e,["svgRef","title"]);return r.a.createElement("svg",J({width:48,height:48,viewBox:"0 0 48 48",ref:t},n),void 0===a?q:a?r.a.createElement("title",null,a):null,r.a.createElement("g",{style:{fill:"none",strokeWidth:1,stroke:"none"}},Y))},Q=r.a.forwardRef((function(e,t){return r.a.createElement(K,J({svgRef:t},e))}));a.p;function $(){return($=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function ee(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var te=r.a.createElement("title",null,"Link"),ae=r.a.createElement("g",{className:"to-fill"},r.a.createElement("path",{d:"M15.4 0L32.6 0C38 0 39.9 0.6 41.9 1.6 43.8 2.6 45.4 4.2 46.4 6.1 47.4 8.1 48 10 48 15.4L48 32.6C48 38 47.4 39.9 46.4 41.9 45.4 43.8 43.8 45.4 41.9 46.4 39.9 47.4 38 48 32.6 48L15.4 48C10 48 8.1 47.4 6.1 46.4 4.2 45.4 2.6 43.8 1.6 41.9 0.6 39.9 0 38 0 32.6L0 15.4C0 10 0.6 8.1 1.6 6.1 2.6 4.2 4.2 2.6 6.1 1.6 8.1 0.6 10 0 15.4 0ZM20.8 31.5L19.4 32.8C18.3 34 16.4 34 15.2 32.8 14.7 32.2 14.3 31.5 14.3 30.7 14.3 29.9 14.7 29.2 15.2 28.6L20.2 23.7C21.2 22.7 23.1 21.2 24.5 22.6 25.2 23.2 26.2 23.2 26.9 22.6 27.5 21.9 27.5 20.9 26.9 20.2 24.5 17.9 20.9 18.3 17.8 21.4L12.9 26.3C11.7 27.5 11 29 11 30.7 11 32.4 11.7 34 12.9 35.1 14.1 36.4 15.7 37 17.3 37 18.9 37 20.5 36.4 21.8 35.1L23.1 33.8C23.8 33.2 23.8 32.1 23.1 31.5 22.5 30.8 21.4 30.8 20.8 31.5ZM35.1 13C32.5 10.5 28.9 10.4 26.6 12.7L24.9 14.3C24.2 15 24.2 16 24.9 16.6 25.5 17.3 26.6 17.3 27.2 16.6L28.9 15C30.1 13.8 31.7 14.3 32.8 15.3 33.3 15.9 33.7 16.6 33.7 17.4 33.7 18.1 33.3 18.9 32.8 19.4L27.5 24.6C25.1 26.9 23.9 25.8 23.5 25.4 22.8 24.7 21.8 24.7 21.1 25.4 20.5 26 20.5 27 21.1 27.7 22.2 28.7 23.5 29.3 24.8 29.3 26.5 29.3 28.2 28.5 29.8 26.9L35.1 21.7C36.3 20.6 37 19 37 17.4 37 15.7 36.3 14.2 35.1 13Z"})),ne=function(e){var t=e.svgRef,a=e.title,n=ee(e,["svgRef","title"]);return r.a.createElement("svg",$({width:48,height:48,viewBox:"0 0 48 48",ref:t},n),void 0===a?te:a?r.a.createElement("title",null,a):null,r.a.createElement("g",{style:{fill:"none",strokeWidth:1,stroke:"none"}},ae))},re=r.a.forwardRef((function(e,t){return r.a.createElement(ne,$({svgRef:t},e))})),oe=(a.p,a(70),"https://chronicle.vuluong.me"),ce="How the coronavirus took hold of the United States",se=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={showShareWrap:!1},n.copyMessageRef=r.a.createRef(),n}return Object(d.a)(a,[{key:"copy",value:function(e){var t=this,a=document.createElement("textarea");a.value=e,document.body.appendChild(a),a.select(),a.setSelectionRange(0,99999),document.execCommand("copy"),document.body.removeChild(a),this.copyMessageRef.current.style.opacity=1,setTimeout((function(){t.copyMessageRef.current.style.opacity=0}),1e3)}},{key:"toggleShareWrap",value:function(e){e?(document.getElementsByClassName("nav-share-outer-wrap")[0].style.pointerEvents="all",document.body.style.overflow="hidden",k.a.to(".nav-share-wrap-background",{duration:.6,ease:"power2.out",opacity:.32}),k.a.fromTo(".nav-share-content-wrap",{y:"+=160"},{duration:.8,ease:"expo.out",opacity:1,y:"0"})):(document.getElementsByClassName("nav-share-outer-wrap")[0].style.pointerEvents="none",document.body.style.overflow="initial",k.a.to(".nav-share-wrap-background",{duration:.4,ease:"power2.out",opacity:0}),k.a.fromTo(".nav-share-content-wrap",{y:"0"},{duration:.6,ease:"expo.out",opacity:0,y:"+=160"}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"nav-wrap"},r.a.createElement("div",{className:"nav-inner-wrap"},r.a.createElement("a",{className:"nav-app-name",href:"/"},"Chronicle"),r.a.createElement("div",{className:"nav-buttons"},r.a.createElement("button",{className:"nav-button",onClick:function(){return e.toggleShareWrap(!0)}},"Share"))),r.a.createElement("div",{className:"nav-share-outer-wrap"},r.a.createElement("div",{className:"nav-share-wrap-background",onClick:function(){return e.toggleShareWrap(!1)}}),r.a.createElement("div",{className:"nav-share-content-wrap"},r.a.createElement("h3",{className:"nav-share-head"},"Share"),r.a.createElement("div",{className:"nav-share-wrap"},r.a.createElement("a",{className:"nav-share-button",href:"http://twitter.com/share?url=".concat(oe,"&text=").concat(ce),target:"_blank",rel:"noopener noreferrer"},r.a.createElement(F,null)),r.a.createElement("a",{className:"nav-share-button",href:"https://www.facebook.com/sharer/sharer.php?u=".concat(oe),target:"_blank",rel:"noopener noreferrer"},r.a.createElement(B,null)),r.a.createElement("a",{className:"nav-share-button",href:"https://www.linkedin.com/sharing/share-offsite?url=".concat(oe),target:"_blank",rel:"noopener noreferrer"},r.a.createElement(V,null)),r.a.createElement("a",{className:"nav-share-button",href:"mailto:?subject=".concat(ce,"&body=").concat(oe),target:"_blank",rel:"noopener noreferrer"},r.a.createElement(Q,null)),r.a.createElement("button",{className:"nav-share-button",onClick:function(){return e.copy(oe)}},r.a.createElement(re,null),r.a.createElement("p",{className:"copy-message hidden",ref:this.copyMessageRef},"URL copied to clipboard"))),r.a.createElement("div",{className:"nav-share-close-wrap",onClick:function(){return e.toggleShareWrap(!1)}},r.a.createElement("div",{className:"nav-share-close-line first"}),r.a.createElement("div",{className:"nav-share-close-line second"})))))}}]),a}(n.Component);a(71);var ie=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.options,a=e.updateOptions;return r.a.createElement("div",{className:"variable-selection-wrap"},r.a.createElement("div",{className:"variable-selection-inner-wrap themed"},r.a.createElement("button",{className:"variable-option ".concat("cases"===t.variable?"active":""),onClick:function(){return"cases"!==t.variable&&a({variable:"cases"})}},"Cases"),r.a.createElement("button",{className:"variable-option ".concat("deaths"===t.variable?"active":""),onClick:function(){return"deaths"!==t.variable&&a({variable:"deaths"})}},"Deaths")))}}]),a}(n.Component),le=Object(f.b)((function(e){return{options:e.options}}),(function(e){return{updateOptions:function(t,a,n){return e(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"expo.out";return{type:"UPDATE_OPTIONS",options:e,duration:t,ease:a}}(t))}}}))(ie),ue=(a(72),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.date,a=e.variable,n=e.nationalData;return r.a.createElement("div",{className:"count-wrap"},n&&n.data&&n.data[t]&&[r.a.createElement("h2",{className:"count",key:"count"},n.data[t][n.schemaMapper[a]].toLocaleString("en-US")),r.a.createElement("p",{className:"count-unit",key:"count-unit"},"total ".concat(a," nation-wide"))])}}]),a}(n.Component)),me=Object(f.b)((function(e){return{date:e.date,variable:e.options.variable}}),null)(ue),de=(a(73),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props.variable;return r.a.createElement("div",{className:"data-descriptions-wrap"},r.a.createElement("p",{className:"dd-text"},"Bars represent county-level cumulative ".concat("cases"===e?"case":"death"," counts, adjusted for population")))}}]),a}(n.Component)),pe=Object(f.b)((function(e){return{variable:e.options.variable}}),null)(de),he=(a(74),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props.nationalData;return r.a.createElement("div",{className:"earth"},r.a.createElement("div",{id:"earth-canvas-wrapper"}),r.a.createElement("div",{className:"overlap-wrap"},r.a.createElement(le,null),r.a.createElement(me,{nationalData:e}),r.a.createElement(pe,null)))}}]),a}(n.Component)),fe=(a(75),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"componentDidMount",value:function(){k.a.to(".hero-cover-start",{duration:1.6,ease:"expo.inOut",scaleX:0})}},{key:"render",value:function(){var e=this.props,t=e.nationalData,a=e.cylinders,n=e.monthArray;return r.a.createElement("div",{className:"left-wrap"},r.a.createElement(he,{nationalData:t,cylinders:a,monthArray:n}),r.a.createElement("img",{src:"https://res.cloudinary.com/vuluongj20/image/upload/v1597470777/chronicle/hero.svg",className:"hero"}),r.a.createElement("div",{className:"hero-cover-start"}),r.a.createElement("div",{className:"hero-cover-end"}))}}]),a}(n.Component)),ve=(a(76),"https://chronicle.vuluong.me"),ye={head:"How the coronavirus took hold of the United States",des:"A look back at the unprecedented growth of the coronavirus pandemic."},be=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).copyMessageRef=r.a.createRef(),n}return Object(d.a)(a,[{key:"copy",value:function(e){var t=this,a=document.createElement("textarea");a.value=e,document.body.appendChild(a),a.select(),a.setSelectionRange(0,99999),document.execCommand("copy"),document.body.removeChild(a),this.copyMessageRef.current.style.opacity=1,setTimeout((function(){t.copyMessageRef.current.style.opacity=0}),1e3)}},{key:"componentDidMount",value:function(){k.a.to(".title-head-word",{duration:1.4,ease:"expo.inOut",stagger:.04,y:0}),k.a.to(".title-bar",{duration:1.4,ease:"expo.inOut",scaleX:1}),k.a.to([".title-des",".share-wrap"],{duration:1.2,delay:.4,ease:"expo.inOut",stagger:.04,opacity:1})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"title-wrap"},r.a.createElement("div",{className:"title-bar"}),r.a.createElement("h1",{className:"title-head"},ye.head.split(" ").map((function(e,t){return r.a.createElement("span",{className:"title-head-word-wrap",key:t},r.a.createElement("span",{className:"title-head-word"},"".concat(e," ")))}))),r.a.createElement("h4",{className:"title-des"},"A look back at the unprecedented growth of the coronavirus pandemic."),r.a.createElement("div",{className:"share-wrap"},r.a.createElement("a",{className:"share-button",href:"http://twitter.com/share?url=".concat(ve,"&text=").concat(ye.head),target:"_blank",rel:"noopener noreferrer"},r.a.createElement(F,null)),r.a.createElement("a",{className:"share-button",href:"https://www.facebook.com/sharer/sharer.php?u=".concat(ve),target:"_blank",rel:"noopener noreferrer"},r.a.createElement(B,null)),r.a.createElement("a",{className:"share-button",href:"https://www.linkedin.com/sharing/share-offsite?url=".concat(ve),target:"_blank",rel:"noopener noreferrer"},r.a.createElement(V,null)),r.a.createElement("a",{className:"share-button",href:"mailto:?subject=".concat(ye.head,"&body=").concat(ve),target:"_blank",rel:"noopener noreferrer"},r.a.createElement(Q,null)),r.a.createElement("button",{className:"share-button",onClick:function(){return e.copy(ve)}},r.a.createElement(re,null)),r.a.createElement("span",{className:"copy-message",ref:this.copyMessageRef},"URL copied to clipboard")))}}]),a}(n.Component),ge=(a(77),{"2020-01-22":{text:"A man in Washington State is infected with the newly discovered coronavirus, the first confirmed case in the United States. Federal officials expand screenings at major airports. Life continues as normal for most Americans.",camera:{l:{x:-48,y:106,z:77},s:{x:-41,y:91,z:66}}},"2020-02-15":{text:"Total case number has slowly grown to 15. New cases are popping up in the East Coast. Future studies will suggest they came from Europe."},"2020-02-29":{text:"The first death is recorded in the country. There are now 70 confirmed cases in the country.",camera:{l:{x:16,y:85,z:107},s:{x:20,y:81,z:102}}},"2020-03-13":{text:"President Trump declares a state of emergency. Total cases surpasses 2,000.",camera:{l:{x:-16,y:112,z:140},s:{x:-16,y:96,z:117}}},"2020-03-18":{text:"China reports zero local daily infections for the first time since the start of the pandemic. Meanwhile total U.S. cases shoots past 8,000."},"2020-04-02":{text:"Cases tops 1 million. Nearly 10 million americans were out of work due to the health crisis."},"2020-04-17":{text:"Protests against social distancing restrictions erupt in Michigan, Minnesota and Ohio."},"2020-04-29":{text:"A National Institute of Health trial show that remdesivir, made by Gilead Sciences, can decrease COVID-19 recovery time."},"2020-05-12":{text:"Dr. Anthony Fauci, director of the National Institute of Allergy and Infectious Diseases, testifies before the US Senate, saying that the death toll of 80,000 is likely an underestimate."},"2020-05-27":{text:"More than 100,000 people have died from the virus."},"2020-06-10":{text:"Total cases reach 2 million."},"2020-06-20":{text:"Southern U.S. states see sharp rise in cases. Florida and South Carolina breaks their single-day record for the third straight day."},"2020-06-30":{text:"The E.U. says it would reopen its border to 15 countries, but not including the United States."},"2020-07-07":{text:"The Trump administration sends formal notice of U.S. withdrawal from the W.H.O. Total cases reach 3 million."},"2020-07-23":{text:"Cases reach 4 million. It took 72 days to reach the first million, 69 days to reach the second, 27 to reach the third, and 16 days to reach the fourth."},"2020-08-08":{text:"Total cases reach 5 million."},"2020-08-23":{text:"The U.S. Food and Drug Adminstration issues emergency use authorization for convalescent plasma to treat COVID-19."},"2020-08-30":{text:"More than 6 million total cases have been reported."},"2020-09-11":{text:"Despite limited reopening and health precautions, American colleges and universities have reported more than 36,000 coronavirus cases."}}),Ee="Loading new data",we="Scroll to begin",Oe=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={currentDate:null},n}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this,a=e.date,n=e.monthArray,r=e.loading,o=this.props,c=o.date,s=o.monthArray;if(!o.loading&&r){var i=window.innerHeight/100;k.a.to([".st-current-date-ball",".st-line-start"],{duration:1.6,delay:.6,ease:"expo.out",opacity:1}),k.a.to(".st-line",{duration:.8,delay:.6,ease:"expo.in",scaleY:1}),k.a.to(".st-current-date-loading-text",{duration:1.6,delay:.6,ease:"expo.out",y:"-100%"}),k.a.to(".st-current-date-loading-wrap",{duration:1.6,delay:.6,ease:"expo.out",opacity:0,onComplete:function(){var e=document.getElementsByClassName("st-current-date-loading-wrap")[0];e.parentNode.removeChild(e)}}),k.a.to(".st-current-date-scroll-text",{duration:1.6,delay:.6,ease:"expo.out",opacity:1,y:"-50%",onComplete:function(){L.b.create({animation:k.a.timeline().add(k.a.fromTo(".st-current-date-scroll-text",{opacity:1},{opacity:0}),0),start:"top top",end:"top+=".concat(10*i,"px top"),scrub:0})}})}if(s&&!n&&this.setState({currentDate:"".concat(s[0].name," ").concat(s[0].days-s[0].daysCounted)},(function(){var e=function(e,a){var n;e.forEach((function(e){e.isIntersecting&&(n=e.target.dataset.date)})),n&&t.props.moveToDate(n)};t.observerL=new IntersectionObserver(e,{rootMargin:"-50% 0% -50% 0%"}),t.observerS=new IntersectionObserver(e,{rootMargin:"-75% 0% -25% 0%"}),setTimeout((function(){window.innerWidth>window.innerHeight?document.querySelectorAll(".st-date-wrap").forEach((function(e){return t.observerL.observe(e)})):document.querySelectorAll(".st-date-wrap").forEach((function(e){return t.observerS.observe(e)}))}),2);var a=t.props.camera,n=window.innerHeight/100,r=function(e,t){var r;Object.keys(ge).forEach((function(o,c){ge[o].camera&&(0===c?L.b.create({trigger:".scroll-timeline-wrap",animation:k.a.to(a.position,{duration:1,x:ge[o].camera[e].x,y:ge[o].camera[e].y,z:ge[o].camera[e].z}),start:"top-=".concat(5*n,"px ").concat(t),endTrigger:"#st-".concat(o),end:"center ".concat(t),scrub:.2}):L.b.create({trigger:"#st-".concat(r),animation:k.a.fromTo(a.position,{x:ge[r].camera[e].x,y:ge[r].camera[e].y,z:ge[r].camera[e].z},{duration:1,x:ge[o].camera[e].x,y:ge[o].camera[e].y,z:ge[o].camera[e].z}),start:"center+=".concat(5*n,"px ").concat(t),endTrigger:"#st-".concat(o),end:"center-=".concat(5*n,"px ").concat(t),scrub:.2}),r=o)}))};setTimeout((function(){L.b.matchMedia({"(min-aspect-ratio: 1/1)":function(){return r("l","center")},"(max-aspect-ratio: 1/1)":function(){return r("s","75%")}})}),0)})),c!==a){var l=c.split("-").map((function(e){return+e})),u=s.find((function(e){return e.year===l[0]&&e.month===l[1]}));this.setState({currentDate:"".concat(u.name," ").concat(l[2])})}}},{key:"componentDidMount",value:function(){var e,t=this,a=function(){window.innerWidth>window.innerHeight?document.querySelectorAll(".st-date-wrap").forEach((function(e){t.observerL.observe(e),t.observerS.unobserve(e)})):document.querySelectorAll(".st-date-wrap").forEach((function(e){t.observerS.observe(e),t.observerL.unobserve(e)}))};this.resizeListener=function(){clearTimeout(e),e=setTimeout(a,250)},window.addEventListener("resize",this.resizeListener)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resizeListener)}},{key:"render",value:function(){var e=this.props,t=e.monthArray,a=e.loading,n=this.state.currentDate;return r.a.createElement("div",{className:"scroll-timeline-wrap"},r.a.createElement("div",{className:"st-line-wrap"},r.a.createElement("div",{className:"st-line-start"}),r.a.createElement("div",{className:"st-line"})),r.a.createElement("div",{className:"st-current-date-wrap"},r.a.createElement("div",{className:"st-current-date-ball"}),r.a.createElement("div",{className:"st-current-date-loading-wrap"},r.a.createElement("svg",{className:"loading-circle-svg",width:"2em",height:"2em"},r.a.createElement("circle",{className:"loading-circle"})),r.a.createElement("p",{className:"st-current-date-loading-text"},Ee)),r.a.createElement("p",{className:"st-current-date-scroll-text"},we),r.a.createElement("div",{className:"st-current-date-tag-wrap"},r.a.createElement("p",{className:"st-current-date-tag"},n))),r.a.createElement("div",{className:"st-top-padding ".concat(a?"":"full")}),r.a.createElement("div",{className:"st-timeline-content"},!a&&t&&t.map((function(e,t){return r.a.createElement("div",{className:"st-month-wrap",key:"".concat(e.year,"-").concat(e.month)},Object(g.a)(Array(e.daysCounted)).map((function(a,n){var o=n+1;0===t&&(o+=e.days-e.daysCounted);var c=e.month>9?e.month:"0".concat(e.month),s=o>9?o:"0".concat(o),i="".concat(e.year,"-").concat(c,"-").concat(s);return r.a.createElement("div",{key:"".concat(e.year,"-").concat(e.month,"-").concat(o),"data-date":"".concat(e.year,"-").concat(c,"-").concat(s),id:"st-".concat(e.year,"-").concat(c,"-").concat(s),className:"st-date-wrap"},1===o&&r.a.createElement("div",{className:"st-anchor-wrap"},r.a.createElement("div",{className:"st-month-anchor"},e.name)),10===o&&r.a.createElement("div",{className:"st-anchor-wrap"},r.a.createElement("div",{className:"st-date-anchor"},"10")),20===o&&r.a.createElement("div",{className:"st-anchor-wrap"},r.a.createElement("div",{className:"st-date-anchor"},"20")),ge[i]&&r.a.createElement("div",{className:"st-message-wrap"},r.a.createElement("div",{className:"st-message-line"}),r.a.createElement("div",{className:"st-message-content"},r.a.createElement("p",{className:"st-message-date"}),r.a.createElement("p",{className:"st-message"},r.a.createElement("span",{className:"st-message-date"},"".concat(e.name," ").concat(o,". ")),r.a.createElement("span",{className:"st-message-text"},ge[i].text)))))})))}))))}}]),a}(n.Component),xe=Object(f.b)((function(e){return{date:e.date}}),(function(e){return{moveToDate:function(t){return e(function(e){return{type:"MOVE_TO_DATE",date:e}}(t))}}}))(Oe),Ce=(a(78),[[{type:"text",text:"Made possible with coronavirus data published by "},{type:"link",text:"the New York Times",url:"https://github.com/nytimes/covid-19-data"},{type:"text",text:", based on reports from state and local health agencies."}],[{type:"text",text:"Designed and developed by "},{type:"link",text:"Vu Luong",url:"https://www.vuluong.me/"},{type:"text",text:"."}],[{type:"text",text:"Illustrations from "},{type:"link",text:"Aum",url:"https://www.rawpixel.com/aum/"},{type:"text",text:"."}]]),je=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"footnotes-wrap"},r.a.createElement("div",{className:"ft-inner-wrap"},r.a.createElement("div",{className:"ft-content"},Ce.map((function(e,t){return r.a.createElement("p",{key:t,className:"ns-footnote"},e.map((function(e,t){switch(e.type){case"text":return r.a.createElement("span",{key:t},e.text);case"link":return r.a.createElement("a",{key:t,href:e.url,target:"_blank",rel:"noopener noreferrer"},e.text);default:return null}})))})))))}}]),a}(n.Component),Ne=(a(79),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.camera,a=e.monthArray,n=e.loading;return r.a.createElement("div",{className:"right-wrap",id:"right-wrap"},r.a.createElement(be,null),r.a.createElement(xe,{camera:t,monthArray:a,loading:n}),!n&&r.a.createElement(je,null))}}]),a}(n.Component));a(80);k.b.registerPlugin(L.a);var ke="#D5DD3C",Le="#D0D926",Se="#242424",De="#333333",Me="#9B9B9B",Ae="#FFFFFF",Te="#F5F5F5",Fe="#F1F1F1",Re="#EEEEEE",Pe="rgba(240, 240, 240, 0.8)",ze="#E1E1E1",Ie="#EEEEEE",_e="0 0 2em 0 rgba(0, 0, 0, 0.05)",Be=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={countyData:{},nationalData:{},three:{},monthArray:null,loading:!0},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=function(e){return'"'===e[0]?JSON.parse(e.slice(1,-1).replace(/\\/g,"")):JSON.parse(e)};setTimeout(Object(u.a)(i.a.mark((function a(){var n,r,o,c,s,u,m,d,p,h,f,v,b,g,E,w,O,x,C,S;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=e.props.options,a.next=3,Promise.all([y.a.get("".concat("","/api/meta/counties"),{transformResponse:t}),y.a.get("".concat("","/api/meta/us"),{transformResponse:t}),y.a.get("".concat("","/api/meta/world"),{transformResponse:t}),y.a.get("".concat("","/api/data/county"),{transformResponse:t}),y.a.get("".concat("","/api/data/national"),{transformResponse:t})]);case 3:r=a.sent,o=Object(l.a)(r,5),c=o[0].data,s=o[1].data,u=o[2].data,m=o[3].data,d=o[4].data,p=j(m.range),h=N(c,s,u,m,0,n,e.updateLegend),f=h.camera,v=h.orbitControls,b=h.cylinderMesh,g=h.baseCaseGeometries,E=h.baseDeathGeometries,w=h.renderer,document.getElementById("earth-canvas-wrapper").append(w.domElement),e.setState({countyData:m,nationalData:d,three:{camera:f,orbitControls:v,cylinderMesh:b,baseCaseGeometries:g,baseDeathGeometries:E,renderer:w},monthArray:p,fontSize:+window.getComputedStyle(document.body,null).getPropertyValue("font-size").replace("px","")}),e.baseGeometries=g,O=window.innerHeight/100,x=function(t,a){L.a.create({id:"earth-in",animation:k.b.timeline().add(k.b.to(".hero",{duration:.4,scale:1.4,opacity:0}),0).add(k.b.to(".earth",{duration:1.6,scale:1,opacity:1}),.4),trigger:".title-wrap",pin:!1,start:"top ".concat(t),endTrigger:".st-timeline-content",end:"top ".concat(a),scrub:.2}),L.a.create({id:"current-date-tag-in",animation:k.b.timeline().add(k.b.to([".st-current-date-tag-wrap",".count-wrap",".data-descriptions-wrap"],{duration:1,opacity:1})),trigger:".st-timeline-content",pin:!1,start:"top-=".concat(5*O,"px ").concat(a),end:"top ".concat(a),scrub:.2});setTimeout((function(){return t="center",void e.baseGeometries.forEach((function(a,n){n!==e.baseGeometries.length-1&&L.a.create({trigger:"#st-".concat(a.key),animation:k.b.to(b.morphTargetInfluences,{duration:1,0:1}),start:"end ".concat(t),endTrigger:"#st-".concat(e.baseGeometries[n+1].key),end:"end ".concat(t),scrub:.2,onLeave:function(){n<e.baseGeometries.length-2&&(b.geometry.dispose(),b.geometry=e.baseGeometries[n+1])},onEnterBack:function(){n<e.baseGeometries.length-2&&(b.geometry.dispose(),b.geometry=e.baseGeometries[n],b.morphTargetInfluences[0]=1)}})}));var t}),100)},L.a.matchMedia({"(min-aspect-ratio: 1/1)":function(){return x("top","center")},"(max-aspect-ratio: 1/1)":function(){return x("center","75%")}}),S=function(){var e=document.getElementById("earth-canvas-wrapper").getBoundingClientRect();w.setSize(e.width,e.height),f.aspect=e.width/e.height,f.updateProjectionMatrix()},window.onresize=function(){clearTimeout(C),C=setTimeout(S,250)},window.scrollTo(0,0),e.setState({loading:!1});case 22:case"end":return a.stop()}}),a)}))),2e3)}},{key:"componentDidUpdate",value:function(e){var t=e.options,a=t.variable,n=t.normalize,r=t.logScale,o=e.playbackSpeed,c=this.props.options,s=c.variable,i=c.normalize,l=c.logScale,u=this.props.playbackSpeed;if(a!==s||n!==i||r!==l||o!==u){var m=this.state.three,d=m.cylinderMesh,p=m.baseCaseGeometries,h=m.baseDeathGeometries,f=d.geometry.ind;d.geometry.dispose(),"cases"===s?(this.baseGeometries=p,d.geometry=p[f],d.material.color.set("#D5DD3C")):"deaths"===s&&(this.baseGeometries=h,d.geometry=h[f],d.material.color.set("#DD3CD5"))}}},{key:"render",value:function(){var e={"--theme":ke,"--theme-dark":Le,"--heading":Se,"--body":De,"--label":Me,"--background":Ae,"--surface":Te,"--surface-hover":Fe,"--surface-elevated":Re,"--border":Pe,"--line":ze,"--line-light":Ie,"--shadow":_e},t=this.state,a=t.nationalData,n=t.three,o=t.monthArray,c=t.loading;return r.a.createElement("div",{id:"App",style:e},r.a.createElement(se,null),r.a.createElement("div",{className:"main-content"},r.a.createElement(fe,{loading:c,nationalData:a,cylinders:n.cylinders,monthArray:o}),r.a.createElement(Ne,{camera:n.camera,loading:c,monthArray:o})))}}]),a}(n.Component),Ge=Object(f.b)((function(e){return{options:e.options}}),null)(Be),Ue=a(14),We={variable:"cases",normalize:!0,logScale:!1,duration:0,easing:"expo.out"},Ze={playing:!1,speed:1};var He=Object(Ue.b)({date:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"2020-05-16",t=arguments.length>1?arguments[1]:void 0;return"MOVE_TO_DATE"===t.type?t.date:e},options:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:We,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_OPTIONS":return Object(b.a)(Object(b.a)(Object(b.a)({},e),t.options),{},{duration:t.duration,ease:t.ease});default:return e}},playback:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOGGLE_PLAY":return Object(b.a)(Object(b.a)({},e),{},{playing:void 0!==t.to?t.to:!e.playing});case"CHANGE_PLAYBACK_SPEED":return Object(b.a)(Object(b.a)({},e),{},{speed:t.speed});default:return e}}}),Ve=Object(Ue.c)(He,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());c.a.render(r.a.createElement(f.a,{store:Ve},r.a.createElement(Ge,null)),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.d4df592a.chunk.js.map