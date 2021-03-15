/**
  Blank template
 */
const { el, mount,unmount } = redom;

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

var divFeeds=el('div',{id:'feeds'});

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
      mount(document.body, divFeeds);

      //get current alias public posts
      aliasGetPubIdPosts();
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
    if(respone.message=='CREATE'){
      unmount(document.body, div_panel);
      mount(document.body, divPost);
    }
  });
}
// POST CONTENT
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
//GET PUBLIC POSTS
function aliasGetPubIdPosts(){
  let post = {
    //aliascontent: document.getElementById('aliascontent').value || '',
  };
  fetch('/aliasgetposts',{
    method: "post"
    //, body: JSON.stringify(post)
  })
  .then(response => response.json())
  .then((respone) => {
    console.log(respone);
    if(respone.message=='FOUND'){
      for(let k in respone.feeds){
        console.log(respone.feeds[k]);
        let divfeed =el('div',{id:respone.feeds[k].id,textContent:respone.feeds[k].content})

        mount(divFeeds, divfeed);
      }
    }
  });
}