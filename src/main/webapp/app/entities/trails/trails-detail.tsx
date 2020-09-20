import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trails.reducer';
import { ITrails } from 'app/shared/model/trails.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrailsDetail = (props: ITrailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { trailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="takeAHikeApp.trails.detail.title">Trails</Translate> [<b>{trailsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="takeAHikeApp.trails.name">Name</Translate>
            </span>
          </dt>
          <dd>{trailsEntity.name}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="takeAHikeApp.trails.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>{trailsEntity.startTime ? <TextFormat value={trailsEntity.startTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endTime">
              <Translate contentKey="takeAHikeApp.trails.endTime">End Time</Translate>
            </span>
          </dt>
          <dd>{trailsEntity.endTime ? <TextFormat value={trailsEntity.endTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="ageLimit">
              <Translate contentKey="takeAHikeApp.trails.ageLimit">Age Limit</Translate>
            </span>
          </dt>
          <dd>{trailsEntity.ageLimit}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="takeAHikeApp.trails.price">Price</Translate>
            </span>
          </dt>
          <dd>{trailsEntity.price}</dd>
        </dl>
        <Button tag={Link} to="/trails" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/trails/${trailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ trails }: IRootState) => ({
  trailsEntity: trails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrailsDetail);
