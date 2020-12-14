let app = new AppApi();
let cart = {};

function pushProduct(o) {
  let s = [];
  s.push("<tr>");
  s.push(` <td>${o.info.name}</td>`);
  s.push(` <td>${o.price}</td>`);
  s.push(` <td>1</td>`);
  s.push(` <td>123</td>`);
  s.push(`<td class="del" value=${o._id}>Delete</td>`);
  s.push("</tr>");
  return s.join("");
}

cart.PUT = () => {
  {
    let dels = document.querySelectorAll(".del");
    for (let i in dels) {
      dels[i].onclick = function () {
        app.Cart.DELETE(this.getAttribute("value"))
          .then((ret) => {
            if (ret.error) helper.msg(ret.msg, true);
            else {
              helper.msg(ret.msg);
              this.parentNode.parentNode.removeChild(this.parentNode);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }
  }
};

cart.DELETE = () => {
  // alert("Abc");
  app.Cart.DELETE()
    .then((ret) => {
      if (!ret.error) {
        sheet.textContent = "";
        sheet.insertAdjacentHTML(
          "afterbegin",
          `   <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><button>CHECKOUT</button></td>
      </tr>`
        );
      }
      ret.error ? helper.msg(ret.msg, true) : helper.msg(ret.msg);
    })
    .catch((err) => {
      console.log(err);
    });
};

cart.GET = () => {
  app.Cart.GET()
    .then((ret) => {
      if (ret.error) {
        helper.msg(ret.msg, true);
      } else {
        let s = [];
        for (let i in ret.data.item) {
          s.push(pushProduct(ret.data.item[i]));
        }
        sheet.insertAdjacentHTML("afterbegin", s.join(""));
        cart.PUT();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

$(document).ready(async function () {
  const sheet = document.getElementById("sheet");
  const clearCart = document.getElementById("clearCart");
  cart.GET();
  clearCart.onclick = function () {
    cart.DELETE();
  };
});
