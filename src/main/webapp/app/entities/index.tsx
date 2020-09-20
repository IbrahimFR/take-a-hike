import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Trails from './trails';
import Users from './users';
import Bookings from './bookings';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}trails`} component={Trails} />
      <ErrorBoundaryRoute path={`${match.url}users`} component={Users} />
      <ErrorBoundaryRoute path={`${match.url}bookings`} component={Bookings} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
