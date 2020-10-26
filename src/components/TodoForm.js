import { Button, Colors, InputGroup, Intent } from '@blueprintjs/core';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, createTodoThunk } from '../modules/todos';
import { AppToaster } from './Toaster';

function TodoForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.pending[createTodo.type]);
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await dispatch(createTodoThunk({ title, content }));
        AppToaster.show({ message: 'todo added.', timeout: 1500 });
      } catch {
        AppToaster.show({ message: 'error: todo added.', timeout: 1500 });
      } finally {
        setTitle('');
        setContent('');
      }
    },
    [content, dispatch, title]
  );

  return (
    <form onSubmit={onSubmit}>
      <InputGroup
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        large={false}
        placeholder="title"
        required
      />
      <InputGroup
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        large={false}
        placeholder="content"
      />
      <Button type="submit" intent={Intent.NONE} color={Colors.COBALT1}>
        {loading ? 'loading...' : 'Todo 생성'}
      </Button>
    </form>
  );
}

export default TodoForm;
