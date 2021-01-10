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
};
$(document).ready(function () {
  DOM.loadmore = document.getElementById("btnLoadmore");
  DOM.searchFrm = document.getElementById("searchFrm");
  DOM.sheet = document.getElementById("sheet");
  if (DOM.loadmore) {
    DOM.loadmoreEvent();
  }
});
