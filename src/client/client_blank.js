/**
  Blank template
 */
const { el, mount } = redom;

// SUBMIT
var tr_btn_submit=el("tr",[
    el("td", el("label","Actions:")),
    el("td", el("input",{type:"submit"})),
  ]);
// FORM
var form_blank=el('form',{
  action:'/blank',
  method:'post'
  },
  el("table",[
  ,tr_btn_submit
  ])
);
var div_panel=el("div",form_blank);
mount(document.body, div_panel);


