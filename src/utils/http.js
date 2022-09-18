// 封裝axios
// 實例化   請求攔截器   響應攔截器

import axios from "axios";
import { getToken } from "@/utils";
import { history } from "./history";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});
// 添加請求攔截器
http.interceptors.request.use(
  (config) => {
    // config 是為了做 token 的統一注入，放到我們的請求頭
    // if not login add token
    const token = getToken();
    // 只要是用我發送的請求，不管是 GET 還是 POST，在發送之前都會自動把token放進去
    // 【這樣做就不需要每次都手寫一次】就可以達到一次配置多處都能生效！！！
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加響應攔截器
http.interceptors.response.use(
  (response) => {
    // 2xx 範圍内的狀態碼都會觸發該函數。
    // 對響應數據做點什麼
    return response.data;
  },
  (error) => {
    // 超出 2xx 範圍的狀態碼都會觸發該函數。
    // 對響應錯誤做點什麼
    console.dir(error);
    if (error.response.status === 401) {
      /*
      在 React裡，路由Router默認是不能在React的上下文的外面使用【也就是常規的js文件裡面是不可用Router】
      跳轉到登錄 reactRouter默認狀態下，並不支持在組件之外完成路由跳轉
      需要自己來手動實現路由跳轉 - 在組件之外不在Router裡面實現跳轉 */
      console.log("login");
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

export { http };

/* 
請求攔截器注入token
把token通過請求攔截器注入到請求頭中，一次配置多處都能生效！！！
所以我們可以在 utils/http.js 透過使用 axios所提供的請求攔截器
【也就是在每一個接口正式發起之前，可以在中間做攔截，攔截後就可以把token裝進去，裝進去之後只要你是用我發送的接口請求，就會自動擁有了一個token 】
【因為很多API接口【例如：獲取用戶信息 / 提交文章發佈等等】都是依賴token，讓用戶告訴接口它是一個有效的用戶，才可以把數據交給用戶，否則，如果是非法用戶就無法訪問數據】
 */

/* 
路由鑑權實現【原理：如果用戶沒有登錄直接打開登錄後的首頁是不被允許的，必須登錄之後才可以進入到首頁】
- 所以只有在登錄的狀態下才可以跳轉到登錄後的首頁！！！否則會強制把用戶跳轉到登錄頁，讓用戶登錄成功後才可以跳轉到首頁
實現路由鑑權的思路：
- 自己封裝 AuthRoute 路由鑑權高階組件，實現未登錄攔截，並跳轉到登錄頁面
- 思路為：判斷本地是否有token，如果有，就返回子組件，否則就重定向到登錄Login
 */
