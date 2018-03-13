import React, { Component } from 'react';
import DOM from './components/DOM';
import WebWorker from './utils/WebWorker';
import MyWorker from './ws.worker';

const worker = new WebWorker(MyWorker);

class App extends Component {
  state = {
    data: {},
  }

  componentDidMount() {
    worker.addEventListener('message', (event) => {
      console.log('FROM WORKER:', event.data);

      this.setState(currState => ({
        ...currState,
        data: {
          ...currState.data,
          ...event.data,
        },
      }));
    });
  }

  render() {
    return (
      <div className="App">
        <DOM data={this.state.data} />
      </div>
    );
  }
}

export default App;
