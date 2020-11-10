import './App.css';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './modules';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import Log from './components/Log';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './components/Router';
import { renderRoutes } from 'react-router-config';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, sagaMiddleware],
  preloadedState: window.__INITIAL_STATE__,
});

sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <Router>{renderRoutes(routes)}</Router>
      <Log />
    </Provider>
  );
}

export default App;
