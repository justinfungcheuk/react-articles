// 先把所有的工具函數導出的模塊在這裡導入
// 然後再統一導出
import { http } from "./http.js";
import { setToken, getToken, removeToken } from "./token";
export { http, setToken, getToken, removeToken };

// 該文件是方便其他文件要使用該文件的時候可以方便直接導入 utils文件
// 例如：import {http} from "@/utils"
// 因為所有的工具函數都導入在 index 做了統一
