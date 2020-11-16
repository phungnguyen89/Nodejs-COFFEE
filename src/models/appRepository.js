class app {
  user;
  product;

  get User() {
    if (this.user == undefined) this.user = require("./user");
    return this.user;
  }
  get Product() {
    if (this.product == undefined) this.product = require("./product");
    return this.product;
  }
}

module.exports = new app();
