import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useStore } from "@/store";
import { useState, useRef, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;

const Publish = () => {
  const { channelStore } = useStore();
  //存放上傳圖片的列表
  const [fileList, setFileList] = useState([]);
  //這個函數的執行分階段，是從 updating到done的過程
  //這個過程只要上傳圖片內容發生變化就會不斷執行直到全部上傳完畢

  //使用useRef聲明一個暫存倉庫
  const cacheImgList = useRef();

  const onUploadChange = ({ fileList }) => {
    // 接收返回值 result【result代表接收每次上傳完的返回值】
    console.log(fileList);
    // 採取受控的寫法：在最後一次log裡面response
    // 最終react state fileList中存放的數據有response.data.url【代表我們上傳圖片給我們的url數據】
    // 這裡是關鍵位置【處理上傳圖片後的數據和原本在編輯狀態下的數據】，我們需要做數據格式化
    const formatList = fileList.map((file) => {
      /* 不應該直接寫上 setFileList(fileList)，需要把它數據格式化，在傳遞才合理 
    由於 fileList 拿到的是原數據，且它原本是數組，所以可以用map方法，單獨來拿到file對象【注意：file對象也就是2數據大的對象，也就是例如：在 2 的對象裡多了很多數據 response.data，type，size，name等等】
    且在整個上傳圖片的過程中都會 調用onUploadChange函數，只有它完全上傳完畢，response對象才會存在
    - 所以我們可以做一個判斷語句，防止報錯
    --》如果有 response存在就返回url，如果沒有 repsonse代表正在上傳中，直接返回file【代表原本有什麼數據就有什麼，先不把它變成url】
    */
      // 上傳完畢 做數據處理
      if (file.response) {
        return {
          url: file.response.data.url,
        };
      }
      // 否則在上傳中時，不做數據處理
      return file;
    });
    setFileList(formatList); // response在就可以使用裡面的url數據
    /* fileList會在圖片上傳後執行三次
    - 最後一次第三次的狀態才是成功的狀態，才可以獲取 response.data.url
     */

    //同時把圖片列表存入倉庫一份
    cacheImgList.current = formatList;
  };

  //切換圖片
  const [imgCount, setImgCount] = useState(1);
  const radioChange = (e) => {
    console.log("test3");
    //這裡的判斷依據我們採取原始值，不採取經過 useState方法修改之後的數據
    //useState修改之後的數據 無法同步獲取修改之後的新值

    const rawValue = e.target.value;
    console.log(e.target.value);
    // 每次切換時，imgCount會根據單圖/三圖保持一致
    setImgCount(rawValue); // 原始值

    // 從倉庫裡面取到對應的圖片數量 交給我們用來渲染圖片列表的fileList
    // 通過調用setFileList就可以操作數據變化
    if (cacheImgList.current.length === 0) {
      return false;
    }

    if (rawValue === 1) {
      // 如果是單圖模式，就從倉庫裡取到第一張圖，以數組的形式存入fileList
      const img = cacheImgList.current ? cacheImgList.current[0] : [];
      setFileList([img]);
    } else if (rawValue === 3) {
      // 如果是三圖模式，就把倉庫裡所有圖片，以數組的形式存入fileList
      setFileList(cacheImgList.current);
    }
  };

  const navigate = useNavigate();
  // 提交表單
  const onFinish = async (values) => {
    console.log(values);
    // 數據的二次處理，重點是處理cover字段
    const { channel_id, content, title, type } = values;
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        /*
        fileList代表原始的列表【也就是外層的數組】
        item 代表裡面的每一項
        要獲取 item.response.data.url
        圖片列表 images: fileList.map((item) => item.response.data.url)
        - fileList代表原始的列表【也就是外層的數組】
        - 再獲取數組裡的每一項
        - 再從每一項中獲取到它們各自的url
         */
        images: fileList.map((item) => item.url), //
        /*  item.response.data.url), 這裡有問題 
        - 在對數據格式化處理後，可以不用傳遞item.response.data.url，直接傳遞 item.url 就可以【因為最終收集到的數據也是有response存在，因為數據格式化後只為做012的對象的數據一致，避免報錯】
        在編輯狀態下再次更新的數據會有變化，導致和原本顯示的數據會發生不一致的情況
        - 所以在進行數據修改【也就是編輯狀態下】的時候數據和之前的數據是不一致
        - 因為在原有的編輯狀態下，只有 0 和 1 只有 url 和 uid 的屬性
        --》但是在編輯狀態下，重新上傳圖片會多了很多屬性。例如：在 2 的狀態下多了 response.data，type，size，name等等
        所以由於在2的狀態下，我們有很多數據是不需要的，因此在我們上傳圖片之後做了賦值操作
        【因此我們要在onUploadChange函數裡面的setFileList(fileList);做出修改，處理2的數據與0和1的數據，讓它們的數據達成一致】
         */
      },
    };
    // 以上的參數處理成功，就可以調用接口

    // 在編輯的時候要更新接口
    if (id) {
      // params為上面處理好的接口參數
      await http.put(`/mp/articles/${id}?draft=false`, params); //編輯接口【在編輯的時候要調用更新接口來新增接口】
    } else {
      await http.post("/mp/articles?draft=false", params); //新增接口
    }
    //跳轉列表 提示用戶
    navigate("/article");
    message.success(`${id ? "更新成功" : "發佈成功"}`);
  };

  // 編輯功能
  // 文案適配，獲取路由參數id 和 判斷條件
  /* 通過 useSearchParams()該構造函數，可以獲取到 params對象，在裡面可以通過 get()方法拿到它的參數【這是固定的寫法】
   */
  const [params] = useSearchParams();
  const id = params.get("id");
  console.log("route", id);
  // 數據回填 用id調用接口 1. 表單回填 2. 暫存列表 3. upload組件fileList
  // ！！！重點在於數據的處理【如果後端返回的數據和我們需要的對不上，就按照自己需要的要求處理數據】
  const form = useRef(null); // 獲取form的實例對象
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/mp/articles/${id}`); // res用作接收返回值
      const data = res.data;
      console.log(res);
      // 表單數據回填 實例方法
      form.current.setFieldsValue({ ...data, type: data.cover.type }); // 提交之前先處理一步數據，返回數據後，在回填之前再處理一步數據【來回處理數據】
      /* 因為拿到的res是一個完整的詳情數據，如果直接把res傳到setFieldsValue()函數裡，是不正確的。
      因為後端返回的數據可能與我們需要的數據不一致
      */
      // 調用 setFileList方法來回填upload
      const formatImgList = data.cover.images.map((url) => ({ url }));
      // return 的另一種寫法
      // {
      //   // 拿到每個圖片的url
      //   return {
      //     url, // 由對象格式組成的新的數組
      //   };
      // });
      setFileList(formatImgList);
      /* 暫存列表裡也存一份【暫存列表和 fileList 回顯列表保持數據結構統一就可以】
      該暫存列表是為fileList服務的【也就是顯示單圖/三圖/無圖的圖片部份】
      從該邏輯我們可以得知，暫存列表的格式就必須和fileList保持一致
      所以 setFileList(formatImgList); 和 cacheImgList.current 兩者的格式是一樣的
      */
      cacheImgList.current = formatImgList;
    };
    // 必須是編輯狀態，才可以發送請求
    if (id) {
      loadDetail();
      console.log(form.current);
    }
  }, [id]); // 依賴項 - 只發送一次，也就是一上來就發送一次【因為回填只有一次，由於get函數裡面用了id參數，所以需要填寫依賴項id】

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首頁</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? "編輯" : "發佈"}文章</Breadcrumb.Item>
            {/* 視乎const id = params.get("id");有沒有獲取到id，
            通過id作為判斷條件，做一個三元表達式判斷，
            達到在能夠獲取到id的情況就顯示編輯文章，沒有獲取到id就顯示發佈文章
             */}
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={form} // 獲取form的實例對象
        >
          {/* 在 Form裡面用 onFinished回調函數收集所有的表單裡面的參數 */}
          <Form.Item
            label="標題"
            name="title"
            rules={[{ required: true, message: "請輸入文章標題" }]}
          >
            <Input placeholder="請輸入文章標題" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="頻道"
            name="channel_id"
            rules={[{ required: true, message: "請選擇文章頻道" }]}
          >
            <Select placeholder="請選擇文章頻道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>單圖</Radio>
                <Radio value={3}>三圖</Radio>
                <Radio value={0}>無圖</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 根據imgCount數據，控制視圖顯示【只有在單圖或三圖時才會顯示圖片，也就是value大於0才會顯示圖片】 */}
            {imgCount > 0 && ( // 如果imgCount > 0 才會有後面的 Upload標籤的代碼運行，否則就沒有【這裡也就等於判斷語句】
              // 所以這裡的 imgCount 是 1 或 3 都可以運行 Upload標籤裡的代碼，也就是用作顯示上傳Uplaod組件
              // 但如果是 0 就是無圖模式，什麼都不顯示就可以
              <Upload
                name="image" //處理圖片上傳
                listType="picture-card" // 指定當前顯示的樣式 - 圖片卡樣式
                className="avatar-uploader"
                showUploadList // 在上傳的時候要不要顯示已經上傳的所有的圖片閱覽列表，默認是不顯示，加了showUploadList屬性代表要顯示
                action="http://geek.itheima.net/v1_0/upload" // action代表配置要上傳的url接口地址
                fileList={fileList} // 受控的形式，通過react狀態去控制組件的狀態叫受控【這裡是通過react的fileList-存取url的一個數組列表，來控制fileList的內部列表-目的是能讓fileList裡面的狀態跟外面的保持一致】
                // ！！！重點！！！- fileList 是用作控制圖片顯示！！！決定當前顯示多少張圖片的最重要的屬性
                /* fileList是決定當前到底是要回顯那些列表的，
                - 所以如果想要在fileList放東西，需要調用setFileList方法
                */
                onChange={onUploadChange} // onChange代表當每次上傳之後會發生變化【也就是每次上傳之後列表發生變化後，會自動執行該回調onChange，在該回調裡面會把上傳之後的列表存到react狀態裡，將來點擊保存時，需要提交給後端】
                multiple={imgCount > 1} // multiple={imgCount > 1}控制是否支持多張圖片上傳模式的作用
                maxCount={imgCount} // maxCount屬性用作控制最大的上傳數量
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          {/* 這裡的富文本組件，已經被Form.Item控制 */}
          {/* 它的輸入內容 會在 onFinished 回調中收集起來 */}
          <Form.Item
            label="內容"
            name="content"
            rules={[{ required: true, message: "請輸入文章內容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? "更新" : "發佈"}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);

/* 
通過 ref 可以獲取真實DOM 或者 獲取一個組件實例
ref另一個作用：
- 就是作為一個暫存倉庫，可以用作聲明一個小倉庫，把一些想要存起來的東西暫時存起來
- 存起來後的功效就是在整個組件重新渲染的時候，這個地方不受影響，它仍然一直存在內存裡面
- 在你需要取它的時候，可以在任意時候取到，因為它是一直存在的，但是也可以把它刪除掉
-》所以可以通過 useRef創建一個暫存倉庫，在上存完畢圖片的時候把圖片列表存入，且以數組的形式存入fileList
 */
