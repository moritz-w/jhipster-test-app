import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { ITodoList } from 'app/shared/model/todo-list.model';
import { getEntities as getTodoLists } from 'app/entities/todo-list/todo-list.reducer';
import { getEntity, updateEntity, createEntity, reset } from './todo.reducer';
import { ITodo } from 'app/shared/model/todo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITodoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TodoUpdate = (props: ITodoUpdateProps) => {
  const [personId, setPersonId] = useState('0');
  const [todoListId, setTodoListId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { todoEntity, people, todoLists, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/todo');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPeople();
    props.getTodoLists();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...todoEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="toDoApp.todo.home.createOrEditLabel">Create or edit a Todo</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : todoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="todo-id">ID</Label>
                  <AvInput id="todo-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="todo-name">
                  Name
                </Label>
                <AvField id="todo-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="priorityLabel" for="todo-priority">
                  Priority
                </Label>
                <AvField id="todo-priority" type="string" className="form-control" name="priority" />
              </AvGroup>
              <AvGroup check>
                <Label id="doneLabel">
                  <AvInput id="todo-done" type="checkbox" className="form-check-input" name="done" />
                  Done
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="expirydateLabel" for="todo-expirydate">
                  Expirydate
                </Label>
                <AvField id="todo-expirydate" type="date" className="form-control" name="expirydate" />
              </AvGroup>
              <AvGroup>
                <Label for="todo-person">Person</Label>
                <AvInput id="todo-person" type="select" className="form-control" name="person.id">
                  <option value="" key="0" />
                  {people
                    ? people.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="todo-todoList">Todo List</Label>
                <AvInput id="todo-todoList" type="select" className="form-control" name="todoList.id">
                  <option value="" key="0" />
                  {todoLists
                    ? todoLists.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/todo" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  people: storeState.person.entities,
  todoLists: storeState.todoList.entities,
  todoEntity: storeState.todo.entity,
  loading: storeState.todo.loading,
  updating: storeState.todo.updating,
  updateSuccess: storeState.todo.updateSuccess
});

const mapDispatchToProps = {
  getPeople,
  getTodoLists,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TodoUpdate);
