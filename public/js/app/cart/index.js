const app = new AppApi();
const main = {};

main.pushProduct = (o) => {
  let s = [];
  s.push("<tr>");

  s.push(` <td>${o.name}</td>`);
  s.push(` <td>${o.quote}</td>`);
  s.push(` <td>${o.description}</td>`);
  s.push(` <td>123</td>`);
  s.push(`<td class="del" value=${o._id}>Delete</td>`);
  s.push("</tr>");
  return s.join("");
};
main.loadCart = async (elm) => {
  let ret = await app.Cart.GET();
  if (ret.error) {
    helper.msg(ret.msg, true);
  } else {
    let s = [];
    for (let i in ret.data.productList) {
      s.push(main.pushProduct(ret.data.productList[i]));
    }
    elm.insertAdjacentHTML("afterbegin", s.join(""));
  }
};
main.dels = async () => {
  setTimeout(function () {
    let dels = document.querySelectorAll(".del");
    for (var i in dels) {
      dels[i].onclick = async function () {
        console.log(this.getAttribute("value"));
        let ret = await app.Cart.DELETE(this.getAttribute("value"));
        if (ret.error) {
          helper.msg(ret.msg, true);
        } else {
          helper.msg(ret.msg);
          this.parentNode.parentNode.removeChild(this.parentNode);
        }
      };
    }
  }, 1000);
};

main.update = async () => {
  //code here
};

$(document).ready(async function () {
  //alert("hehe");
  let sheet = document.getElementById("sheet");
  main.loadCart(sheet);
  main.dels();
});
