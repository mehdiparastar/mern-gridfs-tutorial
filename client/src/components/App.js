import React, { Component } from 'react';
import logo from '../logo.svg';
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/files')
      .then(res => res.json())
      .then(files => this.setState({ files }));
  }

  render() {
    const { files } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <table className="App-table">
          <thead>
            <tr>
                <th>File</th>
                <th>Uploaded</th>
                <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => {
              var d = new Date(file.uploadDate);
              return (
                <tr key={index}>
                  <td><a href={`http://localhost:3001/api/files/${file.filename}`}>{file.filename}</a></td>
                  <td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>
                  <td>{(Math.round(file.length/100) / 10)+'KB'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
