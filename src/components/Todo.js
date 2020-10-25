import { AppToaster } from './Toaster';
import { Colors, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

function Todo({ title, content, id }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>
        <Icon
          icon={IconNames.DELETE}
          color={Colors.RED1}
          iconSize={Icon.SIZE_LARGE}
        />
      </td>
    </tr>
  );
}

export default Todo;
