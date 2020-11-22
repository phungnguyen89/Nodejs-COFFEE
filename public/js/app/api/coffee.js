class CoffeeApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "/coffee";
  }
  DELETE(params = "") {
    return params
      ? this.client.delete(this.url, { params })
      : this.client.delete(this.url);
  }
  PUT(frm) {
    //console.log("body", body);
    return this.client.post(this.url, frm);
  }
  POST(frm) {
    //console.log("body", body);
    return this.client.post(this.url, frm);
  }
  GET(params = "") {
    // console.log(this.baseURL);
    return params ? this.client.get(this.url, { params }) : this.client.get(this.url);
  }
}
