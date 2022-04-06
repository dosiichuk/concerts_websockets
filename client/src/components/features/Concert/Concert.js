import React from 'react';
import { Row, Col } from 'reactstrap';

import './Concert.scss';

const Concert = ({ performer, price, genre, day, image, ...props }) => (
  <article className="concert">
    <Row noGutters>
      <Col xs="6">
        <div className="concert__image-container">
          <img
            className="concert__image-container__img"
            src={image}
            alt={performer.name}
          />
        </div>
      </Col>
      <Col xs="6">
        <div className="concert__info">
          <h2 className="concert__info__performer">{performer.name}</h2>
          <h3 className="concert__info__genre">{genre}</h3>
          <p className="concert__info__tickets">
            Only {props.freeSeats} tickets left!!
          </p>
          <p className="concert__info__day-n-price">
            Day: {day}, Price: {price}$
          </p>
        </div>
      </Col>
    </Row>
  </article>
);

export default Concert;
