(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[7],{339:function(e,t,s){e.exports={pages:"Users_pages__2ZPtK",usersPage:"Users_usersPage__3xdAn",block:"Users_block__1re8X",userPhoto:"Users_userPhoto__17MJB",container:"Users_container__6F9oG",user:"Users_user__1dQYj",userName:"Users_userName__1mt5V",status:"Users_status__E0SMG",button:"Users_button__1saaY"}},416:function(e,t,s){"use strict";s.r(t);var n=s(3),r=s(1),a=s.n(r),c=s(339),i=s.n(c),l=s(104),u=s(11),o=s.n(u),d=s.p+"static/media/user.03b91692.png",j=s(28),b=s(0),f=function(e){var t=e.user,s=e.follow,n=e.unfollow,r=e.followingInProgress;return Object(b.jsxs)("div",{className:o.a.block+" "+i.a.block,children:[Object(b.jsx)(j.b,{to:"/profile/"+t.id,children:Object(b.jsx)("div",{className:i.a.userPhoto,children:Object(b.jsx)("img",{src:t.photos.large?t.photos.large:d,alt:i.a.Avatar})})}),Object(b.jsxs)("div",{className:i.a.container,children:[Object(b.jsxs)("div",{className:i.a.user,children:[Object(b.jsx)("div",{className:i.a.userName,children:t.name}),t.status?Object(b.jsx)("div",{className:i.a.status,children:Object(b.jsx)("span",{children:t.status})}):Object(b.jsx)(b.Fragment,{})]}),Object(b.jsx)("div",{className:i.a.button,children:t.followed?Object(b.jsx)(l.a,{disabled:r.some((function(e){return e===t.id})),value:"unfollow",click:function(){n(t.id)}}):Object(b.jsx)(l.a,{disabled:r.some((function(e){return e===t.id})),value:"follow",click:function(){s(t.id)}})})]})]})},O=s(346),g=s(12),m=function(e){return e.usersPage.users},h=function(e){return e.usersPage.usersCount},p=function(e){return e.usersPage.usersCountOnPage},x=function(e){return e.usersPage.currentPage},v=function(e){return e.usersPage.isFetching},_=function(e){return e.usersPage.followingInProgress},P=function(e){return e.usersPage.filter},w=s(413),N=s(410),y=s(414),S=s(418),k=function(){return{}},U=a.a.memo((function(e){var t=e.onFilterChanged,s=e.isFetching,n=Object(g.d)(P);return Object(b.jsx)("div",{className:i.a.usersSearch,children:Object(b.jsx)(O.d,{enableReinitialize:!0,initialValues:{term:n.term,friend:String(n.friend)},validate:k,onSubmit:function(e,s){var n=s.setSubmitting;t({term:e.term,friend:"null"===e.friend?null:"true"===e.friend}),n(!1)},children:function(e){e.isSubmitting;return Object(b.jsx)(O.c,{className:o.a.block,style:{padding:20,paddingRight:30},children:Object(b.jsxs)(S.b,{children:[Object(b.jsxs)(S.b,{size:0,children:[Object(b.jsx)(w.a,{name:"term",type:"search",placeholder:"Search user",style:{width:320,borderRight:0}}),Object(b.jsx)(N.a,{style:{borderTopLeftRadius:0,borderBottomLeftRadius:0},disabled:s,children:"Search"})]}),Object(b.jsx)(S.b,{style:{paddingLeft:20},children:Object(b.jsxs)(y.a.Group,{name:"friend",defaultValue:"null",buttonStyle:"solid",size:"small",children:[Object(b.jsx)(y.a,{name:"friend",value:"null",children:"All"}),Object(b.jsx)(y.a,{name:"friend",value:"true",children:"Only followed"}),Object(b.jsx)(y.a,{name:"friend",value:"false",children:"Only unfollowed"})]})})]})})}})})})),F=s(141),z=s(13),C=s(412),R=s(411),A=a.a.memo((function(e){var t=Object(g.d)(m),a=Object(g.d)(h),c=Object(g.d)(p),l=Object(g.d)(x),u=Object(g.d)(_),o=Object(g.d)(P),d=Object(g.d)(v),j=Object(g.c)(),O=Object(z.g)(),w=s(383);Object(r.useEffect)((function(){var e=w.parse(O.location.search.substr(1)),t=l,s=o;e.page&&(t=+e.page),e.term&&(s=Object(n.a)(Object(n.a)({},s),{},{term:e.term})),e.friend&&(s=Object(n.a)(Object(n.a)({},s),{},{friend:"null"===e.friend?null:"true"===e.friend})),console.log(e),j(Object(F.c)(c,t,s))}),[]),Object(r.useEffect)((function(){var e={};o.term&&(e.term=o.term),null!==o.friend&&(e.friend=String(o.friend)),1!==l&&(e.page=String(l)),O.push({pathname:"/users",search:w.stringify(e)})}),[o,l]);var N=function(e){j(Object(F.b)(e))},y=function(e){j(Object(F.d)(e))},S=t.map((function(e){return Object(b.jsx)(f,{user:e,followingInProgress:u,unfollow:y,follow:N},e.id)}));return Object(b.jsxs)("div",{children:[Object(b.jsx)(U,{isFetching:d,onFilterChanged:function(e){j(Object(F.c)(c,1,e))}}),Object(b.jsx)("div",{className:i.a.pages,children:Object(b.jsx)(C.a,{current:l,total:a,onChange:function(e,t){j(Object(F.c)(t||c,e,o))},pageSize:c,pageSizeOptions:["12","24","48"],disabled:d,style:{marginTop:15,marginBottom:15}})}),d?Object(b.jsx)("div",{style:{textAlign:"center"},children:Object(b.jsx)(R.a,{})}):Object(b.jsx)("div",{className:i.a.usersPage,children:S})]})}));t.default=A}}]);
//# sourceMappingURL=7.d6957827.chunk.js.map