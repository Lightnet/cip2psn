/**
 * 
  Community
 */
const { el, mount,unmount } = redom;
//console.log(document.cookie);
let isPostClose=false;
//if(localStorage.getItem('isPostClose') ==null){
  //localStorage.setItem('isPostClose', false);
//}else{
  //isPostClose = (localStorage.getItem('isPostClose') == 'true' );
//}
//console.log(isPostClose);
//===============================================
// Community ID POST
var divPost=el('div',{
    style:{
      position:'fixed'
    , top:'28px'
    }
  },
  [
    el("label",{textContent:'Community ID:'}),
    el('br'),
    el("label",{id:'communityId',textContent:'ID:None'}),
    el('br'),
    el("label",'POST CONTENT?'),
    el('table',[
      el('tr',el('td', el('textarea',{id:'communitycontent',value:'testcontent'}))),
      el('tr',el('td', el('button',{onclick:CommunityPostContent, textContent:'Post'}))),
      //el('tr',el('td', el('label',{ textContent:'Close at Post' }, el('input',{type:'checkbox',checked:isPostClose ,id:'isClosePost', value:true, onclick:btnCheckPostClose})) ))
    ])
]);
mount(document.body, divPost);
function btnCheckPostClose(){
  //console.log(document.getElementById('isClosePost').value);
  //console.log(isPostClose);
  if(isPostClose){
    isPostClose=false;
    localStorage.setItem('isPostClose', false);
  }else{
    isPostClose=true;
    localStorage.setItem('isPostClose', true);
  }
  //console.log(isPostClose);
  //console.log(localStorage.getItem('isPostClose'));
}
//===============================================
// SEARCH
var divSearch=el('div',{
  style:{
    position:'fixed'
    , top:'32px'
  }
},[
  //el('label','Pub Id:'),
  el('input',{placeholder:'Community Id'}),
  el('button',{onclick:searchCommunityId,textContent:'Search'})
]);
mount(document.body, divSearch);
divSearch.style.display = 'none';
function searchCommunityId(){

}
//===============================================
function createCommunity(){
  console.log('Create Community ');
}
//===============================================
// create community
var divCreateCommunity=el('div',{
  style:{
    //position:'fixed'
    //, top:'32px'
  }
},
  el("table",[
    el("tr",[
      el("td", el("label","Create Community?")),
      el("td", el("input",{type:"submit",value:'Create',onclick:createCommunity})),
    ])
  ])
);
//mount(document.body, divCreateCommunity);
//===============================================
// SETTINGS
var divSettings=el('div',{
  style:{
    position:'fixed'
    , top:'32px'
  }
},[
  el('label','Settings:'),
  el('br'),
  el('button',{onclick:toggleTheme,textContent:'Theme [Light] || Dark'}),
  divCreateCommunity
]);
mount(document.body, divSettings);
divSettings.style.display = 'none';
function toggleTheme(){
  console.log('toggle theme');
}
//===============================================
// FEED
var divFeedContent=el('div',{id:'feeds'});
var divFeeds=el('div',{id:'feedsection',textContent:'FEEDS',
style:{
  position:'fixed'
  , top:0
  , left:'50%'
}
}, divFeedContent);
//===============================================
// MENU
var divMenu=el('div',{
  style:{
    position:'fixed'
    , top:0
    , left:0
  }
},[
  el('a',{href:'/',textContent:'Home'}),
  el('button',{onclick:togglePost,textContent:'Post'}),
  el('button',{onclick:toggleSearch,textContent:'Search'}),
  el('button',{onclick:toggleSettings,textContent:'Settings'}),
]);
mount(document.body, divMenu);

function togglePost(){
  //console.log(divPost.style.display);
  divSettings.style.display = 'none';
  divSearch.style.display = 'none';
  if(divPost.style.display === 'none'){
    divPost.style.display = 'block';
  }else{
    divPost.style.display = 'none';
  }
}
function toggleSearch(){
  //console.log(divSearch.style.display);
  divPost.style.display = 'none';
  divSettings.style.display = 'none';
  if(divSearch.style.display === 'none'){
    divSearch.style.display = 'block';
  }else{
    divSearch.style.display = 'none';
  }
}
function toggleSettings(){
  //console.log(divSettings.style.display);
  divPost.style.display = 'none';
  divSearch.style.display = 'none';
  if(divSettings.style.display === 'none'){
    divSettings.style.display = 'block';
  }else{
    divSettings.style.display = 'none';
  }
}

// Community POST CONTENT
function CommunityPostContent(){
  //console.log('isPostClose:',isPostClose);
  //if(isPostClose){
    //if(divPost.style.display === 'none'){
      //divPost.style.display = 'block';
    //}else{
      //divPost.style.display = 'none';
    //}
  //}
  let post = {
    aliascontent: document.getElementById('communitycontent').value || '',
  };
  fetch('/community/post',{
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
function GetCommunityIdPosts(){
  let post = {
    //aliascontent: document.getElementById('aliascontent').value || '',
  };
  fetch('/community/posts',{
    method: "post"
    //, body: JSON.stringify(post)
  })
  .then(response => response.json())
  .then((respone) => {
    console.log(respone);
    if(respone.message=='FOUND'){
      for(let k in respone.feeds){
        //console.log(respone.feeds[k]);
        appendFeed(respone.feeds[k]);
        //let divfeed =el('div',{id:respone.feeds[k].id,textContent:respone.feeds[k].content})
        //mount(divFeeds, divfeed);
      }
    }
  });
}

function timedateclock(time){
  //return new Date(time);
  let plus0 = num => `0${num.toString()}`.slice(-2);
  let d = new Date(time);
  let year = d.getFullYear();
  let monthTmp = d.getMonth() + 1;
  let month = plus0(monthTmp);
  let date = plus0(d.getDate());
  //let hour = plus0(d.getHours()%12);
  let hour = plus0(d.getHours()%12);
  let minute = plus0(d.getMinutes());
  let second = plus0(d.getSeconds());
  let rest = time.toString().slice(-5);

  //return `${year}-${month}-${date}_${hour}:${minute}:${second}.${rest}`;
  return `${year}-${month}-${date}_${hour}:${minute}:${second}`;
}

function appendFeed(feed){
  let time = timedateclock(parseInt(feed.id));
  //console.log(time);

  let divfeed =el('div',{id:feed.id,textContent:feed.content},[
    el('div',[
      el('label',{textContent:time}),
      el('button',{onclick:()=>{togglePostId(feed.id);},textContent:'action'})
    ])
  ]);
  //mount(divFeedContent, divfeed);
  divFeedContent.prepend(divfeed);
  function togglePostId(id){
    console.log(id);
  }
}