let app = new AppApi();

let productInfo = {};
let category = {};

category.pushOneToOption = function (elm, o) {
  elm.className = "form-control";
  elm.value = o._id;
  elm.textContent = o.name;
  d;
  return elm;
};

category.pushTable = function (o) {
  if (o.name) {
    return `<td>${o.name}</td>`;
  }
  let s = [];
  s.push(`<td>`);
  for (let i in o) {
    s.push(o[i].name + " ");
  }
  s.push(`</td>`);
  return s.join("");
};
category.GET = function () {
  app.Category.GET()
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        for (let i in ret.data)
          selectCategory.appendChild(
            category.pushOneToOption(document.createElement("option"), ret.data[i])
          );
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

productInfo.GET = function () {
  app.ProductInfo.GET()
    .then((ret) => {
      if (ret.error) helper.msg(ret.msg, true);
      else {
        // console.log(ret.data[0].category[0].name);
        let s = [];
        for (let i in ret.data) {
          s.push(productInfo.pushOne(ret.data[i]));
        }
        sheet.insertAdjacentHTML("afterbegin", s.join(""));
      }
    })
    .catch((err) => {});
};
productInfo.pushOne = function (o) {
  let s = [];
  s.push("<tr>");
  s.push(`<td>${o.name}</td>`);
  s.push(
    `<td><img src="/images/productInfo/${o.imgUrl}" alt="${o.imgUrl}" width="100px"/></td>`
  );
  s.push(`<td>${o.quote}</td>`);
  s.push(`<td>${o.description}</td>`);
  s.push(category.pushTable(o.category));
  s.push(`  <td >
  <img id="update" src="/images/crud/edit.png" alt="edit.png" width="50px" />
</td>`);
  // s.push(`<td><a href="/api/productInfo/edit/${o._id}">UPDATE</a></td>`);
  s.push(`<td><a href="/api/productInfo/delete/${o._id}">DELETE</a></td>`);
  s.push("</tr>");
  return s.join("");
};

productInfo.loadProductInfo = async function (elm) {
  let ret = await app.ProductInfo.GET();
  if (ret.error) {
    console.log("API ERROR", ret.erro);
  }
  if (ret.data) {
    let s = [];
    for (let i in ret.data) s.push(this.pushOne(ret.data[i]));
    elm.insertAdjacentHTML("afterbegin", s.join(""));
  }
};
productInfo.POST = async function (o) {
  let ret = await app.ProductInfo.POST(new FormData(o));
  if (ret.error) {
    //alert("eorr");
    helper.msg(ret.msg, true);
  } else {
    //successfully
    sheet.insertAdjacentHTML("afterbegin", this.pushOne(ret.data));
    helper.msg(`SUCESSFULLY TO CREATE ${ret.data.name}`);
  }
};

$(document).ready(function () {
  var create = document.getElementById("inputCreate");
  var sheet = document.getElementById("sheet");
  var frm = document.getElementById("frm");
  var title = document.getElementById("titleForm");
  var btn = document.getElementById("btn");
  var selectCategory = document.getElementById("selectCategory");
  // console.log(selectCategory.value == "");
  productInfo.GET();
  category.GET();

  // main.loadProductInfo(sheet);
  // //test
  // btn.onclick = () => {
  //   console.log(udts);
  // };
  create.onclick = () => {
    frm.style = "display:block";
  };

  frm.onsubmit = async function (ev) {
    ev.preventDefault();
    productInfo.POST(frm);
  };
});
