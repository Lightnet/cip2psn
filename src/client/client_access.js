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

console.log("isMobile:",isMobile());
//===============================================

let username='test';
let password='test';
var urlDatabase='http://127.0.0.1:5984/pouchdb';
//urlDatabase='http://localhost:5984/pouchdb';
console.log(urlDatabase);

var db = new PouchDB(urlDatabase, {
  skip_setup: true,
  //auth: { username, password },
  fetch: (url, opts) => {
    //console.log('DATABASE FETCH!');
    //opts.credentials = 'include';//error
    //opts.origins = 'http://127.0.0.1:3000'//not tested
    //opts.credentials = 'omit';//ok
    return PouchDB.fetch(url, opts);
  },
});

function getDbInfo(){
  db.info().then(function (info) {
    console.log(info);
    //setResult(info);
  });
}

//===============================================
// LOGIN PANEL
//===============================================

// FORM LOGIN
var formLogin=el('form'
  ,{
    action:'/login',
    method:'post'
    ,style:{
      position:'fixed'
      ,top:'32px'
      //,left:'calc(50vh - 10px);'
      ,left:'calc(50% - 100px)'
      ,width:'100%'
    }
  }
  ,el("table",[
    el("tr",[
      el("td", {colspan:"2"}, el("Label",{textContent:"[Login Access]"}))
    ])
    ,el("tr",[
      el("td", el("label","Alias:")),
      el("td", el("input",{name:"alias",id:"alias",value:'testalias'}))
    ])
    ,el("tr",[
      el("td", el("label","Passphrase:")),
      el("td", el("input",{name:"passphrase",id:"passphrase",value:'testpass'}))
    ])
    ,el("tr",[
      el("td", el("label",{textContent:"Is Human?:"
        ,hidden:true
      })),
      el("td", el("input",{
        name:"ishuman"
        ,type:'checkbox'
        ,value:"false"
        ,hidden:true
      }))
    ])
    ,el("tr",[
      el("td", el("label","Actions:")),
      el("td", el("input",{type:"submit"})),
    ])
  ])
);
var divLoginPanel=el("div",formLogin);
mount(document.body, divLoginPanel);
divLoginPanel.style.display = 'none';
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
var div_content=el("div",{textContent:"Content",
  style:{
  position:'fixed'
  ,top:'32px'
  ,width:'100%'
  }
});
mount(document.body, div_content);

//===============================================
// Nav Bar Top
//===============================================
var DivNavBarTop =el("div",{
  textContent:""
  ,style:{
    position:'fixed'
    ,top:0
    ,width:'100%'
    ,height:'32px'
  }
},[
  el('button',{onclick:btnToggle,textContent:'Menu',style:{
    float:'left'
  }}),
  el('span',{id:'navMenu',
      style:{
        float:'left'
      }
    
    },[
    el('a',{href:'#',onclick:btnToggleLogin,textContent:'Login'}),
    el('span','-|-'),
    el('a',{href:'/signup',textContent:'Sign Up'}),
    el('span','-|-'),
    el('a',{href:'/forgot',textContent:'Forgot'}),
    el('span','-|-'),
    el('a',{href:'/about',textContent:'About'}),
    el('span','-|-'),
    el('a',{href:'/settings',textContent:'Settings'}),
    el('span','-|-'),
    el('a',{href:'/admin',textContent:'Admin'}),
    el('span',''),
    el('button',{onclick:getDbInfo,textContent:'pouchdb'}),
  ])
]);
mount(document.body, DivNavBarTop);
function btnToggle(){
  let menuDisplay = document.getElementById('navMenu').style.display;
  if(menuDisplay === 'none'){
    document.getElementById('navMenu').style.display = 'block';
  }else{
    document.getElementById('navMenu').style.display = 'none';
  }
}

function btnToggleLogin(){
  let menuDisplay = divLoginPanel.style.display;
  if(menuDisplay === 'none'){
    divLoginPanel.style.display = 'block';
  }else{
    divLoginPanel.style.display = 'none';
  }
}

//var access_panel =el("div");
//const hello = el("h1", "Hello world!");
//mount(document.body, hello);