import React from 'react';
import './city.scss';

import Header from './components/Header'
import List from './components/List'
import Alphabet from './components/Alphabet'

export default class City extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      cityList: [],
      curKey: ''
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
  handleAlphabetClick (key) {
    if (key !== this.state.curKey) {
      this.setState({
        curKey: key
      })
    }
  }
	render() {
    let keyList = this.state.cityList.cities && Object.keys(this.state.cityList.cities);
		return (
			<div className="city">
        <Header handleBack={this.handleBack.bind(this)} />
        <List
          list={this.state.cityList} 
          curKey={this.state.curKey}
          handleChangeCity={this.handleChangeCity.bind(this)} />
        <Alphabet 
          list={keyList} 
          onClick={this.handleAlphabetClick.bind(this)} />
      </div>
		);
	}
}
