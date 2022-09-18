import {
  unstable_HistoryRouter as HistoryrRouter,
  Routes,
  Route,
} from "react-router-dom";
import { history } from "./utils/history";
import Layout from "./pages/Layout/index";
import Login from "@/pages/Login/index";
import { AuthComponent } from "@/components/AuthComponent";
import Article from "./pages/Article/index";
import Publish from "./pages/Publish/index";
import Home from "./pages/Home/index";
function App() {
  return (
    // 路由配置
    <HistoryrRouter history={history}>
      <div className="App">
        <Routes>
          {/* 創建路由path和組件對應關係 */}
          {/* Layout需要做鑑權處理的 */}
          {/* 所以這裡的 Layout 不一定不能寫死 要根據是否登錄進行判斷 */}
          <Route
            path="/"
            element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }
          >
            <Route index element={<Home />}></Route>
            <Route path="article" element={<Article />}></Route>
            <Route path="publish" element={<Publish />}></Route>
          </Route>
          {/* Login 指責不需要做鑑權處理 */}
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryrRouter>
  );
}

export default App;
