import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITeam } from 'app/shared/model/team.model';
import { getEntities as getTeams } from 'app/entities/team/team.reducer';
import { getEntity, updateEntity, createEntity, reset } from './todo-list.reducer';
import { ITodoList } from 'app/shared/model/todo-list.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITodoListUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TodoListUpdate = (props: ITodoListUpdateProps) => {
  const [teamId, setTeamId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { todoListEntity, teams, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/todo-list');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTeams();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...todoListEntity,
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
          <h2 id="toDoApp.todoList.home.createOrEditLabel">Create or edit a TodoList</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : todoListEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="todo-list-id">ID</Label>
                  <AvInput id="todo-list-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="todo-list-name">
                  Name
                </Label>
                <AvField id="todo-list-name" type="text" name="name" />
              </AvGroup>
              <AvGroup check>
                <Label id="doneLabel">
                  <AvInput id="todo-list-done" type="checkbox" className="form-check-input" name="done" />
                  Done
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="expirydateLabel" for="todo-list-expirydate">
                  Expirydate
                </Label>
                <AvField id="todo-list-expirydate" type="date" className="form-control" name="expirydate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/todo-list" replace color="info">
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
  teams: storeState.team.entities,
  todoListEntity: storeState.todoList.entity,
  loading: storeState.todoList.loading,
  updating: storeState.todoList.updating,
  updateSuccess: storeState.todoList.updateSuccess
});

const mapDispatchToProps = {
  getTeams,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TodoListUpdate);
