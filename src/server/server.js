import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import { END } from 'redux-saga';
import routes from '../components/Router';
import { createStore } from '../lib/helpers';
import renderer from './renderer';
import path from 'path';
import morgan from 'morgan';

const app = express();

app.use(express.static(path.resolve('build')));
app.use(morgan('combined'));

app.get('*', async (req, res) => {
  console.log('path', req.path);
  const { store, sagaTask } = createStore();

  store.dispatch(END);
  await sagaTask.toPromise();

  const promises = matchRoutes(routes, req.path)
    .map(async ({ route }) => {
      const { component } = route;
      const loader = component?.loadData;
      loader && (await loader({ store, req }));
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const content = renderer({ req, store });
    res.send(content);
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ app listening port : ${PORT}`);
});
