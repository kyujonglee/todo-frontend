import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../modules/todos';
import Todo from './Todo';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    !todos && dispatch(getTodos.request());
  }, [dispatch, todos]);

  console.log(todos);
  return (
    <table>
      <tbody>
        <Todo />
      </tbody>
    </table>
  );
}

export default TodoList;
