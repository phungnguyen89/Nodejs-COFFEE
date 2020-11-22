//singleton

class AppApi {
  user;
  coffee;
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
  get Coffee() {
    if (this.coffee === undefined) this.coffee = new CoffeeApi();
    return this.coffee;
  }
  get Home() {
    if (this.home === undefined) this.home = new HomeApi();
    return this.home;
  }
}
