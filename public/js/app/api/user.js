class ProductApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "/user";
  }
  DELETE(params = "") {
    return params
      ? this.client.delete(this.url, { params })
      : this.client.delete(this.url);
  }
  PUT(frm) {
    return this.client.put(this.url, frm);
  }
  POST(frm) {
    //console.log("body", body);
    return this.client.post(this.url, frm);
  }

  GET(params = "") {
    return params ? this.client.get(this.url, { params }) : this.client.get(this.url);
  }
}
