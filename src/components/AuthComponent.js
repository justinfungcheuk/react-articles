//1. 判斷token是否存在
//2. 如果存在 直接正常渲染
//3. 如果不存在 重新定向到登錄路由

// 高階組件：把一個組件當成另外一個組件的參數傳入
// 然後通過一定的判斷，返回新的組件
// 高階組件是來自高階函數【就是把函數本身當成一個參數來傳入，再返回一個處理之後的新的一個函數】
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";
function AuthComponent({ children }) {
  // children 是一個默認參數，只要在組件的內部寫進來的任何的東西，都稱為children
  //【也就是說直接放到 { children } 】
  /* 總結：高階組件的函數就是：傳入一個組件{ children }，再返回不同的新的組件，加上判斷語句，且 AuthComponent本身也是組件，所以被稱為高階組件
  --》所以 token是非常重要！！！可以用做判斷是否跳轉到首頁還是登錄頁
     - 例如：根據不同的狀態所返回的組件格式是不一樣的
    /* <AuthComponent> <Layout/> </AuthComponent>
    - <Layout/> 就是一個 {children}
    - 如果當前是一個登錄的狀態，返回的就是 <></> 幽靈節點，加上 <Layout/>組件
    登錄狀態：<><Layout/></> 
    非登錄狀態：<Navigate to="/login" replace />
    所以 <AuthComponent> <Layout/> </AuthComponent> 會根據不同的狀態所返回的組件格式是不一樣的
    */

  // 根據當前本地有沒有token，有就返回子組件渲染，沒有就返回重定向組件
  const isToken = getToken(); // 代表獲取到token
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

/* <AuthComponent> <Layout/> </AuthComponent>
- <Layout/> 就是一個 {children}
- 如果當前是一個登錄的狀態，返回的就是 <></> 幽靈節點，加上 <Layout/>組件
   登錄狀態：<><Layout/></> 
   非登錄狀態：<Navigate to="/login" replace />
所以 <AuthComponent> <Layout/> </AuthComponent> 會根據不同的狀態所返回的組件格式是不一樣的
 */

export { AuthComponent };
