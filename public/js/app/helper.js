const helper = {};
helper.clearMsg = function (element) {
  document.getElementById("error_msg").style.display = "none";
  document.getElementById("success_msg").style.display = "none";
  document.getElementById("error_msg").innerText = "";
  document.getElementById("success_msg").innerText = "";
};
helper.msg = function (str = "BAD REQUEST", err = false) {
  this.clearMsg();
  let msg = err
    ? document.getElementById("error_msg")
    : document.getElementById("success_msg");
  msg.style.display = "block";
  msg.innerText = str;
};
helper.moneyFormat = function (price) {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
};
