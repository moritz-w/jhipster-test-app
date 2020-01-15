import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './todo-list.reducer';
import { ITodoList } from 'app/shared/model/todo-list.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITodoListProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TodoList = (props: ITodoListProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { todoListList, match } = props;
  return (
    <div>
      <h2 id="todo-list-heading">
        Todo Lists
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Todo List
        </Link>
      </h2>
      <div className="table-responsive">
        {todoListList && todoListList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Done</th>
                <th>Expirydate</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {todoListList.map((todoList, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${todoList.id}`} color="link" size="sm">
                      {todoList.id}
                    </Button>
                  </td>
                  <td>{todoList.name}</td>
                  <td>{todoList.done ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={todoList.expirydate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${todoList.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${todoList.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${todoList.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="alert alert-warning">No Todo Lists found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ todoList }: IRootState) => ({
  todoListList: todoList.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
