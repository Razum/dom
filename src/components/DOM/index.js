import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../Panel';

const comparator = (a, b) => b.price - a.price;

const DOM = ({ data }) => {
  const items = Object.keys(data).reduce((hash, key) => {
    if (data[key] <= 0) {
      hash.ask.push({ price: parseFloat(key, 10), amount: parseFloat(data[key], 10) });
    } else {
      hash.bid.push({ price: parseFloat(key, 10), amount: parseFloat(data[key], 10) });
    }
    return hash;
  }, { bid: [], ask: [] });
  return (
    <div className="container">
      <div className="row">
        <div className="w-50">
          <Panel type="bid" offers={items.bid.sort(comparator).slice(0, 21)} />
        </div>
        <div className="w-50">
          <Panel type="ask" offers={items.ask.sort(comparator).slice(0, 21)} />
        </div>
      </div>
    </div>
  );
};

DOM.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default DOM;
