(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{21:function(t,n,e){},41:function(t,n,e){"use strict";e.r(n);var c=e(2),o=e.n(c),r=e(14),i=e.n(r),s=e(16),u=(e(21),e(1)),a=function(t){var n=t.blog;return Object(u.jsxs)("div",{children:[n.title," ",n.author]})},b=e(15),d=e.n(b),j=function(){return console.log("Axios requesting blogs . . ."),d.a.get("/api/blogs").then((function(t){return t.data}))};var l=function(){var t=Object(c.useState)([]),n=Object(s.a)(t,2),e=n[0],o=n[1];return Object(c.useEffect)((function(){j().then((function(t){console.log(t),o(t)}))}),[]),Object(u.jsxs)("div",{id:"wrapper",children:[Object(u.jsx)("h1",{children:"Blogs"}),e.map((function(t){return Object(u.jsx)(a,{blog:t},t.id)}))]})};i.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(l,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.06b18706.chunk.js.map