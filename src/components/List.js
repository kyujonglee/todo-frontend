import { getTodos } from '../modules/todos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function List() {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}

async function loadData({ store }) {
  store.dispatch(getTodos.request());
}

List.loadData = loadData;

export default List;
