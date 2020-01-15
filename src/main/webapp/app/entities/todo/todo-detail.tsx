import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './todo.reducer';
import { ITodo } from 'app/shared/model/todo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITodoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TodoDetail = (props: ITodoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { todoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Todo [<b>{todoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{todoEntity.name}</dd>
          <dt>
            <span id="priority">Priority</span>
          </dt>
          <dd>{todoEntity.priority}</dd>
          <dt>
            <span id="done">Done</span>
          </dt>
          <dd>{todoEntity.done ? 'true' : 'false'}</dd>
          <dt>
            <span id="expirydate">Expirydate</span>
          </dt>
          <dd>
            <TextFormat value={todoEntity.expirydate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>Person</dt>
          <dd>{todoEntity.person ? todoEntity.person.id : ''}</dd>
          <dt>Todo List</dt>
          <dd>{todoEntity.todoList ? todoEntity.todoList.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/todo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/todo/${todoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ todo }: IRootState) => ({
  todoEntity: todo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetail);
