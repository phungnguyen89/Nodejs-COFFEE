$(document).ready(function () {
  let app = new AppApi();
  let btnLogout = document.getElementById("btnLogout");
  console.log(btnLogout);
  //   console.log(app.User);
  if (btnLogout) {
    btnLogout.onclick = function () {
      app.User.LOGOUT()
        .then((ret) => {
          if (ret.error) {
            document.location.href = "/";
          } else {
            document.location.href = "/";
          }
        })
        .catch((err) => {
          document.location.href = "/";
          console.log(err);
        });
    };
  }
});
