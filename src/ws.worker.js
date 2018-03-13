/* eslint-disable */
export default function MyWorker(args) {
  const ws = new WebSocket('ws://front-test-1.herokuapp.com/ob?key=210c01fe-1962-40f8-8730-f8387c321090&rate=2000');
  let offers = {};

  const sendResults = throttle(() => {
    postMessage(offers);
    offers = {}
  }, 2000);


  ws.onmessage = (event) => {
    const arr = event.data.replace(/\]\[/g, '],[');
    const data = JSON.parse(`{"items": [${arr}]}`);
    const hash = data.items.reduce((hash, itm) => {
      hash[itm[0]] = itm[1];
      return hash;
    }, {});

    sendResults(Object.assign(offers, hash))
  };

  let onmessage = e => {};




  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
}

