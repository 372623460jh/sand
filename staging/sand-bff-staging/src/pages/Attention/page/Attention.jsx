import React from '@jianghe/sand-core/react';
import { connect, PropTypes, setModel } from '@jianghe/sand-core';
import attentionModel from '../model/attention';

class Attention extends React.PureComponent {
  static propTypes = {
    test: PropTypes.array.isRequired,
  };

  render() {
    const { test } = this.props;
    return (
      <div>
        <h1>
          attention model
          {test.join(',')}
        </h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    test,
  } = state['jianghe/test'];
  return {
    test,
  };
}

// 设置model
setModel(attentionModel);

export default connect(mapStateToProps)(Attention);
