class HomeApi extends BaseApi {
  url;
  constructor() {
    super();
    this.url = "";
  }
  VIETNAM() {
    return this.client.get(`/vietnam`);
  }
  GET(params = "") {
    return this.client.get(`/detail/${params}`);
  }
  PAGE(params = 1) {
    return this.client.get(`/page/$w{params}`);
  }
}
