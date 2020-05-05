/* eslint-disable */
/*!
 * index-entry.js v1.0.0
 * (c) 2019-2020 Jiang He
 * Released under the MIT License.
 */
import React from '@jianghe/sand-core/react';
import ReactDOM from '@jianghe/sand-core/react-dom';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".index-module_list__3sjAG {\n  margin: 100px auto;\n  width: 800px;\n}\n.index-module_list__3sjAG .index-module_listItem__2tf9U {\n  margin: 20px;\n  font-size: 16px;\n}\n";
var styles = {"list":"index-module_list__3sjAG","listItem":"index-module_listItem__2tf9U"};
styleInject(css_248z);

class Index extends React.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      // eslint-disable-next-line no-undef
      entryMap: __entryMap__
    });
  }

  renderRouter() {
    var {
      entryMap
    } = this.state;
    var entryMapArr = Object.keys(entryMap);
    var arr = [];
    entryMapArr.forEach(item => {
      if (item !== 'index') {
        arr.push( /*#__PURE__*/React.createElement("div", {
          key: item,
          className: styles.listItem
        }, /*#__PURE__*/React.createElement("a", {
          href: "/".concat(item, ".html")
        }, item), /*#__PURE__*/React.createElement("br", null)));
      }
    });
    return arr;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, this.renderRouter());
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Index, null), document.getElementById('root'));
//# sourceMappingURL=index-entry.js.map
