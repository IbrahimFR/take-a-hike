import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './trails.reducer';
import { ITrails } from 'app/shared/model/trails.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITrailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrailsUpdate = (props: ITrailsUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { trailsEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/trails');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startTime = convertDateTimeToServer(values.startTime);
    values.endTime = convertDateTimeToServer(values.endTime);

    if (errors.length === 0) {
      const entity = {
        ...trailsEntity,
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
          <h2 id="takeAHikeApp.trails.home.createOrEditLabel">
            <Translate contentKey="takeAHikeApp.trails.home.createOrEditLabel">Create or edit a Trails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : trailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="trails-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="trails-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="trails-name">
                  <Translate contentKey="takeAHikeApp.trails.name">Name</Translate>
                </Label>
                <AvField id="trails-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="startTimeLabel" for="trails-startTime">
                  <Translate contentKey="takeAHikeApp.trails.startTime">Start Time</Translate>
                </Label>
                <AvInput
                  id="trails-startTime"
                  type="datetime-local"
                  className="form-control"
                  name="startTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.trailsEntity.startTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endTimeLabel" for="trails-endTime">
                  <Translate contentKey="takeAHikeApp.trails.endTime">End Time</Translate>
                </Label>
                <AvInput
                  id="trails-endTime"
                  type="datetime-local"
                  className="form-control"
                  name="endTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.trailsEntity.endTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="ageLimitLabel" for="trails-ageLimit">
                  <Translate contentKey="takeAHikeApp.trails.ageLimit">Age Limit</Translate>
                </Label>
                <AvField id="trails-ageLimit" type="text" name="ageLimit" />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="trails-price">
                  <Translate contentKey="takeAHikeApp.trails.price">Price</Translate>
                </Label>
                <AvField id="trails-price" type="text" name="price" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/trails" replace color="info">
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
  trailsEntity: storeState.trails.entity,
  loading: storeState.trails.loading,
  updating: storeState.trails.updating,
  updateSuccess: storeState.trails.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrailsUpdate);
