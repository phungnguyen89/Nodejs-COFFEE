const app = new AppApi();
const addCart = async function (o) {
  let ret = await app.Cart.POST(o);
  console.log(ret);
  ret.error ? helper.msg(ret.msg, true) : helper.msg(ret.msg);
};

$(document).ready(function () {
  let frm = document.getElementById("frm");
  // console.log(frm.num.value);
  frm.onsubmit = function (ev) {
    ev.preventDefault();
    addCart({ productId: frm.id.value });
  };
});
