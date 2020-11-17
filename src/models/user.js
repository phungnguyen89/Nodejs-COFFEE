const User = require("./model").User;
const chalk = require("chalk");

module.exports.deleteById = async (id) => {
  try {
    let ret = await User.findByIdAndRemove(id).select({ username: 1 });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.update = async (o) => {
  try {
    //console.log(chalk.blue("model"), o);
    let ret = await User.findByIdAndUpdate(o._id, o);
    return ret;
  } catch (err) {
    //console.log(chalk.red(err));
    throw new Error(err);
  }
};
module.exports.create = async (o) => {
  console.log("USER MODEL --- create1", o);
  try {
    let newUser = new User(o);
    //console.log("newUser", newUser);
    return newUser.save();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getByUsername = async (usr) => {
  try {
    let ret = await User.findOne({ username: usr });
    //console.log("user MODEL-getUserByUsername", ret);
    return ret;
  } catch (err) {
    console.log("user MODEL-getUserByUsername", err);
    throw new Error(err);
  }
};

module.exports.getAll = async () => {
  try {
    let users = await User.find().sort({ updateAt: -1 });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports.getByUsernameOrEmail = async (o) => {
  //return User.find({ $or: [{ email: o.email }, { userName: o.userName }] });
  try {
    let ret = await User.find({
      $or: [
        { email: o.email ? o.email.toLowerCase() : "" },
        { userName: o.userName.toLowerCase() },
      ],
    });
    return ret ? (ret.length > 1 ? ret : ret[0]) : null;
  } catch (err) {
    throw new Error(err);
  }
};
