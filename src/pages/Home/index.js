import React from "react";
// import "./index.scss";
// import * as echarts from "echarts";
// import { useRef, useEffect } from "react";
import Bar from "@/components/Bar";
/* 實現首頁echart圖表封裝展示
思路：
1. 看官方文檔 把 echarts 加入項目
【如何在react獲取dom -》 useRef】 
【在什麼地方獲取dom節點 -》useEffect - useEffect的執行時機是在dom之後，所以它是可以獲取到dom元素的】
2. 不抽離定制化的參數，先把最小化的 demo跑起來
3. 按照需求，那些參數需要自定義，抽象出來
！！！把echart裝成一個組件，目的是為了復用，裝成組件後找到那些需要定義的參數後，再把它們設成一個prop就可以使用
 */

const Home = () => {
  /*   const domRef = useRef();
  const chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current); // current 是 domRef裡面的屬性
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  };
  // 執行chartInit該初始化函數
  useEffect(() => {
    // 用 useEffect作只執行一次的作用，要添加[]空依賴
    chartInit();
  }, []); */
  return (
    <div>
      {/* 通過ref標識，準備一個掛載節點 */}
      {/* <div ref={domRef} style={{ width: "500px", height: "400px" }}></div> */}
      {/* style={{ width: "500px", height: "400px" }}> 裡面加上大括號{}，能夠識別為一個有效的對象 */}
      <Bar
        title="主流框架使用滿意度"
        xData={["react", "vue", "angular"]}
        yData={[30, 40, 50]}
        style={{ width: "500px", height: "400px" }}
      />
      <Bar
        title="主流框架使用滿意度2"
        xData={["react", "vue", "angular"]}
        yData={[60, 70, 80]}
        style={{ width: "300px", height: "200px" }}
      />
    </div>
  );
};

export default Home;
