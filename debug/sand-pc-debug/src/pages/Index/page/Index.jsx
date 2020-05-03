import React from 'react';
import { NavLink } from 'react-router-dom';

class Index extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>首页</h1>
        <NavLink to="/book">去新版生活号首页</NavLink>
      </div>
    );
  }
}

export default Index;
