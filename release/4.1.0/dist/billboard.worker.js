/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
 */
var bbWorker=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});function t(e){let t=[];return e.forEach(function(e,n){let r=e[0];e.forEach(function(e,i){if(i>0){if(t[i-1]===void 0&&(t[i-1]={}),e===void 0)throw Error(`Source data is missing a component at (${n}, ${i})!`);t[i-1][r]=e}})}),t}function n(e){let t=e[0],n=[];return e.forEach(function(e,r){if(r>0){let i={};e.forEach(function(e,n){if(e===void 0)throw Error(`Source data is missing a component at (${r}, ${n})!`);i[t[n]]=e}),n.push(i)}}),n}function r(e,r){let i=[],a,o;if(Array.isArray(e)){let t=function(e,t){if(e[t]!==void 0)return e[t];let n=t.replace(/\[(\w+)\]/g,`.$1`).replace(/^\./,``).split(`.`),r=e;return n.some(function(e){return!(r=r&&typeof r==`object`&&e in r?r[e]:void 0)}),r};a=r.x?r.value.concat(r.x):r.value,i.push(a),e.forEach(function(e){let n=a.map(function(n){let r=t(e,n);return r===void 0&&(r=null),r});i.push(n)}),o=n(i)}else Object.keys(e).forEach(function(t){let n=[].concat(e[t]);n.unshift?.(t),i.push(n)}),o=t(i);return o}let i={columns:t,json:r,rows:n},a=self;function o({data:e}){let{args:t,id:n,op:r}=e;try{let e=i[r];if(!e)throw Error(`Unknown worker op: ${r}`);a.postMessage({id:n,result:e(...t)})}catch(e){a.postMessage({id:n,error:e&&(e.message||e.name)||String(e)})}}return typeof window>`u`&&(a.onmessage=o),e.handleMessage=o,e.ops=i,e})({});