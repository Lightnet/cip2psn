/**
  Design the theme ui component.
 */
// https://www.w3schools.com/css/css3_buttons.asp
// https://medium.com/@haxzie/dark-and-light-theme-switcher-using-css-variables-and-pure-javascript-zocada-dd0059d72fa2
// https://www.sitepoint.com/css-theming-custom-properties-javascript/
// https://blog.logrocket.com/a-guide-to-theming-in-css/
// https://danklammer.com/articles/simple-css-toggle-switch/

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_alerts
// 
// 
// 
// 
// 
// 

const { el,setStyle,setAttr, mount,unmount,text,html } = redom;
console.log(redom);

var htmlstyle=el("style",{textContent:`
/*
background-color: #333;
overflow: hidden;
*/

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.theme-light {
  --color-dark:#808080;
  --color-primary: #999999;
  --color-secondary: #d9d9d9;
  --color-accent: #f2f2f2;
  --font-color: #000000;

  --color-alert:#f44336;
  --color-success:#4CAF50;
  --color-info:#2196F3;
  --color-warning:#ff9800;
}
.theme-dark {
  --color-dark: #000000;
  --color-primary: #595959;
  --color-secondary: #999999;
  --color-accent: #cccccc;
  --font-color: #ffffff;

  --color-alert:#800000;
  --color-success:#008000;
  --color-info:#33334d;
  --color-warning:#804d00;
}

button {
  color: var(--font-color);
  background: var(--color-dark);
  #padding: 10px 20px;
  padding: 8px 8px;
  border: 0;
  #border-radius: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  /*border: 2px solid #4CAF50;*/ /* Green */
}

button.primary{background-color: var(--color-primary);}
button.secondary{background-color: var(--color-secondary);}
button.accent{background-color: var(--color-accent);}

button.alert{background-color: var(--color-alert);}
button.success{background-color: var(--color-success);}
button.info{background-color: var(--color-info);}
button.warning{background-color: var(--color-warning);}

/* alert */
.alert {
  padding: 8px;
  background-color: var(--color-alert);
  color: white;
  opacity: 1;
  transition: opacity 0.6s;
  /*display:block;*/
  display: inline-block;
  float:right;
}

.alert.success {background-color: var(--color-success);}
.alert.info {background-color: var(--color-info);}
.alert.warning {background-color: var(--color-warning);}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
  /*z-index:-10;*/
}

.closebtn:hover {
  color: black;
}

/* toggle swtich */

.toggle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 62px;
  height: 32px;
  display: inline-block;
  position: relative;
  bottom:-14px;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: var(--color-dark);
  transition: background-color ease 0.3s;
}

.toggle:before {
  content: "on off";
  display: block;
  position: absolute;
  z-index: 2;
  width: 28px;
  height: 28px;
  background: #fff;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  font: 10px/28px Helvetica;
  text-transform: uppercase;
  font-weight: bold;
  text-indent: -22px;
  word-spacing: 37px;
  color: #fff;
  text-shadow: -1px -1px rgba(0,0,0,0.15);
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.toggle:checked {
  background-color: var(--color-success);
}

.toggle:checked:before {
  left: 32px;
}

/* DRAG */

#mydiv {
  position: absolute;
  z-index: 9;
  background-color: #f1f1f1;
  text-align: center;
  border: 1px solid #d3d3d3;
}

#mydivheader {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
}

`});
mount(document.head, htmlstyle);
// Make the DIV element draggable:
//dragElement(document.getElementById("mydiv"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//===============================================
// Theme
//===============================================
// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}
// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
  } else {
    setTheme('theme-light');
  }
})();
//setTheme('theme-light');
//===============================================
// Nav Bar Top
//===============================================
// https://redom.js.org/#update-elements
// THEME BUTTON
var btn_light=el("button","Light");
var btn_dark=el("button","Dark");
btn_light.addEventListener('click',function(){
  console.log('Light theme...');
  setTheme('theme-light');
});
btn_dark.addEventListener('click',function(){
  console.log('Dark theme...');
  setTheme('theme-dark');
});
//INPUT
var switch_test01=el("input",{
  textContent:""
  ,type:'checkbox'
  ,id:'switch'
  ,class:'toggle'
  //,onclick:toggleTheme()
});
var intput_test01=el("input",{
  textContent:"test text"
});

// https://www.w3schools.com/howto/howto_js_draggable.asp
// PANEL DRAG
/*
var mydiv=el('div',{id:'mydiv',style:{
  position:'fixed'
    ,top:'48px'
    //,width:'100%'
}},[
  el('div',{id:'mydivheader'},{textContent:'Click to move'}),
  el('p','move'),
  el('p','this'),
  el('p','DIV')
]);
mount(document.body, mydiv);
//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));
*/

//ALERT NOTIFY
//let btnAlertEl=el('button',{textContent:'Alert',onclick:btnAlertWarn});
//mount(document.body, btnAlertEl);
// notifyEl
var notifyEl=el('div',{id:'notify',style:{
  position:'fixed'
  //,width:'512px'
  //, width:'none'
  //, display:'inline-block'
  , display: 'flex'
  , 'flex-direction':'column'
  //,'vertical-align':'bottom'
  ,top:'4px'
  ,right: '4px'
  //,'z-index': '999999999 !important'
}})

