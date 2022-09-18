// 封裝圖表bar組件
import * as echarts from "echarts";
import { useRef, useEffect } from "react";

function Bar({ title, xData, yData, style }) {
  const domRef = useRef();
  const chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current); // current 是 domRef裡面的屬性
    // 绘制图表
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: yData,
        },
      ],
    });
  };
  // 執行chartInit該初始化函數
  useEffect(() => {
    // 用 useEffect作只執行一次的作用，要添加[]空依賴
    chartInit();
  }); // []少了

  return (
    <div>
      {/* 通過ref標識，準備一個掛載節點 */}
      <div ref={domRef} style={style}></div>
      {/* style={{ width: "500px", height: "400px" }}> 裡面加上大括號{}，能夠識別為一個有效的對象 */}
    </div>
  );
}

export default Bar;
