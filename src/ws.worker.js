export default function MyWorker() {
  const ws = new WebSocket('ws://front-test-1.herokuapp.com/ob?key=210c01fe-1962-40f8-8730-f8387c321090&rate=2000');
  const DELAY = 1000;
  const TIMEOUT_PING = 600000; // 10 min
  let offers = {};

  const sendResults = getThrottled(() => {
    postMessage(offers);
    offers = {};
  });


  ws.onmessage = (event) => {
    const data = parseData(event.data);
    Object.assign(offers, data);
    sendResults();
  };

  keepAlive();

  function parseData(data) {
    const arr = data.replace(/\]\[/g, '],[');
    const { items } = JSON.parse(`{"items": [${arr}]}`);
    // ignore snapshot with static values
    if (items.length > 1) {
      return {};
    }
    return items.reduce((hash, itm) => {
      hash[itm[0]] = itm[1];
      return hash;
    }, {});
  }

  function getThrottled(func) {
    return throttle(func, DELAY);
  }

  function keepAlive() {
    if (ws.readyState === ws.OPEN) {
      ws.send('ping');
    }
    setTimeout(keepAlive, TIMEOUT_PING);
  }

  // throttle alternative to lodash.throttle
  function throttle(callback, wait, context = this) {
    let timeout = null;
    let callbackArgs = null;

    const later = () => {
      callback.apply(context, callbackArgs);
      timeout = null;
    };

    return (...args) => {
      if (!timeout) {
        callbackArgs = args;
        timeout = setTimeout(later, wait);
      }
    };
  }
}

