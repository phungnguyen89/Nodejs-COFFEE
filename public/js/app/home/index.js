let app = new AppApi();
let product = {};
let DOM = {};
DOM.pushProduct = function (o) {
  let s = [];
  s.push(` <div class="col-3">`);
  s.push(` <div style="text-align: left">${o.info.name} ${o.size}kg</div>`);

  s.push(`<div style="text-align: left">"${o.info.subname}"</div>`);
  s.push(`<div>
    <a href="/detail/${o._id}"
      ><img
        src="/images/productInfo/${o.info.imgUrl}"
        alt="${o.info.imgUrl}"
        width="100px"
      />
    </a>
  </div>`);
  s.push(` <div>
    <p><b>${o.price}</b></p>
  </div>`);

  s.push(`</div>`);
  return s.join("");
};

DOM.loadmoreEvent = function () {
  DOM.loadmore = document.getElementById("btnLoadmore");
  if (DOM.loadmore) {
    DOM.loadmore.onclick = function () {
      DOM.loadmore.value = DOM.loadmore.value * 1.0 + 1;
      app.Product.SEARCH({
        q: DOM.searchFrm.q.value,
        skip: DOM.loadmore.value,
      })
        .then((ret) => {
          if (ret.error) {
            helper.msg(ret.msg, true);
          } else {
            console.log(ret.data);
            if (ret.data.length > 0) {
              for (let i in ret.data) {
                DOM.sheet.insertAdjacentHTML("beforeend", DOM.pushProduct(ret.data[i]));
              }
            } else {
              DOM.loadmore.style.display = "none";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};
DOM.init = function () {
  DOM.page = document.getElementsByClassName(
    "active page-item"
  )[0].childNodes[0].textContent;
  if (DOM.page) {
    product.PAGE(DOM.page);
  }
};
DOM.sortByName = function (key) {
  let arr = product.list.sort((a, b) => {
    return a.info.name > b.info.name ? 1 : a.info.name < b.info.name ? -1 : 0;
  });
  return key == 1 ? arr : arr.reverse();
};
DOM.sortByPrice = function (key) {
  let arr = product.list.sort((a, b) => {
    return a.price > b.price ? 1 : a.price < b.price ? -1 : 0;
  });
  // console.log(arr);
  return key == 1 ? arr : arr.reverse();
};
DOM.sortByLastest = function (key) {
  if (key == 1) {
    // console.log(key);
    return product.list;
  }
  if (key == -1) {
    return product.list.reverse();
  }
};
DOM.filterByPrice = function (value, s) {
  console.log(typeof value, value);
  if (s == 1)
    return product.list.filter((o) => {
      if (o.price >= value) return o;
    });
  if (s == -1)
    return product.list.filter((o) => {
      if (o.price < value) return o;
    });
};
DOM.filterChoose = function (elm) {
  elm.onchange = function () {
    if (this.selectedIndex > 0) {
      let arr;
      switch (this.id) {
        case "selectName": {
          arr = DOM.sortByName(this.value);
          break;
        }
        case "selectUpdated": {
          arr = DOM.sortByLastest(this.value);
          break;
        }
        case "selectPrice": {
          let s = 1.0 * this.options[this.selectedIndex].getAttribute("s");
          if (s == 1 || s == -1) {
            if (this.value > 0) arr = DOM.filterByPrice(1.0 * this.value, s);
          } else {
            arr = DOM.sortByPrice(this.value);
          }
          break;
        }
      }
      console.log(
        arr.map((o) => {
          return {
            price: o.price,
            size: o.size,
            updatedAt: o.updatedAt,
            quantity: o.quantity,
          };
        })
      );
      DOM.sheet.textContent = "";
      for (let i in arr) {
        sheet.insertAdjacentHTML("beforeend", DOM.pushProduct(arr[i]));
      }
    }
  };
};
DOM.eventFilter = function () {
  DOM.selectFilter = document.querySelectorAll(".filter");
  if (DOM.selectFilter) {
    for (let i in DOM.selectFilter) {
      DOM.filterChoose(DOM.selectFilter[i]);
    }
  }
};
product.PAGE = function (p) {
  app.Product.PAGE(p)
    .then((ret) => {
      if (ret.error) {
        helper.msg(ret.msg, true);
      } else {
        product.list = ret.data;
        for (let i in ret.data) {
          ret.data[i].updatedAt = new Date(ret.data[i].updatedAt).toLocaleDateString();
          DOM.sheet.insertAdjacentHTML("beforeend", DOM.pushProduct(ret.data[i]));
        }
        // DOM.filterByName(ret.data);
        // DOM.filterByPrice(ret.data);
        // DOM.filterByLastest(ret.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
$(document).ready(function () {
  DOM.searchFrm = document.getElementById("searchFrm");
  DOM.sheet = document.getElementById("sheet");
  DOM.init();
  DOM.loadmoreEvent();
  DOM.eventFilter();
});
