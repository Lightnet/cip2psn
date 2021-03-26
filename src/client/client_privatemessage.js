/**
  Blank template
 */
const { el, mount } = redom;

// FORM
var divPrivateMessagePanel=el('div',{
  },
  el("table",[
    el("tr",[
      el("td", el("label",{textContent:"Message:"})),
      el("td", el("input",{id:'pminput',onkeyup:typingMessage,value:"test content"})),
      el("td", el("button",{onclick:btnSend,textContent:'Sent'})),
    ])
  ])
);

var navMenuHome=el('a',{href:'/',textContent:'Home'});
var navMenuLout=el('a',{href:'/logout',textContent:'Logout'});

var div_panel=el("div",[
  navMenuHome,
  el('span',' - | - '),
  el('label',{textContent:'Public Key'}),
  el('select',{textContent:''}),

  el('input',{id:'pmpublickey',placeholder:'Public Key'}),
  
  el('button',{onclick:addContact,textContent:'+'}),
  el('button',{onclick:removeContact,textContent:'-'}),
  el('label',{textContent:'Status:'}),
  el('label',{textContent:'None'}),
  el('span',' - | - '),
  navMenuLout,
  divPrivateMessagePanel
]);
mount(document.body, div_panel);

function typingMessage(event){
  console.log('test...')
  console.log(event.keyCode)
  if(event.keyCode==13){
    console.log('test')
    processMessage();
  }
}

function btnSend(){
  console.log('blank');
  processMessage();
}
function processMessage(){
  console.log($('#pminput').val());
}

function addContact(){
  console.log($('#pmpublickey').val())

  fetch('/privatemessage/addcontact',{
    method: 'POST',
    credentials: 'same-origin', // include, *same-origin, omit
    body: JSON.stringify({pub:$('#pmpublickey').val()})
  })
  .then(response => response.json())
  .then(data => console.log(data));
}

function removeContact(){
  
}
