import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Trails from './trails';
import TrailsDetail from './trails-detail';
import TrailsUpdate from './trails-update';
import TrailsDeleteDialog from './trails-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TrailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TrailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TrailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Trails} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TrailsDeleteDialog} />
  </>
);

export default Routes;
