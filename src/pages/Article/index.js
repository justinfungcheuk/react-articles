import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
} from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import img404 from "@/assets/error.png";
import "./index.scss";
import { useEffect, useState } from "react";
import { http } from "@/utils";
import { useStore } from "@/store";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const { channelStore } = useStore();

  // 頻道列表管理 - 使用 useState hook 來管理數據
  // const [channelList, setChannelList] = useState([]); // 頻道數據存放的位置和操作頻道數據的方法
  /* 獲取後端數據要調用接口，在hook裡面調用接口可以使用 useEffect
  - 一開始的時候就只執行一次【第一次相當於模擬 ComponentDidMount方法】，所以要在 useEffect加上空數組[]
  */
  /* !!!重點！！！useEffect的依賴非常必要 非常容易出現循環執行 
     在裡面寫了引起組件重新渲染的邏輯 重新渲染又會導致useEffect執行
  */
  // 該useEffect一開始的時候調用一次就可以，不需要重複執行
  /* useEffect(() => {
    // 發送異步請求【但是 useEffect裡面不可以使用 async await 方法實現發送異步請求】
    // 要在 useEffect 的外部先定義一個變量後才可以使用 async await 方法實現發送異步請求
    const loadChannelList = async () => {
      const res = await http.get("/channels");
      // 拿到數據後要調用 setChannelList，把數據存到channelList裡面
      // 成功拿到數據後代表數據已經存起來在channelList，就可以使用這些數據，調用channelList
      setChannelList(res.data.channels);
    };
    loadChannelList();
  }, []); */

  // 文章列表管理 - 統一管理數據 將來修改給 setList 傳對象！！！
  /* 獲取文章列表數據：有兩個數據都需要進行管理
     -》一個是文章列表
     -》一個是參與文章變化所依賴的參數：params【因為將來需要更改該參數】
     如果是統一邏輯在一起的數據，沒必要把它分開兩個useState
     例如：用一個接口返回的，統一管理該兩個數據 llist: [] 和 count: 0，封裝到一個對象裡面就可以

     如果異步請求函數需要依賴一些數據的變化而重新執行
     推薦把它寫到 useEffect函數的回調函數的內部
     統一不抽離函數到外面 只要涉及到異步請求的函數 都放到useEffect內部
     -》因為如果把異步請求的函數放到外面，相當於每次 Article組件更新的時候，都要把異步請求的函數初始化，導致浪費
     -》但如果把異步請求的函數放到 useEffect裡面，就可以做到在依賴[params]發送變化的時候，它的回調才會重新執行，不會浪費
     本質區別：寫到外面每次組件更新都會重新進行函數初始化，這本身就是一次性能消耗
     而寫到 useEffect裡，只會在依賴項發生變化的時候，函數才會進行重新初始化，避免性能損失
   */
  const [articleData, setArticleData] = useState({
    /* 當調用 articleData 的時候，就可以從裡面放兩個數據 list: [] 和 count: 0
    - 其中 list 依然是一個數組，只是在調用 articleData時，需要給他傳遞一個對象
    - 也就是說原來是一個對象，傳遞的依然是對象，原來是數組的依然是數組
     */
    list: [], //文章列表
    count: 0, // 文章數量
    // 用一個接口返回的，統一管理該兩個數據 llist: [] 和 count: 0，封裝到一個對象裡面就可以
    // 要是不是統一管理，就需要另外再創建一個 useState來管理
  });

  // 文章參數管理 - 用作將來調用接口交給後端的
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  });
  //！！！重點 useEffect會根據不同的執行頻次和依賴數據都有不同的作用
  // 該useEffect作用是在很多地方都需要依賴params的數據變化，從而引起useEffect的回調函數的一個邏輯重新執行
  // 如果異步請求函數需要依賴一些數據的變化而重新執行
  // 推薦把它寫到 useEffect函數的回調函數的內部
  // 統一不抽離函數到外面 只要涉及到異步請求的函數 都放到useEffect內部
  useEffect(() => {
    // 如果 loadList 在 useEffect的外面，就會導致每次更新的時候，都會執行 loadList函數，這是沒必要的
    // 所以要把 loadList函數 寫進 useEffect 的回調函數裡
    // 且放到裡面後，它的依賴參數就是 params
    async function fetchArticlelist() {
      /* fetchArticlelist() 用作決定調用最新接口，也就是拿到最新的參數params去獲取接口數據的一個方法 
      - 只要把 fetchArticlelist()方法重新執行一次就會獲取到最新的數據，拿到最新數據就可以把它放到setArticleList({list: results,count: total_count,});
      所以當參數每次發生變化時，就把依賴項[params]修改一下，只要params發送變化，useEffect裡面的回調就會重新執行
      因此本質上是更改它的依賴項就可以
       */
      const res = await http.get("/mp/articles", { params }); // 傳遞 params是因為它有 page 和 per_page屬性
      console.log(res);
      const { results, total_count } = res.data; // 解構賦值 results, total_count
      setArticleData({
        list: results,
        count: total_count,
      });
    }
    fetchArticlelist();
  }, [params]);

  const onFinish = (values) => {
    console.log(values);
    const { channel_id, date, status } = values;
    // 數據處理
    const _params = {}; // 收集到所有的要傳遞給後端的數據【也就是交給文章參數管理的 useState 的 params】
    if (status !== -1) {
      // 如果不等於-1，就不是全部的意思，就要把它加到參數裡
      _params.status = status;
    }
    if (channel_id) {
      // 如果channel_id有值就在params裡加上channel_id，等於我們解構出來的 channel_id
      _params.channel_id = channel_id;
    }
    if (date) {
      _params.begin_pubdate = date[0].format("YYYY-MM-DD");
      _params.end_pubdate = date[1].format("YYYY-MM-DD");
    }
    /*以上if的所有語句都處理完畢後，如果數據都存在，params都會把這些數據存起來
    存起來後，就要修改params數據，引起接口的重新發送。對象的合併是一個整體覆蓋 改了對象的整體引用
    - 也就是把 文章參數管理裡面的 useState({
    page: 1,
    per_page: 10,
    status: 0,
  }); 的對象裡面的整體更改掉
    */
    setParams({
      // params代表收集到的數據
      /* 如果想做合併不破壞之前的參數格式，可以用對象合併
      - 因為合併是一個整體的替換合併，所以要保持之前的狀態，要把該兩個對象...params 和 ..._params 做展開，自己合併
       */
      ...params,
      ..._params,
    });
  };

  const pageChange = (page) => {
    setParams({
      ...params,
      // 當params改變，useEffect裡面的回調就會改變
      // 因為useEffect裡面的 {params}被我們更改了，所以會用我們的新數據再次發送請求
      page,
    });
  };

  // 刪除
  const delArticle = async (data) => {
    console.log(data);
    await http.delete(`/mp/articles/${data.id}`);
    // 刷新一下列表
    setParams({
      ...params,
      page: 1,
    });
  };

  // 編輯
  const navigate = useNavigate();
  const goPublish = (data) => {
    navigate(`/publish?id=${data.id}`);
  };

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      /* 只要匹配到 dataIndex: "cover"，
      render: (cover) => { 拿到的就是名稱為 cover 的所有數據
       */
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "標題",
      dataIndex: "title",
      /* cover為什麼能夠自動匹配到返回值裡面的cover？
      是因為 dataIndex能夠指定當前列要用數組裡面的那一個字段 - 因為上面指定 dataIndex: "cover",
      */
      width: 220,
    },
    {
      title: "狀態",
      dataIndex: "status",
      render: (data) => <Tag color="green">審核通過</Tag>,
    },
    {
      title: "發佈時間",
      dataIndex: "pubdate",
    },
    {
      title: "閱讀數",
      dataIndex: "read_count",
    },
    {
      title: "評論數",
      dataIndex: "comment_count",
    },
    {
      title: "點讚數",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        // 當點擊button的時候，可以拿到data數據【因為data裡面保存了我們要的id】
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)} //
            />
            <Button
              type="primary"
              danger // danger代表刪除
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => delArticle(data)}
            />
          </Space>
        );
      },
    },
  ];

  //模擬data
  /*   const data = [
    {
      id: "8218",
      comment_count: 0,
      cover: {
        images: ["http://geek.itheima.net/resources/images/15.jpg"],
      },
      like_count: 0,
      pubdate: "2019-03-11 09:00:00",
      read_count: 2,
      status: 2,
      title: "wkwebview离线化加载h5资源解决方案",
    },
  ]; */

  return (
    <div>
      {/* 篩選區域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首頁</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>內容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish} initialValues={{ status: null }}>
          <Form.Item label="狀態" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待審核</Radio>
              <Radio value={2}>審核通過</Radio>
              <Radio value={3}>審核失敗</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="頻道" name="channel_id">
            <Select placeholder="請選擇文章頻道" style={{ width: 120 }}>
              {channelStore.channelList.map((channel) => (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表區域 */}
      <Card title={`根據篩選條件共查詢到 ${articleData.count} 條結果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleData.list}
          pagination={{
            pageSize: params.per_page,
            total: articleData.count,
            onChange: pageChange,
            /* 通過當前的狀態，修改page，引起變化，
            配置每頁的條數 和 總是，在點擊的時候，綁定事件 onChange事件
            onChange回調裡拿到當前的數目，把它修改到params的位置，
            params一發生改變，接口就會重新發送，用最新的參數去發送一個接口請求，就能拿到數據重新完成一個渲染
             */
          }}
        />
        {/* list Table 渲染列表，把 list 放到 dataSource={list} */}
      </Card>
    </div>
  );
};

export default observer(Article);
