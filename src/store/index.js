// 把所有的模塊做統一處理
// 導出一個統一的方法 useStore
import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
import ChannelStore from "./channel.Store";

class RootStore {
  // 組合模塊
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    // 實例化操作
    this.channelStore = new ChannelStore();
  }
}

// 實例化根
// 導出useStore context

const rootStore = new RootStore(); // 實例化根
// 導入 useStore方法供組件使用數據
const context = React.createContext(rootStore); // 輸入 context
export const useStore = () => React.useContext(context);
// 導出通用的方法useStore，該方法的返回值就是取值React.useContext(context);
// 且取得的東西就是我們的 rootStore實例對象
