import axios, { AxiosInstance } from "axios";

class Axios {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
const _axios = new Axios().instance;
export default _axios;
