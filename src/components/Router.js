import { Switch, Route } from 'react-router-dom';
import Detail from './Detail';
import List from './List';

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <List />
      </Route>
      <Route path="/:id">
        <Detail />
      </Route>
    </Switch>
  );
}

export default Router;
