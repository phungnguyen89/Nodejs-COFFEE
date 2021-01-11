const app = new AppApi();

$(document).ready(function () {
  let btn = document.getElementById("cart");
  btn.onclick = function () {
    app.Cart.POST({ productId: this.getAttribute("value") })
      .then((ret) => {
        if (ret.error) helper.msg(ret.msg, true);
        else {
          helper.msg(`Add your cart successfully`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
