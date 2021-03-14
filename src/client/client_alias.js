/**
  Blank template
 */
const { el, mount } = redom;

// SUBMIT
var tr_btn_submit=el("tr",[
    el("td", el("label","Create Blog?:")),
    el("td", el("input",{type:"submit",onclick:aliasCreatePubId})),
  ]);
// FORM
var form_blank=el('form',{
  action:'/alias',
  method:'post'
  },
  el("table",[
  ,tr_btn_submit
  ])
);
var div_panel=el("div",form_blank);
//mount(document.body, div_panel);

var label_post=el("label",'POST CONTENT?');

var divPost=el('div',[
  label_post,
  el('table',[
    el('tr',el('td',el('textarea',{id:'aliascontent',value:'testcontent'}))),
    el('tr',el('td',el('button',{onclick:aliasPostContent, textContent:'Post'})))
  ])
]);

function checkAliasExist(){
  fetch('/checkAliasBlog',{

  })
  .then(response => response.json())
  .then((respone) => {
    console.log(respone);
    if(respone.message=='NONEXIST'){
      mount(document.body, div_panel);
    }
    if(respone.message=='EXIST'){
      mount(document.body, divPost);
    }
  });
}
checkAliasExist();

function aliasCreatePubId(){
  fetch('/createAliasBlog',{

  })
  .then(response => response.json())
  .then((respone) => {
    console.log(respone);
    if(respone.message=='NONEXIST'){
      //console.log(label_post);
      console.log('');
    }
  });
}

function aliasPostContent(){
  let post = {
    aliascontent: document.getElementById('aliascontent').value || '',
  };
  fetch('/aliaspost',{
    method: "post"
    , body: JSON.stringify(post)
  })
  .then(response => response.json())
  .then((respone) => {
    console.log(respone);
    if(respone.message=='OK'){
      //console.log(label_post);
      console.log('PASS POST');
    }
  });
}