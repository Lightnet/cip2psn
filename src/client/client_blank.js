/**
  Blank template
 */
const { el, mount } = redom;


var divBlank=el('form',{
  //action:'/blank',
  //method:'post'
  },
  el("table",[
    el("tr",[
      el("td", el("label",{textContent:"Action:"})),
      el("td", el("input",{name:'content',value:"test content"})),
      el("td", el("input",{onclick:clickBlank,type:"submit"})),
    ])
  ])
);

var navMenuHome=el('a',{href:'/',textContent:'Home'});
var navMenuLogout=el('a',{href:'/',textContent:'Home'});

var divPanel=el("div",[
  navMenuHome,
  navMenuLogout,
  divBlank
]);
mount(document.body, divPanel);
function clickBlank(){
  console.log('blank');
}