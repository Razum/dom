import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../Panel';
import style from './style.scss';

const SLICE = 20;
const comparator = (a, b) => b.price - a.price;
const reverseComparator = (a, b) => a.price - b.price;

const DOM = ({ data }) => {
  const items = Object.keys(data).reduce((hash, key) => {
    if (data[key] < 0) {
      hash.ask.push({ price: parseFloat(key), amount: Math.abs(parseFloat(data[key])) });
    }
    if (data[key] > 0) {
      hash.bid.push({ price: parseFloat(key), amount: parseFloat(data[key]) });
    }
    return hash;
  }, { bid: [], ask: [] });
  const bid = items.bid.sort(comparator).slice(0, SLICE);
  const ask = items.ask.sort(reverseComparator).slice(0, SLICE);
  return (
    <div className={`container ${style.dom}`}>
      <div className="row">
        <div className="col w-50">
          <Panel type="bid" offers={bid} />
        </div>
        <div className="col w-50">
          <Panel type="ask" offers={ask} />
        </div>
      </div>
    </div>
  );
};

DOM.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default DOM;
