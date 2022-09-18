#React 面試題：

1. 咩係 JSX？

- 概念：JSX 係 JavaScriptXML(HTML)既縮寫，表示係 JS 代碼到寫 HTML 結構
- 作用：係 React 創建 HTML 結構（頁面 UI 結構）
- ！注意！JSX 並唔係標準既 JS 語法，係 JS 既語法擴展，瀏覽器默認係唔會識別，係架構（腳手架）內置的@babel/plugin-transform-react-jsx 包，用黎解析呢個語法！
- 寫 UI 就好似寫普通 HTML 一樣，以聲明式寫，而唔係用【命令式】實現。
- JSX 用 js 表達式
—》語法：{JS 表達式}
const name = "柴柴"
  <h1>你好，我叫{name}</h1> //你好，我叫柴柴

可以使用既表達式包括:

- 字符串，數值，布爾值，null，undeinfed，object([] / {})
- 1 + 2、'abc'.split('')、['a', 'b'].join('-')
- fn()
  特別注意：
  if 語句 / switch-case 語句 / 變量聲明語句，呢啲都係語句，唔係表達式，唔可以出現係{}中

### JSX 列表渲染

- 頁面既構建離不開重複既列表結構，例如：歌曲列表，商品列表等等，所以可以透過運用數組既 map 方法實現 JSX 列表渲染
  ！！！注意！！！需要為遍歷 map 方法既遍歷項添加 key 屬性
  --》key 係當前列表中要唯一既字符串或者數值（String / Number）
  --》如果列表中有如 id 呢種唯一值，就用 id 作為 key 值
  --》如果列表中無好似 id 呢種唯一值，就可以用 index（下標）黎作為 key 值

### JSX 條件渲染 - 係 JSX 中實現條件渲染

- 作用：根據是否滿足條件形成 HTML 結構，比如 Loading 效果
- 實現：（可以運用三元運算符 或 邏輯與(&&)運算符）
  例子：
  // 用一個布爾值
  const flag = true
  function App() {
  return (
  <div className="App">
  {/_ 條件渲染字符串 _/}
  {flag ? 'react 真有趣' : 'vue 真有趣'}
  {/_ 條件渲染標籤/組件 _/}
  {flag ? <span>this is span</span> : null}
  </div>
  )
  }
  export default App

### JSX 樣式處理（係 JSX 中實現 css 樣式處理）

- 類名 - className （推薦該用法）
  例子：app.css 文件：
  .title {
  font-size: 30px;
  color: blue;
  }
- 類名 - className（動態類名控制）
  例子：app.js 文件：
  import './app.css'
  const showTitle = true
  function App() {
  return (
  <div className="App">
  <div className={ showTitle ? 'title' : ''}>this is a div</div>
  </div>
  )
  }
  export default App

## JSX 注意事項（掌握 JSX 係實際應用時既注意事項）

a. JSX 必須有一個根節點，如果無根節點，可以用<></>幽靈節點替代
b. 所有標籤必須形成閉合，成對閉合或者自閉合都可以
c. JSX 中既語法更加貼近 JS 語法，屬性名用駝峰命名法。例如：class 寫做 className，及 for 寫做 htmlFor
d. JSX 支持多行（換行），如果需要換行，需要用()包起，防止 bug 出現

2. 咩係組件化？

- 組件係 react 中最重要既內容，組件可以通過好似砌積木既方式合併成一個完整既頁面，通過【組件既抽象】可以【增加復用能力】同提高可維護性。

3. create-react-app 既作用？

- Create-react-app 係一個 react 官方支持建立 react 單頁應用程序既方法
- 可以係一個目錄建立一個名為 my-app 既目錄，係呢個目錄會建立初始項目結構並安裝依賴項目：例如：包含有幾種項目文件，其中有 public / src / package.json

a. 當中依賴文件夾 package.json 主要用途係：
--》 包含 my-app 目錄既主要 node 內容，我地所需要用依賴第三方既包
--〉而 package.json 裡面既 script 就係方便我地用 npm start 啟動項目
b. 而 public 文件主要管理靜態資源 例如：index.html 係項目既首頁模板
c. src 係最重要既目錄，存放既係我地項目既所有代碼
包括：
App.css 組件樣式
App.js
index.css 入口樣式
index.js 所有代碼既入口文件，成個程序運作既入口文件

4. React 組件基礎

