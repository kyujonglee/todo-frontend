import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import routes from '../components/Router';

const renderer = ({ req, store }) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>{renderRoutes(routes)}</StaticRouter>
    </Provider>
  );

  return `
        <!DOCTYPE html>
        <html lang="ko">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__INITIAL_STATE__ = ${serialize(store.getState())}
                </script>
            </body>
        </html>
    `;
};

export default renderer;
