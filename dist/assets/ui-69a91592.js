import{r as p,a as h,m as O,h as j,i as U,R as m,k as w,l as D,n as z,s as _,j as I}from"./index-fc1ab4af.js";import{g as X,a as K,k as E,s as V,_ as g,b as q,c as T,u as H,d as W,e as Y,f as G,P as J}from"./PostPreview-8c207748.js";import{A as Q,m as Z}from"./index-71e76787.js";function ee(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function re(e){return parseFloat(e)}function te(e){return X("MuiSkeleton",e)}K("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const ne=["animation","className","component","height","style","variant","width"];let b=e=>e,R,S,C,k;const ae=e=>{const{classes:r,variant:t,animation:a,hasChildren:n,width:s,height:o}=e;return G({root:["root",t,a,n&&"withChildren",n&&!s&&"fitContent",n&&!o&&"heightAuto"]},te,r)},oe=E(R||(R=b`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),ie=E(S||(S=b`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),se=V("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[t.variant],t.animation!==!1&&r[t.animation],t.hasChildren&&r.withChildren,t.hasChildren&&!t.width&&r.fitContent,t.hasChildren&&!t.height&&r.heightAuto]}})(({theme:e,ownerState:r})=>{const t=ee(e.shape.borderRadius)||"px",a=re(e.shape.borderRadius);return g({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:q(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},r.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${t}/${Math.round(a/.6*10)/10}${t}`,"&:empty:before":{content:'"\\00a0"'}},r.variant==="circular"&&{borderRadius:"50%"},r.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},r.hasChildren&&{"& > *":{visibility:"hidden"}},r.hasChildren&&!r.width&&{maxWidth:"fit-content"},r.hasChildren&&!r.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&T(C||(C=b`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),oe),({ownerState:e,theme:r})=>e.animation==="wave"&&T(k||(k=b`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),ie,(r.vars||r).palette.action.hover)),le=p.forwardRef(function(r,t){const a=H({props:r,name:"MuiSkeleton"}),{animation:n="pulse",className:s,component:o="span",height:i,style:l,variant:u="text",width:c}=a,f=W(a,ne),d=g({},a,{animation:n,component:o,variant:u,hasChildren:!!f.children}),v=ae(d);return h(se,g({as:o,ref:t,className:Y(v.root,s),ownerState:d},f,{style:g({width:c,height:i},l)}))}),ce=le;if(!p.useState)throw new Error("mobx-react-lite requires React with Hooks support");if(!O)throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");function ue(e){e()}function fe(e){e||(e=ue),j({reactionScheduler:e})}function de(e){return U(e)}var x=typeof FinalizationRegistry>"u"?void 0:FinalizationRegistry;function N(e){var r={reaction:e,mounted:!1,changedBeforeMount:!1,cleanAt:Date.now()+pe};return r}var pe=1e4,he=1e4;function ve(e){var r=new Map,t=1,a=new e(function(s){var o=r.get(s);o&&(o.reaction.dispose(),r.delete(s))});return{addReactionToTrack:function(n,s,o){var i=t++;return a.register(o,i,n),n.current=N(s),n.current.finalizationRegistryCleanupToken=i,r.set(i,n.current),n.current},recordReactionAsCommitted:function(n){a.unregister(n),n.current&&n.current.finalizationRegistryCleanupToken&&r.delete(n.current.finalizationRegistryCleanupToken)},forceCleanupTimerToRunNowForTests:function(){},resetCleanupScheduleForTests:function(){}}}var me=globalThis&&globalThis.__values||function(e){var r=typeof Symbol=="function"&&Symbol.iterator,t=r&&e[r],a=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&a>=e.length&&(e=void 0),{value:e&&e[a++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")};function ye(){var e=new Set,r;function t(){r&&(clearTimeout(r),i())}function a(){var l,u;if(e.size>0){try{for(var c=me(e),f=c.next();!f.done;f=c.next()){var d=f.value,v=d.current;v&&(v.reaction.dispose(),d.current=null)}}catch(L){l={error:L}}finally{try{f&&!f.done&&(u=c.return)&&u.call(c)}finally{if(l)throw l.error}}e.clear()}r&&(clearTimeout(r),r=void 0)}function n(){r===void 0&&(r=setTimeout(i,he))}function s(l){e.add(l),n()}function o(l){e.delete(l)}function i(){r=void 0;var l=Date.now();e.forEach(function(u){var c=u.current;c&&l>=c.cleanAt&&(c.reaction.dispose(),u.current=null,e.delete(u))}),e.size>0&&n()}return{addReactionToTrack:function(l,u,c){return l.current=N(u),s(l),l.current},recordReactionAsCommitted:o,forceCleanupTimerToRunNowForTests:t,resetCleanupScheduleForTests:a}}var M=x?ve(x):ye(),ge=M.addReactionToTrack,be=M.recordReactionAsCommitted,F=globalThis&&globalThis.__read||function(e,r){var t=typeof Symbol=="function"&&e[Symbol.iterator];if(!t)return e;var a=t.call(e),n,s=[],o;try{for(;(r===void 0||r-- >0)&&!(n=a.next()).done;)s.push(n.value)}catch(i){o={error:i}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return s};function A(e){return"observer".concat(e)}var we=function(){function e(){}return e}();function _e(){return new we}function Te(e,r){r===void 0&&(r="observed");var t=F(m.useState(_e),1),a=t[0],n=F(m.useState(),2),s=n[1],o=function(){return s([])},i=m.useRef(null);if(!i.current)var l=new w(A(r),function(){u.mounted?o():u.changedBeforeMount=!0}),u=ge(i,l,a);var c=i.current.reaction;m.useDebugValue(c,de),m.useEffect(function(){return be(i),i.current?(i.current.mounted=!0,i.current.changedBeforeMount&&(i.current.changedBeforeMount=!1,o())):(i.current={reaction:new w(A(r),function(){o()}),mounted:!0,changedBeforeMount:!1,cleanAt:1/0},o()),function(){i.current.reaction.dispose(),i.current=null}},[]);var f,d;if(c.track(function(){try{f=e()}catch(v){d=v}}),d)throw d;return f}var P=typeof Symbol=="function"&&Symbol.for,B=P?Symbol.for("react.forward_ref"):typeof p.forwardRef=="function"&&p.forwardRef(function(e){return null}).$$typeof,$=P?Symbol.for("react.memo"):typeof p.memo=="function"&&p.memo(function(e){return null}).$$typeof;function Re(e,r){var t;if($&&e.$$typeof===$)throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");var a=(t=r==null?void 0:r.forwardRef)!==null&&t!==void 0?t:!1,n=e,s=e.displayName||e.name;if(B&&e.$$typeof===B&&(a=!0,n=e.render,typeof n!="function"))throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");var o=function(i,l){return Te(function(){return n(i,l)},s)};return s!==""&&(o.displayName=s),e.contextTypes&&(o.contextTypes=e.contextTypes),a&&(o=p.forwardRef(o)),o=p.memo(o),Ce(e,o),o}var Se={$$typeof:!0,render:!0,compare:!0,type:!0,displayName:!0};function Ce(e,r){Object.keys(e).forEach(function(t){Se[t]||Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))})}globalThis&&globalThis.__read;fe(D.unstable_batchedUpdates);const ke="_wrapper_1w95i_1",xe="_wrapper__blog_1w95i_5",Fe="_blog__post_1w95i_14",Ae="_blog__loadingSpinner_1w95i_21",Be="_wrapper__loadmore_1w95i_45",y={wrapper:ke,wrapper__blog:xe,blog__post:Fe,blog__loadingSpinner:Ae,wrapper__loadmore:Be},$e=Re(()=>{const e=z(),{isFetching:r}=_.postStore.postsFetchingState;return h("div",{className:y.wrapper,children:I("div",{className:y.wrapper__blog,children:[r&&Array(8).fill(1).map((t,a)=>h(ce,{className:y.blog__post,height:"25vw",width:"23vw"},a)),h(Q,{mode:"sync",children:!r&&_.postStore.getPostsIdsToDisplay.map((t,a)=>h(Z.div,{layout:!0,initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},exit:{scale:0,opacity:0},onClick:()=>{t&&e("/post/"+t)},className:y.blog__post,children:h(J,{postId:t})},t+a))})]})})}),Pe=()=>h($e,{});export{Pe as P,Re as o};
