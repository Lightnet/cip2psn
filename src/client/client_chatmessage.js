/**
  chat template
 */
// https://stackoverflow.com/questions/11498508/socket-emit-vs-socket-send
const { el, mount } = redom;

const socket = io();
var alias='';
var aliasId='';

function isEmpty(str) {
  return (!str || 0 === str.length);
}

socket.on("connect", (data) => {
  console.log('data: ',data);
  //console.log('CONNECT!');
  console.log('connected: ',socket.connected); // true
});
socket.on("disconnect", (reason) =>{
  //console.log('DISCONNECT!');
  //console.log('reason: ', reason);
  if (reason === "io server disconnect") {
    console.log('io server disconnect');
  }
  // else the socket will automatically try to reconnect
  console.log('connected: ',socket.connected); // false
});
// io.send('hello');
socket.on('message', function (message) {
  console.log(message);
});
socket.on('chatmessage', function (message) {
  console.log('SERVER message:',message);
  ServerChatMessageParse(message);
});
// socket.emit('alias',{alias:'name'})
socket.on("alias", (data) =>{
  //console.log(data);
  alias=data.alias;
});
// io.emit('server',{});
socket.on("server", (data) =>{
  console.log(data);
});

// div Chat Panel
var divChatPanel=el('div',{
  },
  el("table",{
    style:{
      'border-style': 'solid'
    }
  },
  [
    el("tr",[
    el("td", {colspan:'3',style:{height:'300px',width:'300px'}},
      el("div",{style:{
        height:'300px'
        ,width:'300px'
        ,'overflow-y': 'scroll'
      }},{id:'chatmessages',textContent:"Chat Messages"})),
    ]),
    el("tr",[
      el("td", el("label",{textContent:"Chat:"})),
      el("td", el("input",{id:'chatinput', onkeydown:inputChat,name:'content',value:"test content"})),
      el("td", el("button",{type:"",onclick:getChatInput,textContent:'chat'})),
    ])
  ])
);
// https://stackoverflow.com/questions/4249353/jquery-scroll-to-bottom-of-the-page
function ServerChatMessageParse(data){
  console.log(data);

  let usermsg = el('div',{id:data.date,textContent:`${data.alias} : ${data.msg}`});

  $('#chatmessages').append(usermsg);
  var scroll=$('#chatmessages');
  scroll.animate({scrollTop: scroll.prop("scrollHeight")});
}

// oninput
function getChatInput(){
  //let msg = document.getElementById('chatinput').value;
  //console.log(msg);
  processChatInput();
}

function inputChat(event){
  //event.preventDefault();
  event = event || window.event;
  //console.log(event.keyCode); //13
  if(event.keyCode == 13){
    //let msg = document.getElementById('chatinput').value;
    //console.log(msg);
    processChatInput();
  }
}

function processChatInput(){
  let msg = document.getElementById('chatinput').value;
  //console.log('MSG:',msg);
  if(isEmpty(msg)==false){
    //console.log('MSG:',msg);
    socket.emit('chatmessage',msg);
  }
}

var divMembersPanel=el('div',{

});

var divBuddyPanel=el('div',{

});

var divChatRoomsPanel=el('div',{

});

var link_home=el('a',{href:'/',textContent:'Home'});
var btnTest=el('button',{onclick:clickTest,textContent:'Test'});

var div_panel=el("div",[
  link_home,
  divChatPanel,
  divBuddyPanel,
  divChatRoomsPanel,
  divMembersPanel,
  btnTest
]);
//INIT ELEMENTS
mount(document.body, div_panel);

//let inputChat = document.getElementById('chatinput');
//inputChat.addEventListener()

function clickTest(e){
  e.preventDefault();
  //console.log('blank');
  socket.emit('test','text');
}

