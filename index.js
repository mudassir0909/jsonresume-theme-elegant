const ReactDOMServer = require('react-dom/server');
const React = require('react');
const { ThemeElegant } = require('./theme');
const fs = require('fs');
const path = require('path');

function render() {
  const reactElementString = ReactDOMServer.renderToString(
    React.createElement(ThemeElegant),
  );
  const componentjs = fs.readFileSync(path.join(__dirname, './theme.js')).toString();
  return buildHtml(reactElementString, 'ThemeElegant', componentjs);
}

function buildHtml(reactElementString, reactElementTag, componentjs) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>React SSR</title>
    </head>
    <body>
      <div id="root">${reactElementString}</div>
      <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
      <script>
       ${componentjs}
      </script>
      <script>
        window.addEventListener("DOMContentLoaded", function() {
          ReactDOM.hydrate(
            React.createElement(${ reactElementTag }),
            document.getElementById('root')
          );
        });
      </script>
    </body>
  </html>
  `;
}

module.exports = { render };
