import { Button, Colors, InputGroup, Intent } from '@blueprintjs/core';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodoThunk } from '../modules/todos';
import { AppToaster } from './Toaster';

function TodoForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await dispatch(createTodoThunk({ title, content }));
        AppToaster.show({ message: 'todo added.', timeout: 1500 });
      } catch {
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
        Todo 생성
      </Button>
    </form>
  );
}

export default TodoForm;