mount(document.body, notifyEl);
// https://stackoverflow.com/questions/16834320/using-times-word-in-html-changes-to-%C3%97
// &times;
// https://www.toptal.com/designers/htmlarrows/math/multiplication-sign/
// https://www.w3schools.com/charsets/ref_html_entities_4.asp
// https://stackoverflow.com/questions/44811451/css-alerts-not-on-top

//TEST ALERT
function btnAlert(){
  AlertNotify({
    msg:'Hello world!'
  });
}
function btnAlertWarn(){
  AlertNotify({
    type:'warn'
    , msg:'Hello world! asda sda asd asd ad sd fsd fs fsd fsdf sdf sdf sdf sdf sdf da sda asd asd ad sd fsd fs fsd fsdf sdf sdda sda asd asd ad sd fsd fs fsd fsdf sdf sdda sda asd asd ad sd fsd fs fsd fsdf sdf sd'
  });
}
function btnAlertSuccess(){
  AlertNotify({
    type:'success'
    , msg:'Hello world!'
  });
}
function btnAlertInfo(){
  AlertNotify({
    type:'info'
    , msg:'Hello world!'
  });
}
// NOTIFY ALERT
function AlertNotify(arg){
  let classname = '';
  let msgicon='Danger!';
  let msg=arg.msg || "None";
  let isAutoClose=arg.isAutoClose || true;
  if(!arg){
    arg={};
    classname='alert';
    msgicon='Danger!';
    msg='alert';
  }
  if(!arg.type){
    classname='alert';
    msgicon="Error!"
  }
  if(arg.type=='info'){
    classname='alert info';
    msgicon="Info!"
  }
  if(arg.type=='success'){
    classname='alert success';
    msgicon="Success!"
  }
  if((arg.type=='warn') ||(arg.type=='warning')){
    classname='alert warning';
    msgicon="Warn!"
  }

  //let time=  $('<span>&times;</span>');
  //time.html("&times;");
  //let btnCloseEl = el('span',{class:'closebtn',onclick:btnCloseAlert});
  //btnCloseEl.innerHTML ='&times;';

  let divAlert = el('div',{class:classname},[
    //el('span',{class:'closebtn',onclick:btnCloseAlert,textContent:""},time),
    el('span',{class:'closebtn',onclick:btnCloseAlert,innerHTML:"&times;"})
    //, el('div',{style:{
      //width:'200px'
      //position:'relative'
      //, bottom:'-4px'
    //}},[
      , el('strong',{textContent:msgicon})
      , el('span',{innerHTML:"&nbsp;"})
      , text(msg)
    //]),
    //el('span',{class:'closebtn',onclick:btnCloseAlert,innerHTML:"&times;"})
  ]);

  var divSpace=el('div',divAlert)
  //mount(notifyEl, divAlert);
  mount(notifyEl, divSpace);
  if(isAutoClose){
    setTimeout(()=>{
      divAlert.style.opacity = "0";
      setTimeout(()=>{
      //unmount(notifyEl, divAlert);
      unmount(notifyEl, divSpace);
      },2000);
    },3000);
  }
}

function btnCloseAlert(){
  var div = this.parentElement.parentElement;
  //var div = this.parentElement;
  var divalert = this.parentElement;
  divalert.style.opacity = "0";
  //this.parentElement.style.display='none';
  setTimeout(function(){
     div.style.display = "none"; 
     //unmount(document.body, div);
     unmount(notifyEl, div);
  }, 600);
}

//MODEL
var divModel=el('div',{id:'divModel',style:{
  position:'absolute'
  , left:'50%'
  , top:'50%'
  , width:'200px'
}},[
  el('div',{id:'divheader',
  style:{'border-style':'solid','border-width': '1px'}}
  ,{textContent:'[MODEL]'}),
  el('div',{style:{'border-style':'solid','border-width': '1px'}},[
    text('Hello World!')
    , el('br')
    , el('button',{class:'primary',textContent:'Okay',
      style:{
        //'text-align': 'center'
        'display': 'block'
        , 'margin-left': 'auto'
        , 'margin-right': 'auto'
        //, 'left':'50%'
      }
    })
  ]),
])
mount(document.body, divModel);




// TEST CONTENT
var DivNavBarTop=el("div",{
  style:{
    position:'fixed'
    ,top:'64px'
    ,left:'64px'
    //,width:'100%'
  }}
  //,textContent:"NAVBARTOP"
  ,[
    btn_light
    ,btn_dark
    ,el('br')
    ,el('button',{class:'',textContent:'normal'})
    ,switch_test01
    ,intput_test01
    ,el('button',{class:'',textContent:'normal'})
    ,el('br')
    ,el('button',{class:'alert',textContent:'Alert Normal',onclick:btnAlert})
    ,el('button',{class:'warning',textContent:'Alert Warn',onclick:btnAlertWarn})
    ,el('button',{class:'success',textContent:'Alert Success',onclick:btnAlertSuccess})
    ,el('button',{class:'info',textContent:'Alert Info',onclick:btnAlertInfo})

    ,el('br')
    ,el('button',{class:'',textContent:'normal'})
    ,el('button',{class:'primary',textContent:'primary'})
    ,el('button',{class:'secondary',textContent:'secondary'})
    ,el('button',{class:'accent',textContent:'accent'})
  ]
  );
mount(document.body, DivNavBarTop);