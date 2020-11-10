import { Button, Colors, Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getTodo, removeTodoThunk } from '../modules/todos';
import Loader from './Loader';
import AppToaster from './Toaster';

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state.pending[getTodo.type]);
  const error = useSelector((state) => state.error[getTodo.type]);
  const todo = useSelector((state) => state.todo.todo);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTodo.request(parseInt(id, 10)));
  }, [dispatch, id]);

  const handleRemove = useCallback(async () => {
    try {
      await dispatch(removeTodoThunk(parseInt(id, 10)));
      AppToaster.show({
        message: `Todo( id:${id} ) removed.`,
        timeout: 2000,
      });
      history.push('/');
    } catch (e) {
      AppToaster.show({
        message: `there is an error (todo removed)`,
        timeout: 2000,
      });
    }
  }, [dispatch, history, id]);

  return (
    <>
      <h1>Todo Detail</h1>
      {error ? (
        <span
          style={{ color: Colors.RED2 }}
        >{`todo (id: ${id}) does not exist.`}</span>
      ) : loading || !todo ? (
        <Loader />
      ) : (
        <>
          <div>title: {todo?.title}</div>
          <div>
            content: {todo?.content}{' '}
            <Icon
              icon={IconNames.DELETE}
              color={Colors.RED1}
              iconSize={Icon.SIZE_LARGE}
              onClick={handleRemove}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </>
      )}
      <div>
        <Link to="/">
          <Button intent={Intent.PRIMARY} color={Colors.COBALT1}>
            HOME
          </Button>
        </Link>
      </div>
    </>
  );
}

async function loadData({ store, req }) {
  const id = req.params;
  console.log(id);
  store.dispatch(getTodo.request(parseInt(id, 10)));
}

Detail.loadData = loadData;

export default Detail;
