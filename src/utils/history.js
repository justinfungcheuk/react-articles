import { createBrowserHistory } from "history";
/*
在 React裡，路由Router默認是不能在React的上下文的外面使用【也就是常規的js文件裡面是不可用Router】
跳轉到登錄 reactRouter默認狀態下，並不支持在組件之外完成路由跳轉
需要自己來手動實現路由跳轉 - 在組件之外不在Router裡面實現跳轉 
所以要實現組件以外使用 Router，需要引入 history包裡面的createBrowserHistory方法，
它能得到一個 history實例對象，需要通過實例對象history進行跳轉路由，
且要實現跳轉，必須要把 history對象配置到App.js文件裡的路由裡面，先引入 unstable_HistoryRouter as HistoryrRouter,
再把 history配置到HistoryrRouter, <HistoryrRouter history={history}>，蔡可以完成組件外的跳轉功能
*/
const history = createBrowserHistory();

export { history };
