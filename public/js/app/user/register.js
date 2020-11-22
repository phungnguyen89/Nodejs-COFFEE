let app = new AppApi();
const main = {};

$(document).ready(function () {
  let btn = document.getElementById("btn");
  let frm = document.getElementById("frm");
  frm.onsubmit = async function (ev) {
    ev.preventDefault();
    let ret = main.createUser(frm);
    console.log(ret);
  };
});

main.createUser = async function (o) {
  let ret = await app.User.POST(new FormData(o));
  if (ret.error) {
    helper.msg(ret.msg, true);
  } else {
    helper.msg(`SUCESSFULLY TO CREATE ${ret.data.username}`);
  }
};
