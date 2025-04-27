import{o as m,p as y,q as f,t as g,r as a,_ as x,n as t,O as S,v as w,M as j,L as M,S as k}from"./components-6Be9zFHv.js";/**
 * @remix-run/react v2.16.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let l="positions";function L({getKey:e,...s}){let{isSpaMode:c}=m(),n=y(),p=f();g({getKey:e,storageKey:l});let u=a.useMemo(()=>{if(!e)return null;let o=e(n,p);return o!==n.key?o:null},[]);if(c)return null;let h=((o,d)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let i=JSON.parse(sessionStorage.getItem(o)||"{}")[d||window.history.state.key];typeof i=="number"&&window.scrollTo(0,i)}catch(r){console.error(r),sessionStorage.removeItem(o)}}).toString();return a.createElement("script",x({},s,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${h})(${JSON.stringify(l)}, ${JSON.stringify(u)})`}}))}const N=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function _({children:e}){const s=w();return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(j,{}),t.jsx(M,{})]}),t.jsxs("body",{children:[e,t.jsx(L,{}),t.jsx("script",{dangerouslySetInnerHTML:{__html:`window.ENV = ${JSON.stringify({env:s==null?void 0:s.ENV})}`}}),t.jsx(k,{})]})]})}function v(){return t.jsx(S,{})}export{_ as Layout,v as default,N as links};
