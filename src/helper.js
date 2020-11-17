const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports.hashPassword = (usr, pwd) => {
  try {
    return crypto
      .createHash("sha256")
      .update(pwd + "@@coffee##" + usr)
      .digest("hex");
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteFile = (link) => {
  try {
    fs.unlinkSync(path.join(__dirname, `.././public${link}`));
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.stt200 = (data, msg = "SUCCESSFULLY") => {
  //console.log("helper", data);
  return {
    status: 200,
    msg: msg,
    data: data,
  };
};

module.exports.stt400 = (msg = "BAD REQUEST") => {
  return {
    status: 400,
    error: true,
    msg: msg,
  };
};

module.exports.stt403 = (msg = "ACCESS DENIED") => {
  return {
    status: 403,
    error: true,
    msg: msg,
  };
};

module.exports.stt401 = (msg = "NEED TO LOGIN") => {
  return {
    status: 401,
    error: true,
    msg: msg,
  };
};

module.exports.stt500 = (msg = "SERVER ERROR") => {
  return {
    status: 500,
    error: true,
    msg: msg,
  };
};

module.exports.page = (n) => {
  let s = [];
  // console.log("nnnn", n);
  s.push(`<ul class="pagination">`);

  s.push(`<li class="active page-item"><a href="">${1}</a></li>`);
  for (let i = 2; i <= n; i++) {
    s.push(`<li class="page-item"><a href="#">${i}</a></li>`);
  }
  s.push(`</ul>`);
  console.log(s.join(""));
  return s.join("");
};

module.exports.pag = (p, n) => {
  //console.log(p, size, n);
  let s = [];
  s.push(`<ul class="pagination">`);

  let slot = 7;
  let mid = Math.ceil(slot / 2);
  let left = 1;
  let right = slot;

  if (p > mid) {
    right = p + mid - 1;
    if (right > n) {
      right = n;
    }

    left = right - slot + 1;
  }

  for (let i = left; i <= right; i++) {
    if (i == p) {
      s.push('<li class="active page-item">');
    } else {
      s.push('<li class="page-item">');
    }
    s.push(`<a class="page-link" href="/${i}">${i}</a>`);
    s.push("</li>");
  }
  s.push(`</ul>`);
  return s.join("");
};
