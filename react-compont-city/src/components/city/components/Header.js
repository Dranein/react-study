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
