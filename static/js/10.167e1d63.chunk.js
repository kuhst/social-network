(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[10],{561:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(31),a=n.n(s),i=n(261),r=n(522),l=n(559),o=n(34),j=n(525),b=n(555),d=n(556),u=n(554),x=n(530),h=n(26),O=n(248),p=function(e){return e.chat.status},g=n(127),f=n(2),m=function(){var e=Object(h.d)((function(e){return e.chat.messages}));return Object(f.jsx)("div",{id:"scrollableDiv",style:{height:300,overflow:"auto",display:"flex",flexDirection:"column-reverse"},children:Object(f.jsx)(x.a,{dataLength:e.length,next:function(){},hasMore:!1,loader:Object(f.jsx)("h4",{children:"Loading..."}),scrollableTarget:"scrollableDiv",children:Object(f.jsx)(r.b,{itemLayout:"horizontal",style:{margin:"0 20px"},dataSource:e,renderItem:function(e){return Object(f.jsx)(r.b.Item,{children:Object(f.jsx)(r.b.Item.Meta,{avatar:Object(f.jsx)(l.a,{src:e.photo,icon:Object(f.jsx)(g.a,{})}),title:Object(f.jsx)(o.b,{to:"/profile/"+e.userId,children:e.userName}),description:e.message})})}})})})},v=function(e){var t=e.status,n=Object(h.c)();return Object(f.jsx)("div",{style:{padding:20,paddingTop:5},children:Object(f.jsx)(j.d,{initialValues:{textMessage:""},onSubmit:function(e){n(Object(O.b)(e.textMessage))},children:Object(f.jsxs)(b.a,{children:[Object(f.jsx)(d.a.TextArea,{name:"textMessage",showCount:!0,maxLength:100,allowClear:!0,autoSize:{minRows:2,maxRows:6}}),Object(f.jsx)(u.a,{loading:!1,disabled:"pending"===t,style:{marginTop:10},children:"Send"})]})})})};t.default=function(){var e=Object(h.d)(p),t=Object(h.c)();return Object(c.useEffect)((function(){return t(Object(O.c)()),function(){t(Object(O.d)())}}),[]),Object(f.jsx)(i.a,{spinning:"pending"===e,size:"large",children:Object(f.jsxs)("div",{className:a.a.block,children:[Object(f.jsx)(m,{}),Object(f.jsx)(v,{status:e})]})})}}}]);
//# sourceMappingURL=10.167e1d63.chunk.js.map