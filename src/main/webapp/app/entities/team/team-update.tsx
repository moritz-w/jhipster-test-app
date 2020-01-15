import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITodoList } from 'app/shared/model/todo-list.model';
import { getEntities as getTodoLists } from 'app/entities/todo-list/todo-list.reducer';
import { getEntity, updateEntity, createEntity, reset } from './team.reducer';
import { ITeam } from 'app/shared/model/team.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITeamUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TeamUpdate = (props: ITeamUpdateProps) => {
  const [idstodoList, setIdstodoList] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { teamEntity, todoLists, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/team');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...teamEntity,
        ...values,
        todoLists: mapIdList(values.todoLists)
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
          <h2 id="toDoApp.team.home.createOrEditLabel">Create or edit a Team</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : teamEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="team-id">ID</Label>
                  <AvInput id="team-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="team-name">
                  Name
                </Label>
                <AvField id="team-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="team-todoList">Todo List</Label>
                <AvInput
                  id="team-todoList"
                  type="select"
                  multiple
                  className="form-control"
                  name="todoLists"
                  value={teamEntity.todoLists && teamEntity.todoLists.map(e => e.id)}
                >
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
              <Button tag={Link} id="cancel-save" to="/team" replace color="info">
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
  todoLists: storeState.todoList.entities,
  teamEntity: storeState.team.entity,
  loading: storeState.team.loading,
  updating: storeState.team.updating,
  updateSuccess: storeState.team.updateSuccess
});

const mapDispatchToProps = {
  getTodoLists,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TeamUpdate);
