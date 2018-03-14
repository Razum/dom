import React, { Component } from 'react';
import DOM from './components/DOM';
import Loader from './components/Loader';
import WebWorker from './utils/WebWorker';
import MyWorker from './ws.worker';

const worker = new WebWorker(MyWorker);

class App extends Component {
  state = {
    isFetching: false,
    data: {},
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    worker.addEventListener('message', (event) => {
      console.log('FROM WORKER:', event.data);
      this.setState(currState => ({
        ...currState,
        isFetching: false,
        data: {
          ...currState.data,
          ...event.data,
        },
      }));
    });
  }

  render() {
    if (this.state.isFetching) {
      return <Loader />;
    }
    return (
      <div className="App">
        <DOM data={this.state.data} />
      </div>
    );
  }
}

export default App;
