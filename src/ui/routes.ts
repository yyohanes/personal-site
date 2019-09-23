import loadable from '@loadable/component'
import { RouteProps } from 'react-router'

import { AnyAction } from 'app/infrastructure/utils/makeActionCreatorFactory'

import HomeActions from 'app/infrastructure/Home/actions'
const Home = loadable(() => import('./Home'))

interface EnhancedRouteProps extends RouteProps {
  serverActions?: AnyAction[];
}
const routes: EnhancedRouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    serverActions: [HomeActions.requestData()],
  },
]

export default routes
