import List from '../components/List';
import Detail from '../components/Detail';

const routes = [
  {
    path: '/',
    component: List,
    exact: true,
  },
  {
    path: '/:id',
    component: Detail,
  },
];

export default routes;
