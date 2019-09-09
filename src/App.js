import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();

    this.state = {
      width: 320,
      height: 0,
      streaming: false
    };
  }

  componentDidMount() {
    const video = this.videoRef;
    const canvas = this.canvasRef;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        video.current.srcObject = stream;
        video.current.play();
      })
      .catch(function(err) {
        console.log('An error occurred: ' + err);
      });
  }

  render() {
    return (
      <div className='contentarea'>
        <h1>MDN - WebRTC: Still photo capture demo</h1>
        <p>
          This example demonstrates how to set up a media stream using your
          built-in webcam, fetch an image from that stream, and create a PNG
          using that image.
        </p>
        <div className='camera'>
          <video ref={this.videoRef} id='video'>
            Video stream not available.
          </video>
          <button id='startbutton'>Take photo</button>
        </div>
        <canvas id='canvas' ref={this.canvasRef}></canvas>
        <div className='output'>
          <img id='photo' alt='The screen capture will appear in this box.' />
        </div>
        <p>
          Visit our article{' '}
          <a href='https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos'>
            {' '}
            Taking still photos with WebRTC
          </a>{' '}
          to learn more about the technologies used here.
        </p>
      </div>
    );
  }
}

export default App;
