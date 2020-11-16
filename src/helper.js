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
