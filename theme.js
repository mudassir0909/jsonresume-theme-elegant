const isBrowser = function () {
  try {
    return this === window;
  } catch (e) {
    return false;
  }
}();

(function (exports) {
  let React;

  if (isBrowser) {
    React = window.React;
  } else {
    React = require('react');
  }

  function Foo(props) {
    const [click, setClick] = React.useState(0);

    function handleClick() {
      setClick(click + 1);
    }

    return /*#__PURE__*/React.createElement("button", {
      onClick: handleClick
    }, "Clicked: ", click);
  }

  exports.Foo = Foo;
})(typeof exports === 'undefined' ? this : exports);
