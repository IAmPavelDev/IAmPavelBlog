import{f as l}from"./index-fc1ab4af.js";async function t(m){if(await l()){const e=new Headers;e.append("Content-Type","application/json"),e.append("Access-Control-Allow-Origin","*"),e.append("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE");const a={method:"GET",headers:e,redirect:"follow",credentials:"include"};return await fetch(`http://localhost:3000/tags?q=${m}`,a).then(o=>o.json()).catch(o=>console.log("error",o))}else throw new Error("user unauthorized")}export{t as f};
