/**
  Design the theme ui component.
 */
// https://www.w3schools.com/css/css3_buttons.asp
// https://medium.com/@haxzie/dark-and-light-theme-switcher-using-css-variables-and-pure-javascript-zocada-dd0059d72fa2
// https://www.sitepoint.com/css-theming-custom-properties-javascript/
// https://blog.logrocket.com/a-guide-to-theming-in-css/
// https://danklammer.com/articles/simple-css-toggle-switch/
const { el,setStyle,setAttr, mount } = redom;

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
  --color-primary: #0060df;
  --color-secondary: #fbfbfe;
  --color-accent: #fd6f53;
  --font-color: #000000;
}
.theme-dark {
  --color-primary: #17ed90;
  --color-secondary: #243133;
  --color-accent: #12cdea;
  --font-color: #ffffff;
}

button {
  color: var(--font-color);
  background: var(--color-primary);
  #padding: 10px 20px;
  border: 0;
  #border-radius: 5px;
}

.toggle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 62px;
  height: 32px;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #707070;
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
  background-color: #4CD964;
}

.toggle:checked:before {
  left: 32px;
}



`});
mount(document.head, htmlstyle);


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
//===============================================
// Nav Bar Top
//===============================================
// https://redom.js.org/#update-elements

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


var DivNavBarTop =el("div",{
  style:{
    position:'fixed'
    ,top:0
    ,width:'100%'
  }}
  //,textContent:"NAVBARTOP"
  ,[
    btn_light
    ,btn_dark
  ]
  );
mount(document.body, DivNavBarTop);

var btn_test01=el("button","Test");

var switch_test01=el("input",{
  textContent:""
  ,type:'checkbox'
  ,id:'switch'
  ,class:'toggle'
  ,onclick:toggleTheme()
});

var intput_test01=el("input",{
  textContent:""
  //,type:'checkbox'
  //,id:'switch'
  //,class:'toggle'
  //,onclick:toggleTheme()
});

var DivContent =el("div",{
  style:{
    position:'fixed'
    ,top:'48px'
    ,width:'100%'
  }}
  ,
  [
    btn_test01
    ,switch_test01
    ,intput_test01
  ]
);


mount(document.body, DivContent);