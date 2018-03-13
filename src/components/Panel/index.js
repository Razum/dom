import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const Panel = ({ offers, type }) => {
  const max = Math.max.apply(null, offers.map(o => Math.abs(o.amount)));
  return offers.map(offer => <Item {...offer} key={offer.price} type={type} max={max} />);
};

Panel.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  type: PropTypes.string.isRequired,
};
export default Panel;

