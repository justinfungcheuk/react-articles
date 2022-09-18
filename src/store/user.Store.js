import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class UserStore {
  userInfo = {};
  // 由於一開始 userInfo 是空的，所以 userInfo會用該空對象來渲染第一次到頁面的用戶名作顯示
  // 而由於異步接口返回之後，會把數據更改，而由於更改之後是第二次渲染，由於第二次渲染沒有連結，就會導致數據不更新的情況
  // 因此該數據只會存到store裡面，並沒有影響到數據的更新
  // 因此我們需要用到 observer去調用數據渲染到頁面，獲取用戶名顯示在右上角
  constructor() {
    makeAutoObservable(this);
  }
  getUserInfo = async () => {
    //調用接口獲取數據
    const res = await http.get("/user/profile");
    this.userInfo = res.data;
  };
}

export default UserStore;
