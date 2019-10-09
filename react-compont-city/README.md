[gitHub地址](https://github.com/Dranein/react-study/tree/master/react-compont-city)

**预览图**
![预览图](https://github.com/Dranein/react-study/blob/master/img/react_city.jpg?raw=true)

**新建项目**

这里使用的cli是 [Create React App](https://github.com/facebook/create-react-app)

npm init react-app react-compont-city
cd react-compont-city
npm start

删除掉一些没有用到的文件和注释

**在项目中我们添加一下依赖**

-- package.json  （添加之后记得npm install一下哦）
```json
"@better-scroll/core": "^2.0.0-alpha.19",  // 滚动插件
"node-sass": "^4.12.0",  // sass支持
```

**目录结构**

* src
    * components
        * City.js   *-组件的入口文件*
        * City.scss * -组件样式文件*
        * components  *+存放city模块组件文件夹*
            *  Header.js
            *  List.js
            *  Alphabet.js
    * App.js

这里我们将整个城市选择组件划分为三个部分：
* 顶部（Header）
* 列表（List）
* 右边字母列（Alphabet）


我们将City组件在App.js中引入

-- App.js
```javascript
import React from 'react';
import './App.css';
import City from './components/city/City';

function App() {
  return (
    <div className="App">
        <City></City>
    </div>
  );
}
export default App;
```

将我们的三个模块添加到City中

-- City.js
```javascript
import React from 'react';
import './city.scss';

import Header from './components/Header'
import List from './components/List'
import Alphabet from './components/Alphabet'

export default class City extends React.Component {
    render() {
        return (
            <div className="city">
                <Header />
                <List />
                <Alphabet />
            </div>
        );
    }
}
```

到此就把整个结构整理完了，接下来逐个模块来实现


### Header.js
-- Header.js
```javascript
import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="city-header">
        <div className="city-header-top">
          <div className="city-header-back" onClick={this.props.handleBack}>返回</div>城市选择
        </div>
      </div>
    );
  }
}
```
顶部模块比较简单，左边一个返回键，中间一个title
返回的事件我们在父级City中处理，所以直接触发父级传入的方法 `handleBack`

-- City.js
```javascript
// ...
handleBack(){
    console.log('返回') //这里我们没有做路由，先直接console返回
}
render() {
    return (
        <div className="city">
            <Header handleBack={this.handleBack.bind(this)}/>
            <List />
            <Alphabet />
        </div>
    );
}
// ...
```

### 获取城市列表
城市列表的获取在City.js中完成，我们在public中新建一个有城市数据的json文件 city.json

* 然后用fetch模拟请求城市数据
* 将城市数据传入给List组件
* 并传入一个城市点击事件handleChangeCity

-- City.js
```javascript
// ...
export default class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityList: []
        }
    }
    componentDidMount() {
        this.getCityList();
    }
    getCityList() {
        fetch('city.json').then((res) => {
            return res.json();
        }).then((res) => {
            this.setState({
                cityList: res.data
            })
        })
    }
    handleBack(){
        console.log('返回')
    }
    handleChangeCity(item) {
       console.log(item)
    }
    render() {
        return (
            <div className="city">
                <Header handleBack={this.handleBack.bind(this)} />
                <List
                    list={this.state.cityList} 
                    handleChangeCity={this.handleChangeCity.bind(this)} />
                <Alphabet />
            </div>
        );
    }
}
```
在getCityList()中请求城市数据，并传入List组件
这里涉及到props和state，可以先了解一下两者的区别 [react中的state和props](
https://www.jianshu.com/p/2f6d81a15d81)
以及componentDidMount和后续用到的componentDidUpdate函数   [React 组件生命周期](https://www.runoob.com/react/react-component-life-cycle.html)

### List.js
城市列表分为两个部分，热门城市和城市列表
分别为`list.hotCities`和`list.cities`
为了更加清晰的展示，我们将这两块分开
onClick事件点击触发父级City传入的handleChangeCity，并将该城市信息带过去
-- List.js
```javascript
// ...
render() {
    let objlist = this.props.list.cities || [];
    let objHotlist = this.props.list.hotCities || [];
    let handleChangeCity = this.props.handleChangeCity;
    let html_HotList = (
      <div className="city-list-block">
        <div className="city-list-title">热门城市</div>
        <div className="city-list-buttonWarpper">
          {objHotlist.map(item =>
            <div
              key={'hot'+item.id}
              className="city-list-button"
              onClick={handleChangeCity.bind(this, item)}>{item.name}</div>
          )}
        </div>
      </div>
    )
    let html_cityList = (
      Object.keys(objlist).map(key =>
        <div ref={key} key={key} className="city-list-block">
          <div className="city-list-title">{key}</div>
          {objlist[key].map(item =>
            <div
              key={item.id}
              className="city-list-item"
              onClick={handleChangeCity.bind(this, item)}>{item.name}</div>
          )}
        </div>
      )
    )
    return (
      <div className="city-list scroll_wrapper">
        <div className="content">
          {html_HotList}
          {html_cityList}
        </div>
      </div>
    );
  }
}
```
### 使用better-scroll让List.js可以滑动起来
-- List.js
```javascript
import BScroll from '@better-scroll/core' //引入better-scroll

//...
componentDidUpdate(prevProps, prevState) {
    if (prevProps.list !== this.props) {
        new BScroll('.city-list', {
            click: true
        });
    }
}
 //...
```
在componentDidUpdate周期中我们初始化 better-scroll，传入List组件最外层的css（'.city-list'）


### Alphabet.js
Alphabet是城市选择组件的右边字母列模块，我们要实现点击已经滑动来让List滚动到指定的位置

## 未完待续


[gitHub地址](https://github.com/Dranein/react-study/tree/master/react-compont-city)

联系：dranein@163.com