(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=Symbol.for(`@supabase/supabase-js.traceContextExtractor`);function t(){return globalThis[e]}function n(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function r(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}var i=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),a=class extends Error{constructor(e,t=`FunctionsError`,n){super(e),this.name=t,this.context=n}toJSON(){return{name:this.name,message:this.message,context:this.context}}},o=class extends a{constructor(e){super(`Failed to send a request to the Edge Function`,`FunctionsFetchError`,e)}},s=class extends a{constructor(e){super(`Relay Error invoking the Edge Function`,`FunctionsRelayError`,e)}},c=class extends a{constructor(e){super(`Edge Function returned a non-2xx status code`,`FunctionsHttpError`,e)}},l;(function(e){e.Any=`any`,e.ApNortheast1=`ap-northeast-1`,e.ApNortheast2=`ap-northeast-2`,e.ApSouth1=`ap-south-1`,e.ApSoutheast1=`ap-southeast-1`,e.ApSoutheast2=`ap-southeast-2`,e.CaCentral1=`ca-central-1`,e.EuCentral1=`eu-central-1`,e.EuWest1=`eu-west-1`,e.EuWest2=`eu-west-2`,e.EuWest3=`eu-west-3`,e.SaEast1=`sa-east-1`,e.UsEast1=`us-east-1`,e.UsWest1=`us-west-1`,e.UsWest2=`us-west-2`})(l||={});var u=class{constructor(e,{headers:t={},customFetch:n,region:r=l.Any}={}){this.url=e,this.headers=t,this.region=r,this.fetch=i(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return r(this,arguments,void 0,function*(e,t={}){var n;let r,i,a;try{let{headers:n,method:l,body:u,signal:d,timeout:f}=t,p={},{region:m}=t;m||=this.region;let h=new URL(`${this.url}/${e}`);m&&m!==`any`&&(p[`x-region`]=m,h.searchParams.set(`forceFunctionRegion`,m));let g,ee=!!n&&Object.keys(n).some(e=>e.toLowerCase()===`content-type`);u&&!ee?typeof Blob<`u`&&u instanceof Blob||u instanceof ArrayBuffer?(p[`Content-Type`]=`application/octet-stream`,g=u):typeof u==`string`?(p[`Content-Type`]=`text/plain`,g=u):typeof FormData<`u`&&u instanceof FormData?g=u:(p[`Content-Type`]=`application/json`,g=JSON.stringify(u)):g=u&&typeof u!=`string`&&!(typeof Blob<`u`&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<`u`&&u instanceof FormData)?JSON.stringify(u):u;let te=d;f&&(i=new AbortController,r=setTimeout(()=>i.abort(),f),d?(te=i.signal,a=()=>i.abort(),d.addEventListener(`abort`,a)):te=i.signal);let _=yield this.fetch(h.toString(),{method:l||`POST`,headers:Object.assign(Object.assign(Object.assign({},p),this.headers),n),body:g,signal:te}).catch(e=>{throw new o(e)}),ne=_.headers.get(`x-relay-error`);if(ne&&ne===`true`)throw new s(_);if(!_.ok)throw new c(_);let v=(_.headers.get(`Content-Type`)??`text/plain`).split(`;`)[0].trim().toLowerCase(),re;return re=v===`application/json`?yield _.json():v===`application/octet-stream`||v===`application/pdf`?yield _.blob():v===`text/event-stream`?_:v===`multipart/form-data`?yield _.formData():yield _.text(),{data:re,error:null,response:_}}catch(e){return{data:null,error:e,response:e instanceof c||e instanceof s?e.context:void 0}}finally{r&&clearTimeout(r),a&&((n=t.signal)==null||n.removeEventListener(`abort`,a))}})}},d=class extends Error{constructor(e){super(e.message),this.name=`PostgrestError`,this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}},f=3,p=e=>Math.min(1e3*2**e,3e4),m=[520,503],h=[`GET`,`HEAD`,`OPTIONS`];function g(e){"@babel/helpers - typeof";return g=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},g(e)}function ee(e,t){if(g(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(g(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function te(e){var t=ee(e,`string`);return g(t)==`symbol`?t:t+``}function _(e,t,n){return(t=te(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ne(Object(n),!0).forEach(function(t){_(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ne(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function re(e,t){return new Promise(n=>{if(t?.aborted){n();return}let r=setTimeout(()=>{t?.removeEventListener(`abort`,i),n()},e);function i(){clearTimeout(r),n()}t?.addEventListener(`abort`,i)})}function ie(e,t,n,r){return!(!r||n>=f||!h.includes(e)||!m.includes(t))}async function ae(e,t,n,r){let i=0;for(;;){let a=v({},n.headers);i>0&&(a[`X-Retry-Count`]=String(i));let o;try{o=await e(t,{method:n.method,headers:a,body:n.body,signal:n.signal})}catch(e){if(e?.name===`AbortError`||e?.code===`ABORT_ERR`||!h.includes(n.method))throw e;if(r&&i<f){let e=p(i);i++,await re(e,n.signal);continue}throw e}if(ie(n.method,o.status,i,r)){let e=o.headers?.get(`Retry-After`)??null,t=e===null?p(i):Math.max(0,parseInt(e,10)||0)*1e3;await o.text(),i++,await re(t,n.signal);continue}return o}}var oe=class{constructor(e){this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError??!1,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle??!1,this.shouldStripNulls=e.shouldStripNulls??!1,this.urlLengthLimit=e.urlLengthLimit??8e3,this.retryEnabled=e.retry??!0,this.fetch=e.fetch?e.fetch:fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get(`Accept`)===`text/csv`)throw Error(`stripNulls() cannot be used with csv()`);return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var n=this;if(this.schema===void 0||([`GET`,`HEAD`].includes(this.method)?this.headers.set(`Accept-Profile`,this.schema):this.headers.set(`Content-Profile`,this.schema)),this.method!==`GET`&&this.method!==`HEAD`&&this.headers.set(`Content-Type`,`application/json`),this.shouldStripNulls){let e=this.headers.get(`Accept`);e===`application/vnd.pgrst.object+json`?this.headers.set(`Accept`,`application/vnd.pgrst.object+json;nulls=stripped`):(!e||e===`application/json`)&&this.headers.set(`Accept`,`application/vnd.pgrst.array+json;nulls=stripped`)}let r=this.fetch,i=(async()=>{let e={};n.headers.forEach((t,n)=>{e[n]=t});let t=await ae(r,n.url.toString(),{method:n.method,headers:e,body:JSON.stringify(n.body,(e,t)=>typeof t==`bigint`?t.toString():t),signal:n.signal},n.retryEnabled);return await n.processResponse(t)})();return this.shouldThrowOnError||(i=i.catch(e=>{let t=``,n=``,r=``,i=e?.cause;if(i){let n=i?.message??``,r=i?.code??``;t=`${e?.name??`FetchError`}: ${e?.message}`,t+=`\n\nCaused by: ${i?.name??`Error`}: ${n}`,r&&(t+=` (${r})`),i?.stack&&(t+=`\n${i.stack}`)}else t=e?.stack??``;let a=this.url.toString().length;return e?.name===`AbortError`||e?.code===`ABORT_ERR`?(r=``,n=`Request was aborted (timeout or manual cancellation)`,a>this.urlLengthLimit&&(n+=`. Note: Your request URL is ${a} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(i?.name===`HeadersOverflowError`||i?.code===`UND_ERR_HEADERS_OVERFLOW`)&&(r=``,n=`HTTP headers exceeded server limits (typically 16KB)`,a>this.urlLengthLimit&&(n+=`. Your request URL is ${a} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${e?.name??`FetchError`}: ${e?.message}`,details:t,hint:n,code:r},data:null,count:null,status:0,statusText:``}})),i.then(e,t)}async processResponse(e){var t=this;let n=null,r=null,i=null,a=e.status,o=e.statusText;if(e.ok){if(t.method!==`HEAD`){let i=await e.text();if(i!==``){if(t.headers.get(`Accept`)===`text/csv`)r=i;else if(t.headers.get(`Accept`)&&t.headers.get(`Accept`)?.includes(`application/vnd.pgrst.plan+text`))r=i;else try{r=JSON.parse(i)}catch{if(n={message:i},r=null,t.shouldThrowOnError)throw new d({message:i,details:``,hint:``,code:``})}}}let s=t.headers.get(`Prefer`)?.match(/count=(exact|planned|estimated)/),c=e.headers.get(`content-range`)?.split(`/`);if(s&&c&&c.length>1&&(i=parseInt(c[1])),t.isMaybeSingle&&Array.isArray(r)){if(r.length>1){if(n={code:`PGRST116`,details:`Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:`JSON object requested, multiple (or no) rows returned`},r=null,i=null,a=406,o=`Not Acceptable`,t.shouldThrowOnError)throw new d(v(v({},n),{},{hint:n.hint??``}))}else r=r.length===1?r[0]:null}}else{let i=await e.text();try{n=JSON.parse(i),Array.isArray(n)&&e.status===404&&(r=[],n=null,a=200,o=`OK`)}catch{e.status===404&&i===``?(a=204,o=`No Content`):n={message:i}}if(n&&t.shouldThrowOnError)throw new d(n)}return{success:n===null,error:n,data:r,count:i,status:a,statusText:o}}returns(){return this}overrideTypes(){return this}},se=class extends oe{throwOnError(){return super.throwOnError()}select(e){let t=!1,n=(e??`*`).split(``).map(e=>/\s/.test(e)&&!t?``:(e===`"`&&(t=!t),e)).join(``);return this.url.searchParams.set(`select`,n),this.headers.append(`Prefer`,`return=representation`),this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:r,referencedTable:i=r}={}){let a=i?`${i}.order`:`order`,o=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${o?`${o},`:``}${e}.${t?`asc`:`desc`}${n===void 0?``:n?`.nullsfirst`:`.nullslast`}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){let r=n===void 0?`limit`:`${n}.limit`;return this.url.searchParams.set(r,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:r=n}={}){let i=r===void 0?`offset`:`${r}.offset`,a=r===void 0?`limit`:`${r}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set(`Accept`,`application/vnd.pgrst.object+json`),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set(`Accept`,`text/csv`),this}geojson(){return this.headers.set(`Accept`,`application/geo+json`),this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:r=!1,wal:i=!1,format:a=`text`}={}){let o=[e?`analyze`:null,t?`verbose`:null,n?`settings`:null,r?`buffers`:null,i?`wal`:null].filter(Boolean).join(`|`),s=this.headers.get(`Accept`)??`application/json`;return this.headers.set(`Accept`,`application/vnd.pgrst.plan+${a}; for="${s}"; options=${o};`),this}rollback(){return this.headers.append(`Prefer`,`tx=rollback`),this}returns(){return this}maxAffected(e){return this.headers.append(`Prefer`,`handling=strict`),this.headers.append(`Prefer`,`max-affected=${e}`),this}},ce=RegExp(`[,()]`),le=class extends se{throwOnError(){return super.throwOnError()}eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(`,`)}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(`,`)}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(`,`)}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(`,`)}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&ce.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`in.(${n})`),this}notIn(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&ce.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`not.in.(${n})`),this}contains(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t==`string`?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(`,`)}}`),this}textSearch(e,t,{config:n,type:r}={}){let i=``;r===`plain`?i=`pl`:r===`phrase`?i=`ph`:r===`websearch`&&(i=`w`);let a=n===void 0?``:`(${n})`;return this.url.searchParams.append(e,`${i}fts${a}.${t}`),this}match(e){return Object.entries(e).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){let r=n?`${n}.or`:`or`;return this.url.searchParams.append(r,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}},ue=class{constructor(e,{headers:t={},schema:n,fetch:r,urlLengthLimit:i=8e3,retry:a}){this.url=e,this.headers=new Headers(t),this.schema=n,this.fetch=r,this.urlLengthLimit=i,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){let{head:n=!1,count:r}=t??{},i=n?`HEAD`:`GET`,a=!1,o=(e??`*`).split(``).map(e=>/\s/.test(e)&&!a?``:(e===`"`&&(a=!a),e)).join(``),{url:s,headers:c}=this.cloneRequestState();return s.searchParams.set(`select`,o),r&&c.append(`Prefer`,`count=${r}`),new le({method:i,url:s,headers:c,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:n=!0}={}){let{url:r,headers:i}=this.cloneRequestState();if(t&&i.append(`Prefer`,`count=${t}`),n||i.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);r.searchParams.set(`columns`,e.join(`,`))}}return new le({method:`POST`,url:r,headers:i,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:r,defaultToNull:i=!0}={}){let{url:a,headers:o}=this.cloneRequestState();if(o.append(`Prefer`,`resolution=${n?`ignore`:`merge`}-duplicates`),t!==void 0&&a.searchParams.set(`on_conflict`,t),r&&o.append(`Prefer`,`count=${r}`),i||o.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);a.searchParams.set(`columns`,e.join(`,`))}}return new le({method:`POST`,url:a,headers:o,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){let{url:n,headers:r}=this.cloneRequestState();return t&&r.append(`Prefer`,`count=${t}`),new le({method:`PATCH`,url:n,headers:r,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){let{url:t,headers:n}=this.cloneRequestState();return e&&n.append(`Prefer`,`count=${e}`),new le({method:`DELETE`,url:t,headers:n,schema:this.schema,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function de(e,t){try{let t=JSON.parse(e);if(t&&typeof t==`object`&&!Array.isArray(t))return new d({message:String(t.message??e),details:t.details??``,hint:t.hint??``,code:t.code??``})}catch{}return new d({message:e||t,details:``,hint:``,code:``})}function fe(e,t,n){let r=e;return{success:!1,error:new d({message:`${r?.name??`FetchError`}: ${r?.message}`,details:``,hint:``,code:``}),data:null,count:null,status:t,statusText:n}}var pe=class e{constructor(e,{headers:t={},schema:n,fetch:r,timeout:i,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(t),this.schemaName=n,this.urlLengthLimit=a;let s=r??globalThis.fetch;this.fetch=i!==void 0&&i>0?(e,t)=>{let n=new AbortController,r=setTimeout(()=>n.abort(),i),a=t?.signal;if(a){if(a.aborted)return clearTimeout(r),s(e,t);let i=()=>{clearTimeout(r),n.abort()};return a.addEventListener(`abort`,i,{once:!0}),s(e,v(v({},t),{},{signal:n.signal})).finally(()=>{clearTimeout(r),a.removeEventListener(`abort`,i)})}return s(e,v(v({},t),{},{signal:n.signal})).finally(()=>clearTimeout(r))}:s,this.retry=o}from(e){if(!e||typeof e!=`string`||e.trim()===``)throw Error(`Invalid relation name: relation must be a non-empty string.`);return new ue(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new e(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}async getOpenApiSpec(){var e=this;let t=new Headers(e.headers);t.set(`Accept`,`application/openapi+json`),e.schemaName&&t.set(`Accept-Profile`,e.schemaName);let n={};t.forEach((e,t)=>{n[t]=e});let r=e.fetch??globalThis.fetch,i;try{i=await ae(r,`${e.url}/`,{method:`GET`,headers:n},e.retry??!0)}catch(e){return fe(e,0,``)}let a;try{a=await i.text()}catch(e){return fe(e,i.status,i.statusText)}if(i.ok)try{return{success:!0,error:null,data:JSON.parse(a),count:null,status:i.status,statusText:i.statusText}}catch{}return{success:!1,error:de(a,i.statusText),data:null,count:null,status:i.status,statusText:i.statusText}}rpc(e,t={},{head:n=!1,get:r=!1,count:i}={}){let a,o=new URL(`${this.url}/rpc/${e}`),s,c=e=>typeof e==`object`&&!!e&&(!Array.isArray(e)||e.some(c)),l=n&&Object.values(t).some(c);l?(a=`POST`,s=t):n||r?(a=n?`HEAD`:`GET`,Object.entries(t).filter(([e,t])=>t!==void 0).map(([e,t])=>[e,Array.isArray(t)?`{${t.join(`,`)}}`:`${t}`]).forEach(([e,t])=>{o.searchParams.append(e,t)})):(a=`POST`,s=t);let u=new Headers(this.headers);return l?u.set(`Prefer`,i?`count=${i},return=minimal`:`return=minimal`):i&&u.set(`Prefer`,`count=${i}`),new le({method:a,url:o,headers:u,schema:this.schemaName,body:s,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},me=class{constructor(){}static detectEnvironment(){if(typeof WebSocket<`u`)return{type:`native`,wsConstructor:WebSocket};let e=globalThis;if(typeof globalThis<`u`&&e.WebSocket!==void 0)return{type:`native`,wsConstructor:e.WebSocket};let t=typeof global<`u`?global:void 0;if(t&&t.WebSocket!==void 0)return{type:`native`,wsConstructor:t.WebSocket};if(typeof globalThis<`u`&&e.WebSocketPair!==void 0&&globalThis.WebSocket===void 0)return{type:`cloudflare`,error:`Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.`,workaround:`Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.`};if(typeof globalThis<`u`&&e.EdgeRuntime||typeof navigator<`u`&&navigator.userAgent?.includes(`Vercel-Edge`))return{type:`unsupported`,error:`Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.`,workaround:`Use serverless functions or a different deployment target for WebSocket functionality.`};let n=globalThis.process;if(n){let e=n.versions;if(e&&e.node)return{type:`unsupported`,error:`Node.js detected but native WebSocket not found.`,workaround:`Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option.`}}return{type:`unsupported`,error:`Unknown JavaScript runtime without WebSocket support.`,workaround:`Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.`}}static getWebSocketConstructor(){let e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let t=e.error||`WebSocket not supported in this environment.`;throw e.workaround&&(t+=`\n\nSuggested solution: ${e.workaround}`),Error(t)}static isWebSocketSupported(){try{return this.detectEnvironment().type===`native`}catch{return!1}}},he=`realtime-js/2.117.2`,ge=`1.0.0`,_e=`2.0.0`,ve=_e,ye=1e4,be=15e3,xe=1e4,Se={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},Ce={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`,access_token:`access_token`},we={connecting:`connecting`,open:`open`,closing:`closing`,closed:`closed`},Te=class{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT=`broadcast`,this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event==`string`)return t(this._binaryEncodeUserBroadcastPush(e));let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(e){return this._isArrayBuffer(e.payload?.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){let t=e.payload?.payload??new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,t)}_encodeJsonUserBroadcastPush(e){let t=e.payload?.payload??{},n=new TextEncoder().encode(JSON.stringify(t)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,n){let r=new TextEncoder,i=r.encode(e.topic),a=r.encode(e.ref??``),o=r.encode(e.join_ref??``),s=r.encode(e.payload.event),c=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},l=r.encode(Object.keys(c).length===0?``:JSON.stringify(c));if(o.length>255)throw Error(`joinRef length ${o.length} exceeds maximum of 255`);if(a.length>255)throw Error(`ref length ${a.length} exceeds maximum of 255`);if(i.length>255)throw Error(`topic length ${i.length} exceeds maximum of 255`);if(s.length>255)throw Error(`userEvent length ${s.length} exceeds maximum of 255`);if(l.length>255)throw Error(`metadata length ${l.length} exceeds maximum of 255`);let u=this.USER_BROADCAST_PUSH_META_LENGTH+o.length+a.length+i.length+s.length+l.length,d=new ArrayBuffer(this.HEADER_LENGTH+u),f=new DataView(d),p=new Uint8Array(d),m=0;f.setUint8(m++,this.KINDS.userBroadcastPush),f.setUint8(m++,o.length),f.setUint8(m++,a.length),f.setUint8(m++,i.length),f.setUint8(m++,s.length),f.setUint8(m++,l.length),f.setUint8(m++,t),p.set(o,m),m+=o.length,p.set(a,m),m+=a.length,p.set(i,m),m+=i.length,p.set(s,m),m+=s.length,p.set(l,m),m+=l.length;var h=new Uint8Array(d.byteLength+n.byteLength);return h.set(new Uint8Array(d),0),h.set(new Uint8Array(n),d.byteLength),h.buffer}decode(e,t){if(this._isArrayBuffer(e))return t(this._binaryDecode(e));if(typeof e==`string`){let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}return t({})}_binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+4,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=e.slice(s,e.byteLength),f=o===this.JSON_ENCODING?JSON.parse(n.decode(d)):d,p={type:this.BROADCAST_EVENT,event:l,payload:f};return a>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){return e instanceof ArrayBuffer||e?.constructor?.name===`ArrayBuffer`}_pick(e,t){return!e||typeof e!=`object`?{}:Object.fromEntries(Object.entries(e).filter(([e])=>t.includes(e)))}},y;(function(e){e.abstime=`abstime`,e.bool=`bool`,e.date=`date`,e.daterange=`daterange`,e.float4=`float4`,e.float8=`float8`,e.int2=`int2`,e.int4=`int4`,e.int4range=`int4range`,e.int8=`int8`,e.int8range=`int8range`,e.json=`json`,e.jsonb=`jsonb`,e.money=`money`,e.numeric=`numeric`,e.oid=`oid`,e.reltime=`reltime`,e.text=`text`,e.time=`time`,e.timestamp=`timestamp`,e.timestamptz=`timestamptz`,e.timetz=`timetz`,e.tsrange=`tsrange`,e.tstzrange=`tstzrange`})(y||={});var Ee=(e,t,n={})=>{let r=n.skipTypes??[];return t?Object.keys(t).reduce((n,i)=>(n[i]=De(i,e,t,r),n),{}):{}},De=(e,t,n,r)=>{let i=t.find(t=>t.name===e)?.type,a=n[e];return i&&!r.includes(i)?Oe(i,a):ke(a)},Oe=(e,t)=>{if(e.charAt(0)===`_`)return Ne(t,e.slice(1,e.length));switch(e){case y.bool:return Ae(t);case y.float4:case y.float8:case y.int2:case y.int4:case y.int8:case y.numeric:case y.oid:return je(t);case y.json:case y.jsonb:return Me(t);case y.timestamp:return Pe(t);case y.abstime:case y.date:case y.daterange:case y.int4range:case y.int8range:case y.money:case y.reltime:case y.text:case y.time:case y.timestamptz:case y.timetz:case y.tsrange:case y.tstzrange:return ke(t);default:return ke(t)}},ke=e=>e,Ae=e=>{switch(e){case`t`:return!0;case`f`:return!1;default:return e}},je=e=>{if(typeof e==`string`){let t=parseFloat(e);if(!Number.isNaN(t))return t}return e},Me=e=>{if(typeof e==`string`)try{return JSON.parse(e)}catch{return e}return e},Ne=(e,t)=>{if(typeof e!=`string`)return e;let n=e.length-1,r=e[n];if(e[0]===`{`&&r===`}`){let r,i=e.slice(1,n);try{r=JSON.parse(`[`+i+`]`)}catch{r=i?i.split(`,`):[]}return r.map(e=>Oe(t,e))}return e},Pe=e=>typeof e==`string`?e.replace(` `,`T`):e,Fe=e=>{let t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,`http`),t.pathname=t.pathname.replace(/\/+$/,``).replace(/\/socket\/websocket$/i,``).replace(/\/socket$/i,``).replace(/\/websocket$/i,``),t.pathname===``||t.pathname===`/`?t.pathname=`/api/broadcast`:t.pathname+=`/api/broadcast`,t.href},Ie=e=>typeof e==`function`?e:function(){return e},Le=typeof self<`u`?self:null,Re=typeof window<`u`?window:null,ze=Le||Re||globalThis,Be=`2.0.0`,Ve=1e4,He=1e3,Ue=100,We={connecting:0,open:1,closing:2,closed:3},Ge={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},Ke={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`},qe={longpoll:`longpoll`,websocket:`websocket`},Je={complete:4},Ye=`base64url.bearer.phx.`,Xe=class{constructor(e,t,n,r){this.channel=e,this.event=t,this.payload=n||function(){return{}},this.receivedResp=null,this.timeout=r,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived(`timeout`)||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:n}){this.recHooks.filter(t=>t.status===e).forEach(e=>e.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger(`timeout`,{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},Ze=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries+=1,this.callback()},this.timerCalc(this.tries+1))}},Qe=class{constructor(e,t,n){this.state=Ge.closed,this.topic=e,this.params=Ie(t||{}),this.socket=n,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Xe(this,Ke.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Ze(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive(`ok`,()=>{this.state=Ge.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(e=>e.send()),this.pushBuffer=[]}),this.joinPush.receive(`error`,e=>{this.state=Ge.errored,this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log(`channel`,`close ${this.topic}`),this.state=Ge.closed,this.socket.remove(this)}),this.onError(e=>{this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.isJoining()&&this.joinPush.reset(),this.state=Ge.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive(`timeout`,()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`timeout ${this.topic}`,this.joinPush.timeout),new Xe(this,Ke.leave,Ie({}),this.timeout).send(),this.state=Ge.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Ke.reply,(e,t)=>{this.trigger(this.replyEventName(t),e)})}join(e=this.timeout){if(this.joinedOnce)throw Error(`tried to join multiple times. 'join' can only be called a single time per channel instance`);return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=Ge.closed,this.bindings=[]}onClose(e){this.on(Ke.close,e)}onError(e){return this.on(Ke.error,t=>e(t))}on(e,t){let n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}off(e,t){this.bindings=this.bindings.filter(n=>n.event!==e||t!==void 0&&t!==n.ref)}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,n=this.timeout){if(t||={},!this.joinedOnce)throw Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let r=new Xe(this,e,function(){return t},n);return this.canPush()?r.send():(r.startTimeout(),this.pushBuffer.push(r)),r}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=Ge.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`leave ${this.topic}`),this.trigger(Ke.close,`leave`)},n=new Xe(this,Ke.leave,Ie({}),e);return n.receive(`ok`,()=>t()).receive(`timeout`,()=>t()),n.send(),this.canPush()||n.trigger(`ok`,{}),n}onMessage(e,t,n){return t}filterBindings(e,t,n){return!0}isMember(e,t,n,r){return this.topic===e?r&&r!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log(`channel`,`dropping outdated message`,{topic:e,event:t,payload:n,joinRef:r}),!1):!0:!1}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=Ge.joining,this.joinPush.resend(e))}trigger(e,t,n,r){let i=this.onMessage(e,t,n,r);if(t&&!i)throw Error(`channel onMessage callbacks must return the payload, modified or unmodified`);let a=this.bindings.filter(r=>r.event===e&&this.filterBindings(r,t,n));for(let e=0;e<a.length;e++)a[e].callback(i,n,r||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===Ge.closed}isErrored(){return this.state===Ge.errored}isJoined(){return this.state===Ge.joined}isJoining(){return this.state===Ge.joining}isLeaving(){return this.state===Ge.leaving}},$e=class{static request(e,t,n,r,i,a,o){if(ze.XDomainRequest){let n=new ze.XDomainRequest;return this.xdomainRequest(n,e,t,r,i,a,o)}if(ze.XMLHttpRequest){let s=new ze.XMLHttpRequest;return this.xhrRequest(s,e,t,n,r,i,a,o)}if(ze.fetch&&ze.AbortController)return this.fetchRequest(e,t,n,r,i,a,o);throw Error(`No suitable XMLHttpRequest implementation found`)}static fetchRequest(e,t,n,r,i,a,o){let s={method:e,headers:n,body:r},c=null;return i&&(c=new AbortController,setTimeout(()=>c.abort(),i),s.signal=c.signal),ze.fetch(t,s).then(e=>e.text()).then(e=>this.parseJSON(e)).then(e=>o&&o(e)).catch(e=>{e.name===`AbortError`&&a?a():o&&o(null)}),c}static xdomainRequest(e,t,n,r,i,a,o){return e.timeout=i,e.open(t,n),e.onload=()=>{let t=this.parseJSON(e.responseText);o&&o(t)},a&&(e.ontimeout=a),e.onprogress=()=>{},e.send(r),e}static xhrRequest(e,t,n,r,i,a,o,s){e.open(t,n,!0),e.timeout=a;for(let[t,n]of Object.entries(r))e.setRequestHeader(t,n);return e.onerror=()=>s&&s(null),e.onreadystatechange=()=>{e.readyState===Je.complete&&s&&s(this.parseJSON(e.responseText))},o&&(e.ontimeout=o),e.send(i),e}static parseJSON(e){if(!e||e===``)return null;try{return JSON.parse(e)}catch{return console&&console.log(`failed to parse JSON response`,e),null}}static serialize(e,t){let n=[];for(var r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let i=t?`${t}[${r}]`:r,a=e[r];typeof a==`object`?n.push(this.serialize(a,i)):n.push(encodeURIComponent(i)+`=`+encodeURIComponent(a))}return n.join(`&`)}static appendParams(e,t){return Object.keys(t).length===0?e:`${e}${e.match(/\?/)?`&`:`?`}${this.serialize(t)}`}},et=e=>{let t=``,n=new Uint8Array(e),r=n.byteLength;for(let e=0;e<r;e++)t+=String.fromCharCode(n[e]);return btoa(t)},tt=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(Ye)&&(this.authToken=atob(t[1].slice(Ye.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=We.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace(`ws://`,`http://`).replace(`wss://`,`https://`).replace(RegExp(`(.*)/`+qe.websocket),`$1/`+qe.longpoll)}endpointURL(){return $e.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,n){this.close(e,t,n),this.readyState=We.connecting}ontimeout(){this.onerror(`timeout`),this.closeAndRetry(1005,`timeout`,!1)}isActive(){return this.readyState===We.open||this.readyState===We.connecting}poll(){let e={Accept:`application/json`};this.authToken&&(e[`X-Phoenix-AuthToken`]=this.authToken),this.ajax(`GET`,e,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:n,messages:r}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,`session_gone`,!1);return}this.token=n}else t=0;switch(t){case 200:r.forEach(e=>{setTimeout(()=>this.onmessage({data:e}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=We.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,`forbidden`,!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,`internal server error`,500);break;default:throw Error(`unhandled poll status ${t}`)}})}send(e){typeof e!=`string`&&(e=et(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e,t=0){this.awaitingBatchAck=!0;let n=t+Ue,r=e.slice(t,n);this.ajax(`POST`,{"Content-Type":`application/x-ndjson`},r.join(`
`),()=>this.onerror(`timeout`),t=>{!t||t.status!==200?(this.awaitingBatchAck=!1,this.onerror(t&&t.status),this.closeAndRetry(1011,`internal server error`,!1)):n<e.length?this.batchSend(e,n):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(e,t,n){for(let e of this.reqs)e.abort();this.readyState=We.closed;let r=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:n});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<`u`?this.onclose(new CloseEvent(`close`,r)):this.onclose(r)}ajax(e,t,n,r,i){let a;a=$e.request(e,this.endpointURL(),t,n,this.timeout,()=>{this.reqs.delete(a),r()},e=>{this.reqs.delete(a),this.isActive()&&i(e)}),this.reqs.add(a)}},nt=class e{constructor(t,n={}){let r=n.events||{state:`presence_state`,diff:`presence_diff`};this.state=Object.create(null),this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(r.state,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.joinRef=this.channel.joinRef(),this.state=e.syncState(this.state,t,n,r),this.pendingDiffs.forEach(t=>{this.state=e.syncDiff(this.state,t,n,r)}),this.pendingDiffs=[],i()}),this.channel.on(r.diff,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(t):(this.state=e.syncDiff(this.state,t,n,r),i())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(t){return e.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,n,r){let i=this.toNullProtoObj(this.clone(e));t=this.toNullProtoObj(t);let a=Object.create(null),o=Object.create(null);return this.map(i,(e,n)=>{t[e]||(o[e]=n)}),this.map(t,(e,t)=>{let n=i[e];if(n){let r=t.metas.map(e=>e.phx_ref),i=n.metas.map(e=>e.phx_ref),s=t.metas.filter(e=>i.indexOf(e.phx_ref)<0),c=n.metas.filter(e=>r.indexOf(e.phx_ref)<0);s.length>0&&(a[e]=t,a[e].metas=s),c.length>0&&(o[e]=this.clone(n),o[e].metas=c)}else a[e]=t}),this.syncDiff(i,{joins:a,leaves:o},n,r)}static syncDiff(e,t,n,r){e=this.toNullProtoObj(e);let{joins:i,leaves:a}=this.clone(t);return n||=function(){},r||=function(){},this.map(i,(t,r)=>{let i=e[t];if(e[t]=this.clone(r),i){let n=e[t].metas.map(e=>e.phx_ref),r=i.metas.filter(e=>n.indexOf(e.phx_ref)<0);e[t].metas.unshift(...r)}n(t,i,r)}),this.map(a,(t,n)=>{let i=e[t];if(!i)return;let a=n.metas.map(e=>e.phx_ref);i.metas=i.metas.filter(e=>a.indexOf(e.phx_ref)<0),r(t,i,n),i.metas.length===0&&delete e[t]}),e}static list(e,t){return t||=function(e,t){return t},this.map(e,(e,n)=>t(e,n))}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let t=Object.create(null);return Object.getOwnPropertyNames(e).forEach(n=>{t[n]=e[n]}),t}static clone(e){return JSON.parse(JSON.stringify(e))}},rt={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}},binaryEncode(e){let{join_ref:t,ref:n,event:r,topic:i,payload:a}=e,o=new TextEncoder,s=o.encode(t),c=o.encode(n),l=o.encode(i),u=o.encode(r);this.assertFieldSize(s.byteLength,`join_ref`),this.assertFieldSize(c.byteLength,`ref`),this.assertFieldSize(l.byteLength,`topic`),this.assertFieldSize(u.byteLength,`event`);let d=this.META_LENGTH+s.byteLength+c.byteLength+l.byteLength+u.byteLength,f=new ArrayBuffer(this.HEADER_LENGTH+d),p=new Uint8Array(f),m=new DataView(f),h=0;m.setUint8(h++,this.KINDS.push),m.setUint8(h++,s.byteLength),m.setUint8(h++,c.byteLength),m.setUint8(h++,l.byteLength),m.setUint8(h++,u.byteLength),p.set(s,h),h+=s.byteLength,p.set(c,h),h+=c.byteLength,p.set(l,h),h+=l.byteLength,p.set(u,h),h+=u.byteLength;var g=new Uint8Array(f.byteLength+a.byteLength);return g.set(p,0),g.set(new Uint8Array(a),f.byteLength),g.buffer},assertFieldSize(e,t){if(e>255)throw Error(`unable to convert ${t} to binary: must be less than or equal to 255 bytes, but is ${e} bytes`)},binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.push:return this.decodePush(e,t,r);case this.KINDS.reply:return this.decodeReply(e,t,r);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,r)}},decodePush(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,s=n.decode(e.slice(o,o+r));o+=r;let c=n.decode(e.slice(o,o+i));o+=i;let l=n.decode(e.slice(o,o+a));return o+=a,{join_ref:s,ref:null,topic:c,event:l,payload:e.slice(o,e.byteLength)}},decodeReply(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+this.META_LENGTH,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=n.decode(e.slice(s,s+o));s+=o;let f={status:d,response:e.slice(s,e.byteLength)};return{join_ref:c,ref:l,topic:u,event:Ke.reply,payload:f}},decodeBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=this.HEADER_LENGTH+2,o=n.decode(e.slice(a,a+r));a+=r;let s=n.decode(e.slice(a,a+i));return a+=i,{join_ref:null,ref:null,topic:o,event:s,payload:e.slice(a,e.byteLength)}}},it=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||Ve,this.transport=t.transport||ze.WebSocket||tt,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null;let n=null;try{n=ze&&ze.sessionStorage}catch{}this.sessionStore=t.sessionStorage||n,this.establishedConnections=0,this.defaultEncoder=rt.encode.bind(rt),this.defaultDecoder=rt.decode.bind(rt),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||`arraybuffer`,this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport===tt?(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder):(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder);let r=null;Re&&Re.addEventListener&&(Re.addEventListener(`pagehide`,e=>{this.conn&&(this.disconnect(),r=this.connectClock)}),Re.addEventListener(`pageshow`,e=>{r===this.connectClock&&(r=null,this.connect())}),Re.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=e=>t.rejoinAfterMs?t.rejoinAfterMs(e):[1e3,2e3,5e3][e-1]||1e4,this.reconnectAfterMs=e=>t.reconnectAfterMs?t.reconnectAfterMs(e):[10,50,100,150,200,250,500,1e3,2e3][e-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(e,t,n)=>{console.log(`${e}: ${t}`,n)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=Ie(t.params||{}),this.endPoint=`${e}/${qe.websocket}`,this.vsn=t.vsn||Be,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Ze(()=>{if(this.pageHidden){this.log(`Not reconnecting as page is hidden!`),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken&&Ie(t.authToken)}getLongPollTransport(){return tt}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&=(this.conn.close(),null),this.transport=e}protocol(){return location.protocol.match(/^https/)?`wss`:`ws`}endPointURL(){let e=$e.appendParams($e.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)===`/`?e.charAt(1)===`/`?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`:e}disconnect(e,t,n){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,n)}connect(e){e&&(console&&console.log(`passing params to connect is deprecated. Instead pass :params to the Socket constructor`),this.params=Ie(e)),(!this.conn||this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==tt?this.connectWithFallback(tt,this.longPollFallbackMs):this.transportConnect())}log(e,t,n){this.logger&&this.logger(e,t,n)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),n=Date.now();this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:t});let r=this.onMessage(i=>{i.ref===t&&(this.off([r]),e(Date.now()-n))});return!0}transportName(e){switch(e){case tt:return`LongPoll`;default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=[`phoenix`,`${Ye}${btoa(this.authToken()).replace(/=/g,``)}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let n=!1,r=!0,i,a,o=this.transportName(e),s=t=>{this.log(`transport`,`falling back to ${o}...`,t),this.off([i,a]),r=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${o}`))return s(`memorized`);this.fallbackTimer=setTimeout(s,t),a=this.onError(e=>{this.log(`transport`,`error`,e),r&&!n&&(clearTimeout(this.fallbackTimer),s(e))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(n=!0,!r){let t=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${t}`,`true`),this.log(`transport`,`established ${t} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(s,t),this.ping(e=>{this.log(`transport`,`connected to primary after`,e),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log(`transport`,`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks(`open`)}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log(`transport`,`heartbeat timeout. Attempting to re-establish connection`);try{this.heartbeatCallback(`timeout`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.triggerChanError(Error(`heartbeat timeout`)),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),He,`heartbeat timeout`)}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,n){if(!this.conn)return e&&e();let r=this.conn;this.waitForBufferDone(r,()=>{t?r.close(t,n||``):r.close(),this.waitForSocketClosed(r,()=>{this.conn===r&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,n=1){if(n===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,n+1)},150*n)}waitForSocketClosed(e,t,n=1){if(n===5||e.readyState===We.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,n+1)},150*n)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log(`transport`,`close`,e),this.triggerChanError(e),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks(`close`,e)}onConnError(e){this.hasLogger()&&this.log(`transport`,`error`,e);let t=this.transport,n=this.establishedConnections;this.triggerStateCallbacks(`error`,e,t,n),(t===this.transport||n>0)&&this.triggerChanError(e)}triggerChanError(e){this.channels.forEach(t=>{t.isErrored()||t.isLeaving()||t.isClosed()||t.trigger(Ke.error,e)})}connectionState(){switch(this.conn&&this.conn.readyState){case We.connecting:return`connecting`;case We.open:return`open`;case We.closing:return`closing`;default:return`closed`}}isConnected(){return this.connectionState()===`open`}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([t])=>e.indexOf(t)===-1)}channel(e,t={}){let n=new Qe(e,t,this);return this.channels.push(n),n}push(e){if(this.hasLogger()){let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;this.log(`push`,`${t} ${n} (${a}, ${i})`,r)}this.isConnected()?this.encode(e,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(e,e=>this.conn.send(e)))}makeRef(){let e=this.ref+1;return this.ref=e===this.ref?0:e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback(`disconnected`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback(`sent`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,e=>{let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){let e=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status===`ok`?`ok`:`error`,e)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log(`receive`,`${r.status||``} ${t} ${n} ${i&&`(`+i+`)`||``}`.trim(),r);for(let e=0;e<this.channels.length;e++){let o=this.channels[e];o.isMember(t,n,r,a)&&o.trigger(n,r,i,a)}this.triggerStateCallbacks(`message`,e)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([n,r])=>{try{r(...t)}catch(t){this.log(`error`,`error in ${e} callback`,t)}})}catch(t){this.log(`error`,`error triggering ${e} callbacks`,t)}}leaveOpenTopic(e){let t=this.channels.find(t=>t.topic===e&&(t.isJoined()||t.isJoining()));t&&(this.hasLogger()&&this.log(`transport`,`leaving duplicate topic "${e}"`),t.leave())}},at=class e{constructor(t,n){let r=ct(n);this.presence=new nt(t.getChannel(),r),this.presence.onJoin((n,r,i)=>{let a=e.onJoinPayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onLeave((n,r,i)=>{let a=e.onLeavePayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onSync(()=>{t.getChannel().trigger(`presence`,{event:`sync`})})}get state(){return e.transformState(this.presence.state)}static transformState(e){return e=st(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{let r=e[n];return t[n]=ot(r),t},{})}static onJoinPayload(e,t,n){return{event:`join`,key:e,currentPresences:lt(t),newPresences:ot(n)}}static onLeavePayload(e,t,n){return{event:`leave`,key:e,currentPresences:lt(t),leftPresences:ot(n)}}};function ot(e){return e.metas.map(e=>{let t=Object.getOwnPropertyDescriptors(e),n=Object.defineProperties({},t);return n.presence_ref=n.phx_ref,delete n.phx_ref,delete n.phx_ref_prev,n})}function st(e){return JSON.parse(JSON.stringify(e))}function ct(e){return e?.events&&{events:e.events}}function lt(e){return e?.metas?ot(e):[]}var ut;(function(e){e.SYNC=`sync`,e.JOIN=`join`,e.LEAVE=`leave`})(ut||={});var dt=class{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new at(this.channel.channelAdapter,t)}};function ft(e){if(e instanceof Error)return e;if(typeof e==`string`)return Error(e);if(e&&typeof e==`object`){let t=e;if(typeof t.code==`number`){let n=typeof t.reason==`string`&&t.reason?` (${t.reason})`:``;return Error(`socket closed: ${t.code}${n}`,{cause:e})}return Error(`channel error: transport failure`,{cause:e})}return Error(`channel error: connection lost`)}var pt=class{constructor(e,t,n){let r=mt(n);this.channel=e.getSocket().channel(t,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,n){let r;try{r=this.channel.push(e,t,n)}catch{throw Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>100){let e=this.channel.pushBuffer.shift();e.cancelTimeout(),this.socket.log(`channel`,`discarded push due to buffer overflow: ${e.event}`,e.payload())}return r}updateJoinPayload(e){let t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===Se.joined}isJoined(){return this.state===Se.joined}isJoining(){return this.state===Se.joining}isClosed(){return this.state===Se.closed}isLeaving(){return this.state===Se.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}};function mt(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},e.config)}}var ht=/[,()"\\]/,gt=e=>ht.test(e)||e!==e.trim(),_t=e=>`"${e.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`)}"`,vt=e=>{let t=e===null?`null`:String(e);return gt(t)?_t(t):t},yt=e=>e===null?`null`:String(e),bt=(e,t)=>{if(e===`in`){let e=Array.isArray(t)?t:[t];if(e.length===0)throw Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(e)).map(e=>vt(e)).join(`,`)})`}return e===`is`?`is.${yt(t)}`:`${e}.${vt(t)}`},xt=class{constructor(){this.filters=[]}add(e,t,n,r=!1){let i=r?`not.`:``;return this.filters.push(`${e}=${i}${bt(t,n)}`),this}eq(e,t){return this.add(e,`eq`,t)}neq(e,t){return this.add(e,`neq`,t)}gt(e,t){return this.add(e,`gt`,t)}gte(e,t){return this.add(e,`gte`,t)}lt(e,t){return this.add(e,`lt`,t)}lte(e,t){return this.add(e,`lte`,t)}in(e,t){return this.add(e,`in`,t)}like(e,t){return this.add(e,`like`,t)}ilike(e,t){return this.add(e,`ilike`,t)}match(e,t){return this.add(e,`match`,t)}imatch(e,t){return this.add(e,`imatch`,t)}is(e,t){return this.add(e,`is`,t)}isDistinct(e,t){return this.add(e,`isdistinct`,t)}not(e,t,n){return this.add(e,t,n,!0)}build(){return this.filters.join(`,`)}toString(){return this.build()}},St;(function(e){e.ALL=`*`,e.INSERT=`INSERT`,e.UPDATE=`UPDATE`,e.DELETE=`DELETE`})(St||={});var Ct;(function(e){e.BROADCAST=`broadcast`,e.PRESENCE=`presence`,e.POSTGRES_CHANGES=`postgres_changes`,e.SYSTEM=`system`})(Ct||={});var wt;(function(e){e.SUBSCRIBED=`SUBSCRIBED`,e.TIMED_OUT=`TIMED_OUT`,e.CLOSED=`CLOSED`,e.CHANNEL_ERROR=`CHANNEL_ERROR`})(wt||={});var Tt=class e{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},n){if(this.topic=e,this.params=t,this.socket=n,this.bindings={},this.subTopic=e.replace(/^realtime:/i,``),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},t.config),this.channelAdapter=new pt(this.socket.socketAdapter,e,this.params),this.presence=new dt(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Fe(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&this.params.config?.broadcast?.replay)throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){let{config:{broadcast:n,presence:r,private:i,postgres_changes_options:a}}=this.params,o=this.bindings.postgres_changes?.map(e=>e.filter)??[],s=!!this.bindings[Ct.PRESENCE]&&this.bindings[Ct.PRESENCE].length>0||this.params.config.presence?.enabled===!0,c={},l=Object.assign({broadcast:n,presence:Object.assign(Object.assign({},r),{enabled:s}),postgres_changes:o,private:i},a?{postgres_changes_options:a}:{});this.socket.accessTokenValue&&(c.access_token=this.socket.accessTokenValue),this._onError(t=>{e?.(wt.CHANNEL_ERROR,ft(t))}),this._onClose(()=>e?.(wt.CLOSED)),this.updateJoinPayload(Object.assign({config:l},c)),this._updateFilterMessage();let u=a?.wait&&o.length>0?Math.max(t,(a.timeout??be)+xe):t;this.channelAdapter.subscribe(u).receive(`ok`,async({postgres_changes:t})=>{if(this.socket._isManualToken()||this.socket.setAuth(),t===void 0){e?.(wt.SUBSCRIBED);return}this._updatePostgresBindings(t,e)}).receive(`error`,t=>{this.state=Se.errored;let n=Object.values(t).join(`, `)||`error`;e?.(wt.CHANNEL_ERROR,Error(n,{cause:t}))}).receive(`timeout`,()=>{e?.(wt.TIMED_OUT)})}return this}_updatePostgresBindings(t,n){let r=this.bindings.postgres_changes,i=r?.length??0,a=[];for(let o=0;o<i;o++){let i=r[o],{filter:{event:s,schema:c,table:l,filter:u}}=i,d=t&&t[o];if(d&&d.event===s&&e.isFilterValueEqual(d.schema,c)&&e.isFilterValueEqual(d.table,l)&&e.isFilterValueEqual(d.filter,u))a.push(Object.assign(Object.assign({},i),{id:d.id}));else{this.unsubscribe(),this.state=Se.errored,n?.(wt.CHANNEL_ERROR,Error(`mismatch between server and client bindings for postgres changes`));return}}this.bindings.postgres_changes=a,this.state!=Se.errored&&n&&n(wt.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:`presence`,event:`track`,payload:e},t)}async untrack(e={}){return await this.send({type:`presence`,event:`untrack`},e)}on(e,t,n){let r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===Ct.PRESENCE||e===Ct.POSTGRES_CHANGES;if(r&&i)throw this.socket.log(`channel`,`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,n)}async httpSend(e,t,n={}){if(t==null)return Promise.reject(Error(`Payload is required for httpSend()`));let r=t instanceof ArrayBuffer||ArrayBuffer.isView(t),i={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":r?`application/octet-stream`:`application/json`};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);let a=new URL(this.broadcastEndpointURL);a.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&a.searchParams.set(`private`,`true`);let o={method:`POST`,headers:i,body:r?t:JSON.stringify(t)},s=await this._fetchWithTimeout(a.toString(),o,n.timeout??this.timeout);if(s.status===202)return{success:!0};if(s.status===404)return Promise.reject(Error(`httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md`));let c=s.statusText;try{let e=await s.json();c=e.error||e.message||c}catch{}return Promise.reject(Error(c))}async send(e,t={}){if(!this.channelAdapter.canPush()&&e.type===`broadcast`){let n=`Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.`;this.socket.hasLogger()?this.socket.log(`channel`,n):console.warn(n);let{event:r,payload:i}=e,a={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":`application/json`};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);let o={method:`POST`,headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:i,private:this.private}]})};try{let e=await this._fetchWithTimeout(this.broadcastEndpointURL,o,t.timeout??this.timeout);return await e.body?.cancel(),e.ok?`ok`:`error`}catch(e){return e instanceof Error&&e.name===`AbortError`?`timed out`:`error`}}return new Promise(n=>{let r=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type===`broadcast`&&!this.params?.config?.broadcast?.ack&&n(`ok`),r.receive(`ok`,()=>n(`ok`)),r.receive(`error`,()=>n(`error`)),r.receive(`timeout`,()=>n(`timed out`))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive(`ok`,()=>t(`ok`)).receive(`timeout`,()=>t(`timed out`)).receive(`error`,()=>t(`error`))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,n){let r=new AbortController,i=setTimeout(()=>r.abort(),n),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(i),a}_on(t,n,r){let i=t.toLocaleLowerCase(),a=n?.filter;if((a instanceof xt||typeof a==`object`&&a&&typeof a.build==`function`)&&(n=Object.assign(Object.assign({},n),{filter:a.build()})),i===Ct.POSTGRES_CHANGES&&this.bindings[i]?.find(t=>e.isSamePostgresFilter(t.filter,n)))return this.socket.log(`error`,`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,n),this;let o=this.channelAdapter.on(t,r),s={type:i,filter:n,callback:r,ref:o};return this.bindings[i]?this.bindings[i].push(s):this.bindings[i]=[s],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,n)=>{let r=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(r,n))return!1;let i=this.bindings[r]?.find(t=>t.ref===e.ref);if(!i)return!0;if([`broadcast`,`presence`,`postgres_changes`].includes(r)){if(`id`in i){let e=i.id,n=i.filter?.event;return e&&t.ids?.includes(e)&&(n===`*`||n?.toLocaleLowerCase()===t.data?.type.toLocaleLowerCase())}{let e=(i?.filter?.event)?.toLocaleLowerCase();return e===`*`||e===(t?.event)?.toLocaleLowerCase()}}return i.type.toLocaleLowerCase()===r})}_notThisChannelEvent(e,t){let{close:n,error:r,leave:i,join:a}=Ce;return t&&[n,r,i,a].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,n)=>{if(typeof t==`object`&&`ids`in t){let e=t.data,{schema:n,table:r,commit_timestamp:i,type:a,errors:o}=e;return Object.assign(Object.assign({},{schema:n,table:r,commit_timestamp:i,eventType:a,new:{},old:{},errors:o}),this._getPayloadRecords(e))}return t})}copyBindings(e){if(this.joinedOnce)throw Error(`cannot copy bindings into joined channel`);for(let t in e.bindings)for(let n of e.bindings[t])this._on(n.type,n.filter,n.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}static isSamePostgresFilter(t,n){let r=(t?.select)?.join()??void 0,i=(n?.select)?.join()??void 0;return t?.event===n?.event&&e.isFilterValueEqual(t?.schema,n?.schema)&&e.isFilterValueEqual(t?.table,n?.table)&&e.isFilterValueEqual(t?.filter,n?.filter)&&r===i}_getPayloadRecords(e){let t={new:{},old:{}};return(e.type===`INSERT`||e.type===`UPDATE`)&&(t.new=Ee(e.columns,e.record)),(e.type===`UPDATE`||e.type===`DELETE`)&&(t.old=Ee(e.columns,e.old_record)),t}},Et=class{constructor(e,t){this.socket=new it(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,n,r=1e4){return new Promise(i=>{setTimeout(()=>i(`timeout`),r),this.socket.disconnect(()=>{e(),i(`ok`)},t,n)})}push(e){this.socket.push(e)}log(e,t,n){this.socket.log(e,t,n)}hasLogger(){return this.socket.hasLogger()}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==we.connecting}isDisconnecting(){return this.socket.connectionState()==we.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}},Dt={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},Ot=[1e3,2e3,5e3,1e4],kt=1e4;function At(){let e=new Map;return{get length(){return e.size},clear(){e.clear()},getItem(t){return e.has(t)?e.get(t):null},key(t){return Array.from(e.keys())[t]??null},removeItem(t){e.delete(t)},setItem(t,n){e.set(t,String(n))}}}function jt(){try{if(typeof globalThis<`u`&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return At()}var Mt=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,Nt=class{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){if(this.channels=[],this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint=``,this.headers={},this.params={},this.ref=0,this.serializer=new Te,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),!t?.params?.apikey)throw Error(`API key is required to connect to Realtime`);this.apiKey=t.params.apikey;let n=this._initializeOptions(t);this.socketAdapter=new Et(e,n),this.httpEndpoint=Fe(e),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely(`connect`),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){let t=e.message;throw Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this._cancelPendingDisconnect(),this.isDisconnecting()?`ok`:await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){let t=await e.unsubscribe();return t===`ok`&&e.teardown(),t}async removeAllChannels(){let e=this.channels.map(async e=>{let t=await e.unsubscribe();return e.teardown(),t}),t=await Promise.all(e);return await this.disconnect(),t}log(e,t,n){this.socketAdapter.log(e,t,n)}hasLogger(){return this.socketAdapter.hasLogger()}connectionState(){return this.socketAdapter.connectionState()||we.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){let n=`realtime:${e}`,r=this.getChannels().find(e=>e.topic===n);if(r)return r;{let n=new Tt(`realtime:${e}`,t,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){let t=++this._authGeneration,n=this._performAuth(e,t);t===this._authGeneration&&(this._authPromise=n);try{await n}finally{this._authPromise===n&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic),this.channels.length===0&&(this.log(`transport`,`no channels remaining, scheduling disconnect`),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log(`transport`,`disconnecting immediately - no channels`),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log(`transport`,`deferred disconnect fired - no channels, disconnecting`),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log(`transport`,`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log(`transport`,`pending disconnect cancelled - channel activity detected`),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,t){let n,r=!1;if(e)n=e,r=!0;else if(this.accessToken)try{n=await this.accessToken()}catch(e){this.log(`error`,`Error fetching access token from callback`,e),n=this.accessTokenValue}else n=this.accessTokenValue;t===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:r&&(this._manuallySetToken=!0),this.accessTokenValue!=n&&(this.accessTokenValue=n,this.channels.forEach(e=>{let t={access_token:n,version:he};e.updateJoinPayload(t),e.joinedOnce&&e.channelAdapter.isJoined()&&e.channelAdapter.push(Ce.access_token,{access_token:n})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e=`general`){this._isManualToken()||this.setAuth().catch(t=>{this.log(`error`,`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(e=>{this.log(`error`,`error waiting for auth on connect`,e)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,n)=>{t!==`disconnected`&&(t==`sent`&&this._setAuthSafely(),e&&e(t,n))}}_startWorkerHeartbeat(){this.workerUrl?this.log(`worker`,`starting worker for from ${this.workerUrl}`):this.log(`worker`,`starting default worker`);let e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log(`worker`,`worker error`,e.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=e=>{e.data.event===`keepAlive`&&this.sendHeartbeat()},this.workerRef.postMessage({event:`start`,interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&=(this.log(`worker`,`terminating worker`),this.workerRef.terminate(),void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{let e=new Blob([Mt],{type:`application/javascript`});t=URL.createObjectURL(e)}return t}_initializeOptions(e){this.worker=e?.worker??!1,this.accessToken=e?.accessToken??null;let t={};t.timeout=e?.timeout??ye,t.heartbeatIntervalMs=e?.heartbeatIntervalMs??Dt.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=e?.disconnectOnEmptyChannelsAfterMs??2*(e?.heartbeatIntervalMs??Dt.HEARTBEAT_INTERVAL),t.transport=e?.transport??me.getWebSocketConstructor(),t.params=e?.params,t.logger=e?.logger,t.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),t.sessionStorage=e?.sessionStorage??jt(),t.reconnectAfterMs=e?.reconnectAfterMs??(e=>Ot[e-1]||kt);let n,r,i=e?.vsn??ve;switch(i){case ge:n=(e,t)=>t(JSON.stringify(e)),r=(e,t)=>t(JSON.parse(e));break;case _e:n=this.serializer.encode.bind(this.serializer),r=this.serializer.decode.bind(this.serializer);break;default:throw Error(`Unsupported serializer version: ${t.vsn}`)}if(t.vsn=i,t.encode=e?.encode??n,t.decode=e?.decode??r,t.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,t.params=Object.assign(Object.assign({},t.params),{log_level:this.logLevel})),this.worker){if(typeof window<`u`&&!window.Worker)throw Error(`Web Worker is not supported`);this.workerUrl=e?.workerUrl,t.autoSendHeartbeat=!this.worker}return t}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}},Pt=class extends Error{constructor(e,t){super(e),this.name=`IcebergError`,this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType===`CommitStateUnknownException`||[500,502,504].includes(t.status)&&t.icebergType?.includes(`CommitState`)===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Ft(e,t,n){let r=new URL(t,e);if(n)for(let[e,t]of Object.entries(n))t!==void 0&&r.searchParams.set(e,t);return r.toString()}async function It(e){return!e||e.type===`none`?{}:e.type===`bearer`?{Authorization:`Bearer ${e.token}`}:e.type===`header`?{[e.name]:e.value}:e.type===`custom`?await e.getHeaders():{}}function Lt(e){let t=e.fetchImpl??globalThis.fetch;return{async request({method:n,path:r,query:i,body:a,headers:o}){let s=Ft(e.baseUrl,r,i),c=await It(e.auth),l=await t(s,{method:n,headers:{...a?{"Content-Type":`application/json`}:{},...c,...o},body:a?JSON.stringify(a):void 0}),u=await l.text(),d=(l.headers.get(`content-type`)||``).includes(`application/json`),f=d&&u?JSON.parse(u):u;if(!l.ok){let e=d?f:void 0,t=e?.error;throw new Pt(t?.message??`Request failed with status ${l.status}`,{status:l.status,icebergType:t?.type,icebergCode:t?.code,details:e})}return{status:l.status,headers:l.headers,data:f}}}}function Rt(e){return e.join(``)}var zt=class{constructor(e,t=``){this.client=e,this.prefix=t}async listNamespaces(e){let t=e?{parent:Rt(e.namespace)}:void 0;return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(e=>({namespace:e}))}async createNamespace(e,t){let n={namespace:e.namespace,properties:t?.properties};return(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(e){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${Rt(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Rt(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${Rt(e.namespace)}`}),!0}catch(e){if(e instanceof Pt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(e){if(e instanceof Pt&&e.status===409)return;throw e}}};function Bt(e){return e.join(``)}var Vt=class{constructor(e,t=``,n){this.client=e,this.prefix=t,this.accessDelegation=n}async listTables(e){return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Bt(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){let n={};return this.accessDelegation&&(n[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${Bt(e.namespace)}/tables`,body:t,headers:n})).data.metadata}async updateTable(e,t){let n=await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${Bt(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":n.data[`metadata-location`],metadata:n.data.metadata}}async dropTable(e,t){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${Bt(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String(t?.purge??!1)}})}async loadTable(e){let t={};return this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Bt(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){let t={};this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation);try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${Bt(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(e){if(e instanceof Pt&&e.status===404)return!1;throw e}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(n){if(n instanceof Pt&&n.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw n}}},Ht=class{constructor(e){let t=`v1`;e.catalogName&&(t+=`/${e.catalogName}`);let n=e.baseUrl.endsWith(`/`)?e.baseUrl:`${e.baseUrl}/`;this.client=Lt({baseUrl:n,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=e.accessDelegation?.join(`,`),this.namespaceOps=new zt(this.client,t),this.tableOps=new Vt(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function Ut(e){"@babel/helpers - typeof";return Ut=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Ut(e)}function Wt(e,t){if(Ut(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(Ut(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Gt(e){var t=Wt(e,`string`);return Ut(t)==`symbol`?t:t+``}function Kt(e,t,n){return(t=Gt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?qt(Object(n),!0).forEach(function(t){Kt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):qt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Jt=class extends Error{constructor(e,t=`storage`,n,r){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t===`vectors`?`StorageVectorsError`:`StorageError`,this.status=n,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function Yt(e){return typeof e==`object`&&!!e&&`__isStorageError`in e}var Xt=class extends Jt{constructor(e,t,n,r=`storage`,i){super(e,r,t,n),this.name=r===`vectors`?`StorageVectorsApiError`:`StorageApiError`,this.status=t,this.statusCode=n,this.code=i}toJSON(){return b(b({},super.toJSON()),{},{code:this.code})}},Zt=class extends Jt{constructor(e,t,n=`storage`){super(e,n),this.name=n===`vectors`?`StorageVectorsUnknownError`:`StorageUnknownError`,this.originalError=t}};function Qt(e,t,n){let r=b({},e),i=t.toLowerCase();for(let e of Object.keys(r))e.toLowerCase()===i&&delete r[e];return r[i]=n,r}function $t(e){let t={};for(let[n,r]of Object.entries(e))t[n.toLowerCase()]=r;return t}var en=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),tn=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},nn=e=>{if(Array.isArray(e))return e.map(e=>nn(e));if(typeof e==`function`||e!==Object(e))return e;let t={};return Object.entries(e).forEach(([e,n])=>{let r=e.replace(/([-_][a-z])/gi,e=>e.toUpperCase().replace(/[-_]/g,``));t[r]=nn(n)}),t},rn=e=>!e||typeof e!=`string`||e.length===0||e.length>100||e.trim()!==e||e.includes(`/`)||e.includes(`\\`)?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e),an=e=>e.split(`/`).map(encodeURIComponent).join(`/`),on=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error;if(typeof t.error==`object`&&t.error!==null){let e=t.error;if(typeof e.message==`string`)return e.message}}return JSON.stringify(e)},sn=async(e,t,n,r)=>{if(typeof e==`object`&&e&&`json`in e&&typeof e.json==`function`){let n=e,i=parseInt(String(n.status),10);Number.isFinite(i)||(i=500),n.json().then(e=>{let n=e?.statusCode||e?.code||i+``;t(new Xt(on(e),i,n,r,e?.code))}).catch(()=>{let e=i+``;t(new Xt(n.statusText||`HTTP ${i} error`,i,e,r))})}else t(new Zt(on(e),e,r))},cn=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};if(e===`GET`||e===`HEAD`||!r)return b(b({},i),n);if(tn(r)){let e=t?.headers||{},n;for(let[t,r]of Object.entries(e))t.toLowerCase()===`content-type`&&(n=r);i.headers=Qt(e,`Content-Type`,n??`application/json`),i.body=JSON.stringify(r)}else i.body=r;return t?.duplex&&(i.duplex=t.duplex),b(b({},i),n)};async function ln(e,t,n,r,i,a,o){return new Promise((s,c)=>{e(n,cn(t,r,i,a)).then(e=>{if(!e.ok)throw e;if(r?.noResolveJson)return e;if(o===`vectors`){let t=e.headers.get(`content-type`);if(e.headers.get(`content-length`)===`0`||e.status===204||!t||!t.includes(`application/json`))return{}}return e.json()}).then(e=>s(e)).catch(e=>sn(e,c,r,o))})}function un(e=`storage`){return{get:async(t,n,r,i)=>ln(t,`GET`,n,r,i,void 0,e),post:async(t,n,r,i,a)=>ln(t,`POST`,n,i,a,r,e),put:async(t,n,r,i,a)=>ln(t,`PUT`,n,i,a,r,e),head:async(t,n,r,i)=>ln(t,`HEAD`,n,b(b({},r),{},{noResolveJson:!0}),i,void 0,e),remove:async(t,n,r,i,a)=>ln(t,`DELETE`,n,i,a,r,e)}}var{get:dn,post:fn,put:pn,head:mn,remove:hn}=un(`storage`),gn=un(`vectors`),_n=class{constructor(e,t={},n,r=`storage`){this.shouldThrowOnError=!1,this.url=e,this.headers=$t(t),this.fetch=en(n),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Qt(this.headers,e,t),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Yt(e))return{data:null,error:e};throw e}}},vn=Symbol.toStringTag,yn=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[vn]=`StreamDownloadBuilder`,this.promise=null}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Yt(t))return{data:null,error:t};throw t}}},bn=Symbol.toStringTag,xn=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[bn]=`BlobDownloadBuilder`,this.promise=null}asStream(){return new yn(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Yt(t))return{data:null,error:t};throw t}}},Sn={limit:100,offset:0,sortBy:{column:`name`,order:`asc`}},Cn={cacheControl:`3600`,contentType:`text/plain;charset=UTF-8`,upsert:!1},wn=class extends _n{constructor(e,t={},n,r){super(e,t,r,`storage`),this.bucketId=n}async uploadOrUpdate(e,t,n,r){var i=this;return i.handleOperation(async()=>{let a,o=b(b({},Cn),r),s=b(b({},i.headers),e===`POST`&&{"x-upsert":String(o.upsert)}),c=o.metadata;if(typeof Blob<`u`&&n instanceof Blob?(a=new FormData,a.append(`cacheControl`,o.cacheControl),c&&a.append(`metadata`,i.encodeMetadata(c)),a.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(a=n,a.has(`cacheControl`)||a.append(`cacheControl`,o.cacheControl),c&&!a.has(`metadata`)&&a.append(`metadata`,i.encodeMetadata(c))):(a=n,s[`cache-control`]=`max-age=${o.cacheControl}`,s[`content-type`]=o.contentType,c&&(s[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&a instanceof ReadableStream||a&&typeof a==`object`&&`pipe`in a&&typeof a.pipe==`function`)&&!o.duplex&&(o.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))s=Qt(s,e,t);let l=i._removeEmptyFolders(t),u=i._getFinalPath(l),d=await(e==`PUT`?pn:fn)(i.fetch,`${i.url}/object/${u}`,a,b({headers:s},o?.duplex?{duplex:o.duplex}:{}));return{path:l,id:d.Id,fullPath:d.Key}})}async upload(e,t,n){return this.uploadOrUpdate(`POST`,e,t,n)}async uploadToSignedUrl(e,t,n,r){var i=this;let a=i._removeEmptyFolders(e),o=i._getFinalPath(a),s=new URL(i.url+`/object/upload/sign/${o}`);return s.searchParams.set(`token`,t),i.handleOperation(async()=>{let e,t=b(b({},Cn),r),o=b(b({},i.headers),{"x-upsert":String(t.upsert)}),c=t.metadata;if(typeof Blob<`u`&&n instanceof Blob?(e=new FormData,e.append(`cacheControl`,t.cacheControl),c&&e.append(`metadata`,i.encodeMetadata(c)),e.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(e=n,e.has(`cacheControl`)||e.append(`cacheControl`,t.cacheControl),c&&!e.has(`metadata`)&&e.append(`metadata`,i.encodeMetadata(c))):(e=n,o[`cache-control`]=`max-age=${t.cacheControl}`,o[`content-type`]=t.contentType,c&&(o[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&e instanceof ReadableStream||e&&typeof e==`object`&&`pipe`in e&&typeof e.pipe==`function`)&&!t.duplex&&(t.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))o=Qt(o,e,t);return{path:a,fullPath:(await pn(i.fetch,s.toString(),e,b({headers:o},t?.duplex?{duplex:t.duplex}:{}))).Key}})}async createSignedUploadUrl(e,t){var n=this;return n.handleOperation(async()=>{let r=n._getFinalPath(e),i=b({},n.headers);t?.upsert&&(i[`x-upsert`]=`true`);let a=await fn(n.fetch,`${n.url}/object/upload/sign/${r}`,{},{headers:i}),o=new URL(n.url+a.url),s=o.searchParams.get(`token`);if(!s)throw new Jt(`No token returned by API`);return{signedUrl:o.toString(),path:e,token:s}})}async update(e,t,n){return this.uploadOrUpdate(`PUT`,e,t,n)}async move(e,t,n){var r=this;return r.handleOperation(async()=>await fn(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket,sourceVersionId:n?.sourceVersionId},{headers:r.headers}))}async copy(e,t,n){var r=this;return r.handleOperation(async()=>({path:(await fn(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket,sourceVersionId:n?.sourceVersionId},{headers:r.headers})).Key}))}async createSignedUrl(e,t,n){var r=this;return r.handleOperation(async()=>{let i=r._getFinalPath(e),a=typeof n?.transform==`object`&&n.transform!==null&&Object.keys(n.transform).length>0,o=await fn(r.fetch,`${r.url}/object/sign/${i}`,b(b({expiresIn:t},a?{transform:n.transform}:{}),n?.versionId==null?{}:{versionId:n.versionId}),{headers:r.headers}),s=new URLSearchParams;n?.download&&s.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&s.set(`cacheNonce`,String(n.cacheNonce));let c=s.toString();return{signedUrl:encodeURI(`${r.url}${o.signedURL}${c?`&${c}`:``}`)}})}async createSignedUrls(e,t,n){var r=this;return r.handleOperation(async()=>{let i=await fn(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:t,paths:e},{headers:r.headers}),a=new URLSearchParams;n?.download&&a.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&a.set(`cacheNonce`,String(n.cacheNonce));let o=a.toString();return i.map(e=>b(b({},e),{},{signedUrl:e.signedURL?encodeURI(`${r.url}${e.signedURL}${o?`&${o}`:``}`):null}))})}download(e,t,n){let r=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image/authenticated`:`object`,i=new URLSearchParams;t?.transform&&this.applyTransformOptsToQuery(i,t.transform),t?.cacheNonce!=null&&i.set(`cacheNonce`,String(t.cacheNonce)),t?.versionId!=null&&i.set(`versionId`,String(t.versionId));let a=i.toString(),o=this._getFinalPath(e);return new xn(()=>dn(this.fetch,`${this.url}/${r}/${o}${a?`?${a}`:``}`,{headers:this.headers,noResolveJson:!0},n),this.shouldThrowOnError)}async info(e,t){var n=this;let r=n._getFinalPath(e),i=new URLSearchParams;t?.versionId!=null&&i.set(`versionId`,String(t.versionId));let a=i.toString();return n.handleOperation(async()=>nn(await dn(n.fetch,`${n.url}/object/info/${r}${a?`?${a}`:``}`,{headers:n.headers})))}async exists(e){var t=this;let n=t._getFinalPath(e);try{return await mn(t.fetch,`${t.url}/object/${n}`,{headers:t.headers}),{data:!0,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Yt(e)){let t=e instanceof Xt?e.status:e instanceof Zt?e.originalError?.status:void 0;if(t!==void 0&&[400,404].includes(t))return{data:!1,error:e}}throw e}}getPublicUrl(e,t){let n=this._getFinalPath(e),r=new URLSearchParams;t?.download&&r.set(`download`,t.download===!0?``:t.download),t?.transform&&this.applyTransformOptsToQuery(r,t.transform),t?.cacheNonce!=null&&r.set(`cacheNonce`,String(t.cacheNonce)),t?.versionId!=null&&r.set(`versionId`,String(t.versionId));let i=r.toString(),a=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image`:`object`;return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}`)+(i?`?${i}`:``)}}}async remove(e){var t=this;return t.handleOperation(async()=>await hn(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async purgeCache(e,t,n){var r=this;return r.handleOperation(async()=>{let i=an(r._getFinalPath(e)),a=new URLSearchParams;t?.transformations&&a.set(`transformations`,`true`);let o=a.toString();return await hn(r.fetch,`${r.url}/cdn/${i}${o?`?${o}`:``}`,{},{headers:r.headers},n)})}async list(e,t,n){var r=this;return r.handleOperation(async()=>{let i=t?.sortBy?b(b({},Sn.sortBy),t.sortBy):Sn.sortBy,a=b(b(b({},Sn),t),{},{sortBy:i,prefix:e||``});return await fn(r.fetch,`${r.url}/object/list/${r.bucketId}`,a,{headers:r.headers},n)})}async listV2(e,t){var n=this;return n.handleOperation(async()=>{let r=b({},e);return await fn(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,r,{headers:n.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<`u`?Buffer.from(e).toString(`base64`):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,``)}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,``).replace(/\/+/g,`/`)}applyTransformOptsToQuery(e,t){return t.width&&e.set(`width`,t.width.toString()),t.height&&e.set(`height`,t.height.toString()),t.resize&&e.set(`resize`,t.resize),t.format&&e.set(`format`,t.format),t.quality&&e.set(`quality`,t.quality.toString()),e}},Tn={"X-Client-Info":`storage-js/2.117.2`},En=class extends _n{constructor(e,t={},n,r){let i=new URL(e);r?.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes(`storage.supabase.`)&&(i.hostname=i.hostname.replace(`supabase.`,`storage.supabase.`));let a=i.href.replace(/\/$/,``),o=b(b({},Tn),t);super(a,o,n,`storage`)}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=t.listBucketOptionsToQueryString(e);return await dn(t.fetch,`${t.url}/bucket${n}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await dn(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var n=this;return n.handleOperation(async()=>await fn(n.fetch,`${n.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes,versioning_status:t.versioningStatus},{headers:n.headers}))}async updateBucket(e,t){var n=this;return n.handleOperation(async()=>await pn(n.fetch,`${n.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes,versioning_status:t.versioningStatus},{headers:n.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await fn(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await hn(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}async getBucketLifecycle(e){var t=this;return t.handleOperation(async()=>await dn(t.fetch,t.bucketLifecycleUrl(e),{headers:t.headers}))}async updateBucketLifecycle(e,t){var n=this;return n.handleOperation(async()=>await pn(n.fetch,n.bucketLifecycleUrl(e),t,{headers:n.headers}))}async deleteBucketLifecycle(e){var t=this;return t.handleOperation(async()=>await hn(t.fetch,t.bucketLifecycleUrl(e),{},{headers:t.headers}))}async purgeBucketCache(e,t,n){var r=this;return r.handleOperation(async()=>{let i=new URLSearchParams;t?.transformations&&i.set(`transformations`,`true`);let a=i.toString();return await hn(r.fetch,`${r.url}/cdn/${an(e)}${a?`?${a}`:``}`,{},{headers:r.headers},n)})}bucketLifecycleUrl(e){return`${this.url}/bucket/${an(e)}/lifecycle`}listBucketOptionsToQueryString(e){let t={};return e&&(`limit`in e&&(t.limit=String(e.limit)),`offset`in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?`?`+new URLSearchParams(t).toString():``}},Dn=class extends _n{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=b(b({},Tn),t);super(r,i,n,`storage`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await fn(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=new URLSearchParams;e?.limit!==void 0&&n.set(`limit`,e.limit.toString()),e?.offset!==void 0&&n.set(`offset`,e.offset.toString()),e?.sortColumn&&n.set(`sortColumn`,e.sortColumn),e?.sortOrder&&n.set(`sortOrder`,e.sortOrder),e?.search&&n.set(`search`,e.search);let r=n.toString(),i=r?`${t.url}/bucket?${r}`:`${t.url}/bucket`;return await dn(t.fetch,i,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await hn(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!rn(e))throw new Jt(`Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.`);let n=new Ht({baseUrl:this.url,catalogName:e,auth:{type:`custom`,getHeaders:async()=>t.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(n,{get(e,t){let n=e[t];return typeof n==`function`?async(...t)=>{try{return{data:await n.apply(e,t),error:null}}catch(e){if(r)throw e;return{data:null,error:e}}}:n}})}},On=class extends _n{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=b(b({},Tn),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createIndex(e){var t=this;return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var n=this;return n.handleOperation(async()=>await gn.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var n=this;return n.handleOperation(async()=>await gn.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers})||{})}},kn=class extends _n{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=b(b({},Tn),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw Error(`Vector batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw Error(`segmentCount must be between 1 and 16`);if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw Error(`Keys batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},An=class extends _n{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=b(b({},Tn),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await gn.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},jn=class extends An{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new Mn(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,n=this;return t().call(n,e)}async getBucket(e){var t=()=>super.getBucket,n=this;return t().call(n,e)}async listBuckets(e={}){var t=()=>super.listBuckets,n=this;return t().call(n,e)}async deleteBucket(e){var t=()=>super.deleteBucket,n=this;return t().call(n,e)}},Mn=class extends On{constructor(e,t,n,r){super(e,t,r),this.vectorBucketName=n}async createIndex(e){var t=()=>super.createIndex,n=this;return t().call(n,b(b({},e),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,n=this;return t().call(n,b(b({},e),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,n=this;return t().call(n,n.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,n=this;return t().call(n,n.vectorBucketName,e)}index(e){return new Nn(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},Nn=class extends kn{constructor(e,t,n,r,i){super(e,t,i),this.vectorBucketName=n,this.indexName=r}async putVectors(e){var t=()=>super.putVectors,n=this;return t().call(n,b(b({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(e){var t=()=>super.getVectors,n=this;return t().call(n,b(b({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,n=this;return t().call(n,b(b({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,n=this;return t().call(n,b(b({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,n=this;return t().call(n,b(b({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},Pn=class extends En{constructor(e,t={},n,r){super(e,t,n,r)}from(e){return new wn(this.url,this.headers,e,this.fetch)}get vectors(){return new jn(this.url+`/vector`,{headers:this.headers,fetch:this.fetch})}get analytics(){return new Dn(this.url+`/iceberg`,this.headers,this.fetch)}},Fn=`2.117.2`,In=3e4,Ln=3*In,Rn=2*In,zn=`http://localhost:9999`,Bn=`supabase.auth.token`,Vn={"X-Client-Info":`gotrue-js/${Fn}`},Hn=`X-Supabase-Api-Version`,Un={"2024-01-01":{timestamp:Date.parse(`2024-01-01T00:00:00.0Z`),name:`2024-01-01`}},Wn=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Gn=`sb_flow_id`,Kn=class extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name=`AuthError`,this.status=t,this.code=n}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}};function x(e){return typeof e==`object`&&!!e&&`__isAuthError`in e}var qn=class extends Kn{constructor(e,t,n){super(e,t,n),this.name=`AuthApiError`,this.status=t,this.code=n}};function Jn(e){return x(e)&&e.name===`AuthApiError`}var Yn=class extends Kn{constructor(e,t){super(e),this.name=`AuthUnknownError`,this.originalError=t}},Xn=class extends Kn{constructor(e,t,n,r){super(e,n,r),this.name=t,this.status=n}},S=class extends Xn{constructor(){super(`Auth session missing!`,`AuthSessionMissingError`,400,void 0)}};function Zn(e){return x(e)&&e.name===`AuthSessionMissingError`}var Qn=class extends Xn{constructor(){super(`Auth session or user missing`,`AuthInvalidTokenResponseError`,500,void 0)}},$n=class extends Xn{constructor(e){super(e,`AuthInvalidCredentialsError`,400,void 0)}},er=class extends Xn{constructor(e,t=null){super(e,`AuthImplicitGrantRedirectError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}};function tr(e){return x(e)&&e.name===`AuthImplicitGrantRedirectError`}var nr=class extends Xn{constructor(e,t=null){super(e,`AuthPKCEGrantCodeExchangeError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}},rr=class extends Xn{constructor(){super(`PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.`,`AuthPKCECodeVerifierMissingError`,400,`pkce_code_verifier_not_found`)}},ir=class extends Xn{constructor(e,t){super(e,`AuthRetryableFetchError`,t,void 0)}};function ar(e){return x(e)&&e.name===`AuthRetryableFetchError`}var or=class extends Xn{constructor(e=`Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)`){super(e,`AuthRefreshDiscardedError`,409,void 0)}};function sr(e){return x(e)&&e.name===`AuthRefreshDiscardedError`}var cr=class extends Xn{constructor(e,t,n){super(e,`AuthWeakPasswordError`,t,`weak_password`),this.reasons=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}},lr=class extends Xn{constructor(e){super(e,`AuthInvalidJwtError`,400,`invalid_jwt`)}},ur=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`.split(``),dr=` 	
\r=`.split(``),fr=(()=>{let e=Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<dr.length;t+=1)e[dr[t].charCodeAt(0)]=-2;for(let t=0;t<ur.length;t+=1)e[ur[t].charCodeAt(0)]=t;return e})();function pr(e,t,n){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;)n(ur[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6;else if(t.queuedBits>0)for(t.queue<<=6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;)n(ur[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6}function mr(e,t,n){let r=fr[e];if(r>-1)for(t.queue=t.queue<<6|r,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else if(r===-2)return;else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}function hr(e){let t=[],n=e=>{t.push(String.fromCodePoint(e))},r={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},a=e=>{vr(e,r,n)};for(let t=0;t<e.length;t+=1)mr(e.charCodeAt(t),i,a);return t.join(``)}function gr(e,t){if(e<=127){t(e);return}if(e<=2047){t(192|e>>6),t(128|e&63);return}if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function _r(e,t){for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);if(r>55295&&r<=56319){let t=(r-55296)*1024&65535;r=(e.charCodeAt(n+1)-56320&65535|t)+65536,n+=1}gr(r,t)}}function vr(e,t,n){if(t.utf8seq===0){if(e<=127){n(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw Error(`Invalid UTF-8 sequence`);--t.utf8seq}else if(t.utf8seq>0){if(e<=127)throw Error(`Invalid UTF-8 sequence`);t.codepoint=t.codepoint<<6|e&63,--t.utf8seq,t.utf8seq===0&&n(t.codepoint)}}function yr(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};for(let t=0;t<e.length;t+=1)mr(e.charCodeAt(t),n,r);return new Uint8Array(t)}function br(e){let t=[];return _r(e,e=>t.push(e)),new Uint8Array(t)}function xr(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};return e.forEach(e=>pr(e,n,r)),pr(null,n,r),t.join(``)}function Sr(e){return Math.round(Date.now()/1e3)+e}function Cr(){return Symbol(`auth-callback`)}var C=()=>typeof window<`u`&&typeof document<`u`,wr={tested:!1,writable:!1},Tr=()=>{if(!C())return!1;try{if(typeof globalThis.localStorage!=`object`)return!1}catch{return!1}if(wr.tested)return wr.writable;let e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),wr.tested=!0,wr.writable=!0}catch{wr.tested=!0,wr.writable=!1}return wr.writable};function Er(e){let t={},n=new URL(e);if(n.hash&&n.hash[0]===`#`)try{new URLSearchParams(n.hash.substring(1)).forEach((e,n)=>{t[n]=e})}catch{}return n.searchParams.forEach((e,n)=>{t[n]=e}),t}var Dr=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Or=e=>typeof e==`object`&&!!e&&`status`in e&&`ok`in e&&`json`in e&&typeof e.json==`function`,kr=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},w=async(e,t)=>{let n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch{return null}},Ar=async(e,t)=>{await e.removeItem(t)},jr=class e{constructor(){this.promise=new e.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}};jr.promiseConstructor=Promise;function Mr(e){let t=e.split(`.`);if(t.length!==3)throw new lr(`Invalid JWT structure`);for(let e=0;e<t.length;e++)if(!Wn.test(t[e]))throw new lr(`JWT not in base64url format`);return{header:JSON.parse(hr(t[0])),payload:JSON.parse(hr(t[1])),signature:yr(t[2]),raw:{header:t[0],payload:t[1]}}}async function Nr(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function Pr(e,t){return new Promise((n,r)=>{(async()=>{for(let i=0;i<1/0;i++)try{let r=await e(i);if(!t(i,null,r)){n(r);return}}catch(e){if(!t(i,e)){r(e);return}}})()})}function Fr(e){return(`0`+e.toString(16)).substr(-2)}function Ir(){let e=new Uint32Array(56);if(typeof crypto>`u`){let e=``;for(let t=0;t<56;t++)e+=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~`.charAt(Math.floor(Math.random()*66));return e}return crypto.getRandomValues(e),Array.from(e,Fr).join(``)}async function Lr(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest(`SHA-256`,t),r=new Uint8Array(n);return Array.from(r).map(e=>String.fromCharCode(e)).join(``)}async function Rr(e){if(typeof crypto>`u`||crypto.subtle===void 0||typeof TextEncoder>`u`)return console.warn(`WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.`),e;let t=await Lr(e);return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}var zr=/^[a-zA-Z0-9_-]{8,64}$/;function Br(e){return typeof e==`string`&&zr.test(e)?e:null}function Vr(){if(typeof crypto<`u`&&typeof crypto.getRandomValues==`function`){let e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,Fr).join(``)}let e=``;for(let t=0;t<32;t++)e+=Math.floor(Math.random()*16).toString(16);return e}var Hr=(e,t)=>`${e}-flow-${t}-code-verifier`,Ur=e=>`${e}-flows-code-verifier`;async function Wr(e,t){let n=await w(e,Ur(t));return Array.isArray(n)?n.filter(e=>Br(e)!==null):[]}async function Gr(e,t,n,r,i){await kr(e,Hr(t,n),r);let a=(await Wr(e,t)).filter(e=>e!==n);for(a.push(n);a.length>5;){let n=a.shift();await Ar(e,Hr(t,n)),i?.(n)}await kr(e,Ur(t),a),await kr(e,`${t}-code-verifier`,r)}async function Kr(e,t,n){if(n){let r=await w(e,Hr(t,n));return{verifier:typeof r==`string`?r:null,flowId:n}}let r=await w(e,`${t}-code-verifier`);return{verifier:typeof r==`string`?r:null,flowId:null}}async function qr(e,t,n){let r=`${t}-code-verifier`;if(!n){await Ar(e,r);return}let i=Hr(t,n),a=await w(e,i);await Ar(e,i);let o=await Wr(e,t),s=o.filter(e=>e!==n);s.length!==o.length&&(s.length>0?await kr(e,Ur(t),s):await Ar(e,Ur(t))),a!=null&&a===await w(e,r)&&await Ar(e,r)}async function Jr(e,t){let n=await Wr(e,t);for(let r of n)await Ar(e,Hr(t,r));await Ar(e,Ur(t)),await Ar(e,`${t}-code-verifier`)}function Yr(e,t){let n=e.indexOf(`#`),r=n===-1?e:e.slice(0,n),i=n===-1?``:e.slice(n),a=r.indexOf(`?`);if(a!==-1){let e=r.slice(0,a),t=r.slice(a+1).split(`&`).filter(e=>e!==``&&e!==`sb_flow_id`&&!e.startsWith(`sb_flow_id=`));r=t.length>0?`${e}?${t.join(`&`)}`:e}let o=r.includes(`?`)?`&`:`?`;return`${r}${o}${Gn}=${encodeURIComponent(t)}${i}`}async function Xr(e,t,n=!1,r){let i=Ir(),a=i;n&&(a+=`/recovery`);let o=Vr();await Gr(e,t,o,a,r);let s=await Rr(i);return[s,i===s?`plain`:`s256`,o]}var Zr=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Qr(e){let t=e.headers.get(Hn);if(!t||!t.match(Zr))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function $r(e){if(!e)throw Error(`Missing exp claim`);if(e<=Math.floor(Date.now()/1e3))throw Error(`JWT has expired`)}function ei(e){switch(e){case`RS256`:return{name:`RSASSA-PKCS1-v1_5`,hash:{name:`SHA-256`}};case`ES256`:return{name:`ECDSA`,namedCurve:`P-256`,hash:{name:`SHA-256`}};default:throw Error(`Invalid alg claim`)}}var ti=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function ni(e){if(!ti.test(e))throw Error(`@supabase/auth-js: Expected parameter to be UUID but is not`)}function ri(e){if(!e.recoveryCodes)throw Error("@supabase/auth-js: the MFA recovery codes API is experimental and disabled by default. Enable it by passing `auth: { experimental: { recoveryCodes: true } }` to createClient (or to the GoTrueClient constructor).")}function ii(){return new Proxy({},{get:(e,t)=>{if(t===`__isUserNotAvailableProxy`)return!0;if(typeof t==`symbol`){let e=t.toString();if(e===`Symbol(Symbol.toPrimitive)`||e===`Symbol(Symbol.toStringTag)`||e===`Symbol(util.inspect.custom)`)return}throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function ai(e,t){return new Proxy(e,{get:(e,n,r)=>{if(n===`__isInsecureUserWarningProxy`)return!0;if(typeof n==`symbol`){let t=n.toString();if(t===`Symbol(Symbol.toPrimitive)`||t===`Symbol(Symbol.toStringTag)`||t===`Symbol(util.inspect.custom)`||t===`Symbol(nodejs.util.inspect.custom)`)return Reflect.get(e,n,r)}return!t.value&&typeof n==`string`&&(console.warn(`Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.`),t.value=!0),Reflect.get(e,n,r)}})}function oi(e){return JSON.parse(JSON.stringify(e))}var si=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error}return JSON.stringify(e)},ci=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function li(e){if(!Or(e))throw new ir(si(e),0);let t;try{t=await e.json()}catch(t){throw ci.includes(e.status)?new ir(e.statusText||`HTTP ${e.status}`,e.status):new Yn(si(t),t)}if(ci.includes(e.status))throw new ir(si(t),e.status);let n,r=Qr(e);if(r&&r.getTime()>=Un[`2024-01-01`].timestamp&&typeof t==`object`&&t&&typeof t.code==`string`?n=t.code:typeof t==`object`&&t&&typeof t.error_code==`string`&&(n=t.error_code),!n){if(typeof t==`object`&&t&&typeof t.weak_password==`object`&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0))throw new cr(si(t),e.status,t.weak_password.reasons)}else if(n===`weak_password`)throw new cr(si(t),e.status,t.weak_password?.reasons||[]);else if(n===`session_not_found`)throw new S;throw new qn(si(t),e.status||500,n)}var ui=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};return e===`GET`?i:(i.headers=Object.assign({"Content-Type":`application/json;charset=UTF-8`},t?.headers),i.body=JSON.stringify(r),Object.assign(Object.assign({},i),n))};async function T(e,t,n,r){let i=Object.assign({},r?.headers);i[`X-Supabase-Api-Version`]||(i[Hn]=Un[`2024-01-01`].name),r?.jwt&&(i.Authorization=`Bearer ${r.jwt}`);let a=r?.query??{};r?.redirectTo&&(a.redirect_to=r.redirectTo);let o=await di(e,t,n+(Object.keys(a).length?`?`+new URLSearchParams(a).toString():``),{headers:i,noResolveJson:r?.noResolveJson},{},r?.body);return r?.xform?r?.xform(o):{data:Object.assign({},o),error:null}}async function di(e,t,n,r,i,a){let o=ui(t,r,i,a),s;try{s=await e(n,Object.assign({},o))}catch(e){throw new ir(si(e),0)}if(s.ok||await li(s),r?.noResolveJson)return s;try{return await s.json()}catch(e){await li(e)}}function fi(e){let t=null;vi(e)&&(t=Object.assign({},e),e.expires_at||(t.expires_at=Sr(e.expires_in)));let n=e.user??(typeof e?.id==`string`?e:null);return{data:{session:t,user:n},error:null}}function pi(e){let t=fi(e);return!t.error&&e.weak_password&&typeof e.weak_password==`object`&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message==`string`&&e.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0)&&(t.data.weak_password=e.weak_password),t}function mi(e){return{data:{user:e.user??e},error:null}}function hi(e){return{data:e,error:null}}function gi(e){let{action_link:t,email_otp:r,hashed_token:i,redirect_to:a,verification_type:o}=e,s=n(e,[`action_link`,`email_otp`,`hashed_token`,`redirect_to`,`verification_type`]);return{data:{properties:{action_link:t,email_otp:r,hashed_token:i,redirect_to:a,verification_type:o},user:Object.assign({},s)},error:null}}function _i(e){return e}function vi(e){return!!e.access_token&&!!e.refresh_token&&!!e.expires_in}var yi=[`global`,`local`,`others`],bi=class{constructor({url:e=``,headers:t={},fetch:n,experimental:r}){this.url=e,this.headers=t,this.fetch=Dr(n),this.experimental=r??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,t=yi[0]){if(yi.indexOf(t)<0)throw Error(`@supabase/auth-js: Parameter scope must be one of ${yi.join(`, `)}`);try{return await T(this.fetch,`POST`,`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(e){if(x(e))return{data:null,error:e};throw e}}async inviteUserByEmail(e,t={}){try{return await T(this.fetch,`POST`,`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:mi})}catch(e){if(x(e))return{data:{user:null},error:e};throw e}}async generateLink(e){try{let{options:t}=e,r=n(e,[`options`]),i=Object.assign(Object.assign({},r),t);return`newEmail`in r&&(i.new_email=r?.newEmail,delete i.newEmail),await T(this.fetch,`POST`,`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:gi,redirectTo:t?.redirectTo})}catch(e){if(x(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(e){try{return await T(this.fetch,`POST`,`${this.url}/admin/users`,{body:e,headers:this.headers,xform:mi})}catch(e){if(x(e))return{data:{user:null},error:e};throw e}}async listUsers(e){try{let t={nextPage:null,lastPage:0,total:0},n=await T(this.fetch,`GET`,`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:_i});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(x(e))return{data:{users:[]},error:e};throw e}}async getUserById(e){ni(e);try{return await T(this.fetch,`GET`,`${this.url}/admin/users/${e}`,{headers:this.headers,xform:mi})}catch(e){if(x(e))return{data:{user:null},error:e};throw e}}async updateUserById(e,t){ni(e);try{return await T(this.fetch,`PUT`,`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:mi})}catch(e){if(x(e))return{data:{user:null},error:e};throw e}}async deleteUser(e,t=!1){ni(e);try{return await T(this.fetch,`DELETE`,`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:mi})}catch(e){if(x(e))return{data:{user:null},error:e};throw e}}async _listFactors(e){ni(e.userId);try{let{data:t,error:n}=await T(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:n}}catch(e){if(x(e))return{data:null,error:e};throw e}}async _deleteFactor(e){ni(e.userId),ni(e.id);try{return{data:await T(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(e){if(x(e))return{data:null,error:e};throw e}}async _listOAuthClients(e){try{let t={nextPage:null,lastPage:0,total:0},n=await T(this.fetch,`GET`,`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:_i});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(x(e))return{data:{clients:[]},error:e};throw e}}async _createOAuthClient(e){try{return await T(this.fetch,`POST`,`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(x(e))return{data:null,error:e};throw e}}async _getOAuthClient(e){try{return await T(this.fetch,`GET`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(x(e))return{data:null,error:e};throw e}}async _updateOAuthClient(e,t){try{return await T(this.fetch,`PUT`,`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(x(e))return{data:null,error:e};throw e}}async _deleteOAuthClient(e){try{return await T(this.fetch,`DELETE`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(x(e))return{data:null,error:e};throw e}}async _regenerateOAuthClientSecret(e){try{return await T(this.fetch,`POST`,`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(x(e))return{data:null,error:e};throw e}}async _listCustomProviders(e){try{let t={};return e?.type&&(t.type=e.type),await T(this.fetch,`GET`,`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:e=>({data:{providers:e?.providers??[]},error:null})})}catch(e){if(x(e))return{data:{providers:[]},error:e};throw e}}async _createCustomProvider(e){try{return await T(this.fetch,`POST`,`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(x(e))return{data:null,error:e};throw e}}async _getCustomProvider(e){try{return await T(this.fetch,`GET`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(x(e))return{data:null,error:e};throw e}}async _updateCustomProvider(e,t){try{return await T(this.fetch,`PUT`,`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(x(e))return{data:null,error:e};throw e}}async _deleteCustomProvider(e){try{return await T(this.fetch,`DELETE`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(x(e))return{data:null,error:e};throw e}}async _adminListPasskeys(e){ni(e.userId);try{return await T(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(x(e))return{data:null,error:e};throw e}}async _adminDeletePasskey(e){ni(e.userId),ni(e.passkeyId);try{return await T(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(x(e))return{data:null,error:e};throw e}}};function xi(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}globalThis&&Tr()&&globalThis.localStorage&&globalThis.localStorage.getItem(`supabase.gotrue-js.locks.debug`);var Si=class extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}};function Ci(){if(typeof globalThis!=`object`)try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<`u`&&(self.globalThis=self)}}function wi(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function Ti(e){return parseInt(e,16)}function Ei(e){let t=new TextEncoder().encode(e);return`0x`+Array.from(t,e=>e.toString(16).padStart(2,`0`)).join(``)}function Di(e){let{chainId:t,domain:n,expirationTime:r,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:s,resources:c,scheme:l,uri:u,version:d}=e;if(!Number.isInteger(t))throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!n)throw Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);if(a&&a.length<8)throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);if(d!==`1`)throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(e.statement?.includes(`
`))throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`);let f=wi(e.address),p=`${l?`${l}://${n}`:n} wants you to sign in with your Ethereum account:\n${f}\n\n${e.statement?`${e.statement}\n`:``}`,m=`URI: ${u}\nVersion: ${d}\nChain ID: ${t}${a?`\nNonce: ${a}`:``}\nIssued At: ${i.toISOString()}`;if(r&&(m+=`\nExpiration Time: ${r.toISOString()}`),o&&(m+=`\nNot Before: ${o.toISOString()}`),s&&(m+=`\nRequest ID: ${s}`),c){let e=`
Resources:`;for(let t of c){if(!t||typeof t!=`string`)throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t}`);e+=`\n- ${t}`}m+=e}return`${p}\n${m}`}var E=class extends Error{constructor({message:e,code:t,cause:n,name:r}){super(e,{cause:n}),this.__isWebAuthnError=!0,this.name=r??(n instanceof Error?n.name:void 0)??`Unknown Error`,this.code=t}toJSON(){return{name:this.name,message:this.message,code:this.code}}},Oi=class extends E{constructor(e,t){super({code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:t,message:e}),this.name=`WebAuthnUnknownError`,this.originalError=t}};function ki({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new E({message:`Registration ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`ConstraintError`){if(n.authenticatorSelection?.requireResidentKey===!0)return new E({message:`Discoverable credentials were required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT`,cause:e});if(t.mediation===`conditional`&&n.authenticatorSelection?.userVerification===`required`)return new E({message:`User verification was required during automatic registration but it could not be performed`,code:`ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE`,cause:e});if(n.authenticatorSelection?.userVerification===`required`)return new E({message:`User verification was required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT`,cause:e})}else if(e.name===`InvalidStateError`)return new E({message:`The authenticator was previously registered`,code:`ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED`,cause:e});else if(e.name===`NotAllowedError`)return new E({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`NotSupportedError`)return n.pubKeyCredParams.filter(e=>e.type===`public-key`).length===0?new E({message:`No entry in pubKeyCredParams was of type "public-key"`,code:`ERROR_MALFORMED_PUBKEYCREDPARAMS`,cause:e}):new E({message:`No available authenticator supported any of the specified pubKeyCredParams algorithms`,code:`ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(!Ii(t))return new E({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e});if(n.rp.id!==t)return new E({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else if(e.name===`TypeError`){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new E({message:`User ID was not between 1 and 64 characters`,code:`ERROR_INVALID_USER_ID_LENGTH`,cause:e})}else if(e.name===`UnknownError`)return new E({message:`The authenticator was unable to process the specified options, or could not create a new credential`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new E({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}function Ai({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new E({message:`Authentication ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`NotAllowedError`)return new E({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(!Ii(t))return new E({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e});if(n.rpId!==t)return new E({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else if(e.name===`UnknownError`)return new E({message:`The authenticator was unable to process the specified options, or could not create a new assertion signature`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new E({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}var ji=new class{createNewAbortSignal(){if(this.controller){let e=Error(`Cancelling existing WebAuthn API call for new one`);e.name=`AbortError`,this.controller.abort(e)}let e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){let e=Error(`Manually cancelling existing WebAuthn API call`);e.name=`AbortError`,this.controller.abort(e),this.controller=void 0}}};function Mi(e){if(!e)throw Error(`Credential creation options are required`);if(typeof PublicKeyCredential<`u`&&`parseCreationOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON==`function`)return PublicKeyCredential.parseCreationOptionsFromJSON(e);let{challenge:t,user:r,excludeCredentials:i}=e,a=n(e,[`challenge`,`user`,`excludeCredentials`]),o=yr(t).buffer,s=Object.assign(Object.assign({},r),{id:yr(r.id).buffer}),c=Object.assign(Object.assign({},a),{challenge:o,user:s});if(i&&i.length>0){c.excludeCredentials=Array(i.length);for(let e=0;e<i.length;e++){let t=i[e];c.excludeCredentials[e]=Object.assign(Object.assign({},t),{id:yr(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return c}function Ni(e){if(!e)throw Error(`Credential request options are required`);if(typeof PublicKeyCredential<`u`&&`parseRequestOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON==`function`)return PublicKeyCredential.parseRequestOptionsFromJSON(e);let{challenge:t,allowCredentials:r}=e,i=n(e,[`challenge`,`allowCredentials`]),a=yr(t).buffer,o=Object.assign(Object.assign({},i),{challenge:a});if(r&&r.length>0){o.allowCredentials=Array(r.length);for(let e=0;e<r.length;e++){let t=r[e];o.allowCredentials[e]=Object.assign(Object.assign({},t),{id:yr(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return o}function Pi(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e;return{id:e.id,rawId:e.id,response:{attestationObject:xr(new Uint8Array(e.response.attestationObject)),clientDataJSON:xr(new Uint8Array(e.response.clientDataJSON))},type:`public-key`,clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:t.authenticatorAttachment??void 0}}function Fi(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e,n=e.getClientExtensionResults(),r=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:xr(new Uint8Array(r.authenticatorData)),clientDataJSON:xr(new Uint8Array(r.clientDataJSON)),signature:xr(new Uint8Array(r.signature)),userHandle:r.userHandle?xr(new Uint8Array(r.userHandle)):void 0},type:`public-key`,clientExtensionResults:n,authenticatorAttachment:t.authenticatorAttachment??void 0}}function Ii(e){return e===`localhost`||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function Li(){return!!(C()&&`PublicKeyCredential`in window&&window.PublicKeyCredential&&`credentials`in navigator&&typeof(navigator==null?void 0:navigator.credentials)?.create==`function`&&typeof(navigator==null?void 0:navigator.credentials)?.get==`function`)}async function Ri(e){try{let t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Oi(`Browser returned unexpected credential type`,t)}:{data:null,error:new Oi(`Empty credential response`,t)}}catch(t){return{data:null,error:ki({error:t,options:e})}}}async function zi(e){try{let t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Oi(`Browser returned unexpected credential type`,t)}:{data:null,error:new Oi(`Empty credential response`,t)}}catch(t){return{data:null,error:Ai({error:t,options:e})}}}var Bi={hints:[`security-key`],authenticatorSelection:{authenticatorAttachment:`cross-platform`,requireResidentKey:!1,userVerification:`preferred`,residentKey:`discouraged`},attestation:`direct`},Vi={userVerification:`preferred`,hints:[`security-key`],attestation:`direct`};function Hi(...e){let t=e=>typeof e==`object`&&!!e&&!Array.isArray(e),n=e=>e instanceof ArrayBuffer||ArrayBuffer.isView(e),r={};for(let i of e)if(i)for(let e in i){let a=i[e];if(a!==void 0){if(Array.isArray(a))r[e]=a;else if(n(a))r[e]=a;else if(t(a)){let n=r[e];r[e]=t(n)?Hi(n,a):Hi(a)}else r[e]=a}}return r}function Ui(e,t){return Hi(Bi,e,t||{})}function Wi(e,t){return Hi(Vi,e,t||{})}var Gi=class{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:`webauthn`}))}async _challenge({factorId:e,webauthn:t,friendlyName:n,signal:r},i){try{let{data:a,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:o};let s=r??ji.createNewAbortSignal();if(a.webauthn.type===`create`){let{user:e}=a.webauthn.credential_options.publicKey;if(!e.name){let t=n;if(t)e.name=`${e.id}:${t}`;else{let t=(await this.client.getUser()).data.user,n=t?.user_metadata?.name||t?.email||t?.id||`User`;e.name=`${e.id}:${n}`}}e.displayName||=e.name}switch(a.webauthn.type){case`create`:{let{data:t,error:n}=await Ri({publicKey:Ui(a.webauthn.credential_options.publicKey,i?.create),signal:s});return t?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:t}},error:null}:{data:null,error:n}}case`request`:{let t=Wi(a.webauthn.credential_options.publicKey,i?.request),{data:n,error:r}=await zi(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:t,signal:s}));return n?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:n}},error:null}:{data:null,error:r}}}}catch(e){return x(e)?{data:null,error:e}:{data:null,error:new Yn(`Unexpected error in challenge`,e)}}}async _verify({challengeId:e,factorId:t,webauthn:n}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:n})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new Kn(`rpId is required for WebAuthn authentication`)};try{if(!Li())return{data:null,error:new Yn(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:n},signal:r},{request:i});if(!a)return{data:null,error:o};let{webauthn:s}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:s.type,rpId:t,rpOrigins:n,credential_response:s.credential_response}})}catch(e){return x(e)?{data:null,error:e}:{data:null,error:new Yn(`Unexpected error in authenticate`,e)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new Kn(`rpId is required for WebAuthn registration`)};try{if(!Li())return{data:null,error:new Yn(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(t=>t.data?.all.find(t=>t.factor_type===`webauthn`&&t.friendly_name===e&&t.status===`unverified`)).then(e=>e?this.client.mfa.unenroll({factorId:e?.id}):void 0),{data:null,error:o};let{data:s,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:n},signal:r},{create:i});return s?this._verify({factorId:a.id,challengeId:s.challengeId,webauthn:{rpId:t,rpOrigins:n,type:s.webauthn.type,credential_response:s.webauthn.credential_response}}):{data:null,error:c}}catch(e){return x(e)?{data:null,error:e}:{data:null,error:new Yn(`Unexpected error in register`,e)}}}};Ci();var Ki={url:zn,storageKey:Bn,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Vn,flowType:`implicit`,debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},qi={},Ji=!1,Yi=class e{get jwks(){return qi[this.storageKey]?.jwks??{keys:[]}}set jwks(e){qi[this.storageKey]=Object.assign(Object.assign({},qi[this.storageKey]),{jwks:e})}get jwks_cached_at(){return qi[this.storageKey]?.cachedAt??-(2**53-1)}set jwks_cached_at(e){qi[this.storageKey]=Object.assign(Object.assign({},qi[this.storageKey]),{cachedAt:e})}constructor(t){var n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;let r=Object.assign(Object.assign({},Ki),t);if(this.storageKey=r.storageKey,this.instanceID=e.nextInstanceID[this.storageKey]??0,e.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!r.debug,typeof r.debug==`function`&&(this.logger=r.debug),this.instanceID>0&&C()){let e=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(e),this.logDebugMessages&&console.trace(e)}if(this.persistSession=r.persistSession,this.autoRefreshToken=r.autoRefreshToken,this.experimental=r.experimental??{},this.admin=new bi({url:r.url,headers:r.headers,fetch:r.fetch,experimental:this.experimental}),this.url=r.url,this.headers=r.headers,this.fetch=Dr(r.fetch),this.detectSessionInUrl=r.detectSessionInUrl,this.flowType=r.flowType,this.hasCustomAuthorizationHeader=r.hasCustomAuthorizationHeader,this.throwOnError=r.throwOnError,this.lockAcquireTimeout=r.lockAcquireTimeout,r.lock!=null&&(this.lock=r.lock,Ji||(Ji=!0,console.warn(`${this._logPrefix()} The "lock" option is deprecated and will be removed in v3. The client now coordinates session refreshes without a lock, so most apps can drop the option. See https://github.com/supabase/supabase-js/blob/master/packages/core/auth-js/migrations/lockless-coordination.md`))),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=-(2**53-1)),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Gi(this),recoveryCodes:{getStatus:this._getRecoveryCodesStatus.bind(this),generate:this._generateRecoveryCodes.bind(this),verify:this._verifyRecoveryCode.bind(this),regenerate:this._regenerateRecoveryCodes.bind(this),unenroll:this._unenrollRecoveryCodes.bind(this)}},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(r.storage?this.storage=r.storage:Tr()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=xi(this.memoryStorage)),r.userStorage&&(this.userStorage=r.userStorage)):(this.memoryStorage={},this.storage=xi(this.memoryStorage)),C()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(e){console.error(`Failed to create a new BroadcastChannel, multi-tab state changes will not be available`,e)}(n=this.broadcastChannel)==null||n.addEventListener(`message`,async e=>{this._debug(`received broadcast notification from other tab or client`,e),(e.data.event===`TOKEN_REFRESHED`||e.data.event===`SIGNED_IN`)&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(e.data.event,e.data.session,!1)}catch(e){this._debug(`#broadcastChannel`,`error`,e)}})}r.skipAutoInitialize||this.initialize().catch(e=>{this._debug(`#initialize()`,`error`,e)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Fn}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock==null?await this._initialize():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))();let e=await this.initializePromise,t=this._pendingInitNotifications??[];this._pendingInitNotifications=null;for(let e of t)await this._notifyAllSubscribers(e.event,e.session,e.broadcast);return e}async _initialize(){try{let e={},t=`none`;if(C()&&(e=Er(window.location.href),this._isImplicitGrantCallback(e)?t=`implicit`:await this._isPKCECallback(e)&&(t=`pkce`)),C()&&this.detectSessionInUrl&&t!==`none`){let{data:n,error:r}=await this._getSessionFromURL(e,t);if(r){if(this._debug(`#_initialize()`,`error detecting session from URL`,r),tr(r)){let e=r.details?.code;if(e===`identity_already_exists`||e===`identity_not_found`||e===`single_identity_not_deletable`)return{error:r}}return{error:r}}let{session:i,redirectType:a}=n;return this._debug(`#_initialize()`,`detected session in URL`,i,`redirect type`,a),await this._saveSession(i),setTimeout(async()=>{a===`recovery`?await this._notifyAllSubscribers(`PASSWORD_RECOVERY`,i):await this._notifyAllSubscribers(`SIGNED_IN`,i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return x(e)?this._returnResult({error:e}):this._returnResult({error:new Yn(`Unexpected error during initialization`,e)})}finally{await this._handleVisibilityChange(),this._debug(`#_initialize()`,`end`)}}async signInAnonymously(e){try{let{data:t,error:n}=await T(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{data:e?.options?.data??{},gotrue_meta_security:{captcha_token:e?.options?.captchaToken}},xform:fi});if(n||!t)return this._returnResult({data:{user:null,session:null},error:n});let r=t.session,i=t.user;return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,r)),this._returnResult({data:{user:i,session:r},error:null})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signUp(e){let t=null;try{let n;if(`email`in e){let{email:r,password:i,options:a}=e,o=null,s=null;this.flowType===`pkce`&&([o,s,t]=await this._getCodeChallengeAndMethod()),n=await T(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,t),body:{email:r,password:i,data:a?.data??{},gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:s},xform:fi})}else if(`phone`in e){let{phone:t,password:r,options:i}=e;n=await T(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{phone:t,password:r,data:i?.data??{},channel:i?.channel??`sms`,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:fi})}else throw new $n(`You must provide either an email or phone number and a password`);let{data:r,error:i}=n;if(i||!r)return await qr(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:i});let a=r.session,o=r.user;return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(await qr(this.storage,this.storageKey,t),x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithPassword(e){try{let t;if(`email`in e){let{email:n,password:r,options:i}=e;t=await T(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:pi})}else if(`phone`in e){let{phone:n,password:r,options:i}=e;t=await T(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:pi})}else throw new $n(`You must provide either an email or phone number and a password`);let{data:n,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!n||!n.session||!n.user){let e=new Qn;return this._returnResult({data:{user:null,session:null},error:e})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(`SIGNED_IN`,n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:r})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOAuth(e){return await this._handleProviderSignIn(e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:e.options?.skipBrowserRedirect})}async exchangeCodeForSession(e,t){return await this.initializePromise,this.lock==null?this._exchangeCodeForSession(e,t):this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,t))}async signInWithWeb3(e){let{chain:t}=e;switch(t){case`ethereum`:return await this.signInWithEthereum(e);case`solana`:return await this.signInWithSolana(e);default:throw Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(!C()){if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}else if(typeof i==`object`)s=i;else{let e=window;if(`ethereum`in e&&typeof e.ethereum==`object`&&`request`in e.ethereum&&typeof e.ethereum.request==`function`)s=e.ethereum;else throw Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`)}let c=new URL(o?.url??window.location.href),l=await s.request({method:`eth_requestAccounts`}).then(e=>e).catch(()=>{throw Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`)});if(!l||l.length===0)throw Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);let u=wi(l[0]),d=o?.signInWithEthereum?.chainId;d||=Ti(await s.request({method:`eth_chainId`})),t=Di({domain:c.host,address:u,statement:a,uri:c.href,version:`1`,chainId:d,nonce:o?.signInWithEthereum?.nonce,issuedAt:o?.signInWithEthereum?.issuedAt??new Date,expirationTime:o?.signInWithEthereum?.expirationTime,notBefore:o?.signInWithEthereum?.notBefore,requestId:o?.signInWithEthereum?.requestId,resources:o?.signInWithEthereum?.resources}),n=await s.request({method:`personal_sign`,params:[Ei(t),u]})}try{let{data:r,error:i}=await T(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`ethereum`,message:t,signature:n},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:fi});if(i)throw i;if(!r||!r.session||!r.user){let e=new Qn;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSolana(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(!C()){if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}else if(typeof i==`object`)s=i;else{let e=window;if(`solana`in e&&typeof e.solana==`object`&&(`signIn`in e.solana&&typeof e.solana.signIn==`function`||`signMessage`in e.solana&&typeof e.solana.signMessage==`function`))s=e.solana;else throw Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`)}let c=new URL(o?.url??window.location.href);if(`signIn`in s&&s.signIn){let e=await s.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},o?.signInWithSolana),{version:`1`,domain:c.host,uri:c.href}),a?{statement:a}:null)),r;if(Array.isArray(e)&&e[0]&&typeof e[0]==`object`)r=e[0];else if(e&&typeof e==`object`&&`signedMessage`in e&&`signature`in e)r=e;else throw Error(`@supabase/auth-js: Wallet method signIn() returned unrecognized value`);if(`signedMessage`in r&&`signature`in r&&(typeof r.signedMessage==`string`||r.signedMessage instanceof Uint8Array)&&r.signature instanceof Uint8Array)t=typeof r.signedMessage==`string`?r.signedMessage:new TextDecoder().decode(r.signedMessage),n=r.signature;else throw Error(`@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields`)}else{if(!(`signMessage`in s)||typeof s.signMessage!=`function`||!(`publicKey`in s)||typeof s!=`object`||!s.publicKey||!(`toBase58`in s.publicKey)||typeof s.publicKey.toBase58!=`function`)throw Error(`@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API`);t=[`${c.host} wants you to sign in with your Solana account:`,s.publicKey.toBase58(),...a?[``,a,``]:[``],`Version: 1`,`URI: ${c.href}`,`Issued At: ${o?.signInWithSolana?.issuedAt??new Date().toISOString()}`,...o?.signInWithSolana?.notBefore?[`Not Before: ${o.signInWithSolana.notBefore}`]:[],...o?.signInWithSolana?.expirationTime?[`Expiration Time: ${o.signInWithSolana.expirationTime}`]:[],...o?.signInWithSolana?.chainId?[`Chain ID: ${o.signInWithSolana.chainId}`]:[],...o?.signInWithSolana?.nonce?[`Nonce: ${o.signInWithSolana.nonce}`]:[],...o?.signInWithSolana?.requestId?[`Request ID: ${o.signInWithSolana.requestId}`]:[],...o?.signInWithSolana?.resources?.length?[`Resources`,...o.signInWithSolana.resources.map(e=>`- ${e}`)]:[]].join(`
`);let e=await s.signMessage(new TextEncoder().encode(t),`utf8`);if(!e||!(e instanceof Uint8Array))throw Error(`@supabase/auth-js: Wallet signMessage() API returned an recognized value`);n=e}}try{let{data:r,error:i}=await T(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`solana`,message:t,signature:xr(n)},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:fi});if(i)throw i;if(!r||!r.session||!r.user){let e=new Qn;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _exchangeCodeForSession(e,t){let n=t?.flowId!=null,r=n?Br(t?.flowId):C()?Br(Er(window.location.href)[Gn]):null;n&&!r&&this._debug(`#_exchangeCodeForSession()`,`provided flowId is not a valid flow id`,t?.flowId);let{verifier:i,flowId:a}=n&&!r?{verifier:null,flowId:null}:await Kr(this.storage,this.storageKey,r),[o,s]=(i??``).split(`/`);try{if(!o&&this.flowType===`pkce`)throw new rr;let{data:t,error:n}=await T(this.fetch,`POST`,`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:fi});if(await qr(this.storage,this.storageKey,a),n)throw n;if(!t||!t.session||!t.user){let e=new Qn;return this._returnResult({data:{user:null,session:null,redirectType:null},error:e})}return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(s===`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,t.session)),this._returnResult({data:Object.assign(Object.assign({},t),{redirectType:s??null}),error:n})}catch(e){if(await qr(this.storage,this.storageKey,a),x(e))return this._returnResult({data:{user:null,session:null,redirectType:null},error:e});throw e}}async signInWithIdToken(e){try{let{options:t,provider:n,token:r,access_token:i,nonce:a}=e,{data:o,error:s}=await T(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:r,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:fi});if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!o||!o.session||!o.user){let e=new Qn;return this._returnResult({data:{user:null,session:null},error:e})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers(`SIGNED_IN`,o.session)),this._returnResult({data:o,error:s})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOtp(e){let t=null;try{if(`email`in e){let{email:n,options:r}=e,i=null,a=null;this.flowType===`pkce`&&([i,a,t]=await this._getCodeChallengeAndMethod());let{error:o}=await T(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{email:n,data:r?.data??{},create_user:r?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:r?.captchaToken},code_challenge:i,code_challenge_method:a},redirectTo:this._maybeAppendFlowIdToRedirect(r?.emailRedirectTo,t)});return this._returnResult({data:{user:null,session:null},error:o})}if(`phone`in e){let{phone:t,options:n}=e,{data:r,error:i}=await T(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:n?.data??{},create_user:n?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:n?.captchaToken},channel:n?.channel??`sms`}});return this._returnResult({data:{user:null,session:null,messageId:r?.message_id},error:i})}throw new $n(`You must provide either an email or phone number.`)}catch(e){if(await qr(this.storage,this.storageKey,t),x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async verifyOtp(e){try{let t,n;`options`in e&&(t=e.options?.redirectTo,n=e.options?.captchaToken);let{data:r,error:i}=await T(this.fetch,`POST`,`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:t,xform:fi});if(i)throw i;if(!r)throw Error(`An error occurred on token verification.`);let a=r.session,o=r.user;return a?.access_token&&(await this._saveSession(a),await this._notifyAllSubscribers(e.type==`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSSO(e){let t=null;try{let n=null,r=null;this.flowType===`pkce`&&([n,r,t]=await this._getCodeChallengeAndMethod());let i=await T(this.fetch,`POST`,`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},`providerId`in e?{provider_id:e.providerId}:null),`domain`in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect(e.options?.redirectTo,t)}),e?.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:n,code_challenge_method:r}),headers:this.headers,xform:hi});return i.data?.url&&C()&&!e.options?.skipBrowserRedirect&&window.location.assign(i.data.url),this._returnResult(i)}catch(e){if(await qr(this.storage,this.storageKey,t),x(e))return this._returnResult({data:null,error:e});throw e}}async reauthenticate(){return await this.initializePromise,this.lock==null?await this._reauthenticate():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new S;let{error:r}=await T(this.fetch,`GET`,`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let t=null;try{let n=`${this.url}/resend`;if(`email`in e){let{email:r,type:i,options:a}=e,o=null,s=null;this.flowType===`pkce`&&([o,s,t]=await this._getCodeChallengeAndMethod());let{error:c}=await T(this.fetch,`POST`,n,{headers:this.headers,body:{email:r,type:i,gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:s},redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,t)});return c&&await qr(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:c})}if(`phone`in e){let{phone:t,type:r,options:i}=e,{data:a,error:o}=await T(this.fetch,`POST`,n,{headers:this.headers,body:{phone:t,type:r,gotrue_meta_security:{captcha_token:i?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a?.message_id},error:o})}throw new $n(`You must provide either an email or phone number and a type`)}catch(e){if(await qr(this.storage,this.storageKey,t),x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async getSession(){return await this.initializePromise,this.lock==null?await this._useSession(async e=>e):await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e))}async _acquireLock(e,t){this._debug(`#_acquireLock`,`begin`,e);try{if(this.lockAcquired){let e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug(`#_acquireLock`,`lock acquired for storage key`,this.storageKey);try{this.lockAcquired=!0;let e=t();for(this.pendingInLock.push((async()=>{try{await e}catch{}})()),await e;this.pendingInLock.length;){let e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug(`#_acquireLock`,`lock released for storage key`,this.storageKey),this.lockAcquired=!1}})}finally{this._debug(`#_acquireLock`,`end`)}}async _useSession(e){this._debug(`#_useSession`,`begin`);try{return await e(await this.__loadSession())}finally{this._debug(`#_useSession`,`end`)}}async __loadSession(){this._debug(`#__loadSession()`,`begin`),this.lock!=null&&!this.lockAcquired&&this._debug(`#__loadSession()`,`used outside of an acquired lock!`,Error().stack);try{let e=null,t=await w(this.storage,this.storageKey);if(this._debug(`#getSession()`,`session from storage`,t),t!==null&&(this._isValidSession(t)?e=t:(this._debug(`#getSession()`,`session from storage is not valid`),await this._removeSession())),!e)return{data:{session:null},error:null};let n=e.expires_at?e.expires_at*1e3-Date.now()<Ln:!1;if(this._debug(`#__loadSession()`,`session has${n?``:` not`} expired`,`expires_at`,e.expires_at),!n)return{data:{session:await this._hydrateSessionUser(e)},error:null};let{data:r,error:i}=await this._callRefreshToken(e.refresh_token);if(i){let e=await w(this.storage,this.storageKey);return e&&this._isValidSession(e)&&e.expires_at&&e.expires_at*1e3>Date.now()?this._returnResult({data:{session:await this._hydrateSessionUser(e)},error:null}):this._returnResult({data:{session:null},error:i})}return this._returnResult({data:{session:r},error:null})}finally{this._debug(`#__loadSession()`,`end`)}}async _hydrateSessionUser(e){if(this.userStorage){let t=await w(this.userStorage,this.storageKey+`-user`);e.user=t?.user?t.user:ii()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){let t={value:this.suppressGetSessionWarning};e.user=ai(e.user,t),t.value&&(this.suppressGetSessionWarning=!0)}return e}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t;return t=this.lock==null?await this._getUser():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()),t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await T(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:e,xform:mi}):await this._useSession(async e=>{let{data:t,error:n}=e;if(n)throw n;return!t.session?.access_token&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new S}:await T(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:t.session?.access_token??void 0,xform:mi})})}catch(e){if(x(e))return Zn(e)&&await this._removeSession(),this._returnResult({data:{user:null},error:e});throw e}}async updateUser(e,t={}){return await this.initializePromise,this.lock==null?await this._updateUser(e,t):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){let n=null;try{return await this._useSession(async r=>{let{data:i,error:a}=r;if(a)throw a;if(!i.session)throw new S;let o=i.session,s=null,c=null;this.flowType===`pkce`&&e.email!=null&&([s,c,n]=await this._getCodeChallengeAndMethod());let{data:l,error:u}=await T(this.fetch,`PUT`,`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t?.emailRedirectTo,n),body:Object.assign(Object.assign({},e),{code_challenge:s,code_challenge_method:c}),jwt:o.access_token,xform:mi});if(u)throw u;return o.user=l.user,await this._saveSession(o),await this._notifyAllSubscribers(`USER_UPDATED`,o),this._returnResult({data:{user:o.user},error:null})})}catch(e){if(await qr(this.storage,this.storageKey,n),x(e))return this._returnResult({data:{user:null},error:e});throw e}}async setSession(e){return await this.initializePromise,this.lock==null?await this._setSession(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new S;let t=Date.now()/1e3,n=t,r=!0,i=null,{payload:a}=Mr(e.access_token);if(a.exp&&(n=a.exp,r=n<=t),r){let{data:t,error:n}=await this._callRefreshToken(e.refresh_token);if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!t)return{data:{user:null,session:null},error:null};i=t}else{let{data:r,error:a}=await this._getUser(e.access_token);if(a)return this._returnResult({data:{user:null,session:null},error:a});i={access_token:e.access_token,refresh_token:e.refresh_token,user:r.user,token_type:`bearer`,expires_in:n-t,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers(`SIGNED_IN`,i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(e){if(x(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}}async refreshSession(e){return await this.initializePromise,this.lock==null?await this._refreshSession(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{if(!e){let{data:n,error:r}=t;if(r)throw r;e=n.session??void 0}if(!e?.refresh_token)throw new S;let{data:n,error:r}=await this._callRefreshToken(e.refresh_token);return r?this._returnResult({data:{user:null,session:null},error:r}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _getSessionFromURL(e,t){try{if(!C())throw new er(`No browser detected.`);if(e.error||e.error_description||e.error_code)throw new er(e.error_description||`Error in URL with unspecified error_description`,{error:e.error||`unspecified_error`,code:e.error_code||`unspecified_code`});switch(t){case`implicit`:if(this.flowType===`pkce`)throw new nr(`Not a valid PKCE flow url.`);break;case`pkce`:if(this.flowType===`implicit`)throw new er(`Not a valid implicit grant flow url.`)}if(t===`pkce`){if(this._debug(`#_initialize()`,`begin`,`is PKCE flow`,!0),!e.code)throw new nr(`No code detected.`);let{data:t,error:n}=await this._exchangeCodeForSession(e.code,{flowId:e[Gn]});if(n)throw n;let r=new URL(window.location.href);return r.searchParams.delete(`code`),r.searchParams.delete(Gn),window.history.replaceState(window.history.state,``,r.toString()),{data:{session:t.session,redirectType:t.redirectType??null},error:null}}let{provider_token:n,provider_refresh_token:r,access_token:i,refresh_token:a,expires_in:o,expires_at:s,token_type:c}=e;if(!i||!o||!a||!c)throw new er(`No session defined in URL`);let l=Math.round(Date.now()/1e3),u=parseInt(o),d=l+u;s&&(d=parseInt(s));let f=d-l;f*1e3<=3e4&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${u}s`);let p=d-u;l-p>=120?console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale`,p,d,l):l-p<0&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew`,p,d,l);let{data:m,error:h}=await this._getUser(i);if(h)throw h;let g={provider_token:n,provider_refresh_token:r,access_token:i,expires_in:u,expires_at:d,refresh_token:a,token_type:c,user:m.user};return window.location.hash=``,this._debug(`#_getSessionFromURL()`,`clearing window.location.hash`),this._returnResult({data:{session:g,redirectType:e.type},error:null})}catch(e){if(x(e))return this._returnResult({data:{session:null,redirectType:null},error:e});throw e}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl==`function`?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;let t=Br(e[Gn]);return t&&await w(this.storage,Hr(this.storageKey,t))?!0:!!await w(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:`global`}){return await this.initializePromise,this.lock==null?await this._signOut(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:`global`}){return await this._useSession(async t=>{let n=async()=>{await this._removeSession()},{data:r,error:i}=t;if(i&&!Zn(i))return this._returnResult({error:i});let a=r.session?.access_token;if(a){let{error:t}=await this.admin.signOut(a,e);if(t&&!(Jn(t)&&(t.status===404||t.status===401||t.status===403)||Zn(t)))return e!==`others`&&await n(),this._returnResult({error:t})}return e!==`others`&&await n(),this._returnResult({error:null})})}onAuthStateChange(e){let t=Cr(),n={id:t,callback:e,unsubscribe:()=>{this._debug(`#unsubscribe()`,`state change callback with id removed`,t),this.stateChangeEmitters.delete(t)}};return this._debug(`#onAuthStateChange()`,`registered callback with id`,t),this.stateChangeEmitters.set(t,n),(async()=>{await this.initializePromise,this.lock==null?await this._emitInitialSession(t):await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})})(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{try{let{data:{session:n},error:r}=t;if(r)throw r;await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,n),this._debug(`INITIAL_SESSION`,`callback id`,e,`session`,n)}catch(t){if(await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,null),this._debug(`INITIAL_SESSION`,`callback id`,e,`error`,t),sr(t))return;Zn(t)||ar(t)||Jn(t)&&(t.code===`refresh_token_not_found`||t.code===`refresh_token_already_used`||t.code===`session_expired`)?console.warn(t):console.error(t)}})}async resetPasswordForEmail(e,t={}){let n=null,r=null,i=null;this.flowType===`pkce`&&([n,r,i]=await this._getCodeChallengeAndMethod(!0));try{return await T(this.fetch,`POST`,`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t.redirectTo,i)})}catch(e){if(await qr(this.storage,this.storageKey,i),x(e))return this._returnResult({data:null,error:e});throw e}}async getUserIdentities(){try{let{data:e,error:t}=await this.getUser();if(t)throw t;return this._returnResult({data:{identities:e.user.identities??[]},error:null})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async linkIdentity(e){return`token`in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){let t=null;try{let{data:n,error:r}=await this._useSession(async n=>{let{data:r,error:i}=n;if(i)throw i;let{url:a,flowId:o}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:!0});return t=o,await T(this.fetch,`GET`,a,{headers:this.headers,jwt:r.session?.access_token??void 0})});if(r)throw r;return C()&&!e.options?.skipBrowserRedirect&&window.location.assign(n?.url),this._returnResult({data:{provider:e.provider,url:n?.url,flowId:t},error:null})}catch(n){if(x(n))return this._returnResult({data:{provider:e.provider,url:null,flowId:t},error:n});throw n}}async linkIdentityIdToken(e){return await this._useSession(async t=>{try{let{error:n,data:{session:r}}=t;if(n)throw n;let{options:i,provider:a,token:o,access_token:s,nonce:c}=e,{data:l,error:u}=await T(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:r?.access_token??void 0,body:{provider:a,id_token:o,access_token:s,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:fi});return u?this._returnResult({data:{user:null,session:null},error:u}):!l||!l.session||!l.user?this._returnResult({data:{user:null,session:null},error:new Qn}):(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers(`USER_UPDATED`,l.session)),this._returnResult({data:l,error:u}))}catch(e){if(await qr(this.storage,this.storageKey,null),x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)throw r;return await T(this.fetch,`DELETE`,`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:n.session?.access_token??void 0})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _refreshAccessToken(e){let t=`#_refreshAccessToken()`;this._debug(t,`begin`);try{let n=Date.now();return await Pr(async n=>(n>0&&await Nr(200*2**(n-1)),this._debug(t,`refreshing attempt`,n),await T(this.fetch,`POST`,`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:fi})),(e,t)=>{let r=200*2**e;return t&&ar(t)&&Date.now()+r-n<3e4})}catch(e){if(this._debug(t,`error`,e),x(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}finally{this._debug(t,`end`)}}_isValidSession(e){return typeof e==`object`&&!!e&&`access_token`in e&&`refresh_token`in e&&`expires_at`in e}async _handleProviderSignIn(e,t){let{url:n,flowId:r}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug(`#_handleProviderSignIn()`,`provider`,e,`options`,t,`url`,n),C()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n,flowId:r},error:null}}async _recoverAndRefresh(){let e=`#_recoverAndRefresh()`;this._debug(e,`begin`);try{let t=await w(this.storage,this.storageKey);if(t&&this.userStorage){let e=await w(this.userStorage,this.storageKey+`-user`);!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!e&&(e={user:t.user},await kr(this.userStorage,this.storageKey+`-user`,e)),t.user=e?.user??ii()}else if(t&&!t.user&&!t.user){let e=await w(this.storage,this.storageKey+`-user`);e&&e?.user?(t.user=e.user,await Ar(this.storage,this.storageKey+`-user`),await kr(this.storage,this.storageKey,t)):t.user=ii()}if(this._debug(e,`session from storage`,t),!this._isValidSession(t)){this._debug(e,`session is not valid`),t!==null&&await this._removeSession();return}let n=(t.expires_at??1/0)*1e3-Date.now()<Ln;if(this._debug(e,`session has${n?``:` not`} expired with margin of ${Ln}s`),n){if(this.autoRefreshToken&&t.refresh_token){let{error:n}=await this._callRefreshToken(t.refresh_token);n&&(sr(n)?this._debug(e,`refresh discarded by commit guard`,n):this._debug(e,`refresh failed`,n))}}else if(t.user&&t.user.__isUserNotAvailableProxy===!0)try{let{data:n,error:r}=await this._getUser(t.access_token);!r&&n?.user?(t.user=n.user,await this._saveSession(t),await this._notifyAllSubscribers(`SIGNED_IN`,t)):this._debug(e,`could not get user data, skipping SIGNED_IN notification`)}catch(t){console.error(`Error getting user data:`,t),this._debug(e,`error getting user data, skipping SIGNED_IN notification`,t)}else await this._notifyAllSubscribers(`SIGNED_IN`,t)}catch(t){this._debug(e,`error`,t),ar(t)?console.warn(t):console.error(t);return}finally{this._debug(e,`end`)}}async _callRefreshToken(e){var t,n;if(!e)throw new S;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug(`#_callRefreshToken()`,`returning cached failure (cooldown active)`),this.lastRefreshFailure.result;let r=`#_callRefreshToken()`;this._debug(r,`begin`);try{this.refreshingDeferred=new jr,this.refreshingDeferred.promise.then(void 0,()=>{});let t=await w(this.storage,this.storageKey),{data:n,error:i}=await this._refreshAccessToken(e);if(i)throw i;if(!n.session)throw new S;let a=await w(this.storage,this.storageKey);if(t!==null&&(a===null||a.refresh_token!==t.refresh_token)){this._debug(r,`commit guard: storage changed since refresh started, discarding rotated tokens`,{startedWith:`present`,nowHolds:a?`replaced`:`cleared`});let e={data:null,error:new or};return this.refreshingDeferred.resolve(e),e}let o=this._sessionRemovalEpoch;if(await this._saveSession(n.session),this._sessionRemovalEpoch!==o){this._debug(r,`commit guard (post-save): _removeSession ran during _saveSession, undoing write`),await Ar(this.storage,this.storageKey),this.userStorage&&await Ar(this.userStorage,this.storageKey+`-user`);let e={data:null,error:new or};return this.refreshingDeferred.resolve(e),e}await this._notifyAllSubscribers(`TOKEN_REFRESHED`,n.session);let s={data:n.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(s),s}catch(i){if(this._debug(r,`error`,i),x(i)){let n={data:null,error:i};if(!ar(i)){let e=await w(this.storage,this.storageKey);e?.expires_at&&e.expires_at*1e3>Date.now()?this._debug(r,`proactive refresh failed, access token still valid — preserving session`):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:n,expiresAt:Date.now()+Rn},(t=this.refreshingDeferred)==null||t.resolve(n),n}throw(n=this.refreshingDeferred)==null||n.reject(i),i}finally{this.refreshingDeferred=null,this._debug(r,`end`)}}async _notifyAllSubscribers(e,t,n=!0){if(this._pendingInitNotifications!==null&&n){this._pendingInitNotifications.push({event:e,session:t,broadcast:n});return}let r=`#_notifyAllSubscribers(${e})`;this._debug(r,`begin`,t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});let r=[],i=Array.from(this.stateChangeEmitters.values()).map(async n=>{try{await n.callback(e,t)}catch(e){r.push(e)}});if(await Promise.all(i),r.length>0){for(let e=0;e<r.length;e+=1)console.error(r[e]);throw r[0]}}finally{this._debug(r,`end`)}}async _saveSession(e){this._debug(`#_saveSession()`,e),this.suppressGetSessionWarning=!0;let t=Object.assign({},e),n=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&t.user&&await kr(this.userStorage,this.storageKey+`-user`,{user:t.user});let e=Object.assign({},t);delete e.user;let r=oi(e);await kr(this.storage,this.storageKey,r)}else{let e=oi(t);await kr(this.storage,this.storageKey,e)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug(`#_removeSession()`),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await Ar(this.storage,this.storageKey),await Jr(this.storage,this.storageKey),await Ar(this.storage,this.storageKey+`-user`),this.userStorage&&await Ar(this.userStorage,this.storageKey+`-user`),await this._notifyAllSubscribers(`SIGNED_OUT`,null)}_removeVisibilityChangedCallback(){this._debug(`#_removeVisibilityChangedCallback()`);let e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&C()&&window!=null&&window.removeEventListener&&window.removeEventListener(`visibilitychange`,e)}catch(e){console.error(`removing visibilitychange callback failed`,e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug(`#_startAutoRefresh()`);let e=setInterval(()=>this._autoRefreshTokenTick(),In);this.autoRefreshTicker=e,e&&typeof e==`object`&&typeof e.unref==`function`?e.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(e);let t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t==`object`&&typeof t.unref==`function`?t.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug(`#_stopAutoRefresh()`);let e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);let t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)==null||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug(`#_autoRefreshTokenTick()`,`begin`),this.lock!=null){try{await this._acquireLock(0,async()=>{try{let e=Date.now();try{return await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/In);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${In}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}})}catch(e){if(e instanceof Si)this._debug(`auto refresh token tick lock not available`);else throw e}return}if(this.refreshingDeferred!==null){this._debug(`#_autoRefreshTokenTick()`,`refresh already in flight, skipping`);return}try{let e=Date.now();try{await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/In);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${In}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}}async _handleVisibilityChange(){if(this._debug(`#_handleVisibilityChange()`),!C()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug(`#visibilityChangedCallback`,`error`,e)}},window==null||window.addEventListener(`visibilitychange`,this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error(`_handleVisibilityChange`,e)}}async _onVisibilityChanged(e){let t=`#_onVisibilityChanged(${e})`;if(this._debug(t,`visibilityState`,document.visibilityState),document.visibilityState===`visible`){if(this.autoRefreshToken&&this._startAutoRefresh(),!e){if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!==`visible`){this._debug(t,`acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting`);return}await this._recoverAndRefresh()});else{if(document.visibilityState!==`visible`){this._debug(t,`visibilityState is no longer visible, skipping recovery`);return}await this._recoverAndRefresh()}}}else document.visibilityState===`hidden`&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){let r=n?.redirectTo,i=null,a=null,o=null;this.flowType===`pkce`&&([i,a,o]=await this._getCodeChallengeAndMethod(),r=this._maybeAppendFlowIdToRedirect(r,o));let s=[`provider=${encodeURIComponent(t)}`];if(r&&s.push(`redirect_to=${encodeURIComponent(r)}`),n?.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),i!=null&&a!=null){let e=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(a)}`});s.push(e.toString())}if(n?.queryParams){let e=new URLSearchParams(n.queryParams);s.push(e.toString())}return n?.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),{url:`${e}?${s.join(`&`)}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,t){return!e||!t||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:Yr(e,t)}async _getCodeChallengeAndMethod(e=!1){return Xr(this.storage,this.storageKey,e,e=>this._debug(`#_getCodeChallengeAndMethod()`,`evicted oldest pending PKCE verifier slot`,e))}async _unenroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;return r?this._returnResult({data:null,error:r}):await T(this.fetch,`DELETE`,`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:n?.session?.access_token})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _enroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType===`phone`?{phone:e.phone}:e.factorType===`totp`?{issuer:e.issuer}:{}),{data:a,error:o}=await T(this.fetch,`POST`,`${this.url}/factors`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(e.factorType===`totp`&&a.type===`totp`&&a?.totp?.qr_code&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),this._returnResult({data:a,error:null}))})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _verify(e){let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({challenge_id:e.challengeId},`webauthn`in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type===`create`?Pi(e.webauthn.credential_response):Fi(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:o}=await T(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,a),this._returnResult({data:a,error:o}))})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _challenge(e){let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=await T(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:n?.session?.access_token});if(i.error)return i;let{data:a}=i;if(a.type!==`webauthn`)return{data:a,error:null};switch(a.webauthn.type){case`create`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Mi(a.webauthn.credential_options.publicKey)})})}),error:null};case`request`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Ni(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _challengeAndVerify(e){let{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){let{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};let n={all:[],phone:[],totp:[],webauthn:[],recovery_code:[]};for(let t of e?.factors??[])n.all.push(t),t.status===`verified`&&t.factor_type in n&&Array.isArray(n[t.factor_type])&&n[t.factor_type].push(t);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){if(e)try{let{payload:t}=Mr(e),n=null;t.aal&&(n=t.aal);let r=n,{data:{user:i},error:a}=await this.getUser(e);if(a)return this._returnResult({data:null,error:a});((i?.factors)?.filter(e=>e.status===`verified`)??[]).length>0&&(r=`aal2`);let o=t.amr||[];return{data:{currentLevel:n,nextLevel:r,currentAuthenticationMethods:o},error:null}}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}let{data:{session:t},error:n}=await this.getSession();if(n)return this._returnResult({data:null,error:n});if(!t)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let{payload:r}=Mr(t.access_token),i=null;r.aal&&(i=r.aal);let a=i;(t.user.factors?.filter(e=>e.status===`verified`)??[]).length>0&&(a=`aal2`);let o=r.amr||[];return{data:{currentLevel:i,nextLevel:a,currentAuthenticationMethods:o},error:null}}async _getRecoveryCodesStatus(){ri(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await T(this.fetch,`GET`,`${this.url}/factors/recovery-codes`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _generateRecoveryCodes(e){ri(this.experimental);try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let{data:i,error:a}=await T(this.fetch,`POST`,`${this.url}/factors/recovery-codes`,{body:e?.friendlyName?{friendly_name:e.friendlyName}:void 0,headers:this.headers,jwt:n?.session?.access_token});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _verifyRecoveryCode(e){ri(this.experimental);let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let{data:i,error:a}=await T(this.fetch,`POST`,`${this.url}/factors/recovery-codes/verify`,{body:{code:e.code},headers:this.headers,jwt:n?.session?.access_token});if(a)return this._returnResult({data:null,error:a});let o=Object.assign({expires_at:Sr(i.expires_in)},i);return await this._saveSession(o),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,o),this._returnResult({data:i,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _regenerateRecoveryCodes(){ri(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await T(this.fetch,`POST`,`${this.url}/factors/recovery-codes/regenerate`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _unenrollRecoveryCodes(){ri(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await T(this.fetch,`DELETE`,`${this.url}/factors/recovery-codes`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?await T(this.fetch,`GET`,`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:n.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new S})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _approveAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new S});let a=await T(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`approve`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&C()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _denyAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new S});let a=await T(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`deny`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&C()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _listOAuthGrants(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;return n?this._returnResult({data:null,error:n}):t?await T(this.fetch,`GET`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new S})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?(await T(this.fetch,`DELETE`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new S})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async fetchJwk(e,t={keys:[]}){let n=t.keys.find(t=>t.kid===e);if(n)return n;let r=Date.now();if(n=this.jwks.keys.find(t=>t.kid===e),n&&this.jwks_cached_at+6e5>r)return n;let{data:i,error:a}=await T(this.fetch,`GET`,`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=r,n=i.keys.find(t=>t.kid===e),!n)?null:n}async getClaims(e,t={}){try{let n=e;if(!n){let{data:e,error:t}=await this.getSession();if(t||!e.session)return this._returnResult({data:null,error:t});n=e.session.access_token}let{header:r,payload:i,signature:a,raw:{header:o,payload:s}}=Mr(n);if(!t?.allowExpired)try{$r(i.exp)}catch(e){throw new lr(e instanceof Error?e.message:`JWT validation failed`)}let c=!r.alg||r.alg.startsWith(`HS`)||!r.kid||!(`crypto`in globalThis&&`subtle`in globalThis.crypto)?null:await this.fetchJwk(r.kid,t?.keys?{keys:t.keys}:t?.jwks);if(!c){let{error:e}=await this.getUser(n);if(e)throw e;return{data:{claims:i,header:r,signature:a},error:null}}let l=ei(r.alg),u=await crypto.subtle.importKey(`jwk`,c,l,!0,[`verify`]);if(!await crypto.subtle.verify(l,u,a,br(`${o}.${s}`)))throw new lr(`Invalid JWT signature`);return{data:{claims:i,header:r,signature:a},error:null}}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async signInWithPasskey(e){try{if(!Li())return this._returnResult({data:null,error:new Yn(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyAuthentication({options:{captchaToken:e?.options?.captchaToken}});if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await zi({publicKey:Ni(t.options),signal:e?.options?.signal??ji.createNewAbortSignal(),mediation:e?.options?.mediation});if(i||!r)return this._returnResult({data:null,error:i??new Yn(`WebAuthn ceremony failed`,null)});let a=Fi(r);return this._verifyPasskeyAuthentication({challengeId:t.challenge_id,credential:a})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async registerPasskey(e){try{if(!Li())return this._returnResult({data:null,error:new Yn(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyRegistration();if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await Ri({publicKey:Mi(t.options),signal:e?.options?.signal??ji.createNewAbortSignal()});if(i||!r)return this._returnResult({data:null,error:i??new Yn(`WebAuthn ceremony failed`,null)});let a=Pi(r);return this._verifyPasskeyRegistration({challengeId:t.challenge_id,credential:a})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyRegistration(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new S});let{data:r,error:i}=await T(this.fetch,`POST`,`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:t.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new S});let{data:i,error:a}=await T(this.fetch,`POST`,`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:n.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyAuthentication(e){try{let{data:t,error:n}=await T(this.fetch,`POST`,`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:e?.options?.captchaToken}}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:t,error:null})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyAuthentication(e){try{let{data:t,error:n}=await T(this.fetch,`POST`,`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:fi});return n?this._returnResult({data:null,error:n}):(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,t.session)),this._returnResult({data:t,error:null}))}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _listPasskeys(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new S});let{data:r,error:i}=await T(this.fetch,`GET`,`${this.url}/passkeys`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new S});let{data:i,error:a}=await T(this.fetch,`PATCH`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _deletePasskey(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new S});let{error:i}=await T(this.fetch,`DELETE`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}};Yi.nextInstanceID={};var Xi=Yi,Zi=`2.117.2`,Qi=``,$i;if(typeof Deno<`u`)Qi=`deno`,$i=Deno.version?.deno;else if(typeof document<`u`)Qi=`web`;else if(typeof navigator<`u`&&navigator.product===`ReactNative`)Qi=`react-native`;else{var ea;Qi=`node`;let e=globalThis.process;$i=e==null||(ea=e.version)==null?void 0:ea.replace(/^v/,``)}var ta=[`runtime=${Qi}`];$i&&ta.push(`runtime-version=${$i}`);var na={headers:{"X-Client-Info":`supabase-js/${Zi}; ${ta.join(`; `)}`}},ra={schema:`public`},ia={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:`implicit`},aa={},oa={enabled:!1,respectSamplingDecision:!0};function sa(e){if(!e||typeof e!=`string`)return null;let t=e.split(`-`);if(t.length!==4)return null;let[n,r,i,a]=t;if(n.length!==2||r.length!==32||i.length!==16||a.length!==2)return null;let o=/^[0-9a-f]+$/i;return!o.test(n)||!o.test(r)||!o.test(i)||!o.test(a)||r===`00000000000000000000000000000000`||i===`0000000000000000`?null:{version:n,traceId:r,parentId:i,traceFlags:a,isSampled:(parseInt(a,16)&1)==1}}function ca(e,t){if(!e||!t||t.length===0)return!1;let n;if(e instanceof URL)n=e;else try{n=new URL(e)}catch{return!1}for(let e of t)try{if(typeof e==`string`){if(la(n.hostname,e))return!0}else if(e instanceof RegExp){if(e.test(n.hostname))return!0}else if(typeof e==`function`&&e(n))return!0}catch{continue}return!1}function la(e,t){if(t===e)return!0;if(t.startsWith(`*.`)){let n=t.slice(2);if(e.endsWith(n)&&(e===n||e.endsWith(`.`+n)))return!0}return!1}function ua(e){let t=[];try{let n=new URL(e);t.push(n.hostname)}catch{}return t.push(`*.supabase.co`,`*.supabase.in`),t.push(`localhost`,`127.0.0.1`,`[::1]`),t}function da(e){"@babel/helpers - typeof";return da=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},da(e)}function fa(e,t){if(da(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(da(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function pa(e){var t=fa(e,`string`);return da(t)==`symbol`?t:t+``}function ma(e,t,n){return(t=pa(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ha(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ha(Object(n),!0).forEach(function(t){ma(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ha(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var ga=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),_a=()=>Headers,va=e=>e.startsWith(`sb_publishable_`)||e.startsWith(`sb_secret_`),ya=`sb_temp_`,ba=new Set,xa=e=>{if(!e.startsWith(`sb_`)||va(e)||e.startsWith(ya))return;let t=e.match(/^sb_[a-zA-Z0-9]+_/)?.[0]??`unknown`;ba.has(t)||(ba.add(t),console.warn(`@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type.`))},Sa=(e,t,n,r,i,a)=>{let o=ga(r),s=_a(),c=i?.enabled===!0,l=i?.respectSamplingDecision!==!1,u=c?ua(t):null,d=!(a?.omitApiKeyAsBearer&&va(e));return async(t,r)=>{let i=await n(),a=new s(r?.headers);if(a.has(`apikey`)||a.set(`apikey`,e),!a.has(`Authorization`)){let t=i??(d?e:null);t&&a.set(`Authorization`,`Bearer ${t}`)}if(u){let e=Ta(t,u,l);e&&(e.traceparent&&!a.has(`traceparent`)&&a.set(`traceparent`,e.traceparent),e.tracestate&&!a.has(`tracestate`)&&a.set(`tracestate`,e.tracestate),e.baggage&&!a.has(`baggage`)&&a.set(`baggage`,e.baggage))}return o(t,D(D({},r),{},{headers:a}))}},Ca=!1,wa=!1;function Ta(e,n,r){let i=t();if(!i)return Ca||(Ca=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!ca(typeof e==`string`||e instanceof URL?e:e.url,n))return null;let a=i();if(!a||!a.traceparent){var o;if(a!=null&&(o=a.carrierKeys)!=null&&o.length&&!wa){wa=!0;let e=a.carrierKeys.includes(`sentry-trace`)?" Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it.":` Configure your tracing SDK to emit W3C trace context on outgoing requests.`;console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${a.carrierKeys.join(`, `)}] and no W3C traceparent header, so trace headers will not be attached.`+e)}return null}if(r){let e=sa(a.traceparent);if(e&&!e.isSampled)return{traceparent:a.traceparent}}return a}function Ea(e){return typeof e==`boolean`?{enabled:e}:e}function Da(e){return e.endsWith(`/`)?e:e+`/`}var Oa=!1;function ka(e){Oa||typeof e==`object`&&e&&`schema`in e&&e.schema!==void 0&&(Oa=!0,console.warn(`@supabase/supabase-js: The "schema" option must be nested under "db", e.g. createClient(url, key, { db: { schema: 'myschema' } }). A top-level "schema" is ignored and queries go to the default schema.`))}function Aa(e,t){let{db:n,auth:r,realtime:i,global:a}=e,{db:o,auth:s,realtime:c,global:l}=t,u=Ea(e.tracePropagation),d=Ea(t.tracePropagation),f={db:D(D({},o),n),auth:D(D({},s),r),realtime:D(D({},c),i),storage:{},global:D(D(D({},l),a),{},{headers:D(D({},l?.headers??{}),a?.headers??{})}),tracePropagation:{enabled:u?.enabled??d?.enabled??!1,respectSamplingDecision:u?.respectSamplingDecision??d?.respectSamplingDecision??!0},accessToken:async()=>``};return e.accessToken?f.accessToken=e.accessToken:delete f.accessToken,f}function ja(e){let t=e?.trim();if(!t)throw Error(`supabaseUrl is required.`);if(!t.match(/^https?:\/\//i))throw Error(`Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.`);try{return new URL(Da(t))}catch{throw Error(`Invalid supabaseUrl: Provided URL is malformed.`)}}var Ma=class extends Xi{constructor(e){super(e)}},Na=class{constructor(e,t,n){this.supabaseUrl=e,this.supabaseKey=t;let r=ja(e);if(!t)throw Error(`supabaseKey is required.`);xa(t),ka(n),this.realtimeUrl=new URL(`realtime/v1`,r),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace(`http`,`ws`),this.authUrl=new URL(`auth/v1`,r),this.storageUrl=new URL(`storage/v1`,r),this.functionsUrl=new URL(`functions/v1`,r);let i=`sb-${r.hostname.split(`.`)[0]}-auth-token`,a={db:ra,realtime:aa,auth:D(D({},ia),{},{storageKey:i}),global:na,tracePropagation:oa},o=Aa(n??{},a);this.settings=o,this.storageKey=o.auth.storageKey??``,this.headers=o.global.headers??{},o.accessToken?(this.accessToken=o.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(o.auth??{},this.headers,o.global.fetch),this.fetch=Sa(t,e,this._getSessionToken.bind(this),o.global.fetch,o.tracePropagation),this.functionsFetch=Sa(t,e,this._getSessionToken.bind(this),o.global.fetch,o.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(D({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},o.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(e=>this.realtime.setAuth(e)).catch(e=>console.warn(`Failed to set initial Realtime auth token:`,e)),this.rest=new pe(new URL(`rest/v1`,r).href,{headers:this.headers,schema:o.db.schema,fetch:this.fetch,timeout:o.db.timeout,urlLengthLimit:o.db.urlLengthLimit,retry:o.db.retry}),this.storage=new Pn(this.storageUrl.href,this.headers,this.fetch,n?.storage),o.accessToken||this._listenForAuthEvents()}get functions(){return new u(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}getOpenApiSpec(){return this.rest.getOpenApiSpec()}rpc(e,t={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var e=this;if(e.accessToken)return await e.accessToken();let{data:t}=await e.auth.getSession();return t.session?.access_token??null}async _getAccessToken(){var e=this;return await e._getSessionToken()??e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,storageKey:a,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,lockAcquireTimeout:d,skipAutoInitialize:f},p,m){let h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Ma({url:this.authUrl.href,headers:D(D({},h),p),storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,fetch:m,lockAcquireTimeout:d,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(e=>e.toLowerCase()===`authorization`)})}_initRealtimeClient(e){return new Nt(this.realtimeUrl.href,D(D({},e),{},{params:D(D({},{apikey:this.supabaseKey}),e?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,`CLIENT`,t?.access_token)})}_handleTokenChanged(e,t,n){(e===`TOKEN_REFRESHED`||e===`SIGNED_IN`||e===`INITIAL_SESSION`)&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e===`SIGNED_OUT`&&(this.realtime.setAuth(),t==`STORAGE`&&this.auth.signOut(),this.changedAccessToken=void 0)}},Pa=(e,t,n)=>new Na(e,t,n);function Fa(){if(typeof window<`u`||globalThis.Deno!==void 0)return!1;let e=globalThis.process;if(!e)return!1;let t=e.version;if(t==null)return!1;let n=t.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=20:!1}Fa()&&console.warn(`⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715`);var Ia=typeof window<`u`&&window.__SUPABASE__||{},La=String(Ia.url||`https://kdeqpsomfmpbygwrowoc.supabase.co`).trim().replace(/\/+$/,``).replace(/\/rest\/v1$/,``),Ra=Ia.key||`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZXFwc29tZm1wYnlnd3Jvd29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxOTg5ODAsImV4cCI6MjEwNTc3NDk4MH0.ucsHaCBiWadXl8a3qrpxGeZsnZtGGHX9Srau1eJdQmI`,O=!!(La&&Ra&&!String(La).includes(`xyzcompany`)),za=La,Ba=Ra,k=O?Pa(La,Ra):null,A=e=>Number(e)||0,j=e=>e==null?``:String(e);async function Va(){let{data:e,error:t}=await k.auth.getUser();if(t||!e?.user)throw Error(`sem-sessao`);return e.user.id}function Ha(e){return{id:e.id,nome:j(e.nome),categoria:j(e.categoria)||`Ingredientes`,quantidade:A(e.quantidade),estoqueAtual:A(e.estoque_atual),unidade:j(e.unidade)||`g`,alertaEstoqueMinimo:A(e.alerta_estoque_minimo),estoqueMinimo:A(e.estoque_minimo),precoPacote:A(e.preco_pacote),qtdPacote:A(e.qtd_pacote)||1,kcal100:A(e.kcal_100),carb100:A(e.carb_100),acucar100:A(e.acucar_100),prot100:A(e.prot_100),gordTot100:A(e.gord_tot_100),gordSat100:A(e.gord_sat_100),gordTrans100:A(e.gord_trans_100),fibra100:A(e.fibra_100),sodio100:A(e.sodio_100),alergenicos:j(e.alergenicos)}}function Ua(e,t){return{id:e.id,nome:j(e.nome),categoria:j(e.categoria)||`Docinhos`,rendimento:A(e.rendimento)||1,margemAlvo:A(e.margem_alvo)||60,precoPraticado:A(e.preco_praticado),tempoPreparoMin:A(e.tempo_preparo_min),dicaForno:j(e.dica_forno),modoPreparo:j(e.modo_preparo),porcaoG:A(e.porcao_g),validadeDias:parseInt(e.validade_dias,10)||0,ingredientes:(t||[]).map(e=>({insumoId:e.insumo_id,qtd:A(e.qtd)}))}}function Wa(e,t){return{id:e.id,cliente:j(e.cliente),telefone:j(e.telefone),dataEntrega:e.data_entrega||``,horaEntrega:j(e.hora_entrega),status:j(e.status)||`aguardando`,canal:j(e.canal)||`WhatsApp`,taxaPercentual:A(e.taxa_percentual),valorTotal:A(e.valor_total),valorSinal:A(e.valor_sinal),estoqueBaixado:!!e.estoque_baixado,...e.data_baixa_estoque?{dataBaixaEstoque:e.data_baixa_estoque}:{},observacoes:j(e.observacoes),itens:(t||[]).map(e=>({fichaId:e.ficha_id||``,nome:j(e.nome),qtd:A(e.qtd)||1,precoUnit:A(e.preco_unit)}))}}function Ga(e){return{id:e.id,pedidoId:e.pedido_id||void 0,data:e.data||``,tipo:e.tipo,categoria:j(e.categoria),descricao:j(e.descricao),valor:A(e.valor),forma:j(e.forma)||`PIX`}}function Ka(e){return e?{faturamentoMensal:A(e.faturamento_mensal),faturamentoAnual:A(e.faturamento_anual),custosFixosMensais:A(e.custos_fixos_mensais),cmvMedioPercentual:A(e.cmv_medio_percentual),taxaAppMediaPercentual:A(e.taxa_app_media_percentual)}:null}function qa(e){return{id:e.id,nome:j(e.nome),dataCampanha:e.data_campanha||``,fichaId:e.ficha_id||``,canal:j(e.canal)||`WhatsApp`,taxaCanal:A(e.taxa_canal),tipoDesconto:j(e.tipo_desconto)||`percentual`,descontoPercentual:A(e.desconto_percentual),precoPromocionalFixo:A(e.preco_promocional_fixo),brindeAtivo:!!e.brinde_ativo,brindeTipo:j(e.brinde_tipo)||`ficha`,brindeFichaId:e.brinde_ficha_id||``,brindeNomeCustom:j(e.brinde_nome_custom),brindeCustoCustom:A(e.brinde_custo_custom),volumeVendasProjetado:A(e.volume_vendas_projetado),status:j(e.status)||`planejada`,observacoes:j(e.observacoes)}}function Ja(e){return{id:e.id,chave:e.chave||void 0,nome:j(e.nome),telefone:j(e.telefone),endereco:j(e.endereco),aniversario:j(e.aniversario),observacoes:j(e.observacoes)}}function Ya(e){return e?{nome:j(e.nome),slogan:j(e.slogan),logo:j(e.logo),corPrincipal:j(e.cor_principal)||`#C65D3A`,corSecundaria:j(e.cor_secundaria)||`#3E2A23`,corFundo:j(e.cor_fundo)||`#FFF8F1`,whatsapp:j(e.whatsapp),instagram:j(e.instagram),cidade:j(e.cidade),desde:j(e.desde),usarLogoEtiquetas:e.usar_logo_etiquetas!==!1,usarLogoCardapio:e.usar_logo_cardapio!==!1,usarAssinatura:e.usar_assinatura!==!1}:null}var Xa=(e,t)=>({user_id:e,id:t.id,nome:t.nome,categoria:t.categoria,quantidade:A(t.quantidade),estoque_atual:A(t.estoqueAtual??t.quantidade),unidade:t.unidade,alerta_estoque_minimo:A(t.alertaEstoqueMinimo),estoque_minimo:A(t.estoqueMinimo),preco_pacote:A(t.precoPacote),qtd_pacote:A(t.qtdPacote)||1,kcal_100:A(t.kcal100),carb_100:A(t.carb100),acucar_100:A(t.acucar100),prot_100:A(t.prot100),gord_tot_100:A(t.gordTot100),gord_sat_100:A(t.gordSat100),gord_trans_100:A(t.gordTrans100),fibra_100:A(t.fibra100),sodio_100:A(t.sodio100),alergenicos:j(t.alergenicos)}),Za=(e,t)=>({user_id:e,id:t.id,nome:t.nome,categoria:t.categoria,rendimento:A(t.rendimento)||1,margem_alvo:A(t.margemAlvo)||60,preco_praticado:A(t.precoPraticado),tempo_preparo_min:A(t.tempoPreparoMin),dica_forno:j(t.dicaForno),modo_preparo:j(t.modoPreparo),porcao_g:A(t.porcaoG),validade_dias:parseInt(t.validadeDias,10)||0}),Qa=(e,t)=>({user_id:e,id:t.id,cliente:j(t.cliente),telefone:j(t.telefone),data_entrega:t.dataEntrega||null,hora_entrega:j(t.horaEntrega),status:t.status,canal:t.canal,taxa_percentual:A(t.taxaPercentual),valor_total:A(t.valorTotal),valor_sinal:A(t.valorSinal),estoque_baixado:!!t.estoqueBaixado,data_baixa_estoque:t.dataBaixaEstoque||null,observacoes:j(t.observacoes)}),$a=(e,t)=>({user_id:e,id:t.id,pedido_id:t.pedidoId||null,data:t.data||null,tipo:t.tipo,categoria:t.categoria,descricao:j(t.descricao),valor:A(t.valor),forma:t.forma}),eo=(e,t)=>({user_id:e,id:t.id,nome:j(t.nome),data_campanha:t.dataCampanha||null,ficha_id:t.fichaId||null,canal:t.canal,taxa_canal:A(t.taxaCanal),tipo_desconto:t.tipoDesconto,desconto_percentual:A(t.descontoPercentual),preco_promocional_fixo:A(t.precoPromocionalFixo),brinde_ativo:!!t.brindeAtivo,brinde_tipo:t.brindeTipo,brinde_ficha_id:t.brindeFichaId||null,brinde_nome_custom:j(t.brindeNomeCustom),brinde_custo_custom:A(t.brindeCustoCustom),volume_vendas_projetado:A(t.volumeVendasProjetado),status:t.status,observacoes:j(t.observacoes)}),to=(e,t)=>({user_id:e,id:t.id,chave:t.chave||null,nome:j(t.nome),telefone:j(t.telefone),endereco:j(t.endereco),aniversario:j(t.aniversario),observacoes:j(t.observacoes)}),no=(e,t)=>({user_id:e,nome:j(t.nome),slogan:j(t.slogan),logo:j(t.logo),cor_principal:j(t.corPrincipal)||`#C65D3A`,cor_secundaria:j(t.corSecundaria)||`#3E2A23`,cor_fundo:j(t.corFundo)||`#FFF8F1`,whatsapp:j(t.whatsapp),instagram:j(t.instagram),cidade:j(t.cidade),desde:j(t.desde),usar_logo_etiquetas:t.usarLogoEtiquetas!==!1,usar_logo_cardapio:t.usarLogoCardapio!==!1,usar_assinatura:t.usarAssinatura!==!1});async function ro(e,t,n=null){let r=k.from(e).select(`*`).eq(`user_id`,t);n&&(r=r.order(n,{ascending:!0}));let{data:i,error:a}=await r;if(a)throw a;return i||[]}async function io(e,t){try{return await ro(e,t)}catch(t){if(/does not exist|schema cache|PGRST/i.test(t?.message||``))return console.warn(`Tabela "${e}" ainda não existe — rode a migration correspondente.`),[];throw t}}async function ao(){let e=await Va(),[t,n,r,i,a,o,s,c,l,u]=await Promise.all([ro(`insumos`,e,`nome`),ro(`fichas`,e,`nome`),ro(`ficha_ingredientes`,e),ro(`pedidos`,e,`data_entrega`),ro(`pedido_itens`,e),ro(`lancamentos`,e,`data`),ro(`metas`,e),ro(`promocoes`,e,`data_campanha`),ro(`clientes`,e,`nome`),io(`marca`,e)]),d={};r.forEach(e=>{(d[e.ficha_id]=d[e.ficha_id]||[]).push(e)});let f={};return a.forEach(e=>{(f[e.pedido_id]=f[e.pedido_id]||[]).push(e)}),{insumos:t.map(Ha),fichas:n.map(e=>Ua(e,d[e.id])),pedidos:i.map(e=>Wa(e,f[e.id])),lancamentos:o.map(Ga),metas:Ka(s[0])||null,promocoes:c.map(qa),clientes:l.map(Ja),marca:Ya(u[0])}}var oo=`00000000-0000-0000-0000-000000000000`;async function so(e,t,n){if(!t||t.length===0)return;let{error:r}=await k.from(e).upsert(t,{onConflict:n});if(r)throw r}async function co(e,t){if(!O)return;let n=await Va();if(e===`confeitaria_insumos`)await so(`insumos`,t.insumos.map(e=>Xa(n,e)),`user_id,id`);else if(e===`confeitaria_fichas`){await so(`fichas`,t.fichas.map(e=>Za(n,e)),`user_id,id`),await k.from(`ficha_ingredientes`).delete().eq(`user_id`,n).neq(`id`,oo);let e=[];if(t.fichas.forEach(t=>(t.ingredientes||[]).forEach(r=>{r.insumoId&&A(r.qtd)>0&&e.push({user_id:n,ficha_id:t.id,insumo_id:r.insumoId,qtd:A(r.qtd)})})),e.length>0){let{error:t}=await k.from(`ficha_ingredientes`).insert(e);if(t)throw t}}else if(e===`confeitaria_pedidos`){await so(`pedidos`,t.pedidos.map(e=>Qa(n,e)),`user_id,id`),await k.from(`pedido_itens`).delete().eq(`user_id`,n).neq(`id`,oo);let e=[];if(t.pedidos.forEach(t=>(t.itens||[]).forEach(r=>{e.push({user_id:n,pedido_id:t.id,ficha_id:r.fichaId||null,nome:j(r.nome),qtd:A(r.qtd)||1,preco_unit:A(r.precoUnit)})})),e.length>0){let{error:t}=await k.from(`pedido_itens`).insert(e);if(t)throw t}}else if(e===`confeitaria_lancamentos`)await so(`lancamentos`,t.lancamentos.map(e=>$a(n,e)),`user_id,id`);else if(e===`confeitaria_metas`){let e=t.metas||{};await so(`metas`,[{user_id:n,faturamento_mensal:A(e.faturamentoMensal),faturamento_anual:A(e.faturamentoAnual),custos_fixos_mensais:A(e.custosFixosMensais),cmv_medio_percentual:A(e.cmvMedioPercentual),taxa_app_media_percentual:A(e.taxaAppMediaPercentual)}],`user_id`)}else e===`confeitaria_promocoes`?await so(`promocoes`,t.promocoes.map(e=>eo(n,e)),`user_id,id`):e===`confeitaria_clientes`?await so(`clientes`,t.clientes.map(e=>to(n,e)),`user_id,id`):e===`confeitaria_marca`&&await so(`marca`,[no(n,t.marca||{})],`user_id`)}async function lo(e,t){if(!O)return;let n=await Va(),{error:r}=await k.from(e).delete().eq(`user_id`,n).eq(`id`,t);if(r)throw r}async function uo(e,t){if(!O||!t||t.length===0)return;let n=await Va(),{error:r}=await k.from(e).delete().eq(`user_id`,n).in(`id`,t);if(r)throw r}async function fo(){if(!O)return null;let{data:e}=await k.auth.getSession();return e?.session||null}async function po(e,t){let{data:n,error:r}=await k.auth.signInWithPassword({email:e,password:t});if(r)throw r;return n}async function mo(e,t){let{data:n,error:r}=await k.auth.signUp({email:e,password:t});if(r)throw r;return n}async function ho(){O&&await k.auth.signOut()}function go(e){return e?.user?.email||``}async function _o(){if(O)try{let{data:e}=await k.auth.getUser(),t=e?.user;if(!t)return;await k.from(`perfis`).upsert({id:t.id,email:t.email||``},{onConflict:`id`})}catch(e){console.error(`Perfil não sincronizado:`,e)}}var M={INSUMOS:`confeitaria_insumos`,FICHAS:`confeitaria_fichas`,PEDIDOS:`confeitaria_pedidos`,LANCAMENTOS:`confeitaria_lancamentos`,METAS:`confeitaria_metas`,PROMOCOES:`confeitaria_promocoes`,CLIENTES:`confeitaria_clientes`,MARCA:`confeitaria_marca`},vo={faturamentoMensal:0,faturamentoAnual:0,custosFixosMensais:0,cmvMedioPercentual:0,taxaAppMediaPercentual:0},yo=[{id:`op-pascoa`,periodo:`Março / Abril`,nome:`Páscoa Confeiteira`,icone:`fa-egg`,cor:`purple`,sugestao:`Ovos de Colher & Mini Ovos com Brinde`,fichaRecomendadaId:`fic-3`,canalRecomendado:`WhatsApp`,taxaRecomendada:0,tipoMecanica:`leve_ganhe`,descontoSugestao:0,precoSugestao:48,brindeAtivo:!0,brindeFichaId:`fic-3`,volumeSugerido:40,estrategia:`Incentive encomendas antecipadas com sinal de 50%. Ofereça caixa degustação como brinde para pedidos fechados com 10 dias de antecedência.`},{id:`op-dia-das-maes`,periodo:`2º Domingo de Maio`,nome:`Dia das Mães`,icone:`fa-heart`,cor:`pink`,sugestao:`Bolo Especial + Caixa c/ 4 Brigadeiros`,fichaRecomendadaId:`fic-2`,canalRecomendado:`WhatsApp`,taxaRecomendada:0,tipoMecanica:`combo`,descontoSugestao:10,precoSugestao:105,brindeAtivo:!0,brindeFichaId:`fic-3`,volumeSugerido:35,estrategia:`Combo presenteável: monte uma embalagem cartonada com fita e tag "Com Amor". Alto apelo emocional e ticket médio elevado.`},{id:`op-namorados`,periodo:`12 de Junho`,nome:`Dia dos Namorados`,icone:`fa-champagne-glasses`,cor:`rose`,sugestao:`Bolo Vulcão a Dois com Brinde Romântico`,fichaRecomendadaId:`fic-2`,canalRecomendado:`iFood`,taxaRecomendada:23,tipoMecanica:`leve_ganhe`,descontoSugestao:0,precoSugestao:110,brindeAtivo:!0,brindeFichaId:`fic-3`,volumeSugerido:30,estrategia:`Dia de altíssima demanda no delivery. Mantenha o preço com a margem do app (23%) e use a caixinha de brigadeiros como cortesia exclusiva no iFood.`},{id:`op-junina`,periodo:`Junho / Julho`,nome:`Festas Juninas & Julinas`,icone:`fa-fire`,cor:`amber`,sugestao:`Combos de Docinhos de Paçoca & Bolos Caseiros`,fichaRecomendadaId:`fic-1`,canalRecomendado:`WhatsApp`,taxaRecomendada:0,tipoMecanica:`percentual`,descontoSugestao:12,precoSugestao:140,brindeAtivo:!1,brindeFichaId:``,volumeSugerido:25,estrategia:`Vendas para festas corporativas e escolas. Desconto progressivo para pedidos a partir de 2 centos de docinhos típicos.`},{id:`op-dia-dos-pais`,periodo:`2º Domingo de Agosto`,nome:`Dia dos Pais`,icone:`fa-user-tie`,cor:`blue`,sugestao:`Caixa Degustação Cacau Belga & Café`,fichaRecomendadaId:`fic-3`,canalRecomendado:`WhatsApp`,taxaRecomendada:0,tipoMecanica:`combo`,descontoSugestao:0,precoSugestao:32,brindeAtivo:!1,brindeFichaId:``,volumeSugerido:45,estrategia:`Lembrancinhas com visual refinado e sóbrio. Ideal para vendas corporativas e presentear pais no almoço de domingo.`},{id:`op-professores`,periodo:`15 de Outubro`,nome:`Dia dos Professores`,icone:`fa-graduation-cap`,cor:`emerald`,sugestao:`Lembrancinhas em Escala (Caixinhas 4 Brigadeiros)`,fichaRecomendadaId:`fic-3`,canalRecomendado:`WhatsApp`,taxaRecomendada:0,tipoMecanica:`percentual`,descontoSugestao:15,precoSugestao:22,brindeAtivo:!1,brindeFichaId:``,volumeSugerido:70,estrategia:`Data de altíssimo volume e baixo CMV unitário. Famílias compram de 3 a 5 caixinhas para os professores. Excelente giro!`},{id:`op-criancas`,periodo:`12 de Outubro`,nome:`Dia das Crianças`,icone:`fa-cake-candles`,cor:`cyan`,sugestao:`Kit Confeiteiro Mirim (Bolo + Confeitos)`,fichaRecomendadaId:`fic-2`,canalRecomendado:`WhatsApp`,taxaRecomendada:0,tipoMecanica:`leve_ganhe`,descontoSugestao:0,precoSugestao:88,brindeAtivo:!0,brindeFichaId:`fic-3`,volumeSugerido:20,estrategia:`Venda uma experiência divertida! Caixa com bolo + bisnaga de brigadeiro e potinhos de confeitos para a criança confeitar com os pais.`},{id:`op-black-friday`,periodo:`Novembro (Black Friday)`,nome:`Black Friday Confeiteira`,icone:`fa-tag`,cor:`slate`,sugestao:`Desconto Relâmpago nos Apps em Produtos de Alta Margem`,fichaRecomendadaId:`fic-1`,canalRecomendado:`iFood`,taxaRecomendada:23,tipoMecanica:`percentual`,descontoSugestao:18,precoSugestao:148,brindeAtivo:!1,brindeFichaId:``,volumeSugerido:45,estrategia:`Use apenas receitas com margem líquida superior a 55% para não queimar caixa no delivery. O objetivo é capturar clientes para o Natal!`},{id:`op-natal`,periodo:`Dezembro (Natal)`,nome:`Natal & Ceias de Fim de Ano`,icone:`fa-sleigh`,cor:`red`,sugestao:`Chocotones Recheados & Sobremesas na Taça`,fichaRecomendadaId:`fic-2`,canalRecomendado:`WhatsApp`,taxaRecomendada:0,tipoMecanica:`combo`,descontoSugestao:0,precoSugestao:115,brindeAtivo:!0,brindeFichaId:`fic-3`,volumeSugerido:60,estrategia:`A época de maior faturamento do ano! Em vez de desconto, use brindes (mini caixinha natalina) para quem fechar com 50% de sinal antecipado.`}],bo=[{id:`dt-ano-novo`,nome:`Ano Novo`,tipo:`feriado`,icone:`fa-champagne-glasses`,cor:`amber`,fixo:{dia:1,mes:1},descricao:`Ceias e festas de Réveillon: sobremesas para compartilhar.`,busca:[`bolo`,`torta`,`festa`,`travessa`],estrategia:`Ofereça sobremesas grandes para ceia com encomenda até 28/12.`,antecedencia:10},{id:`dt-volta-aulas`,nome:`Volta às Aulas`,tipo:`tematica`,icone:`fa-school`,cor:`blue`,fixo:{dia:5,mes:2},descricao:`Lanches individuais e mini porções para a lancheira.`,busca:[`mini`,`pote`,`bolo`,`cookie`],estrategia:`Kits semanais de lanche com entrega na segunda-feira.`,antecedencia:7},{id:`dt-carnaval`,nome:`Carnaval`,tipo:`feriado`,icone:`fa-masks-theater`,cor:`purple`,movel:`carnaval`,descricao:`Docinhos coloridos para blocos e festas.`,busca:[`brigadeiro`,`beijinho`,`docinho`,`cento`],estrategia:`Centos coloridos por tema de bloco, pronta-entrega no fim de semana.`,antecedencia:10},{id:`dt-mulher`,nome:`Dia da Mulher`,tipo:`tematica`,icone:`fa-venus`,cor:`pink`,fixo:{dia:8,mes:3},descricao:`Mimos e caixinhas para empresas e parceiros.`,busca:[`morango`,`coração`,`presente`,`bolo`],estrategia:`Prospecção B2B: caixinhas corporativas para empresas da região.`,antecedencia:12},{id:`dt-pascoa`,nome:`Páscoa`,tipo:`tematica`,icone:`fa-egg`,cor:`amber`,movel:`pascoa`,descricao:`A data mais doce do ano: ovos de colher e mini ovos.`,busca:[`chocolate`,`ovo`,`colher`,`trufado`],estrategia:`Encomendas antecipadas com 50% de sinal + brinde para fechar cedo.`,antecedencia:21},{id:`dt-tiradentes`,nome:`Tiradentes`,tipo:`feriado`,icone:`fa-flag`,cor:`slate`,fixo:{dia:21,mes:4},descricao:`Feriadão: viagens e visitas pedem bolo de pote e pronta-entrega.`,busca:[`pote`,`bolo`,`viagem`],estrategia:`Pronta-entrega no fim de semana prolongado, sem encomenda.`,antecedencia:4},{id:`dt-trabalho`,nome:`Dia do Trabalho`,tipo:`feriado`,icone:`fa-briefcase`,cor:`slate`,fixo:{dia:1,mes:5},descricao:`Feriado de meio de semana: movimento de última hora.`,busca:[`bolo`,`pote`,`torta`],estrategia:`Cardápio enxuto de pronta-entrega, foco no WhatsApp.`,antecedencia:4},{id:`dt-maes`,nome:`Dia das Mães`,tipo:`tematica`,icone:`fa-heart`,cor:`rose`,movel:`maes`,descricao:`Segunda data mais forte: corações, flores e café da manhã.`,busca:[`coração`,`morango`,`presente`,`bolo`,`café`],estrategia:`Cestas de café da manhã + bolo coração; sinal de 50% para garantir.`,antecedencia:18},{id:`dt-namorados`,nome:`Dia dos Namorados`,tipo:`tematica`,icone:`fa-heart-crack`,cor:`red`,fixo:{dia:12,mes:6},descricao:`Morango + chocolate: combos românticos para dois.`,busca:[`morango`,`chocolate`,`coração`,`bolo`],estrategia:`Combo casal (bolo + 4 doces) com entrega agendada no dia.`,antecedencia:12},{id:`dt-junina`,nome:`Festa Junina`,tipo:`tematica`,icone:`fa-fire`,cor:`amber`,fixo:{dia:24,mes:6},descricao:`Amendoim, paçoca e milho em versão confeitaria o mês todo.`,busca:[`amendoim`,`paçoca`,`milho`,`bolo`,`pé`],estrategia:`Linha junina no cardápio de junho inteiro, não só no dia.`,antecedencia:10},{id:`dt-inverno`,nome:`Clima de Inverno`,tipo:`tematica`,icone:`fa-mug-hot`,cor:`blue`,fixo:{dia:10,mes:7},descricao:`Frio pede chocolate quente em forma de bolo: vulcões e caldas.`,busca:[`chocolate`,`vulcão`,`bolo`,`cenoura`],estrategia:`Destaque nos bolos de chocolate com calha extra no delivery.`,antecedencia:5},{id:`dt-pais`,nome:`Dia dos Pais`,tipo:`tematica`,icone:`fa-shirt`,cor:`blue`,movel:`pais`,descricao:`Chocolate intenso e cerveja na massa: linha masculina.`,busca:[`chocolate`,`bolo`,`torta`],estrategia:`Versão "pai": bolo vulcão + cerveja artesanal de parceiro.`,antecedencia:14},{id:`dt-brigadeiro`,nome:`Dia do Brigadeiro`,tipo:`tematica`,icone:`fa-candy-cane`,cor:`purple`,fixo:{dia:10,mes:9},descricao:`Data oficial do doce mais amado: edições especiais.`,busca:[`brigadeiro`,`gourmet`,`cento`],estrategia:`Sabores limitados só nesta semana + combo degustação.`,antecedencia:7},{id:`dt-independencia`,nome:`Independência`,tipo:`feriado`,icone:`fa-flag`,cor:`slate`,fixo:{dia:7,mes:9},descricao:`Feriado: pronta-entrega e encomendas de festa.`,busca:[`bolo`,`torta`,`pote`],estrategia:`Pronta-entrega no feriado, sem temática específica.`,antecedencia:4},{id:`dt-primavera`,nome:`Chegada da Primavera`,tipo:`tematica`,icone:`fa-seedling`,cor:`emerald`,fixo:{dia:23,mes:9},descricao:`Flores e frutas frescas: morango, limão e maracujá.`,busca:[`morango`,`limão`,`maracujá`,`fruta`,`bolo`],estrategia:`Linha fresca/frutada para sair do chocolate do inverno.`,antecedencia:7},{id:`dt-outubro-rosa`,nome:`Outubro Rosa (mês)`,tipo:`campanha`,icone:`fa-ribbon`,cor:`pink`,fixo:{dia:1,mes:10},descricao:`Mês de conscientização: doces rosas com propósito.`,busca:[`morango`,`rosa`,`brigadeiro`],estrategia:`Parte da renda de um produto rosa para a causa + divulgação.`,antecedencia:10},{id:`dt-criancas`,nome:`N. Sra. Aparecida / Dia das Crianças`,tipo:`feriado`,icone:`fa-children`,cor:`cyan`,fixo:{dia:12,mes:10},descricao:`Festas infantis: kits festa e doces decorados.`,busca:[`festa`,`brigadeiro`,`beijinho`,`cento`,`bolo`],estrategia:`Kit festa infantil (bolo + 50 doces) com tema da criança.`,antecedencia:14},{id:`dt-halloween`,nome:`Halloween`,tipo:`tematica`,icone:`fa-ghost`,cor:`purple`,fixo:{dia:31,mes:10},descricao:`Doces ou travessuras: decoração divertida vende.`,busca:[`chocolate`,`brigadeiro`,`decorado`],estrategia:`Caixinha travessura com doces decorados, edição limitada.`,antecedencia:10},{id:`dt-finados`,nome:`Finados`,tipo:`feriado`,icone:`fa-cross`,cor:`slate`,fixo:{dia:2,mes:11},descricao:`Data sensível: operação normal, sem promoção temática.`,busca:[`bolo`,`torta`],estrategia:`Sem ação temática; mantenha o cardápio regular.`,antecedencia:0},{id:`dt-blackfriday`,nome:`Black Friday`,tipo:`tematica`,icone:`fa-bag-shopping`,cor:`red`,movel:`blackfriday`,descricao:`Queima de estoque e combos agressivos de fim de ano.`,busca:[`combo`,`cento`,`brigadeiro`,`promoção`],estrategia:`Combo com margem mínima de 22% (valide no simulador).`,antecedencia:10},{id:`dt-consciencia`,nome:`Consciência Negra`,tipo:`feriado`,icone:`fa-flag`,cor:`slate`,fixo:{dia:20,mes:11},descricao:`Feriado: pronta-entrega e encomendas.`,busca:[`bolo`,`torta`,`pote`],estrategia:`Pronta-entrega no feriado, sem temática específica.`,antecedencia:4},{id:`dt-natal`,nome:`Natal`,tipo:`tematica`,icone:`fa-gifts`,cor:`red`,fixo:{dia:25,mes:12},descricao:`Pico de faturamento: presentes comestíveis e ceias.`,busca:[`chocolate`,`presente`,`bolo`,`natal`,`panetone`],estrategia:`Catálogo de presentes com faixas de preço + entrega agendada.`,antecedencia:25}];function xo(e){let t=e%19,n=Math.floor(e/100),r=e%100,i=Math.floor(n/4),a=n%4,o=Math.floor((n+8)/25),s=Math.floor((n-o+1)/3),c=(19*t+n-i-s+15)%30,l=Math.floor(r/4),u=r%4,d=(32+2*a+2*l-c-u)%7,f=Math.floor((t+11*c+22*d)/451),p=Math.floor((c+d-7*f+114)/31),m=(c+d-7*f+114)%31+1;return`${e}-${String(p).padStart(2,`0`)}-${String(m).padStart(2,`0`)}`}function So(e,t){let n=new Date(e+`T12:00:00`);return n.setDate(n.getDate()+t),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}-${String(n.getDate()).padStart(2,`0`)}`}function Co(e,t,n,r){let i=new Date(e,t-1,1),a=0;for(;!(i.getDay()===n&&(a++,a===r));)i.setDate(i.getDate()+1);return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,`0`)}-${String(i.getDate()).padStart(2,`0`)}`}function wo(e){return Co(e,11,5,4)}function To(e,t){if(e.fixo)return`${t}-${String(e.fixo.mes).padStart(2,`0`)}-${String(e.fixo.dia).padStart(2,`0`)}`;let n=xo(t);return e.movel===`pascoa`?n:e.movel===`carnaval`?So(n,-47):e.movel===`corpus`?So(n,60):e.movel===`maes`?Co(t,5,0,2):e.movel===`pais`?Co(t,8,0,2):e.movel===`blackfriday`?wo(t):null}function Eo(e,t){let n=Z(0);return bo.map(t=>({entry:t,iso:To(t,e)})).filter(e=>e.iso&&Number(e.iso.split(`-`)[1])===t).sort((e,t)=>e.iso.localeCompare(t.iso)).map(e=>{let t=Math.round((new Date(e.iso+`T12:00:00`)-new Date(n+`T12:00:00`))/864e5);return{...e,diff:t}})}function Do(e=21){let t=Z(0),n=new Date().getFullYear(),r=[];return[n,n+1].forEach(n=>{bo.forEach(i=>{let a=To(i,n);if(!a)return;let o=Math.round((new Date(a+`T12:00:00`)-new Date(t+`T12:00:00`))/864e5);o>=0&&o<=e&&r.push({entry:i,iso:a,diff:o})})}),r.sort((e,t)=>e.diff-t.diff)}function Oo(e){return e===0?`é hoje! 🎉`:e===1?`é amanhã`:e>1?`em ${e} dias`:e===-1?`foi ontem`:`há ${Math.abs(e)} dias`}var N=[],P=[],F=[],I=[],L={},ko=[],R=[],z=`dashboard`,B={},Ao=new Date().toISOString().slice(0,7),jo=0,Mo=``,No=!1;function Po(e){let t={};return Object.keys(e||{}).forEach(n=>{let r=e[n];if(Array.isArray(r)){if(!r.length)return;t[n]={},r.forEach(e=>{t[n][e]=1})}else if(r&&typeof r==`object`){let e={};Object.keys(r).forEach(t=>{let n=Math.max(0,Number(r[t])||0);n>0&&(e[t]=n)}),Object.keys(e).length&&(t[n]=e)}}),t}function Fo(){try{B=Po(JSON.parse(localStorage.getItem(`confeitaria_cardapios`)))}catch{B={}}}function Io(){try{localStorage.setItem(`confeitaria_cardapios`,JSON.stringify(B)),Js(`ok`,`Cardápio salvo ✓`)}catch{}}function Lo(e=0){let t=new Date;t.setHours(12,0,0,0);let n=(t.getDay()+6)%7;return t.setDate(t.getDate()-n+e*7),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function Ro(e=0){let t=Lo(e);return Array.from({length:7},(e,n)=>So(t,n))}function zo(e,t=3){if(!P.length||!e.busca)return[];let n=e.busca.map(e=>String(e).toLowerCase()),r=[];return P.forEach(e=>{let t=String(e.nome||``).toLowerCase(),i=String(e.categoria||``).toLowerCase(),a=0;if(n.forEach(e=>{t.includes(e)?a+=2:i.includes(e)&&(a+=1)}),a<=0)return;let o=Number(e.rendimento)>0?Number(e.rendimento):1,s=X(e)/o,c=Number(e.precoPraticado)||0,l=c>0?(c-s)/c*100:null;r.push({ficha:e,pts:a,cmvU:s,preco:c,margem:l})}),r.sort((e,t)=>(e.margem??-1)===(t.margem??-1)?t.pts-e.pts:(t.margem??-1)-(e.margem??-1)),r.slice(0,t)}function Bo(e){let t=Number(e.split(`-`)[0]),n=bo.map(e=>({entry:e,d:To(e,t)})).find(t=>t.d===e);return n?n.entry:null}var Vo={iFood:{plataforma:{comissao:23,pagamento:3.2,rotulo:`Entrega iFood`},propria:{comissao:12,pagamento:3.2,rotulo:`Básico iFood`}},"99Food":{plataforma:{comissao:8.9,pagamento:3.2,rotulo:`Full Service 99`},propria:{comissao:10.9,pagamento:3.2,rotulo:`Marketplace 99`}}},Ho=localStorage.getItem(`confeitaria_plano_entrega`)||`plataforma`;[`plataforma`,`propria`].includes(Ho)||(Ho=`plataforma`);function Uo(e){let t=Vo[e];if(!t)return{total:0,rotulo:`Venda direta (sem taxa)`};let n=t[Ho]||t.plataforma;return{total:+(n.comissao+n.pagamento).toFixed(2),rotulo:`${n.rotulo} (${String(n.comissao).replace(`.`,`,`)}% + ${String(n.pagamento).replace(`.`,`,`)}%)`}}function Wo(e){return Uo(e).total}var Go={nome:``,slogan:``,logo:``,corPrincipal:`#C65D3A`,corSecundaria:`#3E2A23`,corFundo:`#FFF8F1`,whatsapp:``,instagram:``,cidade:``,desde:``,usarLogoEtiquetas:!0,usarLogoCardapio:!0,usarAssinatura:!0},V={...Go};function Ko(){return!!(V.nome||V.logo)}function H(e=`corPrincipal`){let t=String(V[e]||``).trim();return/^#[0-9a-f]{6}$/i.test(t)?t.toUpperCase():Go[e]}function qo(){let e=[];return V.whatsapp&&e.push(`WhatsApp `+V.whatsapp),V.instagram&&e.push(V.instagram),V.cidade&&e.push(V.cidade),e.join(` • `)}function Jo(e=`normal`){if(!Ko())return``;let t=e===`grande`;return`<div class="marca-cabecalho" style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
    ${V.logo&&V.usarLogoEtiquetas?`<img src="${K(V.logo)}" alt="" style="width:${t?64:44}px;height:auto;object-fit:contain" />`:``}
    <div style="text-align:left">
      <div style="font-family:Georgia,serif;font-weight:800;font-size:${t?22:16}px;color:${H(`corSecundaria`)}">${K(V.nome)}</div>
      ${V.slogan?`<div style="font-size:${t?13:11}px;color:${H(`corPrincipal`)}">${K(V.slogan)}</div>`:``}
    </div>
  </div>`}function Yo(){let e=qo();return!e||!V.usarAssinatura?``:`<p style="margin-top:10px;font-size:11px;text-align:center;color:#666">${K(e)}</p>`}function Xo(){let e=e=>(document.getElementById(e)?.value||``).trim(),t=e=>document.getElementById(e);V={...V,nome:e(`mkNome`),slogan:e(`mkSlogan`),corPrincipal:t(`mkCor1`)?.value||V.corPrincipal,corSecundaria:t(`mkCor2`)?.value||V.corSecundaria,corFundo:t(`mkCor3`)?.value||V.corFundo,whatsapp:e(`mkWhats`),instagram:e(`mkInsta`),cidade:e(`mkCidade`),desde:e(`mkDesde`),usarLogoEtiquetas:t(`mkLogoEt`)?!!t(`mkLogoEt`).checked:V.usarLogoEtiquetas,usarLogoCardapio:t(`mkLogoCard`)?!!t(`mkLogoCard`).checked:V.usarLogoCardapio,usarAssinatura:t(`mkAssinatura`)?!!t(`mkAssinatura`).checked:V.usarAssinatura}}function Zo(){Xo(),W(M.MARCA),as(),q(`Identidade da marca salva!`)}function Qo(){Xo(),os()}function $o(){Xo(),as()}function es(e){let t=e.files&&e.files[0];if(!t)return;if(!/^image\//.test(t.type)){q(`Selecione um arquivo de imagem.`,!1);return}if(t.size>8388608){q(`Imagem muito grande (máx. 8 MB).`,!1),e.value=``;return}let n=new FileReader;n.onload=()=>{let e=new Image;e.onload=()=>{let t=Math.min(1,480/Math.max(e.width,e.height)),n=document.createElement(`canvas`);n.width=Math.max(1,Math.round(e.width*t)),n.height=Math.max(1,Math.round(e.height*t)),n.getContext(`2d`).drawImage(e,0,0,n.width,n.height),Xo(),V.logo=n.toDataURL(`image/png`),as(),q(`Logo atualizada! Não esqueça de salvar.`)},e.onerror=()=>q(`Não consegui ler essa imagem.`,!1),e.src=n.result},n.onerror=()=>q(`Falha ao ler o arquivo.`,!1),n.readAsDataURL(t)}function ts(){Xo(),V.logo=``,as()}function ns(){Xo(),V.corPrincipal=Go.corPrincipal,V.corSecundaria=Go.corSecundaria,V.corFundo=Go.corFundo,as()}var rs=(e,t,n,r=``,i=`text`)=>`
  <div>
    <label class="block text-xs font-semibold text-slate-700 mb-1">${t}</label>
    <input type="${i}" id="${e}" value="${K(n)}" placeholder="${K(r)}" oninput="aoDigitarMarca()" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:border-[#C65D3A] focus:outline-none" />
  </div>`,is=(e,t,n)=>`
  <div>
    <label class="block text-xs font-semibold text-slate-700 mb-1">${t}</label>
    <div class="flex items-center gap-2">
      <input type="color" id="${e}" value="${H(e===`mkCor1`?`corPrincipal`:e===`mkCor2`?`corSecundaria`:`corFundo`)}" oninput="document.getElementById('${e}Texto').value=this.value; aoDigitarMarca()" class="w-11 h-9 rounded-lg border border-slate-300 cursor-pointer p-1 bg-white" />
      <input type="text" id="${e}Texto" value="${K(H(e===`mkCor1`?`corPrincipal`:e===`mkCor2`?`corSecundaria`:`corFundo`))}" oninput="document.getElementById('${e}').value=this.value; aoDigitarMarca()" class="w-28 border border-slate-300 rounded-lg px-2 py-2 text-xs font-mono uppercase text-slate-700 focus:border-[#C65D3A] focus:outline-none" />
    </div>
  </div>`;function as(){let e=document.getElementById(`tab-marca`);e&&(e.innerHTML=`
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Identidade da Marca</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Preencha uma vez: identidade aparece nas etiquetas, fichas, cardápio e no Modo Apresentar</p>
      </div>
      <button onclick="salvarMarca()" class="px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-xs transition-all cursor-pointer" style="background:linear-gradient(135deg,#D96C75,#C65D3A)">
        <i class="fa-solid fa-check"></i> Salvar identidade
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Formulário -->
      <div class="lg:col-span-7 space-y-4">
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-signature text-[#C65D3A]"></i>
            <h3 class="font-bold text-slate-900 text-sm">Nome e assinatura</h3>
          </div>
          ${rs(`mkNome`,`Nome da marca (nome fantasia)`,V.nome,`Ex: Doce Mel`)}
          ${rs(`mkSlogan`,`Assinatura / slogan`,V.slogan,`Ex: Feito à mão, com calma`)}
          <div class="grid grid-cols-2 gap-3">
            ${rs(`mkDesde`,`Desde (opcional)`,V.desde,`Ex: 2021`)}
            ${rs(`mkCidade`,`Cidade / bairro`,V.cidade,`Ex: Centro — SP`)}
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-image text-[#C65D3A]"></i>
              <h3 class="font-bold text-slate-900 text-sm">Logo</h3>
            </div>
            ${V.logo?`<button onclick="removerLogoMarca()" class="text-[11px] font-bold text-red-500 hover:text-red-700 cursor-pointer">Remover</button>`:``}
          </div>
          <div class="flex items-center gap-4">
            <div class="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
              ${V.logo?`<img src="${K(V.logo)}" alt="Logo" class="max-w-full max-h-full object-contain p-1" />`:`<i class="fa-solid fa-cloud-arrow-up text-slate-300 text-xl"></i>`}
            </div>
            <div class="text-xs text-slate-500 space-y-1.5">
              <p>PNG ou JPG com fundo transparente (quadrado ~500px).</p>
              <p>A imagem é reduzida no navegador antes de salvar, então não pesa no banco.</p>
              <label class="inline-block px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer">
                <i class="fa-solid fa-upload"></i> Escolher imagem
                <input type="file" accept="image/*" class="hidden" onchange="processarLogoMarca(this)" />
              </label>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-palette text-[#C65D3A]"></i>
              <h3 class="font-bold text-slate-900 text-sm">Cores</h3>
            </div>
            <button onclick="restaurarCoresTema()" class="text-[11px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer">Voltar ao tema do app</button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${is(`mkCor1`,`Principal`,V.corPrincipal)}
            ${is(`mkCor2`,`Textos`,V.corSecundaria)}
            ${is(`mkCor3`,`Fundo`,V.corFundo)}
          </div>
          <p class="text-[11px] text-slate-400">
            Dica: a principal é o acento (chamadas, botões), a de textos dá contraste e o fundo é a cor do papel/caixa.
          </p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-address-book text-[#C65D3A]"></i>
            <h3 class="font-bold text-slate-900 text-sm">Contato</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${rs(`mkWhats`,`WhatsApp (com DDD)`,V.whatsapp,`Ex: (11) 98888-7777`)}
            ${rs(`mkInsta`,`Instagram`,V.instagram,`Ex: @docemel`)}
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <i class="fa-solid fa-eye text-[#C65D3A]"></i>
            <h3 class="font-bold text-slate-900 text-sm">Onde a marca aparece</h3>
          </div>
          <div class="pt-3 space-y-2.5">
            ${[[`mkLogoEt`,`Logo nas etiquetas e fichas impressas`,V.usarLogoEtiquetas],[`mkLogoCard`,`Logo no cardápio e no Modo Apresentar`,V.usarLogoCardapio],[`mkAssinatura`,`Contato no rodapé dos impressos`,V.usarAssinatura]].map(([e,t,n])=>`
              <label class="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" id="${e}" ${n?`checked`:``} onchange="aoAlternarMarca()" class="w-4 h-4 accent-[#C65D3A]" />
                ${t}
              </label>`).join(``)}
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="lg:col-span-5 space-y-4">
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-20">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-mobile-screen text-[#C65D3A]"></i>
              <h3 class="font-bold text-slate-900 text-sm">Prévia</h3>
            </div>
            <span class="text-[10px] text-slate-400">aparece ao salvar</span>
          </div>

          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-4 mb-1.5">Etiqueta de pedido</p>
          <div class="rounded-xl border border-dashed border-slate-200 p-3 bg-white" id="pvEtiqueta">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              ${V.logo&&V.usarLogoEtiquetas?`<img src="${K(V.logo)}" style="width:34px;height:auto;object-fit:contain" />`:``}
              <div>
                <div data-pv="nome" style="font-family:Georgia,serif;font-weight:800;font-size:15px;color:${H(`corSecundaria`)}">${K(V.nome||`Nome da marca`)}</div>
                <div data-pv="slogan" style="font-size:10px;color:${H(`corPrincipal`)}">${K(V.slogan||`sua assinatura aqui`)}</div>
              </div>
            </div>
            <p class="text-[11px] text-slate-600">Ana Souza</p>
            <p class="text-[11px] text-slate-600">2x Bolo Vulcão • 1x Caixa Presente</p>
            <p data-pv="assinatura" class="text-[10px] text-slate-400 mt-2">${K(qo()||`seu contato aqui`)}</p>
          </div>

          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-4 mb-1.5">Cabeçalho do cardápio</p>
          <div class="rounded-xl border border-dashed border-slate-200 p-4" id="pvCardapio" style="background:${H(`corFundo`)}">
            <div class="flex items-center gap-2.5">
              ${V.logo&&V.usarLogoCardapio?`<img src="${K(V.logo)}" style="width:40px;height:auto;object-fit:contain" />`:``}
              <div>
                <div data-pv="nome" style="font-family:Georgia,serif;font-weight:800;font-size:16px;color:${H(`corSecundaria`)}">${K(V.nome||`Nome da marca`)}</div>
                <div data-pv="slogan" style="font-size:11px;color:${H(`corPrincipal`)}">${K(V.slogan||`sua assinatura aqui`)}</div>
              </div>
            </div>
            <div class="grid grid-cols-7 gap-1 mt-3">
              ${[`SEG`,`TER`,`QUA`,`QUI`,`SEX`,`SÁB`,`DOM`].map(e=>`<div class="text-center text-[9px] font-black py-1 rounded" style="background:${H(`corPrincipal`)};color:#fff">${e}</div>`).join(``)}
            </div>
          </div>

          <p class="text-[11px] text-slate-400 mt-4 leading-relaxed">
            A identidade é usada na impressão de etiquetas e fichas, no cardápio, no Modo Apresentar e na assinatura do WhatsApp.
          </p>
        </div>
      </div>
    </div>
  `)}function os(){let e=H(`corPrincipal`),t=H(`corSecundaria`),n=H(`corFundo`);document.querySelectorAll(`#pvEtiqueta [data-pv="nome"], #pvCardapio [data-pv="nome"]`).forEach(e=>{e.textContent=V.nome||`Nome da marca`,e.style.color=t}),document.querySelectorAll(`[data-pv="slogan"]`).forEach(t=>{t.textContent=V.slogan||`sua assinatura aqui`,t.style.color=e}),document.querySelectorAll(`[data-pv="assinatura"]`).forEach(e=>{e.textContent=qo()||`seu contato aqui`});let r=document.getElementById(`pvCardapio`);r&&(r.style.background=n),document.querySelectorAll(`#pvCardapio .grid > div`).forEach(t=>t.style.background=e)}function ss(e){let t=Dc(e),n=t.total>0?t.lucroLiquido/t.total*100:0;return{total:t.total,cmvTotal:t.cmvTotal,taxaApp:t.taxaApp,lucro:t.lucroLiquido,margem:n}}function cs(e){let t=ss(e),n=t.margem>=40?`bg-emerald-100 text-emerald-800 border-emerald-200`:t.margem>=22?`bg-blue-100 text-blue-800 border-blue-200`:`bg-red-100 text-red-800 border-red-200`,r=t.margem>=22?`fa-circle-check`:`fa-triangle-exclamation`;return{L:t,html:`<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${n}" title="Lucro ${G(t.lucro)} sobre ${G(t.total)}"><i class="fa-solid ${r}"></i> ${t.margem.toFixed(0)}%</span>`}}function ls(e){if(!e)return null;let t=X(e)/(Number(e.rendimento)>0?Number(e.rendimento):1),n=(Number(e.margemAlvo)||60)/100,r=Number(e.precoPraticado)||0,i=n<1?t/(1-n):t*2.5,a=i-r;return{cmvU:t,margemAlvo:n,precoAtual:r,precoSugerido:i,diferenca:a,pct:r>0?a/r*100:0}}function us(e){let t=P.find(t=>t.id===e);if(!t){q(`Ficha não encontrada.`,!1);return}let n=ls(t);if(n){if(Math.abs(n.diferenca)<.5){q(`Preço já está alinhado com a margem alvo.`);return}confirm(`Ajustar "${t.nome}" de ${G(n.precoAtual)} para ${G(n.precoSugerido)}?\n\nMantém a margem alvo de ${Math.round(n.margemAlvo*100)}% sobre o CMV atual.`)&&(t.precoPraticado=Math.round(n.precoSugerido*100)/100,W(M.FICHAS),Y(),q(`Preço de "${t.nome}" ajustado para ${G(t.precoPraticado)}!`))}}var ds=!1;function fs(){let e=document.getElementById(`assistenteBar`);if(!e)return;e.classList.remove(`hidden`);let t=document.getElementById(`assistenteInput`);t&&setTimeout(()=>t.focus(),60)}function ps(){let e=document.getElementById(`btnAssistente`);if(fs(),!(`webkitSpeechRecognition`in window||`SpeechRecognition`in window)){q(`Sem voz neste navegador — digite o pedido no campo abaixo.`);return}if(ds){ms();return}let t=new(window.SpeechRecognition||window.webkitSpeechRecognition);t.lang=`pt-BR`,t.interimResults=!1,t.maxAlternatives=1,ds=!0,e&&(e.classList.remove(`bg-white`,`text-slate-700`,`hover:bg-orange-50`),e.classList.add(`animate-pulse`,`bg-red-500`,`text-white`),e.title=`Ouvindo… clique para parar`,e.setAttribute(`aria-label`,`Parar de ouvir`));let n=document.getElementById(`assistenteInput`);n&&(n.placeholder=`Ouvindo… fale agora 🎙️`),t.onresult=e=>{let t=e.results[0][0].transcript;document.getElementById(`assistenteInput`).value=t,hs(t)},t.onerror=()=>{ms(),q(`Não consegui ouvir. Tente de novo ou digite.`,!1)},t.onend=()=>ms(),t.start()}function ms(){ds=!1;let e=document.getElementById(`btnAssistente`);e&&(e.classList.remove(`animate-pulse`,`bg-red-500`,`text-white`),e.classList.add(`bg-white`,`text-slate-700`,`hover:bg-orange-50`),e.innerHTML=`<i class="fa-solid fa-microphone text-base"></i>`,e.title=`Assistente por voz: diga o que produzir`,e.setAttribute(`aria-label`,`Assistente por voz`));let t=document.getElementById(`assistenteInput`);t&&(t.placeholder=`Ex: "20 brigadeiros sábado 14h" e Enter cria o pedido`)}function hs(e){let t=String(e||``).toLowerCase().trim();if(!t)return;let n=t.match(/(\d+)\s*(un|unidades|unid|pç|pecas?|peças)?/),r=n?Math.max(1,parseInt(n[1],10)):1,i=P.find(e=>t.includes(e.nome.toLowerCase()))||P[0];if(!i){q(`Cadastre fichas para o assistente funcionar.`,!1);return}let a=Z(0);/amanh/.test(t)?a=Z(1):/depois de amanh/.test(t)&&(a=Z(2));let o=t.match(/(\d{1,2})[:h](\d{2})?/),s=o?`${o[1].padStart(2,`0`)}:${(o[2]||`00`).padStart(2,`0`)}`:`12:00`,c=Number(i.precoPraticado)||0,l=r*c,u={id:`ped-`+Date.now(),cliente:`Cliente (assistente)`,telefone:``,dataEntrega:a,horaEntrega:s,status:`aguardando`,canal:`WhatsApp`,taxaPercentual:0,valorTotal:l,valorSinal:0,estoqueBaixado:!1,itens:[{fichaId:i.id,nome:i.nome,qtd:r,precoUnit:c}],observacoes:`Criado pelo assistente: "${e}"`};F.unshift(u),W(M.PEDIDOS),Y(),q(`Pedido criado: ${r}x ${i.nome} para ${a.split(`-`).reverse().join(`/`)} às ${s}`)}function gs(){let e=new Date,t=e.toISOString().slice(0,7),n=xc(t),r=[`RELATÓRIO PARA CONTABILIDADE`,`Gerado em ${e.toLocaleDateString(`pt-BR`)} às ${e.toLocaleTimeString(`pt-BR`,{hour:`2-digit`,minute:`2-digit`})}`,`Período: ${t}`,``,`=== DRE DO MÊS ===`,`Faturamento: ${G(n.faturamento)}`,`(-) CMV (insumos): ${G(n.cmv)}`,`(-) Taxas de apps: ${G(n.taxas)}`,`Lucro bruto: ${G(n.lucroBruto)}`,`(-) Custos fixos: ${G(n.custosFixos)}`,`(-) Pró-labore: ${G(n.proLabore)}`,`(-) Outras saídas: ${G(n.outrasSaidas)}`,`Lucro líquido: ${G(n.lucroLiquido)} (${n.margem.toFixed(1)}%)`,``,`=== PEDIDOS DO MÊS ===`,`Cliente;Data;Canal;Itens;Valor;Sinal;Lucro`,...F.filter(e=>(e.dataEntrega||``).startsWith(t)).map(e=>{let t=ss(e),n=(e.itens||[]).map(e=>`${e.qtd}x ${e.nome}`).join(`, `);return`${e.cliente};${e.dataEntrega};${e.canal};${n};${e.valorTotal};${e.valorSinal};${t.lucro.toFixed(2)}`}),``,`=== LANÇAMENTOS DO CAIXA ===`,`Data;Tipo;Categoria;Descrição;Valor`,...I.filter(e=>(e.data||``).startsWith(t)).map(e=>`${e.data};${e.tipo};${e.categoria};${e.descricao};${e.valor}`),``,`=== ESTOQUE ATUAL ===`,`Insumo;Quantidade;Unidade;Custo unit.;Valor em estoque`,...N.map(e=>`${e.nome};${e.quantidade};${e.unidade};${gc(e).toFixed(2)};${(gc(e)*(Number(e.quantidade)||0)).toFixed(2)}`)],i=new Blob([r.join(`
`)],{type:`text/csv;charset=utf-8;`}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=`relatorio-contador-${t}.csv`,o.click(),URL.revokeObjectURL(a),q(`Relatório do contador baixado (CSV)!`)}function _s(){let e=Z(0),t=F.filter(t=>t.dataEntrega===e),n=t.reduce((e,t)=>e+(Number(t.valorTotal)||0),0),r=t.reduce((e,t)=>e+ss(t).lucro,0),i=I.filter(e=>e.tipo===`entrada`).reduce((e,t)=>e+Number(t.valor),0)-I.filter(e=>e.tipo===`saida`).reduce((e,t)=>e+Number(t.valor),0),a=N.filter(e=>(Number(e.quantidade)||0)<=(Number(e.alertaEstoqueMinimo)||0));Q(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-moon text-purple-600"></i> Fechamento do dia
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <div class="mt-4 space-y-4 text-sm">
      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Faturamento hoje</p>
          <p class="text-lg font-black text-emerald-700">${G(n)}</p>
        </div>
        <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-purple-700">Lucro hoje</p>
          <p class="text-lg font-black text-purple-700">${G(r)}</p>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-600">Saldo caixa</p>
          <p class="text-lg font-black ${i>=0?`text-emerald-700`:`text-red-600`}">${G(i)}</p>
        </div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <p class="text-xs font-bold text-slate-700 mb-1">📦 Pedidos de hoje (${t.length})</p>
        ${t.length===0?`<p class="text-[11px] text-slate-400">Nenhum pedido para hoje.</p>`:t.map(e=>`
          <div class="flex items-center justify-between text-[11px] py-1">
            <span class="text-slate-700">${e.cliente} • ${(e.itens||[]).map(e=>`${e.qtd}x ${e.nome}`).join(`, `)}</span>
            <span class="font-bold text-slate-900">${G(e.valorTotal)}</span>
          </div>`).join(``)}
      </div>
      <div class="p-3 rounded-xl ${a.length>0?`bg-amber-50 border-amber-200`:`bg-emerald-50 border-emerald-200`}">
        <p class="text-xs font-bold ${a.length>0?`text-amber-800`:`text-emerald-800`} mb-1">
          ${a.length>0?`⚠️ ${a.length} insumo(s) abaixo do mínimo`:`✅ Estoque OK`}
        </p>
        ${a.length===0?``:a.map(e=>`
          <p class="text-[11px] text-amber-900">• ${e.nome}: ${e.quantidade}${e.unidade} (mín. ${e.alertaEstoqueMinimo}${e.unidade})</p>`).join(``)}
      </div>
      <div class="flex justify-end gap-2 pt-2 border-t border-slate-200">
        <button onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-xs">Fechar</button>
        <button onclick="gerarRelatorioContador(); fecharModal();" class="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-700 text-white font-semibold text-xs">
          <i class="fa-solid fa-file-arrow-down"></i> Exportar relatório
        </button>
      </div>
    </div>
  `)}function vs(e){Ho=e===`propria`?`propria`:`plataforma`,localStorage.setItem(`confeitaria_plano_entrega`,Ho),U&&[`iFood`,`99Food`].includes(U.canal)&&(U.taxaCanal=Wo(U.canal)),Y()}var U={fichaId:`fic-2`,canal:`iFood`,taxaCanal:26.2,tipoDesconto:`percentual`,descontoPercentual:15,precoPromocionalFixo:80,brindeAtivo:!0,brindeTipo:`ficha`,brindeFichaId:`fic-3`,brindeNomeCustom:`Tag Artesanal + Fita de Cetim`,brindeCustoCustom:2.5,volumeVendasProjetado:30};U.taxaCanal=Wo(U.canal);var ys=!1,bs=`entrar`,xs=``;function Ss(e,t,n){let r=null,i=new Promise((e,i)=>{r=setTimeout(()=>i(Error(n||`tempo esgotado (`+t+`ms)`)),t)});return Promise.race([Promise.resolve(e).finally(()=>{r&&clearTimeout(r)}),i])}function Cs(){return new Promise(e=>setTimeout(e,30))}async function ws(){window.__appBooted=!0,ys=!0,Ds(),_o().catch(()=>{});let e=document.getElementById(`tab-dashboard`);e&&(e.innerHTML=`<div class="bg-white p-8 rounded-2xl border border-slate-200 text-center text-sm text-slate-500">Carregando dados do banco…</div>`),await Cs();try{await Ss(zs(),25e3,`banco demorou demais — usando dados locais`),Xs(),rc(),Ks(),Y()}catch(t){console.error(`Falha no boot, caindo para o cache local:`,t),window.__erroBoot=String(t&&t.message||t);try{Is(),Xs(),rc(),Ks(),Y(),q(`Falha ao iniciar (`+window.__erroBoot+`). Usando dados locais.`,!1)}catch(t){console.error(`Falha até no modo local:`,t),e&&(e.innerHTML=`
          <div class="bg-white p-8 rounded-2xl border border-red-200 text-center space-y-3">
            <p class="text-base font-bold text-red-700"><i class="fa-solid fa-triangle-exclamation"></i> Não consegui abrir o app</p>
            <p class="text-xs text-slate-600 font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">${K(String(t&&t.message||t))}</p>
            <div class="flex items-center justify-center gap-2 flex-wrap">
              <button onclick="window.location.reload()" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer">Recarregar</button>
            </div>
            <p class="text-[11px] text-slate-400">Se persistir, abra o console (F12) e me mande o erro em vermelho.</p>
          </div>`)}}}function Ts(){let e=document.getElementById(`loginScreen`);e&&(e.classList.remove(`hidden`),e.classList.add(`flex`)),Es()}async function Es(){let e=document.getElementById(`loginStatus`);if(e){if(!O){e.textContent=`Modo local: Supabase não configurado.`;return}e.textContent=`Verificando conexão…`;try{if((await fetch(za+`/auth/v1/health`,{headers:{apikey:Ba}})).ok){let t=new URL(za).hostname.split(`.`)[0];e.innerHTML=`Conectado a <strong>${K(t)}</strong> ✓`}else e.textContent=`Supabase respondeu com erro. Confira as chaves.`}catch{e.textContent=`Sem resposta do Supabase. Confira URL, internet e deploy.`}}}function Ds(){let e=document.getElementById(`loginScreen`);e&&(e.classList.add(`hidden`),e.classList.remove(`flex`))}function Os(){bs=bs===`entrar`?`criar`:`entrar`;let e=document.getElementById(`loginBtn`),t=document.getElementById(`loginSubtitulo`),n=document.getElementById(`loginAlternarTexto`),r=document.getElementById(`loginErro`);r&&r.classList.add(`hidden`),bs===`criar`?(e&&(e.textContent=`Criar conta`),t&&(t.textContent=`Crie sua conta — seus dados ficam isolados e privados`),n&&(n.textContent=`Já tem conta? Entrar`)):(e&&(e.textContent=`Entrar`),t&&(t.textContent=`Entre para acessar seus dados com segurança`),n&&(n.textContent=`Não tem conta? Criar agora`))}function ks(e){let t=String(e?.message||e||``);return console.error(`Auth falhou:`,e),t.includes(`Invalid login credentials`)?`E-mail ou senha incorretos.`:t.includes(`already registered`)||t.includes(`already exists`)?`Este e-mail já tem conta. Clique em Entrar.`:t.includes(`Password should be`)?`A senha precisa de ao menos 6 caracteres.`:t.includes(`Email not confirmed`)?`Confirme seu e-mail antes de entrar (ou desative a confirmação no Supabase).`:t.includes(`Signups not allowed`)?`Cadastro desativado no Supabase: ative "Allow new users" em Auth.`:t.includes(`Database error saving new user`)?`Erro ao criar usuário no banco (trigger de perfil?). Veja o console (F12).`:t.includes(`Failed to fetch`)||t.includes(`NetworkError`)?`Sem conexão com o Supabase. Confira URL/keys e a internet.`:t.includes(`Invalid API key`)?`Chave do Supabase inválida. Confira a anon key no .env / Vercel.`:t.includes(`rate limit`)||t.includes(`429`)?`Muitas tentativas. Aguarde 1 minuto e tente de novo.`:`Não foi possível autenticar (${t.slice(0,120)}). Veja o console (F12).`}async function As(e){e.preventDefault();let t=document.getElementById(`loginEmail`).value.trim(),n=document.getElementById(`loginSenha`).value,r=document.getElementById(`loginErro`),i=document.getElementById(`loginBtn`);r&&r.classList.add(`hidden`),i&&(i.disabled=!0,i.textContent=`Aguarde…`);try{if(bs===`criar`){if(!(await mo(t,n)).session)throw Error(`Conta criada! Verifique seu e-mail para confirmar e entre em seguida.`)}else await po(t,n);ys=!1,location.hash=`#/dashboard`,await uc()}catch(e){r&&(r.textContent=ks(e),r.classList.remove(`hidden`))}finally{i&&(i.disabled=!1,i.textContent=bs===`criar`?`Criar conta`:`Entrar`)}}async function js(){confirm(`Sair do sistema?`)&&($(),await ho().catch(()=>{}),Object.values(M).forEach(e=>localStorage.removeItem(e)),location.hash=`#/login`,window.location.reload())}function Ms(e){if(!e)return e;let t=Number(e.quantidade===void 0?e.estoqueAtual===void 0?0:e.estoqueAtual:e.quantidade)||0,n=Number(e.alertaEstoqueMinimo===void 0?e.estoqueMinimo===void 0?0:e.estoqueMinimo:e.alertaEstoqueMinimo)||0;return e.quantidade=t,e.estoqueAtual=t,e.alertaEstoqueMinimo=n,e.estoqueMinimo=n,e.nome=e.nome||`Insumo`,e.unidade=e.unidade||`g`,e.categoria=e.categoria||`Ingredientes`,e.precoPacote=Number(e.precoPacote)||0,e.qtdPacote=Number(e.qtdPacote)||1,e.kcal100=Number(e.kcal100)||0,e.carb100=Number(e.carb100)||0,e.acucar100=Number(e.acucar100)||0,e.prot100=Number(e.prot100)||0,e.gordTot100=Number(e.gordTot100)||0,e.gordSat100=Number(e.gordSat100)||0,e.gordTrans100=Number(e.gordTrans100)||0,e.fibra100=Number(e.fibra100)||0,e.sodio100=Number(e.sodio100)||0,e.alergenicos=e.alergenicos||``,e}var Ns=[{chave:[`acucar refinado`,`acucar cristal`,`acucar`],v:[387,99.5,99.5,.3,0,0,0,0,0],a:``},{chave:[`acucar mascavo`],v:[376,97.3,96,.4,0,0,0,0,28],a:``},{chave:[`farinha de trigo`,`farinha`],v:[360,75.1,1,9.8,1.4,.2,0,2.3,1],a:`Glúten`},{chave:[`chocolate meio amargo`,`meio amargo`],v:[540,56,48,4.9,35,20,0,7,11],a:`Soja`},{chave:[`chocolate ao leite`,`ao leite`],v:[540,59,55,7,32,19,0,2,100],a:`Leite, Soja`},{chave:[`chocolate branco`],v:[547,59,59,6,32,19,0,.5,110],a:`Leite, Soja`},{chave:[`cacau em po`,`cacau`],v:[300,45,10,20,13,8,0,30,20],a:``},{chave:[`manteiga`],v:[726,.1,.1,.4,82,52,3,0,580],a:`Leite`},{chave:[`margarina`],v:[720,.5,0,.2,80,20,0,0,700],a:`Leite, Soja`},{chave:[`ovo`],v:[143,1.6,1.6,13.3,8.9,2.8,0,0,126],a:`Ovos`},{chave:[`leite integral`,`leite de vaca`],v:[61,4.8,4.8,3.2,3.2,1.9,0,0,41],a:`Leite`},{chave:[`leite condensado`],v:[321,54.4,54.4,7.7,8.4,5,0,0,130],a:`Leite`},{chave:[`creme de leite`],v:[196,4.5,4.5,2.3,19.8,12,0,0,50],a:`Leite`},{chave:[`leite em po`],v:[496,38.3,38.3,26.4,26.8,16,0,0,370],a:`Leite, Soja`},{chave:[`fermento quimico`,`fermento em po`,`po royal`],v:[90,40,0,5,0,0,0,0,9e3],a:``},{chave:[`bicarbonato`],v:[0,0,0,0,0,0,0,0,27360],a:``},{chave:[`amendoim`],v:[582,20.4,4,27.2,46.9,6.5,0,8.7,5],a:`Amendoim`},{chave:[`coco ralado`,`coco seco`],v:[550,23,8,6,50,44,0,14,20],a:``},{chave:[`morango`],v:[30,6.8,4,.9,.3,.1,0,1.7,2],a:``}];function Ps(e){let t=nl(e||``);return t&&Ns.find(e=>e.chave.some(e=>t.includes(e)))||null}function Fs(){let e=Ps(document.getElementById(`insNome`)?.value||``);if(!e){q(`Sem referência para este nome. Preencha pelo rótulo.`,!1);return}[`insKcal`,`insCarb`,`insAcucar`,`insProt`,`insGordTot`,`insGordSat`,`insGordTrans`,`insFibra`,`insSodio`].forEach((t,n)=>{let r=document.getElementById(t);r&&(r.value=e.v[n])});let t=document.getElementById(`insAlergenicos`);t&&!t.value.trim()&&e.a&&(t.value=e.a),q(`Valores de referência preenchidos — confira com seu rótulo!`)}function Is(){let e=localStorage.getItem(M.INSUMOS);N=e?JSON.parse(e):[],N.forEach(Ms),P=JSON.parse(localStorage.getItem(M.FICHAS))||[],F=JSON.parse(localStorage.getItem(M.PEDIDOS))||[],I=JSON.parse(localStorage.getItem(M.LANCAMENTOS))||[],L=JSON.parse(localStorage.getItem(M.METAS))||{...vo},ko=JSON.parse(localStorage.getItem(M.PROMOCOES))||[],R=JSON.parse(localStorage.getItem(M.CLIENTES))||[],V={...Go,...JSON.parse(localStorage.getItem(M.MARCA)||`{}`)||{}},od(!1),Fo(),Sc++}function Ls(e){N=(e.insumos||[]).map(Ms),P=e.fichas||[],F=e.pedidos||[],I=e.lancamentos||[],L=e.metas||{...vo},ko=e.promocoes||[],R=e.clientes||[],V={...Go,...e.marca||{}},od(!1),Object.values(M).forEach(Vs),Sc++}function Rs(e){e===M.INSUMOS&&localStorage.setItem(M.INSUMOS,JSON.stringify(N)),e===M.FICHAS&&localStorage.setItem(M.FICHAS,JSON.stringify(P)),e===M.PEDIDOS&&localStorage.setItem(M.PEDIDOS,JSON.stringify(F)),e===M.LANCAMENTOS&&localStorage.setItem(M.LANCAMENTOS,JSON.stringify(I)),e===M.METAS&&localStorage.setItem(M.METAS,JSON.stringify(L)),e===M.PROMOCOES&&localStorage.setItem(M.PROMOCOES,JSON.stringify(ko)),e===M.CLIENTES&&localStorage.setItem(M.CLIENTES,JSON.stringify(R)),e===M.MARCA&&localStorage.setItem(M.MARCA,JSON.stringify(V))}async function zs(){if(O)try{Ls(await ao());return}catch(e){if(e&&e.message===`sem-sessao`){Ts();return}window.__erroBanco=String(e&&e.message||e),console.error(`Falha ao carregar do Supabase, usando cache local:`,e);let t=e&&e.message?e.message:``;/does not exist|schema cache|PGRST/i.test(t)?q(`Falta rodar uma migration no Supabase (detalhes no console).`,!1):/fetch|network|Failed to fetch/i.test(t)?q(`Sem internet: usando os dados locais.`,!1):q(`Não consegui ler o banco. Usando os dados locais.`,!1)}Is()}function Bs(){return{insumos:N,fichas:P,pedidos:F,lancamentos:I,metas:L,promocoes:ko,clientes:R,marca:V}}function W(e){e===M.INSUMOS&&N.forEach(Ms),Sc++,O?(Js(`salvando`),co(e,Bs()).then(()=>{Vs(e),Js(`ok`,`Salvo ✓ `+new Date().toLocaleTimeString(`pt-BR`,{hour:`2-digit`,minute:`2-digit`}))}).catch(e=>{console.error(`Falha ao salvar no Supabase:`,e);let t=String(e&&e.message||e);if(t===`sem-sessao`){Js(`erro`,`Entre na sua conta`),q(`Você não está logada. Entre na sua conta para salvar no banco.`,!1);try{Ts()}catch{}return}Js(`erro`,`Não salvou no banco`),q(`O banco recusou a gravação: `+t.slice(0,120),!1)})):(Vs(e),Js(`ok`,`Salvo ✓ (local)`)),Ks()}function Vs(e){try{Rs(e)}catch(e){console.warn(`Cache local não gravado (cota do navegador):`,e)}}function G(e){return(e||0).toLocaleString(`pt-BR`,{style:`currency`,currency:`BRL`})}function K(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function q(e,t=!0){let n=document.getElementById(`toast`),r=document.getElementById(`toastMsg`),i=document.getElementById(`toastIcon`);n&&(r.textContent=e,i.className=t?`fa-solid fa-circle-check text-emerald-400`:`fa-solid fa-circle-exclamation text-amber-400`,n.classList.remove(`translate-y-20`,`opacity-0`),n.classList.add(`translate-y-0`,`opacity-100`),setTimeout(()=>{n.classList.remove(`translate-y-0`,`opacity-100`),n.classList.add(`translate-y-20`,`opacity-0`)},2800))}function Hs(e){if(!e)return{needsRestock:!1,currentQuantity:0,minimumThreshold:0,falta:0,percentual:100,item:null};let t=Number(e.quantidade===void 0?e.estoqueAtual:e.quantidade)||0,n=Number(e.alertaEstoqueMinimo===void 0?e.estoqueMinimo:e.alertaEstoqueMinimo)||0,r=n>0?t<=n:t<=0;return{needsRestock:r,currentQuantity:t,minimumThreshold:n,falta:r?Number(Math.max(0,n-t).toFixed(2)):0,percentual:n>0?Math.round(t/n*100):100,item:e}}function Us(e){return Hs(e).needsRestock}function Ws(e=N){return(Array.isArray(e)?e:N).filter(e=>Us(e))}function Gs(e=N){return Ws(e).length}function Ks(){Gs(),jd()}var qs=null;function Js(e,t){let n=document.getElementById(`statusSalvo`);if(!n)return;let r={salvando:{icone:`fa-solid fa-spinner`,cor:`text-slate-400`,txt:`Salvando…`},ok:{icone:`fa-solid fa-check`,cor:`text-emerald-600`,txt:`Salvo`},erro:{icone:`fa-solid fa-triangle-exclamation`,cor:`text-amber-600`,txt:`Só no navegador`}},i=r[e]||r.salvando;n.className=`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap ${i.cor}`,n.innerHTML=`<i class="${i.icone} text-[10px] ${e===`salvando`?`fa-spin`:``}"></i><span>${t||i.txt}</span>`,qs&&clearTimeout(qs),e!==`salvando`&&(qs=setTimeout(()=>n.classList.add(`hidden`),e===`erro`?6e3:2500))}var Ys=!1;function Xs(){Ys=!1,ec()}function Zs(){Ys=!Ys,ec()}function Qs(){Ys=!0,ec()}function $s(){Ys=!1,ec()}function ec(){let e=document.getElementById(`sidebar`),t=document.getElementById(`sidebarBackdrop`),n=document.getElementById(`toggleSidebarBtn`);e&&(Ys?(document.body.classList.add(`sidebar-open`),document.body.classList.remove(`sidebar-closed`),e.classList.remove(`sidebar-collapsed`),e.classList.add(`sidebar-expanded`),t&&(window.innerWidth<1024?t.classList.remove(`hidden`):t.classList.add(`hidden`)),n&&(n.setAttribute(`title`,`Recolher Menu Lateral`),n.classList.add(`bg-pink-50`,`text-pink-600`,`border-pink-200`),n.classList.remove(`bg-slate-100`,`text-slate-700`,`border-slate-200`))):(document.body.classList.remove(`sidebar-open`),document.body.classList.add(`sidebar-closed`),e.classList.remove(`sidebar-expanded`),e.classList.add(`sidebar-collapsed`),t&&t.classList.add(`hidden`),n&&(n.setAttribute(`title`,`Abrir Menu Lateral`),n.classList.remove(`bg-pink-50`,`text-pink-600`,`border-pink-200`),n.classList.add(`bg-slate-100`,`text-slate-700`,`border-slate-200`))))}window.addEventListener(`resize`,()=>{let e=document.getElementById(`sidebarBackdrop`);window.innerWidth>=1024&&e&&e.classList.add(`hidden`)});function J(e){z=e;let t=`#/`+e;location.hash!==t&&(cc=!0,location.hash=t),Nd(),document.querySelectorAll(`.tab-content`).forEach(e=>{e.classList.add(`hidden`),e.classList.remove(`tab-enter`)}),document.querySelectorAll(`.tab-btn`).forEach(e=>{e.classList.remove(`active`,`bg-pink-600`,`text-white`,`shadow-xs`),e.classList.add(`text-slate-700`,`hover:text-slate-900`,`hover:bg-slate-100`)});let n=document.getElementById(`tab-${e}`),r=document.getElementById(`tabBtn-${e}`);n&&(n.classList.remove(`hidden`),n.offsetWidth,n.classList.add(`tab-enter`)),r&&(r.classList.add(`active`,`bg-pink-600`,`text-white`,`shadow-xs`),r.classList.remove(`text-slate-700`,`hover:text-slate-900`,`hover:bg-slate-100`)),window.innerWidth<1024&&$s(),ac(e),Y()}var tc={producao:{chave:`confeitaria_grupo_producao`,abas:[`estoque`,`fichas`,`mrp`]},vendas:{chave:`confeitaria_grupo_vendas`,abas:[`pedidos`,`cardapio`,`clientes`,`promocoes`,`marca`]},financeiro:{chave:`confeitaria_grupo_financeiro`,abas:[`caixa`,`dre`,`relatorios`]}};function nc(e){let t=tc[e];return!t||localStorage.getItem(t.chave)!==`fechado`}function rc(){Object.keys(tc).forEach(e=>{let t=document.querySelector(`[data-grupo-body="${e}"]`),n=document.querySelector(`[data-chevron="${e}"]`),r=document.getElementById(`grupoHeader-${e}`),i=nc(e);t&&t.classList.toggle(`hidden`,!i),n&&(n.style.transform=i?``:`rotate(-90deg)`),r&&r.setAttribute(`aria-expanded`,i?`true`:`false`)})}function ic(e){let t=tc[e];t&&(localStorage.setItem(t.chave,nc(e)?`fechado`:`aberto`),rc())}function ac(e){Object.keys(tc).forEach(t=>{tc[t].abas.includes(e)&&localStorage.setItem(tc[t].chave,`aberto`)}),rc()}var oc=[`dashboard`,`estoque`,`fichas`,`pedidos`,`clientes`,`mrp`,`caixa`,`promocoes`,`dre`,`relatorios`,`cardapio`,`marca`],sc={login:`Entrar`,dashboard:`Visão Geral`,estoque:`Estoque`,fichas:`Fichas Técnicas`,pedidos:`Pedidos`,clientes:`Clientes`,mrp:`Previsão de Compras`,caixa:`Livro Caixa`,promocoes:`Promoções`,dre:`DRE do Mês`,relatorios:`Relatórios`,cardapio:`Cardápio`,marca:`Marca`},cc=!1;function lc(){let e=(location.hash||``).replace(/^#\/?/,``).split(`?`)[0];return e===`login`?`login`:oc.includes(e)?e:`dashboard`}window.addEventListener(`hashchange`,()=>{if(cc){cc=!1;return}uc()});async function uc(){let e=lc();if(document.title=`${sc[e]||`Visão Geral`} • Gestão de Confeitaria`,e===`login`){if(O){let e=await fo().catch(()=>null);if(e){xs=go(e),location.hash!==`#/dashboard`&&(cc=!0,location.hash=`#/dashboard`),Ds(),ys?z!==`dashboard`&&J(`dashboard`):(z=`dashboard`,await ws());return}}Ts(),window.scrollTo(0,0);return}if(O){let e=await fo().catch(()=>null);if(!e){Ts(),location.hash!==`#/login`&&(cc=!0,location.hash=`#/login`);return}xs=go(e)}Ds(),ys?e!==z&&J(e):(z=e,await ws()),window.scrollTo(0,0)}var dc={estoque:{pagina:1,porPagina:12},clientes:{pagina:1,porPagina:9},caixa:{pagina:1,porPagina:12},fichas:{pagina:1,porPagina:6}};function fc(e,t){let n=dc[e],r=Math.max(1,Math.ceil(t.length/n.porPagina));n.pagina>r&&(n.pagina=r),n.pagina<1&&(n.pagina=1);let i=(n.pagina-1)*n.porPagina;return{itens:t.slice(i,i+n.porPagina),total:r,atual:n.pagina}}function pc(e,t,n){if(t<=1)return``;let r=[];for(let e=1;e<=t;e++)e===1||e===t||Math.abs(e-n)<=1?r.push(e):r[r.length-1]!==`…`&&r.push(`…`);let i=`min-w-8 h-8 px-2 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer`;return`<div class="flex items-center justify-center gap-1.5 py-4 flex-wrap">
    <button ${n<=1?`disabled`:`onclick="irPagina('${e}', ${n-1})"`} class="${i} bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-default" aria-label="Página anterior">‹</button>
    ${r.map(t=>t===`…`?`<span class="text-xs text-slate-400 px-1">…</span>`:`<button onclick="irPagina('${e}', ${t})" class="${i} ${t===n?`text-white shadow-xs`:`bg-white border border-slate-200 text-slate-600 hover:bg-slate-100`}" ${t===n?`style="background:linear-gradient(135deg,#D96C75,#C65D3A)"`:``}>${t}</button>`).join(``)}
    <button ${n>=t?`disabled`:`onclick="irPagina('${e}', ${n+1})"`} class="${i} bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-default" aria-label="Próxima página">›</button>
  </div>`}var mc={estoque:()=>al(),clientes:()=>ld(),caixa:()=>ou(),fichas:()=>bl()};function hc(e,t){dc[e].pagina=t,mc[e]()}function Y(){z===`dashboard`&&qc(),z===`estoque`&&ol(),z===`fichas`&&bl(),z===`pedidos`&&Vl(),z===`mrp`&&nu(),z===`caixa`&&ou(),z===`clientes`&&ld(),z===`promocoes`&&Iu(),z===`dre`&&au(),z===`relatorios`&&Yc(),z===`cardapio`&&Fu(),z===`marca`&&as()}function gc(e){return!e||!e.qtdPacote||e.qtdPacote<=0?0:e.precoPacote/e.qtdPacote}function X(e){return!e||!e.ingredientes?0:e.ingredientes.reduce((e,t)=>{let n=N.find(e=>e.id===t.insumoId||t.nome&&e.nome&&e.nome.toLowerCase()===t.nome.toLowerCase());return n?e+gc(n)*(Number(t.qtd)||0):e},0)}var _c={purple:`bg-purple-100 text-purple-700`,pink:`bg-pink-100 text-pink-700`,rose:`bg-rose-100 text-rose-700`,amber:`bg-amber-100 text-amber-700`,blue:`bg-blue-100 text-blue-700`,emerald:`bg-emerald-100 text-emerald-700`,cyan:`bg-cyan-100 text-cyan-700`,slate:`bg-slate-100 text-slate-700`,red:`bg-red-100 text-red-700`};function vc(e,t=0){let n=X(e),r=Number(e?.rendimento)>0?Number(e.rendimento):1,i=n/r,a=Math.min(.9,Math.max(0,(Number(e?.margemAlvo)||60)/100)),o=Math.min(.9,Math.max(0,(Number(t)||0)/100)),s=(1-a)*(1-o),c=s>0?n/s:n*2.5,l=c/r,u=Number(e?.precoPraticado)||0,d=u>0?u:c,f=d>0?(d-n-d*o)/d*100:0;return{cmvTotal:n,cmvUnit:i,rendimento:r,margem:a*100,taxa:o*100,precoTotal:c,precoUnit:l,precoPraticado:u,margemReal:f}}var yc=new Date().toISOString().slice(0,7);function bc(e){e&&(yc=e),z===`dre`?au():ou()}function xc(e){let t=e||yc,n=F.filter(e=>(e.dataEntrega||``).startsWith(t)),r=0,i=0,a=0;n.forEach(e=>{let t=Dc(e);r+=t.total,i+=t.cmvTotal,a+=t.taxaApp});let o=I.filter(e=>(e.data||``).startsWith(t)),s=o.filter(e=>e.tipo===`entrada`).reduce((e,t)=>e+(Number(t.valor)||0),0),c=o.filter(e=>e.tipo===`saida`&&e.categoria===`Compra de Insumos`).reduce((e,t)=>e+(Number(t.valor)||0),0),l=(Number(L.custosFixosMensais)||0)+o.filter(e=>e.tipo===`saida`&&e.categoria===`Custo Fixo`).reduce((e,t)=>e+(Number(t.valor)||0),0),u=o.filter(e=>e.categoria===`Pró-Labore`).reduce((e,t)=>e+(Number(t.valor)||0),0),d=o.filter(e=>e.tipo===`saida`&&![`Compra de Insumos`,`Custo Fixo`,`Pró-Labore`].includes(e.categoria)).reduce((e,t)=>e+(Number(t.valor)||0),0),f=r-i-a,p=r-i-a-l-u-d,m=r>0?p/r*100:0;return{prefix:t,qtdPedidos:n.length,faturamento:r,cmv:i,taxas:a,lucroBruto:f,custosFixos:l,saidasInsumos:c,proLabore:u,outrasSaidas:d,entradasCaixa:s,lucroLiquido:p,margem:m}}var Sc=0,Cc={versao:-1,mapa:{}},wc=null,Tc=-1;function Ec(){return wc&&Tc===Sc?wc:(wc={},I.forEach(e=>{e.pedidoId&&(wc[e.pedidoId]=wc[e.pedidoId]||[]).push(e)}),Tc=Sc,wc)}function Dc(e){let t=e&&e.id;if(t){if(Cc.versao!==Sc&&(Cc={versao:Sc,mapa:{}}),Cc.mapa[t])return Cc.mapa[t];let n=Oc(e);return Cc.mapa[t]=n,n}return Oc(e)}function Oc(e){let t=Number(e.valorTotal)||0,n=0;e.itens&&e.itens.length>0&&e.itens.forEach(e=>{let t=P.find(t=>t.id===e.fichaId||e.nome&&t.nome&&t.nome.toLowerCase()===e.nome.toLowerCase());if(t){let r=Number(t.rendimento)>0?Number(t.rendimento):1,i=X(t)/r;n+=i*(Number(e.qtd)||1)}});let r=t*((Number(e.taxaPercentual)||0)/100),i=t-n-r;return{total:t,sinal:Number(e.valorSinal)||0,restante:t-(Number(e.valorSinal)||0),cmvTotal:n,taxaApp:r,lucroLiquido:i}}function kc(e){if(!e||!e.itens)return[];let t={};return e.itens.forEach(e=>{let n=P.find(t=>t.id===e.fichaId||e.nome&&t.nome&&t.nome.toLowerCase()===e.nome.toLowerCase());if(n&&n.ingredientes){let r=Number(n.rendimento)>0?Number(n.rendimento):1,i=(Number(e.qtd)||1)/r;n.ingredientes.forEach(e=>{let n=N.find(t=>t.id===e.insumoId||e.nome&&t.nome&&t.nome.toLowerCase()===e.nome.toLowerCase());n&&(t[n.id]||(t[n.id]={insumoId:n.id,nome:n.nome,unidade:n.unidade,qtdConsumo:0,estoqueAtual:Number(n.estoqueAtual)||0,estoqueMinimo:Number(n.estoqueMinimo)||0}),t[n.id].qtdConsumo+=(Number(e.qtd)||0)*i)})}}),Object.values(t)}function Ac(e,t){let n=Number(e)||0;return`${(n>=100?n.toFixed(0):n>=10?n.toFixed(1):n.toFixed(2)).replace(`.`,`,`).replace(/,0+$/,``).replace(/(\,\d)0$/,`$1`)}${t?K(t):``}`}var jc={chave:null,valor:null};function Mc(e=7){try{let t=e+`|`+F.length+`|`+P.length+`|`+N.length+`|`+F.map(e=>`${e.id}:${e.status}:${e.dataEntrega||``}:${+!!e.estoqueBaixado}:${(e.itens||[]).map(e=>`${e.fichaId||e.nome}:${e.qtd}`).join(`,`)}`).join(`;`)+`|`+P.map(e=>`${e.id}:${e.rendimento||1}:${(e.ingredientes||[]).map(e=>`${e.insumoId}:${e.qtd}`).join(`,`)}`).join(`;`)+`|`+N.map(e=>`${e.id}:${Number(e.estoqueAtual??e.quantidade)||0}`).join(`;`);if(jc.chave===t&&jc.valor)return jc.valor;let n=Nc(e);return jc={chave:t,valor:n},n}catch{return Nc(e)}}function Nc(e=7){let t=Z(0),n=Z(e-1),r=F.filter(e=>e.status!==`pronto`&&!e.estoqueBaixado&&(!e.dataEntrega||e.dataEntrega<=n)),i={},a=new Set;r.forEach(e=>{let n=!e.dataEntrega||e.dataEntrega<t?t:e.dataEntrega;a.add(n),(e.itens||[]).forEach(t=>{let r=P.find(e=>e.id===t.fichaId||t.nome&&e.nome&&e.nome.toLowerCase()===t.nome.toLowerCase());if(!r||!r.ingredientes)return;let a=Number(r.rendimento)>0?Number(r.rendimento):1,o=(Number(t.qtd)||1)/a;r.ingredientes.forEach(t=>{let r=N.find(e=>e.id===t.insumoId||t.nome&&e.nome&&e.nome.toLowerCase()===t.nome.toLowerCase());if(!r)return;i[r.id]||(i[r.id]={insumo:r,porDia:{},total:0,pedidosIds:new Set});let a=(Number(t.qtd)||0)*o;i[r.id].porDia[n]=(i[r.id].porDia[n]||0)+a,i[r.id].total+=a,i[r.id].pedidosIds.add(e.id)})})});let o=[];return Object.values(i).forEach(({insumo:t,porDia:n,total:r,pedidosIds:i})=>{let a=Number(t.estoqueAtual??t.quantidade)||0,s=Number(t.alertaEstoqueMinimo??t.estoqueMinimo)||0,c=a-r,l=0,u=null;for(let t=0;t<e;t++){let e=Z(t);if(l+=n[e]||0,l>a){u=e;break}}let d=Math.max(0,r-a),f=Number(t.qtdPacote)>0?Number(t.qtdPacote):1,p=d>0?Math.ceil(d/f):0,m=gc(t),h=c<0;(h||!h&&c<s)&&o.push({insumoId:t.id,nome:t.nome,unidade:t.unidade||`g`,estoque:a,minimo:s,total:r,saldoProjetado:c,deficit:d,diaRupturaISO:u,critico:h,pedidosAfetados:i.size,pacotesSugeridos:p,qtdPacote:f,custoEstimado:p*(Number(t.precoPacote)||m*f)})}),o.sort((e,t)=>e.critico===t.critico?e.critico&&t.critico?(e.diaRupturaISO||``).localeCompare(t.diaRupturaISO||``):e.saldoProjetado-t.saldoProjetado:e.critico?-1:1),{alertas:o,totalPedidos:r.length,diasComProducao:a.size,alcance:e}}function Pc(e){if(!e.diaRupturaISO)return`estoque insuficiente`;let t=e.diaRupturaISO;return t===Z(0)?`acaba hoje`:t===Z(1)?`acaba amanhã`:`termina ${[`domingo`,`segunda`,`terça`,`quarta`,`quinta`,`sexta`,`sábado`][new Date(t+`T12:00:00`).getDay()]} (${t.split(`-`).reverse().slice(0,2).join(`/`)})`}function Fc(e){let t=F.find(t=>t.id===e);if(!t)return;let n=kc(t),r=n.length>0,i=n.some(e=>e.estoqueAtual-e.qtdConsumo<0);Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-boxes-packing"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">
            ${t.estoqueBaixado?`Status da Baixa de Estoque`:`Confirmar Baixa de Estoque`}
          </h3>
          <p class="text-xs text-slate-500">
            Pedido #${t.id} • Cliente: <strong>${t.cliente}</strong>
          </p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <div class="mt-4 space-y-4 text-sm">
      <!-- Resumo dos itens do pedido -->
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
        <p class="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">Itens do Pedido:</p>
        <ul class="space-y-0.5 text-slate-600">
          ${(t.itens||[]).map(e=>`
            <li class="flex items-center justify-between">
              <span>• <strong>${e.qtd}x</strong> ${e.nome}</span>
              <span class="text-slate-400">${G((e.qtd||1)*(e.precoUnit||0))}</span>
            </li>
          `).join(``)}
        </ul>
      </div>

      ${t.estoqueBaixado?`
        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
            <div>
              <p class="font-bold text-xs">Baixa de estoque já efetuada</p>
              <p class="text-[11px] text-emerald-700">
                ${t.dataBaixaEstoque?`Data da baixa: ${new Date(t.dataBaixaEstoque).toLocaleString(`pt-BR`)}`:`Os insumos correspondentes já foram debitados do estoque.`}
              </p>
            </div>
          </div>
          <button onclick="estornarEstoquePedido('${t.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer shadow-2xs">
            <i class="fa-solid fa-rotate-left mr-1"></i> Estornar Estoque
          </button>
        </div>
      `:``}

      ${i&&!t.estoqueBaixado?`
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-2.5 text-xs">
          <i class="fa-solid fa-triangle-exclamation text-amber-600 text-base shrink-0 mt-0.5"></i>
          <div>
            <p class="font-bold">Atenção: Saldo de insumo insuficiente</p>
            <p class="text-[11px] text-amber-700 mt-0.5">
              Um ou mais ingredientes ficarão com saldo negativo. O sistema permite confirmar a baixa para manter o registro real do consumo.
            </p>
          </div>
        </div>
      `:``}

      <!-- Tabela de Insumos a Serem Debitados -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-bold text-slate-700 uppercase tracking-wider">Insumos que serão consumidos:</p>
          <span class="text-[11px] text-slate-400">${n.length} ingredientes</span>
        </div>

        ${r?`
          <div class="overflow-x-auto border border-slate-200 rounded-xl max-h-56 overflow-y-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0">
                <tr>
                  <th class="p-2.5">Insumo</th>
                  <th class="p-2.5 text-center">Consumo</th>
                  <th class="p-2.5 text-center">Estoque Atual</th>
                  <th class="p-2.5 text-center">Novo Saldo</th>
                  <th class="p-2.5 text-center">Situação</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${n.map(e=>{let t=Number((e.estoqueAtual-e.qtdConsumo).toFixed(3)),n=t<0,r=t<=e.estoqueMinimo;return`
                    <tr class="hover:bg-slate-50/60">
                      <td class="p-2.5 font-semibold text-slate-800">${e.nome}</td>
                      <td class="p-2.5 text-center font-bold text-pink-600">
                        -${e.qtdConsumo.toFixed(2)} ${e.unidade}
                      </td>
                      <td class="p-2.5 text-center text-slate-500">
                        ${e.estoqueAtual.toFixed(2)} ${e.unidade}
                      </td>
                      <td class="p-2.5 text-center font-bold ${n?`text-red-600`:r?`text-amber-600`:`text-emerald-600`}">
                        ${t.toFixed(2)} ${e.unidade}
                      </td>
                      <td class="p-2.5 text-center">
                        ${n?`
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">Insuficiente</span>
                        `:r?`
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">Ficará Baixo</span>
                        `:`
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Disponível</span>
                        `}
                      </td>
                    </tr>
                  `}).join(``)}
              </tbody>
            </table>
          </div>
        `:`
          <div class="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500 border border-dashed border-slate-200">
            Nenhum ingrediente configurado nas fichas técnicas para os itens deste pedido.
          </div>
        `}
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs cursor-pointer">
          Fechar
        </button>
        ${!t.estoqueBaixado&&r?`
          <button 
            type="button" 
            onclick="darBaixaEstoquePedido('${t.id}')" 
            class="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <i class="fa-solid fa-check-double"></i> Confirmar Baixa no Estoque
          </button>
        `:``}
      </div>
    </div>
  `)}function Ic(e){let t=F.find(t=>t.id===e);if(!t)return;if(t.estoqueBaixado){q(`O estoque deste pedido já foi baixado anteriormente!`,!1),$();return}let n=kc(t);if(n.length===0){q(`Este pedido não possui ingredientes vinculados para baixa.`,!1),$();return}let r=0;n.forEach(e=>{let t=N.find(t=>t.id===e.insumoId);if(t){let n=Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0,i=Number((n-e.qtdConsumo).toFixed(3));t.estoqueAtual=i,t.quantidade=i,r++}}),t.estoqueBaixado=!0,t.dataBaixaEstoque=new Date().toISOString(),W(M.INSUMOS),W(M.PEDIDOS),Ks(),$(),q(`Baixa de estoque realizada! ${r} insumos debitados.`),Y()}function Lc(e){let t=F.find(t=>t.id===e);if(!t)return;if(!t.estoqueBaixado){q(`Este pedido ainda não teve baixa de estoque realizada!`,!1);return}if(!confirm(`Deseja realmente estornar os insumos do pedido de "${t.cliente}" de volta ao estoque físico?`))return;let n=kc(t),r=0;n.forEach(e=>{let t=N.find(t=>t.id===e.insumoId);if(t){let n=Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0,i=Number((n+e.qtdConsumo).toFixed(3));t.estoqueAtual=i,t.quantidade=i,r++}}),t.estoqueBaixado=!1,delete t.dataBaixaEstoque,W(M.INSUMOS),W(M.PEDIDOS),Ks(),$(),q(`Estorno concluído! Insumos de "${t.cliente}" devolvidos ao estoque.`),Y()}function Rc(e){return e&&Ec()[e]||[]}function zc(e){if(!e)return{totalLancado:0,valorLiquidoEsperado:0,saldoPendente:0,status:`pendente`,lancamentos:[]};let t=Dc(e),n=Number((t.total-t.taxaApp).toFixed(2)),r=Rc(e.id),i=Number(r.filter(e=>e.tipo===`entrada`).reduce((e,t)=>e+(Number(t.valor)||0),0).toFixed(2)),a=Number(Math.max(0,n-i).toFixed(2)),o=`pendente`;return i>=n&&n>0?o=`quitado`:i>0&&(o=`parcial`),{totalLancado:i,valorLiquidoEsperado:n,saldoPendente:a,status:o,lancamentos:r}}function Bc(e,t=null){let n=F.find(t=>t.id===e);if(!n)return;let r=Dc(n),i=zc(n),a=Number(n.valorSinal)||0,o=i.saldoPendente,s=`Venda Pedido #${n.id} - ${n.cliente}`;t===`sinal`||i.totalLancado===0&&a>0?(o=a,s=`Sinal Pedido #${n.id} - ${n.cliente}`):t===`restante`||i.totalLancado>0&&i.saldoPendente>0?(o=i.saldoPendente,s=`Restante Pedido #${n.id} - ${n.cliente}`):i.status===`quitado`&&(o=0);let c=n.canal===`iFood`||n.canal===`99Food`?`Repasse App`:`PIX`;Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-cash-register"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">
            Lançar Recebimento no Caixa
          </h3>
          <p class="text-xs text-slate-500">
            Pedido #${n.id} • Cliente: <strong>${n.cliente}</strong> (${n.canal||`Balcão`})
          </p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <div class="mt-4 space-y-4 text-sm">
      <!-- Card Resumo Financeiro do Pedido -->
      <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
        <div class="flex items-center justify-between font-bold text-slate-800">
          <span>Valor Total Bruto:</span>
          <span>${G(r.total)}</span>
        </div>
        ${r.taxaApp>0?`
          <div class="flex items-center justify-between text-red-500 font-semibold">
            <span>Taxa do Canal (${n.taxaPercentual}%):</span>
            <span>-${G(r.taxaApp)}</span>
          </div>
        `:``}
        <div class="flex items-center justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
          <span>Valor Líquido a Receber:</span>
          <span class="text-teal-700 font-extrabold text-sm">${G(i.valorLiquidoEsperado)}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[11px]">
          <div>
            <span class="text-slate-500 block">Já Lançado no Caixa:</span>
            <span class="font-bold text-emerald-600">${G(i.totalLancado)}</span>
          </div>
          <div class="text-right">
            <span class="text-slate-500 block">Saldo Pendente:</span>
            <span class="font-bold ${i.saldoPendente>0?`text-amber-600`:`text-slate-400`}">${G(i.saldoPendente)}</span>
          </div>
        </div>
      </div>

      <!-- Lançamentos Existentes Deste Pedido -->
      ${i.lancamentos.length>0?`
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <p class="text-xs font-bold text-slate-700 uppercase tracking-wider">Lançamentos já feitos no Caixa:</p>
            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">${i.lancamentos.length} registro(s)</span>
          </div>
          <div class="divide-y divide-slate-100 border border-slate-200 rounded-xl max-h-32 overflow-y-auto text-xs bg-white">
            ${i.lancamentos.map(e=>`
              <div class="p-2.5 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p class="font-semibold text-slate-800">${e.descricao}</p>
                  <p class="text-[10px] text-slate-500">${e.data} • Forma: ${e.forma}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-emerald-600">+${G(e.valor)}</span>
                  <button onclick="excluirLancamento('${e.id}')" title="Excluir este lançamento" class="text-slate-400 hover:text-red-600 p-1 cursor-pointer">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              </div>
            `).join(``)}
          </div>
        </div>
      `:``}

      <!-- Formulário de Novo Lançamento -->
      <form id="formLancarCaixaPedido" onsubmit="confirmarLancarPedidoNoCaixa(event, '${n.id}')" class="space-y-3 pt-1">
        <div class="flex items-center justify-between">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Novo Lançamento:</label>
          <!-- Atalhos Rápidos -->
          <div class="flex items-center gap-1.5">
            ${a>0&&i.totalLancado<a?`
              <button 
                type="button" 
                onclick="definirValoresRapidosLancarCaixa(${a}, '${n.id}', 'sinal')"
                class="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 cursor-pointer"
              >
                Sinal (${G(a)})
              </button>
            `:``}
            ${i.saldoPendente>0?`
              <button 
                type="button" 
                onclick="definirValoresRapidosLancarCaixa(${i.saldoPendente}, '${n.id}', '${i.totalLancado>0?`restante`:`total`}')"
                class="px-2 py-0.5 text-[10px] font-bold rounded bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 cursor-pointer"
              >
                ${i.totalLancado>0?`Restante`:`Quitar`} (${G(i.saldoPendente)})
              </button>
            `:``}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Data do Recebimento</label>
            <input type="date" id="lanPedData" value="${new Date().toISOString().split(`T`)[0]}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-teal-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Forma de Pagamento</label>
            <select id="lanPedForma" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-teal-500">
              <option value="PIX" ${c===`PIX`?`selected`:``}>PIX</option>
              <option value="Dinheiro">Dinheiro em Espécie</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="Repasse App" ${c===`Repasse App`?`selected`:``}>Repasse App (${n.canal||`App`})</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="col-span-2">
            <label class="block text-xs font-semibold text-slate-700 mb-1">Descrição</label>
            <input type="text" id="lanPedDescricao" value="${K(s)}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-teal-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Valor a Entrar (R$)</label>
            <input type="number" step="0.01" id="lanPedValor" value="${o.toFixed(2)}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold text-xs focus:outline-teal-500" />
          </div>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-200">
          <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs cursor-pointer">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-check"></i> Confirmar Lançamento no Caixa
          </button>
        </div>
      </form>
    </div>
  `)}function Vc(e,t,n){let r=document.getElementById(`lanPedValor`),i=document.getElementById(`lanPedDescricao`),a=F.find(e=>e.id===t),o=n===`sinal`?`Sinal`:n===`restante`?`Restante`:`Total`;r&&(r.value=Number(e).toFixed(2)),i&&(i.value=`${o} Pedido #${t} - ${a?a.cliente:``}`)}function Hc(e,t){e.preventDefault();let n=F.find(e=>e.id===t);if(!n)return;let r=document.getElementById(`lanPedData`).value,i=document.getElementById(`lanPedForma`).value,a=document.getElementById(`lanPedDescricao`).value.trim(),o=Number(document.getElementById(`lanPedValor`).value)||0;if(o<=0){alert(`Informe um valor válido maior que zero para o lançamento!`);return}let s={id:`lan-`+Date.now(),pedidoId:n.id,data:r,tipo:`entrada`,categoria:`Venda de Pedido`,forma:i,descricao:a||`Venda Pedido #${n.id} - ${n.cliente}`,valor:o};I.unshift(s),W(M.LANCAMENTOS),$(),q(`Recebimento de ${G(o)} lançado no Caixa!`),Y()}function Uc(e){Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">Registrar Compra de Insumos no Caixa</h3>
          <p class="text-xs text-slate-500">Lançamento de despesa gerada pela lista de compras do MRP</p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <form onsubmit="confirmarLancarCompraMRPCaixa(event)" class="mt-4 space-y-3 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Data da Compra</label>
          <input type="date" id="lanMRPData" value="${new Date().toISOString().split(`T`)[0]}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-red-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Forma de Pagamento</label>
          <select id="lanMRPForma" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-red-500">
            <option value="PIX">PIX</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Descrição</label>
        <input type="text" id="lanMRPDescricao" value="Compra de insumos p/ encomendas ativas (MRP)" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-red-500" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Valor Total Pago (R$)</label>
        <input type="number" step="0.01" id="lanMRPValor" value="${Number(e||0).toFixed(2)}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold text-sm focus:outline-red-500" />
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs cursor-pointer">
          Cancelar
        </button>
        <button type="submit" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
          <i class="fa-solid fa-arrow-up-long"></i> Lançar Saída no Caixa
        </button>
      </div>
    </form>
  `)}function Wc(e){e.preventDefault();let t=document.getElementById(`lanMRPData`).value,n=document.getElementById(`lanMRPForma`).value,r=document.getElementById(`lanMRPDescricao`).value.trim(),i=Number(document.getElementById(`lanMRPValor`).value)||0;if(i<=0){alert(`Informe um valor válido maior que zero!`);return}I.unshift({id:`lan-`+Date.now(),data:t,tipo:`saida`,categoria:`Compra de Insumos`,forma:n,descricao:r,valor:i}),W(M.LANCAMENTOS),$(),q(`Despesa de ${G(i)} lançada no Caixa!`),Y()}function Gc(e){return localStorage.getItem(`confeitaria_bloco_${e}`)!==`fechado`}function Kc(){document.querySelectorAll(`[data-bloco-toggle]`).forEach(e=>{e.dataset.ligado!==`1`&&(e.dataset.ligado=`1`,e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.blocoToggle,r=document.querySelector(`[data-bloco-body="`+n+`"]`);if(!r)return;let i=!r.classList.contains(`hidden`);r.classList.toggle(`hidden`,i);let a=e.querySelector(`i`);a&&(a.style.transform=i?`rotate(-90deg)`:``),e.title=i?`Expandir bloco`:`Recolher bloco`,localStorage.setItem(`confeitaria_bloco_`+n,i?`fechado`:`aberto`)}))}),document.querySelectorAll(`[data-bloco]`).forEach(e=>{let t=e.dataset.bloco,n=document.querySelector(`[data-bloco-body="`+t+`"]`),r=document.querySelector(`[data-bloco-toggle="`+t+`"]`);if(!n||!r||Gc(t))return;n.classList.add(`hidden`);let i=r.querySelector(`i`);i&&(i.style.transform=`rotate(-90deg)`)})}function qc(){let e=document.getElementById(`tab-dashboard`);if(!e)return;let t=F.reduce((e,t)=>e+(Number(t.valorTotal)||0),0),n=F.reduce((e,t)=>e+(Number(t.valorSinal)||0),0),r=Math.max(0,t-n),i=F.length,a=F.filter(e=>e.status===`aguardando`).length,o=F.filter(e=>e.status===`a_produzir`).length,s=F.filter(e=>e.status===`producao`).length,c=F.filter(e=>e.status===`pronto`).length,l=a+o+s,u=i>0?t/i:0,d=0,f=0,p=0;F.forEach(e=>{let t=Dc(e);d+=t.cmvTotal,f+=t.taxaApp,p+=t.lucroLiquido});let m=Number(L.custosFixosMensais??0),h=d+f+m,g=t>0?d/t*100:0,ee=t>0?f/t*100:0,te=I.filter(e=>e.tipo===`saida`).reduce((e,t)=>e+(Number(t.valor)||0),0),_=I.filter(e=>e.tipo===`entrada`).reduce((e,t)=>e+(Number(t.valor)||0),0)-te,ne=t-d-f-m,v=t>0?ne/t*100:0,re=N.reduce((e,t)=>e+gc(t)*(Number(t.estoqueAtual)||0),0),ie=N.filter(e=>(Number(e.estoqueAtual)||0)<=(Number(e.estoqueMinimo)||0)),ae=Number(L.faturamentoMensal??0),oe=Number(L.faturamentoAnual??0),se=ae>0?Math.min(100,Math.round(t/ae*100)):0;Math.max(0,ae-t);let ce=u>0?u:85,le=Math.ceil(ae/ce);Math.ceil(oe/ce),Math.max(0,le-i);let ue=ae*(Number(L.cmvMedioPercentual??0)/100),de=ae*(Number(L.taxaAppMediaPercentual??0)/100),fe=Math.max(0,ae-ue-de-m),pe={WhatsApp:{nome:`WhatsApp / Venda Direta`,pedidos:0,faturamento:0,taxa:0,cor:`bg-emerald-500`,icone:`fa-whatsapp`},iFood:{nome:`iFood Delivery`,pedidos:0,faturamento:0,taxa:0,cor:`bg-red-500`,icone:`fa-motorcycle`},"99Food":{nome:`99Food / Outros Apps`,pedidos:0,faturamento:0,taxa:0,cor:`bg-amber-500`,icone:`fa-utensils`},Balcão:{nome:`Balcão / Encomenda`,pedidos:0,faturamento:0,taxa:0,cor:`bg-blue-500`,icone:`fa-store`}};F.forEach(e=>{let t=e.canal||`WhatsApp`;pe[t]||(pe[t]={nome:t,pedidos:0,faturamento:0,taxa:0,cor:`bg-indigo-500`,icone:`fa-tag`}),pe[t].pedidos+=1,pe[t].faturamento+=Number(e.valorTotal)||0;let n=Dc(e);pe[t].taxa+=n.taxaApp});let me=[...F].filter(e=>e.status!==`pronto`).sort((e,t)=>(e.dataEntrega+e.horaEntrega).localeCompare(t.dataEntrega+t.horaEntrega)).slice(0,5);e.innerHTML=`
    <!-- Top Header do Dashboard com Ações Rápidas -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Painel de Controle Operacional</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
          O dia a dia: agenda, estoque para os próximos 7 dias e próximas entregas
        </p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button 
          onclick="abrirModalPedido()" 
          class="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <i class="fa-solid fa-plus text-xs"></i> Novo Pedido
        </button>
        <button 
          onclick="abrirModalLancamento()" 
          class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
        >
          <i class="fa-solid fa-receipt text-teal-600"></i> Lançar Caixa
        </button>
        <button 
          onclick="switchTab('cardapio')" 
          class="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          title="Montar o cardápio da semana e ver datas temáticas"
        >
          <i class="fa-solid fa-calendar-days"></i> Cardápio
        </button>
        <button 
          onclick="abrirModalMetas()" 
          class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
          title="Ajustar metas mensais e custos fixos"
        >
          <i class="fa-solid fa-sliders text-pink-600"></i> Metas
        </button>
        <button 
          onclick="abrirFechamentoDia()" 
          class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
          title="Resumo do dia: faturamento, lucro, pedidos e estoque"
        >
          <i class="fa-solid fa-moon text-purple-600"></i> Fechar o dia
        </button>
      </div>
    </div>

    <!-- Banner de Alertas Operacionais Imediatos (se houver estoque baixo ou pedidos aguardando) -->
    ${ie.length>0||a>0?`
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${ie.length>0?`
          <div class="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 flex items-center justify-between gap-3 shadow-2xs">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-triangle-exclamation text-sm"></i>
              </span>
              <div class="truncate">
                <p class="text-xs font-bold leading-tight">Alerta de Estoque: ${ie.length} insumo(s) crítico(s)</p>
                <p class="text-[11px] text-amber-700 truncate">${ie.map(e=>e.nome).join(`, `)}</p>
              </div>
            </div>
            <button onclick="switchTab('estoque')" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-900 shrink-0 cursor-pointer transition-colors">
              Repor
            </button>
          </div>
        `:``}

        ${a>0?`
          <div class="p-3.5 rounded-2xl bg-purple-50/90 border border-purple-200/80 text-purple-900 flex items-center justify-between gap-3 shadow-2xs">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-clock text-sm"></i>
              </span>
              <div class="truncate">
                <p class="text-xs font-bold leading-tight">${a} pedido(s) aguardando confirmação</p>
                <p class="text-[11px] text-purple-700">Verifique sinais e aprove para iniciar a produção</p>
              </div>
            </div>
            <button onclick="switchTab('pedidos')" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-200/80 hover:bg-purple-300 text-purple-900 shrink-0 cursor-pointer transition-colors">
              Ver Kanban
            </button>
          </div>
        `:``}
      </div>
    `:``}

    <!-- CARDS DE MÉTRICAS PRINCIPAIS DINÂMICOS: Faturamento, Pedidos, Custos e Lucro Líquido -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- CARD 1: FATURAMENTO -->
      <div id="card-faturamento" class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-pink-200 transition-all">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Faturamento</span>
          <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-sack-dollar"></i>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-2xl font-black text-slate-900 leading-tight">${G(t)}</p>
          <div class="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Meta (${G(ae)})</span>
            <span class="font-bold text-pink-600">${se}%</span>
          </div>
          <div class="mt-1 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="bg-pink-600 h-full rounded-full transition-all duration-500" style="width: ${se}%"></div>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span class="text-emerald-600 font-semibold" title="Sinais já recebidos">
            <i class="fa-solid fa-circle-check text-[10px] mr-1"></i>Sinal: ${G(n)}
          </span>
          <span class="text-slate-500 font-medium" title="Saldo pendente a receber">
            A rec.: <strong class="text-slate-700">${G(r)}</strong>
          </span>
        </div>
      </div>

      <!-- CARD 2: PEDIDOS -->
      <div id="card-pedidos" class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pedidos</span>
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-receipt"></i>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-2xl font-black text-slate-900 leading-tight">
            ${i} <span class="text-xs font-semibold text-slate-500">pedidos</span>
          </p>
          <p class="text-xs font-medium text-slate-500 mt-1">
            Ticket Médio: <strong class="text-slate-800">${G(u)}</strong>
          </p>
          <div class="mt-2 flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
              ${l} em produção
            </span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
              ${c} entregues
            </span>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button onclick="switchTab('pedidos')" class="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer">
            Abrir Kanban <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
          <span class="text-slate-400">${a} aguardando</span>
        </div>
      </div>

      <!-- CARD 3: CUSTOS (CMV DAS FICHAS TÉCNICAS + TAXAS + FIXOS) -->
      <div id="card-custos" class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-amber-200 transition-all">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Custos</span>
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-2xl font-black text-slate-900 leading-tight">${G(h)}</p>
          <div class="mt-1.5 space-y-1 text-xs">
            <div class="flex items-center justify-between text-slate-600">
              <span class="flex items-center gap-1"><i class="fa-solid fa-cookie-bite text-amber-500 text-[10px]"></i> Insumos (Fichas):</span>
              <strong class="text-slate-800">${G(d)} <span class="font-normal text-[11px] text-slate-500">(${g.toFixed(1)}%)</span></strong>
            </div>
            <div class="flex items-center justify-between text-slate-600">
              <span class="flex items-center gap-1"><i class="fa-solid fa-percent text-rose-400 text-[10px]"></i> Taxas de Canais:</span>
              <strong class="text-slate-800">${G(f)} <span class="font-normal text-[11px] text-slate-500">(${ee.toFixed(1)}%)</span></strong>
            </div>
            <div class="flex items-center justify-between text-slate-600">
              <span class="flex items-center gap-1"><i class="fa-solid fa-building text-slate-400 text-[10px]"></i> Custos Fixos:</span>
              <strong class="text-slate-800">${G(m)}</strong>
            </div>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button onclick="switchTab('fichas')" class="text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer">
            Fichas Técnicas <i class="fa-solid fa-chevron-right text-[9px]"></i>
          </button>
          <span class="text-slate-500" title="Estoque em insumos">
            Estoque: <strong class="text-slate-700">${G(re)}</strong>
          </span>
        </div>
      </div>

      <!-- CARD 4: LUCRO LÍQUIDO -->
      <div id="card-lucro" data-card="lucro-liquido" class="bg-white p-4 sm:p-5 rounded-2xl border ${ne>=0?`border-emerald-200/80 bg-emerald-50/20`:`border-red-200 bg-red-50/20`} shadow-xs flex flex-col justify-between transition-all">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Lucro Líquido</span>
          <div class="w-10 h-10 rounded-xl ${ne>=0?`bg-emerald-100 text-emerald-600`:`bg-red-100 text-red-600`} flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-wallet"></i>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-2xl font-black ${ne>=0?`text-emerald-600`:`text-red-600`} leading-tight">
            ${G(ne)}
          </p>
          <div class="mt-2 flex items-center justify-between text-xs">
            <span class="font-medium text-slate-500">Margem Real:</span>
            <span class="font-bold px-2 py-0.5 rounded-md ${v>=40?`bg-emerald-100 text-emerald-800`:v>=20?`bg-blue-100 text-blue-800`:`bg-amber-100 text-amber-800`}">
              ${v.toFixed(1)}%
            </span>
          </div>
          <p class="text-[11px] text-slate-500 mt-2">
            Resultado real livre após insumos, taxas e custos fixos
          </p>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span class="font-semibold ${ne>=0?`text-emerald-700`:`text-red-700`} flex items-center gap-1">
            <i class="fa-solid ${ne>=0?`fa-arrow-trend-up`:`fa-arrow-trend-down`}"></i>
            ${ne>=0?`Operação Positiva`:`Abaixo do Ponto`}
          </span>
          <button onclick="switchTab('caixa')" class="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer">
            Caixa: <strong class="${_>=0?`text-teal-700`:`text-red-600`}">${G(_)}</strong>
          </button>
        </div>
      </div>

    </div>

    <!-- BLOCO 1.6: PREVISÃO DE ESTOQUE MRP — próximos 7 dias -->
    ${(()=>{let e=Mc(7),t=e.alertas.filter(e=>e.critico).length,n=e.alertas.slice(0,4).map(e=>{let t=e.total>0?Math.min(100,Math.max(0,e.estoque/e.total*100)):100;return`<div class="rounded-xl border ${e.critico?`border-red-200 bg-red-50/60`:`border-amber-200 bg-amber-50/60`} p-3">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold text-slate-900 text-sm truncate">${K(e.nome)}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${e.critico?`bg-red-600 text-white`:`bg-amber-100 text-amber-800 border border-amber-200`}">
              ${e.critico?`<i class="fa-solid fa-triangle-exclamation"></i> ${Pc(e)}`:`Atenção`}
            </span>
          </div>
          <div class="mt-2 h-1.5 rounded-full bg-white border border-slate-200 overflow-hidden">
            <div class="h-full rounded-full ${e.critico?`bg-red-500`:`bg-amber-400`}" style="width:${t.toFixed(0)}%"></div>
          </div>
          <p class="text-[11px] text-slate-600 mt-1.5">
            Estoque <strong>${Ac(e.estoque,e.unidade)}</strong> • precisa <strong>${Ac(e.total,e.unidade)}</strong> em ${e.pedidosAfetados} pedido(s)
            ${e.critico?` • falta <strong class="text-red-700">${Ac(e.deficit,e.unidade)}</strong>`:` • sobra <strong>${Ac(e.saldoProjetado,e.unidade)}</strong>`}
          </p>
          ${e.critico&&e.pacotesSugeridos>0?`
          <p class="text-[11px] font-semibold text-slate-800 mt-1 flex items-center gap-1">
            <i class="fa-solid fa-cart-shopping text-emerald-600"></i>
            Comprar ${e.pacotesSugeridos}x pct (${Ac(e.qtdPacote,e.unidade)}/pct)${e.custoEstimado>0?` ≈ ${G(e.custoEstimado)}`:``}
          </p>`:``}
        </div>`}).join(``);return`<div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs" data-bloco="mrp">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-10 h-10 rounded-xl ${t>0?`bg-red-100 text-red-600`:`bg-emerald-100 text-emerald-600`} flex items-center justify-center text-lg shrink-0">
              <i class="fa-solid fa-boxes-stacked"></i>
            </span>
            <div class="min-w-0">
              <h3 class="font-bold text-slate-900 text-base truncate">Previsão de estoque — 7 dias</h3>
              <p class="text-xs text-slate-500">${e.totalPedidos} pedido(s) na agenda • ${t>0?`<strong class="text-red-600">${t} insumo(s) em ruptura</strong>`:`<strong class="text-emerald-600">estoque OK para a agenda</strong>`}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button onclick="switchTab('estoque')" class="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">Ver estoque</button>
            <button data-bloco-toggle="mrp" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] flex items-center justify-center cursor-pointer" title="Recolher bloco">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>
        <div data-bloco-body="mrp" class="mt-3">
        ${e.alertas.length===0?`<div class="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
               <p class="text-sm font-bold text-emerald-800"><i class="fa-solid fa-circle-check"></i> Tudo certo!</p>
               <p class="text-[11px] text-emerald-700 mt-0.5">Nenhum insumo estoura nos próximos 7 dias com a agenda atual.</p>
             </div>`:`<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">${n}</div>
             ${e.alertas.length>4?`<p class="text-[11px] text-slate-400 mt-2">+${e.alertas.length-4} outro(s) em atenção — abra o sino <i class="fa-solid fa-bell"></i> para ver todos.</p>`:``}`}
        </div>
      </div>`})()}

    <!-- BLOCO 2: ATALHO PARA RELATÓRIOS (metas, canais e evolução foram para a aba Relatórios) -->
    <div class="bg-gradient-to-r from-indigo-50 via-white to-purple-50 rounded-2xl border border-indigo-100 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-sm">Metas, canais e evolução em Relatórios</h3>
          <p class="text-xs text-slate-500">Progresso do mês: <strong class="text-pink-600">${se}%</strong> de ${G(ae)} • pró-labore projetado: <strong>${G(fe)}</strong></p>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button onclick="abrirModalMetas()" class="text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-2 rounded-xl transition-colors cursor-pointer">
          <i class="fa-solid fa-sliders"></i> Metas
        </button>
        <button onclick="switchTab('relatorios')" class="text-xs font-bold text-white px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer" style="background:linear-gradient(135deg,#4F46E5,#7C3AED)">
          Ver relatórios <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </button>
      </div>
    </div>

    <!-- BLOCO 3: PRÓXIMAS ENTREGAS PRIORITÁRIAS & ATALHOS KANBAN -->
    <div class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs" data-bloco="entregas">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
            <i class="fa-solid fa-calendar-check"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Próximas Entregas Pendentes</h3>
            <p class="text-xs text-slate-500">Fila de encomendas ativas organizada por cronograma</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="switchTab('pedidos')" class="text-xs font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-table-columns"></i> Kanban
          </button>
          <button data-bloco-toggle="entregas" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] flex items-center justify-center cursor-pointer" title="Recolher bloco">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>

      <div data-bloco-body="entregas" class="mt-4 overflow-x-auto">
        ${me.length>0?`
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th class="px-3 py-2.5 rounded-l-lg">Cliente</th>
                <th class="px-3 py-2.5">Entrega Programada</th>
                <th class="px-3 py-2.5">Itens do Pedido</th>
                <th class="px-3 py-2.5">Canal</th>
                <th class="px-3 py-2.5">Valor Total</th>
                <th class="px-3 py-2.5">Status</th>
                <th class="px-3 py-2.5">Estoque</th>
                <th class="px-3 py-2.5">Caixa</th>
                <th class="px-3 py-2.5 text-right rounded-r-lg">Ação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${me.map(e=>{let t=e.status===`aguardando`?`bg-amber-100 text-amber-800`:e.status===`a_produzir`?`bg-blue-100 text-blue-800`:e.status===`producao`?`bg-purple-100 text-purple-800`:`bg-emerald-100 text-emerald-800`,n=e.status===`aguardando`?`Aguardando`:e.status===`a_produzir`?`A Produzir`:e.status===`producao`?`Em Produção`:`Pronto / Entregue`,r=(e.itens||[]).map(e=>`${e.qtd}x ${e.nome}`).join(`, `)||`Nenhum item`;return`
                  <tr class="hover:bg-slate-50/70 transition-colors">
                    <td class="px-3 py-3 font-bold text-slate-900">
                      ${e.cliente}
                      <span class="block text-[10px] font-normal text-slate-400">#${e.id}</span>
                    </td>
                    <td class="px-3 py-3">
                      <span class="font-semibold text-slate-800">${e.dataEntrega||`Sem data`}</span>
                      <span class="block text-[10px] text-slate-500">${e.horaEntrega?`às ${e.horaEntrega}`:``}</span>
                    </td>
                    <td class="px-3 py-3 text-slate-600 max-w-xs truncate" title="${r}">
                      ${r}
                    </td>
                    <td class="px-3 py-3">
                      <span class="inline-flex items-center gap-1 font-semibold text-[11px] text-slate-700">
                        ${e.canal===`iFood`?`<i class="fa-solid fa-motorcycle text-red-500"></i>`:e.canal===`99Food`?`<i class="fa-solid fa-utensils text-amber-500"></i>`:`<i class="fa-brands fa-whatsapp text-emerald-500"></i>`}
                        ${e.canal||`WhatsApp`}
                      </span>
                    </td>
                    <td class="px-3 py-3 font-bold text-slate-900">
                      ${G(e.valorTotal)}
                      <span class="block text-[10px] font-normal text-slate-400">Sinal: ${G(e.valorSinal)}</span>
                    </td>
                    <td class="px-3 py-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${t}">
                        ${n}
                      </span>
                    </td>
                    <td class="px-3 py-3">
                      ${e.estoqueBaixado?`
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800" title="Insumos já debitados do estoque">
                          <i class="fa-solid fa-check text-[9px]"></i> Baixado
                        </span>
                      `:`
                        <button onclick="abrirModalConfirmarBaixa('${e.id}')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors cursor-pointer" title="Dar baixa nos insumos deste pedido">
                          <i class="fa-solid fa-box-archive text-[9px]"></i> Baixar
                        </button>
                      `}
                    </td>
                    <td class="px-3 py-3">
                      ${(()=>{let t=zc(e);return t.status===`quitado`?`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800" title="Quitado no caixa: ${G(t.totalLancado)}"><i class="fa-solid fa-check text-[9px]"></i> Quitado</span>`:t.status===`parcial`?`<button onclick="abrirModalLancarCaixa('${e.id}', 'restante')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer" title="Lançado ${G(t.totalLancado)} • Falta ${G(t.saldoPendente)}"><i class="fa-solid fa-clock-rotate-left text-[9px]"></i> ${G(t.totalLancado)}</button>`:`<button onclick="abrirModalLancarCaixa('${e.id}')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 transition-colors cursor-pointer" title="Lançar recebimento no caixa"><i class="fa-solid fa-plus text-[9px]"></i> Lançar</button>`})()}
                    </td>
                    <td class="px-3 py-3 text-right">
                      <button onclick="abrirModalPedido('${e.id}')" class="text-xs text-pink-600 hover:text-pink-800 font-semibold px-2 py-1 rounded bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer">
                        Editar
                      </button>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        `:`
          <div class="py-8 text-center text-slate-400">
            <i class="fa-solid fa-box-open text-3xl mb-2 text-slate-300"></i>
            <p class="text-xs font-medium">Nenhum pedido pendente de entrega no momento.</p>
            <button onclick="abrirModalPedido()" class="mt-3 px-3 py-1.5 text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors cursor-pointer">
              + Cadastrar Primeiro Pedido
            </button>
          </div>
        `}
      </div>
    </div>
  `,Kc()}function Jc(){let e=F.reduce((e,t)=>e+(Number(t.valorTotal)||0),0),t=F.length,n=t>0?e/t:0,r=Number(L.faturamentoMensal??0),i=Number(L.faturamentoAnual??0),a=r>0?Math.min(100,Math.round(e/r*100)):0,o=Math.max(0,r-e),s=n>0?n:85,c=Math.ceil(r/s),l=Math.ceil(i/s),u=Math.max(0,c-t),d=Number(L.custosFixosMensais??0),f=r*(Number(L.cmvMedioPercentual??0)/100),p=r*(Number(L.taxaAppMediaPercentual??0)/100),m=Math.max(0,r-f-p-d),h={WhatsApp:{nome:`WhatsApp / Venda Direta`,pedidos:0,faturamento:0,taxa:0,cor:`bg-emerald-500`},iFood:{nome:`iFood Delivery`,pedidos:0,faturamento:0,taxa:0,cor:`bg-red-500`},"99Food":{nome:`99Food / Outros Apps`,pedidos:0,faturamento:0,taxa:0,cor:`bg-amber-500`},Balcão:{nome:`Balcão / Encomenda`,pedidos:0,faturamento:0,taxa:0,cor:`bg-blue-500`}};return F.forEach(e=>{let t=e.canal||`WhatsApp`;h[t]||(h[t]={nome:t,pedidos:0,faturamento:0,taxa:0,cor:`bg-indigo-500`}),h[t].pedidos+=1,h[t].faturamento+=Number(e.valorTotal)||0,h[t].taxa+=Dc(e).taxaApp}),{faturamentoTotal:e,totalPedidosQtd:t,ticketMedioAtual:n,metaMes:r,metaAno:i,progressoMeta:a,faturamentoFaltante:o,ticketRef:s,pedidosNecMes:c,pedidosNecAno:l,pedidosFaltantes:u,custosFixos:d,cmvEstMeta:f,taxasEstMeta:p,proLaboreProjetado:m,canais:h}}function Yc(){let e=document.getElementById(`tab-relatorios`);if(!e)return;let t=Jc(),n=[];for(let e=13;e>=0;e--){let t=new Date;t.setDate(t.getDate()-e);let r=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`,i=F.filter(e=>e.dataEntrega===r).reduce((e,t)=>e+(Number(t.valorTotal)||0),0);n.push({iso:r,total:i,hoje:e===0,rotulo:`${String(t.getDate()).padStart(2,`0`)}/${String(t.getMonth()+1).padStart(2,`0`)}`})}let r=Math.max(1,...n.map(e=>e.total)),i=n.reduce((e,t)=>e+t.total,0),a=n.map((e,t)=>{let n=Math.max(3,e.total/r*128),i=(t*40+4).toFixed(1),a=(t*40+20).toFixed(1);return`<rect x="${i}" y="${(150-n).toFixed(1)}" width="${32 .toFixed(1)}" height="${n.toFixed(1)}" rx="4" fill="${e.hoje?`#C65D3A`:`#EFC9B5`}"><title>${e.rotulo}: ${G(e.total)}</title></rect><text x="${a}" y="165" font-size="9" text-anchor="middle" fill="#94a3b8">${e.rotulo}</text>`}).join(``);e.innerHTML=`
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Relatórios</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Evolução, metas e canais • grupo Financeiro</p>
      </div>
      <button onclick="abrirModalMetas()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer">
        <i class="fa-solid fa-sliders text-pink-600"></i> Ajustar Metas
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div class="flex items-center justify-between pb-2">
        <div>
          <h3 class="font-bold text-slate-900 text-base">Faturamento — últimos 14 dias</h3>
          <p class="text-xs text-slate-500">Por data de entrega • período: <strong class="text-slate-700">${G(i)}</strong></p>
        </div>
      </div>
      <svg viewBox="0 0 560 175" class="w-full" role="img" aria-label="Gráfico de faturamento por dia">
        <line x1="0" y1="150" x2="560" y2="150" stroke="#e2e8f0" stroke-width="1" />
        ${a}
      </svg>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg">
                <i class="fa-solid fa-bullseye"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-base">Metas Operacionais & Pró-Labore</h3>
                <p class="text-xs text-slate-500">Planejamento financeiro de vendas e sustentabilidade</p>
              </div>
            </div>
            <button onclick="abrirModalMetas()" class="text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
              <i class="fa-solid fa-sliders"></i> Configurar
            </button>
          </div>
          <div class="mt-5">
            <div class="flex justify-between text-xs font-semibold mb-1.5">
              <span class="text-slate-700">Progresso do Mês: ${G(t.faturamentoTotal)} de ${G(t.metaMes)}</span>
              <span class="text-pink-600 font-bold">${t.progressoMeta}%</span>
            </div>
            <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-pink-500 to-rose-600 h-full rounded-full transition-all duration-500" style="width: ${t.progressoMeta}%"></div>
            </div>
            <div class="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>${t.totalPedidosQtd} pedidos realizados</span>
              <span>${t.faturamentoFaltante>0?`Faltam ${G(t.faturamentoFaltante)} para bater a meta`:`Meta do mês superada! 🎉`}</span>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-600">Meta Mensal</span>
                <span class="text-xs font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-md">${G(t.metaMes)}</span>
              </div>
              <p class="mt-2 text-2xl font-black text-slate-900">${t.pedidosNecMes} <span class="text-xs font-medium text-slate-500">pedidos</span></p>
              <p class="text-[11px] text-slate-500 mt-1">
                ${t.pedidosFaltantes>0?`Faltam <strong>${t.pedidosFaltantes}</strong> pedidos a ${G(t.ticketRef)}`:`Meta de pedidos alcançada!`}
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-600">Meta Anual</span>
                <span class="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">${G(t.metaAno)}</span>
              </div>
              <p class="mt-2 text-2xl font-black text-slate-900">${t.pedidosNecAno} <span class="text-xs font-medium text-slate-500">pedidos</span></p>
              <p class="text-[11px] text-slate-500 mt-1">
                Ritmo recomendado: ~${Math.ceil(t.pedidosNecAno/12)} pedidos por mês
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 p-4 rounded-xl bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200/80">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-pink-900">Projeção de Pró-Labore Líquido</p>
              <p class="text-2xl font-black text-slate-900 mt-0.5">${G(t.proLaboreProjetado)} <span class="text-xs font-normal text-slate-600">/ mês</span></p>
              <p class="text-[11px] text-slate-600 mt-0.5">Disponível para retirada da confeiteira ao atingir a meta mensal</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-white text-pink-600 flex items-center justify-center text-xl shadow-xs shrink-0">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-pink-200/70 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span class="text-slate-500 block text-[11px]">(-) Insumos (${L.cmvMedioPercentual}%)</span>
              <strong class="text-slate-800">${G(t.cmvEstMeta)}</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[11px]">(-) Taxas Apps (${L.taxaAppMediaPercentual}%)</span>
              <strong class="text-slate-800">${G(t.taxasEstMeta)}</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[11px]">(-) Custos Fixos</span>
              <strong class="text-slate-800">${G(t.custosFixos)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                <i class="fa-solid fa-chart-pie"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-base">Vendas por Canal</h3>
                <p class="text-xs text-slate-500">Faturamento e retenção por plataforma</p>
              </div>
            </div>
            <button onclick="switchTab('promocoes')" class="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
              <i class="fa-solid fa-calculator"></i> Viabilidade
            </button>
          </div>
          <div class="mt-4 space-y-3">
            ${Object.keys(t.canais).map(e=>{let n=t.canais[e],r=t.faturamentoTotal>0?Math.round(n.faturamento/t.faturamentoTotal*100):0,i=n.faturamento>0?Math.max(0,n.faturamento-n.taxa):0;return`
                <div class="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 transition-colors">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full ${n.cor}"></span>
                      ${n.nome}
                    </span>
                    <span class="text-xs font-semibold text-slate-600">${n.pedidos} pedido(s) (${r}%)</span>
                  </div>
                  <div class="mt-2 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="${n.cor} h-full rounded-full" style="width: ${r}%"></div>
                  </div>
                  <div class="mt-2 flex items-center justify-between text-xs">
                    <span class="font-bold text-slate-900">${G(n.faturamento)}</span>
                    <span class="text-[11px] text-slate-500">
                      Taxas: <strong class="text-rose-600">${G(n.taxa)}</strong> | Líq: <strong class="text-emerald-700">${G(i)}</strong>
                    </span>
                  </div>
                </div>
              `}).join(``)}
          </div>
        </div>
        <div class="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
          <i class="fa-solid fa-lightbulb text-blue-500 mt-0.5"></i>
          <div>
            <span class="font-bold">Dica Operacional:</span> Canais diretos (WhatsApp) não cobram taxa de intermediação. Incentive clientes do iFood a migrarem para o WhatsApp através de mimos e cupons em compras futuras.
          </div>
        </div>
      </div>
    </div>
  `}function Xc(){Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-sliders text-pink-600"></i> Ajustar Metas e Parâmetros
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form id="formMetas" onsubmit="salvarMetas(event)" class="mt-4 space-y-4 text-sm">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Meta de Faturamento Mensal (R$)</label>
        <input type="number" step="0.01" id="metaMesInput" value="${L.faturamentoMensal}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Meta de Faturamento Anual (R$)</label>
        <input type="number" step="0.01" id="metaAnoInput" value="${L.faturamentoAnual}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Custos Fixos Mensais (Luz, Gás, Internet, MEI - R$)</label>
        <input type="number" step="0.01" id="custosFixosInput" value="${L.custosFixosMensais}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">CMV Médio Previsto (%)</label>
          <input type="number" step="1" id="cmvMedioInput" value="${L.cmvMedioPercentual}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Taxa de App Média (%)</label>
          <input type="number" step="1" id="taxaAppMediaInput" value="${L.taxaAppMediaPercentual}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold">Salvar Configurações</button>
      </div>
    </form>
  `)}function Zc(e){e.preventDefault();let t=(e,t)=>{let n=Number(document.getElementById(e).value);return Number.isFinite(n)?n:t};L.faturamentoMensal=t(`metaMesInput`,0),L.faturamentoAnual=t(`metaAnoInput`,0),L.custosFixosMensais=t(`custosFixosInput`,0),L.cmvMedioPercentual=t(`cmvMedioInput`,0),L.taxaAppMediaPercentual=t(`taxaAppMediaInput`,0),W(M.METAS),$(),q(`Metas salvas: meta ${G(L.faturamentoMensal)}, fixos ${G(L.custosFixosMensais)}.`),qc()}var Qc=`todas`,$c=`todos`,el=``;function tl(e){let t=Hs(e),n=t.currentQuantity,r=t.minimumThreshold,i=t.percentual;if(r<=0)return{status:`seguro`,label:`Sem Alerta Mínimo`,badgeClass:`bg-slate-100 text-slate-700 border-slate-200`,iconClass:`fa-regular fa-circle-check text-slate-500`,mensagem:`Alerta não configurado`,falta:0,percentual:100};if(t.needsRestock){let n=t.falta;return{status:`critico`,label:`Abaixo do Mínimo`,badgeClass:`bg-red-50 text-red-700 border border-red-200 ring-1 ring-red-200/60`,iconClass:`fa-solid fa-triangle-exclamation text-red-600 animate-pulse`,mensagem:n>0?`Repor ${n.toLocaleString(`pt-BR`)} ${e.unidade}`:`No limite mínimo`,falta:n,percentual:i}}return n<=r*1.25?{status:`atencao`,label:`Próximo ao Mínimo`,badgeClass:`bg-amber-50 text-amber-800 border border-amber-200`,iconClass:`fa-solid fa-circle-exclamation text-amber-600`,mensagem:`Estoque em atenção (${i}%)`,falta:0,percentual:i}:{status:`seguro`,label:`Estoque Seguro`,badgeClass:`bg-emerald-50 text-emerald-700 border border-emerald-200`,iconClass:`fa-solid fa-circle-check text-emerald-600`,mensagem:`Abastecido (${i}%)`,falta:0,percentual:i}}function nl(e){return(e||``).toString().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).trim()}function rl(e=N){let t=nl(el);return(e||[]).filter(e=>{let n=Qc===`todas`||e.categoria===Qc,r=nl(e.nome),i=nl(e.categoria),a=!t||r.includes(t)||i.includes(t);return!n||!a?!1:$c===`todos`||tl(e).status===$c})}function il(e=null){let t=document.getElementById(`tab-estoque`);if(!t)return;let n=N.length,r=N.reduce((e,t)=>{let n=Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0;return e+gc(t)*n},0),i=N.filter(e=>Us(e)).length,a=N.filter(e=>{let t=Number(e.quantidade===void 0?e.estoqueAtual:e.quantidade)||0,n=Number(e.alertaEstoqueMinimo===void 0?e.estoqueMinimo:e.alertaEstoqueMinimo)||0;return n>0&&t>n&&t<=n*1.25}).length,o=n-i-a;Gs(),t.innerHTML=`
    <!-- Top Bar & Header da Seção -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg shadow-xs">
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-bold text-slate-900 text-lg">Estoque</h2>
              ${i>0?`
                <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 animate-pulse">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${i} em alerta
                </span>
              `:``}
            </div>
            <p class="text-xs text-slate-500">Controle completo de nomes, quantidades, unidades de medida e alertas de estoque mínimo</p>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="abrirModalInsumo()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer active:scale-95">
          <i class="fa-solid fa-plus"></i> Novo Insumo
        </button>
      </div>
    </div>

    <!-- BARRA DE PESQUISA NO TOPO DA SEÇÃO DE ESTOQUE (FILTRO EM TEMPO REAL) -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
      <div class="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <!-- Input de Pesquisa em Tempo Real (Nome ou Categoria) -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i class="fa-solid fa-magnifying-glass text-sm"></i>
          </div>
          <input 
            type="text" 
            id="stockSearchInput"
            data-testid="stock-search-bar"
            placeholder="Buscar por nome ou categoria em tempo real (ex: Leite, Farinha, Embalagens)..." 
            value="${el}"
            oninput="filtrarEstoqueBusca(this.value)"
            class="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-100 focus:outline-none transition-all text-slate-800 placeholder-slate-400 shadow-2xs"
            aria-label="Buscar insumos por nome ou categoria"
          />
          <button 
            id="stockSearchClearBtn" 
            onclick="limparBuscaEstoque()" 
            class="${el?``:`hidden`} absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer" 
            title="Limpar pesquisa"
            aria-label="Limpar pesquisa"
          >
            <i class="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>

        <!-- Indicador de Resultados em Tempo Real -->
        <div class="flex items-center justify-between sm:justify-end gap-3 text-xs shrink-0">
          <span id="stockSearchCounter" class="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs whitespace-nowrap">
            ${n} insumos cadastrados
          </span>

          ${el?`
            <button onclick="limparBuscaEstoque()" class="text-xs font-semibold text-pink-600 hover:text-pink-800 hover:underline cursor-pointer">
              Limpar busca
            </button>
          `:``}
        </div>
      </div>

      <!-- Filtro Rápido de Categorias & Alertas -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <!-- Categorias -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span class="text-slate-400 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap mr-1">Categorias:</span>
          <button onclick="filtrarEstoqueCategoria('todas')" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${Qc===`todas`?`bg-slate-900 text-white shadow-2xs`:`bg-slate-100 text-slate-600 hover:bg-slate-200`}">
            Todas (${n})
          </button>
          <button onclick="filtrarEstoqueCategoria('Ingredientes')" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${Qc===`Ingredientes`?`bg-amber-600 text-white shadow-2xs`:`bg-slate-100 text-slate-600 hover:bg-slate-200`}">
            <i class="fa-solid fa-bowl-food mr-1"></i> Ingredientes
          </button>
          <button onclick="filtrarEstoqueCategoria('Embalagens')" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${Qc===`Embalagens`?`bg-blue-600 text-white shadow-2xs`:`bg-slate-100 text-slate-600 hover:bg-slate-200`}">
            <i class="fa-solid fa-box mr-1"></i> Embalagens
          </button>
          <button onclick="filtrarEstoqueCategoria('Decoração')" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${Qc===`Decoração`?`bg-purple-600 text-white shadow-2xs`:`bg-slate-100 text-slate-600 hover:bg-slate-200`}">
            <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Decoração
          </button>
        </div>

        <!-- Alerta de Estoque Mínimo -->
        <div class="flex items-center gap-1.5 overflow-x-auto">
          <span class="text-slate-400 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap mr-1">Alerta:</span>
          <button onclick="filtrarEstoqueStatus('todos')" class="px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${$c===`todos`?`bg-slate-800 text-white shadow-2xs`:`bg-slate-100 text-slate-600 hover:bg-slate-200`}">
            Todos
          </button>
          <button onclick="filtrarEstoqueStatus('critico')" class="px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${$c===`critico`?`bg-red-600 text-white shadow-2xs`:`bg-red-50 text-red-700 hover:bg-red-100 border border-red-200`}">
            <i class="fa-solid fa-triangle-exclamation text-[10px]"></i> 🚨 Mínimo (${i})
          </button>
          <button onclick="filtrarEstoqueStatus('atencao')" class="px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${$c===`atencao`?`bg-amber-600 text-white shadow-2xs`:`bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200`}">
            <i class="fa-solid fa-circle-exclamation text-[10px]"></i> ⚠️ Atenção (${a})
          </button>
          <button onclick="filtrarEstoqueStatus('seguro')" class="px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${$c===`seguro`?`bg-emerald-600 text-white shadow-2xs`:`bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200`}">
            <i class="fa-solid fa-circle-check text-[10px]"></i> ✅ Seguro (${o})
          </button>
        </div>
      </div>
    </div>

    <!-- Cards de Resumo & Alertas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 1. Total de Insumos -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 block">Total de Insumos</span>
          <div class="text-2xl font-bold text-slate-900 mt-0.5">${n} <span class="text-xs font-normal text-slate-500">itens</span></div>
          <span class="text-[11px] text-slate-500 mt-1 block">Ingredientes, embalagens e outros</span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-base">
          <i class="fa-solid fa-layer-group"></i>
        </div>
      </div>

      <!-- 2. Alerta de Estoque Mínimo (Crítico) -->
      <div class="bg-white p-4 rounded-2xl border ${i>0?`border-red-200 bg-red-50/20`:`border-slate-200`} shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 block flex items-center gap-1.5">
            <span>Alerta de Estoque Mínimo</span>
            ${i>0?`<span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>`:``}
          </span>
          <div class="text-2xl font-bold ${i>0?`text-red-600`:`text-slate-900`} mt-0.5">
            ${i} <span class="text-xs font-semibold ${i>0?`text-red-500`:`text-slate-500`}">abaixo do mínimo</span>
          </div>
          <button onclick="filtrarEstoqueStatus('critico')" class="text-[11px] font-semibold text-red-600 hover:text-red-800 underline mt-1 block text-left cursor-pointer">
            ${i>0?`Ver itens em alerta crítico →`:`Nenhum item crítico`}
          </button>
        </div>
        <div class="w-10 h-10 rounded-xl ${i>0?`bg-red-100 text-red-600`:`bg-slate-100 text-slate-400`} flex items-center justify-center text-base">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
      </div>

      <!-- 3. Estoque em Atenção -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 block">Próximos ao Mínimo</span>
          <div class="text-2xl font-bold text-amber-600 mt-0.5">${a} <span class="text-xs font-normal text-slate-500">itens</span></div>
          <button onclick="filtrarEstoqueStatus('atencao')" class="text-[11px] font-semibold text-amber-600 hover:text-amber-800 underline mt-1 block text-left cursor-pointer">
            Itens até 25% do limite →
          </button>
        </div>
        <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-base">
          <i class="fa-solid fa-circle-exclamation"></i>
        </div>
      </div>

      <!-- 4. Patrimônio em Estoque -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 block">Patrimônio em Estoque</span>
          <div class="text-2xl font-bold text-emerald-600 mt-0.5">${G(r)}</div>
          <span class="text-[11px] text-slate-500 mt-1 block">Valor total custo investido</span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-base">
          <i class="fa-solid fa-sack-dollar"></i>
        </div>
      </div>
    </div>

    <!-- Tabela da Seção Estoque & Insumos -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
        <table id="stockTable" class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <tr>
              <th class="py-3.5 px-4">Nome do Insumo</th>
              <th class="py-3.5 px-4">Quantidade</th>
              <th class="py-3.5 px-3">Unidade</th>
              <th class="py-3.5 px-4">Alerta de Estoque Mínimo</th>
              <th class="py-3.5 px-4">Custo & Embalagem</th>
              <th class="py-3.5 px-4 text-right">Ações Rápidas</th>
            </tr>
          </thead>
          <tbody id="stockTableBody" class="divide-y divide-slate-100">
          </tbody>
        </table>
      </div>
      <div id="stockPager" class="px-4"></div>
    </div>
  `,al(e)}function al(e=null){let t=document.getElementById(`stockTableBody`);if(!t)return;let n=Array.isArray(e)?e:rl(),r=fc(`estoque`,n),i=document.getElementById(`stockSearchCounter`);i&&(el.trim().length>0||Qc!==`todas`||$c!==`todos`?(i.textContent=`${n.length} de ${N.length} insumos encontrados`,i.className=`text-xs font-semibold text-pink-700 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-200 shadow-2xs whitespace-nowrap`):(i.textContent=`${N.length} insumos cadastrados`,i.className=`text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs whitespace-nowrap`));let a=document.getElementById(`stockSearchClearBtn`);if(a&&(el.trim().length>0?a.classList.remove(`hidden`):a.classList.add(`hidden`)),t.innerHTML=``,n.length===0){let e=document.createElement(`tr`);e.id=`stockTableEmptyRow`,e.innerHTML=`
      <td colspan="6" class="py-12 text-center text-slate-400">
        <i class="fa-solid fa-magnifying-glass text-3xl mb-3 text-slate-300 block"></i>
        <p class="font-semibold text-slate-700">Nenhum insumo encontrado</p>
        <p class="text-xs text-slate-400 mt-1">
          ${el.trim()?`Não encontramos insumos com nome ou categoria contendo "<strong>${K(el)}</strong>".`:`Tente ajustar os filtros de categoria ou alerta.`}
        </p>
        ${el.trim()||Qc!==`todas`||$c!==`todos`?`
          <button onclick="limparFiltrosEstoque()" class="mt-3 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-200 transition-colors cursor-pointer inline-flex items-center gap-1.5">
            <i class="fa-solid fa-rotate-left"></i> Limpar filtros e busca
          </button>
        `:``}
      </td>
    `,t.appendChild(e);let n=document.getElementById(`stockPager`);n&&(n.innerHTML=``);return}r.itens.forEach(e=>{let n=gc(e),r=Number(e.quantidade===void 0?e.estoqueAtual:e.quantidade)||0,i=Number(e.alertaEstoqueMinimo===void 0?e.estoqueMinimo:e.alertaEstoqueMinimo)||0,a=tl(e),o=document.createElement(`tr`);o.id=`stock-row-${e.id}`,o.className=`hover:bg-slate-50/90 transition-colors border-b border-slate-100 ${a.status===`critico`?`bg-red-50/20`:``}`,o.innerHTML=`
      <!-- Campo: Nome & Categoria -->
      <td class="py-3.5 px-4">
        <div class="flex flex-col">
          <span class="font-bold text-slate-900 text-sm">${e.nome}</span>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="text-[10px] font-medium px-2 py-0.5 rounded-md ${e.categoria===`Ingredientes`?`bg-amber-50 text-amber-700 border border-amber-200`:e.categoria===`Embalagens`?`bg-blue-50 text-blue-700 border border-blue-200`:`bg-purple-50 text-purple-700 border border-purple-200`}">
              ${e.categoria}
            </span>
          </div>
        </div>
      </td>

      <!-- Campo: Quantidade -->
      <td class="py-3.5 px-4">
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1">
            <span class="font-extrabold text-slate-900 text-base">${r.toLocaleString(`pt-BR`)}</span>
            <span class="text-xs text-slate-500 font-medium">${e.unidade}</span>
          </div>
          <!-- Barra visual de proporção em relação ao mínimo -->
          <div class="w-24 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden" title="Nível: ${a.percentual}% do estoque mínimo">
            <div class="h-1.5 rounded-full ${a.status===`critico`?`bg-red-500`:a.status===`atencao`?`bg-amber-500`:`bg-emerald-500`}" style="width: ${Math.min(100,Math.max(8,a.percentual))}%"></div>
          </div>
        </div>
      </td>

      <!-- Campo: Unidade -->
      <td class="py-3.5 px-3">
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs">
          ${e.unidade}
        </span>
      </td>

      <!-- Campo: Alerta de Estoque Mínimo -->
      <td class="py-3.5 px-4">
        <div class="space-y-1">
          <div class="text-xs text-slate-600 font-medium flex items-center gap-1">
            <span>Mínimo:</span>
            <strong class="text-slate-800 font-bold">${i.toLocaleString(`pt-BR`)} ${e.unidade}</strong>
          </div>
          <div>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-md ${a.badgeClass}">
              <i class="${a.iconClass} text-[10px]"></i> ${a.label}
            </span>
          </div>
          ${a.status===`critico`&&a.falta>0?`
            <div class="text-[11px] text-red-600 font-semibold flex items-center gap-1 mt-0.5">
              <i class="fa-solid fa-arrow-down text-[9px]"></i> Repor mín. ${a.falta.toLocaleString(`pt-BR`)} ${e.unidade}
            </div>
          `:``}
        </div>
      </td>

      <!-- Campo: Custo & Embalagem -->
      <td class="py-3.5 px-4">
        <div class="text-xs">
          <div class="font-bold text-slate-900">${G(e.precoPacote)} <span class="font-normal text-slate-500">/ pct (${e.qtdPacote}${e.unidade})</span></div>
          <div class="text-[11px] text-slate-500 mt-0.5 font-medium">
            Custo: <strong class="text-slate-700">${G(n)}/${e.unidade}</strong>
          </div>
        </div>
      </td>

      <!-- Ações Rápidas: Reposição, Ajuste Físico, Edição e Exclusão -->
      <td class="py-3.5 px-4 text-right whitespace-nowrap">
        <div class="inline-flex items-center gap-1">
          <button 
            onclick="reporEstoqueRapido('${e.id}')" 
            title="Repor +1 pacote (+${e.qtdPacote}${e.unidade})"
            class="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors inline-flex items-center gap-1 cursor-pointer shadow-2xs"
          >
            <i class="fa-solid fa-plus text-[10px]"></i> Repor
          </button>
          <button 
            onclick="abrirModalAjusteQuantidade('${e.id}')" 
            title="Ajustar Quantidade (Inventário / Perda)"
            class="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <i class="fa-solid fa-sliders text-xs"></i>
          </button>
          <button 
            onclick="abrirModalInsumo('${e.id}')" 
            title="Editar Insumo"
            class="p-1.5 text-slate-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors cursor-pointer"
          >
            <i class="fa-solid fa-pen-to-square text-xs"></i>
          </button>
          <button 
            onclick="abrirModalConfirmarExclusaoInsumo('${e.id}')" 
            title="Excluir Insumo"
            aria-label="Excluir Insumo"
            class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </td>
    `,t.appendChild(o)});let o=document.getElementById(`stockPager`);o&&(o.innerHTML=pc(`estoque`,r.total,r.atual))}function ol(){il()}function sl(e){Qc=e,dc.estoque.pagina=1,ol()}function cl(e){$c=e,dc.estoque.pagina=1,ol()}function ll(e){el=e===void 0?``:String(e),dc.estoque.pagina=1;let t=document.getElementById(`stockSearchInput`);t&&t.value!==el&&(t.value=el),document.getElementById(`stockTableBody`)?al():il()}function ul(){el=``;let e=document.getElementById(`stockSearchInput`);e&&(e.value=``,e.focus()),document.getElementById(`stockTableBody`)?al():il()}function dl(){el=``,Qc=`todas`,$c=`todos`,ol()}function fl(e){let t=N.find(t=>t.id===e);if(!t)return;let n=Number(t.qtdPacote)||1,r=(Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0)+n;t.quantidade=r,t.estoqueAtual=r,W(M.INSUMOS),I.unshift({id:`lan-`+Date.now(),data:new Date().toISOString().split(`T`)[0],tipo:`saida`,categoria:`Compra de Insumos`,descricao:`Reposição rápida: +1 pct (${n}${t.unidade}) de ${t.nome}`,valor:Number(t.precoPacote)||0,forma:`PIX`}),W(M.LANCAMENTOS),q(`Reposição de +${n}${t.unidade} adicionada ao estoque!`),ol()}function pl(e){let t=N.find(t=>t.id===e);if(!t)return;let n=Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0,r=Number(t.alertaEstoqueMinimo===void 0?t.estoqueMinimo:t.alertaEstoqueMinimo)||0;Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">
          <i class="fa-solid fa-sliders"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">Ajuste de Quantidade em Estoque</h3>
          <p class="text-xs text-slate-500">${t.nome} (${t.categoria})</p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer p-1"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>

    <form onsubmit="salvarAjusteQuantidade(event, '${t.id}')" class="mt-4 space-y-4 text-sm">
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
        <div>
          <span class="text-xs text-slate-500 block">Quantidade Atual Registrada</span>
          <span class="text-lg font-bold text-slate-900">${n.toLocaleString(`pt-BR`)} ${t.unidade}</span>
        </div>
        <div class="text-right">
          <span class="text-xs text-slate-500 block">Alerta de Estoque Mínimo</span>
          <span class="text-sm font-bold text-amber-700">${r.toLocaleString(`pt-BR`)} ${t.unidade}</span>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">Nova Quantidade Física (${t.unidade}) *</label>
        <input 
          type="number" 
          step="any" 
          id="novaQtdInput" 
          value="${n}" 
          required 
          class="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-bold text-slate-800 focus:outline-pink-500 bg-white" 
        />
        <p class="text-[11px] text-slate-500 mt-1">Insira a contagem real após conferência física de inventário ou descarte.</p>
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold cursor-pointer shadow-xs">Confirmar Ajuste</button>
      </div>
    </form>
  `)}function ml(e,t){e.preventDefault();let n=N.find(e=>e.id===t);if(!n)return;let r=Number(document.getElementById(`novaQtdInput`).value);if(isNaN(r)||r<0){alert(`Por favor, informe uma quantidade válida maior ou igual a zero.`);return}n.quantidade=r,n.estoqueAtual=r,W(M.INSUMOS),$(),q(`Quantidade de ${n.nome} ajustada para ${r.toLocaleString(`pt-BR`)} ${n.unidade}!`),ol()}function hl(e=null){let t=e?N.find(t=>t.id===e):null,n=t?Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0:1e3,r=t?Number(t.alertaEstoqueMinimo===void 0?t.estoqueMinimo:t.alertaEstoqueMinimo)||0:500,i=t?Number(t.precoPacote)||0:10,a=t?Number(t.qtdPacote)||1:1e3,o=t?t.unidade:`g`;Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
          <i class="fa-solid fa-boxes-stacked"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">${t?`Editar Insumo`:`Novo Insumo do Estoque`}</h3>
          <p class="text-xs text-slate-500">Defina nome, quantidade, unidade e alerta de estoque mínimo</p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer p-1"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>

    <form id="formInsumo" onsubmit="salvarInsumo(event, '${e||``}')" class="mt-4 space-y-4 text-sm">
      <!-- Nome do Insumo -->
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">Nome do Insumo *</label>
        <input 
          type="text" 
          id="insNome" 
          value="${t?t.nome:``}" 
          placeholder="Ex: Leite Condensado Piracanjuba 395g" 
          required 
          class="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-pink-500 bg-white" 
        />
      </div>

      <!-- Categoria e Unidade -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Categoria *</label>
          <select id="insCategoria" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-pink-500 bg-white">
            <option value="Ingredientes" ${t&&t.categoria===`Ingredientes`?`selected`:``}>Ingredientes</option>
            <option value="Embalagens" ${t&&t.categoria===`Embalagens`?`selected`:``}>Embalagens</option>
            <option value="Decoração" ${t&&t.categoria===`Decoração`?`selected`:``}>Decoração</option>
            <option value="Outros" ${t&&t.categoria===`Outros`?`selected`:``}>Outros</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Unidade de Medida *</label>
          <select id="insUnidade" onchange="atualizarPreviaModalInsumo()" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-pink-500 bg-white">
            <option value="g" ${o===`g`?`selected`:``}>Gramas (g)</option>
            <option value="kg" ${o===`kg`?`selected`:``}>Quilos (kg)</option>
            <option value="ml" ${o===`ml`?`selected`:``}>Mililitros (ml)</option>
            <option value="L" ${o===`L`?`selected`:``}>Litros (L)</option>
            <option value="un" ${o===`un`?`selected`:``}>Unidade (un)</option>
          </select>
        </div>
      </div>

      <!-- Quantidade em Estoque e Alerta de Estoque Mínimo -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-200/70">
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1">
            Quantidade Atual em Estoque *
          </label>
          <input 
            type="number" 
            step="any" 
            id="insQuantidade" 
            value="${n}" 
            oninput="atualizarPreviaModalInsumo()" 
            required 
            placeholder="Ex: 3950" 
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold bg-white focus:outline-pink-500" 
          />
          <p class="text-[10px] text-slate-500 mt-0.5">Saldo real disponível</p>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1">
            Alerta de Estoque Mínimo *
          </label>
          <input 
            type="number" 
            step="any" 
            id="insAlertaEstoqueMinimo" 
            value="${r}" 
            oninput="atualizarPreviaModalInsumo()" 
            required 
            placeholder="Ex: 1580" 
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold bg-white focus:outline-pink-500" 
          />
          <p class="text-[10px] text-slate-500 mt-0.5">Dispara aviso quando atingido</p>
        </div>
      </div>

      <!-- Embalagem de Compra & Preço de Custo -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Preço da Embalagem/Pacote (R$) *</label>
          <input 
            type="number" 
            step="0.01" 
            id="insPrecoPacote" 
            value="${i}" 
            oninput="atualizarPreviaModalInsumo()" 
            placeholder="Ex: 6.80" 
            required 
            class="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-pink-500 bg-white" 
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Qtd na Embalagem/Pacote *</label>
          <input 
            type="number" 
            step="any" 
            id="insQtdPacote" 
            value="${a}" 
            oninput="atualizarPreviaModalInsumo()" 
            placeholder="Ex: 395" 
            required 
            class="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-pink-500 bg-white" 
          />
        </div>
      </div>

      <!-- Tabela Nutricional (por 100 g) + Alergênicos — base da etiqueta ANVISA -->
      <details class="bg-white rounded-xl border border-slate-200 text-xs" ${t&&(t.kcal100>0||t.alergenicos)?`open`:``}>
        <summary class="cursor-pointer px-3.5 py-2.5 font-bold text-slate-700 flex items-center justify-between select-none">
          <span><i class="fa-solid fa-apple-whole text-emerald-600"></i> Tabela nutricional (por 100 g) e alergênicos</span>
          <span class="text-[10px] font-medium text-slate-400">para a etiqueta da ficha</span>
        </summary>
        <div class="px-3.5 pb-3.5 pt-1 space-y-2.5">
          <button type="button" onclick="preencherNutriReferencia()" class="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">
            <i class="fa-solid fa-book-open"></i> Preencher valores de referência
          </button>
          <div class="grid grid-cols-3 gap-2">
            ${[[`insKcal`,`Energia (kcal)`,t?.kcal100||0],[`insCarb`,`Carboidratos (g)`,t?.carb100||0],[`insAcucar`,`Açúcares (g)`,t?.acucar100||0],[`insProt`,`Proteínas (g)`,t?.prot100||0],[`insGordTot`,`Gord. totais (g)`,t?.gordTot100||0],[`insGordSat`,`Gord. saturadas (g)`,t?.gordSat100||0],[`insGordTrans`,`Gord. trans (g)`,t?.gordTrans100||0],[`insFibra`,`Fibra (g)`,t?.fibra100||0],[`insSodio`,`Sódio (mg)`,t?.sodio100||0]].map(([e,t,n])=>`
              <div>
                <label class="block text-[10px] font-bold text-slate-600 mb-0.5">${t}</label>
                <input type="number" step="any" min="0" id="${e}" value="${n}" class="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-slate-800 bg-white focus:outline-pink-500" />
              </div>`).join(``)}
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-600 mb-0.5">Alergênicos (separados por vírgula)</label>
            <input type="text" id="insAlergenicos" value="${K(t?.alergenicos||``)}" placeholder="Ex: Glúten, Leite, Ovos, Amendoim, Soja" class="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 bg-white focus:outline-pink-500" />
          </div>
          <p class="text-[10px] text-slate-400">Valores de referência da tabela — sempre confira com o rótulo do seu fornecedor.</p>
        </div>
      </details>

      <!-- Pré-visualização Dinâmica do Custo e Status do Alerta -->
      <div id="insumoPreviaCard" class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
        <!-- Preenchido via atualizarPreviaModalInsumo() -->
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Cancelar</button>
        <button type="submit" class="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold cursor-pointer shadow-xs">
          ${t?`Salvar Alterações`:`Cadastrar Insumo`}
        </button>
      </div>
    </form>
  `),gl()}function gl(){let e=document.getElementById(`insumoPreviaCard`);if(!e)return;let t=Number(document.getElementById(`insPrecoPacote`)?.value)||0,n=Number(document.getElementById(`insQtdPacote`)?.value)||1,r=document.getElementById(`insUnidade`)?.value||`g`,i=Number(document.getElementById(`insQuantidade`)?.value)||0,a=Number(document.getElementById(`insAlertaEstoqueMinimo`)?.value)||0,o=n>0?t/n:0,s=``;if(i<=a){let e=Math.max(0,a-i);s=`
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-xs bg-red-100 text-red-700 border border-red-200">
        <i class="fa-solid fa-triangle-exclamation"></i> 🚨 Abaixo do Mínimo (${e>0?`Falta ${e} ${r}`:`No limite`})
      </span>
    `}else s=i<=a*1.25?`
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-xs bg-amber-100 text-amber-800 border border-amber-200">
        <i class="fa-solid fa-circle-exclamation"></i> ⚠️ Próximo ao Mínimo
      </span>
    `:`
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-xs bg-emerald-100 text-emerald-700 border border-emerald-200">
        <i class="fa-solid fa-circle-check"></i> ✅ Estoque Seguro
      </span>
    `;e.innerHTML=`
    <div class="flex items-center justify-between">
      <div>
        <span class="text-slate-500 font-medium block">Custo Unitário Calculado</span>
        <span class="text-sm font-extrabold text-slate-900">${G(o)} / ${r}</span>
      </div>
      <div class="text-right">
        <span class="text-slate-500 font-medium block mb-0.5">Status do Alerta</span>
        ${s}
      </div>
    </div>
  `}function _l(e,t){e.preventDefault();let n=document.getElementById(`insNome`).value.trim(),r=document.getElementById(`insCategoria`).value,i=document.getElementById(`insUnidade`).value,a=Number(document.getElementById(`insPrecoPacote`).value)||0,o=Number(document.getElementById(`insQtdPacote`).value)||1,s=Number(document.getElementById(`insQuantidade`).value)||0,c=Number(document.getElementById(`insAlertaEstoqueMinimo`).value)||0,l=e=>Number(document.getElementById(e)?.value)||0,u={kcal100:l(`insKcal`),carb100:l(`insCarb`),acucar100:l(`insAcucar`),prot100:l(`insProt`),gordTot100:l(`insGordTot`),gordSat100:l(`insGordSat`),gordTrans100:l(`insGordTrans`),fibra100:l(`insFibra`),sodio100:l(`insSodio`),alergenicos:(document.getElementById(`insAlergenicos`)?.value||``).trim()};if(t){let e=N.find(e=>e.id===t);e&&(e.nome=n,e.categoria=r,e.unidade=i,e.precoPacote=a,e.qtdPacote=o,e.quantidade=s,e.estoqueAtual=s,e.alertaEstoqueMinimo=c,e.estoqueMinimo=c,Object.assign(e,u))}else N.push({id:`ins-`+Date.now(),nome:n,categoria:r,unidade:i,precoPacote:a,qtdPacote:o,quantidade:s,estoqueAtual:s,alertaEstoqueMinimo:c,...u,estoqueMinimo:c});W(M.INSUMOS),$(),q(t?`Insumo atualizado com sucesso!`:`Novo insumo cadastrado com sucesso!`),dc.estoque.pagina=1,ol()}function vl(e){let t=N.find(t=>t.id===e);if(!t)return;let n=Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0,r=gc(t),i=P.filter(t=>(t.ingredientes||[]).some(t=>t.insumoId===e)),a=i.length>0;Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">Confirmar Exclusão de Insumo</h3>
          <p class="text-xs text-slate-500">Remoção definitiva do item da lista de estoque</p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-lg">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <div class="mt-4 space-y-4 text-sm">
      <!-- Card com resumo do Insumo -->
      <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-900 text-base">${t.nome}</span>
          <span class="text-xs px-2.5 py-0.5 rounded-md font-medium ${t.categoria===`Ingredientes`?`bg-amber-50 text-amber-700 border border-amber-200`:t.categoria===`Embalagens`?`bg-blue-50 text-blue-700 border border-blue-200`:`bg-purple-50 text-purple-700 border border-purple-200`}">${t.categoria}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1 border-t border-slate-200/60">
          <div>Estoque Atual: <strong class="text-slate-900">${n.toLocaleString(`pt-BR`)} ${t.unidade}</strong></div>
          <div>Custo Unitário: <strong class="text-slate-900">${G(r)}/${t.unidade}</strong></div>
        </div>
      </div>

      ${a?`
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-1.5">
          <div class="flex items-center gap-1.5 font-bold text-amber-800">
            <i class="fa-solid fa-circle-exclamation text-amber-600"></i>
            <span>Atenção: Insumo vinculado a receitas</span>
          </div>
          <p class="text-amber-700">
            Este insumo está vinculado a <strong>${i.length} ficha(s) técnica(s)</strong>:
          </p>
          <ul class="list-disc list-inside font-medium text-amber-800 pl-1 space-y-0.5">
            ${i.slice(0,4).map(e=>`<li>${e.nome}</li>`).join(``)}
            ${i.length>4?`<li>... e mais ${i.length-4} receita(s)</li>`:``}
          </ul>
          <p class="text-[11px] text-amber-700 mt-1">
            Excluir este insumo removerá o item do estoque e poderá impactar o cálculo de CMV dessas fichas técnicas.
          </p>
        </div>
      `:`
        <p class="text-xs text-slate-600">
          Tem certeza de que deseja remover permanentemente o insumo <strong>"${t.nome}"</strong> da lista de estoque? Esta ação não poderá ser desfeita.
        </p>
      `}

      <!-- Rodapé com Botões de Ação -->
      <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
        <button 
          type="button" 
          onclick="fecharModal()" 
          class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs cursor-pointer transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="button" 
          id="btnConfirmarExclusaoInsumo"
          onclick="executarExclusaoInsumo('${t.id}')" 
          class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
        >
          <i class="fa-solid fa-trash-can"></i> Confirmar Exclusão
        </button>
      </div>
    </div>
  `)}function yl(e){let t=N.find(t=>t.id===e),n=t?t.nome:`Insumo`;N=N.filter(t=>t.id!==e),O&&lo(`insumos`,e).catch(e=>console.error(e)),W(M.INSUMOS),Ks(),$(),q(`Insumo "${n}" removido do estoque.`),il()}function bl(){let e=document.getElementById(`tab-fichas`);if(!e)return;let t=fc(`fichas`,P);e.innerHTML=`
    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-book-bookmark"></i>
        </div>
        <div>
          <h2 class="font-bold text-slate-900 text-lg">Fichas Técnicas & Formação de Preço</h2>
          <p class="text-xs text-slate-500">Cálculo de CMV exato vinculado aos insumos do estoque</p>
        </div>
      </div>
      <button onclick="abrirModalFicha()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2">
        <i class="fa-solid fa-plus"></i> Nova Ficha Técnica
      </button>
    </div>

    <!-- Grid de Fichas Técnicas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      ${t.itens.map(e=>{let t=vc(e,0),n=vc(e,Wo(`iFood`)),r=t.cmvTotal,i=t.rendimento,a=t.cmvUnit,o=t.precoTotal,s=n.precoTotal;return`
          <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
            <div class="p-5 border-b border-slate-100">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ${e.categoria||`Geral`}
                  </span>
                  <h3 class="font-bold text-slate-900 text-base mt-1.5">${e.nome}</h3>
                  <p class="text-xs text-slate-500">Rendimento: <strong>${i} unidade(s)/porção</strong></p>
                </div>
                <div class="flex items-center gap-1">
                  <button onclick="abrirModalFicha('${e.id}')" class="p-1.5 text-slate-400 hover:text-slate-700"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button onclick="excluirFicha('${e.id}')" class="p-1.5 text-slate-400 hover:text-red-600"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>

              <!-- Ingredientes da Ficha -->
              <div class="mt-4">
                <p class="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Ingredientes & Insumos Utilizados:</p>
                <div class="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  ${e.ingredientes.map(e=>{let t=N.find(t=>t.id===e.insumoId),n=t?gc(t)*e.qtd:0;return`
                      <div class="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-50 border border-slate-100">
                        <span class="text-slate-700">${t?t.nome:`Insumo excluído`}</span>
                        <div class="text-right">
                          <span class="text-slate-500 font-medium">${e.qtd}${t?t.unidade:``}</span>
                          <span class="font-semibold text-slate-900 ml-2">${G(n)}</span>
                        </div>
                      </div>
                    `}).join(``)}
                </div>
              </div>
            </div>

            <!-- Preços e Sugestões -->
            <div class="p-5 bg-slate-50/70 border-t border-slate-100 space-y-3">
              <!-- CMV Total -->
              <div class="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                <span class="text-slate-600 font-medium">Custo Total de Insumos (CMV):</span>
                <span class="text-sm font-bold text-slate-900">${G(r)} ${i>1?`<span class="text-xs text-slate-500 font-normal">(${G(a)}/un)</span>`:``}</span>
              </div>

              <!-- Cards de Sugestão de Preço -->
              <div class="grid grid-cols-2 gap-3 pt-1">
                <!-- Venda Direta / WhatsApp -->
                <div class="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <i class="fa-brands fa-whatsapp text-sm"></i> Venda Direta
                  </div>
                  <p class="text-base font-black text-slate-900 mt-1">${G(o)}</p>
                  <p class="text-[10px] text-emerald-600 font-medium mt-0.5">Sem taxas de app (${e.margemAlvo||60}% margem)${i>1?` • ${G(t.precoUnit)}/un`:``}</p>
                </div>

                <!-- Apps (iFood / 99Food) -->
                <div class="p-3 rounded-xl bg-white border border-red-200 shadow-2xs">
                  <div class="flex items-center gap-1.5 text-xs font-bold text-red-700">
                    <i class="fa-solid fa-motorcycle text-sm"></i> Preço nos Apps
                  </div>
                  <p class="text-base font-black text-slate-900 mt-1">${G(s)}</p>
                  <p class="text-[10px] text-red-600 font-medium mt-0.5">+${Wo(`iFood`)}% taxa iFood embutida${i>1?` • ${G(n.precoUnit)}/un`:``}</p>
                </div>
              </div>
              <!-- Preço praticado + margem real -->
              <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
                <span class="text-slate-500">Praticado: <strong class="text-slate-900">${t.precoPraticado>0?G(t.precoPraticado):`—`}</strong>
                  ${t.precoPraticado>0?`<span class="ml-1 px-1.5 py-0.5 rounded font-bold ${t.margemReal>=(e.margemAlvo||60)?`bg-emerald-100 text-emerald-700`:`bg-amber-100 text-amber-700`}">${t.margemReal.toFixed(1)}% real</span>`:``}
                </span>
                <button onclick="abrirModalFicha('${e.id}')" class="text-pink-700 font-bold hover:underline cursor-pointer">Ajustar preço</button>
              </div>
              ${(()=>{let t=ls(e);return!t||t.precoAtual<=0||t.diferenca<.5?``:`<div class="flex items-center justify-between gap-2 text-xs bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                  <span class="text-amber-800"><i class="fa-solid fa-arrow-trend-up"></i> Reajuste p/ manter ${Math.round(t.margemAlvo*100)}%: <strong>${G(t.precoSugerido)}</strong> (+${t.pct.toFixed(0)}%)</span>
                  <button onclick="aplicarReajustePreco('${e.id}')" class="px-2 py-0.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer shrink-0">Aplicar</button>
                </div>`})()}
              ${e.tempoPreparoMin||e.dicaForno||e.modoPreparo?`
              <details class="pt-2 text-xs">
                <summary class="cursor-pointer font-bold text-slate-700">Modo de preparo ${e.tempoPreparoMin?`• ${e.tempoPreparoMin}min`:``} ${e.dicaForno?`• ${e.dicaForno}`:``}</summary>
                <p class="mt-1.5 whitespace-pre-line text-slate-600 bg-white border border-slate-200 rounded-lg p-2.5">${e.modoPreparo||`—`}</p>
              </details>`:``}
              <div class="mt-1 flex items-center gap-3">
                <button onclick="imprimirFicha('${e.id}')" class="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"><i class="fa-solid fa-print"></i> Imprimir ficha</button>
                <button onclick="abrirEtiquetaNutricional('${e.id}')" class="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"><i class="fa-solid fa-apple-whole"></i> Etiqueta nutricional</button>
              </div>
            </div>
          </div>
        `}).join(``)}
    </div>
    ${pc(`fichas`,t.total,t.atual)}
  `}var xl=[];function Sl(e=null){let t=e?P.find(t=>t.id===e):null;xl=t?JSON.parse(JSON.stringify(t.ingredientes)):[],Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-book-bookmark text-emerald-500"></i> ${t?`Editar Ficha Técnica`:`Nova Ficha Técnica`}
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form id="formFicha" onsubmit="salvarFicha(event, '${e||``}')" class="mt-4 space-y-4 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <div class="col-span-2">
          <label class="block text-xs font-semibold text-slate-700 mb-1">Nome da Receita / Produto</label>
          <input type="text" id="ficNome" value="${t?t.nome:``}" placeholder="Ex: Cento de Brigadeiro Gourmet" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Categoria</label>
          <input type="text" id="ficCategoria" value="${t?t.categoria:`Docinhos`}" placeholder="Docinhos, Bolos, Presentes" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Rendimento (unidades)</label>
          <input type="number" step="1" id="ficRendimento" value="${t?t.rendimento:1}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Margem Líquida Alvo (%)</label>
        <input type="number" step="1" id="ficMargem" value="${t&&t.margemAlvo||60}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Preço Praticado (R$) — o que você cobra hoje</label>
        <input type="number" step="0.01" min="0" id="ficPrecoPraticado" value="${t?.precoPraticado||``}" placeholder="Ex: 180.00" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        <p class="text-[11px] text-slate-400 mt-1">Usado para calcular a margem real no card. Sugestão automática aparece após salvar.</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Tempo de preparo (min)</label>
          <input type="number" step="1" min="0" id="ficTempo" value="${t?.tempoPreparoMin||``}" placeholder="Ex: 90" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Temperatura / dica forno</label>
          <input type="text" id="ficForno" value="${t?.dicaForno||``}" placeholder="Ex: 180°C por 35min" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Modo de preparo (passo a passo)</label>
        <textarea id="ficModoPreparo" rows="4" placeholder="1. Misture...&#10;2. Leve ao forno..." class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">${t?.modoPreparo||``}</textarea>
      </div>

      <!-- Insumos da Receita -->
      <div class="pt-2 border-t border-slate-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-700 uppercase">Ingredientes do Estoque</span>
          <button type="button" onclick="adicionarLinhaIngrediente()" class="text-xs text-pink-600 font-semibold hover:text-pink-700 flex items-center gap-1">
            <i class="fa-solid fa-plus"></i> Adicionar Insumo
          </button>
        </div>

        <div id="listaIngredientesModal" class="space-y-2 max-h-48 overflow-y-auto pr-1">
          <!-- Gerado dinamicamente -->
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold">${t?`Salvar Ficha`:`Cadastrar Ficha`}</button>
      </div>
    </form>
  `),Cl()}function Cl(){let e=document.getElementById(`listaIngredientesModal`);if(e){if(xl.length===0){e.innerHTML=`<p class="text-xs text-slate-400 py-2 text-center">Nenhum ingrediente adicionado ainda. Clique acima para adicionar.</p>`;return}e.innerHTML=xl.map((e,t)=>`
      <div class="flex items-center gap-2">
        <select onchange="atualizarTempIngrediente(${t}, 'insumoId', this.value)" class="flex-1 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800">
          <option value="">Selecione o insumo...</option>
          ${N.map(t=>`
            <option value="${t.id}" ${t.id===e.insumoId?`selected`:``}>
              ${t.nome} (${t.unidade}) - ${G(gc(t))}/${t.unidade}
            </option>
          `).join(``)}
        </select>
        <input 
          type="number" 
          step="0.1" 
          value="${e.qtd}" 
          placeholder="Qtd"
          oninput="atualizarTempIngrediente(${t}, 'qtd', this.value)"
          class="w-20 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800" 
        />
        <button type="button" onclick="removerLinhaIngrediente(${t})" class="text-red-500 hover:text-red-700 p-1"><i class="fa-solid fa-trash-can text-xs"></i></button>
      </div>
    `).join(``)}}function wl(){if(N.length===0){alert(`Cadastre primeiro insumos no Estoque!`);return}xl.push({insumoId:N[0].id,qtd:100}),Cl()}function Tl(e){xl.splice(e,1),Cl()}function El(e,t,n){xl[e]&&(xl[e][t]=t===`qtd`?Number(n)||0:n)}function Dl(e,t){e.preventDefault();let n=document.getElementById(`ficNome`).value.trim(),r=document.getElementById(`ficCategoria`).value.trim(),i=Number(document.getElementById(`ficRendimento`).value)||1,a=Number(document.getElementById(`ficMargem`).value)||60,o=Number(document.getElementById(`ficPrecoPraticado`)?.value)||0,s=Number(document.getElementById(`ficTempo`)?.value)||0,c=document.getElementById(`ficForno`)?.value.trim()||``,l=document.getElementById(`ficModoPreparo`)?.value.trim()||``,u=xl.filter(e=>e.insumoId&&e.qtd>0);if(u.length===0){alert(`Adicione pelo menos um ingrediente com quantidade válida à receita.`);return}if(t){let e=P.find(e=>e.id===t);e&&(e.nome=n,e.categoria=r,e.rendimento=i,e.margemAlvo=a,e.precoPraticado=o,e.tempoPreparoMin=s,e.dicaForno=c,e.modoPreparo=l,e.ingredientes=u)}else P.push({id:`fic-`+Date.now(),nome:n,categoria:r,rendimento:i,margemAlvo:a,precoPraticado:o,tempoPreparoMin:s,dicaForno:c,modoPreparo:l,ingredientes:u});W(M.FICHAS),$(),q(`Ficha Técnica gravada!`),bl()}function Ol(e){confirm(`Deseja excluir esta ficha técnica?`)&&(P=P.filter(t=>t.id!==e),O&&lo(`fichas`,e).catch(e=>console.error(e)),W(M.FICHAS),q(`Ficha excluída.`),bl())}var kl=null,Al={aguardando:`Aguardando`,a_produzir:`A Produzir`,producao:`Em Produção`,pronto:`Entregue`};function jl(e,t){kl=t,e.dataTransfer&&(e.dataTransfer.setData(`text/plain`,t),e.dataTransfer.effectAllowed=`move`);let n=document.getElementById(`ped-card-${t}`);n&&setTimeout(()=>{n.classList.add(`opacity-40`,`scale-95`)},0)}function Ml(e){if(kl){let e=document.getElementById(`ped-card-${kl}`);e&&e.classList.remove(`opacity-40`,`scale-95`)}kl=null,document.querySelectorAll(`.kanban-dropzone`).forEach(e=>{e.classList.remove(`bg-pink-50/80`,`border-pink-400`,`border-dashed`,`ring-2`,`ring-pink-300`)})}function Nl(e,t){e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`move`);let n=document.getElementById(`dropzone-${t}`);n&&n.classList.add(`bg-pink-50/80`,`border-pink-400`,`border-dashed`,`ring-2`,`ring-pink-300`)}function Pl(e,t){let n=document.getElementById(`dropzone-${t}`);n&&(!e.relatedTarget||!n.contains(e.relatedTarget))&&n.classList.remove(`bg-pink-50/80`,`border-pink-400`,`border-dashed`,`ring-2`,`ring-pink-300`)}function Fl(e,t){e.preventDefault();let n=e.dataTransfer&&e.dataTransfer.getData(`text/plain`)||kl;if(Ml(e),!n)return;let r=F.find(e=>e.id===n);r&&r.status!==t&&(r.status=t,W(M.PEDIDOS),q(`Pedido de ${r.cliente} movido para "${Al[t]||t}"!`),Vl())}var Il=7;function Ll(e){Il=Number(e)||7,Vl()}function Z(e=0){let t=new Date;return t.setDate(t.getDate()+e),t.toISOString().split(`T`)[0]}function Rl(e){let t=new Date(e+`T12:00:00`),n=Z(0),r=Z(1);return e===n?`Hoje`:e===r?`Amanhã`:t.toLocaleDateString(`pt-BR`,{weekday:`long`,day:`2-digit`,month:`2-digit`})}function zl(e){return F.filter(t=>t.status!==`pronto`&&(t.dataEntrega||``)===e).sort((e,t)=>(e.horaEntrega||``).localeCompare(t.horaEntrega||``))}function Bl(){let e=[];for(let t=0;t<Il;t++){let n=Z(t),r=zl(n),i={};r.forEach(e=>(e.itens||[]).forEach(e=>{let t=e.fichaId||e.nome;i[t]||(i[t]={nome:e.nome,qtd:0}),i[t].qtd+=Number(e.qtd)||0}));let a={};r.forEach(e=>kc(e).forEach(e=>{a[e.insumoId]||(a[e.insumoId]={...e,qtdConsumo:0}),a[e.insumoId].qtdConsumo+=e.qtdConsumo}));let o=Object.values(a),s=o.filter(e=>(Number(e.estoqueAtual)||0)-e.qtdConsumo<0);e.push({iso:n,lista:r,fichasMap:Object.values(i),insumosArr:o,faltantes:s})}let t=F.filter(e=>e.status!==`pronto`).length,n=F.filter(e=>e.status!==`pronto`&&!e.dataEntrega);return`
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="p-4 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2"><i class="fa-solid fa-calendar-day text-blue-600"></i> Agenda de Produção</h3>
          <p class="text-xs text-slate-500">${t} pedido(s) ativo(s) • o que fazer por dia, com insumos somados</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          ${[3,7,14].map(e=>`<button onclick="setAgendaAlcance(${e})" class="px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${Il===e?`bg-blue-600 text-white border-blue-600`:`bg-white text-slate-600 border-slate-200 hover:bg-slate-100`}">${e} dias</button>`).join(``)}
          <button onclick="window.print()" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-700 cursor-pointer"><i class="fa-solid fa-print mr-1"></i> Imprimir</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-4">
        ${e.map(e=>`
          <div class="rounded-xl border ${e.iso===Z(0)?`border-blue-300 ring-1 ring-blue-200`:`border-slate-200`} overflow-hidden">
            <div class="px-3 py-2 ${e.iso===Z(0)?`bg-blue-50`:`bg-slate-50`} border-b border-slate-200 flex items-center justify-between">
              <strong class="text-xs text-slate-800 capitalize">${Rl(e.iso)} <span class="text-slate-400 font-normal">• ${e.iso.split(`-`).reverse().join(`/`)}</span></strong>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${e.lista.length?`bg-blue-600 text-white`:`bg-slate-200 text-slate-500`}">${e.lista.length}</span>
            </div>
            <div class="p-2.5 space-y-2">
              ${e.lista.length===0?`<p class="text-[11px] text-slate-400 text-center py-3">Nada para entregar.</p>`:`
                ${e.lista.map(e=>`
                  <div class="p-2 rounded-lg border border-slate-200 hover:border-blue-300 text-xs">
                    <div class="flex items-center justify-between gap-1">
                      <strong class="text-slate-900 truncate">${e.horaEntrega||`--:--`} • ${e.cliente}</strong>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">${e.status.replace(`_`,` `)}</span>
                    </div>
                    <p class="text-[11px] text-slate-500 mt-0.5 truncate">${(e.itens||[]).map(e=>`${e.qtd}x ${e.nome}`).join(` • `)}</p>
                    <div class="flex items-center gap-1 mt-1.5">
                      ${e.status===`a_produzir`?`<button onclick="moverPedidoStatus('${e.id}','producao')" class="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-600 text-white cursor-pointer">Produzir</button>`:``}
                      ${e.status===`pronto`?``:`<button onclick="moverPedidoStatus('${e.id}','pronto')" class="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-600 text-white cursor-pointer">Pronto</button>`}
                      ${e.estoqueBaixado?`<span class="text-[10px] text-emerald-600 font-bold">✓ Baixado</span>`:`<button onclick="abrirModalConfirmarBaixa('${e.id}')" class="px-2 py-0.5 text-[10px] font-bold rounded bg-white border border-pink-300 text-pink-700 cursor-pointer">Baixa</button>`}
                      <button onclick="abrirModalPedido('${e.id}')" class="px-2 py-0.5 text-[10px] rounded bg-white border border-slate-200 text-slate-500 cursor-pointer">Abrir</button>
                      <button onclick="imprimirEtiquetaPedido('${e.id}')" title="Imprimir etiqueta" class="px-2 py-0.5 text-[10px] rounded bg-white border border-slate-200 text-slate-500 cursor-pointer"><i class="fa-solid fa-print"></i></button>
                    </div>
                  </div>
                `).join(``)}
                ${e.fichasMap.length?`<div class="p-2 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px]"><strong class="text-blue-900">Produzir no dia:</strong> ${e.fichasMap.map(e=>`${e.qtd}x ${e.nome}`).join(` • `)}</div>`:``}
                ${e.insumosArr.length?`<div class="p-2 rounded-lg ${e.faltantes.length?`bg-red-50 border-red-200`:`bg-slate-50 border-slate-200`} border text-[11px]">
                  <strong class="${e.faltantes.length?`text-red-800`:`text-slate-700`}">Insumos do dia ${e.faltantes.length?`(${e.faltantes.length} em falta!)`:`(OK)`}:</strong>
                  <span class="text-slate-600">${e.insumosArr.map(e=>`${e.nome} ${e.qtdConsumo.toFixed(0)}${e.unidade}`).join(` • `)}</span>
                </div>`:``}
              `}
            </div>
          </div>
        `).join(``)}
      </div>
      ${n.length?`<p class="px-4 pb-3 text-[11px] text-amber-700">${n.length} pedido(s) ativo(s) sem data de entrega — abra o pedido e preencha a data para aparecer na agenda.</p>`:``}
    </div>
  `}function Vl(){let e=document.getElementById(`tab-pedidos`);e&&(e.innerHTML=`
    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-clipboard-list"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="font-bold text-slate-900 text-lg">Quadro Kanban de Pedidos</h2>
            <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hidden sm:inline-flex items-center gap-1">
              <i class="fa-solid fa-hand-pointer text-slate-400"></i> Arraste ou altere o status
            </span>
          </div>
          <p class="text-xs text-slate-500">Mova pedidos entre as etapas e acompanhe margem e lucro real</p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="exportarCSV('pedidos')" class="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-file-csv"></i> Exportar CSV
        </button>
        <button onclick="abrirModalPedido()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2">
          <i class="fa-solid fa-plus"></i> Novo Pedido
        </button>
      </div>
    </div>

    ${Bl()}

    <!-- Kanban Board Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
      ${[{id:`aguardando`,titulo:`Aguardando`,subtitulo:`Sinal pendente`,cor:`amber`,icon:`fa-hourglass-start`,bgBadge:`bg-amber-100 text-amber-800`},{id:`a_produzir`,titulo:`A Produzir`,subtitulo:`Pronto p/ fila`,cor:`blue`,icon:`fa-list-check`,bgBadge:`bg-blue-100 text-blue-800`},{id:`producao`,titulo:`Em Produção`,subtitulo:`Na cozinha/forno`,cor:`purple`,icon:`fa-kitchen-set`,bgBadge:`bg-purple-100 text-purple-800`},{id:`pronto`,titulo:`Entregue`,subtitulo:`Finalizado`,cor:`emerald`,icon:`fa-circle-check`,bgBadge:`bg-emerald-100 text-emerald-800`}].map(e=>{let t=F.filter(t=>t.status===e.id),n=t.reduce((e,t)=>e+(Number(t.valorTotal)||0),0);return`
          <div 
            id="dropzone-${e.id}"
            ondragover="handleDragOver(event, '${e.id}')"
            ondragleave="handleDragLeave(event, '${e.id}')"
            ondrop="handleDrop(event, '${e.id}')"
            class="kanban-dropzone bg-slate-100/90 rounded-2xl p-3.5 border-2 border-transparent transition-all min-h-[540px] flex flex-col"
          >
            <!-- Header da Coluna -->
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg ${e.bgBadge} flex items-center justify-center text-xs">
                  <i class="fa-solid ${e.icon}"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-800 text-sm leading-tight">${e.titulo}</h3>
                  <span class="text-[10px] text-slate-500">${e.subtitulo}</span>
                </div>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-slate-800 shadow-2xs border border-slate-200">
                ${t.length}
              </span>
            </div>

            <div class="flex justify-between items-center text-[11px] text-slate-500 font-medium py-2.5 border-b border-slate-200/60 mb-3">
              <span>Volume da etapa:</span>
              <strong class="text-slate-800 text-xs">${G(n)}</strong>
            </div>

            <!-- Cards dos Pedidos -->
            <div class="space-y-3 flex-1 overflow-y-auto">
              ${t.length===0?`
                <div class="py-12 text-center text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1.5 p-4">
                  <i class="fa-solid fa-inbox text-2xl text-slate-300"></i>
                  <span>Nenhum pedido em <strong>${e.titulo}</strong></span>
                  <span class="text-[11px] text-slate-400">Arraste um pedido para cá</span>
                </div>
              `:t.map(t=>{let n=Dc(t),r=n.restante<=0;return`
                  <div 
                    id="ped-card-${t.id}"
                    draggable="true"
                    ondragstart="handleDragStart(event, '${t.id}')"
                    ondragend="handleDragEnd(event)"
                    class="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-2.5 cursor-grab active:cursor-grabbing select-none"
                  >
                    <!-- Drag Grip & Cliente & WhatsApp -->
                    <div class="flex items-start justify-between gap-1.5">
                      <div class="flex items-start gap-2 flex-1 min-w-0">
                        <div class="text-slate-300 hover:text-slate-500 pt-0.5" title="Arraste para mover">
                          <i class="fa-solid fa-grip-vertical text-sm"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                          <h4 class="font-bold text-slate-900 text-sm leading-snug truncate">${K(t.cliente)}</h4>
                          <a 
                            href="https://wa.me/55${String(t.telefone||``).replace(/\D/g,``)}" 
                            target="_blank" 
                            rel="noopener"
                            class="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold hover:underline mt-0.5"
                            onclick="event.stopPropagation()"
                          >
                            <i class="fa-brands fa-whatsapp"></i> ${K(t.telefone)}
                          </a>
                        </div>
                      </div>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${t.canal===`WhatsApp`?`bg-emerald-50 text-emerald-700 border border-emerald-200`:t.canal===`iFood`?`bg-red-50 text-red-700 border border-red-200`:`bg-amber-50 text-amber-700 border border-amber-200`}">
                        ${t.canal} (${t.taxaPercentual||0}%)
                      </span>
                    </div>

                    <!-- Data e Hora de Entrega -->
                    <div class="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                      <i class="fa-regular fa-clock text-slate-400"></i>
                      <span>Entrega: <strong>${t.dataEntrega||`Hoje`} às ${t.horaEntrega||`12:00`}</strong></span>
                    </div>

                    <!-- Itens do Pedido -->
                    <div class="text-xs text-slate-700 space-y-1">
                      ${(t.itens||[]).slice(0,3).map(e=>`
                        <div class="flex justify-between gap-2">
                          <span class="text-slate-600 truncate">${e.qtd}x ${K(e.nome)}</span>
                          <span class="font-medium shrink-0">${G(e.precoUnit*e.qtd)}</span>
                        </div>
                      `).join(``)}
                      ${(t.itens||[]).length>3?`
                        <p class="text-[11px] text-slate-400 font-medium">+${(t.itens||[]).length-3} item(ns) — abra para ver tudo</p>
                      `:``}
                    </div>

                    <!-- Observações -->
                    ${t.observacoes?`
                      <div class="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-100 line-clamp-2" title="${K(t.observacoes)}">
                        <i class="fa-solid fa-note-sticky mr-1 text-amber-600"></i> ${K(t.observacoes)}
                      </div>
                    `:``}

                    <!-- Resumo Financeiro do Pedido -->
                    <div class="pt-2 border-t border-slate-100 text-xs space-y-1">
                      <div class="flex justify-between font-bold text-slate-900 text-[13px]">
                        <span>Total</span>
                        <span>${G(n.total)}</span>
                      </div>
                      <div class="flex justify-between items-center text-xs font-bold text-emerald-700">
                        <span>Lucro ${cs(t).html}</span>
                        <span>${G(n.lucroLiquido)}</span>
                      </div>
                      <details class="text-[11px] text-slate-500">
                        <summary class="cursor-pointer hover:text-slate-700 font-medium select-none">Detalhes</summary>
                        <div class="pt-1 space-y-0.5">
                          <div class="flex justify-between">
                            <span>Sinal</span>
                            <span class="${r?`text-emerald-600 font-semibold`:`text-amber-600`}">
                              ${G(n.sinal)}${r?``:` • falta ${G(n.restante)}`}
                            </span>
                          </div>
                          <div class="flex justify-between">
                            <span>CMV insumos</span>
                            <span>-${G(n.cmvTotal)}</span>
                          </div>
                          ${n.taxaApp>0?`
                            <div class="flex justify-between text-red-500">
                              <span>Taxa app (${t.taxaPercentual}%)</span>
                              <span>-${G(n.taxaApp)}</span>
                            </div>
                          `:``}
                        </div>
                      </details>
                    </div>

                    <!-- Baixa de Estoque dos Insumos -->
                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      ${t.estoqueBaixado?`
                        <span class="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[10px]" title="${t.dataBaixaEstoque?`Baixado em ${new Date(t.dataBaixaEstoque).toLocaleDateString(`pt-BR`)}`:`Estoque baixado`}">
                          <i class="fa-solid fa-boxes-packing text-emerald-600"></i> Estoque Baixado
                        </span>
                        <button onclick="estornarEstoquePedido('${t.id}')" title="Estornar insumos de volta ao estoque" class="text-slate-400 hover:text-red-600 text-[10px] font-semibold underline cursor-pointer">
                          Estornar
                        </button>
                      `:`
                        <span class="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                          <i class="fa-solid fa-box-open text-slate-400"></i> Estoque:
                        </span>
                        <button onclick="abrirModalConfirmarBaixa('${t.id}')" class="inline-flex items-center gap-1 text-[10px] font-bold text-pink-700 hover:text-pink-800 bg-pink-50 hover:bg-pink-100 border border-pink-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer">
                          <i class="fa-solid fa-box-archive text-[10px]"></i> Baixar Estoque
                        </button>
                      `}
                    </div>

                    <!-- Integração com Livro Caixa -->
                    ${(()=>{let e=zc(t);return`
                        <div class="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          ${e.status===`quitado`?`
                            <span class="inline-flex items-center gap-1 font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md text-[10px]" title="Lançado no caixa: ${G(e.totalLancado)}">
                              <i class="fa-solid fa-cash-register text-teal-600"></i> Caixa: Quitado
                            </span>
                            <button onclick="abrirModalLancarCaixa('${t.id}')" title="Ver lançamentos deste pedido no caixa" class="text-slate-400 hover:text-teal-700 text-[10px] font-semibold underline cursor-pointer">
                              Ver Caixa
                            </button>
                          `:e.status===`parcial`?`
                            <span class="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-[10px]" title="Lançado: ${G(e.totalLancado)} | Falta: ${G(e.saldoPendente)}">
                              <i class="fa-solid fa-clock-rotate-left text-amber-600"></i> Caixa: ${G(e.totalLancado)}
                            </span>
                            <button onclick="abrirModalLancarCaixa('${t.id}', 'restante')" title="Lançar restante pendente no caixa" class="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer">
                              + Restante (${G(e.saldoPendente)})
                            </button>
                            ${(()=>{let e=kd(t);return e?`
                            <a href="${e}" target="_blank" rel="noopener" title="Cobrar restante no WhatsApp" class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer">
                              <i class="fa-brands fa-whatsapp text-[11px]"></i>
                            </a>`:``})()}
                          `:`
                            <span class="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                              <i class="fa-solid fa-cash-register text-slate-400"></i> Caixa:
                            </span>
                            <button onclick="abrirModalLancarCaixa('${t.id}')" class="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer">
                              <i class="fa-solid fa-plus text-[9px]"></i> Lançar no Caixa
                            </button>
                          `}
                        </div>
                      `})()}

                    <!-- Seletor Rápido de Status (Alternativa ao Arrastar) -->
                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                      <div class="flex items-center gap-1 text-xs">
                        <span class="text-[10px] font-semibold text-slate-400">Status:</span>
                        <select 
                          onchange="moverPedidoStatus('${t.id}', this.value)" 
                          class="text-[11px] font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-1.5 py-1 text-slate-700 focus:outline-pink-500 cursor-pointer"
                        >
                          <option value="aguardando" ${t.status===`aguardando`?`selected`:``}>Aguardando</option>
                          <option value="a_produzir" ${t.status===`a_produzir`?`selected`:``}>A Produzir</option>
                          <option value="producao" ${t.status===`producao`?`selected`:``}>Em Produção</option>
                          <option value="pronto" ${t.status===`pronto`?`selected`:``}>Entregue</option>
                        </select>
                      </div>

                      <div class="flex items-center gap-1">
                        <button onclick="imprimirEtiquetaPedido('${t.id}')" title="Imprimir etiqueta" class="p-1 text-slate-400 hover:text-slate-700 text-xs cursor-pointer">
                          <i class="fa-solid fa-print"></i>
                        </button>
                        <button onclick="abrirModalPedido('${t.id}')" title="Editar Pedido" class="p-1 text-slate-400 hover:text-slate-700 text-xs">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="excluirPedido('${t.id}')" title="Excluir Pedido" class="p-1 text-slate-400 hover:text-red-600 text-xs">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>

                    <!-- Botões Rápidos de Avançar / Retroceder -->
                    <div class="flex items-center justify-between pt-1 text-[10px]">
                      ${e.id===`aguardando`?`<span></span>`:`
                        <button onclick="moverPedidoStatus('${t.id}', '${Hl(e.id)}')" class="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 p-1 hover:bg-slate-100 rounded">
                          <i class="fa-solid fa-chevron-left text-[9px]"></i> Voltar
                        </button>
                      `}
                      ${e.id===`pronto`?`<span class="text-emerald-600 font-bold flex items-center gap-1"><i class="fa-solid fa-check text-[10px]"></i> Concluído</span>`:`
                        <button onclick="moverPedidoStatus('${t.id}', '${Ul(e.id)}')" class="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 p-1 hover:bg-pink-50 rounded">
                          Avançar <i class="fa-solid fa-chevron-right text-[9px]"></i>
                        </button>
                      `}
                    </div>
                  </div>
                `}).join(``)}
            </div>
          </div>
        `}).join(``)}
    </div>
  `)}function Hl(e){return e===`pronto`?`producao`:e===`producao`?`a_produzir`:`aguardando`}function Ul(e){return e===`aguardando`?`a_produzir`:e===`a_produzir`?`producao`:`pronto`}function Wl(e,t){let n=F.find(t=>t.id===e);if(n){if(n.status,n.status=t,W(M.PEDIDOS),(t===`producao`||t===`pronto`)&&!n.estoqueBaixado&&kc(n).length>0){q(`Pedido de ${n.cliente} movido para "${Al[t]||t}"!`),Y(),setTimeout(()=>{Fc(e)},250);return}if(t===`pronto`&&zc(n).saldoPendente>0){q(`Pedido de ${n.cliente} entregue! Lançamento do restante no Caixa pendente.`),Y(),setTimeout(()=>{Bc(e,`restante`)},300);return}q(`Pedido de ${n.cliente} alterado para "${Al[t]||t}"!`),Y()}}var Gl=[];function Kl(e=null){let t=e?F.find(t=>t.id===e):null;Gl=t?JSON.parse(JSON.stringify(t.itens)):[],Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-clipboard-list text-purple-600"></i> ${t?`Editar Pedido`:`Novo Pedido`}
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form id="formPedido" onsubmit="salvarPedido(event, '${e||``}')" class="mt-4 space-y-4 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Nome do Cliente</label>
          <input type="text" id="pedCliente" value="${t?t.cliente:``}" placeholder="Ex: Mariana Silva" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
          <input type="text" id="pedTelefone" value="${t?t.telefone:``}" placeholder="Ex: 11987654321" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Data da Entrega</label>
          <input type="date" id="pedDataEntrega" value="${t?t.dataEntrega:new Date().toISOString().split(`T`)[0]}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Hora da Entrega</label>
          <input type="time" id="pedHoraEntrega" value="${t?t.horaEntrega:`14:00`}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Canal de Origem</label>
          <select id="pedCanal" onchange="atualizarTaxaPorCanal(this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
            <option value="WhatsApp" ${t&&t.canal===`WhatsApp`?`selected`:``}>WhatsApp / Venda Direta (0%)</option>
            <option value="iFood" ${t&&t.canal===`iFood`?`selected`:``}>iFood (23%)</option>
            <option value="99Food" ${t&&t.canal===`99Food`?`selected`:``}>99Food (18%)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Taxa do Canal (%)</label>
          <input type="number" step="0.5" id="pedTaxaPercentual" value="${t?t.taxaPercentual:0}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <!-- Itens do Pedido (Produtos / Fichas) -->
      <div class="pt-2 border-t border-slate-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-700 uppercase">Itens do Pedido</span>
          <button type="button" onclick="adicionarItemPedido()" class="text-xs text-pink-600 font-semibold hover:text-pink-700 flex items-center gap-1">
            <i class="fa-solid fa-plus"></i> Adicionar Produto
          </button>
        </div>

        <div id="listaItensPedidoModal" class="space-y-2 max-h-40 overflow-y-auto pr-1">
          <!-- Gerado dinamicamente -->
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 pt-2">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Valor Total (R$)</label>
          <input type="number" step="0.01" id="pedValorTotal" value="${t?t.valorTotal:0}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 font-bold text-slate-900 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Sinal Pago (R$)</label>
          <input type="number" step="0.01" id="pedValorSinal" value="${t?t.valorSinal:0}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Status do Pedido</label>
        <select id="pedStatus" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
          <option value="aguardando" ${t&&t.status===`aguardando`?`selected`:``}>Aguardando</option>
          <option value="a_produzir" ${t&&t.status===`a_produzir`?`selected`:``}>A Produzir</option>
          <option value="producao" ${t&&t.status===`producao`?`selected`:``}>Em Produção</option>
          <option value="pronto" ${t&&t.status===`pronto`?`selected`:``}>Entregue</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Observações (Tema, Decoração, Alergias)</label>
        <textarea id="pedObservacoes" rows="2" placeholder="Ex: Placa de chocolate Parabéns Lucas..." class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-pink-500">${t&&t.observacoes||``}</textarea>
      </div>

      ${t?``:`
        <!-- Integração Caixa: Entrada Automática do Sinal -->
        <div class="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-2.5 text-xs text-teal-900">
          <input type="checkbox" id="pedLancarSinalCaixa" checked class="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer" />
          <label for="pedLancarSinalCaixa" class="cursor-pointer">
            <span class="font-bold block">Registrar sinal recebido automaticamente no Caixa</span>
            <span class="text-[11px] text-teal-700">Se o valor do sinal for maior que R$ 0,00, cria imediatamente uma entrada correspondente no Livro Caixa.</span>
          </label>
        </div>
      `}

      ${t?(()=>{let e=zc(t);return`
          <!-- Integração com Livro Caixa (Modo Edição) -->
          <div class="p-3 rounded-xl border ${e.status===`quitado`?`bg-teal-50 border-teal-200 text-teal-900`:e.status===`parcial`?`bg-amber-50 border-amber-200 text-amber-900`:`bg-slate-50 border-slate-200 text-slate-700`} flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-cash-register ${e.status===`quitado`?`text-teal-600`:e.status===`parcial`?`text-amber-600`:`text-slate-400`} text-base"></i>
              <div>
                <p class="font-bold">
                  ${e.status===`quitado`?`Caixa: 100% Quitado`:e.status===`parcial`?`Caixa Parcial: ${G(e.totalLancado)} recebido`:`Nenhum lançamento no Caixa`}
                </p>
                <p class="text-[11px] ${e.status===`quitado`?`text-teal-700`:e.status===`parcial`?`text-amber-700`:`text-slate-500`}">
                  ${e.saldoPendente>0?`Falta lançar ${G(e.saldoPendente)} no caixa`:`Total líquido de ${G(e.valorLiquidoEsperado)} registrado no caixa`}
                </p>
              </div>
            </div>
            <button type="button" onclick="abrirModalLancarCaixa('${t.id}')" class="px-2.5 py-1 text-xs font-bold rounded ${e.status===`quitado`?`bg-white border border-teal-300 text-teal-800 hover:bg-teal-100`:`bg-teal-600 hover:bg-teal-700 text-white`} cursor-pointer shadow-2xs">
              ${e.status===`quitado`?`Ver Lançamentos`:`Lançar no Caixa`}
            </button>
          </div>
        `})():``}

      ${t?`
        <div class="p-3 rounded-xl border ${t.estoqueBaixado?`bg-emerald-50 border-emerald-200 text-emerald-900`:`bg-slate-50 border-slate-200 text-slate-700`} flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <i class="fa-solid ${t.estoqueBaixado?`fa-boxes-packing text-emerald-600`:`fa-box-open text-slate-400`} text-base"></i>
            <div>
              <p class="font-bold">${t.estoqueBaixado?`Estoque já baixado para este pedido`:`Insumos pendentes de baixa no estoque`}</p>
              <p class="text-[11px] ${t.estoqueBaixado?`text-emerald-700`:`text-slate-500`}">
                ${t.estoqueBaixado&&t.dataBaixaEstoque?`Baixa registrada em: ${new Date(t.dataBaixaEstoque).toLocaleDateString(`pt-BR`)}`:`Você pode conferir os ingredientes e dar baixa agora.`}
              </p>
            </div>
          </div>
          ${t.estoqueBaixado?`
            <button type="button" onclick="estornarEstoquePedido('${t.id}')" class="px-2.5 py-1 text-xs font-bold rounded bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer shadow-2xs">
              Estornar
            </button>
          `:`
            <button type="button" onclick="abrirModalConfirmarBaixa('${t.id}')" class="px-2.5 py-1 text-xs font-bold rounded bg-pink-600 hover:bg-pink-700 text-white cursor-pointer shadow-2xs">
              Baixar Insumos
            </button>
          `}
        </div>
      `:``}

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold">${t?`Salvar Pedido`:`Criar Pedido`}</button>
      </div>
    </form>
  `),Jl()}function ql(e){let t=document.getElementById(`pedTaxaPercentual`);t&&(t.value=Wo(e))}function Jl(){let e=document.getElementById(`listaItensPedidoModal`);if(e){if(Gl.length===0){e.innerHTML=`<p class="text-xs text-slate-400 py-1 text-center">Nenhum produto adicionado.</p>`;return}e.innerHTML=Gl.map((e,t)=>`
      <div class="flex items-center gap-2">
        <select onchange="selecionarFichaItemPedido(${t}, this.value)" class="flex-1 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800">
          <option value="">Selecione a receita...</option>
          ${P.map(t=>`
            <option value="${t.id}" ${t.id===e.fichaId?`selected`:``}>${t.nome}</option>
          `).join(``)}
        </select>
        <input 
          type="number" 
          step="1" 
          value="${e.qtd||1}" 
          placeholder="Qtd"
          oninput="atualizarItemPedidoCampo(${t}, 'qtd', this.value)"
          class="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800" 
        />
        <input 
          type="number" 
          step="0.01" 
          value="${e.precoUnit||0}" 
          placeholder="Preço R$"
          oninput="atualizarItemPedidoCampo(${t}, 'precoUnit', this.value)"
          class="w-24 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800" 
        />
        <button type="button" onclick="removerItemPedido(${t})" class="text-red-500 hover:text-red-700 p-1"><i class="fa-solid fa-trash-can text-xs"></i></button>
      </div>
    `).join(``)}}function Yl(){let e=P[0];Gl.push({fichaId:e?e.id:``,nome:e?e.nome:`Produto`,qtd:1,precoUnit:80}),Jl(),$l()}function Xl(e,t){let n=P.find(e=>e.id===t);if(n&&Gl[e]){Gl[e].fichaId=n.id,Gl[e].nome=n.nome;let t=X(n),r=Math.round(t/(1-(n.margemAlvo||60)/100));Gl[e].precoUnit=r}Jl(),$l()}function Zl(e,t,n){Gl[e]&&(Gl[e][t]=Number(n)||0,$l())}function Ql(e){Gl.splice(e,1),Jl(),$l()}function $l(){let e=Gl.reduce((e,t)=>e+(t.qtd||1)*(t.precoUnit||0),0),t=document.getElementById(`pedValorTotal`);t&&(t.value=e.toFixed(2))}function eu(e,t){e.preventDefault();let n=document.getElementById(`pedCliente`).value.trim(),r=document.getElementById(`pedTelefone`).value.trim(),i=document.getElementById(`pedDataEntrega`).value,a=document.getElementById(`pedHoraEntrega`).value,o=document.getElementById(`pedCanal`).value,s=Number(document.getElementById(`pedTaxaPercentual`).value)||0,c=Number(document.getElementById(`pedValorTotal`).value)||0,l=Number(document.getElementById(`pedValorSinal`).value)||0,u=document.getElementById(`pedStatus`).value,d=document.getElementById(`pedObservacoes`).value.trim(),f=document.getElementById(`pedLancarSinalCaixa`)?.checked;if(Gl.length===0){alert(`Adicione pelo menos um item ao pedido!`);return}if(t){let e=F.find(e=>e.id===t);e&&(e.cliente=n,e.telefone=r,e.dataEntrega=i,e.horaEntrega=a,e.canal=o,e.taxaPercentual=s,e.valorTotal=c,e.valorSinal=l,e.status=u,e.observacoes=d,e.itens=Gl)}else{let e={id:`ped-`+Date.now(),cliente:n,telefone:r,dataEntrega:i,horaEntrega:a,canal:o,taxaPercentual:s,valorTotal:c,valorSinal:l,status:u,observacoes:d,itens:Gl,estoqueBaixado:!1};if(F.push(e),f&&l>0){let t=o===`iFood`||o===`99Food`?`Repasse App`:`PIX`;I.unshift({id:`lan-`+Date.now(),pedidoId:e.id,data:new Date().toISOString().split(`T`)[0],tipo:`entrada`,categoria:`Venda de Pedido`,forma:t,descricao:`Sinal Pedido #${e.id} - ${n}`,valor:l}),W(M.LANCAMENTOS)}}W(M.PEDIDOS),sd(n,r),$(),q(`Pedido registrado com sucesso!`),Y()}function tu(e){let t=F.find(t=>t.id===e);if(!t)return;if(t.estoqueBaixado)confirm(`Atenção: O pedido de "${t.cliente}" já teve baixa de estoque realizada.\n\nDeseja devolver os insumos ao estoque físico antes de excluir?`)&&(kc(t).forEach(e=>{let t=N.find(t=>t.id===e.insumoId);if(t){let n=Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0,r=Number((n+e.qtdConsumo).toFixed(3));t.estoqueAtual=r,t.quantidade=r}}),W(M.INSUMOS),Ks());else if(!confirm(`Deseja realmente excluir o pedido de "${t.cliente}"?`))return;let n=Rc(e);if(n.length>0){let t=n.reduce((e,t)=>e+(Number(t.valor)||0),0);if(confirm(`Este pedido possui ${n.length} lançamento(s) no Caixa (Total: ${G(t)}).\n\nDeseja remover também esses lançamentos do Livro Caixa?`)){let t=n.map(e=>e.id);I=I.filter(t=>t.pedidoId!==e),O&&uo(`lancamentos`,t).catch(e=>console.error(e)),W(M.LANCAMENTOS)}}F=F.filter(t=>t.id!==e),O&&lo(`pedidos`,e).catch(e=>console.error(e)),W(M.PEDIDOS),q(`Pedido removido com sucesso.`),Y()}function nu(){let e=document.getElementById(`tab-mrp`);if(!e)return;let t=F.filter(e=>e.status!==`pronto`&&!e.estoqueBaixado),n={};t.forEach(e=>{(e.itens||[]).forEach(e=>{let t=P.find(t=>t.id===e.fichaId);if(t&&t.ingredientes){let r=(e.qtd||1)/(t.rendimento||1);t.ingredientes.forEach(e=>{n[e.insumoId]||(n[e.insumoId]=0),n[e.insumoId]+=e.qtd*r})}})});let r=[],i=0;N.forEach(e=>{let t=n[e.id]||0;if(t>0){let n=e.estoqueAtual||0,a=n-t,o=a<0?Math.abs(a):0,s=o>0?Math.ceil(o/e.qtdPacote):0,c=s*e.precoPacote;i+=c,r.push({insumo:e,necessario:t,estoqueAtual:n,saldo:a,falta:o,pacotesAComprar:s,custoEstimado:c})}}),e.innerHTML=`
    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <div>
          <h2 class="font-bold text-slate-900 text-lg">Previsão de Compras (Calculadora MRP)</h2>
          <p class="text-xs text-slate-500">Cálculo de necessidades para ${t.length} pedido(s) ativos na fila</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <span class="text-xs text-slate-500 block">Custo Estimado da Lista</span>
          <span class="text-base font-bold text-slate-900">${G(i)}</span>
        </div>
        ${i>0?`
          <button onclick="abrirModalLancarCompraMRPCaixa(${i})" class="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer" title="Registrar despesa desta compra de insumos diretamente no Livro Caixa">
            <i class="fa-solid fa-receipt"></i> Lançar no Caixa
          </button>
        `:``}
        <button onclick="copiarListaComprasWhatsApp()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fa-brands fa-whatsapp text-base"></i> Copiar WhatsApp
        </button>
      </div>
    </div>

    <!-- Tabela MRP -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Comparativo: Necessidade dos Pedidos Ativos vs. Estoque Atual
        </span>
        <span class="text-xs text-slate-500">
          ${r.filter(e=>e.falta>0).length} itens precisam de reposição
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-600 uppercase">
            <tr>
              <th class="py-3.5 px-4">Insumo</th>
              <th class="py-3.5 px-3">Necessidade Total</th>
              <th class="py-3.5 px-3">Estoque Atual</th>
              <th class="py-3.5 px-3">Saldo Projetado</th>
              <th class="py-3.5 px-3">Falta</th>
              <th class="py-3.5 px-3">Pacotes a Comprar</th>
              <th class="py-3.5 px-4 text-right">Custo Estimado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${r.length===0?`
              <tr>
                <td colspan="7" class="py-8 text-center text-slate-400">
                  <i class="fa-solid fa-clipboard-check text-2xl mb-2 block"></i>
                  Nenhum ingrediente demandado pelos pedidos ativos.
                </td>
              </tr>
            `:r.map(e=>{let t=e.falta>0;return`
                <tr class="hover:bg-slate-50/80 transition-colors ${t?`bg-rose-50/30`:``}">
                  <td class="py-3.5 px-4 font-semibold text-slate-900">
                    ${e.insumo.nome}
                    <span class="text-xs text-slate-400 font-normal block">${e.insumo.categoria}</span>
                  </td>
                  <td class="py-3.5 px-3 font-semibold text-slate-800">
                    ${e.necessario} ${e.insumo.unidade}
                  </td>
                  <td class="py-3.5 px-3 text-slate-700">
                    ${e.estoqueAtual} ${e.insumo.unidade}
                  </td>
                  <td class="py-3.5 px-3">
                    <span class="text-xs font-bold ${e.saldo<0?`text-red-600`:`text-emerald-600`}">
                      ${e.saldo>0?`+`:``}${e.saldo} ${e.insumo.unidade}
                    </span>
                  </td>
                  <td class="py-3.5 px-3">
                    ${t?`
                      <span class="font-bold text-red-600">${e.falta} ${e.insumo.unidade}</span>
                    `:`
                      <span class="text-xs text-emerald-600 font-medium">Suficiente</span>
                    `}
                  </td>
                  <td class="py-3.5 px-3">
                    ${t?`
                      <span class="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-red-100 text-red-800 border border-red-200">
                        <i class="fa-solid fa-basket-shopping"></i> Comprar ${e.pacotesAComprar} pct (${e.insumo.qtdPacote}${e.insumo.unidade}/pct)
                      </span>
                    `:`
                      <span class="text-xs text-slate-400">0 pct</span>
                    `}
                  </td>
                  <td class="py-3.5 px-4 text-right font-bold ${t?`text-slate-900`:`text-slate-400`}">
                    ${G(e.custoEstimado)}
                  </td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function ru(){let e=F.filter(e=>e.status!==`pronto`&&!e.estoqueBaixado),t={};e.forEach(e=>{(e.itens||[]).forEach(e=>{let n=P.find(t=>t.id===e.fichaId);if(n&&n.ingredientes){let r=(e.qtd||1)/(n.rendimento||1);n.ingredientes.forEach(e=>{t[e.insumoId]||(t[e.insumoId]=0),t[e.insumoId]+=e.qtd*r})}})});let n=[],r=0;if(N.forEach(e=>{let i=t[e.id]||0,a=Math.max(0,i-(e.estoqueAtual||0));if(a>0){let t=Math.ceil(a/e.qtdPacote),i=t*e.precoPacote;r+=i,n.push(`• *${e.nome}*: ${t}x pacote(s) [${e.qtdPacote}${e.unidade}] (~${G(i)})`)}}),n.length===0){q(`O estoque atual é suficiente para todos os pedidos ativos!`);return}let i=[`🛒 *LISTA DE COMPRAS - CONFEITARIA* 🎂`,`Data: ${new Date().toLocaleDateString(`pt-BR`)}`,`Pedidos na fila: ${e.length} pedidos`,`----------------------------------`,`*ITENS A COMPRAR NO MERCADO:*`,...n,`----------------------------------`,`💰 *Custo Total Estimado: ${G(r)}*`].join(`
`);navigator.clipboard.writeText(i).then(()=>{q(`Lista de compras copiada para o WhatsApp!`)}).catch(()=>{alert(`Texto da lista de compras:

`+i)})}function iu(e){return`
    <!-- DRE MENSAL -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2"><i class="fa-solid fa-scale-balanced text-purple-600"></i> DRE do Mês — Resultado Real</h3>
          <p class="text-xs text-slate-500">Competência pela data de entrega dos pedidos + caixa pela data do lançamento</p>
        </div>
        <div class="flex items-center gap-2">
          <input type="month" value="${e.prefix}" onchange="setDreMes(this.value)" class="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800" />
          <button onclick="exportarCSV('caixa')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer">CSV</button>
        </div>
      </div>
      <div class="p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">Faturamento (${e.qtdPedidos} pedidos)</p><p class="text-base font-black text-slate-900">${G(e.faturamento)}</p></div>
        <div class="p-3 rounded-xl bg-red-50/60 border border-red-100"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) CMV insumos</p><p class="text-base font-bold text-red-700">−${G(e.cmv)}</p></div>
        <div class="p-3 rounded-xl bg-red-50/60 border border-red-100"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) Taxas apps</p><p class="text-base font-bold text-red-700">−${G(e.taxas)}</p></div>
        <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">Lucro bruto</p><p class="text-base font-black text-emerald-700">${G(e.lucroBruto)}</p></div>
        <div class="p-3 rounded-xl bg-white border border-slate-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) Custos fixos</p><p class="font-bold">−${G(e.custosFixos)}</p></div>
        <div class="p-3 rounded-xl bg-white border border-slate-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) Pró-labore</p><p class="font-bold">−${G(e.proLabore)}</p></div>
        <div class="p-3 rounded-xl bg-white border border-slate-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) Outras saídas</p><p class="font-bold">−${G(e.outrasSaidas)}</p></div>
        <div class="p-3 rounded-xl ${e.lucroLiquido>=0?`bg-purple-50 border-purple-200`:`bg-red-50 border-red-200`} border"><p class="text-slate-500 font-semibold uppercase text-[10px]">= Lucro líquido (${e.margem.toFixed(1)}%)</p><p class="text-base font-black ${e.lucroLiquido>=0?`text-purple-700`:`text-red-700`}">${G(e.lucroLiquido)}</p></div>
      </div>
      ${e.faturamento===0?`<p class="px-4 pb-3 text-[11px] text-amber-700">Sem pedidos com entrega em ${e.prefix}. Troque o mês ou confira a data de entrega dos pedidos.</p>`:``}
    </div>`}function au(){let e=document.getElementById(`tab-dre`);e&&(e.innerHTML=`
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">DRE do Mês</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Demonstrativo do resultado • grupo Financeiro</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="gerarRelatorioContador()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer" title="Baixa CSV com DRE, pedidos, caixa e estoque do mês">
          <i class="fa-solid fa-file-arrow-down"></i> Relatório p/ contador
        </button>
        <button onclick="switchTab('caixa')" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer">
          <i class="fa-solid fa-cash-register text-teal-600"></i> Abrir Livro Caixa
        </button>
      </div>
    </div>
    ${iu(xc(yc))}
    <div class="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-2.5">
      <i class="fa-solid fa-lightbulb text-blue-500 mt-0.5"></i>
      <div>Margem líquida saudável para confeitaria fica entre <strong>20% e 40%</strong>. Abaixo disso, revise o CMV nas fichas ou as taxas dos canais em Promoções.</div>
    </div>
  `)}function ou(){let e=document.getElementById(`tab-caixa`);if(!e)return;let t=I.filter(e=>e.tipo===`entrada`).reduce((e,t)=>e+Number(t.valor),0),n=I.filter(e=>e.tipo===`saida`).reduce((e,t)=>e+Number(t.valor),0),r=I.filter(e=>e.categoria===`Pró-Labore`).reduce((e,t)=>e+Number(t.valor),0),i=t-n,a=F.map(e=>({pedido:e,statusCaixa:zc(e)})).filter(e=>e.statusCaixa.saldoPendente>0),o=a.reduce((e,t)=>e+t.statusCaixa.saldoPendente,0),s=fc(`caixa`,I);e.innerHTML=`
    ${iu(xc(yc))}

    <!-- Top Bar & Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-cash-register"></i>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Saldo em Caixa</p>
          <p class="text-xl font-black ${i>=0?`text-teal-600`:`text-red-600`}">${G(i)}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-arrow-down-long"></i>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Entradas</p>
          <p class="text-xl font-bold text-slate-900">${G(t)}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-arrow-up-long"></i>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Saídas</p>
          <p class="text-xl font-bold text-slate-900">${G(n)}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-hand-holding-dollar"></i>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pró-Labore Retirado</p>
          <p class="text-xl font-bold text-purple-600">${G(r)}</p>
        </div>
      </div>
    </div>

    <!-- Conciliação com Pedidos: Receitas Pendentes de Lançamento -->
    ${a.length>0?`
      <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-xs">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-amber-200/70">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-200/70 text-amber-800 flex items-center justify-center text-sm font-bold">
              <i class="fa-solid fa-cash-register"></i>
            </div>
            <div>
              <h4 class="font-bold text-amber-950 text-xs sm:text-sm">
                ${a.length} Pedido(s) com Recebimentos Pendentes de Registro no Caixa
              </h4>
              <p class="text-[11px] text-amber-800">
                Receita líquida total a dar entrada no caixa: <strong class="text-amber-900">${G(o)}</strong>
              </p>
            </div>
          </div>
        </div>
        <div class="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          ${a.map(({pedido:e,statusCaixa:t})=>`
            <div class="bg-white rounded-xl p-3 border border-amber-200 flex items-center justify-between text-xs shadow-2xs">
              <div class="truncate mr-2">
                <span class="font-bold text-slate-900 block truncate">${K(e.cliente)}</span>
                <span class="text-[10px] text-slate-500">
                  #${e.id} • Falta lançar: <strong class="text-amber-700">${G(t.saldoPendente)}</strong>
                </span>
              </div>
              <button onclick="abrirModalLancarCaixa('${e.id}')" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-2xs shrink-0 cursor-pointer transition-colors flex items-center gap-1">
                <i class="fa-solid fa-plus text-[9px]"></i> Lançar
              </button>
              ${(()=>{let t=kd(e);return t?`
              <a href="${t}" target="_blank" rel="noopener" title="Cobrar saldo no WhatsApp" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-2xs shrink-0 cursor-pointer transition-colors flex items-center gap-1">
                <i class="fa-brands fa-whatsapp text-[11px]"></i> Cobrar
              </a>`:``})()}
            </div>
          `).join(``)}
        </div>
      </div>
    `:``}

    <!-- Actions & Table -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h3 class="font-bold text-slate-900 text-base">Livro Caixa (Entradas e Saídas)</h3>
          <p class="text-xs text-slate-500">Histórico de movimentações financeiras operacionais</p>
        </div>
        <button onclick="abrirModalLancamento()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-plus"></i> Novo Lançamento
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
            <tr>
              <th class="py-3.5 px-4">Data</th>
              <th class="py-3.5 px-3">Tipo</th>
              <th class="py-3.5 px-3">Categoria</th>
              <th class="py-3.5 px-4">Descrição / Origem</th>
              <th class="py-3.5 px-3">Forma</th>
              <th class="py-3.5 px-4 text-right">Valor</th>
              <th class="py-3.5 px-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${I.length===0?`
              <tr>
                <td colspan="7" class="py-8 text-center text-slate-400">Nenhum lançamento no caixa.</td>
              </tr>
            `:s.itens.map(e=>`
              <tr class="hover:bg-slate-50/80 transition-colors">
                <td class="py-3.5 px-4 text-xs font-medium text-slate-600">${e.data}</td>
                <td class="py-3.5 px-3">
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${e.tipo===`entrada`?`bg-emerald-100 text-emerald-700`:`bg-red-100 text-red-700`}">
                    ${e.tipo===`entrada`?`+ Entrada`:`- Saída`}
                  </span>
                </td>
                <td class="py-3.5 px-3 text-xs font-semibold text-slate-700">${e.categoria}</td>
                <td class="py-3.5 px-4 text-slate-900 font-medium">
                  ${e.descricao}
                  ${e.pedidoId?`
                    <button onclick="abrirModalPedido('${e.pedidoId}')" class="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded hover:bg-teal-100 transition-colors ml-1.5 cursor-pointer" title="Ver Detalhes do Pedido">
                      <i class="fa-solid fa-clipboard-list text-[9px]"></i> #${e.pedidoId.replace(`ped-`,``)}
                    </button>
                  `:``}
                </td>
                <td class="py-3.5 px-3 text-xs text-slate-500">${e.forma||`PIX`}</td>
                <td class="py-3.5 px-4 text-right font-bold ${e.tipo===`entrada`?`text-emerald-600`:`text-slate-900`}">
                  ${e.tipo===`entrada`?`+`:`-`}${G(e.valor)}
                </td>
                <td class="py-3.5 px-3 text-right">
                  <button onclick="excluirLancamento('${e.id}')" title="Excluir Lançamento" class="text-slate-400 hover:text-red-600 p-1 cursor-pointer"><i class="fa-solid fa-trash-can text-xs"></i></button>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>
      ${pc(`caixa`,s.total,s.atual)}
    </div>
  `}function su(){Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-cash-register text-teal-500"></i> Novo Lançamento de Caixa
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form id="formLancamento" onsubmit="salvarLancamento(event)" class="mt-4 space-y-4 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Tipo de Movimentação</label>
          <select id="lanTipo" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
            <option value="entrada">Entrada (+)</option>
            <option value="saida">Saída (-)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Data</label>
          <input type="date" id="lanData" value="${new Date().toISOString().split(`T`)[0]}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Categoria</label>
          <select id="lanCategoria" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
            <option value="Venda de Pedido">Venda de Pedido</option>
            <option value="Compra de Insumos">Compra de Insumos</option>
            <option value="Pró-Labore">Retirada de Pró-Labore</option>
            <option value="Custo Fixo">Custo Fixo (Gás, Luz, MEI)</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Forma de Pagamento</label>
          <select id="lanForma" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
            <option value="PIX">PIX</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Repasse App">Repasse App</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Vincular a um Pedido (Opcional)</label>
        <select id="lanPedidoId" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-pink-500">
          <option value="">Nenhum (Lançamento avulso)</option>
          ${F.map(e=>`
            <option value="${e.id}">Pedido #${e.id} - ${e.cliente} (${G(e.valorTotal)})</option>
          `).join(``)}
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Descrição</label>
        <input type="text" id="lanDescricao" placeholder="Ex: Compra de embalagens no atacado" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Valor (R$)</label>
        <input type="number" step="0.01" id="lanValor" placeholder="0.00" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-bold focus:outline-pink-500" />
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold cursor-pointer">Salvar Lançamento</button>
      </div>
    </form>
  `)}function cu(e){e.preventDefault();let t=document.getElementById(`lanTipo`).value,n=document.getElementById(`lanData`).value,r=document.getElementById(`lanCategoria`).value,i=document.getElementById(`lanForma`).value,a=document.getElementById(`lanDescricao`).value.trim(),o=Number(document.getElementById(`lanValor`).value)||0,s=document.getElementById(`lanPedidoId`)?.value||null;I.unshift({id:`lan-`+Date.now(),pedidoId:s||void 0,data:n,tipo:t,categoria:r,forma:i,descricao:a,valor:o}),W(M.LANCAMENTOS),$(),q(`Lançamento registrado!`),dc.caixa.pagina=1,Y()}function lu(e){confirm(`Deseja excluir este lançamento?`)&&(I=I.filter(t=>t.id!==e),O&&lo(`lancamentos`,e).catch(e=>console.error(e)),W(M.LANCAMENTOS),q(`Lançamento removido.`),Y())}function uu(e,t){let n=Ro(e),r=Ro(t);if(!n.some(e=>Object.keys(B[e]||{}).length>0)){q(`A semana de origem está vazia.`,!1);return}let i=n[0].split(`-`).reverse().slice(0,2).join(`/`),a=r[0].split(`-`).reverse().slice(0,2).join(`/`);(!r.some(e=>Object.keys(B[e]||{}).length>0)||confirm(`A semana de ${a} já tem quantidades. Sobrescrever?`))&&(r.forEach((e,t)=>{let r=B[n[t]]||{};Object.keys(r).length?B[e]=JSON.parse(JSON.stringify(r)):delete B[e]}),Io(),Fu(),q(`Cardápio de ${i} copiado para ${a}!`))}function du(e){let t=e.target;if(t&&t.tagName===`INPUT`&&t.type===`number`&&t.dataset.grade){if(e.key===`ArrowRight`||e.key===`Enter`){e.preventDefault();let n=fu(t,1,!1);n&&(n.focus(),n.select())}else if(e.key===`ArrowLeft`){e.preventDefault();let n=fu(t,-1,!1);n&&(n.focus(),n.select())}else if(e.key===`ArrowDown`||e.key===`ArrowUp`){e.preventDefault();let n=fu(t,e.key===`ArrowDown`?7:-7,!0);n&&(n.focus(),n.select())}else e.key===`Escape`&&(e.preventDefault(),t.value=t.dataset.valorOriginal||``,t.blur())}}function fu(e,t,n){let r=document.getElementById(`gradeCardapio`);if(!r)return null;let i=Array.from(r.querySelectorAll(`input[data-grade]`)),a=i.indexOf(e);if(a<0)return null;let o=a+t;return o<0||o>=i.length||!n&&Math.floor(a/7)!==Math.floor(o/7)?null:i[o]}function pu(){let e=e=>[-2,-1,0,1,2].map(t=>{let n=Ro(t),r=n[0].split(`-`).reverse().slice(0,2).join(`/`)+` a `+n[6].split(`-`).reverse().slice(0,2).join(`/`),i=t===0?`Esta semana`:t<0?`${Math.abs(t)} semana(s) atrás`:`Em ${t} semana(s)`,a=n.reduce((e,t)=>e+Object.keys(B[t]||{}).length,0);return`<option value="${t}" ${t===e?`selected`:``}>${i} — ${r} (${a} produto(s))</option>`}).join(``);Q(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-copy text-emerald-600"></i> Duplicar cardápio da semana
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form onsubmit="confirmarDuplicarSemana(event)" class="mt-4 space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Copiar de</label>
        <select id="dupOrigem" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800">${e(jo)}</select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Copiar para</label>
        <select id="dupDestino" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800">${e(jo+1)}</select>
      </div>
      <p class="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
        As quantidades são copiadas mantendo o mesmo dia da semana (seg→seg, ter→ter). Útil quando o cardápio se repete: você só ajusta o que mudou.
      </p>
      <div class="flex justify-end gap-2 pt-2 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-xs">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs">Duplicar</button>
      </div>
    </form>
  `)}function mu(e){e&&(Ao=e),Fu()}function hu(e){e===0?jo=0:jo+=e,Fu()}function gu(e,t){let n=B[e];return!n||Array.isArray(n)?0:Math.max(0,Number(n[t])||0)}function _u(e,t,n){let r=Math.max(0,Number(n)||0);(!B[e]||Array.isArray(B[e]))&&(B[e]={}),r>0?B[e][t]=r:delete B[e][t],Object.keys(B[e]).length===0&&delete B[e],Io(),Fu()}function vu(e,t,n){(!B[e]||Array.isArray(B[e]))&&(B[e]={}),n>0?B[e][t]=n:delete B[e][t],Object.keys(B[e]).length===0&&delete B[e]}function yu(e){Mo=String(e||``).trim().toLowerCase(),Fu();let t=document.getElementById(`cardapioBusca`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}function bu(){No=!No,Fu()}function xu(e){confirm(`Preencher todos os ${e} dias com 1 unidade de cada ficha?\n\nUse como ponto de partida e ajuste as quantidades.`)&&Su(1,!1)}function Su(e,t=!0){if(P.length===0){q(`Cadastre fichas técnicas primeiro.`,!1);return}(!t||confirm(`Preencher os 7 dias com ${e} un de cada produto?`))&&(Ro(jo).forEach(t=>P.forEach(n=>vu(t,n.id,e))),Io(),Fu(),q(`Cardápio preenchido com ${e} un. de cada produto. Ajuste as quantidades agora.`))}function Cu(){uu(-1,0)}function wu(){let e=document.getElementById(`menuPreencher`);e&&e.classList.toggle(`hidden`)}function Tu(){let e=Ro(jo);e.some(e=>Object.keys(B[e]||{}).length>0)&&confirm(`Limpar toda a produção planejada desta semana?`)&&(e.forEach(e=>delete B[e]),Io(),Fu(),q(`Produção da semana limpa.`))}function Eu(e=0){let t=Ro(e),n={},r={},i=0,a=0,o=0;return t.forEach(e=>{let t=B[e]||{};r[e]={qtd:0,receita:0,custo:0,itens:0},Object.keys(t).forEach(s=>{let c=P.find(e=>e.id===s);if(!c)return;let l=Math.max(0,Number(t[s])||0);if(l<=0)return;let u=Number(c.rendimento)>0?Number(c.rendimento):1,d=X(c)/u,f=l*(Number(c.precoPraticado)||0),p=l*d;i+=l,a+=f,o+=p,r[e].qtd+=l,r[e].receita+=f,r[e].custo+=p,r[e].itens+=1,n[s]||(n[s]={qtd:0,receita:0,custo:0}),n[s].qtd+=l,n[s].receita+=f,n[s].custo+=p})}),{dias:t,porFicha:n,porDia:r,qtdTotal:i,receita:a,custo:o,lucro:a-o,margem:a>0?(a-o)/a*100:0,diasAtivos:Object.values(r).filter(e=>e.itens>0).length,insumos:Du(e)}}function Du(e=0){let t=Ro(e),n={};return t.forEach(e=>{let t=B[e]||{};Object.keys(t).forEach(e=>{let r=P.find(t=>t.id===e);if(!r||!Array.isArray(r.ingredientes))return;let i=Math.max(0,Number(t[e])||0);if(i<=0)return;let a=i/(Number(r.rendimento)>0?Number(r.rendimento):1);r.ingredientes.forEach(e=>{let t=N.find(t=>t.id===e.insumoId);t&&(n[t.id]||(n[t.id]={insumo:t,necessario:0}),n[t.id].necessario+=(Number(e.qtd)||0)*a)})})}),Object.values(n).map(({insumo:e,necessario:t})=>{let n=Number(e.estoqueAtual??e.quantidade)||0;return{id:e.id,nome:e.nome,unidade:e.unidade||`g`,qtdPacote:Number(e.qtdPacote)>0?Number(e.qtdPacote):1,precoPacote:Number(e.precoPacote)||0,necessario:t,estoque:n,falta:Math.max(0,t-n),critico:t>n}}).sort((e,t)=>t.critico-e.critico||t.falta-e.falta)}function Ou(e){let t=P.find(t=>t.id===e);if(!t){q(`Ficha não encontrada.`,!1);return}U.fichaId=t.id,U.canal=`WhatsApp`,U.taxaCanal=0,U.tipoDesconto=`percentual`,U.descontoPercentual=15,U.brindeAtivo=!1,J(`promocoes`),setTimeout(()=>{let e=document.getElementById(`secao-simulador`);e&&e.scrollIntoView({behavior:`smooth`,block:`start`})},120),q(`"${t.nome}" carregada no simulador!`)}function ku(){let e=Eu(jo),t=[`SEGUNDA`,`TERÇA`,`QUARTA`,`QUINTA`,`SEXTA`,`SÁBADO`,`DOMINGO`],n=[`*🧁 CARDÁPIO DA SEMANA — ${e.dias[0].split(`-`).reverse().slice(0,2).join(`/`)} a ${e.dias[6].split(`-`).reverse().slice(0,2).join(`/`)}*`,``];e.dias.forEach((r,i)=>{let a=B[r]||{},o=Object.keys(a).map(e=>({f:P.find(t=>t.id===e),qtd:Number(a[e])||0})).filter(e=>e.f&&e.qtd>0).sort((e,t)=>t.qtd-e.qtd),s=r.split(`-`).reverse().slice(0,2).join(`/`),c=Bo(r),l=e.porDia[r];n.push(`*${t[i]} ${s}*${c?` — ${c.nome} 🎉`:``}`),o.length===0?n.push(`_sem produção programada_`):(o.forEach(e=>{let t=Number(e.f.precoPraticado)||0;n.push(`• ${e.qtd}x ${e.f.nome}${t>0?` — ${G(t)}/un`:``}`)}),n.push(`_${l.itens} produto(s) • ${l.qtd} un • ${G(l.receita)}_`)),n.push(``)}),n.push(`*RESUMO DA SEMANA*`),n.push(`Produção total: ${e.qtdTotal} unidades em ${e.diasAtivos} dia(s)`),n.push(`Receita prevista: ${G(e.receita)}`),n.push(`Custo (CMV): ${G(e.custo)}`),n.push(`Lucro previsto: ${G(e.lucro)} (${e.margem.toFixed(1)}%)`);let r=e.insumos.filter(e=>e.critico);r.length>0&&(n.push(``),n.push(`⚠️ *Insumos insuficientes:* ${r.map(e=>`${e.nome} (falta ${e.falta.toFixed(0)}${e.unidade})`).join(`, `)}`)),n.push(``);let i=qo();return n.push(V.nome?`*${V.nome}*${V.slogan?` — `+V.slogan:``}`:`_Encomendas pelo WhatsApp!_`),i&&n.push(i),n.join(`
`)}function Au(){let e=ku();navigator.clipboard.writeText(e).then(()=>{q(`Cardápio copiado para o WhatsApp!`)}).catch(()=>{alert(`Texto do cardápio:

`+e)})}function ju(){let e=Eu(jo);if(!e.insumos.length){q(`Nenhuma produção planejada nesta semana.`,!1);return}let t=e.insumos.filter(e=>e.critico);if(!t.length){q(`Estoque cobre toda a produção planejada! 🎉`);return}let n=[`*🛒 LISTA DE COMPRAS — produção da semana*`,``];t.forEach(e=>{let t=e.qtdPacote>0?e.qtdPacote:1,r=Math.ceil(e.falta/t),i=e.precoPacote>0?` — ${G(r*e.precoPacote)}`:``;n.push(`• ${e.nome}: comprar ${r}x pacote(s) de ${t}${e.unidade} (falta ${e.falta.toFixed(0)}${e.unidade})${i}`)});let r=t.reduce((e,t)=>e+(t.precoPacote>0?Math.ceil(t.falta/(t.qtdPacote||1))*t.precoPacote:0),0);r>0&&n.push(``,`*Total estimado: ${G(r)}*`);let i=n.join(`
`);navigator.clipboard.writeText(i).then(()=>{q(`Lista de compras copiada!`)}).catch(()=>alert(`Lista de compras:

`+i))}function Mu(){let e=Eu(jo),t=[`SEG`,`TER`,`QUA`,`QUI`,`SEX`,`SÁB`,`DOM`],n=e.dias[0].split(`-`).reverse().slice(0,2).join(`/`),r=e.dias[6].split(`-`).reverse().slice(0,2).join(`/`),i=H(`corPrincipal`),a=H(`corSecundaria`),o=H(`corFundo`),s=e.dias.map((e,n)=>{let r=Object.keys(B[e]||{}).map(t=>({f:P.find(e=>e.id===t),qtd:Number(B[e][t])||0})).filter(e=>e.f&&e.qtd>0);return`<div class="flex-1 min-w-0">
      <div class="text-center pb-2 mb-2 border-b-2" style="border-color:${i}">
        <p class="text-xs font-black tracking-wider" style="color:${a}">${t[n]}</p>
        <p class="text-[10px]" style="color:${i}">${e.split(`-`).reverse().slice(0,2).join(`/`)}</p>
      </div>
      ${r.length===0?`<p class="text-[10px] italic text-center py-4" style="color:${i}99">—</p>`:r.map(e=>`<div class="mb-2.5">
            <p class="text-sm font-bold leading-tight" style="color:${a}">${K(e.f.nome)}</p>
            <p class="text-[11px]" style="color:${i}">
              ${e.qtd} un${Number(e.f.precoPraticado)>0?` • ${G(Number(e.f.precoPraticado))} cada`:``}
            </p>
          </div>`).join(``)}
    </div>`}).join(``),c=document.createElement(`div`);c.id=`modoApresentacao`,c.className=`fixed inset-0 z-50 overflow-y-auto`,c.style.background=o,c.innerHTML=`
    <div class="max-w-5xl mx-auto px-5 py-8 sm:py-12">
      <div class="flex items-start justify-between gap-4 mb-6">
        <div class="flex items-center gap-4 min-w-0">
          ${V.logo&&V.usarLogoCardapio?`<img src="${K(V.logo)}" alt="" class="w-16 h-16 object-contain shrink-0" />`:``}
          <div class="min-w-0">
            <p class="text-[10px] font-bold uppercase tracking-[0.25em]" style="color:${i}">Cardápio da Semana</p>
            <h2 class="text-3xl sm:text-4xl font-black mt-1" style="font-family: Georgia, serif; color:${a}">${n} a ${r}</h2>
            <p class="text-sm mt-1" style="color:${i}">${e.diasAtivos} dia(s) de produção • ${e.qtdTotal} unidades</p>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="window.print()" class="px-3.5 py-2 rounded-xl bg-white border text-xs font-bold transition-colors cursor-pointer" style="border-color:${a};color:${a}">
            <i class="fa-solid fa-print"></i> Imprimir
          </button>
          <button onclick="fecharModoApresentacao()" class="w-9 h-9 rounded-xl bg-white border flex items-center justify-center transition-colors cursor-pointer" style="border-color:${a};color:${a}" title="Fechar (Esc)">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      ${V.slogan&&V.usarAssinatura?`<p class="text-center text-sm mb-4" style="color:${a}">${K(V.slogan)}</p>`:``}

      <div class="bg-white rounded-3xl shadow-sm px-5 py-6" style="border:1px solid ${a}22">
        ${e.qtdTotal===0?`<p class="text-center text-sm py-12" style="color:${i}">Nada programado para esta semana. Volte ao Cardápio e monte a produção.</p>`:`<div class="flex gap-4">${s}</div>`}
      </div>

      ${e.qtdTotal>0?`
      <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-white rounded-2xl px-4 py-3" style="border:1px solid ${a}22">
          <p class="text-[10px] font-bold uppercase tracking-wider" style="color:${i}">Unidades</p>
          <p class="text-xl font-black" style="color:${a}">${e.qtdTotal}</p>
        </div>
        <div class="bg-white rounded-2xl px-4 py-3" style="border:1px solid ${a}22">
          <p class="text-[10px] font-bold uppercase tracking-wider" style="color:${i}">Receita prevista</p>
          <p class="text-xl font-black" style="color:${a}">${G(e.receita)}</p>
        </div>
        <div class="bg-white rounded-2xl px-4 py-3" style="border:1px solid ${a}22">
          <p class="text-[10px] font-bold uppercase tracking-wider" style="color:${i}">Produtos</p>
          <p class="text-xl font-black" style="color:${a}">${Object.keys(e.porFicha).length}</p>
        </div>
        <div class="rounded-2xl px-4 py-3" style="background:${a}">
          <p class="text-[10px] font-bold uppercase tracking-wider" style="color:${i}">Encomendas</p>
          <p class="text-xl font-black text-white text-center mt-0.5">📲</p>
        </div>
      </div>`:``}

      <p class="text-center text-xs mt-8" style="color:${a}">
        ${V.nome?`<strong>${K(V.nome)}</strong> • `:``}${K(qo()||`Encomendas pelo WhatsApp!`)}
      </p>
    </div>`,document.body.appendChild(c)}function Nu(){let e=document.getElementById(`modoApresentacao`);e&&e.remove()}function Pu(){let e=Eu(jo),t=[`Segunda`,`Terça`,`Quarta`,`Quinta`,`Sexta`,`Sábado`,`Domingo`],n=e.dias[0].split(`-`).reverse().join(`/`),r=e.dias[6].split(`-`).reverse().join(`/`),i=Object.keys(e.porFicha).map(t=>{let n=P.find(e=>e.id===t);if(!n)return``;let r=e.porFicha[t];return`<tr class="border-b border-slate-100">
      <td class="py-1.5 pr-2 font-semibold">${K(n.nome)}</td>
      ${e.dias.map(e=>`<td class="py-1.5 px-1 text-center">${gu(e,t)||``}</td>`).join(``)}
      <td class="py-1.5 px-2 text-right font-bold">${r.qtd}</td>
    </tr>`}).join(``);Q(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900">🧁 ${V.nome?K(V.nome)+` — Cardápio`:`Cardápio`} ${n} a ${r}</h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    ${Jo(`grande`)}
    ${e.qtdTotal===0?`<p class="text-xs text-slate-400 text-center py-6">Nada programado para esta semana.</p>`:`
    <table class="w-full mt-3 text-[11px] text-slate-700">
      <thead>
        <tr class="bg-slate-50 text-slate-500 uppercase text-[9px] font-bold tracking-wider">
          <th class="py-1.5 pr-2 text-left rounded-l-lg">Produto</th>
          ${t.map(e=>`<th class="py-1.5 px-1 text-center">${e.slice(0,3)}</th>`).join(``)}
          <th class="py-1.5 px-2 text-right rounded-r-lg">Total</th>
        </tr>
      </thead>
      <tbody>${i}</tbody>
      <tfoot>
        <tr class="border-t-2 border-slate-200 font-bold text-slate-900">
          <td class="py-2 pr-2">Total</td>
          ${e.dias.map(t=>`<td class="py-2 px-1 text-center">${e.porDia[t].qtd||``}</td>`).join(``)}
          <td class="py-2 px-2 text-right">${e.qtdTotal}</td>
        </tr>
      </tfoot>
    </table>
    <div class="grid grid-cols-2 gap-2 mt-3 text-[11px]">
      <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
        <p class="text-slate-500 font-semibold uppercase text-[9px]">Receita prevista</p>
        <p class="font-black text-emerald-700">${G(e.receita)}</p>
      </div>
      <div class="p-2 rounded-lg bg-red-50 border border-red-200">
        <p class="text-slate-500 font-semibold uppercase text-[9px]">Custo (CMV)</p>
        <p class="font-black text-red-700">${G(e.custo)}</p>
      </div>
      <div class="p-2 rounded-lg bg-purple-50 border border-purple-200 col-span-2">
        <p class="text-slate-500 font-semibold uppercase text-[9px]">Lucro previsto</p>
        <p class="font-black text-purple-700">${G(e.lucro)} <span class="text-[10px] font-bold">(${e.margem.toFixed(1)}%)</span></p>
      </div>
    </div>
    ${e.insumos.filter(e=>e.critico).length>0?`
      <div class="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
        <p class="font-bold mb-1">⚠️ Insumos insuficientes para esta produção</p>
        ${e.insumos.filter(e=>e.critico).map(e=>`<p>• ${K(e.nome)}: precisa ${e.necessario.toFixed(0)}${K(e.unidade)} • falta <strong>${e.falta.toFixed(0)}${K(e.unidade)}</strong></p>`).join(``)}
      </div>`:``}`}
    <button onclick="window.print()" class="mt-4 w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold transition-colors cursor-pointer">
      <i class="fa-solid fa-print"></i> Imprimir
    </button>
  `)}function Fu(){let e=document.getElementById(`tab-cardapio`);if(!e)return;let[t,n]=String(Ao||``).split(`-`),r=Number(t)||new Date().getFullYear(),i=Number(n)||new Date().getMonth()+1,a=Eo(r,i),o=[`Janeiro`,`Fevereiro`,`Março`,`Abril`,`Maio`,`Junho`,`Julho`,`Agosto`,`Setembro`,`Outubro`,`Novembro`,`Dezembro`],s=Ro(jo),c=[`SEG`,`TER`,`QUA`,`QUI`,`SEX`,`SÁB`,`DOM`],l=s[0].split(`-`).reverse().slice(0,2).join(`/`),u=s[6].split(`-`).reverse().slice(0,2).join(`/`),d=Z(0),f=Eu(jo),p=f.insumos.filter(e=>e.critico),m=P.filter(e=>!(Mo&&!`${e.nome} ${e.categoria||``}`.toLowerCase().includes(Mo)||No&&!f.porFicha[e.id]));e.innerHTML=`
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Cardápio do Mês & da Semana</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Datas que vendem doce + grade de produção da semana (quanto fazer, de quê e a custo)</p>
      </div>
      <div class="flex items-center gap-2">
        <input type="month" value="${Ao}" onchange="mudarMesCardapio(this.value)" class="border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold" />
      </div>
    </div>

    <!-- BLOCO A: DATAS TEMÁTICAS DO MÊS -->
    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div class="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-calendar-days"></i>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-base">${o[i-1]} de ${r}</h3>
          <p class="text-xs text-slate-500">${a.length} data(s) temática(s) • sugestões casadas com as suas fichas</p>
        </div>
      </div>
      ${a.length===0?`<p class="text-xs text-slate-400 text-center py-6">Nenhuma data temática neste mês.</p>`:`
      <div class="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        ${a.map(({entry:e,iso:t,diff:n})=>{let r=zo(e,3),i=t.split(`-`).reverse().slice(0,2).join(`/`),a=So(t,-(e.antecedencia||0)).split(`-`).reverse().slice(0,2).join(`/`),o=n>=0&&n<=(e.antecedencia||0)&&(e.antecedencia||0)>0,s=e.tipo===`feriado`?`Feriado`:e.tipo===`campanha`?`Campanha`:`Temática`,c=e.tipo===`feriado`?`bg-slate-100 text-slate-600 border-slate-200`:e.tipo===`campanha`?`bg-pink-100 text-pink-700 border-pink-200`:`bg-orange-100 text-orange-700 border-orange-200`;return`<div class="rounded-xl border ${n===0?`border-orange-300 bg-orange-50/50`:`border-slate-200`} p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="w-9 h-9 rounded-xl ${_c[e.cor]||_c.slate} flex items-center justify-center text-sm shrink-0">
                  <i class="fa-solid ${e.icone}"></i>
                </span>
                <div class="min-w-0">
                  <p class="font-bold text-slate-900 text-sm truncate">${K(e.nome)}</p>
                  <p class="text-[11px] text-slate-500">${i} • <strong class="${n<0?`text-slate-400`:`text-orange-600`}">${Oo(n)}</strong></p>
                </div>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${c}">${s}</span>
            </div>
            <p class="text-[11px] text-slate-600 mt-2 leading-relaxed">${K(e.descricao)}</p>
            <p class="text-[11px] text-slate-600 mt-1">💡 ${K(e.estrategia)}</p>
            ${o?`<p class="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 mt-2">⏰ Hora de agir: divulgue até ${a}!</p>`:``}
            <div class="mt-2.5 pt-2.5 border-t border-slate-100">
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Produtos sugeridos (por margem)</p>
              ${r.length===0?`<p class="text-[11px] text-slate-400">Cadastre fichas para receber sugestões.</p>`:r.map(e=>`
                <div class="flex items-center justify-between gap-2 py-1">
                  <span class="text-xs font-semibold text-slate-800 truncate">${K(e.ficha.nome)}${e.margem==null?``:` <span class="text-[10px] font-bold ${e.margem>=40?`text-emerald-600`:e.margem>=22?`text-blue-600`:`text-amber-600`}">${e.margem.toFixed(0)}%</span>`}</span>
                  <button onclick="simularPromoCardapio('${e.ficha.id}')" class="text-[10px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg border border-rose-100 transition-colors shrink-0 cursor-pointer">
                    Simular <i class="fa-solid fa-arrow-right text-[9px]"></i>
                  </button>
                </div>`).join(``)}
            </div>
          </div>`}).join(``)}
      </div>`}
    </div>

    <!-- BLOCO B: GRADE DE PRODUÇÃO (produto × dia) -->
    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
            <i class="fa-solid fa-table-cells"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Grade de produção — ${l} a ${u}</h3>
            <p class="text-xs text-slate-500">${f.qtdTotal} un em ${f.diasAtivos} dia(s) • digite a quantidade a produzir em cada dia</p>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <button onclick="semanaCardapio(-1)" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs cursor-pointer" title="Semana anterior">‹</button>
          <button onclick="semanaCardapio(0)" class="px-3 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer">Hoje</button>
          <button onclick="semanaCardapio(1)" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs cursor-pointer" title="Próxima semana">›</button>
        </div>
      </div>

      <!-- Resumo financeiro da semana -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
        <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Receita prevista</p>
          <p class="text-lg font-black text-emerald-700">${G(f.receita)}</p>
          <p class="text-[10px] text-emerald-600">${f.qtdTotal} unidades</p>
        </div>
        <div class="p-2.5 rounded-xl bg-red-50 border border-red-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-red-700">Custo (CMV)</p>
          <p class="text-lg font-black text-red-700">${G(f.custo)}</p>
          <p class="text-[10px] text-red-600">insumos da ficha</p>
        </div>
        <div class="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-purple-700">Lucro previsto</p>
          <p class="text-lg font-black text-purple-700">${G(f.lucro)}</p>
          <p class="text-[10px] text-purple-600">${f.margem.toFixed(1)}% de margem</p>
        </div>
        <div class="p-2.5 rounded-xl ${p.length>0?`bg-amber-50 border-amber-200`:`bg-slate-50 border-slate-200`}">
          <p class="text-[10px] font-bold uppercase tracking-wider ${p.length>0?`text-amber-700`:`text-slate-600`}">Estoque</p>
          <p class="text-lg font-black ${p.length>0?`text-amber-700`:`text-emerald-700`}">${p.length>0?`${p.length} falta`:`OK`}</p>
          <p class="text-[10px] ${p.length>0?`text-amber-600`:`text-slate-500`}">${f.insumos.length} insumo(s) usado(s)</p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <div class="relative flex-1 min-w-48">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]"></i>
          <input id="cardapioBusca" type="text" value="${K(Mo)}" oninput="aplicarFiltroCardapio(this.value)" placeholder="Filtrar produto..." class="w-full pl-7 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700 focus:border-emerald-400 focus:outline-none" />
        </div>
        <button onclick="alternarSoEscalados()" class="px-2.5 py-1.5 text-[11px] font-bold rounded-lg border transition-colors cursor-pointer ${No?`bg-emerald-600 text-white border-emerald-600`:`bg-white text-slate-600 border-slate-200 hover:bg-slate-100`}">
          <i class="fa-solid fa-filter"></i> Só escalados
        </button>
        <!-- Botão com atalhos: clique = preencher, caret = menu -->
        <div class="relative">
          <div class="flex items-stretch rounded-lg border border-slate-200 overflow-hidden">
            <button onclick="escalarTodos(7)" class="px-2.5 py-1.5 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5" title="Preencher 1 un de cada produto em todos os dias">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Preencher semana
            </button>
            <button onclick="toggleMenuPreencher()" class="px-1.5 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-500 border-l border-slate-200 transition-colors cursor-pointer" title="Mais atalhos de preenchimento">
              <i class="fa-solid fa-chevron-down text-[9px]"></i>
            </button>
          </div>
          <div id="menuPreencher" class="hidden absolute right-0 z-20 mt-1 w-56 bg-white rounded-xl border border-slate-200 shadow-lg p-1.5 text-left">
            <button onclick="preencherComOpcoes(1); fecharMenuPreencher();" class="w-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer">
              <i class="fa-solid fa-1 text-slate-400"></i> 1 un de cada produto
            </button>
            <button onclick="preencherComOpcoes(2); fecharMenuPreencher();" class="w-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer">
              <i class="fa-solid fa-2 text-slate-400"></i> 2 un de cada produto
            </button>
            <button onclick="copiarDaSemanaAnterior(); fecharMenuPreencher();" class="w-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer border-t border-slate-100 mt-1 pt-2.5">
              <i class="fa-solid fa-copy text-slate-400"></i> Repetir a semana anterior
            </button>
            <button onclick="abrirModalDuplicarSemana(); fecharMenuPreencher();" class="w-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer">
              <i class="fa-solid fa-calendar-plus text-slate-400"></i> Duplicar para outra semana…
            </button>
          </div>
        </div>
        <button onclick="abrirModoApresentacao()" class="px-2.5 py-1.5 text-[11px] font-bold rounded-lg text-white shadow-xs transition-colors cursor-pointer" style="background:linear-gradient(135deg,#D96C75,#C65D3A)" title="Abrir em tela cheia para foto / Status do WhatsApp">
          <i class="fa-solid fa-expand"></i> Apresentar
        </button>
        <button onclick="limparSemanaCardapio()" class="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer">
          Limpar
        </button>
      </div>

      ${P.length===0?`
        <div class="mt-4 py-8 text-center border border-dashed border-slate-200 rounded-xl">
          <i class="fa-solid fa-book-bookmark text-3xl text-slate-300 mb-2"></i>
          <p class="text-xs text-slate-500 font-semibold">Cadastre suas fichas técnicas para montar a grade</p>
          <button onclick="switchTab('fichas')" class="mt-3 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer">Ir para Fichas Técnicas</button>
        </div>`:m.length===0?`
        <div class="mt-4 py-6 text-center border border-dashed border-slate-200 rounded-xl">
          <p class="text-xs text-slate-400">${No?`Nenhum produto escalado nesta semana — desligue o filtro "Só escalados".`:`Nenhum produto encontrado para o filtro "`+K(Mo)+`".`}</p>
        </div>`:`
      <!-- Tabela: produtos × dias -->
      <div class="mt-3 overflow-x-auto border border-slate-200 rounded-xl" id="gradeCardapio">
        <table class="w-full text-xs min-w-[760px]">
          <thead class="bg-slate-50">
            <tr class="text-slate-500 uppercase text-[9px] font-bold tracking-wider">
              <th class="py-2 px-2.5 text-left rounded-tl-lg sticky left-0 bg-slate-50 z-10 min-w-44">Produto</th>
              ${s.map((e,t)=>{let n=e.split(`-`).reverse().slice(0,2).join(`/`),r=Bo(e);return`<th class="py-2 px-1.5 text-center ${e===d?`bg-emerald-50 text-emerald-700`:``}" title="${r?K(r.nome):``}">
                  <span class="block font-black">${c[t]}</span>
                  <span class="block font-semibold text-[9px] text-slate-400">${n}</span>
                  ${r?`<i class="fa-solid fa-star text-purple-400 text-[8px]"></i>`:``}
                </th>`}).join(``)}
              <th class="py-2 px-2.5 text-right rounded-tr-lg">Total</th>
              <th class="py-2 px-2.5 text-right">Lucro</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${m.map(e=>{let t=Number(e.rendimento)>0?Number(e.rendimento):1,n=X(e)/t,r=Number(e.precoPraticado)||0,i=f.porFicha[e.id]||{qtd:0,receita:0,custo:0},a=i.receita-i.custo;return`<tr class="hover:bg-emerald-50/30 transition-colors">
                <td class="py-1.5 px-2.5 sticky left-0 bg-white z-10">
                  <span class="font-bold text-slate-800 block truncate" title="${K(e.nome)}">${K(e.nome)}</span>
                  <span class="text-[10px] text-slate-400">${r>0?`${G(r)}/un`:`sem preço`}${n>0?` • CMV ${G(n)}`:``}</span>
                </td>
                ${s.map(t=>{let n=gu(t,e.id);return`<td class="py-1 px-1 text-center">
                    <input type="number" min="0" step="1" value="${n||``}" placeholder="–"
                      data-grade="1" data-valor-original="${n||``}"
                      onchange="definirQtdCardapio('${t}', '${e.id}', this.value)"
                      onkeydown="tecladoGradeCardapio(event)"
                      class="w-11 h-7 text-center text-xs font-bold rounded-lg border transition-colors ${n>0?`border-emerald-300 bg-emerald-50 text-emerald-800`:`border-slate-200 bg-slate-50 text-slate-400`} focus:border-emerald-500 focus:outline-none focus:bg-white" />
                  </td>`}).join(``)}
                <td class="py-1.5 px-2.5 text-right font-black ${i.qtd>0?`text-slate-900`:`text-slate-300`}">${i.qtd||`–`}</td>
                <td class="py-1.5 px-2.5 text-right font-bold ${a>=0?`text-emerald-600`:`text-red-600`}">${i.qtd>0?G(a):`–`}</td>
              </tr>`}).join(``)}
          </tbody>
          <tfoot>
            <tr class="bg-slate-50 border-t-2 border-slate-200 text-[10px] font-bold text-slate-600">
              <td class="py-2 px-2.5 sticky left-0 bg-slate-50 z-10">Total por dia</td>
              ${s.map(e=>`<td class="py-2 px-1 text-center text-slate-800">${f.porDia[e].qtd||`–`}</td>`).join(``)}
              <td class="py-2 px-2.5 text-right text-slate-900">${f.qtdTotal}</td>
              <td class="py-2 px-2.5 text-right ${f.lucro>=0?`text-emerald-600`:`text-red-600`}">${G(f.lucro)}</td>
            </tr>
          </tfoot>
        </table>
      </div>`}

      ${p.length>0?`
      <div class="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
        <div class="flex items-center justify-between gap-2">
          <p class="text-xs font-bold text-amber-900"><i class="fa-solid fa-triangle-exclamation"></i> ${p.length} insumo(s) insuficiente(s) para esta produção</p>
          <button onclick="copiarComprasCardapio()" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shrink-0">
            <i class="fa-solid fa-cart-shopping"></i> Lista de compras
          </button>
        </div>
        <div class="mt-2 flex flex-wrap gap-1.5">
          ${p.slice(0,8).map(e=>`
            <span class="text-[10px] font-bold text-amber-900 bg-white border border-amber-200 rounded-lg px-2 py-1">
              ${K(e.nome)}: precisa ${e.necessario.toFixed(0)}${K(e.unidade)} • <span class="text-red-600">falta ${e.falta.toFixed(0)}${K(e.unidade)}</span>
            </span>`).join(``)}
          ${p.length>8?`<span class="text-[10px] text-amber-700">+${p.length-8}</span>`:``}
        </div>
      </div>`:``}

      <div class="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <button onclick="copiarCardapioWhats()" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
          <i class="fa-brands fa-whatsapp"></i> Copiar p/ WhatsApp
        </button>
        <button onclick="imprimirCardapio()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
          <i class="fa-solid fa-print"></i> Imprimir
        </button>
        <button onclick="copiarComprasCardapio()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
          <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Compras
        </button>
      </div>
    </div>
  `}function Iu(){let e=document.getElementById(`tab-promocoes`);if(!e)return;let t=P.find(e=>e.id===U.fichaId)||P[0],n=t?X(t):0,r=n/(t&&t.rendimento||1),i=(t&&t.margemAlvo||60)/100,a=i<1?n/(1-i):n*2.5,o=Number(U.taxaCanal)||0,s=o<100?a/(1-o/100):a,c=U.canal===`WhatsApp`||U.canal===`Balcao`?a:s,l=c;U.tipoDesconto===`percentual`?l=c*(1-(Number(U.descontoPercentual)||0)/100):U.tipoDesconto===`valor_fixo`||U.tipoDesconto===`combo`?l=Number(U.precoPromocionalFixo)||c*.85:U.tipoDesconto===`leve_ganhe`&&(l=c);let u=0;if(U.brindeAtivo){if(U.brindeTipo===`ficha`&&U.brindeFichaId){let e=P.find(e=>e.id===U.brindeFichaId);e&&(u=X(e)/(e.rendimento||1),e.nome)}else u=Number(U.brindeCustoCustom)||0,U.brindeNomeCustom}let d=r+u,f=o/100*l,p=l-f-d,m=l>0?p/l*100:0,h=c-o/100*c-r,g=c>0?h/c*100:0,ee=Number(U.volumeVendasProjetado)||1,te=l*ee,_=d*ee,ne=f*ee,v=p*ee;c*ee;let re=h*ee,ie=null,ae=null;p>0&&re>0&&(ie=Math.ceil(re/p),ae=Math.round((ie/ee-1)*100));let oe=`emerald`,se=`fa-circle-check`,ce=`Promoção Altamente Viável & Lucrativa`,le=`Margem de contribuição saudável (> 40%). Cobre os custos dos insumos e as comissões do canal com folga, garantindo lucro real.`;p<=0?(oe=`red`,se=`fa-triangle-exclamation`,ce=`Prejuízo Imediato: Promoção Inviável`,le=`O preço promocional não cobre o custo dos ingredientes + brinde + comissão do app. Você pagará para trabalhar!`):m<22?(oe=`amber`,se=`fa-circle-exclamation`,ce=`Atenção: Margem Muito Apertada (< 22%)`,le=`Risco elevado. Qualquer desperdício na cozinha ou taxa extra pode zerar o lucro. Recomendada apenas para queima de estoque perecível.`):m<40&&(oe=`blue`,se=`fa-circle-info`,ce=`Viabilidade Moderada (Foco em Volume / Conquista)`,le=`Margem aceitável para atração de novos clientes e aumento de pedidos no delivery. Avalie a capacidade do seu forno e bancada.`),e.innerHTML=`
    <!-- Header do Módulo -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-tags"></i>
        </div>
        <div>
          <h2 class="font-bold text-slate-900 text-lg">Viabilidade de Promoções & Calendário Comercial</h2>
          <p class="text-xs text-slate-500">Simulador de margem e lucro real considerando CMV exato, comissões de apps (iFood/99Food) e brindes</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="salvarPromoDoSimulador()" class="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
          <i class="fa-solid fa-bookmark"></i> Salvar Campanha
        </button>
        <button onclick="resetarSimulador()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 transition-colors" title="Restaurar valores padrão">
          <i class="fa-solid fa-arrow-rotate-left"></i>
        </button>
      </div>
    </div>

    <!-- Indicadores Rápidos do Módulo -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-bullhorn"></i>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium">Campanhas Ativas</span>
          <h4 class="text-base font-bold text-slate-900">${ko.filter(e=>e.status===`ativa`).length} em execução</h4>
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-sack-dollar"></i>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium">Lucro Proj. Total</span>
          <h4 class="text-base font-bold text-emerald-600">${G(ko.reduce((e,t)=>{let n=P.find(e=>e.id===t.fichaId),r=n?X(n)/(n.rendimento||1):0,i=(Number(t.taxaCanal)||0)/100,a=Number(t.precoPromocionalFixo)||0,o=t.brindeAtivo?t.brindeTipo===`ficha`&&t.brindeFichaId?X(P.find(e=>e.id===t.brindeFichaId)||{})/1:Number(t.brindeCustoCustom)||0:0;return e+(a-a*i-(r+o))*(Number(t.volumeVendasProjetado)||0)},0))}</h4>
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-calendar-check"></i>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium">Oportunidades</span>
          <h4 class="text-base font-bold text-slate-900">${yo.length} datas no ano</h4>
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-percent"></i>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium">Taxa Média Apps</span>
          <h4 class="text-base font-bold text-slate-900">${L.taxaAppMediaPercentual??0}%</h4>
        </div>
      </div>
    </div>

    <!-- SEÇÃO 1: SIMULADOR INTERATIVO DE VIABILIDADE -->
    <!-- Modelo de entrega: joga as taxas nos valores abaixo -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
      <div class="grid grid-cols-2 gap-1.5" role="group" aria-label="Modelo de entrega">
        <button
          type="button"
          onclick="setPlanoEntrega('plataforma')"
          class="text-xs font-bold py-2 px-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${Ho===`plataforma`?`text-white shadow-xs`:`bg-white text-slate-600 border-slate-200 hover:bg-slate-100`}"
          ${Ho===`plataforma`?`style="background:linear-gradient(135deg,#D96C75,#C65D3A);border-color:#C65D3A"`:``}
        >
          <i class="fa-solid fa-motorcycle"></i> Entrega da plataforma
        </button>
        <button
          type="button"
          onclick="setPlanoEntrega('propria')"
          class="text-xs font-bold py-2 px-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${Ho===`propria`?`text-white shadow-xs`:`bg-white text-slate-600 border-slate-200 hover:bg-slate-100`}"
          ${Ho===`propria`?`style="background:linear-gradient(135deg,#D96C75,#C65D3A);border-color:#C65D3A"`:``}
        >
          <i class="fa-solid fa-house"></i> Entrega própria
        </button>
      </div>
      <p class="text-[11px] text-slate-500 mt-2 leading-relaxed">
        ${Ho===`plataforma`?`Valendo: <strong>iFood ${Wo(`iFood`)}%</strong> (23 + 3,2) • <strong>99 ${Wo(`99Food`)}%</strong> (8,9 + 3,2, + logística variável no Full)`:`Valendo: <strong>iFood ${Wo(`iFood`)}%</strong> (12 + 3,2; +R$ 110/mês se faturar +R$ 1.800) • <strong>99 ${Wo(`99Food`)}%</strong> (10,9 + 3,2, sem mensalidade)`}
      </p>
    </div>
    <div id="secao-simulador" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Coluna Esquerda: Formulário de Configuração (5 colunas) -->
      <div class="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <i class="fa-solid fa-calculator text-rose-500"></i> Parâmetros da Oferta
          </h3>
          <span class="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
            Simulação Dinâmica
          </span>
        </div>

        <!-- 1. Produto Base -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Produto Base (Ficha Técnica)</label>
          <select 
            onchange="atualizarSimuladorCampo('fichaId', this.value)" 
            class="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-rose-500 bg-slate-50/50"
          >
            ${P.map(e=>{let t=X(e)/(e.rendimento||1);return`
                <option value="${e.id}" ${e.id===U.fichaId?`selected`:``}>
                  ${e.nome} (CMV: ${G(t)})
                </option>
              `}).join(``)}
          </select>
          <div class="flex justify-between items-center text-[11px] text-slate-500 mt-1">
            <span>CMV Unitário Base: <strong class="text-slate-800">${G(r)}</strong></span>
            <span>Preço Tabela Sugerido: <strong class="text-slate-800">${G(c)}</strong></span>
          </div>
        </div>

        <!-- 2. Canal de Venda & Comissão -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Canal de Venda & Taxa de Comissão</label>
          <div class="grid grid-cols-3 gap-1.5 mb-2">
            <button 
              type="button" 
              onclick="selecionarCanalSimulador('WhatsApp')"
              class="text-xs font-semibold py-1.5 px-2 rounded-lg border transition-all flex items-center justify-center gap-1 ${U.canal===`WhatsApp`?`bg-emerald-500 text-white border-emerald-600 shadow-2xs`:`bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100`}"
            >
              <i class="fa-brands fa-whatsapp"></i> WhatsApp (0%)
            </button>
            <button 
              type="button" 
              onclick="selecionarCanalSimulador('iFood')"
              class="text-xs font-semibold py-1.5 px-2 rounded-lg border transition-all flex items-center justify-center gap-1 ${U.canal===`iFood`?`bg-red-500 text-white border-red-600 shadow-2xs`:`bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100`}"
            >
              <i class="fa-solid fa-motorcycle"></i> iFood (${Wo(`iFood`)}%)
            </button>
            <button 
              type="button" 
              onclick="selecionarCanalSimulador('99Food')"
              class="text-xs font-semibold py-1.5 px-2 rounded-lg border transition-all flex items-center justify-center gap-1 ${U.canal===`99Food`?`bg-amber-500 text-white border-amber-600 shadow-2xs`:`bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100`}"
            >
              <i class="fa-solid fa-utensils"></i> 99Food (${Wo(`99Food`)}%)
            </button>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500">Taxa Personalizada:</span>
            <div class="relative w-28">
              <input 
                type="number" 
                min="0" 
                max="100" 
                step="0.5"
                value="${U.taxaCanal}" 
                oninput="atualizarSimuladorCampo('taxaCanal', this.value)"
                class="w-full text-xs font-bold border border-slate-300 rounded-lg px-2 py-1 pr-6 text-slate-800 focus:outline-rose-500"
              />
              <span class="absolute right-2 top-1 text-xs text-slate-400 font-bold">%</span>
            </div>
            <span class="text-[11px] text-slate-400">taxa que o app desconta da venda</span>
          </div>
        </div>

        <!-- 3. Mecânica da Promoção -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Mecânica da Promoção</label>
          <div class="grid grid-cols-2 gap-2 mb-2.5">
            <button 
              type="button"
              onclick="selecionarMecanicaSimulador('percentual')"
              class="text-xs font-medium p-2 rounded-xl border text-left transition-all ${U.tipoDesconto===`percentual`?`bg-rose-50 border-rose-400 text-rose-900 font-bold ring-1 ring-rose-300`:`bg-white border-slate-200 text-slate-700 hover:bg-slate-50`}"
            >
              <i class="fa-solid fa-percent text-rose-500 mr-1"></i> Desconto %
            </button>
            <button 
              type="button"
              onclick="selecionarMecanicaSimulador('valor_fixo')"
              class="text-xs font-medium p-2 rounded-xl border text-left transition-all ${U.tipoDesconto===`valor_fixo`?`bg-rose-50 border-rose-400 text-rose-900 font-bold ring-1 ring-rose-300`:`bg-white border-slate-200 text-slate-700 hover:bg-slate-50`}"
            >
              <i class="fa-solid fa-tag text-rose-500 mr-1"></i> Preço Fixo R$
            </button>
            <button 
              type="button"
              onclick="selecionarMecanicaSimulador('leve_ganhe')"
              class="text-xs font-medium p-2 rounded-xl border text-left transition-all ${U.tipoDesconto===`leve_ganhe`?`bg-rose-50 border-rose-400 text-rose-900 font-bold ring-1 ring-rose-300`:`bg-white border-slate-200 text-slate-700 hover:bg-slate-50`}"
            >
              <i class="fa-solid fa-gift text-rose-500 mr-1"></i> Compre & Ganhe
            </button>
            <button 
              type="button"
              onclick="selecionarMecanicaSimulador('combo')"
              class="text-xs font-medium p-2 rounded-xl border text-left transition-all ${U.tipoDesconto===`combo`?`bg-rose-50 border-rose-400 text-rose-900 font-bold ring-1 ring-rose-300`:`bg-white border-slate-200 text-slate-700 hover:bg-slate-50`}"
            >
              <i class="fa-solid fa-layer-group text-rose-500 mr-1"></i> Combo Especial
            </button>
          </div>

          <!-- Campos dinâmicos do desconto -->
          ${U.tipoDesconto===`percentual`?`
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs font-semibold text-slate-700">Percentual de Desconto:</span>
                <span class="text-xs font-bold text-rose-600">${U.descontoPercentual}% OFF</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                step="1" 
                value="${U.descontoPercentual}" 
                oninput="atualizarSimuladorCampo('descontoPercentual', this.value)" 
                class="w-full accent-rose-600 cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5%</span>
                <span>15% (Recomendado)</span>
                <span>30%</span>
                <span>50%</span>
              </div>
            </div>
          `:`
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label class="block text-xs font-semibold text-slate-700 mb-1">Preço Promocional da Oferta (R$)</label>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-slate-400">R$</span>
                <input 
                  type="number" 
                  step="0.50" 
                  value="${U.precoPromocionalFixo||c.toFixed(2)}" 
                  oninput="atualizarSimuladorCampo('precoPromocionalFixo', this.value)" 
                  class="w-full text-sm font-bold border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-slate-900 focus:outline-rose-500"
                />
              </div>
              <p class="text-[11px] text-slate-500 mt-1">Preço normal de tabela: <strong>${G(c)}</strong></p>
            </div>
          `}
        </div>

        <!-- 4. Inclusão de Brinde / Cortesia -->
        <div class="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
              <input 
                type="checkbox" 
                ${U.brindeAtivo?`checked`:``} 
                onchange="atualizarSimuladorCampo('brindeAtivo', this.checked)"
                class="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
              />
              <i class="fa-solid fa-gift text-rose-500"></i> Oferecer Brinde / Cortesia ao Cliente
            </label>
            ${U.brindeAtivo?`
              <span class="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                +${G(u)} CMV
              </span>
            `:``}
          </div>

          ${U.brindeAtivo?`
            <div class="pt-2 border-t border-slate-200/80 space-y-2">
              <div class="flex gap-2">
                <button 
                  type="button" 
                  onclick="atualizarSimuladorCampo('brindeTipo', 'ficha')" 
                  class="text-xs font-semibold py-1 px-2.5 rounded-lg border transition-colors ${U.brindeTipo===`ficha`?`bg-rose-600 text-white border-rose-700`:`bg-white text-slate-700 border-slate-200`}"
                >
                  Item das Fichas Técnicas
                </button>
                <button 
                  type="button" 
                  onclick="atualizarSimuladorCampo('brindeTipo', 'custom')" 
                  class="text-xs font-semibold py-1 px-2.5 rounded-lg border transition-colors ${U.brindeTipo===`custom`?`bg-rose-600 text-white border-rose-700`:`bg-white text-slate-700 border-slate-200`}"
                >
                  Brinde Avulso / Embalagem
                </button>
              </div>

              ${U.brindeTipo===`ficha`?`
                <select 
                  onchange="atualizarSimuladorCampo('brindeFichaId', this.value)" 
                  class="w-full text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-rose-500 bg-white"
                >
                  ${P.map(e=>{let t=X(e)/(e.rendimento||1);return`
                      <option value="${e.id}" ${e.id===U.brindeFichaId?`selected`:``}>
                        ${e.nome} (Custo: ${G(t)})
                      </option>
                    `}).join(``)}
                </select>
              `:`
                <div class="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Nome do brinde (ex: Tag + Fita)" 
                    value="${U.brindeNomeCustom||``}" 
                    oninput="atualizarSimuladorCampo('brindeNomeCustom', this.value)" 
                    class="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-rose-500 bg-white"
                  />
                  <input 
                    type="number" 
                    step="0.10" 
                    placeholder="Custo R$" 
                    value="${U.brindeCustoCustom||0}" 
                    oninput="atualizarSimuladorCampo('brindeCustoCustom', this.value)" 
                    class="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-rose-500 bg-white"
                  />
                </div>
              `}
            </div>
          `:``}
        </div>

        <!-- 5. Volume de Vendas Estimado -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-xs font-semibold text-slate-700">Volume de Vendas Estimado</label>
            <span class="text-xs font-bold text-slate-900">${U.volumeVendasProjetado} unidades</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="150" 
            step="5" 
            value="${U.volumeVendasProjetado}" 
            oninput="atualizarSimuladorCampo('volumeVendasProjetado', this.value)" 
            class="w-full accent-slate-800 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>5 un</span>
            <span>30 un</span>
            <span>75 un</span>
            <span>150 un</span>
          </div>
        </div>
      </div>

      <!-- Coluna Direita: Diagnóstico Financeiro & Margem Real (7 colunas) -->
      <div class="lg:col-span-7 space-y-4">
        <!-- Semáforo / Card de Diagnóstico Principal -->
        <div class="p-5 rounded-2xl border ${oe===`emerald`?`bg-emerald-50/90 border-emerald-200 text-emerald-950`:oe===`blue`?`bg-blue-50/90 border-blue-200 text-blue-950`:oe===`amber`?`bg-amber-50/90 border-amber-200 text-amber-950`:`bg-red-50/90 border-red-200 text-red-950`} shadow-xs">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${oe===`emerald`?`bg-emerald-100 text-emerald-700`:oe===`blue`?`bg-blue-100 text-blue-700`:oe===`amber`?`bg-amber-100 text-amber-700`:`bg-red-100 text-red-700`}">
              <i class="fa-solid ${se}"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <h3 class="font-bold text-base leading-tight">${ce}</h3>
                <span class="text-xs font-extrabold px-2.5 py-1 rounded-full ${oe===`emerald`?`bg-emerald-200/70 text-emerald-900`:oe===`blue`?`bg-blue-200/70 text-blue-900`:oe===`amber`?`bg-amber-200/70 text-amber-900`:`bg-red-200/70 text-red-900`}">
                  Margem: ${m.toFixed(1)}%
                </span>
              </div>
              <p class="text-xs mt-1.5 opacity-90 leading-relaxed">${le}</p>
            </div>
          </div>
        </div>

        <!-- Grade de Métricas Chave do Impacto Financeiro -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-[11px] text-slate-500 font-medium block">Preço Promocional</span>
            <div class="flex items-baseline gap-1.5 mt-0.5">
              <h4 class="text-base font-bold text-slate-900">${G(l)}</h4>
              ${l<c?`
                <span class="text-[10px] line-through text-slate-400">${G(c)}</span>
              `:``}
            </div>
            <span class="text-[10px] text-slate-500">por unidade na oferta</span>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-[11px] text-slate-500 font-medium block">Faturamento Projetado</span>
            <h4 class="text-base font-bold text-slate-900 mt-0.5">${G(te)}</h4>
            <span class="text-[10px] text-slate-500">para ${ee} unidades</span>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-[11px] text-slate-500 font-medium block">Custo Total de Insumos</span>
            <h4 class="text-base font-bold text-slate-900 mt-0.5">${G(_)}</h4>
            <span class="text-[10px] text-slate-500">${G(d)} /unidade</span>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-[11px] text-slate-500 font-medium block">Comissões do Canal</span>
            <h4 class="text-base font-bold ${o>0?`text-amber-700`:`text-slate-600`} mt-0.5">
              ${G(ne)}
            </h4>
            <span class="text-[10px] text-slate-500">${U.canal} (${o}%)</span>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs col-span-1 sm:col-span-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-slate-500 font-medium">Lucro Líquido Real Total</span>
              <span class="text-xs font-bold ${v>0?`text-emerald-700 bg-emerald-50`:`text-red-700 bg-red-50`} px-2 py-0.5 rounded">
                ${G(p)} /un
              </span>
            </div>
            <h4 class="text-lg font-bold ${v>0?`text-emerald-600`:`text-red-600`} mt-0.5">
              ${G(v)}
            </h4>
            <span class="text-[10px] text-slate-500">dinheiro limpo no caixa após insumos, brindes e apps</span>
          </div>
        </div>

        <!-- Análise Comparativa & Breakeven de Volume -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <i class="fa-solid fa-scale-balanced text-indigo-500"></i> Comparativo: Venda Normal vs. Oferta Promocional
          </h4>

          <div class="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div class="space-y-1">
              <span class="font-bold text-slate-500 text-[11px]">Cenário Preço Cheio</span>
              <p class="text-slate-700">Preço: <strong>${G(c)}</strong></p>
              <p class="text-slate-700">Lucro por un.: <strong>${G(h)}</strong> (${g.toFixed(1)}%)</p>
              <p class="text-slate-700">Lucro em ${ee} un.: <strong class="text-slate-900">${G(re)}</strong></p>
            </div>
            <div class="space-y-1 border-l border-slate-200 pl-3">
              <span class="font-bold text-rose-600 text-[11px]">Cenário da Promoção</span>
              <p class="text-slate-700">Preço: <strong>${G(l)}</strong></p>
              <p class="text-slate-700">Lucro por un.: <strong class="${p>0?`text-emerald-600`:`text-red-600`}">${G(p)}</strong> (${m.toFixed(1)}%)</p>
              <p class="text-slate-700">Lucro em ${ee} un.: <strong class="${v>0?`text-emerald-600`:`text-red-600`}">${G(v)}</strong></p>
            </div>
          </div>

          <!-- Ponto de Equilíbrio (Breakeven) -->
          <div class="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <div class="font-bold flex items-center gap-1.5 text-amber-900">
              <i class="fa-solid fa-bullseye text-amber-600"></i> Ponto de Equilíbrio de Volume (Breakeven):
            </div>
            ${ie&&ie!==1/0?`
              <p class="leading-relaxed">
                Para ter o mesmo lucro total de <strong>${G(re)}</strong> (que você teria vendendo ${ee} unidades a preço normal), 
                você precisará produzir e vender <strong class="text-slate-900 underline">${ie} unidades</strong> na promoção 
                ${ae>0?`(<strong class="text-amber-800">+${ae}% de volume</strong>)`:``}.
              </p>
            `:`
              <p class="text-red-700 font-semibold">
                Como o lucro por unidade na promoção é negativo ou nulo, vender mais unidades só aumentará o seu prejuízo financeiro!
              </p>
            `}
          </div>

          <!-- Dicas Rápidas Confeiteira -->
          <div class="flex items-center justify-between pt-1 text-[11px] text-slate-500">
            <span class="flex items-center gap-1"><i class="fa-solid fa-lightbulb text-amber-500"></i> Dica: Brindes artesanais de baixo CMV geram maior percepção de valor que desconto direto!</span>
            <button onclick="copiarSimulacaoWhatsApp()" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              <i class="fa-brands fa-whatsapp"></i> Copiar Oferta
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SEÇÃO 2: CALENDÁRIO COMERCIAL DA CONFEITARIA -->
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
            <i class="fa-solid fa-calendar-days text-pink-500"></i> Calendário de Oportunidades & Campanhas Sazonais
          </h3>
          <p class="text-xs text-slate-500">Datas comemorativas do ano confeiteiro e ideias práticas de kits, combos e brindes de alto giro</p>
        </div>
        <span class="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
          9 Oportunidades Mapeadas
        </span>
      </div>

      <!-- Grade de Datas Comemorativas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${yo.map(e=>(P.find(t=>t.id===e.fichaRecomendadaId),`
            <div class="bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-4 border border-slate-200 transition-all flex flex-col justify-between space-y-3">
              <div class="space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-2xs border border-slate-200">
                    ${e.periodo}
                  </span>
                  <div class="w-7 h-7 rounded-lg ${_c[e.cor]||_c.slate} flex items-center justify-center text-xs">
                    <i class="fa-solid ${e.icone}"></i>
                  </div>
                </div>

                <div>
                  <h4 class="font-bold text-slate-900 text-sm">${e.nome}</h4>
                  <p class="text-xs text-slate-600 font-medium mt-0.5">${e.sugestao}</p>
                </div>

                <p class="text-[11px] text-slate-500 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                  ${e.estrategia}
                </p>
              </div>

              <div class="pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2">
                <span class="text-[11px] text-slate-600">
                  Sugerido: <strong>${G(e.precoSugestao)}</strong>
                </span>
                <button 
                  onclick="carregarOportunidadeNoSimulador('${e.id}')"
                  class="text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <i class="fa-solid fa-sliders"></i> Testar no Simulador
                </button>
              </div>
            </div>
          `)).join(``)}
      </div>
    </div>

    <!-- SEÇÃO 3: CAMPANHAS PROMOCIONAIS SALVAS -->
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
            <i class="fa-solid fa-bullhorn"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Campanhas Promocionais Salvas</h3>
            <p class="text-xs text-slate-500">Histórico de ações planejadas, ativas e textos prontos para WhatsApp</p>
          </div>
        </div>
        <button onclick="salvarPromoDoSimulador()" class="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1">
          <i class="fa-solid fa-plus"></i> Salvar Simulação Atual
        </button>
      </div>

      ${ko.length===0?`
        <div class="py-12 text-center text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-xl">
          Nenhuma promoção salva ainda. Configure uma no simulador acima e clique em "Salvar Campanha".
        </div>
      `:`
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${ko.map(e=>{let t=P.find(t=>t.id===e.fichaId),n=t?X(t)/(t.rendimento||1):0,r=(Number(e.taxaCanal)||0)/100,i=Number(e.precoPromocionalFixo)||0,a=e.brindeAtivo?e.brindeTipo===`ficha`&&e.brindeFichaId?X(P.find(t=>t.id===e.brindeFichaId)||{})/1:Number(e.brindeCustoCustom)||0:0,o=i-i*r-(n+a),s=i>0?o/i*100:0,c=o*(Number(e.volumeVendasProjetado)||0);return`
              <div class="bg-slate-50/70 rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${e.status===`ativa`?`bg-emerald-100 text-emerald-800`:e.status===`planejada`?`bg-blue-100 text-blue-800`:`bg-slate-200 text-slate-700`}">
                      ${e.status===`ativa`?`● Em Execução`:e.status===`planejada`?`Agendada`:`Concluída`}
                    </span>
                    <h4 class="font-bold text-slate-900 text-sm mt-1">${e.nome}</h4>
                    <p class="text-xs text-slate-500">${t?t.nome:`Produto`} • ${e.canal} (${e.taxaCanal}% taxa)</p>
                  </div>
                  <div class="flex items-center gap-1">
                    <button onclick="excluirPromocao('${e.id}')" title="Excluir Campanha" class="text-slate-400 hover:text-red-600 p-1">
                      <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span class="text-[10px] text-slate-400 font-medium block">Preço</span>
                    <strong class="text-xs text-slate-800">${G(i)}</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 font-medium block">Margem</span>
                    <strong class="text-xs ${s>=35?`text-emerald-600`:`text-amber-600`}">${s.toFixed(1)}%</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 font-medium block">Lucro Proj.</span>
                    <strong class="text-xs text-emerald-600">${G(c)}</strong>
                  </div>
                </div>

                ${e.observacoes?`
                  <p class="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100">
                    <i class="fa-solid fa-circle-info text-slate-400 mr-1"></i> ${e.observacoes}
                  </p>
                `:``}

                <div class="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                  <div class="flex items-center gap-1">
                    <span class="text-[10px] text-slate-400">Status:</span>
                    <select 
                      onchange="alternarStatusPromocao('${e.id}', this.value)" 
                      class="text-[11px] font-semibold bg-white border border-slate-200 rounded-md px-1.5 py-0.5 text-slate-700"
                    >
                      <option value="ativa" ${e.status===`ativa`?`selected`:``}>Ativa</option>
                      <option value="planejada" ${e.status===`planejada`?`selected`:``}>Planejada</option>
                      <option value="concluida" ${e.status===`concluida`?`selected`:``}>Concluída</option>
                    </select>
                  </div>

                  <button 
                    onclick="copiarTextoDivulgacao('${e.id}')" 
                    class="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 p-1 hover:bg-emerald-50 rounded"
                  >
                    <i class="fa-brands fa-whatsapp"></i> Copiar Divulgação
                  </button>
                </div>
              </div>
            `}).join(``)}
        </div>
      `}
    </div>
  `}function Lu(e,t){U[e]=t,Iu()}function Ru(e){U.canal=e,U.taxaCanal=Wo(e),Iu()}function zu(e){U.tipoDesconto=e,Iu()}function Bu(){U={fichaId:P[0]?.id||`fic-2`,canal:`WhatsApp`,taxaCanal:0,tipoDesconto:`percentual`,descontoPercentual:15,precoPromocionalFixo:80,brindeAtivo:!1,brindeTipo:`ficha`,brindeFichaId:P[1]?.id||`fic-3`,brindeNomeCustom:``,brindeCustoCustom:0,volumeVendasProjetado:30},q(`Simulador restaurado.`),Iu()}function Vu(e){let t=yo.find(t=>t.id===e);if(!t)return;U.fichaId=t.fichaRecomendadaId,U.canal=t.canalRecomendado,U.taxaCanal=t.taxaRecomendada,U.tipoDesconto=t.tipoMecanica,U.descontoPercentual=t.descontoSugestao,U.precoPromocionalFixo=t.precoSugestao,U.brindeAtivo=t.brindeAtivo,U.brindeTipo=`ficha`,U.brindeFichaId=t.brindeFichaId||``,U.volumeVendasProjetado=t.volumeSugerido,q(`Oportunidade "${t.nome}" carregada no simulador!`),Iu();let n=document.getElementById(`secao-simulador`);n&&n.scrollIntoView({behavior:`smooth`,block:`start`})}function Hu(){let e=P.find(e=>e.id===U.fichaId)||P[0],t=e?e.nome:`Produto`,n=``;n=U.tipoDesconto===`percentual`?`${U.descontoPercentual}% OFF no ${U.canal}`:U.tipoDesconto===`leve_ganhe`?`Compre ${t} e ganhe brinde`:U.tipoDesconto===`combo`?`Combo Especial por ${G(U.precoPromocionalFixo)}`:`Preço Especial ${G(U.precoPromocionalFixo)}`;let r={id:`promo-`+Date.now(),nome:`${t} (${U.canal})`,dataCampanha:new Date().toISOString().split(`T`)[0],fichaId:U.fichaId,canal:U.canal,taxaCanal:U.taxaCanal,tipoDesconto:U.tipoDesconto,descontoPercentual:U.descontoPercentual,precoPromocionalFixo:U.precoPromocionalFixo,brindeAtivo:U.brindeAtivo,brindeTipo:U.brindeTipo,brindeFichaId:U.brindeFichaId,brindeNomeCustom:U.brindeNomeCustom,brindeCustoCustom:U.brindeCustoCustom,volumeVendasProjetado:U.volumeVendasProjetado,status:`ativa`,observacoes:n};ko.unshift(r),W(M.PROMOCOES),q(`Campanha salva com sucesso no histórico!`),Iu()}function Uu(e){confirm(`Deseja realmente remover esta campanha promocional?`)&&(ko=ko.filter(t=>t.id!==e),O&&lo(`promocoes`,e).catch(e=>console.error(e)),W(M.PROMOCOES),q(`Campanha removida.`),Iu())}function Wu(e,t){let n=ko.find(t=>t.id===e);n&&(n.status=t,W(M.PROMOCOES),q(`Campanha atualizada para "${t}"!`),Iu())}function Gu(e){let t=ko.find(t=>t.id===e);if(!t)return;let n=P.find(e=>e.id===t.fichaId),r=n?n.nome:`Doce Especial`,i=G(t.precoPromocionalFixo),a=`🎂 *OFERTA ESPECIAL DE CONFEITARIA* 🎂

`;if(a+=`Preparamos uma condição imperdível para você:

`,a+=`✨ *${t.nome}*\n`,a+=`📦 *Produto:* ${r}\n`,a+=`💰 *Valor Promocional:* ${i}\n`,t.brindeAtivo){let e=`Cortesia Exclusiva`;if(t.brindeTipo===`ficha`&&t.brindeFichaId){let n=P.find(e=>e.id===t.brindeFichaId);n&&(e=n.nome)}else t.brindeNomeCustom&&(e=t.brindeNomeCustom);a+=`🎁 *Presente Especial:* Ganhe ${e}!\n`}t.canal===`WhatsApp`?(a+=`
📲 *Peça agora pelo WhatsApp:* Garanta o seu antes que acabe a fornada!
`,a+=`🛵 Entregamos fresquinho na sua casa!`):a+=`\n📲 *Disponível no ${t.canal} por tempo limitado!*\n`,navigator.clipboard.writeText(a).then(()=>{q(`Texto promocional copiado para o WhatsApp!`)}).catch(()=>{q(`Erro ao copiar texto.`,!1)})}function Ku(){let e=P.find(e=>e.id===U.fichaId)||P[0],t=e?e.nome:`Doce Artesanal`,n=`🎂 *CONDIÇÃO ESPECIAL: ${t.toUpperCase()}*\n\n`;if(n+=`Aproveite nossa promoção válida por tempo limitado:
`,n+=`👉 *${t}*\n`,U.brindeAtivo){let e=`Brinde Especial`;if(U.brindeTipo===`ficha`&&U.brindeFichaId){let t=P.find(e=>e.id===U.brindeFichaId);t&&(e=t.nome)}else U.brindeNomeCustom&&(e=U.brindeNomeCustom);n+=`🎁 *Brinde Exclusivo:* ${e}\n`}n+=`
📲 Entre em contato para reservar a sua unidade!`,navigator.clipboard.writeText(n).then(()=>{q(`Mensagem de oferta copiada!`)}).catch(()=>{q(`Erro ao copiar texto.`,!1)})}var qu=[`dashboard`,`estoque`,`fichas`,`pedidos`,`clientes`,`mrp`,`caixa`,`promocoes`,`dre`,`relatorios`,`cardapio`];function Ju(){Q(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2"><i class="fa-solid fa-gear text-slate-500"></i> Configurações</h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <div class="mt-4 space-y-5 text-sm">
      <div>
        <p class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">👤 Conta</p>
        <div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs">
          <span class="text-slate-600 truncate">${xs||`Sessão local`}</span>
          ${O?`<button onclick="fazerLogout()" class="font-bold text-red-600 hover:text-red-800 cursor-pointer shrink-0">Sair</button>`:``}
        </div>
      </div>
      <div>
        <p class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">⌨️ Atalhos de teclado</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          ${[[`1 … 9, 0`,`Trocar de aba (as 10 primeiras; Cardápio pelo menu ou Ctrl+K)`],[`← → ↑ ↓`,`Navegar entre as células da grade de produção (Cardápio)`],[`Enter`,`Confirmar a quantidade e pular para a próxima célula`],[`Esc`,`Cancelar a edição da célula`],[`Ctrl+K`,`Busca rápida de ações e cadastros`],[`N`,`Criar novo pedido`],[`/`,`Focar a busca (Estoque / Clientes)`],[`?`,`Abrir configurações`],[`Esc`,`Fechar janela`]].map(([e,t])=>`<div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"><span class="text-slate-600">${t}</span><kbd class="px-2 py-0.5 rounded bg-slate-900 text-white font-bold shrink-0">${e}</kbd></div>`).join(``)}
        </div>
        <p class="text-[11px] text-slate-400 mt-2">Os atalhos não disparam enquanto você digita em campos.</p>
      </div>
      <div class="pt-3 border-t border-slate-200">
        <p class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">📖 Documentação rápida</p>
        <ul class="text-xs text-slate-600 space-y-1.5">
          <li><strong>Pedidos:</strong> agenda de produção no topo, Kanban abaixo; use Baixa para debitar insumos e Lançar para registrar no caixa.</li>
          <li><strong>Fichas:</strong> CMV calculado do estoque; ajuste margem alvo e preço praticado para ver a margem real.</li>
          <li><strong>Caixa:</strong> DRE do mês no topo, por competência da entrega.</li>
          <li><strong>Clientes:</strong> sincronizados dos pedidos; use + Pedido para vender de novo.</li>
          <li><strong>URLs:</strong> cada página tem endereço próprio (#/login, #/dashboard, #/estoque, #/fichas, #/pedidos, #/clientes, #/mrp, #/caixa, #/promocoes).</li>
        </ul>
      </div>
      <div class="pt-3 border-t border-slate-200">
        <p class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">💾 Banco de dados</p>
        <div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs">
          <span class="text-slate-600">
            Fonte: <strong class="${O?`text-emerald-700`:`text-amber-700`}">${O?`Supabase`:`Local (offline)`}</strong>
            <span class="text-slate-400">• ${N.length} insumos • ${F.length} pedidos</span>
          </span>
        </div>
        ${O?`
          <button onclick="sincronizarLocalComBanco()" class="mt-2 w-full px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer" title="Manda o que está salvo neste navegador para o Supabase">
            <i class="fa-solid fa-cloud-arrow-up"></i> Enviar dados locais para o banco
          </button>
        `:``}
        <div class="mt-2 grid grid-cols-2 gap-2">
          <button onclick="exportarBackupLocal()" class="px-3 py-2 text-xs font-bold rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer" title="Baixa um arquivo com tudo deste navegador">
            <i class="fa-solid fa-download"></i> Exportar backup
          </button>
          <label class="px-3 py-2 text-xs font-bold rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer text-center" title="Restaura de um arquivo de backup">
            <i class="fa-solid fa-upload"></i> Importar backup
            <input type="file" accept=".json,application/json" class="hidden" onchange="importarBackupLocal(this)" />
          </label>
        </div>
      </div>
      <div class="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
        <span>Gestão de Confeitaria • v1.3</span>
        <button onclick="exportarCSV('pedidos')" class="font-bold text-slate-600 hover:text-slate-900 cursor-pointer">Exportar CSV</button>
      </div>
    </div>
  `)}function Yu(){Ju()}function Xu(){let e={_app:`gestao-confeitaria`,_exportadoEm:new Date().toISOString()};[...Object.values(M),`confeitaria_cardapios`].forEach(t=>{e[t]=localStorage.getItem(t)}),Fd(`backup-confeitaria-${Z(0)}.json`,JSON.stringify(e),`application/json`),q(`Backup baixado! Guarde esse arquivo.`)}function Zu(e){let t=e.files&&e.files[0];if(!t)return;let n=new FileReader;n.onload=()=>{try{let e=JSON.parse(n.result);if(!e||e._app!==`gestao-confeitaria`){q(`Arquivo inválido.`,!1);return}let t=0;if([...Object.values(M),`confeitaria_cardapios`].forEach(n=>{typeof e[n]==`string`&&e[n]!==null&&(localStorage.setItem(n,e[n]),t++)}),t===0){q(`O arquivo não tem dados válidos.`,!1);return}q(`Backup importado (${t} coleções). Recarregando…`),setTimeout(()=>window.location.reload(),800)}catch{q(`Não consegui ler esse arquivo.`,!1)}},n.onerror=()=>q(`Falha ao ler o arquivo.`,!1),n.readAsText(t),e.value=``}async function Qu(){if(!O){q(`Supabase não configurado neste deploy.`,!1);return}let e=N.length+P.length+F.length+I.length+ko.length+R.length;if(e===0){q(`Não há dados locais para enviar.`,!1);return}if(confirm(`Enviar ${e} registro(s) deste navegador para o Supabase?\n\nOs dados do banco com o mesmo id serão atualizados.`)){Js(`salvando`);try{for(let e of Object.values(M))await co(e,Bs());Io(),Js(`ok`,`Enviado ao banco ✓`),q(`Dados enviados para o Supabase!`)}catch(e){console.error(`Falha ao sincronizar com o Supabase:`,e),Js(`erro`,`Falha ao enviar`),q(`Não consegui enviar: `+(e&&e.message?e.message:`erro desconhecido`),!1)}}}function $u(){confirm(`Apagar os dados salvos neste navegador e recarregar do Supabase?`)&&(Object.values(M).forEach(e=>localStorage.removeItem(e)),localStorage.removeItem(`confeitaria_cardapios`),window.location.reload())}var ed=[];function td(){Q(`
    <div class="flex items-center gap-2.5 pb-3 border-b border-slate-200">
      <i class="fa-solid fa-magnifying-glass text-slate-400"></i>
      <input id="paletteInput" oninput="filtrarPalette(this.value)" onkeydown="if(event.key==='Enter'){executarPalette(0);}" placeholder="Ação, cliente, produto, insumo… (Enter abre o 1º)" autocomplete="off" class="flex-1 outline-none text-sm text-slate-800 placeholder-slate-400 bg-transparent" />
      <kbd class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">ESC</kbd>
    </div>
    <div id="paletteResults" class="mt-2 max-h-80 overflow-y-auto"></div>
  `),rd(``),setTimeout(()=>document.getElementById(`paletteInput`)?.focus(),60)}function nd(e){let t=String(e||``).trim().toLowerCase(),n=(e,t,n,r)=>({icone:r,titulo:t,desc:n,fn:()=>J(e)}),r=[{icone:`fa-plus`,titulo:`Novo pedido`,desc:`Criar pedido`,fn:()=>{J(`pedidos`),setTimeout(Kl,80)}},{icone:`fa-boxes-stacked`,titulo:`Novo insumo`,desc:`Cadastrar no estoque`,fn:()=>{J(`estoque`),setTimeout(hl,80)}},{icone:`fa-cash-register`,titulo:`Novo lançamento`,desc:`Lançar no caixa`,fn:()=>{J(`caixa`),setTimeout(su,80)}},n(`dashboard`,`Ir para Visão Geral`,`Metas e resumo`,`fa-chart-pie`),n(`estoque`,`Ir para Estoque`,`${N.length} insumos`,`fa-boxes-stacked`),n(`fichas`,`Ir para Fichas`,`${P.length} receitas`,`fa-book-bookmark`),n(`pedidos`,`Ir para Pedidos`,`Kanban + agenda`,`fa-clipboard-list`),n(`clientes`,`Ir para Clientes`,`${R.length} cadastrados`,`fa-users`),n(`mrp`,`Ir para Compras (MRP)`,`Previsão`,`fa-cart-shopping`),n(`caixa`,`Ir para Livro Caixa`,`Financeiro • lançamentos`,`fa-cash-register`),n(`dre`,`Ir para DRE do Mês`,`Financeiro • resultado`,`fa-scale-balanced`),n(`relatorios`,`Ir para Relatórios`,`Financeiro • metas e canais`,`fa-chart-line`),n(`cardapio`,`Ir para Cardápio`,`Datas temáticas + semana`,`fa-calendar-days`),n(`promocoes`,`Ir para Promoções`,`Simulador`,`fa-tags`)];if(!t)return r;let i=e=>String(e||``).toLowerCase().includes(t),a=[];return R.filter(e=>i(e.nome)).slice(0,4).forEach(e=>a.push({icone:`fa-user`,titulo:e.nome,desc:`Cliente • ${e.telefone||`sem fone`}`,fn:()=>{window._buscaCliente=e.nome,dc.clientes.pagina=1,J(`clientes`)}})),P.filter(e=>i(e.nome)).slice(0,4).forEach(e=>a.push({icone:`fa-book-bookmark`,titulo:e.nome,desc:`Ficha técnica`,fn:()=>J(`fichas`)})),N.filter(e=>i(e.nome)).slice(0,4).forEach(e=>a.push({icone:`fa-box`,titulo:e.nome,desc:`Insumo • ${e.quantidade}${e.unidade}`,fn:()=>{el=e.nome,dc.estoque.pagina=1,J(`estoque`)}})),[...a,...r.filter(e=>i(e.titulo)||i(e.desc))]}function rd(e){ed=nd(e);let t=document.getElementById(`paletteResults`);t&&(t.innerHTML=ed.length===0?`<p class="text-xs text-slate-400 text-center py-6">Nada encontrado.</p>`:ed.map((e,t)=>`
      <button onclick="executarPalette(${t})" class="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-left transition-colors cursor-pointer">
        <span class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs shrink-0"><i class="fa-solid ${e.icone}"></i></span>
        <span class="min-w-0"><span class="block text-sm font-bold text-slate-800 truncate">${K(e.titulo)}</span>
        <span class="block text-[11px] text-slate-400 truncate">${K(e.desc)}</span></span>
      </button>`).join(``))}function id(e){let t=ed[e];t&&($(),setTimeout(()=>t.fn(),30))}document.addEventListener(`keydown`,e=>{if((e.ctrlKey||e.metaKey)&&String(e.key||``).toLowerCase()===`k`){e.preventDefault(),td();return}let t=(e.target?.tagName||``).toLowerCase(),n=[`input`,`textarea`,`select`].includes(t)||e.target?.isContentEditable;if(e.key===`Escape`){if(document.getElementById(`modoApresentacao`)){Nu();return}let e=document.getElementById(`menuPreencher`);if(e&&!e.classList.contains(`hidden`)){e.classList.add(`hidden`);return}$();return}if(!n&&!(e.ctrlKey||e.metaKey||e.altKey)){if(e.key>=`1`&&e.key<=`9`||e.key===`0`){let t=qu[e.key===`0`?9:Number(e.key)-1];t&&J(t)}else if(e.key===`?`||e.shiftKey&&e.key===`/`)Yu();else if(e.key===`n`||e.key===`N`)z!==`pedidos`&&J(`pedidos`),setTimeout(Kl,60);else if(e.key===`/`){e.preventDefault();let t=document.querySelector(`#tab-estoque input[type="text"], #tab-clientes input[type="text"], #tab-clientes input:not([type])`);t&&t.focus()}}});function ad(e,t){return(t||``).replace(/\D/g,``)+`|`+(e||``).trim().toLowerCase()}function od(e=!0){let t=new Map(R.map(e=>[e.chave||ad(e.nome,e.telefone),e]));F.forEach(e=>{if(!e.cliente)return;let n=ad(e.cliente,e.telefone);if(!t.has(n)){let r={id:`cli-`+Date.now()+`-`+Math.floor(Math.random()*1e3),chave:n,nome:e.cliente,telefone:e.telefone||``,endereco:``,aniversario:``,observacoes:``};R.push(r),t.set(n,r)}}),e&&R.length&&W(M.CLIENTES)}function sd(e,t){if(!e)return;let n=ad(e,t);R.some(e=>(e.chave||ad(e.nome,e.telefone))===n)||(R.push({id:`cli-`+Date.now(),chave:n,nome:e,telefone:t||``,endereco:``,aniversario:``,observacoes:``}),W(M.CLIENTES))}function cd(e,t){let n=ad(e,t);return F.filter(e=>ad(e.cliente,e.telefone)===n)}function ld(){let e=document.getElementById(`tab-clientes`);if(!e)return;let t=(window._buscaCliente||``).toLowerCase(),n=[...R].sort((e,t)=>(e.nome||``).localeCompare(t.nome||``)).filter(e=>!t||(e.nome||``).toLowerCase().includes(t)||(e.telefone||``).includes(t)),r=fc(`clientes`,n);e.innerHTML=`
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg"><i class="fa-solid fa-users"></i></div>
        <div><h2 class="font-bold text-slate-900 text-lg">Clientes</h2><p class="text-xs text-slate-500">${R.length} cadastrados • sincronizados dos pedidos</p></div>
      </div>
      <div class="flex items-center gap-2">
        <input oninput="window._buscaCliente=this.value;PAGINACAO.clientes.pagina=1;renderClientes()" value="${K(window._buscaCliente||``)}" placeholder="Buscar nome ou telefone..." class="border border-slate-300 rounded-xl px-3 py-2 text-sm w-56" />
        <button onclick="abrirModalCliente()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl cursor-pointer"><i class="fa-solid fa-plus"></i> Novo</button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      ${n.length===0?`<p class="text-sm text-slate-400 col-span-full text-center py-8">Nenhum cliente. Crie um pedido ou cadastre manualmente.</p>`:r.itens.map(e=>{let t=cd(e.nome,e.telefone),n=t.reduce((e,t)=>e+(Number(t.valorTotal)||0),0),r=t.filter(e=>e.status!==`pronto`).length,i=t.map(e=>e.dataEntrega||``).sort().reverse()[0]||`—`;return`
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
          <div class="flex items-start justify-between gap-2">
            <div><h3 class="font-bold text-slate-900">${e.nome}</h3><p class="text-xs text-slate-500">${e.telefone||`sem telefone`}${e.aniversario?` • 🎂 ${e.aniversario}`:``}</p></div>
            <div class="flex gap-1">
              <button onclick="abrirModalCliente('${e.id}')" class="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="excluirCliente('${e.id}')" class="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
            <div class="bg-slate-50 rounded-lg p-2"><p class="font-black text-slate-900">${t.length}</p><p class="text-slate-500">pedidos</p></div>
            <div class="bg-slate-50 rounded-lg p-2"><p class="font-black text-slate-900">${G(n)}</p><p class="text-slate-500">total</p></div>
            <div class="bg-slate-50 rounded-lg p-2"><p class="font-black ${r?`text-blue-700`:`text-slate-400`}">${r}</p><p class="text-slate-500">ativos</p></div>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Última entrega: ${i}</p>
          ${e.observacoes?`<p class="text-[11px] text-slate-500 mt-1">📝 ${e.observacoes}</p>`:``}
          ${t.slice(0,3).map(e=>`<p class="text-[11px] text-slate-600 mt-1">• ${e.dataEntrega||`?`} — ${(e.itens||[]).map(e=>`${e.qtd}x ${e.nome}`).join(`, `)} (${G(e.valorTotal)})</p>`).join(``)}
          <div class="flex gap-2 mt-3">
            <button onclick="novoPedidoParaCliente('${e.id}')" class="flex-1 py-1.5 text-xs font-bold rounded-lg bg-pink-600 text-white hover:bg-pink-700 cursor-pointer">+ Pedido</button>
            ${e.telefone?`<a target="_blank" href="https://wa.me/55${e.telefone.replace(/\D/g,``)}" class="flex-1 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-center hover:bg-emerald-100">WhatsApp</a>`:``}
          </div>
        </div>`}).join(``)}
    </div>
    ${pc(`clientes`,r.total,r.atual)}
  `}function ud(e=null){let t=e?R.find(t=>t.id===e):null;Q(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900">${t?`Editar Cliente`:`Novo Cliente`}</h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form onsubmit="salvarCliente(event, '${e||``}')" class="mt-4 space-y-3 text-sm">
      <div><label class="block text-xs font-semibold mb-1">Nome</label><input id="cliNome" required value="${t?.nome||``}" class="w-full border rounded-lg px-3 py-2" /></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-xs font-semibold mb-1">Telefone/WhatsApp</label><input id="cliTel" value="${t?.telefone||``}" placeholder="11999998888" class="w-full border rounded-lg px-3 py-2" /></div>
        <div><label class="block text-xs font-semibold mb-1">Aniversário</label><input id="cliAniv" value="${t?.aniversario||``}" placeholder="DD/MM" class="w-full border rounded-lg px-3 py-2" /></div>
      </div>
      <div><label class="block text-xs font-semibold mb-1">Endereço</label><input id="cliEnd" value="${t?.endereco||``}" class="w-full border rounded-lg px-3 py-2" /></div>
      <div><label class="block text-xs font-semibold mb-1">Observações (alergias, preferências)</label><textarea id="cliObs" rows="2" class="w-full border rounded-lg px-3 py-2">${t?.observacoes||``}</textarea></div>
      <div class="flex justify-end gap-2 pt-2"><button type="button" onclick="fecharModal()" class="px-4 py-2 text-slate-600 cursor-pointer">Cancelar</button><button class="px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold cursor-pointer">Salvar</button></div>
    </form>
  `)}function dd(e,t){e.preventDefault();let n=document.getElementById(`cliNome`).value.trim(),r=document.getElementById(`cliTel`).value.trim(),i=document.getElementById(`cliAniv`).value.trim(),a=document.getElementById(`cliEnd`).value.trim(),o=document.getElementById(`cliObs`).value.trim();if(t){let e=R.find(e=>e.id===t);e&&Object.assign(e,{nome:n,telefone:r,aniversario:i,endereco:a,observacoes:o,chave:ad(n,r)})}else R.push({id:`cli-`+Date.now(),chave:ad(n,r),nome:n,telefone:r,aniversario:i,endereco:a,observacoes:o});W(M.CLIENTES),$(),q(`Cliente salvo!`),ld()}function fd(e){confirm(`Excluir cliente? Os pedidos dele são mantidos.`)&&(R=R.filter(t=>t.id!==e),O&&lo(`clientes`,e).catch(e=>console.error(e)),W(M.CLIENTES),ld())}function pd(e){let t=R.find(t=>t.id===e);t&&(J(`pedidos`),setTimeout(()=>{Kl(),setTimeout(()=>{let e=document.getElementById(`pedCliente`);e&&(e.value=t.nome);let n=document.getElementById(`pedTelefone`);n&&(n.value=t.telefone||``)},50)},50))}function md(e){let t=document.getElementById(`printArea`);if(!t){alert(`Área de impressão não encontrada.`);return}t.innerHTML=e,window.print()}var hd={kcal:2e3,carb:300,acucar:50,prot:50,gordTot:65,gordSat:20,fibra:25,sodio:2e3},gd={acucar:15,sodio:600,gordSat:6};function _d(e){return e===`kg`||e===`L`?1e3:+(e===`g`||e===`ml`)}function vd(e,t){let n=Math.max(1,Number(t)||0),r={kcal:0,carb:0,acucar:0,prot:0,gordTot:0,gordSat:0,gordTrans:0,fibra:0,sodio:0,peso:0},i=[],a=0,o=0;(e.ingredientes||[]).forEach(e=>{let t=N.find(t=>t.id===e.insumoId);if(!t)return;let n=_d(t.unidade),s=(Number(e.qtd)||0)*n;n||a++,(t.kcal100||0)>0||(t.carb100||0)>0||o++;let c=s/100;r.kcal+=c*(t.kcal100||0),r.carb+=c*(t.carb100||0),r.acucar+=c*(t.acucar100||0),r.prot+=c*(t.prot100||0),r.gordTot+=c*(t.gordTot100||0),r.gordSat+=c*(t.gordSat100||0),r.gordTrans+=c*(t.gordTrans100||0),r.fibra+=c*(t.fibra100||0),r.sodio+=c*(t.sodio100||0),r.peso+=s,i.push({nome:t.nome,qtdG:s,alergenicos:String(t.alergenicos||``).split(`,`).map(e=>e.trim()).filter(Boolean)})});let s=r.peso>0?r.peso:1,c={},l={},u={};[`kcal`,`carb`,`acucar`,`prot`,`gordTot`,`gordSat`,`gordTrans`,`fibra`,`sodio`].forEach(e=>{c[e]=r[e]*n/s,l[e]=r[e]*100/s,u[e]=e===`gordTrans`?0:hd[e]>0?c[e]/hd[e]*100:0}),i.sort((e,t)=>t.qtdG-e.qtdG);let d=[...new Set(i.flatMap(e=>e.alergenicos))],f=[];return l.acucar>=gd.acucar&&f.push(`AÇÚCAR`),l.sodio>=gd.sodio&&f.push(`SÓDIO`),l.gordSat>=gd.gordSat&&f.push(`GORDURA SATURADA`),{tot:r,por:c,por100:l,vd:u,itens:i,alergenicos:d,lupa:f,porcao:n,pesoReceita:r.peso,porcoesEmbalagem:r.peso>0?Math.max(1,Math.round(r.peso/n)):0,semConversao:a,semDados:o}}var yd=(e,t=1)=>(Number(e)||0).toFixed(t).replace(`.`,`,`),bd=e=>Math.round(Number(e)||0).toString();function xd(e){let t=(e,t,n,r,i=!1,a=!1)=>`
    <tr>
      <td style="text-align:left;${i?`padding-left:14px;`:``}${a?`font-weight:800;`:``}">${e}</td>
      <td>${t}</td><td>${n}</td><td>${r}</td>
    </tr>`;return`
  <table style="width:100%;border-collapse:collapse;font-size:12px;border:2px solid #000">
    <tr><th colspan="4" style="text-align:left;font-size:14px;padding:6px 8px;border-bottom:2px solid #000">INFORMAÇÃO NUTRICIONAL</th></tr>
    <tr><td colspan="4" style="text-align:left;font-size:11px;padding:4px 8px;border-bottom:1px solid #000">Porções por embalagem: cerca de ${e.porcoesEmbalagem} &nbsp;•&nbsp; Porção de ${e.porcao} g</td></tr>
    <tr style="font-size:10px;background:#f2f2f2"><th style="text-align:left;padding:4px 8px"></th><th style="padding:4px">100 g</th><th style="padding:4px">${e.porcao} g</th><th style="padding:4px">%VD*</th></tr>
    ${t(`Valor energético (kcal)`,bd(e.por100.kcal),bd(e.por.kcal),bd(e.vd.kcal),!1,!0)}
    ${t(`Carboidratos totais (g)`,yd(e.por100.carb),yd(e.por.carb),bd(e.vd.carb),!1,!0)}
    ${t(`Açúcares totais (g)`,yd(e.por100.acucar),yd(e.por.acucar),bd(e.vd.acucar),!0)}
    ${t(`Proteínas (g)`,yd(e.por100.prot),yd(e.por.prot),bd(e.vd.prot),!1,!0)}
    ${t(`Gorduras totais (g)`,yd(e.por100.gordTot),yd(e.por.gordTot),bd(e.vd.gordTot),!1,!0)}
    ${t(`Gorduras saturadas (g)`,yd(e.por100.gordSat),yd(e.por.gordSat),bd(e.vd.gordSat),!0)}
    ${t(`Gorduras trans (g)`,yd(e.por100.gordTrans),yd(e.por.gordTrans),`—`,!0)}
    ${t(`Fibra alimentar (g)`,yd(e.por100.fibra),yd(e.por.fibra),bd(e.vd.fibra))}
    ${t(`Sódio (mg)`,bd(e.por100.sodio),bd(e.por.sodio),bd(e.vd.sodio),!1,!0)}
  </table>
  <p style="font-size:10px;margin:4px 0 0">*% Valores Diários de referência com base em uma dieta de 2.000 kcal.</p>`}function Sd(e,t,n){let r=P.find(t=>t.id===e);if(!r){q(`Ficha não encontrada.`,!1);return}let i=Math.max(1,Number(t)||Number(r.porcaoG)||40),a=Math.max(0,parseInt(n??r.validadeDias??5,10)||0),o=vd(r,i),s=o.itens.length?o.itens.map(e=>e.alergenicos.length?`<strong>${K(e.nome.toUpperCase())}</strong>`:K(e.nome.toUpperCase())).join(`, `)+`.`:`—`;Q(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-apple-whole text-emerald-600"></i> Etiqueta nutricional — ${K(r.nome)}
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <div class="mt-3 grid grid-cols-2 gap-2.5">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Porção (g)</label>
        <input type="number" min="1" step="1" id="etiPorcao" value="${i}" onchange="atualizarEtiquetaNutricional('${r.id}')" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Validade (dias)</label>
        <input type="number" min="0" step="1" id="etiValidade" value="${a}" onchange="atualizarEtiquetaNutricional('${r.id}')" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800" />
      </div>
    </div>
    ${o.semDados>0?`<p class="mt-2 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">⚠️ ${o.semDados} ingrediente(s) sem dados nutricionais — complete no Estoque para a etiqueta ficar exata.</p>`:``}
    ${o.semConversao>0?`<p class="mt-2 text-[11px] text-slate-500">ℹ️ ${o.semConversao} ingrediente(s) em "un" não entram no cálculo (sem conversão para gramas).</p>`:``}

    <div class="mt-3 space-y-3 text-slate-900">
      ${o.lupa.length>0?`<div class="flex flex-wrap gap-1.5">${o.lupa.map(e=>`<span class="inline-flex items-center gap-1 text-[11px] font-black text-white bg-black px-2.5 py-1 rounded-md"><i class="fa-solid fa-magnifying-glass"></i> ALTO EM ${e}</span>`).join(``)}</div>`:``}
      ${xd(o)}
      <div class="text-[11px] leading-relaxed">
        <p><strong>INGREDIENTES:</strong> ${s}</p>
        ${o.alergenicos.length>0?`<p class="mt-1"><strong>ALÉRGICOS: CONTÉM ${K(o.alergenicos.join(`, `).toUpperCase())}.</strong></p>`:``}
        ${a>0?`<p class="mt-1">Validade: ${a} dia(s) após a fabricação.</p>`:``}
        <p class="mt-1 text-slate-500">Valores estimados calculados a partir da ficha técnica. Não substituem laudo laboratorial.</p>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap justify-end gap-2 pt-3 border-t border-slate-200">
      <button onclick="salvarPadraoEtiqueta('${r.id}')" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold cursor-pointer" title="Grava porção e validade na ficha">
        <i class="fa-solid fa-bookmark"></i> Salvar padrão na ficha
      </button>
      <button onclick="imprimirEtiquetaNutricional('${r.id}')" class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer">
        <i class="fa-solid fa-print"></i> Imprimir etiqueta
      </button>
    </div>
  `)}function Cd(e){Sd(e,Number(document.getElementById(`etiPorcao`)?.value)||0,parseInt(document.getElementById(`etiValidade`)?.value,10)||0)}function wd(e){let t=P.find(t=>t.id===e);t&&(t.porcaoG=Math.max(1,Number(document.getElementById(`etiPorcao`)?.value)||0),t.validadeDias=Math.max(0,parseInt(document.getElementById(`etiValidade`)?.value,10)||0),W(M.FICHAS),q(`Porção e validade salvas na ficha!`))}function Td(e){let t=P.find(t=>t.id===e);if(!t)return;let n=Math.max(1,Number(document.getElementById(`etiPorcao`)?.value)||Number(t.porcaoG)||40),r=Math.max(0,parseInt(document.getElementById(`etiValidade`)?.value,10)||Number(t.validadeDias)||0),i=vd(t,n),a=i.itens.length?i.itens.map(e=>e.alergenicos.length?`<strong>${K(e.nome.toUpperCase())}</strong>`:K(e.nome.toUpperCase())).join(`, `)+`.`:`—`;md(`
    <div class="etiqueta">
      ${Jo(`grande`)}
      <h1>${K(t.nome)}</h1>
      ${i.lupa.length>0?`<p>${i.lupa.map(e=>`<span style="display:inline-block;background:#000;color:#fff;font-weight:800;font-size:11px;padding:2px 8px;border-radius:4px;margin-right:4px">ALTO EM ${e}</span>`).join(``)}</p>`:``}
      ${xd(i)}
      <p style="font-size:11px;margin-top:8px"><strong>INGREDIENTES:</strong> ${a}</p>
      ${i.alergenicos.length>0?`<p style="font-size:11px"><strong>ALÉRGICOS: CONTÉM ${K(i.alergenicos.join(`, `).toUpperCase())}.</strong></p>`:``}
      ${r>0?`<p style="font-size:11px">Validade: ${r} dia(s) após a fabricação.</p>`:``}
      ${Yo()}
      <p style="font-size:10px;color:#666;margin-top:6px">Valores estimados a partir da ficha técnica. Não substituem laudo laboratorial.</p>
    </div>
  `)}function Ed(e){let t=F.find(t=>t.id===e);if(!t)return;let n=Dc(t);md(`
    <div class="etiqueta">
      ${Jo()}
      <h1>🧁 ${t.cliente}</h1>
      <p><strong>Entrega:</strong> ${(t.dataEntrega||``).split(`-`).reverse().join(`/`)} às ${t.horaEntrega||`--:--`} • ${t.canal||``}</p>
      <p><strong>Tel:</strong> ${t.telefone||`—`}</p>
      <table><tr><th>Qtd</th><th>Item</th><th>Valor</th></tr>
      ${(t.itens||[]).map(e=>`<tr><td>${e.qtd}x</td><td>${e.nome}</td><td>${G((e.qtd||0)*(e.precoUnit||0))}</td></tr>`).join(``)}
      </table>
      <p><strong>Total:</strong> ${G(n.total)} • <strong>Sinal:</strong> ${G(n.sinal)} • <strong>Falta:</strong> ${G(n.restante)}</p>
      ${t.observacoes?`<p><strong>Obs:</strong> ${t.observacoes}</p>`:``}
      ${Yo()}
      <p style="margin-top:8px;font-size:12px">Pedido #${t.id} • ${new Date().toLocaleString(`pt-BR`)}</p>
    </div>
  `)}function Dd(e){let t=P.find(t=>t.id===e);if(!t)return;let n=vc(t,0);md(`
    <div class="etiqueta">
      ${Jo()}
      <h1>${t.nome}</h1>
      <p>Rendimento: ${t.rendimento} • CMV: ${G(n.cmvTotal)} (${G(n.cmvUnit)}/un) • Preço sugerido: ${G(n.precoTotal)}</p>
      ${t.tempoPreparoMin?`<p>Tempo: ${t.tempoPreparoMin}min ${t.dicaForno?`• `+t.dicaForno:``}</p>`:``}
      <table><tr><th>Insumo</th><th>Qtd</th><th>Custo</th></tr>
      ${(t.ingredientes||[]).map(e=>{let t=N.find(t=>t.id===e.insumoId),n=t?gc(t)*e.qtd:0;return`<tr><td>${t?t.nome:`—`}</td><td>${e.qtd}${t?t.unidade:``}</td><td>${G(n)}</td></tr>`}).join(``)}
      </table>
      ${t.modoPreparo?`<p style="margin-top:8px;white-space:pre-line"><strong>Preparo:</strong>\n${t.modoPreparo}</p>`:``}
      ${Yo()}
    </div>
  `)}function Q(e){let t=document.getElementById(`modalContainer`),n=document.getElementById(`modalContent`);if(!t||!n)return;n.innerHTML=e,t.classList.remove(`hidden`);let r=document.getElementById(`modalBox`);r&&(r.classList.remove(`modal-pop`),r.offsetWidth,r.classList.add(`modal-pop`))}function $(){let e=document.getElementById(`modalContainer`);e&&e.classList.add(`hidden`)}window.addEventListener(`click`,e=>{let t=document.getElementById(`modalContainer`);e.target===t&&$();let n=document.getElementById(`notifPanel`),r=document.getElementById(`notifBell`);n&&!n.classList.contains(`hidden`)&&r&&!r.contains(e.target)&&!n.contains(e.target)&&n.classList.add(`hidden`)});function Od(){let e=[];Ws().forEach(t=>{let n=Number(t.quantidade===void 0?t.estoqueAtual:t.quantidade)||0,r=Number(t.alertaEstoqueMinimo===void 0?t.estoqueMinimo:t.alertaEstoqueMinimo)||0;e.push({grupo:`Estoque baixo`,icone:`fa-triangle-exclamation`,cor:`text-amber-500 bg-amber-50`,texto:`<strong>${K(t.nome)}</strong>: ${n}${K(t.unidade||``)} (mín. ${r}${K(t.unidade||``)})`,tab:`estoque`})});try{Mc(7).alertas.slice(0,8).forEach(t=>{e.push({grupo:`Ruptura prevista (7 dias)`,icone:`fa-boxes-stacked`,cor:t.critico?`text-red-500 bg-red-50`:`text-amber-500 bg-amber-50`,texto:t.critico?`<strong>${K(t.nome)}</strong> ${Pc(t)} — falta ${Ac(t.deficit,t.unidade)}${t.pacotesSugeridos>0?` • comprar ${t.pacotesSugeridos}x pct`:``}`:`<strong>${K(t.nome)}</strong> fica abaixo do mínimo — sobra ${Ac(t.saldoProjetado,t.unidade)}`,tab:`estoque`})})}catch{}F.filter(e=>e.status===`aguardando`).forEach(t=>{e.push({grupo:`Aguardando sinal`,icone:`fa-hourglass-start`,cor:`text-orange-500 bg-orange-50`,texto:`<strong>${K(t.cliente)}</strong> • ${G(t.valorTotal)} • entrega ${(t.dataEntrega||``).split(`-`).reverse().join(`/`)}`,tab:`pedidos`})});let t=Z(0),n=Z(1);F.filter(e=>e.status!==`pronto`&&(e.dataEntrega===t||e.dataEntrega===n)).forEach(n=>{e.push({grupo:n.dataEntrega===t?`Entrega hoje`:`Entrega amanhã`,icone:`fa-truck-fast`,cor:`text-blue-500 bg-blue-50`,texto:`<strong>${K(n.horaEntrega||`--:--`)} • ${K(n.cliente)}</strong> • ${(n.itens||[]).map(e=>`${e.qtd}x ${K(e.nome)}`).join(`, `)}`,tab:`pedidos`})}),F.forEach(t=>{let n=zc(t);n.saldoPendente>0&&e.push({grupo:`A receber no caixa`,icone:`fa-cash-register`,cor:`text-emerald-500 bg-emerald-50`,texto:`<strong>${K(t.cliente)}</strong> • falta ${G(n.saldoPendente)}`,tab:`caixa`,href:kd(t)})});let r=new Date().getMonth()+1;return R.forEach(t=>{let n=String(t.aniversario||``).match(/(\d{1,2})\s*\/\s*(\d{1,2})/);n&&Number(n[2])===r&&e.push({grupo:`Aniversários no mês`,icone:`fa-cake-candles`,cor:`text-pink-500 bg-pink-50`,texto:`<strong>${K(t.nome)}</strong> • dia ${n[1]}`,tab:`clientes`,href:Ad(t)})}),e}try{Do(21).slice(0,6).forEach(({entry:e,iso:t,diff:n})=>{let r=(e.antecedencia||0)>0&&n<=e.antecedencia;lista.push({grupo:`Datas próximas`,icone:e.icone||`fa-calendar-days`,cor:r?`text-orange-500 bg-orange-50`:`text-slate-500 bg-slate-100`,texto:`<strong>${K(e.nome)}</strong> ${Oo(n)} (${t.split(`-`).reverse().slice(0,2).join(`/`)})${r?` • hora de divulgar!`:``}`,tab:`cardapio`})})}catch{}function kd(e){let t=String(e.telefone||``).replace(/\D/g,``);if(!t)return null;let n=Dc(e);if(n.restante<=0)return null;let r=(e.dataEntrega||``).split(`-`).reverse().join(`/`),i=`Olá ${e.cliente}! Aqui é da nossa confeitaria 🧁 Faltam ${G(n.restante)} do seu pedido de ${r} (total ${G(n.total)}). Pode me mandar o comprovante por aqui? Obrigada! 🙏`;return`https://wa.me/55${t}?text=${encodeURIComponent(i)}`}function Ad(e){let t=String(e.telefone||``).replace(/\D/g,``);if(!t)return null;let n=`Parabéns ${e.nome}! 🎂 Aqui é da nossa confeitaria — passando para desejar um dia doce! Temos um mimo de aniversário te esperando 🎁`;return`https://wa.me/55${t}?text=${encodeURIComponent(n)}`}function jd(){let e=Od(),t=document.getElementById(`notifCount`);t&&(e.length>0?(t.classList.remove(`hidden`),t.classList.add(`flex`),t.textContent=e.length>99?`99+`:String(e.length)):(t.classList.add(`hidden`),t.classList.remove(`flex`)));let n=document.getElementById(`notifTotal`);n&&(n.textContent=e.length===0?`tudo em dia`:`${e.length} pendente(s)`);let r=document.getElementById(`notifList`);if(!r)return;if(e.length===0){r.innerHTML=`<p class="px-4 py-8 text-center text-xs text-slate-400">Nenhuma pendência. Bom trabalho! 🎉</p>`;return}let i={};e.forEach(e=>{i[e.grupo]||(i[e.grupo]=[]),i[e.grupo].push(e)}),r.innerHTML=Object.entries(i).map(([e,t])=>`
    <div class="px-4 py-2.5">
      <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">${e} (${t.length})</p>
      <div class="space-y-1.5">
        ${t.slice(0,8).map(e=>`
          ${e.href?`
          <a href="${e.href}" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-emerald-50/70 text-left transition-colors cursor-pointer">
            <span class="w-7 h-7 rounded-lg ${e.cor} flex items-center justify-center text-xs shrink-0"><i class="fa-solid ${e.icone}"></i></span>
            <span class="text-xs text-slate-600 leading-snug flex-1">${e.texto}</span>
            <i class="fa-brands fa-whatsapp text-emerald-500 text-sm mt-1 shrink-0"></i>
          </a>
          `:`
          <button onclick="irNotificacao('${e.tab}')" class="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-orange-50/70 text-left transition-colors cursor-pointer">
            <span class="w-7 h-7 rounded-lg ${e.cor} flex items-center justify-center text-xs shrink-0"><i class="fa-solid ${e.icone}"></i></span>
            <span class="text-xs text-slate-600 leading-snug">${e.texto}</span>
          </button>
          `}
        `).join(``)}
        ${t.length>8?`<p class="text-[11px] text-slate-400 pl-9">+${t.length-8} nesta categoria</p>`:``}
      </div>
    </div>
  `).join(``)}function Md(e){e&&e.stopPropagation();let t=document.getElementById(`notifPanel`);t&&t.classList.toggle(`hidden`)}function Nd(){let e=document.getElementById(`notifPanel`);e&&e.classList.add(`hidden`)}function Pd(e){Nd(),J(e)}function Fd(e,t,n=`application/json`){let r=new Blob([t],{type:n}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}function Id(e=`pedidos`){let t=[];e===`pedidos`?(t.push([`id`,`cliente`,`telefone`,`dataEntrega`,`horaEntrega`,`status`,`canal`,`valorTotal`,`valorSinal`].join(`;`)),F.forEach(e=>t.push([e.id,`"${(e.cliente||``).replace(/"/g,`'`)}"`,e.telefone||``,e.dataEntrega||``,e.horaEntrega||``,e.status||``,e.canal||``,e.valorTotal||0,e.valorSinal||0].join(`;`)))):e===`estoque`?(t.push([`id`,`nome`,`categoria`,`estoque`,`unidade`,`minimo`,`custoUnit`].join(`;`)),N.forEach(e=>t.push([e.id,`"${(e.nome||``).replace(/"/g,`'`)}"`,e.categoria||``,e.quantidade||0,e.unidade||``,e.estoqueMinimo||0,gc(e).toFixed(4)].join(`;`)))):(t.push([`id`,`data`,`tipo`,`categoria`,`descricao`,`valor`,`forma`].join(`;`)),I.forEach(e=>t.push([e.id,e.data||``,e.tipo||``,`"${(e.categoria||``).replace(/"/g,`'`)}"`,`"${(e.descricao||``).replace(/"/g,`'`)}"`,e.valor||0,e.forma||``].join(`;`)))),Fd(`confeitaria-${e}.csv`,`﻿`+t.join(`
`),`text/csv;charset=utf-8`),q(`CSV de ${e} exportado! Abre no Excel.`)}`serviceWorker`in navigator&&(location.protocol===`http:`||location.protocol===`https:`)&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).catch(()=>{})}),Object.assign(window,{initApp:ws,switchTab:J,renderDashboard:qc,renderEstoque:ol,renderStockTable:il,compararEstoqueComMinimo:Hs,itemPrecisaReposicao:Us,obterItensParaRepor:Ws,updateHeaderStockBadge:Gs,updateBadges:Ks,calcularFinanceiroPedido:Dc,lucroPorPedido:ss,seloMargemPedido:cs,sugerirReajustePreco:ls,aplicarReajustePreco:us,alternarAssistente:ps,mostrarBarraAssistente:fs,processarAssistente:hs,gerarRelatorioContador:gs,abrirFechamentoDia:_s,calcularCMVFicha:X,calcularPrecoFicha:vc,calcularDRE:xc,setDreMes:bc,calcularInsumosDoPedido:kc,calcularPrevisaoEstoqueMRP:Mc,abrirModalConfirmarBaixa:Fc,darBaixaEstoquePedido:Ic,estornarEstoquePedido:Lc,obterLancamentosDoPedido:Rc,calcularStatusCaixaPedido:zc,abrirModalLancarCaixa:Bc,confirmarLancarPedidoNoCaixa:Hc,definirValoresRapidosLancarCaixa:Vc,abrirModalLancarCompraMRPCaixa:Uc,confirmarLancarCompraMRPCaixa:Wc,abrirModal:Q,fecharModal:$,toggleNotifPanel:Md,fecharNotifPanel:Nd,irNotificacao:Pd,abrirModalMetas:Xc,salvarMetas:Zc,filtrarEstoqueCategoria:sl,filtrarEstoqueStatus:cl,filtrarEstoqueBusca:ll,limparBuscaEstoque:ul,limparFiltrosEstoque:dl,filtrarInsumosEstoque:rl,renderStockRows:al,normalizarTexto:nl,reporEstoqueRapido:fl,abrirModalAjusteQuantidade:pl,salvarAjusteQuantidade:ml,abrirModalInsumo:hl,atualizarPreviaModalInsumo:gl,salvarInsumo:_l,abrirModalConfirmarExclusaoInsumo:vl,referenciaNutricional:Ps,preencherNutriReferencia:Fs,calcularNutricaoFicha:vd,abrirEtiquetaNutricional:Sd,atualizarEtiquetaNutricional:Cd,salvarPadraoEtiqueta:wd,imprimirEtiquetaNutricional:Td,executarExclusaoInsumo:yl,getStatusEstoque:tl,abrirModalFicha:Sl,salvarFicha:Dl,excluirFicha:Ol,adicionarLinhaIngrediente:wl,removerLinhaIngrediente:Tl,atualizarTempIngrediente:El,handleDragStart:jl,handleDragEnd:Ml,handleDragOver:Nl,handleDragLeave:Pl,handleDrop:Fl,moverPedidoStatus:Wl,setAgendaAlcance:Ll,abrirModalPedido:Kl,salvarPedido:eu,excluirPedido:tu,atualizarTaxaPorCanal:ql,adicionarItemPedido:Yl,selecionarFichaItemPedido:Xl,atualizarItemPedidoCampo:Zl,removerItemPedido:Ql,copiarListaComprasWhatsApp:ru,abrirModalLancamento:su,salvarLancamento:cu,excluirLancamento:lu,exportarCSV:Id,renderPromocoes:Iu,atualizarSimuladorCampo:Lu,selecionarCanalSimulador:Ru,selecionarMecanicaSimulador:zu,resetarSimulador:Bu,carregarOportunidadeNoSimulador:Vu,salvarPromoDoSimulador:Hu,excluirPromocao:Uu,alternarStatusPromocao:Wu,copiarTextoDivulgacao:Gu,copiarSimulacaoWhatsApp:Ku,setPlanoEntrega:vs,renderClientes:ld,abrirModalCliente:ud,salvarCliente:dd,excluirCliente:fd,novoPedidoParaCliente:pd,imprimirEtiquetaPedido:Ed,imprimirFicha:Dd,abrirConfiguracoes:Ju,mostrarAtalhos:Yu,fazerLogin:As,trocarModoLogin:Os,fazerLogout:js,limparCacheLocal:$u,sincronizarLocalComBanco:Qu,exportarBackupLocal:Xu,importarBackupLocal:Zu,abrirPalette:td,filtrarPalette:rd,executarPalette:id,irPagina:hc,renderRota:uc,toggleSidebar:Zs,toggleGrupo:ic,mudarMesCardapio:mu,semanaCardapio:hu,definirQtdCardapio:_u,aplicarFiltroCardapio:yu,alternarSoEscalados:bu,escalarTodos:xu,preencherComOpcoes:Su,copiarDaSemanaAnterior:Cu,toggleMenuPreencher:wu,abrirModoApresentacao:Mu,fecharModoApresentacao:Nu,renderMarca:as,salvarMarca:Zo,lerMarcaDoFormulario:Xo,aoDigitarMarca:Qo,aoAlternarMarca:$o,atualizarPreviaMarca:os,processarLogoMarca:es,removerLogoMarca:ts,restaurarCoresTema:ns,assinaturaMarca:qo,setStatusSalvo:Js,duplicarSemanaCardapio:uu,tecladoGradeCardapio:du,abrirModalDuplicarSemana:pu,resumoCardapioSemana:Eu,limparSemanaCardapio:Tu,copiarCardapioWhats:Au,copiarComprasCardapio:ju,imprimirCardapio:Pu,simularPromoCardapio:Ou,openSidebar:Qs,closeSidebar:$s}),Object.defineProperties(window,{PAGINACAO:{get:()=>dc,configurable:!0},pedidos:{get:()=>F,set:e=>{F=e},configurable:!0},fichas:{get:()=>P,set:e=>{P=e},configurable:!0},insumos:{get:()=>N,set:e=>{N=e},configurable:!0},lancamentos:{get:()=>I,set:e=>{I=e},configurable:!0},clientes:{get:()=>R,set:e=>{R=e},configurable:!0},cardapios:{get:()=>B,set:e=>{B=Po(e)},configurable:!0},marca:{get:()=>V,set:e=>{V={...Go,...e}},configurable:!0},metas:{get:()=>L,set:e=>{L=e},configurable:!0}}),document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,uc):uc();