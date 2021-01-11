let app = new AppApi();
let cart = {};
let DOM = {};
function pushProduct(o) {
  let s = [];
  s.push("<tr>");
  s.push(` <td>${o.info.name} ${o.size}gr x1</td>`);
  s.push(` <td>${o.info.subname}</td>`);
  s.push(` <td>${DOM.moneyFormat(o.price)}</td>`);
  s.push("</tr>");
  return s.join("");
}

DOM.moneyFormat = function (price) {
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
};

DOM.createOption = function (o) {
  let option = document.createElement("option");
  option.value = o.id;
  option.textContent = o.name;
  return option;
};

DOM.getDistrictByProvince = function (id = 1) {
  let arr = DOM.vietnam.filter((o) => {
    if (o.id == id) return o;
  });
  return arr[0].districts;
};

DOM.getWardByDistrict = function (id = 1) {
  let arr = DOM.district.filter((o) => {
    if (o.id == id) return o;
  });
  return arr[0].wards;
};

DOM.setEventSelect = function (elm) {
  elm.onchange = function () {
    if (this.selectedIndex > 0) {
      switch (this.getAttribute("id")) {
        case "province": {
          let arr = DOM.getDistrictByProvince(this.value);
          DOM.districtSelect.options.length = 0;
          DOM.districtSelect.appendChild(
            DOM.createOption({
              value: "",
              name: "Quận Huyện",
            })
          );
          DOM.wardSelect.options.length = 0;
          DOM.wardSelect.appendChild(
            DOM.createOption({
              value: "",
              name: "Xã Phường",
            })
          );
          for (let i in arr) {
            DOM.districtSelect.appendChild(DOM.createOption(arr[i]));
          }
          DOM.district = arr;
          DOM.districtSelect.selectedIndex = 0;
          DOM.wardSelect.selectedIndex = 0;
          break;
        }
        case "district": {
          let arr = DOM.getWardByDistrict(this.value);
          DOM.wardSelect.options.length = 0;
          DOM.wardSelect.appendChild(
            DOM.createOption({
              value: "",
              name: "Xã Phường",
            })
          );
          for (let i in arr) {
            DOM.wardSelect.appendChild(DOM.createOption(arr[i]));
          }
          DOM.ward = arr;
          DOM.wardSelect.selectedIndex = 0;
          break;
        }
        case "ward": {
          break;
        }
      }
    }
  };
};

DOM.addProvince = function () {
  let select = document.getElementById("province");
  let arr = DOM.province;
  for (let i in arr) {
    select.appendChild(DOM.createOption(arr[i]));
  }
};

DOM.fillData = function () {
  let arr = DOM.vietnam;
  DOM.province = arr.map((o) => {
    return {
      id: o.id,
      name: o.name,
    };
  });
};
DOM.getVietNam = function () {
  app.Cart.VIETNAM()
    .then((ret) => {
      DOM.vietnam = ret.data;
      DOM.fillData();
    })
    .then(function () {
      DOM.addProvince();
      let list = document.querySelectorAll(".vietnam");
      for (let i in list) {
        DOM.setEventSelect(list[i]);
      }
    })
    .catch((err) => {});
};

cart.GET = () => {
  app.Cart.GET()
    .then((ret) => {
      if (ret.error) {
        helper.msg(ret.msg, true);
      } else {
        // console.log(ret);
        let s = [];
        let total = 0;
        for (let i in ret.data.item) {
          s.push(pushProduct(ret.data.item[i]));
          total += 1.0 * ret.data.item[i].price;
        }
        sheet.insertAdjacentHTML("afterbegin", s.join(""));
        document.getElementById("total").textContent = DOM.moneyFormat(total);
      }
    })
    .then(function () {
      DOM.getVietNam();
    })
    .catch((err) => {
      console.log(err);
    });
};

$(document).ready(async function () {
  DOM.provinceSelect = document.getElementById("province");
  DOM.districtSelect = document.getElementById("district");
  DOM.wardSelect = document.getElementById("ward");
  DOM.frm = document.getElementById("frm");
  const sheet = document.getElementById("sheet");
  const clearCart = document.getElementById("clearCart");
  cart.GET();
  DOM.frm.onsubmit() = function () {};
});
