import { Layout, Menu, Popconfirm } from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useStore } from "@/store";
import { useEffect } from "react";

const { Header, Sider } = Layout;

const GeekLayout = () => {
  const { pathname } = useLocation();
  /* 獲取當前路徑【useLocation()可以拿到所有參數 例如：pathname】
  再把該參數放到用作激活高亮的位置 defaultSelectedKeys={[pathname]}
  讓它和任意的一個路徑的key發送匹配，就可以達到高亮的效果
  */

  const { userStore, loginStore, channelStore } = useStore();
  // userStore.getUserInfo()? 該方法在什麼地方執行呢？
  useEffect(() => {
    // 頁面初始化完成後，就只執行一次，用作獲取用戶名
    userStore.getUserInfo();
    channelStore.loadChannelList();
  }, [userStore, channelStore]);

  // 確定退出
  const navigate = useNavigate();
  const onConfirm = () => {
    // 退出登錄 - 刪除token 和 跳回到登錄頁面
    loginStore.loginOut();
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onConfirm}
              title="是否確認退出？"
              okText="退出"
              cancelText="取消"
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            /* defaultSelectedKeys={["/"]} 會和 Menu.Item 的 key 產生匹配關聯高亮效果的作用 
            高亮效果：defaultSelectedKeys === item key
            獲取當前激活的path路徑？交給 defaultSelectedKeys 把配置的 Menu.Item 的 key 匹配就有高亮效果
            */
            defaultSelectedKeys={[pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              {/* key是用作配置路由路徑，用作點擊跳轉 */}
              <Link to="/">數據瀏覽</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="article">
              <Link to="/article">內容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="publish">
              <Link to="/publish">發佈文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二級路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(GeekLayout);

/* 
123
只要是 hook，所有的hook都帶有use，只可以在另一個hook裡面用，或者在函數組件裡面用，其他地方都不可以用
例子：
  const onConfirm = () => {
    // 退出登錄 - 刪除token 和 跳回到登錄頁面
    loginStore.loginOut();
    navigate("/login");
  };

  124
  處理失效token
  token的有效時間一般在兩小時左右
  當超過該時間，就會變成一個失效的token，此時就不具備存在 request header裡面做一個鑑權的作用
  此時我們需要把它清楚掉，如何做了？由於token失效，調用接口後端會返回401的狀態碼，拿到該狀態碼直接把它跳轉到登錄就可以

 */
