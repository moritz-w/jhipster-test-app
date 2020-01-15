import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './todo-list.reducer';
import { ITodoList } from 'app/shared/model/todo-list.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITodoListDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TodoListDetail = (props: ITodoListDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { todoListEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          TodoList [<b>{todoListEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{todoListEntity.name}</dd>
          <dt>
            <span id="done">Done</span>
          </dt>
          <dd>{todoListEntity.done ? 'true' : 'false'}</dd>
          <dt>
            <span id="expirydate">Expirydate</span>
          </dt>
          <dd>
            <TextFormat value={todoListEntity.expirydate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/todo-list" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/todo-list/${todoListEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ todoList }: IRootState) => ({
  todoListEntity: todoList.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDetail);
