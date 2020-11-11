import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import { END } from 'redux-saga';
import routes from '../components/Router';
import { createStore } from '../lib/helpers';
import renderer from './renderer';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';

const app = express();

app.use(morgan('common'));
app.use('/static', express.static(path.resolve('build', 'static')));
app.use(favicon(path.resolve('build', 'favicon.ico')));

app.get('*', async (req, res) => {
  const { store, sagaTask } = createStore();

  const promises = matchRoutes(routes, req.path)
    .map(async ({ route, match }) => {
      const { component } = route;
      const loader = component?.loadData;
      loader && (await loader({ store, match }));
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    })
    .filter((promise) => promise);

  await Promise.all(promises);

  store.dispatch(END);
  await sagaTask.toPromise();

  const content = await renderer({ req, store });
  res.send(content);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`✅ app listening port : ${PORT}`);
});
