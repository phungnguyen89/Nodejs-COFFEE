const app = new AppApi();

const main = {};

$(document).ready(function () {
  let create = document.getElementById("inputCreate");
  let sheet = document.getElementById("sheet");
  let frm = document.getElementById("frm");
  let title = document.getElementById("titleForm");
  let btn = document.getElementById("btn");
  main.loadProduct(sheet);
  //test
  btn.onclick = () => {
    console.log(udts);
  };
  create.onclick = () => {
    frm.style = "display:block";
  };

  frm.onsubmit = async function (ev) {
    ev.preventDefault();
    main.createProduct(frm);
  };
});
main.pushProduct = function (o) {
  let s = [];
  s.push("<tr>");
  s.push(`<td>${o.name}</td>`);
  s.push(
    `<td><img src="/images/products/${o.imgUrl}" alt="${o.imgUrl}" width="100px"/></td>`
  );
  s.push(`<td>${o.quote}</td>`);
  s.push(`<td>${o.description}</td>`);
  s.push(`  <td >
  <img id="update" src="/images/crud/edit.png" alt="edit.png" width="50px" />
</td>`);
  // s.push(`<td><a href="/api/product/edit/${o._id}">UPDATE</a></td>`);
  s.push(`<td><a href="/api/product/delete/${o._id}">DELETE</a></td>`);
  s.push("</tr>");
  return s.join("");
};

main.loadProduct = async function (elm) {
  let ret = await app.Product.GET();
  if (ret.error) {
    console.log("API ERROR", ret.erro);
  }
  if (ret.data) {
    let s = [];
    for (let i in ret.data) s.push(this.pushProduct(ret.data[i]));
    elm.insertAdjacentHTML("afterbegin", s.join(""));
  }
};
main.createProduct = async function (o) {
  let ret = await app.Product.POST(new FormData(o));
  if (ret.error) {
    //alert("eorr");
    helper.msg(ret.msg, true);
  } else {
    //successfully
    sheet.insertAdjacentHTML("afterbegin", pushProduct(ret.data));
    helper.msg(`SUCESSFULLY TO CREATE ${ret.data.name}`);
  }
};
