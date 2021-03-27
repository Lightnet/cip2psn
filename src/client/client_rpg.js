/**
  Blank template
 */
const { el, mount } = redom;

var divRPG=el('div',{
  //action:'/blank',
  //method:'post'
  },
  el("table",[
    el("tr",[
      el("td", el("label",{textContent:"Character Name:"})),
      el("td", el("input",{name:'charactername',value:"Name Test"})),
      el("td", el("input",{onclick:btnCreateCharacter,type:"submit"})),
    ])
  ])
);

var navMenuHome=el('a',{href:'/',textContent:'Home'});
var navMenuLogout=el('a',{href:'/logout',textContent:'Logout'});

var divPanel=el("div",[
  navMenuHome,
  navMenuLogout,
  divRPG
]);
mount(document.body, divPanel);
function clickBlank(){
  console.log('blank');
}

function btnCreateCharacter(){
  console.log($('#charactername').val())

  fetch('/rpg/createcharacter',{
    method: 'POST',
    credentials: 'same-origin', // include, *same-origin, omit
    //body: JSON.stringify({pub:$('#pmpublickey').val()})
  })
  .then(response => response.json())
  .then(data => console.log(data));
}