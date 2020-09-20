import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './users.reducer';
import { IUsers } from 'app/shared/model/users.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUsersDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UsersDetail = (props: IUsersDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { usersEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="takeAHikeApp.users.detail.title">Users</Translate> [<b>{usersEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="takeAHikeApp.users.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{usersEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="takeAHikeApp.users.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{usersEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="takeAHikeApp.users.email">Email</Translate>
            </span>
          </dt>
          <dd>{usersEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="takeAHikeApp.users.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{usersEntity.phoneNumber}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="takeAHikeApp.users.password">Password</Translate>
            </span>
          </dt>
          <dd>{usersEntity.password}</dd>
        </dl>
        <Button tag={Link} to="/users" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/users/${usersEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ users }: IRootState) => ({
  usersEntity: users.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsersDetail);
