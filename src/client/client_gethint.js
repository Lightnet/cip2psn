
function gethint(e){
  e.preventDefault();
  console.log('get hint...');
  //console.log(document.getElementById('gethint'));
  //console.log(new FormData(document.getElementById('gethint')));
  let url ="http://localhost:3000/forgot";
  url = '/forgot';

  let post = {
    alias: document.getElementById('alias').value || '',
    question1: document.getElementById('question1').value || '',
    question2: document.getElementById('question2').value || ''
  };

  //JSON.stringify(post)
  // doesn't work with fastify that need some config
  // contentType: "multipart/form-data"
  fetch(url, {    
    method: "post"
    , body: JSON.stringify(post)
    //, header: 'application/json'
    //, contentType: "application/json"
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
      if(data.message=='FOUND'){
        console.log('FINISH');
        document.getElementById('hint').value=data.hint;
      }
      //console.log('DATA...',data);
    }
  });
  return false;
}