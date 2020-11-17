class HomeApi extends BaseApi {
  url = "/";
  constructor() {
    super();
  }

  PAGE(params = 1) {
    return this.client.get("/page", params);
  }
  GET(params = "") {
    return params ? this.client.get("/item", { params }) : this.client.get(this.url);
  }
  REGISTER(frm) {
    return this.client.post("/register", form);
  }
  LOGIN(frm) {
    return this.client.post("/login", form);
  }
}
