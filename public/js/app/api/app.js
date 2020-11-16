//singleton

class AppApi {
  user;
  product;

  get User() {
    //if(this.user===undefined) this.user=new unregisterPartial()

    return this.user;
  }
  get Product() {
    if (this.product === undefined) this.product = new ProductApi();
    return this.product;
  }
}
