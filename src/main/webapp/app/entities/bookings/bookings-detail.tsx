import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bookings.reducer';
import { IBookings } from 'app/shared/model/bookings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookingsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookingsDetail = (props: IBookingsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bookingsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="takeAHikeApp.bookings.detail.title">Bookings</Translate> [<b>{bookingsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">
              <Translate contentKey="takeAHikeApp.bookings.status">Status</Translate>
            </span>
          </dt>
          <dd>{bookingsEntity.status}</dd>
          <dt>
            <Translate contentKey="takeAHikeApp.bookings.trail">Trail</Translate>
          </dt>
          <dd>{bookingsEntity.trail ? bookingsEntity.trail.id : ''}</dd>
          <dt>
            <Translate contentKey="takeAHikeApp.bookings.user">User</Translate>
          </dt>
          <dd>{bookingsEntity.user ? bookingsEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bookings" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bookings/${bookingsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bookings }: IRootState) => ({
  bookingsEntity: bookings.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookingsDetail);
