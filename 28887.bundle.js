"use strict";(self.webpackChunkcrossmint_embedded_checkout=self.webpackChunkcrossmint_embedded_checkout||[]).push([[28887],{28887:(e,t,r)=>{r.d(t,{resolveArweaveScheme:()=>a});const s="https://arweave.net/{fileId}";function a(e){if(e.uri.startsWith("ar://")){const t=e.uri.replace("ar://","");if(e.gatewayUrl){const r=e.gatewayUrl.endsWith("/")?"":"/";return`${e.gatewayUrl}${r}${t}`}return s.replace("{fileId}",t)}if(e.uri.startsWith("http"))return e.uri;throw new Error('Invalid URI scheme, expected "ar://" or "http(s)://"')}}}]);