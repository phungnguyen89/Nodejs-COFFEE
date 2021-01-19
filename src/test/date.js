require("../configs/configs").connectDatabase();
let app = require("../models/app");
let test = function () {
  app.Cart.create({}).then((ret) => {
    console.log(ret);
  });
};
test();
let t = Date.now();
let s = "2021-01-07T16:27:09.417Z";
//console.log(t);
// var asiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
// console.log(new Date().toLocaleString());
// //console.log(asiaTime);
// //console.log(new Date(asiaTime));
// //console.log(new Date());
// //console.log(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));

// console.log(new Date().toUTCString());
// console.log(Date.parse("Sat, 21 Nov 2020 15:29:10 GMT"));
// console.log(Date.parse("Sat, 21 Nov 2020 15:30:10 GMT"));
// console.log(
//   Date.parse("Sat, 21 Nov 2020 15:29:10 GMT") -
//     Date.parse("Sat, 21 Nov 2020 15:30:10 GMT")
// );

// const getUTC = function (date) {
//   return Date(
//     Date.UTC(
//       date.getFullYear(),
//       date.getMonth(),
//       date.getDate(),
//       date.getHours(),
//       date.getMinutes(),
//       date.getSeconds()
//     )
//   );
// };
