let app = new AppApi();

$(document).ready(function () {
  //code here

  let frm = document.getElementById("frm");
  frm.onsubmit = async function (ev) {
    ev.preventDefault();
    let ret = await app.User.LOGIN({
      username: frm.username.value,
      password: frm.password.value,
    });
    ret.error ? helper.msg(ret.msg, true) : (document.location.href = "/");
  };
});
