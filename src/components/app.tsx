import React, { Component } from 'react';
import ribbon from './ribbon';
import 'antd/dist/antd.min.css';

class App extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = {
    }
    console.log("init ribbon")
    window.ribbon = ribbon;
  }

  render() {
    return (
      <div>
        this is index.html
      </div>
    )
  }
}

export default App;
