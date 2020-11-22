let app = new AppApi();
const main = {};

$(document).ready(function () {
  let btn = document.getElementById("btn");
  let frm = document.getElementById("frm");
  frm.onsubmit = async function (ev) {
    ev.preventDefault();
    let o = {
      username: frm.username.value,
      password: frm.password.value,
    };

    let ret = await main.createUser(o);
    console.log(ret);
  };
});

main.createUser = async function (o) {
  let ret = await app.User.POST(o);
  if (ret.error) {
    helper.msg(ret.msg, true);
  } else {
    helper.msg(`SUCESSFULLY TO CREATE ${ret.data.username}`);
  }
};
