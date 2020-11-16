const User = require("./model").User;

module.exports.userExisting = async (usr) => {
  try {
    let ret = await User.findOne({ username: usr });
    //console.log("user MODEL--userexisting", ret);
    return ret;

    // let ret = await User.find({
    //   $or: [{ email: usr }, { username: usr }],
    // });
    // console.log("user MODEL--userexisting", ret);

    // return ret.length > 0 ? (ret.length > 1 ? ret : ret[0]) : null;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.accountExisting = async (o) => {
  //return User.find({ $or: [{ email: o.email }, { userName: o.userName }] });

  let ret;
  console.log(o);
  await User.find({
    $or: [
      { email: o.email ? o.email.toLowerCase() : "" },
      { userName: o.userName.toLowerCase() },
    ],
  })
    .then((val) => {
      ret = val;
      //console.log("data", val);
      //console.log("ret", ret);
    })
    .catch((err) => {
      throw new Error(err);
    });
  return ret.length > 1 ? ret : ret[0];
};

module.exports.getUserByUsername = async (usr) => {
  try {
    let ret = await User.findOne({ username: usr });
    //console.log("user MODEL-getUserByUsername", ret);
    return ret;
  } catch (err) {
    console.log("user MODEL-getUserByUsername", err);
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  //console.log("USER MODEL --- create1", o);
  try {
    let newUser = new User(o);
    //console.log("newUser", newUser);
    return newUser.save();
  } catch (err) {
    throw new Error(err);
  }
};
