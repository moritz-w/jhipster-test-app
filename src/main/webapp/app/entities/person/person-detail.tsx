import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonDetail = (props: IPersonDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { personEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Person [<b>{personEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstname">Firstname</span>
          </dt>
          <dd>{personEntity.firstname}</dd>
          <dt>
            <span id="lastname">Lastname</span>
          </dt>
          <dd>{personEntity.lastname}</dd>
          <dt>Team</dt>
          <dd>{personEntity.team ? personEntity.team.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/person" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/person/${personEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ person }: IRootState) => ({
  personEntity: person.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail);
