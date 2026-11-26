/* Mesin mini untuk menjalankan contoh desain Kapsio (format x-dc) di halaman biasa. */
(function(){
function DCLogic(){this.props={};this._q=0;}
DCLogic.prototype.setState=function(p){
  var n=typeof p==='function'?p(this.state):p;this.state=Object.assign({},this.state,n);
  if(this._q)return;var s=this;this._q=requestAnimationFrame(function(){s._q=0;s._draw&&s._draw();});};
function ev(expr,ctx){try{return new Function('c','with(c){return ('+expr+')}')(ctx);}catch(e){return undefined;}}
var RX=/\{\{([\s\S]+?)\}\}/g;
function interp(s,ctx){var m=s.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/);if(m)return ev(m[1],ctx);
  return s.replace(RX,function(_,e){var v=ev(e,ctx);return v==null?'':v;});}
function build(node,ctx,out){
  if(node.nodeType===3){out.appendChild(document.createTextNode(interp(node.nodeValue,ctx)));return;}
  if(node.nodeType!==1)return;
  var t=node.nodeName.toLowerCase();
  if(t==='sc-for'){var list=interp(node.getAttribute('list')||'',ctx)||[],as=node.getAttribute('as')||'item';
    list.forEach(function(it,i){var c=Object.create(ctx);c[as]=it;c.index=i;kids(node,c,out);});return;}
  if(t==='sc-if'){if(interp(node.getAttribute('value')||'',ctx))kids(node,ctx,out);return;}
  var el=document.createElementNS(node.namespaceURI,node.localName);el.__h={};
  for(var i=0;i<node.attributes.length;i++){var a=node.attributes[i],v=interp(a.value,ctx);
    if(a.name.indexOf('on')===0&&typeof v==='function'){el.__h[a.name.slice(2)]=v;}
    else if(v!==undefined&&v!==false&&v!==null&&a.name.indexOf('hint-')!==0)el.setAttribute(a.name,v);}
  kids(node,ctx,el);out.appendChild(el);}
function kids(node,ctx,out){for(var c=node.firstChild;c;c=c.nextSibling)build(c,ctx,out);}
function bind(n){if(n.nodeType!==1)return;var h=n.__h||{};for(var k in h)n['on'+k]=h[k];for(var c=n.firstChild;c;c=c.nextSibling)bind(c);}
function sync(live,nw){
  var a=live.firstChild,b=nw.firstChild;
  while(b){var nx=b.nextSibling;
    if(!a){live.appendChild(b);bind(b);}
    else if(a.nodeType===b.nodeType&&a.nodeName===b.nodeName){
      if(a.nodeType===3){if(a.nodeValue!==b.nodeValue)a.nodeValue=b.nodeValue;}
      else{attrs(a,b);sync(a,b);}
      a=a.nextSibling;}
    else{live.replaceChild(b,a);bind(b);a=b.nextSibling;}
    b=nx;}
  while(a){var n=a.nextSibling;live.removeChild(a);a=n;}}
function attrs(a,b){
  for(var i=a.attributes.length-1;i>=0;i--){var n=a.attributes[i].name;if(!b.hasAttribute(n))a.removeAttribute(n);}
  for(i=0;i<b.attributes.length;i++){var x=b.attributes[i];if(a.getAttribute(x.name)!==x.value)a.setAttribute(x.name,x.value);}
  if('value' in a&&b.hasAttribute('value')&&a.value!==b.getAttribute('value')&&document.activeElement!==a)a.value=b.getAttribute('value');
  var old=a.__h||{};for(var k in old)a['on'+k]=null;a.__h=b.__h||{};for(k in a.__h)a['on'+k]=a.__h[k];}
function start(){
  var root=document.querySelector('x-dc');if(!root)return;
  var hm=root.querySelector('helmet');
  if(hm){while(hm.firstChild){var c=hm.firstChild;hm.removeChild(c);if(c.nodeType===1)document.head.appendChild(c);}hm.remove();}
  var sc=document.querySelector('script[type="text/x-dc"]');
  var Comp=new Function('DCLogic',sc.textContent+';return Component;')(DCLogic);
  var tpl=document.createElement('div');while(root.firstChild)tpl.appendChild(root.firstChild);
  var st=document.createElement('style');st.textContent='html,body{margin:0;height:100%}x-dc{display:block}'+(tpl.innerHTML.toLowerCase().indexOf('onscroll=')>-1?'x-dc{height:100vh;overflow:hidden}':'');document.head.appendChild(st);
  var inst=new Comp();DCLogic.call(inst);
  inst._draw=function(){var ctx=inst.renderVals();var out=document.createElement('div');kids(tpl,ctx,out);sync(root,out);};
  inst.props=inst.props||{};
  if(inst.componentWillMount)inst.componentWillMount();
  inst._draw();
  if(inst.componentDidMount)inst.componentDidMount();
}
window.DCLogic=DCLogic;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
