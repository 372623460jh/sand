import React from '@jianghe/sand-core/react';
import { setModel } from '@jianghe/sand-core/esm/sand-core';
import PropTypes from '@jianghe/sand-core/prop-types';
import { connect } from '@jianghe/sand-core/react-redux';
import { NavLink } from '@jianghe/sand-core/router-dom';
import { Breadcrumb } from 'antd';
import attentionModel from '../model/attention';

class Attention extends React.PureComponent {
  static propTypes = {
    test: PropTypes.array.isRequired,
  };

  render() {
    const { test } = this.props;
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
          {test.join(',')}
        </h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { test } = state['jianghe/test'];
  return {
    test,
  };
}

// 设置model
setModel(attentionModel);

export default connect(mapStateToProps)(Attention);