- 函數組件：用 JS 既函數（或箭頭函數）創建既組件，就稱為 函數組件
  注意說明：
  a. 組件既名稱必須【首字母大寫】，react 內部會根據呢個黎判斷係組件定係普通既 HTML 標籤。
  b. 函數組件必須【有返回值】，表示該組件既 UI 結構，如果唔需要渲染任何內容，則返回 null。
  c. 組件就似 HTML 標籤一樣可以被渲染到頁面中。組件表示既係一段結構內容，對於函數組件黎講，渲染既內容係函數既返回值就係對應既內容。
  d. 用函數名稱作為組件標籤名稱，可以成對出現，都可以自閉合。
- 類組件：用 ES6 既 class 創建既組件，叫做類（class）組件
  注意說明：
  a. 類名稱都必須以【大寫字母開頭】
  b. 類組件應該繼承 React.Component 父類，從而用父類中提供既方法或屬性
  c. 類組件必須提供 render 方法【render 方法必須有返回值】表示該組件既 UI 結構

5. 函數組件既事件綁定（能夠獨立綁定任何事件並能獲取到事件對象 e）

- 如何綁定事件？
  --》語法：on + 事件名稱 = { 事件處理程序 } ，例如：<div onClick={ onClick }></div>
  注意說明：react 事件採用駝峰命名法：例如：onMouseEnter，onFocus
- 獲取事件對象？
  --》獲取事件對象 e，只需要係回調函數中補充一個形參 e，即可得到！
  例子：
  // 函數組件
  function HelloFn () {
  // 定義事件回調函數
  const clickHandler = (e) => {
  console.log('事件被觸發了', e)
  }
  return (
  // 綁定事件
  <button onClick={clickHandler}>click me!</button>
  )
  }
- 傳遞額外參數？
  --》思路：改造事件綁定為箭頭函數，係箭頭函數中完成參數既傳遞
  例子：

import React from "react"

// 如何获取额外的参数？
// onClick={ onDel } -> onClick={ () => onDel(id) }
// 注意: 一定不要在模板中写出函数调用的代码 onClick = { onDel(id) } bad!!!!!!

const TestComponent = () => {
const list = [
{
id: 1001,
name: 'react'
},
{
id: 1002,
name: 'vue'
}
]
const onDel = (e, id) => {
console.log(e, id)
}
return (

<ul>
{list.map(item =>（
<li key={item.id}>
{item.name}
<button onClick={(e) => onDel(e, item.id)}>x</button>
</li>
))}
</ul>
)
}

function App () {
return (

<div>
<TestComponent />
</div>
)
}

export default App

- 類組件的事件綁定？
  // 類組件中既事件綁定
  // 整體既套路都係一致， 同函數組件無太多唔同
  // 唯一需要注意既係：因為處於 class 類環境下，所以定義事件回調函數 以及 綁定佢既寫法上有唔同
  // 定義既時候: class Fields 語法  
  // 用既時候: 需要借助 this 關鍵詞獲取

// 注意事項: 之所以要採取 class Fields 寫法係為佐保證 this 既指向正确 永遠指向當前既組件實例

import React from "react"
class CComponent extends React.Component {
// class Fields
clickHandler = (e, num) => {
// 呢到既 this 指向既係正確既當前既組件實例對象
// 可以非常方便咁通過 this 關鍵詞拿到組件實例身上既其他屬性或方法
console.log(this)
}

clickHandler1 () {
// 呢到既 this 唔係指向當前既組件實例對象 - undefined， 存在 this 丟失問題
console.log(this)
}

render () {
return (

<div>
<button onClick={(e) => this.clickHandler(e, '123')}>click me</button>
<button onClick={this.clickHandler1}>click me</button>
</div>
)
}
}

function App () {
return (

<div>
<CComponent />
</div>
)
}

export default App

6. 組件狀態（可以為組件添加狀態同修改狀態既值）

- 係 React hook 之前，函數式組件係無自己既狀態，所以我地先統一通過類組件講解
  a. 初始化狀態
  b. 視圖讀取初始狀態
  c. 修改狀態
  d. 視圖使用新狀態自動更新

- a. 初始化狀態
  --》通過 class 既實例屬性 state 黎初始化
  --》state 既值係一個對象結構，表示一個組件可以有多個數據狀態
  例子：
  class Counter extends React.Component {
  // 初始化狀態
  state = {
  count: 0
  }
  render() {
  return <button>計數器</button>
  }
  }
- b. 讀取狀態
  --》通過 this.state 黎讀取狀態
  例子：
  class Counter extends React.Component {
  // 初始化狀態
  state = {
  count: 0
  }
  render() {
  // 讀取狀態
  return <button>計數器{this.state.count}</button>
  }
  }
