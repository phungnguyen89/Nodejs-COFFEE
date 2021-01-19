let app = new AppApi();
let cart = {};
let DOM = {};
function pushProduct(o) {
  let s = [];
  s.push("<tr>");
  s.push(` <td>${o.info.name} ${o.size}gr x1</td>`);
  s.push(` <td>${o.info.subname}</td>`);
  s.push(` <td >${DOM.moneyFormat(o.price)}</td>`);

  s.push(`<td id="del" value=${o._id}>Delete</td>`);
  s.push("</tr>");
  return s.join("");
}

DOM.moneyReformat = function (s) {
  for (let i = 0; i < 2; i++) s = s.replace(s[s.length - 1], "");
  s = s.replace(/[. -]/g, "");
  return s;
};

cart.PUT = () => {
  {
    let dels = document.querySelectorAll("#del");
    for (let i in dels) {
      dels[i].onclick = function () {
        if (confirm("Sure to delete")) {
          app.Cart.PUT({ id: this.getAttribute("value") })
            .then((ret) => {
              if (ret.error) helper.msg(ret.msg, true);
              else {
                helper.msg(ret.msg);

                let price = DOM.moneyReformat(
                  this.parentNode.querySelectorAll("td")[2].textContent
                );
                let total = DOM.moneyReformat(
                  document.getElementById("total").textContent
                );

                this.parentNode.parentNode.removeChild(this.parentNode);
                setTimeout(function () {
                  document.getElementById("total").textContent = DOM.moneyFormat(
                    1.0 * total - 1.0 * price
                  );
                }, 300);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
        // sheet.insertAdjacentHTML(
        //   "afterbegin",
        //   `   <tr>
        //   <td></td>
        //   <td></td>
        //   <td></td>
        //   <td><button>CHECKOUT</button></td>
        // </tr>`
        // );
      }
      ret.error ? helper.msg(ret.msg, true) : helper.msg(ret.msg);
    })
    .catch((err) => {
      console.log(err);
    });
};
DOM.moneyFormat = function (price) {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
};
cart.GET = () => {
  app.Cart.GET()
    .then((ret) => {
      if (ret.error) {
        helper.msg(ret.msg, true);
      } else {
        console.log(ret);
        let s = [];
        let total = 0;
        for (let i in ret.data.item) {
          s.push(pushProduct(ret.data.item[i]));
          total += 1.0 * ret.data.item[i].price;
        }
        sheet.insertAdjacentHTML("afterbegin", s.join(""));
        document.getElementById("total").textContent = DOM.moneyFormat(total);
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
    if (confirm("sure to clear your cart")) cart.DELETE();
  };
});
