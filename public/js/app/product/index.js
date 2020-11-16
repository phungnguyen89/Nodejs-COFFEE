const app = new AppApi();
function pushProduct(o) {
  let s = [];
  s.push("<tr>");
  s.push(`<td>${o.name}</td>`);
  s.push(
    `<td><img src="/images/products/${o.imgUrl}" alt="${o.imgUrl}" width="100px"/></td>`
  );
  s.push(`<td>${o.quote}</td>`);
  s.push(`<td>${o.description}</td>`);

  s.push(`<td><a href="/api/product/edit/${o._id}">UPDATE</a></td>`);
  s.push(`<td><a href="/api/product/delete/${o._id}">DELETE</a></td>`);
  s.push("</tr>");
  return s.join("");
}
async function loadProduct() {
  let ret = await app.Product.GET();
  if (ret.error) {
    //alert(ret.erro);
    console.log("API ERROR", ret.erro);
  }
  if (ret.data) {
    let s = [];
    //console.log(ret.data.length);
    //console.log(sheet);
    for (let i in ret.data) s.push(pushProduct(ret.data[i]));
    sheet.insertAdjacentHTML("afterbegin", s.join(""));
  }
}
async function createProduct(o) {
  let ret = await app.Product.POST(o);
  console.log(ret);
}
$(document).ready(function () {
  let create = document.getElementById("inputCreate");
  let sheet = document.getElementById("sheet");
  let frm = document.getElementById("frm");
  //alert("asd");
  loadProduct();

  create.onclick = () => {
    frm.style = "display:block";
  };
  frm.onsubmit = async function (ev) {
    ev.preventDefault();
    let o = {
      name: frm.name.value,
      quote: frm.quote.value,
      description: frm.description.value,
      img: frm.img.value,
    };

    let ret = await app.Product.POST(o);

    if (ret.error) console.log(ret);
  };
});