- c. 修改狀態
  --》語法：this.setState({ 要修改既部份數據 })
  --》setState 方法作用：1.修改 state 中既數據狀態 2. 更新 UI
  --》思路：數據驅動視圖，即係只要修改數據狀態，咁頁面就會自動刷新，無需手動操作 DOM
  注意事項：唔好直接修改 state 中既值，必須通過 setState 方法進行修改
  例子：
  class Counter extends React.Component {
  // 定義數據
  state = {
  count: 0
  }
  // 定義修改數據既方法
  setCount = () => {
  this.setState({
  count: this.state.count + 1
  })
  }
  // 用數據，並綁定事件
  render () {
  return <button onClick={this.setCount}>{this.state.count}</button>
  }
  }

7. React 既狀態係不可變（理解不可變既意義同知道係實際開發中如何修改狀態）

- 概念：唔好直接修改狀態既值，而係基於當前狀態創建新既狀態值
  a. 錯誤咁直接修改
  例子：
  state = {
  count : 0,
  list: [1,2,3],
  person: {
  name:'jack',
  age:18
  }
  }
  // 直接修改簡單類型 Number
  this.state.count++
  ++this.state.count
  this.state.count += 1
  this.state.count = 1

// 直接修改數組
this.state.list.push(123)
this.state.list.spice(1,1)

// 直接修改對象
this.state.person.name = 'rose'

b. 基於當前狀態創建新值
this.setState({
count: this.state.count + 1
list: [...this.state.list, 4],
person: {
...this.state.person,
// 覆蓋原來既屬性，就可以達到修改對象中屬性既目的
name: 'rose'
}
})

8. 表單處理（可以用手控組件既方式獲取文本既值）

- 用 React 處理表單元素，一般有兩種方式：
  a. 受控組件（推薦使用）
  b. 非受控組件（了解即可）
  --》a. 受控表單組件
- 咩係受控表單組件？ input 框自己既狀態被 React 組件狀態控制
  --》React 組件既狀態既地方係 state 中，input 表單元素都有自己既狀態係 value 中，React 將 state 與表單元素既值（value）綁定一齊，
  由 state 既值黎控制表單元素既值，從而保證單一數據源特性。
  實現步驟：
- 以獲取文本框既值為例，受控組件既運用步驟如下：
  a. 係組件既 state 中聲明一個組件既狀態數據
  b. 將狀態數據設置為 input 標籤元素既 value 屬性既值
  c. 為 input 添加 change 事件，係事件處理程序中，通過事件對象 e 獲取到當前文本框既值（即用戶當前輸入既值）
  d. 調用 setState 方法，將文本框既值作為 state 狀態既最新值
  例子：
  import React from 'react'

class InputComponent extends React.Component {
// 聲明組件狀態
state = {
message: 'this is message',
}
// 聲明事件回調函數
changeHandler = (e) => {
this.setState({ message: e.target.value })
}
render () {
return (

<div>
{/_ 綁定 value 綁定事件_/}
<input value={this.state.message} onChange={this.changeHandler} />
</div>
)
}
}

function App () {
return (

<div className="App">
<InputComponent />
</div>
)
}
export default App

b. 非受控表單組件

- 咩係非受控組件？
  --》非受控組件就係通過手動操作 dom 既方式獲取文本框既值，文本框既狀態不受 react 組件既 state 中既狀態控制，直接通過原生 dom 獲取輸入框既值
  實現步驟：
  a. 導入 createRef 函數
  b. 調用 createRef 函數，創建一個 ref 對象，存儲到名為 msgRef 既實例屬性中
  c. 為 input 添加 ref 屬性，值為 msgRef
  d. 係按鈕既事件處理程序中，通過 msgRef.current 即可拿到 input 對應既 dom 元素，而其中 msgRef.current.value 拿到既就係文本框既值
  例子：
  import React, { createRef } from 'react'

class InputComponent extends React.Component {
// 使用 createRef 产生一个存放 dom 的对象容器
msgRef = createRef()

changeHandler = () => {
console.log(this.msgRef.current.value)
}

render() {
return (
<div>
{/_ ref 绑定 获取真实 dom _/}
<input ref={this.msgRef} />
<button onClick={this.changeHandler}>click</button>
</div>
)
}
}

function App () {
return (
<div className="App">
<InputComponent />
</div>
)
}
export default App
