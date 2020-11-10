import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import routes from '../components/Router';
import fs from 'fs';
import path from 'path';

const renderer = async ({ req, store }) => {
  let html = await fs.promises.readFile(
    path.resolve('build', 'index.html'),
    'utf8'
  );
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>{renderRoutes(routes)}</StaticRouter>
    </Provider>
  );
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${content}</div>
     <script>window.__INITIAL_STATE__ = ${serialize(store.getState())}</script>
    `
  );
  console.log('html', html);
  return html;

  // return `
  //       <!DOCTYPE html>
  //       <html lang="ko">
  //           <head>
  //               <meta charset="utf-8" />
  //               <meta name="viewport" content="width=device-width, initial-scale=1" />
  //           </head>
  //           <body>
  //               <div id="root">${content}</div>
  //               <script>
  //                   window.__INITIAL_STATE__ = ${serialize(store.getState())}
  //               </script>
  //           </body>
  //       </html>
  //   `;
};

export default renderer;
