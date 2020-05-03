import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { setModel } from 'he-core';
import testmodel from './testmodel';

class Attention extends React.Component {
  componentDidMount() {}

  render() {
    const { test } = this.props;
    return (
      <div>
        <h1>关注有礼{test.join(',')}</h1>
      </div>
    );
  }
}


Attention.propTypes = {
  test: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const {
    test,
  } = state['jianghe/test'];

  return {
    test,
  };
}

// 设置model
setModel(testmodel);

export default connect(mapStateToProps)(Attention);
