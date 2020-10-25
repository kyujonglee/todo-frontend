import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './modules';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import Log from './components/Log';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <TodoForm />
      <TodoList />
      <Log />
    </Provider>
  );
}

export default App;
