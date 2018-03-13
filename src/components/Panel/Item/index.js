import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ price, amount, type, max }) => {
  if (type === 'bid') {
    return (
      <div className="row py1 right-align" style={{ background: `linear-gradient(to left, #2D3E30 ${(amount / max) * 100}%, transparent ${(amount / max) * 100}%)` }}>
        <div className="col w-50">{amount}</div>
        <div className="col w-50">{price}</div>
      </div>
    );
  }
  return (
    <div className="row py1" style={{ background: `linear-gradient(to right, #3A2B32 ${(amount / max) * 100}%, transparent ${(amount / max) * 100}%)` }}>
      <div className="col w-50">{price}</div>
      <div className="col w-50">{amount}</div>
    </div>
  );
};

Item.propTypes = {
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  type: PropTypes.string,
};

Item.defaultProps = {
  type: '',
};

export default Item;
