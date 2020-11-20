class UserApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "/user";
  }
  LOGIN(frm) {
    return this.client.post(this.url, frm);
  }

  DELETE(params = "") {
    return this.client.delete(`${this.url}/${params}`);
  }
  PUT(frm) {
    return this.client.put(this.url, frm);
  }
  POST(frm) {
    return this.client.post(this.url, frm);
  }

  GET(params = "") {
    return params ? this.client.get(`${this.url}/${params}`) : this.client.get(this.url);
  }
}
