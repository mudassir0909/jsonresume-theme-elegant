(function (exports) {
  // Since this code runs in both browser and node environment we need to resolve React separately
  const React = isBrowser() ? window.React : require('react');

  function ThemeElegant() {
    return /*#__PURE__*/React.createElement("h1", null, "Welcome to theme elegant");
  }

  exports.ThemeElegant = ThemeElegant;
})(typeof exports === 'undefined' ? this : exports);

function isBrowser() {
  try {
    return this === window;
  } catch (e) {
    return false;
  }
}
