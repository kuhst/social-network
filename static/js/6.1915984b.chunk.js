(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[6],{305:function(a,s,e){a.exports={dialogs:"Dialogs_dialogs__2xRSA",dialogItems:"Dialogs_dialogItems__3flRc",messages:"Dialogs_messages__1w_Up",message:"Dialogs_message__1xIDh",mi:"Dialogs_mi__QvIS0",dialog:"Dialogs_dialog__lk_cw",active:"Dialogs_active__2sQhs",avatar:"Dialogs_avatar__1hg1l",messageAdd:"Dialogs_messageAdd__1Zkw-"}},317:function(a,s,e){"use strict";e.r(s);var t=e(13),i=e(10),c=e(123),n=function(a){return a.dialogsPage.dialogsData},o=function(a){return a.dialogsPage.messages},d=(e(1),e(305)),g=e.n(d),l=e(11),r=e.n(l),m=e(25),j=e(0),u=function(a){var s="/dialogs/"+a.id;return Object(j.jsxs)("div",{className:g.a.dialog,children:[Object(j.jsx)("div",{className:g.a.avatar,children:Object(j.jsx)("img",{src:a.avatar,alt:"avatar"})}),Object(j.jsx)(m.b,{to:s,children:a.name})]})},b=function(a){return Object(j.jsx)("div",{className:g.a.message+" "+("mi"===a.from?g.a.mi:g.a.friend),children:a.message})},_=e(111),f=e(101),v=e(134),x=e(77),O=Object(v.a)({form:"DialogMessage"})((function(a){return Object(j.jsxs)("form",{onSubmit:a.handleSubmit,className:g.a.messageAdd,children:[Object(x.c)("","textMessage",[],x.b),Object(j.jsx)(f.a,{value:"Sent"})]})})),h=function(a){return Object(j.jsx)("div",{children:Object(j.jsx)(O,{onSubmit:function(s){a.addMessage(s.textMessage)}})})},D=Object(t.b)((function(a){return{dialogsData:a.dialogsPage}}),{addMessage:_.a})(h),p=function(a){var s=a.dialogsData.map((function(a){return Object(j.jsx)(u,{name:a.name,id:a.id,avatar:a.avatar},a.id)})),e=a.messages.map((function(a){return Object(j.jsx)(b,{message:a.message,from:a.from},a.id)}));return Object(j.jsxs)("div",{className:g.a.dialogs+" "+r.a.block,children:[Object(j.jsx)("div",{className:g.a.dialogItems,children:s}),Object(j.jsxs)("div",{className:g.a.messages,children:[e,Object(j.jsx)(D,{})]})]})};s.default=Object(i.d)(Object(t.b)((function(a){return{dialogsData:n(a),messages:o(a)}}),{}),c.a)(p)}}]);
//# sourceMappingURL=6.1915984b.chunk.js.map