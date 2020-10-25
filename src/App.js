import './App.css';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './modules';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import Log from './components/Log';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Router';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
      <Log />
    </Provider>
  );
}

export default App;
