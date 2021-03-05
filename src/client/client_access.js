/**
  Design the login, forgot, singup access ui component.

 */


const { el, mount } = redom;

function isMobile(){
  // credit to Timothy Huang for this regex test:
  // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    //document.write("mobile device");
    return true;
  }else{
    // false for not mobile device
    //document.write("not mobile device");
    return false;
  }
}
console.log("isMobile:",isMobile);



//===============================================
// LOGIN PANEL
//===============================================
// TITLE
var tr_title_login=el("tr",[
  el("td", {colspan:"2"}, el("Label",{textContent:"[Login Access]"}))
]);
// ALIAS
var tr_alias=el("tr",[
  el("td", el("label","Alias:")),
  el("td", el("input",{name:"alias",id:"alias"}))
]);
// PASSPHRASE
var tr_passphrase=el("tr",[
  el("td", el("label","Passphrase:")),
  el("td", el("input",{name:"passphrase",id:"passphrase"}))
]);
// HIDDEN ishuman
var tr_ishuman=el("tr",[
  el("td", el("label",{textContent:"Is Human?:"
    ,hidden:true
  })),
  el("td", el("input",{
    name:"ishuman"
    ,type:'checkbox'
    ,value:"false"
    ,hidden:true
  }))
]);
// SUBMIT
var tr_button_login=el("tr",[
  el("td", el("label","Actions:")),
  el("td", el("input",{type:"submit"})),
]);
// FORM
var form_login=el('form'
  ,{
    action:'/login',
    method:'post'
  }
  ,el("table",[
    tr_title_login
    ,tr_alias
    ,tr_passphrase
    ,tr_ishuman
    ,tr_button_login
  ])
);
var div_login_panel=el("div",form_login);
mount(document.body, div_login_panel);
//===============================================
// STYLE
//===============================================
var htmlstyle=el("style",{textContent:`
/*
background-color: #333;
overflow: hidden;
*/
`});
mount(document.head, htmlstyle);

//===============================================
// CONTENT
//===============================================
var div_content=el("div",{textContent:"Content"});
mount(document.body, div_content);

//===============================================
// Nav Bar Top
//===============================================
var DivNavBarTop =el("div",{
  textContent:"NAVBARTOP"
  ,style:{
    position:'fixed'
    ,top:0
    ,width:'100%'
  }
});
mount(document.body, DivNavBarTop);




//var access_panel =el("div");
//const hello = el("h1", "Hello world!");
//mount(document.body, hello);