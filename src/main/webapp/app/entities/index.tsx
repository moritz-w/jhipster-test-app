import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Person from './person';
import Todo from './todo';
import TodoList from './todo-list';
import Team from './team';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}person`} component={Person} />
      <ErrorBoundaryRoute path={`${match.url}todo`} component={Todo} />
      <ErrorBoundaryRoute path={`${match.url}todo-list`} component={TodoList} />
      <ErrorBoundaryRoute path={`${match.url}team`} component={Team} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
