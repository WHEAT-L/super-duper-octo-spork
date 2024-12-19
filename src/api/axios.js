import axios from "axios";

const instance = axios.create({
  baseURL: "https://apis.netstart.cn/xmsc/",
});

export default instance;