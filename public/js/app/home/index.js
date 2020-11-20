let app = new AppApi();
$(document).ready(function () {
  let btn = document.getElementById("btn");
  btn.onclick = async function () {
    //alert(this);
    // axios
    //   .get("api/detail/5fb1770f6654cc3038bc0fd7")
    //   .then((val) => {
    //     console.log("axios", val);
    //   })
    //   .catch((err) => {
    //     console.log("axios", err);
    //   });
    //let ret = await app.Home.PAGE(3);
    let ret = await app.Home.GET();
    console.log("my api", ret.data);
  };
});
