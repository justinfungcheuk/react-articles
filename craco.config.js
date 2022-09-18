// 添加自訂義對於webpack的配置

const path = require("path");

module.exports = {
  // webpack 配置
  webpack: {
    // 配置別名
    alias: {
      // 修改 package.json 中的腳本命令
      // 在代碼中，就可以通過 @ 來表示 src 目錄的絕對路徑
      "@": path.resolve(__dirname, "src"),
    },
  },
};
