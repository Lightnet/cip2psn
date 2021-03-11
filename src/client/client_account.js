console.log('account page');

const { el, mount } = redom;

var tablehint=el('table',[
  el('tr',[
    el('td',el('label','Question 1:')),
    el('td',el('input',{id:'question1',value:'testa'}))
  ]),
  el('tr',[
    el('td',el('label','Question 2:')),
    el('td',el('input',{id:'question2',value:'testb'}))
  ]),
  el('tr',[
    el('td',el('label','Hint:')),
    el('td',el('input',{id:'hint',value:'testc'}))
  ]),
  el('tr',[
    el('td',el('label','Action:')),
    el('td',el('button',{id:'gethint',textContent:'Set Hint'}))
  ])
]);

var divAccount =el('div',tablehint);

mount(document.body, divAccount);

var btngethint = document.getElementById('gethint');
btngethint.addEventListener('click',function(){
  console.log('set hint...');

  let post = {
    question1: document.getElementById('question1').value,
    question2: document.getElementById('question2').value,
    hint: document.getElementById('hint').value
  };

  fetch('http://localhost:3000/sethint', {    
    method: "post"
    , body: JSON.stringify(post)
  })
  .then(response => response.json())
  .then((data) => {
    if(data){
      if(data.error){
        console.log("ERROR!!!");
      }
      if(data.message=='POST FORGOT'){
        console.log('FINISH');
      }
      console.log('DATA...',data);
    }
  });
});