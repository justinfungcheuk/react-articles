// 封裝 localStorage 存取 token

const key = "react-key";

// 存token
const setToken = (token) => {
  return window.localStorage.setItem(key, token);
  // return 返回值可以得到我們 存 或 刪 的結果【就是為了知道自己到底有沒有存進去和刪除掉】
  // 該 return 的做法是為了除了我們要執行該函數的邏輯之外，還需要把該函數調完之後的結果 return 出去
  // 所以以後封裝任何一個函數要寫上它的 返回值return，不要用它默認的 undefined
};

// 取token
const getToken = () => {
  return window.localStorage.getItem(key);
  // 調用 getToken，想要拿到當前取到的值，所以要把該結果 return 出去
};

// 刪除token
const removeToken = () => {
  return window.localStorage.removeItem(key);
};

export { setToken, getToken, removeToken };
