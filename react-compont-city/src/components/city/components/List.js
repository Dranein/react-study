import React from 'react';
import BScroll from '@better-scroll/core'

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }
	componentDidUpdate() {
    let scrollObj = new BScroll('.city-list', {
      click: true
    });
    if (scrollObj && this.props.curKey) {
      // 父级是否有传递字母过来，有的话需要滚动到相应的未知
      const ele = this.refs[this.props.curKey];
      scrollObj.scrollToElement(ele);
    }
  }
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
      <div className="city-list">
        <div className="content">
          {html_HotList}
          {html_cityList}
        </div>
      </div>
    );
	}
}
