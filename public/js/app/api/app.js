//singleton

class AppApi {
  user;
  product;
  home;
  get Home() {
    if (this.home === undefined) this.home = new HomeApi();
    return this.home;
  }
  get User() {
    if (this.user === undefined) this.user = new UserApi();

    return this.user;
  }
  get Product() {
    if (this.product === undefined) this.product = new ProductApi();
    return this.product;
  }
}
