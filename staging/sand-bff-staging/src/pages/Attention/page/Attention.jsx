import React from '@jianghe/sand-core/react';
import { setModel } from '@jianghe/sand-core';
import PropTypes from '@jianghe/sand-core/prop-types';
import { connect } from '@jianghe/sand-core/react-redux';
import { NavLink } from '@jianghe/sand-core/router-dom';
import { Breadcrumb, Button } from 'antd';
import attentionModel from '../model/attention';

class Attention extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    getFetch: PropTypes.func.isRequired,
    setFetch: PropTypes.func.isRequired,
  };

  getUserInfo = () => {
    const { getFetch } = this.props;
    getFetch({
      userName: 'jianghe1993',
    });
  }

  setUserInfo = () => {
    const { setFetch } = this.props;
    setFetch({
      userId: '112233112233',
      userName: 'jianghe0417',
    });
  }

  render() {
    const { userId, userName } = this.props;
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/spa">首页</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Attention</Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <span>attention model&nbsp;</span>
          <Button onClick={this.getUserInfo}>getUserInfo</Button>
          <Button onClick={this.setUserInfo}>setUserInfo</Button>
          <br />
          userId:
          {userId}
          <br />
          userName:
          {userName}
        </h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    userId,
    userName,
  } = state['jianghe/test'];
  return {
    userId,
    userName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFetch: (params) => {
      dispatch({
        type: 'jianghe/test/TEST_FETCH',
        payload: params,
      });
    },
    setFetch: (params) => {
      dispatch({
        type: 'jianghe/test/SET_FETCH',
        payload: params,
      });
    },
  };
}

// 设置model
setModel(attentionModel);

export default connect(mapStateToProps, mapDispatchToProps)(Attention);
