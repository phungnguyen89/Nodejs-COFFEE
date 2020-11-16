class ProductApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "/product";
  }

  GET(params = "") {
    return this.client.get(this.url);
  }
  POST(body) {
    //console.log("body", body);
    return this.client.post(this.url, body);
  }
}
