let app = new AppApi();

$(document).ready(function () {
  //code here

  let frm = document.getElementById("frm");
  frm.onsubmit = function (ev) {
    ev.preventDefault();
    let ret = app.User.LOGIN({
      username: frm.username.value,
      password: frm.password.value,
    })
      .then((ret) => {
        ret.error ? helper.msg(ret.msg, true) : (document.location.href = "/shop");
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
