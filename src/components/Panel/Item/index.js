import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ price, amount, type }) => {
  if (type === 'reverse') {
    return (
      <div className="row">
        <div className="w-50">{amount}</div>
        <div className="w-50">{price}</div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="w-50">{price}</div>
      <div className="w-50">{amount}</div>
    </div>
  );
};

Item.propTypes = {
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.string,
};

Item.defaultProps = {
  type: '',
};

export default Item;
