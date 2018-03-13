import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const Panel = ({ offers, type }) => {
  const direction = type === 'bid' ? 'reverse' : '';
  return offers.map(offer => <Item {...offer} key={offer.price} type={direction} />);
};

Panel.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  type: PropTypes.string.isRequired,
};
export default Panel;

