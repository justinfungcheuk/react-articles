// login module
import { makeAutoObservable } from "mobx";
import { http, setToken, getToken, removeToken } from "@/utils";
class LoginStore {
  /*
  在整個業務初始化的時候，也就是當你刷新的時候，會進行初始化
  而初始化的時候，該 token 會以你當前 = 等於號後面的值，進行取值
  【如果你寫空串"" 就代表沒有了值，所以要在空串之前先做調用 getToken() 取值】
  因此，如果取到token的值就是本地的，取不到就用 空串""
  如果寫就會在刷新時不會丟失token
   */
  token = getToken() || ""; // 取值【從本地取-刷新不會丟失】
  constructor() {
    // 響應式
    makeAutoObservable(this);
  }
  // 收集表單輸入數據
  getToken = async ({ mobile, code }) => {
    // getToken 的返回值就是一個 promise對象【因為有async函數】
    // 調用登錄接口
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    // 存入 token
    this.token = res.data.token;
    // 存入 localStorage
    setToken(res.data.token); // 在本地存值
  };
  // 退出登錄
  loginOut = () => {
    this.token = "";
    removeToken(); // 本地token
  };
}

export default LoginStore;
