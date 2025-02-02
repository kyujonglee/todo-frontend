import React from 'react';
import { Colors } from '@blueprintjs/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../modules/todos';
import Loader from './Loader';
import Todo from './Todo';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const loading = useSelector((state) => state.pending[getTodos.type]);
  useEffect(() => {
    (!todos || !todos.length) && dispatch(getTodos.request());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>TodoList</h2>
      {loading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr style={{ color: Colors.COBALT1 }}>
              <th>id</th>
              <th>title</th>
              <th>content</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default TodoList;
