//singleton

class AppApi {
  user;
  productInfo;
  home;
  cart;

  get Cart() {
    if (this.cart === undefined) this.cart = new CartApi();
    return this.cart;
  }
  get User() {
    if (this.user === undefined) this.user = new UserApi();
    return this.user;
  }
  get ProductInfo() {
    if (this.productInfo === undefined) this.productInfo = new ProductInfoApi();
    return this.productInfo;
  }
  get Home() {
    if (this.home === undefined) this.home = new HomeApi();
    return this.home;
  }
}
