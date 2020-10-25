import { useCallback } from 'react';
import { AppToaster } from './Toaster';
import { Colors, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { removeTodoThunk } from '../modules/todos';
import { useDispatch } from 'react-redux';

function Todo({ title, content, id }) {
  const dispatch = useDispatch();
  const handleRemove = useCallback(async () => {
    try {
      await dispatch(removeTodoThunk(id));
      AppToaster.show({ message: `Todo( id:${id} ) removed.`, timeout: 1000 });
    } catch (e) {
      AppToaster.show({
        message: `there is an error (todo removed)`,
        timeout: 1000,
      });
    }
  }, [dispatch, id]);
  return (
    <tr style={{ color: Colors.DARK_GRAY1 }}>
      <td>{id}</td>
      <td>
        <b>{title}</b>
      </td>
      <td>{content}</td>
      <td>
        <Icon
          icon={IconNames.DELETE}
          color={Colors.RED1}
          iconSize={Icon.SIZE_LARGE}
          onClick={handleRemove}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
}

export default Todo;
