import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TodoList from './todo-list';
import TodoListDetail from './todo-list-detail';
import TodoListUpdate from './todo-list-update';
import TodoListDeleteDialog from './todo-list-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TodoListDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TodoListUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TodoListUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TodoListDetail} />
      <ErrorBoundaryRoute path={match.url} component={TodoList} />
    </Switch>
  </>
);

export default Routes;
