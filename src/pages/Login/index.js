import React from "react";
import { Card, Form, Input, Checkbox, Button, message } from "antd";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
// 導入樣式文件
import "./index.scss";
import { useStore } from "@/store";

const Login = () => {
  const { loginStore } = useStore();
  // useStore()返回的是實例對象，且該實例對象包含著 loginStore
  const navigate = useNavigate();
  async function onFinish(values) {
    console.log(values);
    // values: 放置的是所有表單項中用戶輸入的內容
    // 就可以做登錄的操作
    await loginStore.getToken({
      // 這裡用 async awit 是為了保證登錄成功後才去下一步的 【跳轉首頁 和 提示用戶】
      mobile: values.username,
      code: values.password,
    });
    // 跳轉首頁
    navigate("/", { replace: true });
    // 提示用戶
    message.success("登錄成功");
  }
  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed", errorInfo);
  // };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登錄表單 */}
        {/* 子項用到的觸發事件，需要在 Form 中都聲明一下才可以 */}
        <Form
          validateTrigger={["onBlur", "onChange"]}
          initialValues={{
            remember: true,
            password: "246810",
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              // rules 代表校驗規則
              {
                required: true,
                message: "請輸入手機號!",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "請輸入正確的手機號",
                validateTrigger: "onBlur", // 代表失去焦點，沒有在輸入框，會得到提示
              },
            ]}
          >
            <Input size="large" placeholder="請輸入手機號" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              // rules 代表校驗規則
              {
                required: true,
                message: "請輸入密碼!",
              },
              {
                len: 6,
                message: "請輸入6位密碼",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="請輸入驗證碼" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已閱讀並同意「用户協議」和「隱私條款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            {/* 渲染Button組件為submit按鈕 */}
            <Button type="primary" htmlType="submit" size="large" block>
              {/* htmlType="submit" 用作指定是一個提交按鈕 */}
              登錄
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
