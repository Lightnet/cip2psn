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
var btnGetContactList=el('button',{onclick:btnGetContacts,textContent:'Get Contacts'});

var div_panel=el("div",[
  navMenuHome,
  el('span',' - | - '),
  el('button',{onclick:btnGetPublicKey,textContent:'My Public Key'}),
  el('label',{textContent:'Public Key'}),
  el('select',{id:'pmcontacts',onchange:selectPMPublicKey,textContent:''},el('option',{default:true,disabled:false},'Select PM Contacts')),

  el('input',{id:'pmpublickey',placeholder:'Public Key'}),
  
  el('button',{onclick:addContact,textContent:'+'}),
  el('button',{onclick:removeContact,textContent:'-'}),
  el('label',{textContent:'Status:'}),
  el('label',{textContent:'None'}),
  el('span',' - | - '),
  navMenuLout,
  divPrivateMessagePanel,
  btnGetContactList
]);
mount(document.body, div_panel);
// https://www.w3.org/TR/clipboard-apis/#async-clipboard-api
function btnGetPublicKey(){
  fetch('/account/pubkey',{
    method: 'GET',
    credentials: 'same-origin', // include, *same-origin, omit
    //body: JSON.stringify({pub:$('#pmpublickey').val()})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data){
      if(data.publickey){
        try{
          navigator.clipboard.writeText(data.publickey)
        }catch(err){
          console.log(err);
        }
      }
    }
  });
}

function btnGetContacts(){
  fetch('/privatemessage/listcontact',{
    method: 'GET',
    credentials: 'same-origin', // include, *same-origin, omit
    //body: JSON.stringify({pub:$('#pmpublickey').val()})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data){
      if(data.alias){
        let option = el('option',{id:data.pub,value:data.pub},data.alias);
        $('#pmcontacts').append(option);
      }
    }
  });
}
btnGetContacts();

function selectPMPublicKey(){
  console.log('select?');
  console.log($('#pmcontacts').val());
  $('#pmpublickey').val($('#pmcontacts').val())
}

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
