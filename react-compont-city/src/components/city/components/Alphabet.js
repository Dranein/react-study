import React from 'react';

export default class Alphabet extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	isTouch: false // 用来规定触摸区域，不是字母区域，不能滑动
    }
  }
  componentDidMount() {
  	window.onload = () => {

	  	let ulDom = this.refs['ref_ul'];
	  	console.log(ulDom)
	  	console.log(ulDom.childNodes[0])
  	}
  	// console.log(ulDom.childNodes[0].offsetHeight)
  	// console.log(ulDom.childNodes[0].clientHeight)

    
  }
  handleClick(key) {
    this.props.onClick(key);
  }
  handleTouchStart(e) {
  	this.setState({
  		isTouch: true
  	})
  }
  handleTouchMove(e) {
    if (this.state.isTouch) {
      const startY =  this.refs['A'].offsetTop;
      const touchY = e.touches[0].clientY - 80;
      let INDEX = Math.floor((touchY-startY)/18.4);
      if (INDEX < 0) INDEX = 0;
      if (INDEX > this.props.list.length) {
      	INDEX = this.props.list.length;
      }
      let key = this.props.list[INDEX];
      if (key) {
      	this.handleClick(key)
      }
    }
  }
  handleTouchEnd(e) {
  	this.setState({
  		isTouch: false
  	})
  }
	render() {
    let objlist = this.props.list || [];
    return (
      <div className="city-alphabet">
        <ul 
        	ref="ref_ul"
        	onTouchStart={this.handleTouchStart.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}>
          {objlist.map(item =>
            <li
              key={item}
              ref={item}
              className="city-alphabet-item"
              onClick={this.handleClick.bind(this, item)} >{item}</li>
          )}
        </ul>
      </div>
    );
  }
}
