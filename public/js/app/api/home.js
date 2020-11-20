class HomeApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "";
  }
  GET(params = "") {
    return this.client.get(`/detail/${params}`);
  }
  PAGE(params = 1) {
    return this.client.get(`/page/${params}`);
  }
}
