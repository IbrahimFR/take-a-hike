import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITrails } from 'app/shared/model/trails.model';
import { getEntities as getTrails } from 'app/entities/trails/trails.reducer';
import { IUsers } from 'app/shared/model/users.model';
import { getEntities as getUsers } from 'app/entities/users/users.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bookings.reducer';
import { IBookings } from 'app/shared/model/bookings.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookingsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookingsUpdate = (props: IBookingsUpdateProps) => {
  const [trailId, setTrailId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bookingsEntity, trails, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bookings');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTrails();
    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bookingsEntity,
        ...values,
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
          <h2 id="takeAHikeApp.bookings.home.createOrEditLabel">
            <Translate contentKey="takeAHikeApp.bookings.home.createOrEditLabel">Create or edit a Bookings</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookingsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bookings-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bookings-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="bookings-status">
                  <Translate contentKey="takeAHikeApp.bookings.status">Status</Translate>
                </Label>
                <AvInput
                  id="bookings-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && bookingsEntity.status) || 'PENDING'}
                >
                  <option value="PENDING">{translate('takeAHikeApp.Status.PENDING')}</option>
                  <option value="CONFIRMED">{translate('takeAHikeApp.Status.CONFIRMED')}</option>
                  <option value="CANCELED">{translate('takeAHikeApp.Status.CANCELED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bookings-trail">
                  <Translate contentKey="takeAHikeApp.bookings.trail">Trail</Translate>
                </Label>
                <AvInput id="bookings-trail" type="select" className="form-control" name="trail.id">
                  <option value="" key="0" />
                  {trails
                    ? trails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bookings-user">
                  <Translate contentKey="takeAHikeApp.bookings.user">User</Translate>
                </Label>
                <AvInput id="bookings-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/bookings" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  trails: storeState.trails.entities,
  users: storeState.users.entities,
  bookingsEntity: storeState.bookings.entity,
  loading: storeState.bookings.loading,
  updating: storeState.bookings.updating,
  updateSuccess: storeState.bookings.updateSuccess,
});

const mapDispatchToProps = {
  getTrails,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookingsUpdate);
