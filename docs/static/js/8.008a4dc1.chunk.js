(this.webpackJsonpsite=this.webpackJsonpsite||[]).push([[8],{279:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var a=n(61),r=n(60),i=n(0);function c(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(r.a,{children:"This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."}),Object(i.jsx)(r.a,{header:"Card header",footer:"Card Footer",children:"This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."})]})}function o(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(r.a,{outline:!0,children:"This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."}),Object(i.jsx)(r.a,{header:"Card header",footer:"Card Footer",children:"This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."})]})}function s(){var e={background:"transparent",boxShadow:"none"};return Object(i.jsxs)("div",{style:{padding:0},children:[Object(i.jsx)("div",{className:"block-title",children:"UICard"}),Object(i.jsx)("div",{className:"block-title",children:"Instalation"}),Object(i.jsx)("div",{className:"block-title",children:"Usage"}),Object(i.jsx)(a.a,{style:e,title:"Simple",code:'import UICard from "lib/src/components/UICard"\n\nexport default function Standard() {\n    return (\n        <>\n            <UICard>\n                This is a simple card with plain text,\n                but cards can also contain their own header,\n                footer, list view, image, or any other element.\n            </UICard>\n            <UICard header="Card header" footer="Card Footer">\n                This is a simple card with plain text,\n                but cards can also contain their own header,\n                footer, list view, image, or any other element.\n            </UICard>\n        </>\n    )\n}',Component:c}),Object(i.jsx)(a.a,{style:e,title:"Outline",code:'import UICard from "lib/src/components/UICard"\n\nexport default function Outline() {\n    return (\n        <>\n            <UICard outline>\n                This is a simple card with plain text,\n                but cards can also contain their own header,\n                footer, list view, image, or any other element.\n            </UICard>\n            <UICard header="Card header" footer="Card Footer">\n                This is a simple card with plain text,\n                but cards can also contain their own header,\n                footer, list view, image, or any other element.\n            </UICard>\n        </>\n    )\n}',Component:o}),Object(i.jsx)("div",{className:"block-title",children:"UICard API"})]})}},60:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(4),r=n(15),i=(n(62),n(0));function c(e){var t=e.children,n=e.header,c=void 0===n?null:n,o=e.footer,s=void 0===o?null:o,d=e.outline,l=void 0!==d&&d,h=e.className,u=void 0===h?"":h,j=Object(r.a)(e,["children","header","footer","outline","className"]),b="card".concat(l?" card-outline":""," ").concat(u);return Object(i.jsxs)("div",Object(a.a)(Object(a.a)({className:b},j),{},{children:[c&&Object(i.jsx)("div",{className:"card-header",children:c}),Object(i.jsx)("div",{className:"card-content card-content-padding",children:t}),s&&Object(i.jsx)("div",{className:"card-footer",children:s})]}))}},61:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n(9),r=n(1),i=n(65),c=n.n(i),o=n(64),s=n.n(o),d=n(60),l=n(17),h=(n(66),n(63),n(0));function u(e){var t=e.title,n=e.code,i=(e.codes,e.Component),c=e.style,o=Object(r.useState)(!1),s=Object(a.a)(o,2),u=s[0],b=s[1];return Object(h.jsx)(d.a,{style:c,header:Object(h.jsxs)(h.Fragment,{children:[t,Object(h.jsx)(l.a,{icon:"code-tags",onClick:function(){b(!u)}})]}),children:u?Object(h.jsx)(j,{code:n}):Object(h.jsx)(i,{})})}function j(e){var t=e.code,n=Object(r.useState)(""),i=Object(a.a)(n,2),o=i[0],s=i[1];return Object(r.useLayoutEffect)((function(){var e=c.a.highlight("js",t).value;s(e)}),[]),Object(h.jsx)("pre",{dangerouslySetInnerHTML:{__html:o}})}c.a.registerLanguage("javascript",s.a)},62:function(e,t,n){},63:function(e,t,n){}}]);
//# sourceMappingURL=8.008a4dc1.chunk.js.map