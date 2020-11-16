const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
function condition() {
  let a = [
    true,
    false,
    0,
    1,
    2,
    null,
    undefined,
    { name: "ABC ", age: 15 },
    "",
    "stringGGG",
    ["string1", "string2"],
  ];
  for (var i in a) {
    if (a[i]) {
      console.log("condition", a[i], typeof a[i]);
    }
  }
  console.log("ABC".toLowerCase());
}

function tett() {
  return new Promise((resolve, reject) => {
    resolve("Success!");
  });
}

function t() {
  tett().then(async (val) => {
    console.log("val", val);
    let ret = val;
    return ret;
  });
}

const s1 = new Schema({
  name: { type: String, uppercase: true },
  email: {
    type: String,
    default: new mongoose.Types.ObjectId(5) + "@gmail.com",
  },
});

let app = require("./src/models/appRepository");
let app1 = require("./src/models/appRepository");

console.log("app1", app1.user);
console.log("app", app.User);
console.log("app1", app1.user);
let ret = [];
let a;
a = ret.length > 0 ? (ret.length > 1 ? ret : ret[0]) : null;
console.log("a", a);
let nu = null;
if (!nu) console.log("!nu", nu, !nu);
if (nu) console.log("nu", nu, !nu);

console.log(process.env.TOKEN_SECRECT);
const fs = require("fs");
const path = require("path");

const removeFile = () => {
  const path1 = path.join(__dirname, "/public/test/text.txt");
  try {
    fs.unlinkSync(path1);
    console.log("file removed");
    //file removed
  } catch (err) {
    console.error(err);
  }
};

removeFile();
